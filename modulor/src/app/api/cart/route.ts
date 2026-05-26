import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("cart_items")
      .select("*, formations(*)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ items: data ?? [] });
  } catch (error) {
    console.error("Cart GET error:", error);
    return NextResponse.json(
      { error: "Failed to load cart" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.log("❌ POST /api/cart: No user");
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json();
    const { formationId } = body;
    console.log("📝 POST /api/cart:", { userId: user.id, formationId });

    if (!formationId) {
      return NextResponse.json({ error: "formationId required" }, { status: 400 });
    }

    // Check if already in cart
    const { data: existing, error: checkError } = await supabase
      .from("cart_items")
      .select("id")
      .eq("user_id", user.id)
      .eq("formation_id", formationId)
      .limit(1);

    if (checkError) {
      console.error("❌ Check cart error:", checkError);
    }

    if (existing && existing.length > 0) {
      console.log("⚠️ Already in cart");
      return NextResponse.json({ error: "Already in cart" }, { status: 409 });
    }

    // Add to cart
    const { data, error } = await supabase
      .from("cart_items")
      .insert({
        user_id: user.id,
        formation_id: formationId,
      })
      .select()
      .single();

    if (error) {
      console.error("❌ Insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("✅ Item added to cart");
    return NextResponse.json({ success: true, item: data });
  } catch (error) {
    console.error("❌ Cart POST error:", error);
    return NextResponse.json(
      { error: `Failed: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { formationId } = await request.json();

    if (!formationId) {
      return NextResponse.json({ error: "formationId required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user.id)
      .eq("formation_id", formationId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cart DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to remove from cart" },
      { status: 500 }
    );
  }
}
