"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { CheckCircle2, Loader2, XCircle, BookOpen, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

/* ─── Contenu (nécessite Suspense pour useSearchParams) ─────────────── */
function SuccesContent() {
  const searchParams = useSearchParams();
  const txId = searchParams.get("tx");

  const [status,  setStatus]  = useState<"loading" | "success" | "pending" | "failed">("loading");
  const [nbForms, setNbForms] = useState(0);

  useEffect(() => {
    if (!txId) { setStatus("failed"); return; }

    const supabase = createClient();
    let attempts = 0;

    /* Polling : le webhook peut prendre quelques secondes */
    const interval = setInterval(async () => {
      attempts++;

      const { data: tx } = await supabase
        .from("transactions")
        .select("statut, metadata")
        .eq("id", txId)
        .single();

      if (tx?.statut === "success") {
        const ids = (tx.metadata?.formationIds as string[]) ?? [];
        setNbForms(ids.length);
        setStatus("success");
        clearInterval(interval);
      } else if (tx?.statut === "failed" || attempts >= 10) {
        setStatus(tx?.statut === "failed" ? "failed" : "pending");
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [txId]);

  /* ─── Loading ─── */
  if (status === "loading") {
    return (
      <div className="flex flex-col items-center gap-4 py-16">
        <Loader2 size={48} className="text-primary animate-spin" />
        <p className="text-base font-bold text-foreground">Confirmation du paiement en cours...</p>
        <p className="text-sm text-muted-foreground text-center max-w-xs">
          Veuillez patienter, nous vérifions votre paiement auprès de FedaPay.
        </p>
      </div>
    );
  }

  /* ─── Succès ─── */
  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-6 py-12 text-center max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
          <CheckCircle2 size={44} className="text-accent" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-foreground">Paiement confirmé !</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {nbForms > 1
              ? `Vous êtes désormais inscrit à ${nbForms} formations. Bonne formation !`
              : "Vous êtes désormais inscrit à votre formation. Bonne formation !"}
          </p>
        </div>

        <div className="rounded-2xl bg-muted/40 border border-border px-6 py-4 w-full text-left flex flex-col gap-2">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Prochaines étapes</p>
          {[
            "Vos formations sont accessibles depuis le tableau de bord",
            "Suivez votre progression module par module",
            "Obtenez votre certificat à 100% de complétion",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
              <p className="text-xs text-foreground">{step}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link href="/tableau-de-bord" className="flex-1">
            <span className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-opacity cursor-pointer"
              style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
              <BookOpen size={16} /> Mes formations
            </span>
          </Link>
          <Link href="/formations" className="flex-1">
            <span className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-primary text-sm border-2 border-primary hover:bg-primary/5 transition-colors cursor-pointer">
              Explorer d&apos;autres formations <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </div>
    );
  }

  /* ─── En attente (webhook pas encore reçu) ─── */
  if (status === "pending") {
    return (
      <div className="flex flex-col items-center gap-6 py-12 text-center max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-yellow-50 flex items-center justify-center">
          <Loader2 size={44} className="text-yellow-500" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-foreground">Paiement en cours de traitement</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Votre paiement a bien été initié. La confirmation peut prendre quelques minutes.
            Vous serez notifié dès que votre inscription sera activée.
          </p>
        </div>
        <Link href="/tableau-de-bord">
          <span className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-opacity cursor-pointer"
            style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
            Aller au tableau de bord
          </span>
        </Link>
      </div>
    );
  }

  /* ─── Échec ─── */
  return (
    <div className="flex flex-col items-center gap-6 py-12 text-center max-w-md mx-auto">
      <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
        <XCircle size={44} className="text-red-500" />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-foreground">Paiement non abouti</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Votre paiement n&apos;a pas pu être traité. Aucun montant n&apos;a été débité.
          Veuillez réessayer ou choisir un autre moyen de paiement.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <Link href="/panier" className="flex-1">
          <span className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-opacity cursor-pointer"
            style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
            Réessayer
          </span>
        </Link>
        <Link href="/contact" className="flex-1">
          <span className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-primary text-sm border-2 border-primary hover:bg-primary/5 transition-colors cursor-pointer">
            Contacter le support
          </span>
        </Link>
      </div>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────── */
export default function PaiementSuccesPage() {
  return (
    <section className="min-h-[70vh] bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Suspense fallback={
          <div className="flex justify-center py-20">
            <Loader2 size={36} className="text-primary animate-spin" />
          </div>
        }>
          <SuccesContent />
        </Suspense>
      </div>
    </section>
  );
}
