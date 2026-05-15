import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/* Supabase avec service_role (ignore RLS) pour les opérations webhook */
function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}

/* POST /api/fedapay/webhook
   FedaPay envoie les événements ici (configurer dans le dashboard FedaPay).
   Ajouter l'URL dans FedaPay > Settings > Webhooks :
     https://votre-domaine.com/api/fedapay/webhook
*/
export async function POST(request: NextRequest) {
  const webhookSecret = process.env.FEDAPAY_WEBHOOK_SECRET;

  /* Vérification basique du secret dans le header */
  if (webhookSecret) {
    const receivedSecret = request.headers.get("x-fedapay-signature") ??
                           request.headers.get("x-webhook-secret");
    if (receivedSecret !== webhookSecret) {
      return NextResponse.json({ error: "Signature invalide" }, { status: 401 });
    }
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
  }

  const eventName = payload.name as string;
  const entity    = payload.entity as Record<string, unknown>;

  /* Seul l'événement "approved" déclenche l'enrôlement */
  if (eventName !== "transaction.approved") {
    return NextResponse.json({ received: true });
  }

  const fedapayId  = String(entity.id);
  const metadata   = (entity.custom_metadata ?? {}) as Record<string, string>;
  const txId       = metadata.supabase_tx_id;
  const userId     = metadata.user_id;
  const formIds    = (metadata.formation_ids ?? "").split(",").filter(Boolean);

  if (!txId || !userId || !formIds.length) {
    return NextResponse.json({ error: "Metadata manquante" }, { status: 400 });
  }

  const supabase = getServiceClient();

  /* Mettre à jour la transaction */
  const { data: tx } = await supabase
    .from("transactions")
    .update({ statut: "success", fedapay_id: fedapayId })
    .eq("id", txId)
    .select("montant")
    .single();

  /* Créer les enrôlements pour chaque formation */
  const enrollments = formIds.map((fid) => ({
    user_id:        userId,
    formation_id:   fid,
    statut:         "actif",
    prix_paye:      Math.round((tx?.montant ?? 0) / formIds.length),
    transaction_id: txId,
  }));

  await supabase.from("enrollments").upsert(enrollments, { onConflict: "user_id,formation_id" });

  /* Créer les entrées de progression à 0% */
  const progressions = formIds.map((fid) => ({
    user_id:      userId,
    formation_id: fid,
    pourcentage:  0,
    termine:      false,
  }));
  await supabase.from("progression").upsert(progressions, { onConflict: "user_id,formation_id" });

  /* Vider le panier des formations achetées */
  await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", userId)
    .in("formation_id", formIds);

  /* Mettre à jour le wallet (solde_achat) */
  await supabase.rpc("increment_wallet_achat", {
    p_user_id: userId,
    p_amount:  tx?.montant ?? 0,
  }).then(async (res) => {
    if (res.error) {
      /* Si la fonction RPC n'existe pas encore, faire un upsert direct */
      const { data: wallet } = await supabase
        .from("wallet")
        .select("solde_achat")
        .eq("user_id", userId)
        .single();

      await supabase.from("wallet").upsert({
        user_id:     userId,
        solde_achat: (wallet?.solde_achat ?? 0) + (tx?.montant ?? 0),
        updated_at:  new Date().toISOString(),
      }, { onConflict: "user_id" });
    }
  });

  /* Envoyer une notification in-app */
  const formCount = formIds.length;
  await supabase.from("notifications").insert({
    user_id: userId,
    titre:   "Inscription confirmée !",
    message: formCount === 1
      ? "Votre inscription à la formation a été confirmée. Bonne formation !"
      : `Votre inscription à ${formCount} formations a été confirmée. Bonne formation !`,
    type: "success",
  });

  return NextResponse.json({ received: true });
}
