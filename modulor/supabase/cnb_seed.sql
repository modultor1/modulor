-- ============================================================================
-- CNB Course Seed Data - Contrôle Nourriture et Boisson
-- Valid UUIDs only using hex characters (0-9, a-f)
-- ============================================================================

-- Insérer la formation
INSERT INTO public.formations
  (id, titre, description, domaine, prix, image, note, duree, actif, created_at)
VALUES (
  'a1b2c3d4-e5f6-4710-9010-b1c2d3e4f506'::uuid,
  'Contrôle Nourriture et Boisson',
  'Cette playlist regroupe une série de capsules pédagogiques consacrées au Contrôle Nourriture et Boisson (CNB) dans le secteur de la restauration.

L''objectif est de vous permettre de comprendre les principes fondamentaux du CNB, son rôle dans la gestion des établissements de restauration et son importance dans l''amélioration de la rentabilité, à travers la maîtrise des coûts, le contrôle des consommations et l''optimisation des pratiques professionnelles.

Ces capsules s''adressent principalement aux apprenants en formation professionnelle, aux étudiants, ainsi qu''aux professionnels souhaitant renforcer leurs connaissances en gestion restauration.

📩 Pour toute question ou échange pédagogique, vous pouvez me contacter à l''adresse suivante :
icholadaniel13@gmail.com',
  'Gestion et Restauration',
  9800,
  'https://aridzamllujmpupcdwnw.supabase.co/storage/v1/object/public/formations/cnb/thumbnail.png',
  4.8,
  '64 min',
  true,
  NOW()
) ON CONFLICT DO NOTHING;

-- ============================================================================
-- Videos (3 modules: introduction, coûts production, coûts directs)
-- ============================================================================

INSERT INTO public.videos (id, formation_id, module_index, titre, description, duration, file_url, ordre, created_at)
VALUES
  ('b2c3d4e5-f6a7-4810-a1b2-c3d4e5f6a7b1'::uuid, 'a1b2c3d4-e5f6-4710-9010-b1c2d3e4f506'::uuid, 0,
   'Introduction - Le rôle clé du CNB',
   'Découvrez les fondamentaux du Contrôle Nourriture et Boisson et son importance cruciale dans la gestion d''un établissement de restauration.',
   1511,
   'https://aridzamllujmpupcdwnw.supabase.co/storage/v1/object/public/videos/cnb/capsule-1-introduction.mp4',
   0, NOW()),
  ('c3d4e5f6-a7b8-4910-b2c3-d4e5f6a7b8c2'::uuid, 'a1b2c3d4-e5f6-4710-9010-b1c2d3e4f506'::uuid, 1,
   'Coûts de Production - Définition et types',
   'Comprenez les différents types de coûts de production et leur classification en restauration.',
   407,
   'https://aridzamllujmpupcdwnw.supabase.co/storage/v1/object/public/videos/cnb/capsule-2-couts-production.mp4',
   0, NOW()),
  ('d4e5f6a7-b8c9-4a10-c3d4-e5f6a7b8c9d3'::uuid, 'a1b2c3d4-e5f6-4710-9010-b1c2d3e4f506'::uuid, 2,
   'Coûts Directs - Explications détaillées',
   'Explorez en détail les coûts directs et apprenez à les identifier et calculer correctement.',
   1130,
   'https://aridzamllujmpupcdwnw.supabase.co/storage/v1/object/public/videos/cnb/capsule-3-couts-directs.mp4',
   0, NOW())
ON CONFLICT DO NOTHING;

-- ============================================================================
-- Quizzes (one per module)
-- ============================================================================

INSERT INTO public.quiz (id, formation_id, module_index, titre, description, passing_score, created_at)
VALUES
  ('e5f6a7b8-c9d0-4b10-d4e5-f6a7b8c9d0e1'::uuid, 'a1b2c3d4-e5f6-4710-9010-b1c2d3e4f506'::uuid, 0,
   'Quiz: Introduction au CNB',
   'Testez votre compréhension des principes fondamentaux du Contrôle Nourriture et Boisson', 80, NOW()),
  ('f6a7b8c9-d0e1-4c10-e5f6-a7b8c9d0e1f2'::uuid, 'a1b2c3d4-e5f6-4710-9010-b1c2d3e4f506'::uuid, 1,
   'Quiz: Coûts de Production',
   'Vérifiez votre maîtrise de la classification des coûts de production', 80, NOW()),
  ('a7b8c9d0-e1f2-4d10-f6a7-b8c9d0e1f2a3'::uuid, 'a1b2c3d4-e5f6-4710-9010-b1c2d3e4f506'::uuid, 2,
   'Quiz: Coûts Directs',
   'Évaluez votre compréhension des coûts directs et leur application', 80, NOW())
ON CONFLICT DO NOTHING;

-- ============================================================================
-- Quiz Questions - Module 1 (3 questions)
-- ============================================================================

