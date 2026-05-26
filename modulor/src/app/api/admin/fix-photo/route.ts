import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Fix placeholder photo URLs
export async function POST(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    // Set teacher_photo to NULL for CNB course (removes placeholder)
    const { error } = await supabase
      .from("formations")
      .update({ teacher_photo: null })
      .eq("titre", "Contrôle Nourriture et Boisson");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: "Fixed placeholder photo URL",
    });
  } catch (error) {
    console.error("Fix photo error:", error);
    return NextResponse.json(
      { error: "Failed to fix photo" },
      { status: 500 }
    );
  }
}
