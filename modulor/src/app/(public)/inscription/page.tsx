"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore, type UserRole } from "@/store/authStore";

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

    /* 1. Créer le compte */
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nom, role: profil },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    /* 2. Créer le profil dans la table profiles */
    if (data.user) {
      await supabase.from("profiles").upsert({
        id:    data.user.id,
        nom,
        email,
        role:  profil,
      });
      }

    /* Redirige vers la page de vérification d'email */
    router.push(`/verifier-email?email=${encodeURIComponent(email)}`);
    router.refresh();
  }

  return (
    <section className="bg-white py-10 sm:py-12 px-4 min-h-[80vh]">
      <div className="max-w-md mx-auto flex flex-col gap-6">

        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary">Inscrivez-vous</h1>
          <p className="text-sm text-muted-foreground mt-1">Tu crées, Modulor s&apos;occupe du reste</p>
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormInput label="Nom/Prénoms" placeholder="Votre nom complet" value={nom} onChange={setNom} />
          <FormInput label="Email" type="email" placeholder="votre@email.com" value={email} onChange={setEmail} />
          <FormInput label="Mot de passe" type="password" placeholder="••••••••" value={password} onChange={setPassword} />
          <FormInput label="Confirmation de mot de passe" type="password" placeholder="••••••••" value={confirm} onChange={setConfirm} />

          {/* Type de profil */}
          <div className="flex flex-col gap-2 mt-1">
            <label className="text-sm font-semibold text-foreground">Type de profil</label>
            <div className="flex flex-col gap-2.5">
              {PROFILS.map((p) => (
                <label key={p.id} className="flex items-center gap-3 cursor-pointer group">
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
                </label>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-4 rounded-xl font-bold text-white text-base mt-2 hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-60"
            style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
            {loading ? "Création du compte..." : "Créer mon compte"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Déjà un compte ?{" "}
          <Link href="/connexion" className="text-primary font-bold hover:underline">Se connecter</Link>
        </p>
        <p className="text-center text-xs text-muted-foreground">
          Rejoignez Modulor et commencez votre parcours d&apos;apprentissage.
        </p>
      </div>
    </section>
  );
}
