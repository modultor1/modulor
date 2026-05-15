import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

async function getSupabase() {
  // Use service role key to bypass RLS for public reads
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

/* GET /api/formations/search?q=xxx&domaine=xxx&minPrice=xxx&maxPrice=xxx
   Recherche et filtre les formations
*/
export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") ?? "";
  const domaine = request.nextUrl.searchParams.get("domaine");
  const minPrice = parseInt(request.nextUrl.searchParams.get("minPrice") ?? "0");
  const maxPrice = parseInt(request.nextUrl.searchParams.get("maxPrice") ?? "999999");

  const supabase = await getSupabase();

  let query = supabase.from("formations").select("*");

  /* Recherche textuelle (ILIKE = case-insensitive) */
  if (q) {
    query = query.or(
      `titre.ilike.%${q}%,description.ilike.%${q}%,domaine.ilike.%${q}%`
    );
  }

  /* Filtres */
  if (domaine) query = query.eq("domaine", domaine);
  query = query.gte("prix", minPrice).lte("prix", maxPrice);

  const { data, error } = await query
    .eq("actif", true)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("❌ Formations search error:", error);
    return NextResponse.json({ error: error.message, details: error }, { status: 500 });
  }

  console.log("✅ Formations found:", data?.length ?? 0);
  return NextResponse.json({ formations: data ?? [] });
}
