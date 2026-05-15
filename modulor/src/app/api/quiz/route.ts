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

/* GET /api/quiz?formationId=xxx — liste les quiz d'une formation */
export async function GET(request: NextRequest) {
  const formationId = request.nextUrl.searchParams.get("formationId");
  if (!formationId) {
    return NextResponse.json({ error: "formationId manquant" }, { status: 400 });
  }

  const supabase = await getSupabase();

  /* Récupérer les quiz et leurs questions */
  const { data: quizzes, error: qErr } = await supabase
    .from("quiz")
    .select("id, titre, description, module_index, passing_score")
    .eq("formation_id", formationId)
    .order("module_index");

  if (qErr) return NextResponse.json({ error: qErr.message }, { status: 500 });

  /* Pour chaque quiz, récupérer les questions */
  const quizzesWithQuestions = await Promise.all(
    (quizzes ?? []).map(async (q) => {
      const { data: questions } = await supabase
        .from("quiz_questions")
        .select("id, type, question_text, options, points, ordre")
        .eq("quiz_id", q.id)
        .order("ordre");
      return { ...q, questions: questions ?? [] };
    })
  );

  return NextResponse.json({ quizzes: quizzesWithQuestions });
}

/* POST /api/quiz — soumettre les réponses d'un quiz
   Body: { quizId, answers: { questionId: answer, ... } }
*/
export async function POST(request: NextRequest) {
  const supabase = await getSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const { quizId, answers } = await request.json() as {
    quizId: string;
    answers: Record<string, string>;
  };

  if (!quizId || !answers) {
    return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
  }

  /* Récupérer le quiz et ses questions */
  const { data: quiz } = await supabase
    .from("quiz")
    .select("id, passing_score")
    .eq("id", quizId)
    .single();

  const { data: questions } = await supabase
    .from("quiz_questions")
    .select("id, correct_answer, points, type")
    .eq("quiz_id", quizId);

  if (!quiz || !questions) {
    return NextResponse.json({ error: "Quiz introuvable" }, { status: 404 });
  }

  /* Calculer le score */
  let totalPoints = 0;
  let earnedPoints = 0;

  questions.forEach((q) => {
    totalPoints += q.points ?? 1;

    const userAnswer = answers[q.id] ?? "";
    const correct = q.correct_answer ?? "";

    /* Comparaison simple (case-insensitive pour vrai/faux) */
    const isCorrect = q.type === "true_false"
      ? userAnswer.toLowerCase() === correct.toLowerCase()
      : userAnswer === correct;

    if (isCorrect) earnedPoints += q.points ?? 1;
  });

  const score = Math.round((earnedPoints / totalPoints) * 100);
  const passed = score >= (quiz.passing_score ?? 80);

  /* Sauvegarder la tentative */
  const { data: attempt, error: insertErr } = await supabase
    .from("quiz_attempts")
    .insert({
      user_id: user.id,
      quiz_id: quizId,
      score,
      passed,
      answers,
    })
    .select("id")
    .single();

  if (insertErr) return NextResponse.json({ error: insertErr.message }, { status: 500 });

  return NextResponse.json({
    score,
    passed,
    attemptId: attempt?.id,
    message: passed ? "✅ Quiz réussi !" : `❌ Score: ${score}%. Minimum requis: ${quiz.passing_score}%`,
  });
}
