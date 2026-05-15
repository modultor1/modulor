import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

async function getSupabase() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  );
}

/* GET /api/cart — récupère le panier de l'utilisateur connecté */
export async function GET() {
  const supabase = await getSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ items: [] });

  const { data, error } = await supabase
    .from("cart_items")
    .select("id, added_at, formation:formations(id, titre, domaine, prix, note, image, niveau)")
    .eq("user_id", user.id)
    .order("added_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ items: data ?? [] });
}

/* POST /api/cart — ajouter une formation au panier
   Body: { formationId: string }
*/
export async function POST(request: NextRequest) {
  const supabase = await getSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const { formationId } = await request.json();
  if (!formationId) return NextResponse.json({ error: "formationId manquant" }, { status: 400 });

  /* Vérifier que l'user n'est pas déjà enrôlé */
  const { data: enrolled } = await supabase
    .from("enrollments")
    .select("id")
    .eq("user_id", user.id)
    .eq("formation_id", formationId)
    .single();

  if (enrolled) {
    return NextResponse.json({ error: "Déjà inscrit à cette formation" }, { status: 409 });
  }

  const { error } = await supabase.from("cart_items").upsert(
    { user_id: user.id, formation_id: formationId },
    { onConflict: "user_id,formation_id" }
  );

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

/* DELETE /api/cart — supprimer un item du panier
   Body: { formationId: string }
*/
export async function DELETE(request: NextRequest) {
  const supabase = await getSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const { formationId } = await request.json();
  if (!formationId) return NextResponse.json({ error: "formationId manquant" }, { status: 400 });

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", user.id)
    .eq("formation_id", formationId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
