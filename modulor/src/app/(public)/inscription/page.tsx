"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore, type UserRole } from "@/store/authStore";
import { PasswordInput } from "@/components/ui/PasswordInput";

const PROFILS: { id: UserRole; label: string }[] = [
  { id: "etudiant",   label: "Élève / Étudiant" },
  { id: "formateur",  label: "Enseignant / Formateur" },
  { id: "cadre",      label: "Cadre éducatif" },
  { id: "autre",      label: "Autres" },
];

function FormInput({ label, type = "text", placeholder, value, onChange }: {
  label: string; type?: string; placeholder?: string;
  value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-semibold text-foreground">{label}</label>
      <input type={type} placeholder={placeholder} value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border-2 border-accent bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all" />
    </div>
  );
}

export default function InscriptionPage() {
  const router = useRouter();

  const [nom,      setNom]      = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [profil,   setProfil]   = useState<UserRole>("etudiant");
  const [error,    setError]    = useState<string | null>(null);
  const [loading,  setLoading]  = useState(false);

  const { setUser } = useAuthStore();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        /* Supabase redirigera vers /auth/callback après confirmation email */
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/tableau-de-bord`,
        data: { nom, role: profil },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      await supabase.from("profiles").upsert({
        id:    data.user.id,
        nom,
        email,
        role:  profil,
      });
    }

    router.push(`/verifier-email?email=${encodeURIComponent(email)}`);
  }

  return (
    <section style={{
      background: "linear-gradient(to bottom, #F3F7F5 0%, #E4FEEC 100%)",
      position: "relative"
    }} className="py-10 sm:py-12 px-4 min-h-[80vh]">
      {/* Patterns doodles par-dessus le dégradé */}
      <div className="absolute inset-0 pointer-events-none z-5 hidden lg:block">
        <Image src="/images/pattern-hero.png" alt="" fill className="object-cover opacity-30" aria-hidden />
      </div>
      <div className="absolute inset-0 pointer-events-none z-5 hidden lg:block">
        <Image src="/images/pattern-hero.png" alt="" fill className="object-cover opacity-30 [transform:scaleX(-1)]" aria-hidden />
      </div>

      <motion.div className="relative z-10 max-w-md mx-auto flex flex-col gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>

        <motion.div className="text-center"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
          <h1 className="text-2xl font-bold text-primary">Inscrivez-vous</h1>
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
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
            <FormInput label="Nom/Prénoms" placeholder="Votre nom complet" value={nom} onChange={setNom} />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
            <FormInput label="Email" type="email" placeholder="votre@email.com" value={email} onChange={setEmail} />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
            <PasswordInput label="Mot de passe" value={password} onChange={setPassword} />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
            <PasswordInput label="Confirmation de mot de passe" value={confirm} onChange={setConfirm} />
          </motion.div>

          {/* Type de profil */}
          <motion.div className="flex flex-col gap-2 mt-1"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
            <label className="text-sm font-semibold text-foreground">Type de profil</label>
            <div className="flex flex-col gap-2.5">
              {PROFILS.map((p, idx) => (
                <motion.label key={p.id} className="flex items-center gap-3 cursor-pointer group"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}>
                  <input type="radio" name="profil" value={p.id}
                    checked={profil === p.id} onChange={() => setProfil(p.id)} className="sr-only" />
                  <div className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                    profil === p.id ? "border-accent bg-accent" : "border-border bg-white group-hover:border-accent"
                  }`}>
                    {profil === p.id && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-foreground">{p.label}</span>
                </motion.label>
              ))}
            </div>
          </motion.div>

          <motion.button type="submit" disabled={loading}
            className="w-full py-4 rounded-xl font-bold text-white text-base mt-2 hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-60"
            style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
            {loading ? "Création du compte..." : "Créer mon compte"}
          </motion.button>
        </motion.form>

        <motion.p className="text-center text-sm text-muted-foreground"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
          Déjà un compte ?{" "}
          <Link href="/connexion" className="text-primary font-bold hover:underline">Se connecter</Link>
        </motion.p>
        <motion.p className="text-center text-xs text-muted-foreground"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
          Rejoignez Modulor et commencez votre parcours d&apos;apprentissage.
        </motion.p>
      </motion.div>
    </section>
  );
}
