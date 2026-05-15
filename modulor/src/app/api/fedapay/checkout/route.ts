import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { createCheckout } from "@/lib/fedapay";

/* POST /api/fedapay/checkout
   Body: { formationIds: string[], type: "panier" | "direct" }
   Returns: { paymentUrl: string }
*/
export async function POST(request: NextRequest) {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  );

  /* Authentification */
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const body = await request.json();
  const { formationIds, type = "direct" } = body as {
    formationIds: string[];
    type?: string;
  };

  if (!formationIds?.length) {
    return NextResponse.json({ error: "Aucune formation sélectionnée" }, { status: 400 });
  }

  /* Récupérer les formations depuis la DB */
  const { data: formations, error: formErr } = await supabase
    .from("formations")
    .select("id, titre, prix")
    .in("id", formationIds);

  if (formErr || !formations?.length) {
    return NextResponse.json({ error: "Formations introuvables" }, { status: 404 });
  }

  /* Vérifier que l'user n'est pas déjà enrôlé */
  const { data: existing } = await supabase
    .from("enrollments")
    .select("formation_id")
    .eq("user_id", user.id)
    .in("formation_id", formationIds);

  const alreadyEnrolled = existing?.map((e) => e.formation_id) ?? [];
  const toProcess = formations.filter((f) => !alreadyEnrolled.includes(f.id));

  if (!toProcess.length) {
    return NextResponse.json({ error: "Déjà inscrit à toutes ces formations" }, { status: 409 });
  }

  const totalAmount = toProcess.reduce((acc, f) => acc + f.prix, 0);
  const description =
    toProcess.length === 1
      ? `Formation : ${toProcess[0].titre}`
      : `${toProcess.length} formations Modulor`;

  /* Profil utilisateur pour FedaPay */
  const { data: profile } = await supabase
    .from("profiles")
    .select("nom, email")
    .eq("id", user.id)
    .single();

  const nomParts = (profile?.nom ?? "Utilisateur Modulor").split(" ");
  const firstname = nomParts[0];
  const lastname  = nomParts.slice(1).join(" ") || "X";

  /* Créer une transaction pending en DB */
  const { data: dbTx, error: txErr } = await supabase
    .from("transactions")
    .insert({
      user_id:     user.id,
      type:        "achat",
      montant:     totalAmount,
      description,
      statut:      "pending",
      metadata:    { formationIds: toProcess.map((f) => f.id), type },
    })
    .select("id")
    .single();

  if (txErr || !dbTx) {
    return NextResponse.json({ error: "Erreur création transaction" }, { status: 500 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  try {
    const { paymentUrl } = await createCheckout({
      description,
      amount:    totalAmount,
      customer:  {
        firstname,
        lastname,
        email: profile?.email ?? user.email ?? "",
      },
      callbackUrl: `${siteUrl}/paiement/succes?tx=${dbTx.id}`,
      customMetadata: {
        supabase_tx_id:  dbTx.id,
        user_id:         user.id,
        formation_ids:   toProcess.map((f) => f.id).join(","),
      },
    });

    return NextResponse.json({ paymentUrl });
  } catch (err) {
    /* En cas d'erreur FedaPay, nettoyer la transaction pending */
    await supabase.from("transactions").delete().eq("id", dbTx.id);
    console.error("[checkout]", err);
    return NextResponse.json({ error: "Erreur paiement FedaPay" }, { status: 500 });
  }
}
