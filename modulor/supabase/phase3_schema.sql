-- =============================================================
--  MODULOR — Phase 3 Schema (à exécuter après Phase 2)
--  Copier-coller dans : Supabase Dashboard > SQL Editor
-- =============================================================

-- ─── Vidéos des cours ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.videos (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  formation_id   UUID NOT NULL REFERENCES public.formations(id) ON DELETE CASCADE,
  module_index   INTEGER NOT NULL,
  titre          TEXT NOT NULL,
  description    TEXT,
  duration       INTEGER,                   -- en secondes
  file_url       TEXT NOT NULL,             -- Supabase Storage ou CDN URL
  ordre          INTEGER DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Quiz ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.quiz (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  formation_id   UUID NOT NULL REFERENCES public.formations(id) ON DELETE CASCADE,
  module_index   INTEGER NOT NULL,
  titre          TEXT NOT NULL,
  description    TEXT,
  passing_score  INTEGER DEFAULT 80,        -- Note minimale (8/10 = 80%)
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Questions du quiz ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.quiz_questions (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id        UUID NOT NULL REFERENCES public.quiz(id) ON DELETE CASCADE,
  type           TEXT NOT NULL,             -- mcq | true_false | free_text
  question_text  TEXT NOT NULL,
  options        JSONB,                     -- Pour MCQ : ["opt1", "opt2", ...]
  correct_answer TEXT NOT NULL,             -- "0" pour MCQ, "true"/"false", ou texte libre
  points         INTEGER DEFAULT 1,
  ordre          INTEGER DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Tentatives de quiz ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_id        UUID NOT NULL REFERENCES public.quiz(id) ON DELETE CASCADE,
  score          INTEGER,                   -- sur 100
  passed         BOOLEAN DEFAULT false,
  answers        JSONB,                     -- { "q_id": "user_answer", ... }
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Suivi vidéo (progression utilisateur) ─────────────────────────
CREATE TABLE IF NOT EXISTS public.video_progress (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  video_id       UUID NOT NULL REFERENCES public.videos(id) ON DELETE CASCADE,
  watched_until  INTEGER DEFAULT 0,         -- en secondes
  completed      BOOLEAN DEFAULT false,
  completed_at   TIMESTAMPTZ,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, video_id)
);

-- ─── Favoris / Liste de souhaits ────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.favorites (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  formation_id   UUID NOT NULL REFERENCES public.formations(id) ON DELETE CASCADE,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, formation_id)
);

-- =============================================================
--  INDEXES (performance)
-- =============================================================
CREATE INDEX IF NOT EXISTS idx_videos_formation ON public.videos(formation_id);
CREATE INDEX IF NOT EXISTS idx_quiz_formation ON public.quiz(formation_id);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_quiz ON public.quiz_questions(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user ON public.quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_quiz ON public.quiz_attempts(quiz_id);
CREATE INDEX IF NOT EXISTS idx_video_progress_user ON public.video_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_video_progress_video ON public.video_progress(video_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON public.favorites(user_id);

-- =============================================================
--  ROW LEVEL SECURITY
-- =============================================================

-- Videos : lecture publique
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "videos_select_all" ON public.videos FOR SELECT USING (true);

-- Quiz : lecture publique
ALTER TABLE public.quiz ENABLE ROW LEVEL SECURITY;
CREATE POLICY "quiz_select_all" ON public.quiz FOR SELECT USING (true);

-- Quiz questions : lecture publique
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "quiz_questions_select_all" ON public.quiz_questions FOR SELECT USING (true);

-- Quiz attempts : l'utilisateur voit ses propres tentatives
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "quiz_attempts_own" ON public.quiz_attempts FOR ALL USING (user_id = auth.uid());
CREATE POLICY "quiz_attempts_insert" ON public.quiz_attempts FOR INSERT WITH CHECK (true);

-- Video progress : l'utilisateur voit sa progression
ALTER TABLE public.video_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "video_progress_own" ON public.video_progress FOR ALL USING (user_id = auth.uid());

-- Favorites : l'utilisateur gère ses favoris
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "favorites_own" ON public.favorites FOR ALL USING (user_id = auth.uid());

-- =============================================================
--  DONNÉES DE TEST
-- =============================================================

-- Ajouter des vidéos à la formation 1
INSERT INTO public.videos (formation_id, module_index, titre, description, duration, file_url, ordre)
VALUES
  ('52e712d1-28a4-444e-9aca-4c4091371a34', 0, 'Introduction au développement web', 'Les bases avant de commencer', 600, 'https://example.com/video1.mp4', 0),
  ('52e712d1-28a4-444e-9aca-4c4091371a34', 1, 'HTML & CSS les fondamentaux', 'Structurer et styliser une page', 900, 'https://example.com/video2.mp4', 1),
  ('52e712d1-28a4-444e-9aca-4c4091371a34', 2, 'JavaScript pratique', 'Rendre vos pages interactives', 1200, 'https://example.com/video3.mp4', 2)
ON CONFLICT DO NOTHING;

-- Ajouter des quiz
INSERT INTO public.quiz (formation_id, module_index, titre, description, passing_score)
VALUES
  ('52e712d1-28a4-444e-9aca-4c4091371a34', 0, 'Quiz Module 1', 'Vérifiez votre compréhension', 80),
  ('52e712d1-28a4-444e-9aca-4c4091371a34', 1, 'Quiz Module 2', 'Les CSS c''est compris ?', 80)
ON CONFLICT DO NOTHING;
