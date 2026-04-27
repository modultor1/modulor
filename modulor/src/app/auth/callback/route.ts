import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Supabase redirige ici après confirmation d'email ou OAuth.
 * On échange le code contre une session, puis on redirige vers le dashboard.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/tableau-de-bord";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  /* En cas d'erreur → retour connexion avec message */
  return NextResponse.redirect(`${origin}/connexion?error=confirmation_echouee`);
}
