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

/* GET /api/videos?formationId=xxx — liste les vidéos d'une formation */
export async function GET(request: NextRequest) {
  const formationId = request.nextUrl.searchParams.get("formationId");
  if (!formationId) {
    return NextResponse.json({ error: "formationId manquant" }, { status: 400 });
  }

  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("formation_id", formationId)
    .order("module_index, ordre");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ videos: data ?? [] });
}
