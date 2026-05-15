import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

async function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from("formations")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("❌ Formation detail error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log("✅ Formation found:", data?.titre);
  return NextResponse.json({ formation: data });
}
