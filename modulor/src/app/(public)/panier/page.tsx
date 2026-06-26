"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Trash2, ChevronRight, CheckCircle2, Loader2, X } from "lucide-react";
import { motion } from "motion/react";
import { formatCFA } from "@/lib/utils";
import { StarRating } from "@/components/ui/StarRating";

interface CartFormation {
  id: string;
  titre: string;
  domaine: string;
  note: number;
  prix: number;
  image: string;
}
interface CartItem {
  id: string;
  added_at: string;
  formation: CartFormation;
}

/* ─── Hero ──────────────────────────────────────────────────────────── */
function CartHero() {
  return (
    <motion.section className="relative overflow-hidden w-full" style={{ minHeight: 340 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}>
      <Image src="/images/bg-hero.png" alt="" fill className="object-cover" aria-hidden priority />
      <div className="absolute inset-0 pointer-events-none">
        <Image src="/images/pattern-hero.png" alt="" fill className="object-cover opacity-40" aria-hidden />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12">

          {/* Texte */}
          <motion.div className="flex flex-col gap-4"
            initial="hidden" animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }}>
            <motion.h1 style={{ fontFamily: "var(--font-tt-interphases)", fontWeight: 700, fontSize: "clamp(36px, 7vw, 64px)" }} className="leading-tight"
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
              <span style={{ color: "#03251C" }}>Panier et</span><br />
              <span style={{ color: "#2934F2" }}>Paiements</span>
            </motion.h1>
            <motion.div className="flex items-start gap-3"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
              <p style={{ fontFamily: "var(--font-tt-interphases)", fontWeight: 500, fontSize: "clamp(17px, 2.4vw, 24px)", color: "#21D34C" }} className="max-w-sm leading-snug">
                Vos différents choix de formations ont été ajouté au panier
              </p>
              <Image src="/images/cart-bubble-green.png" alt="" width={48} height={48} className="object-contain shrink-0 mt-1 hidden sm:block" />
            </motion.div>
          </motion.div>

          {/* Illustration panier 3D + bulles */}
          <div className="relative hidden md:flex justify-center items-center min-h-[320px]">
            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.3 }}>
              <Image src="/images/cart-hero-3d.png" alt="Panier" width={380} height={360} className="object-contain" priority />
            </motion.div>

            {/* Bulles flottantes "!" autour du panier */}
            <motion.div className="absolute top-0 left-[28%] pointer-events-none"
              initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.7 }}>
              <Image src="/images/cart-bubble-blue.png" alt="" width={52} height={52} className="object-contain" />
            </motion.div>
            <motion.div className="absolute top-4 right-0 pointer-events-none"
              initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.85 }}>
              <Image src="/images/cart-bubble-blue.png" alt="" width={72} height={72} className="object-contain" />
            </motion.div>
            <motion.div className="absolute top-1/2 right-[2%] pointer-events-none"
              initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 1.0 }}>
              <Image src="/images/cart-bubble-blue.png" alt="" width={44} height={44} className="object-contain" />
            </motion.div>
            <motion.div className="absolute bottom-4 left-[6%] pointer-events-none"
              initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 1.15 }}>
              <Image src="/images/cart-bubble-green.png" alt="" width={46} height={46} className="object-contain" />
            </motion.div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}