INSERT INTO public.quiz_questions (id, quiz_id, type, question_text, options, correct_answer, points, ordre, created_at)
VALUES
  ('b8c9d0e1-f2a3-4e10-a1b2-c3d4e5f6a7b8'::uuid, 'e5f6a7b8-c9d0-4b10-d4e5-f6a7b8c9d0e1'::uuid, 'mcq',
   'Que signifie l''acronyme CNB ?',
   '["Contrôle Nourriture et Boisson", "Calcul Net Brut", "Coût Net de Base", "Contrôle des Normes Budgétaires"]',
   '0', 1, 0, NOW()),
  ('c9d0e1f2-a3b4-4f10-b2c3-d4e5f6a7b8c9'::uuid, 'e5f6a7b8-c9d0-4b10-d4e5-f6a7b8c9d0e1'::uuid, 'true_false',
   'Le CNB est uniquement utile dans les grands restaurants et pas applicable aux petits établissements.',
   NULL,
   'false', 1, 1, NOW()),
  ('d0e1f2a3-b4c5-4a10-c3d4-e5f6a7b8c9d0'::uuid, 'e5f6a7b8-c9d0-4b10-d4e5-f6a7b8c9d0e1'::uuid, 'mcq',
   'Quel est l''un des objectifs principaux du CNB ?',
   '["Améliorer la rentabilité par la maîtrise des coûts", "Augmenter les prix sans justification", "Réduire le nombre de clients", "Diminuer la qualité des repas"]',
   '0', 1, 2, NOW())
ON CONFLICT DO NOTHING;

-- ============================================================================
-- Quiz Questions - Module 2 (3 questions)
-- ============================================================================

INSERT INTO public.quiz_questions (id, quiz_id, type, question_text, options, correct_answer, points, ordre, created_at)
VALUES
  ('e1f2a3b4-c5d6-4b10-d4e5-f6a7b8c9d0e1'::uuid, 'f6a7b8c9-d0e1-4c10-e5f6-a7b8c9d0e1f2'::uuid, 'mcq',
   'Lesquels sont des composantes des coûts de production ?',
   '["Matières premières, énergie, main-d''œuvre directe", "Publicité, électricité, loyer", "Transport, assurance, taxes", "Fournitures de bureau et marketing"]',
   '0', 1, 0, NOW()),
  ('f2a3b4c5-d6e7-4c10-e5f6-a7b8c9d0e1f2'::uuid, 'f6a7b8c9-d0e1-4c10-e5f6-a7b8c9d0e1f2'::uuid, 'true_false',
   'Les charges fixes varient proportionnellement en fonction du volume de production.',
   NULL,
   'false', 1, 1, NOW()),
  ('a3b4c5d6-e7f8-4d10-f6a7-b8c9d0e1f2a3'::uuid, 'f6a7b8c9-d0e1-4c10-e5f6-a7b8c9d0e1f2'::uuid, 'mcq',
   'Comment s''exprime généralement le food cost en restauration ?',
   '["En pourcentage du chiffre d''affaires", "En kilogrammes par jour", "En nombre de couverts", "En journées de travail"]',
   '0', 1, 2, NOW())
ON CONFLICT DO NOTHING;

-- ============================================================================
-- Quiz Questions - Module 3 (3 questions)
-- ============================================================================

INSERT INTO public.quiz_questions (id, quiz_id, type, question_text, options, correct_answer, points, ordre, created_at)
VALUES
  ('b4c5d6e7-f8a9-4e10-a1b2-c3d4e5f6a7b8'::uuid, 'a7b8c9d0-e1f2-4d10-f6a7-b8c9d0e1f2a3'::uuid, 'mcq',
   'Parmi ces éléments, lequel est un coût direct en restauration ?',
   '["Les matières premières consommées pour un plat", "Le loyer du restaurant", "L''électricité générale du bâtiment", "Les salaires de direction"]',
   '0', 1, 0, NOW()),
  ('c5d6e7f8-a9b0-4f10-b2c3-d4e5f6a7b8c9'::uuid, 'a7b8c9d0-e1f2-4d10-f6a7-b8c9d0e1f2a3'::uuid, 'true_false',
   'Un coût direct peut être imputé directement à un produit ou service sans répartition.',
   NULL,
   'true', 1, 1, NOW()),
  ('d6e7f8a9-b0c1-4a10-c3d4-e5f6a7b8c9d0'::uuid, 'a7b8c9d0-e1f2-4d10-f6a7-b8c9d0e1f2a3'::uuid, 'mcq',
   'Donnez un exemple de coût direct dans le secteur de la restauration.',
   '["Matières premières pour un plat", "Loyer du bâtiment", "Électricité générale", "Salaires de gestion"]',
   '0', 1, 2, NOW())
ON CONFLICT DO NOTHING;
