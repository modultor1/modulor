import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { generateCertificatePDF } from "@/lib/pdf-generator";

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

/* GET /api/certificates/[formationId]
   Generates a PDF certificate if user has passed the quiz
*/
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ formationId: string }> }
) {
  const { formationId } = await params;
  const supabase = await getSupabase();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  /* Check if user has passed the quiz — join through quiz table to find formation_id */
  const { data: quizAttempt, error: attemptError } = await supabase
    .from("quiz_attempts")
    .select("passed, score, created_at, quiz!inner(formation_id)")
    .eq("user_id", user.id)
    .eq("quiz.formation_id", formationId)
    .eq("passed", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (attemptError || !quizAttempt) {
    return NextResponse.json({ error: "Quiz non réussi" }, { status: 403 });
  }

  /* Get user profile */
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("prenom, nom")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    return NextResponse.json({ error: "Profil utilisateur non trouvé" }, { status: 404 });
  }

  /* Get formation details */
  const { data: formation, error: formationError } = await supabase
    .from("formations")
    .select("titre, duree")
    .eq("id", formationId)
    .single();

  if (formationError || !formation) {
    return NextResponse.json({ error: "Formation non trouvée" }, { status: 404 });
  }

  try {
    const pdfBuffer = await generateCertificatePDF({
      prenoms: profile.prenom || "Participant",
      nom: profile.nom || "",
      formationTitre: formation.titre,
      date: new Date(quizAttempt.created_at).toLocaleDateString("fr-FR"),
      duree: formation.duree || "Non spécifiée",
      score: Math.round(quizAttempt.score),
    });

    return new NextResponse(pdfBuffer as any, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Certificat_${formation.titre.replace(/\s+/g, "_")}.pdf"`,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la génération du PDF" }, { status: 500 });
  }
}