/* ─── État vide ─────────────────────────────────────────────────────── */
function EmptyCart() {
  return (
    <motion.div className="flex flex-col items-center justify-center py-16 gap-5"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="relative w-60 h-56 flex items-center justify-center">
        <Image src="/images/cart-empty-cloud.png" alt="" fill className="object-contain" aria-hidden />
        <div className="relative z-10 w-36 h-36">
          <Image src="/images/cart-empty-icon.png" alt="Panier vide" fill className="object-contain" />
          <span className="absolute -top-1 right-3 w-9 h-9 rounded-full bg-red-500 flex items-center justify-center shadow-md">
            <X size={18} className="text-white" strokeWidth={3} />
          </span>
        </div>
      </div>
      <p className="text-lg font-bold text-foreground">Votre panier est vide</p>
      <Link href="/formations">
        <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white text-sm hover:opacity-90 transition-opacity cursor-pointer"
          style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
          Découvrir les formations <ChevronRight size={15} />
        </span>
      </Link>
    </motion.div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────── */
export default function PanierPage() {
  const router = useRouter();
  const [items,     setItems]     = useState<CartItem[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [paying,    setPaying]    = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [payMode,   setPayMode]   = useState<string>("");
  const [error,     setError]     = useState<string | null>(null);

  const loadCart = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/cart");
    const data = await res.json();
    setItems(data.items ?? []);
    setLoading(false);
  }, []);

  // Chargement du panier au montage : effet légitime (fetch déclenche setLoading).
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { loadCart(); }, [loadCart]);

  async function removeItem(formationId: string) {
    setItems((prev) => prev.filter((i) => i.formation.id !== formationId));
    await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formationId }),
    });
  }

  async function handlePay() {
    if (!confirmed) { setError("Veuillez confirmer la commande."); return; }
    if (!payMode)   { setError("Veuillez choisir un mode de paiement."); return; }

    setPaying(true);
    setError(null);

    const formationIds = items.map((i) => i.formation.id);
    const res = await fetch("/api/fedapay/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formationIds, type: "panier" }),
    });

    const data = await res.json();
    setPaying(false);

    if (!res.ok || !data.paymentUrl) {
      setError(data.error ?? "Erreur lors du paiement. Réessayez.");
      return;
    }

    router.push(data.paymentUrl);
  }

  const total = items.reduce((acc, i) => acc + i.formation.prix, 0);

  const PAYMENT_MODES = [
    { id: "momo",       label: "MoMo",       bg: "#FCD500",  text: "#111", isText: true },
    { id: "visa",       label: "VISA",        bg: "#fff",     text: "#1A1F71", isImage: "/images/payment-visa.png" },
    { id: "fedapay",    label: "FedaPay",     bg: "#fff",     text: "#2934f2", isText: true },
    { id: "mastercard", label: "MasterCard",  bg: "#fff",     text: "#EB001B", isImage: "/images/payment-mastercard.png" },
  ];

  return (
    <>
      <CartHero />

      <section className="bg-white py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg sm:text-xl font-bold text-primary mb-6">
            Récapitulatif des formations ajoutées au panier
          </h2>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 size={32} className="text-primary animate-spin" />
            </div>
          ) : items.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="flex flex-col lg:flex-row gap-6">

              {/* Liste formations */}
              <div className="flex-1 flex flex-col gap-4">
                {items.map((item) => (
                  <div key={item.id} className="relative rounded-2xl overflow-hidden flex flex-col sm:flex-row shadow-sm">
                    <Image src="/images/formations-bg-card.png" alt="" fill className="object-cover" aria-hidden />

                    <div className="relative w-full sm:w-40 h-36 sm:h-auto shrink-0">
                      <Image src={item.formation.image} alt={item.formation.titre} fill className="object-cover" />
                    </div>

                    <div className="relative z-10 flex items-start justify-between gap-3 p-4 flex-1">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-bold text-primary">{item.formation.domaine}</span>
                        <p className="text-sm font-bold text-foreground leading-snug max-w-xs">{item.formation.titre}</p>
                        <StarRating rating={item.formation.note} size={12} />
                        <span className="text-sm font-bold text-foreground mt-1">{formatCFA(item.formation.prix)}</span>
                      </div>
                      <button onClick={() => removeItem(item.formation.id)}
                        className="shrink-0 p-1.5 rounded-lg hover:bg-red-50 transition-colors group" aria-label="Supprimer">
                        <Trash2 size={18} className="text-accent group-hover:text-red-500 transition-colors" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Récapitulatif & paiement */}
              <div className="w-full lg:w-80 shrink-0">
                <div className="relative rounded-2xl overflow-hidden p-5 flex flex-col gap-4">
                  <Image src="/images/cart-bg-summary.png" alt="" fill className="object-cover" aria-hidden />

                  <div className="relative z-10 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Formations</span>
                      <span className="text-sm font-bold">{String(items.length).padStart(2, "0")}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-border pt-3">
                      <span className="text-sm font-bold">Total :</span>
                      <span className="text-xl font-bold">{formatCFA(total)}</span>
                    </div>

                    {/* Confirmation */}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div onClick={() => setConfirmed(!confirmed)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          confirmed ? "border-accent bg-accent" : "border-border bg-white"
                        }`}>
                        {confirmed && <CheckCircle2 size={12} className="text-white" />}
                      </div>
                      <span className="text-xs text-muted-foreground">Confirmation de la commande</span>
                    </label>

                    {/* Modes de paiement */}
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-bold text-foreground">Choisir le mode de paiement</span>
                      <div className="grid grid-cols-2 gap-2">
                        {PAYMENT_MODES.map((m) => (
                          <button key={m.id} onClick={() => setPayMode(m.id)}
                            className={`flex items-center justify-center p-2.5 rounded-xl border-2 transition-colors h-12 ${
                              payMode === m.id ? "border-primary" : "border-border hover:border-primary/50"
                            }`}
                            style={{ background: m.bg }}>
                            {m.isImage ? (
                              <Image src={m.isImage} alt={m.label} width={50} height={22} className="object-contain" />
                            ) : (
                              <span className="text-xs font-bold" style={{ color: m.text }}>{m.label}</span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {error && (
                      <p className="text-xs text-red-500 text-center">{error}</p>
                    )}

                    <button onClick={handlePay} disabled={paying}
                      className="w-full py-3.5 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
                      style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
                      {paying ? <><Loader2 size={16} className="animate-spin" /> Redirection...</> : "Acheter maintenant"}
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </section>
    </>
  );
}
