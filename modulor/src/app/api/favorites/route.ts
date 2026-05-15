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

/* GET /api/favorites — liste les favoris de l'utilisateur */
export async function GET() {
  const supabase = await getSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ favorites: [] });

  const { data, error } = await supabase
    .from("favorites")
    .select("id, formation_id, created_at, formation:formations(id, titre, image, prix, note)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ favorites: data ?? [] });
}

/* POST /api/favorites — ajouter aux favoris
   Body: { formationId }
*/
export async function POST(request: NextRequest) {
  const supabase = await getSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const { formationId } = await request.json() as { formationId: string };
  if (!formationId) return NextResponse.json({ error: "formationId manquant" }, { status: 400 });

  const { error } = await supabase.from("favorites").insert({
    user_id: user.id,
    formation_id: formationId,
  });

  if (error) {
    if (error.code === "23505") { /* Unique constraint violation */
      return NextResponse.json({ error: "Déjà en favoris" }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

/* DELETE /api/favorites — retirer des favoris
   Body: { formationId }
*/
export async function DELETE(request: NextRequest) {
  const supabase = await getSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const { formationId } = await request.json() as { formationId: string };
  if (!formationId) return NextResponse.json({ error: "formationId manquant" }, { status: 400 });

  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", user.id)
    .eq("formation_id", formationId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
