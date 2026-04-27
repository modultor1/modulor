"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
    <div className="relative overflow-hidden bg-white" style={{ minHeight: 360 }}>
      <Image src="/images/connexion-bg.png" alt="" fill className="object-cover" aria-hidden />
      <div className="absolute inset-0 pointer-events-none">
        <Image src="/images/connexion-pattern.png" alt="" fill className="object-cover opacity-40" aria-hidden />
      </div>

      <div className="relative z-10 flex flex-col items-center pt-6 pb-0">
        <h1 className="text-2xl md:text-3xl font-bold text-primary text-center mb-3">
          Rejoignez-nous ici
        </h1>

        <div className="relative w-full flex justify-center items-end" style={{ height: 320 }}>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-full pointer-events-none">
            <Image src="/images/connexion-bg-man.png" alt="" fill className="object-cover" aria-hidden />
          </div>
          <Image src="/images/connexion-bubble-green-left.png" alt="" width={100} height={100}
            className="absolute top-10 left-[8%] z-20 animate-bounce" style={{ animationDuration: "3.5s" }} />
          <Image src="/images/connexion-bubble-blue-top.png" alt="" width={110} height={110}
            className="absolute top-4 right-[8%] z-20 animate-bounce" style={{ animationDuration: "3s", animationDelay: "0.5s" }} />
          <Image src="/images/connexion-bubble-green-right.png" alt="" width={85} height={85}
            className="absolute bottom-24 right-[6%] z-20 animate-bounce" style={{ animationDuration: "4s", animationDelay: "1s" }} />
          <div className="relative z-10">
            <Image src="/images/connexion-man.png" alt="Bienvenue" width={500} height={320}
              className="object-contain object-bottom drop-shadow-lg" style={{ height: 320, width: 500 }} priority />
          </div>
          <Image src="/images/connexion-bubble-blue-bottom.png" alt="" width={95} height={85}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce"
            style={{ animationDuration: "3.2s", animationDelay: "0.8s" }} />
        </div>
      </div>
    </div>
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
    <>
      <ConnexionHero />

      <section className="bg-white py-10 sm:py-12 px-4">
        <div className="max-w-md mx-auto flex flex-col gap-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-primary">Connectez-vous</h2>
            <p className="text-sm text-muted-foreground mt-1">Tu crées, Modulor s&apos;occupe du reste</p>
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Pas encore de compte ?{" "}
            <Link href="/inscription" className="text-primary font-bold hover:underline">Créer un compte</Link>
          </p>
          <Link href="/inscription" className="text-center text-sm text-primary hover:underline">
            Accédez à votre espace personnel Modulor
          </Link>
        </div>
      </section>
    </>
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
