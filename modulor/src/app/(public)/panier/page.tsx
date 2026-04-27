"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Trash2, ChevronRight, CheckCircle2, ShoppingCart } from "lucide-react";
import { formatCFA } from "@/lib/utils";
import { StarRating } from "@/components/ui/StarRating";

/* ─── Types & données ───────────────────────────────────────────────── */
interface CartItem {
  id: string;
  titre: string;
  domaine: string;
  note: number;
  prix: number;
  image: string;
}

const INITIAL_CART: CartItem[] = [
  { id: "1", titre: "Apprendre les bases du codage et la création des sites", domaine: "Développement web", note: 4.5, prix: 15000, image: "/images/formation-1.png" },
  { id: "2", titre: "Apprendre les bases du codage et la création des sites", domaine: "Développement web", note: 4.5, prix: 15000, image: "/images/formation-2.png" },
  { id: "3", titre: "Apprendre les bases du codage et la création des sites", domaine: "Développement web", note: 4.5, prix: 15000, image: "/images/formation-3.png" },
  { id: "4", titre: "Apprendre les bases du codage et la création des sites", domaine: "Développement web", note: 4.5, prix: 15000, image: "/images/formation-1.png" },
];

/* ─── Hero ──────────────────────────────────────────────────────────── */
function CartHero() {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: 300 }}>
      <Image src="/images/cart-bg-hero.png" alt="" fill className="object-cover" aria-hidden />
      <div className="absolute inset-0 pointer-events-none">
        <Image src="/images/formations-pattern.png" alt="" fill className="object-cover opacity-50" aria-hidden />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-10">

          {/* Texte */}
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              <span className="text-foreground">Panier et</span><br />
              <span className="text-primary">Paiements</span>
            </h1>
            <p className="text-sm sm:text-base text-foreground max-w-xs leading-relaxed">
              Vos différents choix de formations ont été ajouté au panier
            </p>
            {/* Bulle verte */}
            <div className="mt-2 animate-bounce w-fit" style={{ animationDuration: "3.5s" }}>
              <Image src="/images/cart-bubble-green.png" alt="" width={52} height={52} />
            </div>
          </div>

          {/* Icône panier + bulles */}
          <div className="relative hidden md:flex justify-center items-center">
            <div className="animate-bounce" style={{ animationDuration: "3s" }}>
              <Image src="/images/cart-bubble-blue.png" alt="" width={72} height={72}
                className="absolute -top-4 right-12" />
            </div>
            <div className="animate-bounce" style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}>
              <Image src="/images/cart-bubble-green.png" alt="" width={56} height={56}
                className="absolute bottom-0 left-8" />
            </div>
            {/* Grande icône panier stylisée */}
            <div className="relative">
              <ShoppingCart size={120} className="text-primary/20" strokeWidth={1} />
              <ShoppingCart size={80} className="text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── État vide ─────────────────────────────────────────────────────── */
function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-5">
      <div className="relative w-40 h-32 flex items-center justify-center">
        <Image src="/images/cart-empty-cloud.png" alt="" fill className="object-contain" aria-hidden />
        <Image src="/images/cart-empty-icon.png" alt="Panier vide" width={72} height={72}
          className="relative z-10" />
      </div>
      <p className="text-lg font-bold text-foreground">Votre panier vide</p>
      <Link href="/formations">
        <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white text-sm hover:opacity-90 transition-opacity"
          style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
          Découvrir les formations <ChevronRight size={15} />
        </span>
      </Link>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────── */
export default function PanierPage() {
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART);
  const [confirmed, setConfirmed] = useState(false);

  const total = items.reduce((acc, i) => acc + i.prix, 0);

  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <>
      <CartHero />

      <section className="bg-white py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg sm:text-xl font-bold text-foreground mb-6">
            Récapitulatif des formations ajoutées au panier
          </h2>

          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="flex flex-col lg:flex-row gap-6">

              {/* Liste formations */}
              <div className="flex-1 flex flex-col gap-4">
                {items.map((item) => (
                  <div key={item.id} className="relative rounded-2xl overflow-hidden flex flex-col sm:flex-row gap-0 shadow-sm">
                    <Image src="/images/formations-bg-card.png" alt="" fill className="object-cover" aria-hidden />

                    {/* Thumbnail */}
                    <div className="relative w-full sm:w-40 h-36 sm:h-auto shrink-0">
                      <Image src={item.image} alt={item.titre} fill className="object-cover" />
                    </div>

                    {/* Contenu */}
                    <div className="relative z-10 flex items-start justify-between gap-3 p-4 flex-1">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-bold text-primary">{item.domaine}</span>
                        <p className="text-sm font-bold text-foreground leading-snug max-w-xs">{item.titre}</p>
                        <StarRating rating={item.note} size={12} />
                        <span className="text-sm font-bold text-foreground mt-1">{formatCFA(item.prix)}</span>
                      </div>
                      <button onClick={() => removeItem(item.id)}
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
                    {/* Totaux */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Formations</span>
                      <span className="text-sm font-bold text-foreground">
                        {String(items.length).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-t border-border pt-3">
                      <span className="text-sm font-bold text-foreground">Total :</span>
                      <span className="text-xl font-bold text-foreground">{formatCFA(total)}</span>
                    </div>

                    {/* Confirmation commande */}
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
                        {/* VISA */}
                        <button className="flex items-center justify-center p-2.5 rounded-xl border-2 border-border bg-white hover:border-primary transition-colors h-12">
                          <Image src="/images/payment-visa.png" alt="VISA" width={50} height={22} className="object-contain" />
                        </button>
                        {/* MoMo */}
                        <button className="flex items-center justify-center p-2.5 rounded-xl border-2 border-border bg-[#FCD500] hover:border-primary transition-colors h-12">
                          <span className="text-xs font-bold text-gray-800">MoMo</span>
                        </button>
                        {/* FedaPay */}
                        <button className="flex items-center justify-center p-2.5 rounded-xl border-2 border-border bg-white hover:border-primary transition-colors h-12">
                          <span className="text-xs font-bold text-primary">FedaPay</span>
                        </button>
                        {/* MasterCard */}
                        <button className="flex items-center justify-center p-2.5 rounded-xl border-2 border-border bg-white hover:border-primary transition-colors h-12">
                          <Image src="/images/payment-mastercard.png" alt="MasterCard" width={40} height={28} className="object-contain" />
                        </button>
                      </div>
                    </div>

                    {/* Bouton Acheter */}
                    <button
                      className="w-full py-3.5 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-opacity"
                      style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
                      Acheter maintenant
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
