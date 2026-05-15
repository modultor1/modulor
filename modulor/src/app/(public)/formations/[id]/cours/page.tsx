"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { CheckCircle2, Loader2, Send, AlertCircle, FileText, Download } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

/* ─── Types ──────────────────────────────────────────────────────────── */
interface Video {
  id: string;
  titre: string;
  description?: string;
  duration: number;
  file_url: string;
  module_index: number;
}

interface QuizQuestion {
  id: string;
  type: string;
  question_text: string;
  options?: string[];
  points: number;
}

interface Quiz {
  id: string;
  titre: string;
  description?: string;
  module_index: number;
  passing_score: number;
  questions: QuizQuestion[];
}

/* ─── Quiz Component ────────────────────────────────────────────────── */
function QuizInterface({ quiz, onComplete, formationId }: { quiz: Quiz; onComplete: () => void; formationId: string }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{ score: number; passed: boolean; message: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloadingCert, setDownloadingCert] = useState(false);

  const q = quiz.questions[currentQ];

  async function handleSubmit() {
    setLoading(true);
    const res = await fetch("/api/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quizId: quiz.id, answers }),
    });

    const data = await res.json();
    setLoading(false);
    setResult(data);
    setSubmitted(true);
  }

  async function downloadCertificate() {
    setDownloadingCert(true);
    try {
      const res = await fetch(`/api/certificates/${formationId}`);
      if (!res.ok) throw new Error("Impossible de générer le certificat");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "certificat.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error(error);
    } finally {
      setDownloadingCert(false);
    }
  }

  if (!q) return null;

  if (submitted && result) {
    return (
      <div className="rounded-2xl border border-border bg-white p-6 flex flex-col gap-4">
        <div className={`flex items-center gap-2 ${result.passed ? "text-accent" : "text-orange-500"}`}>
          {result.passed ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
          <span className="font-bold text-lg">{result.message}</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Score obtenu: <span className="font-bold text-foreground">{result.score}/100</span>
        </p>
        {result.passed && (
          <div className="flex flex-col gap-2">
            <button onClick={downloadCertificate} disabled={downloadingCert}
              className="w-full py-3 rounded-xl font-bold text-white text-sm hover:opacity-90 disabled:opacity-60 transition-opacity flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
              {downloadingCert ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
              {downloadingCert ? "Génération..." : "Télécharger le certificat"}
            </button>
            <button onClick={onComplete}
              className="w-full py-3 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
              Continuer vers le prochain module
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-white p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">{quiz.titre}</h3>
        <span className="text-xs font-bold bg-muted px-3 py-1 rounded-full">
          {currentQ + 1}/{quiz.questions.length}
        </span>
      </div>

      {/* Question */}
      <div className="flex flex-col gap-3">
        <p className="text-base font-bold text-foreground">{q.question_text}</p>

        {q.type === "mcq" && q.options && (
          <div className="flex flex-col gap-2">
            {q.options.map((opt, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border border-border hover:bg-muted transition-colors">
                <input type="radio" name={q.id} value={i.toString()} checked={answers[q.id] === i.toString()}
                  onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                  className="cursor-pointer" />
                <span className="text-sm text-foreground">{opt}</span>
              </label>
            ))}
          </div>
        )}

        {q.type === "true_false" && (
          <div className="flex gap-3">
            {["true", "false"].map((val) => (
              <label key={val} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name={q.id} value={val} checked={answers[q.id] === val}
                  onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                  className="cursor-pointer" />
                <span className="text-sm text-foreground capitalize">{val === "true" ? "Vrai" : "Faux"}</span>
              </label>
            ))}
          </div>
        )}

        {q.type === "free_text" && (
          <textarea value={answers[q.id] ?? ""} onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
            placeholder="Votre réponse..." rows={3}
            className="w-full rounded-lg border-2 border-accent px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" />
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button disabled={currentQ === 0} onClick={() => setCurrentQ(currentQ - 1)}
          className="px-4 py-2.5 rounded-lg border-2 border-border text-foreground font-bold text-sm hover:bg-muted disabled:opacity-40">
          Précédent
        </button>

        {currentQ === quiz.questions.length - 1 ? (
          <button onClick={handleSubmit} disabled={loading}
            className="flex-1 py-2.5 rounded-lg font-bold text-white text-sm hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
            style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
            {loading ? "Envoi..." : "Soumettre le quiz"}
          </button>
        ) : (
          <button onClick={() => setCurrentQ(currentQ + 1)}
            className="flex-1 py-2.5 rounded-lg font-bold text-white text-sm hover:opacity-90"
            style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
            Suivant
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Page Cours ────────────────────────────────────────────────────── */
export default function CoursPage() {
  const { id } = useParams<{ id: string }>();
  const [videos, setVideos] = useState<Video[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentModuleIdx, setCurrentModuleIdx] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    async function load() {
      const supabase = createClient();

      /* Vérifier l'enrôlement */
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = "/connexion"; return; }

      const { data: enrolled } = await supabase
        .from("enrollments")
        .select("id")
        .eq("user_id", user.id)
        .eq("formation_id", id)
        .single();

      if (!enrolled) { window.location.href = `/formations/${id}`; return; }

      /* Charger vidéos et quiz */
      const [vRes, qRes] = await Promise.all([
        fetch(`/api/videos?formationId=${id}`),
        fetch(`/api/quiz?formationId=${id}`),
      ]);

      const v = await vRes.json();
      const q = await qRes.json();

      setVideos(v.videos ?? []);
      setQuizzes(q.quizzes ?? []);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 size={32} className="text-primary animate-spin" />
      </div>
    );
  }

  const currentModule = videos.find((v) => v.module_index === currentModuleIdx);
  const currentQuiz = quizzes.find((q) => q.module_index === currentModuleIdx);
  const totalModules = Math.max(
    Math.max(...videos.map((v) => v.module_index), -1),
    Math.max(...quizzes.map((q) => q.module_index), -1)
  ) + 1;

  return (
    <section className="bg-white py-8 px-4 sm:px-6 lg:px-8 min-h-[100vh]">
      <div className="max-w-5xl mx-auto">

        {/* Progression */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-bold text-foreground">Module {currentModuleIdx + 1}/{totalModules}</p>
            <p className="text-xs text-muted-foreground">
              {Math.round(((currentModuleIdx + 1) / totalModules) * 100)}% complété
            </p>
          </div>
          <div className="w-full h-2 rounded-full bg-border overflow-hidden">
            <div className="h-full transition-all" style={{
              width: `${((currentModuleIdx + 1) / totalModules) * 100}%`,
              background: "linear-gradient(to right, #2934f2, #57f27d)",
            }} />
          </div>
        </div>

        {/* Lecteur vidéo */}
        {currentModule && (
          <div className="rounded-2xl overflow-hidden bg-black mb-8">
            <video
              src={currentModule.file_url}
              controls
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Infos module */}
        {currentModule && (
          <div className="rounded-2xl border border-border bg-muted/30 p-6 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">{currentModule.titre}</h2>
            {currentModule.description && (
              <p className="text-sm text-muted-foreground">{currentModule.description}</p>
            )}
          </div>
        )}

        {/* Quiz */}
        {currentQuiz && !showQuiz ? (
          <div className="rounded-2xl border border-border bg-white p-6 mb-8 text-center">
            <FileText size={32} className="text-primary mx-auto mb-3" />
            <h3 className="text-lg font-bold text-foreground mb-2">{currentQuiz.titre}</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm mx-auto">
              {currentQuiz.description}
            </p>
            <button onClick={() => setShowQuiz(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
              Commencer le quiz
            </button>
          </div>
        ) : currentQuiz && showQuiz ? (
          <div className="mb-8">
            <QuizInterface quiz={currentQuiz} formationId={id} onComplete={() => {
              setShowQuiz(false);
              if (currentModuleIdx < totalModules - 1) setCurrentModuleIdx(currentModuleIdx + 1);
            }} />
          </div>
        ) : null}

        {/* Navigation */}
        <div className="flex gap-3 justify-between">
          <button disabled={currentModuleIdx === 0} onClick={() => setCurrentModuleIdx(currentModuleIdx - 1)}
            className="px-6 py-3 rounded-xl border-2 border-border text-foreground font-bold text-sm hover:bg-muted disabled:opacity-40">
            ← Précédent
          </button>

          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            {currentQuiz && showQuiz ? "Complétez le quiz" : currentModule ? `Regardez: ${currentModule.titre}` : "Fin du cours"}
          </span>

          <button disabled={currentModuleIdx === totalModules - 1 || (currentQuiz && !showQuiz)}
            onClick={() => {
              if (currentQuiz && !showQuiz) setShowQuiz(true);
              else if (currentModuleIdx < totalModules - 1) setCurrentModuleIdx(currentModuleIdx + 1);
            }}
            className="px-6 py-3 rounded-xl font-bold text-white text-sm hover:opacity-90 disabled:opacity-40"
            style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
            {currentModuleIdx === totalModules - 1 ? "Terminé ✓" : "Suivant →"}
          </button>
        </div>

      </div>
    </section>
  );
}
