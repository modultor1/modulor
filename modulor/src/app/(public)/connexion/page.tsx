"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/store/authStore";
import { PasswordInput } from "@/components/ui/PasswordInput";

/* ─── Input ─────────────────────────────────────────────────────────── */
function FormInput({ label, type = "text", placeholder, value, onChange, error }: {
  label: string; type?: string; placeholder?: string;
  value: string; onChange: (v: string) => void; error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-semibold text-foreground">{label}</label>
      <input
        type={type} placeholder={placeholder} value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border-2 bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all ${
          error ? "border-red-400" : "border-accent"
        }`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────────── */
function ConnexionHero() {
  return (
    <motion.div className="relative overflow-hidden" style={{ minHeight: 580 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}>

      <div className="relative z-10 flex flex-col items-center pt-6 pb-0">
        <h1 className="text-2xl md:text-3xl font-bold text-primary text-center mb-8">
          Rejoignez-nous ici
        </h1>

        <div className="relative w-full flex justify-center items-center" style={{ height: 520 }}>
          {/* Bulles (hors du conteneur maské, donc opaques) */}
          {/* Bulle verte petite — haut gauche (agrandie + rapprochée) */}
          <Image src="/images/connexion-bubble-green-left.png" alt="" width={90} height={90}
            className="absolute z-5" style={{ top: "19%", left: "35%", opacity: 1 }} />

          {/* Bulle bleue grande — haut droite (agrandie + rapprochée) */}
          <Image src="/images/connexion-bubble-blue-top.png" alt="" width={145} height={145}
            className="absolute z-5" style={{ top: "7%", right: "28%", opacity: 1 }} />

          {/* Bulle bleue moyenne — bas gauche (agrandie + rapprochée) */}
          <Image src="/images/connexion-bubble-blue-bottom.png" alt="" width={148} height={148}
            className="absolute z-5" style={{ bottom: "18%", left: "27%", opacity: 1 }} />

          {/* Bulle verte moyenne — bas droite (agrandie + rapprochée) */}
          <Image src="/images/connexion-bubble-green-right.png" alt="" width={120} height={120}
            className="absolute z-5" style={{ bottom: "25%", right: "27%", opacity: 1 }} />

          {/* Image homme — grande, centrée, mask appliqué UNIQUEMENT à l'image */}
          <div className="relative z-10 flex items-center justify-center">
            <Image src="/images/connexion-man.png" alt="Bienvenue" width={750} height={620}
              className="object-contain drop-shadow-lg" priority
              style={{
                maskImage: "linear-gradient(to bottom, black 45%, transparent 90%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 45%, transparent 90%)"
              }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Formulaire (séparé pour Suspense) ─────────────────────────────── */
function ConnexionForm() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const redirect     = searchParams.get("redirect") ?? "/tableau-de-bord";

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState<string | null>(null);
  const [loading,  setLoading]  = useState(false);

  const { setUser } = useAuthStore();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
      return;
    }

    setUser(data.user);
    router.push(redirect);
    router.refresh();
  }

  return (
    <div style={{
      background: "linear-gradient(to bottom, #F3F7F5 0%, #E4FEEC 100%)",
      position: "relative"
    }}>
      {/* Patterns doodles par-dessus le dégradé */}
      <div className="absolute inset-0 pointer-events-none z-5 hidden lg:block">
        <Image src="/images/pattern-hero.png" alt="" fill className="object-cover opacity-30" aria-hidden />
      </div>
      <div className="absolute inset-0 pointer-events-none z-5 hidden lg:block">
        <Image src="/images/pattern-hero.png" alt="" fill className="object-cover opacity-30 [transform:scaleX(-1)]" aria-hidden />
      </div>

      <ConnexionHero />

      <motion.section className="relative py-10 sm:py-12 px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}>
        <motion.div className="relative z-10 max-w-md mx-auto flex flex-col gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <motion.div className="text-center"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
            <h2 className="text-2xl font-bold text-primary">Connectez-vous</h2>
            <p className="text-sm text-muted-foreground mt-1">Tu crées, Modulor s&apos;occupe du reste</p>
          </motion.div>

          {error && (
            <motion.div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 text-center"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
              {error}
            </motion.div>
          )}

          <motion.form onSubmit={handleSubmit} className="flex flex-col gap-4"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
            <FormInput label="Email" type="email" placeholder="votre@email.com"
              value={email} onChange={setEmail} />
            <PasswordInput label="Mot de passe"
              value={password} onChange={setPassword} />
            <div className="text-right -mt-1">
              <Link href="#" className="text-sm text-primary font-semibold hover:underline">
                Mot de passe oublié ?
              </Link>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-white text-base mt-1 hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-60"
              style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </motion.form>

          <motion.p className="text-center text-sm text-muted-foreground"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
            Pas encore de compte ?{" "}
            <Link href="/inscription" className="text-primary font-bold hover:underline">Créer un compte</Link>
          </motion.p>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
            <Link href="/inscription" className="text-center text-sm text-primary hover:underline">
              Accédez à votre espace personnel Modulor
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────── */
export default function ConnexionPage() {
  return (
    <Suspense fallback={null}>
      <ConnexionForm />
    </Suspense>
  );
}
