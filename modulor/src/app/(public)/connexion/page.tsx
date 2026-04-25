"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/* ─── Types de profil ───────────────────────────────────────────────── */
const PROFILS = [
  { id: "etudiant",   label: "Élève / Étudiant" },
  { id: "formateur",  label: "Enseignant / Formateur" },
  { id: "cadre",      label: "Cadre éducatif" },
  { id: "autre",      label: "Autres" },
];

/* ─── Composant input ───────────────────────────────────────────────── */
function FormInput({
  label, type = "text", placeholder, value, onChange,
}: {
  label: string; type?: string; placeholder?: string;
  value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-semibold text-foreground">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border-2 border-accent bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
      />
    </div>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────────── */
function ConnexionHero() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Fond mint */}
      <Image src="/images/connexion-bg.png" alt="" fill className="object-cover" aria-hidden />
      {/* Pattern gris éducatif */}
      <div className="absolute inset-0 pointer-events-none">
        <Image src="/images/connexion-pattern.png" alt="" fill className="object-cover opacity-40" aria-hidden />
      </div>

      <div className="relative z-10 flex flex-col items-center pt-10 pb-0">
        {/* Titre */}
        <h1 className="text-3xl md:text-4xl font-bold text-primary text-center mb-6">
          Rejoignez-nous ici
        </h1>

        {/* Zone image + bulles */}
        <div className="relative flex justify-center items-end w-full max-w-lg mx-auto" style={{ height: 320 }}>

          {/* Fond dégradé derrière l'homme */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-full pointer-events-none">
            <Image src="/images/connexion-bg-man.png" alt="" fill className="object-cover" aria-hidden />
          </div>

          {/* Bulle verte gauche */}
          <Image
            src="/images/connexion-bubble-green-left.png" alt=""
            width={80} height={80}
            className="absolute top-8 left-4 z-20 animate-bounce"
            style={{ animationDuration: "3.5s" }}
          />

          {/* Bulle bleue droite haut — W243 H243 → on affiche proportionnellement */}
          <Image
            src="/images/connexion-bubble-blue-top.png" alt=""
            width={90} height={90}
            className="absolute top-2 right-4 z-20 animate-bounce"
            style={{ animationDuration: "3s", animationDelay: "0.5s" }}
          />

          {/* Bulle verte droite bas — W212 H212 */}
          <Image
            src="/images/connexion-bubble-green-right.png" alt=""
            width={70} height={70}
            className="absolute bottom-20 right-2 z-20 animate-bounce"
            style={{ animationDuration: "4s", animationDelay: "1s" }}
          />

          {/* Homme pointant vers le bas — centré, bord bas */}
          <div className="relative z-10">
            <Image
              src="/images/connexion-man.png" alt="Bienvenue sur Modulor"
              width={340} height={280}
              className="object-contain object-bottom"
              style={{ height: 280, width: 340 }}
              priority
            />
          </div>

          {/* Bulle bleue en bas — W253 H228 */}
          <Image
            src="/images/connexion-bubble-blue-bottom.png" alt=""
            width={80} height={72}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce"
            style={{ animationDuration: "3.2s", animationDelay: "0.8s" }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Formulaire Connexion ──────────────────────────────────────────── */
function LoginForm() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: intégration Supabase Auth
  }

  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-md mx-auto flex flex-col gap-6">
        {/* En-tête */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary">Connectez-vous</h2>
          <p className="text-sm text-muted-foreground mt-1">Tu crées, Modulor s&apos;occupe du reste</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormInput label="Email" type="email" placeholder="votre@email.com"
            value={email} onChange={setEmail} />
          <FormInput label="Mot de passe" type="password" placeholder="••••••••"
            value={password} onChange={setPassword} />

          <div className="text-right -mt-2">
            <Link href="#" className="text-sm text-primary font-semibold hover:underline">
              Mot de passe oublié ?
            </Link>
          </div>

          {/* Bouton Se connecter — dégradé pleine largeur */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl font-bold text-white text-base mt-1 hover:opacity-90 transition-opacity cursor-pointer"
            style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}
          >
            Se connecter
          </button>
        </form>

        <p className="text-center text-sm text-primary hover:underline cursor-pointer">
          Accédez à votre espace personnel Modulor
        </p>
      </div>
    </section>
  );
}

/* ─── Formulaire Inscription ────────────────────────────────────────── */
function RegisterForm() {
  const [nom, setNom]             = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [confirm, setConfirm]     = useState("");
  const [profil, setProfil]       = useState("etudiant");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: intégration Supabase Auth
  }

  return (
    <section className="bg-white py-12 px-4 border-t border-border">
      <div className="max-w-md mx-auto flex flex-col gap-6">
        {/* En-tête */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary">Connectez-vous</h2>
          <p className="text-sm text-muted-foreground mt-1">Tu crées, Modulor s&apos;occupe du reste</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormInput label="Nom/Prénoms" placeholder="Votre nom complet"
            value={nom} onChange={setNom} />
          <FormInput label="Email" type="email" placeholder="votre@email.com"
            value={email} onChange={setEmail} />
          <FormInput label="Mot de passe" type="password" placeholder="••••••••"
            value={password} onChange={setPassword} />
          <FormInput label="Confirmation de mot de passe" type="password" placeholder="••••••••"
            value={confirm} onChange={setConfirm} />

          {/* Type de profil */}
          <div className="flex flex-col gap-2 mt-1">
            <label className="text-sm font-semibold text-foreground">Type de profil</label>
            <div className="flex flex-col gap-2">
              {PROFILS.map((p) => (
                <label key={p.id} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative w-5 h-5 flex-shrink-0">
                    <input
                      type="radio"
                      name="profil"
                      value={p.id}
                      checked={profil === p.id}
                      onChange={() => setProfil(p.id)}
                      className="sr-only"
                    />
                    {/* Checkbox custom */}
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      profil === p.id
                        ? "border-accent bg-accent"
                        : "border-border bg-white group-hover:border-accent"
                    }`}>
                      {profil === p.id && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-foreground">{p.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Bouton Créer mon compte */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl font-bold text-white text-base mt-2 hover:opacity-90 transition-opacity cursor-pointer"
            style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}
          >
            Créer mon compte
          </button>
        </form>

        <p className="text-center text-sm text-primary hover:underline cursor-pointer">
          Rejoignez Modulor et commencez votre parcours d&apos;apprentissage.
        </p>
      </div>
    </section>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────── */
export default function ConnexionPage() {
  return (
    <>
      <ConnexionHero />
      <LoginForm />
      <RegisterForm />
    </>
  );
}
