"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/* ─── Input ─────────────────────────────────────────────────────────── */
function FormInput({ label, type = "text", placeholder, value, onChange }: {
  label: string; type?: string; placeholder?: string;
  value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-semibold text-foreground">{label}</label>
      <input
        type={type} placeholder={placeholder} value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border-2 border-accent bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
      />
    </div>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────────── */
function ConnexionHero() {
  return (
    /*
     * Design specs (1440px canvas) :
     *   Man  → X:308.79 (21.4%), Y:22.78px, W:1361.49 (94.5%), H:908.11
     *   The section clips the image at ~420px to show only the upper body.
     */
    <div
      className="relative overflow-hidden bg-white w-full"
      style={{ height: "clamp(280px, 30vw, 420px)" }}
    >
      {/* Fond mint */}
      <Image src="/images/connexion-bg.png" alt="" fill className="object-cover" aria-hidden />

      {/* Pattern éducatif */}
      <div className="absolute inset-0 pointer-events-none">
        <Image src="/images/connexion-pattern.png" alt="" fill className="object-cover opacity-35" aria-hidden />
      </div>

      {/* Titre — centré en haut, au-dessus de l'homme */}
      <div className="absolute top-5 sm:top-7 left-0 right-0 z-30 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
          Rejoignez-nous ici
        </h1>
      </div>

      {/*
       * Homme — positionné exactement selon les specs :
       *   left = 308.79 / 1440 = 21.4%
       *   top  = 22.78px
       *   width = 1361.49 / 1440 = 94.5% du viewport
       * Sur mobile (<640px) on le centre et on l'agrandit légèrement.
       */}
      <div
        className="absolute z-10 hidden sm:block"
        style={{ left: "21.4%", top: "22.78px", width: "94.5%" }}
      >
        <Image
          src="/images/connexion-man.png"
          alt="Bienvenue sur Modulor"
          width={1361}
          height={908}
          style={{ width: "100%", height: "auto" }}
          className="object-contain object-top"
          priority
        />
      </div>

      {/* Version mobile — centré, pleine largeur */}
      <div
        className="absolute z-10 sm:hidden"
        style={{ left: "50%", transform: "translateX(-50%)", top: "60px", width: "90%" }}
      >
        <Image
          src="/images/connexion-man.png"
          alt="Bienvenue sur Modulor"
          width={400}
          height={267}
          style={{ width: "100%", height: "auto" }}
          className="object-contain object-top"
          priority
        />
      </div>

      {/*
       * Bulles — positionnées proportionnellement à la design spec
       * Vert gauche  : ~5% left, ~30% top de la section
       * Bleu droite haut : ~72% left, ~8% top
       * Vert droite bas  : ~64% left, ~42% top
       * Bleu bas centre  : ~46% left, ~72% top (partiellement visible)
       */}

      {/* Bulle verte gauche */}
      <div className="absolute z-20 hidden sm:block animate-bounce"
        style={{ left: "5%", top: "30%", width: "clamp(55px, 6vw, 100px)", animationDuration: "3.5s" }}>
        <Image src="/images/connexion-bubble-green-left.png" alt="" width={100} height={100}
          style={{ width: "100%", height: "auto" }} />
      </div>

      {/* Bulle bleue haut droite (W243 H243) */}
      <div className="absolute z-20 animate-bounce"
        style={{ left: "72%", top: "6%", width: "clamp(60px, 7.5vw, 110px)", animationDuration: "3s", animationDelay: "0.5s" }}>
        <Image src="/images/connexion-bubble-blue-top.png" alt="" width={110} height={110}
          style={{ width: "100%", height: "auto" }} />
      </div>

      {/* Bulle verte bas droite (W212 H212) */}
      <div className="absolute z-20 hidden sm:block animate-bounce"
        style={{ left: "64%", top: "42%", width: "clamp(45px, 5.5vw, 85px)", animationDuration: "4s", animationDelay: "1s" }}>
        <Image src="/images/connexion-bubble-green-right.png" alt="" width={85} height={85}
          style={{ width: "100%", height: "auto" }} />
      </div>

      {/* Bulle bleue bas centre (W253 H228) */}
      <div className="absolute z-20 animate-bounce"
        style={{ left: "46%", top: "72%", width: "clamp(50px, 6.5vw, 95px)", animationDuration: "3.2s", animationDelay: "0.8s" }}>
        <Image src="/images/connexion-bubble-blue-bottom.png" alt="" width={95} height={85}
          style={{ width: "100%", height: "auto" }} />
      </div>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────── */
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

      <section className="bg-white py-10 sm:py-12 px-4">
        <div className="max-w-md mx-auto flex flex-col gap-6">

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

            <button type="submit"
              className="w-full py-4 rounded-xl font-bold text-white text-base mt-1 hover:opacity-90 transition-opacity cursor-pointer"
              style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
              Se connecter
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Pas encore de compte ?{" "}
            <Link href="/inscription" className="text-primary font-bold hover:underline">
              Créer un compte
            </Link>
          </p>

          <Link href="/inscription" className="text-center text-sm text-primary hover:underline">
            Accédez à votre espace personnel Modulor
          </Link>

        </div>
      </section>
    </>
  );
}
