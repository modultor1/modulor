"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
    <div className="relative overflow-hidden bg-white" style={{ minHeight: 480 }}>
      {/* Fond mint pleine page */}
      <Image src="/images/connexion-bg.png" alt="" fill className="object-cover" aria-hidden />

      {/* Pattern éducatif gris */}
      <div className="absolute inset-0 pointer-events-none">
        <Image src="/images/connexion-pattern.png" alt="" fill className="object-cover opacity-40" aria-hidden />
      </div>

      <div className="relative z-10 flex flex-col items-center pt-10 pb-0">
        {/* Titre */}
        <h1 className="text-3xl md:text-4xl font-bold text-primary text-center mb-4">
          Rejoignez-nous ici
        </h1>

        {/* Zone homme + bulles — pleine largeur, homme très grand */}
        <div className="relative w-full flex justify-center items-end" style={{ height: 420 }}>

          {/* Fond dégradé derrière l'homme */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-full pointer-events-none">
            <Image src="/images/connexion-bg-man.png" alt="" fill className="object-cover" aria-hidden />
          </div>

          {/* Bulle verte gauche */}
          <Image
            src="/images/connexion-bubble-green-left.png" alt=""
            width={100} height={100}
            className="absolute top-10 left-[8%] z-20 animate-bounce"
            style={{ animationDuration: "3.5s" }}
          />

          {/* Bulle bleue droite haut — W243 H243 */}
          <Image
            src="/images/connexion-bubble-blue-top.png" alt=""
            width={110} height={110}
            className="absolute top-4 right-[8%] z-20 animate-bounce"
            style={{ animationDuration: "3s", animationDelay: "0.5s" }}
          />

          {/* Bulle verte droite bas — W212 H212 */}
          <Image
            src="/images/connexion-bubble-green-right.png" alt=""
            width={85} height={85}
            className="absolute bottom-24 right-[6%] z-20 animate-bounce"
            style={{ animationDuration: "4s", animationDelay: "1s" }}
          />

          {/* Homme — très grand, centré, collé au bas */}
          <div className="relative z-10">
            <Image
              src="/images/connexion-man.png"
              alt="Bienvenue sur Modulor"
              width={620}
              height={420}
              className="object-contain object-bottom drop-shadow-lg"
              style={{ height: 420, width: 620 }}
              priority
            />
          </div>

          {/* Bulle bleue en bas — W253 H228 */}
          <Image
            src="/images/connexion-bubble-blue-bottom.png" alt=""
            width={95} height={85}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce"
            style={{ animationDuration: "3.2s", animationDelay: "0.8s" }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Page Connexion ────────────────────────────────────────────────── */
export default function ConnexionPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Supabase Auth
  }

  return (
    <>
      <ConnexionHero />

      <section className="bg-white py-12 px-4">
        <div className="max-w-md mx-auto flex flex-col gap-6">

          {/* En-tête */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-primary">Connectez-vous</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Tu crées, Modulor s&apos;occupe du reste
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <FormInput label="Email" type="email" placeholder="votre@email.com"
              value={email} onChange={setEmail} />
            <FormInput label="Mot de passe" type="password" placeholder="••••••••"
              value={password} onChange={setPassword} />

            <div className="text-right -mt-1">
              <Link href="#" className="text-sm text-primary font-semibold hover:underline">
                Mot de passe oublié ?
              </Link>
            </div>

            {/* Bouton Se connecter */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl font-bold text-white text-base mt-1 hover:opacity-90 transition-opacity cursor-pointer"
              style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}
            >
              Se connecter
            </button>
          </form>

          <Link href="/inscription" className="text-center text-sm text-primary hover:underline">
            Accédez à votre espace personnel Modulor
          </Link>

        </div>
      </section>
    </>
  );
}
