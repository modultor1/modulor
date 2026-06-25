-- =============================================================
--  MODULOR — Réparation des privilèges (GRANT) + RLS
--  À exécuter dans : Supabase Dashboard > SQL Editor
--
--  CAUSE : les rôles anon / authenticated / service_role ont
--  perdu leurs privilèges sur les tables public.* → erreurs
--  "42501 permission denied for table" (HTTP 403) sur le
--  dashboard, le portefeuille, etc.
--
--  Ce script restaure le modèle de droits standard Supabase
--  (grants pour les rôles + RLS sur les tables de données privées).
-- =============================================================

-- ─── 1) Usage du schéma ─────────────────────────────────────
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

-- ─── 2) service_role : accès complet (back-end / API) ───────
GRANT ALL ON ALL TABLES    IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL ON ALL ROUTINES  IN SCHEMA public TO service_role;

-- ─── 3) authenticated / anon : privilèges de base ───────────
--  (la sécurité par ligne est assurée par les policies RLS ci-dessous)
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT                         ON ALL TABLES IN SCHEMA public TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated, anon;

-- ─── 4) Privilèges par défaut pour les FUTURES tables ───────
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT ALL ON TABLES TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT USAGE, SELECT ON SEQUENCES TO authenticated, anon, service_role;

-- =============================================================
--  5) RLS : activer + policies "propriétaire de la ligne"
--  Indispensable : sans ça, le GRANT SELECT laisserait un
--  utilisateur lire les lignes des AUTRES.
-- =============================================================

-- profiles : chacun voit / modifie SON profil
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS profiles_select_own ON public.profiles;
CREATE POLICY profiles_select_own ON public.profiles FOR SELECT USING (id = auth.uid());
DROP POLICY IF EXISTS profiles_update_own ON public.profiles;
CREATE POLICY profiles_update_own ON public.profiles FOR UPDATE USING (id = auth.uid());

-- wallet : chacun voit SON portefeuille
ALTER TABLE public.wallet ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS wallet_select_own ON public.wallet;
CREATE POLICY wallet_select_own ON public.wallet FOR SELECT USING (user_id = auth.uid());

-- transactions : chacun voit SES transactions
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS transactions_select_own ON public.transactions;
CREATE POLICY transactions_select_own ON public.transactions FOR SELECT USING (user_id = auth.uid());

-- notifications : chacun voit / marque-lu SES notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS notifications_select_own ON public.notifications;
CREATE POLICY notifications_select_own ON public.notifications FOR SELECT USING (user_id = auth.uid());
DROP POLICY IF EXISTS notifications_update_own ON public.notifications;
CREATE POLICY notifications_update_own ON public.notifications FOR UPDATE USING (user_id = auth.uid());

-- formations : catalogue PUBLIC (lecture pour tous)
ALTER TABLE public.formations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS formations_select_all ON public.formations;
CREATE POLICY formations_select_all ON public.formations FOR SELECT USING (true);

-- =============================================================
--  6) VÉRIFICATION — tables public SANS RLS activée
--  anon/authenticated ont maintenant un GRANT : toute table de
--  cette liste qui contient des données PRIVÉES doit recevoir
--  une policy "propriétaire" (sinon lecture par n'importe qui).
-- =============================================================
SELECT c.relname AS table_sans_rls
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public'
  AND c.relkind = 'r'
  AND c.relrowsecurity = false
ORDER BY c.relname;
