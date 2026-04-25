"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, SlidersHorizontal } from "lucide-react";
import { formatCFA } from "@/lib/utils";

/* ─── Données ───────────────────────────────────────────────────────── */
const FORMATIONS = [
  { id: "1", domaine: "Développement web",  titre: "Apprendre les bases du codage et la création des sites", note: 4.5, prix: 15000, image: "/images/formation-1.png" },
  { id: "2", domaine: "E-Commerce",          titre: "Apprendre l'achat des produits publicités et ventes",    note: 4.5, prix: 15000, image: "/images/formation-2.png" },
  { id: "3", domaine: "Développement web",  titre: "Apprendre les bases du codage et la création des sites", note: 4.5, prix: 15000, image: "/images/formation-3.png" },
  { id: "4", domaine: "Design graphique",    titre: "Maîtriser les bases du design et brand design",          note: 4.5, prix: 15000, image: "/images/formation-1.png" },
  { id: "5", domaine: "Marketing digital",   titre: "Stratégies marketing et réseaux sociaux",                note: 4.5, prix: 15000, image: "/images/formation-2.png" },
];

const FILTRES = ["Domaine", "Filière", "Spécialité", "Thème"];
const PER_PAGE = 3;

/* ─── Étoiles ───────────────────────────────────────────────────────── */
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>
          {i < Math.floor(rating)
            ? <Image src="/images/formations-star-full.png" alt="★" width={13} height={13} />
            : <span className="text-gray-300 text-xs">★</span>}
        </span>
      ))}
      <span className="ml-1 text-xs font-bold text-muted-foreground">{rating.toFixed(1)}</span>
    </div>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────────── */
function FormationsHero() {
  /*
   * Specs design (canvas 1440px) :
   *   Femme → X:308.79 (21.4%), Y:22.78px, W:1361.49 (94.5%), H:908.11
   *   Section height ≈ 420px desktop → clique le bas de l'image (montre haut du corps)
   *   Mobile : image centrée, width:95%, section height:clamp(260px,55vw,380px)
   */
  return (
    <section
      className="relative overflow-hidden w-full"
      style={{ height: "clamp(260px, 30vw, 420px)" }}
    >
      {/* Fond pastel */}
      <Image src="/images/formations-bg-hero.png" alt="" fill className="object-cover" aria-hidden />
      {/* Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <Image src="/images/formations-pattern.png" alt="" fill className="object-cover opacity-55" aria-hidden />
      </div>

      {/* Texte — gauche, calé dans la zone 0–21% */}
      <div className="absolute z-20 left-4 sm:left-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 max-w-[20%] min-w-[140px]">
        <p className="text-foreground font-bold text-sm sm:text-base leading-tight">Nos diverses</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary leading-tight">
          Formations
        </h1>
        <p className="text-accent font-bold text-xs sm:text-sm leading-snug">
          Une riche diversification dans les domaines les plus recherchées
        </p>
      </div>

      {/* Femme — desktop : specs exactes */}
      <div
        className="absolute z-10 hidden sm:block"
        style={{ left: "21.4%", top: "22.78px", width: "94.5%" }}
      >
        <Image
          src="/images/formations-hero-woman.png"
          alt="Formations Modulor"
          width={1361}
          height={908}
          style={{ width: "100%", height: "auto" }}
          className="object-contain object-top drop-shadow-xl"
          priority
        />
      </div>

      {/* Femme — mobile : centrée, pleine largeur */}
      <div
        className="absolute z-10 sm:hidden"
        style={{ right: 0, top: "30px", width: "65%" }}
      >
        <Image
          src="/images/formations-hero-woman.png"
          alt="Formations Modulor"
          width={400}
          height={267}
          style={{ width: "100%", height: "auto" }}
          className="object-contain object-top"
          priority
        />
      </div>

      {/* Bulle bleue — haut droite */}
      <div className="absolute z-30 animate-bounce"
        style={{ left: "73%", top: "5%", width: "clamp(50px, 5.5vw, 80px)", animationDuration: "3s" }}>
        <Image src="/images/formations-bubble-blue.png" alt="" width={80} height={80}
          style={{ width: "100%", height: "auto" }} />
      </div>

      {/* Bulle verte — droite milieu */}
      <div className="absolute z-30 hidden sm:block animate-bounce"
        style={{ left: "68%", top: "45%", width: "clamp(40px, 4.5vw, 65px)", animationDuration: "3.5s", animationDelay: "0.5s" }}>
        <Image src="/images/formations-bubble-green2.png" alt="" width={65} height={65}
          style={{ width: "100%", height: "auto" }} />
      </div>

      {/* Bulle verte — gauche bas */}
      <div className="absolute z-30 hidden sm:block animate-bounce"
        style={{ left: "22%", top: "55%", width: "clamp(35px, 4vw, 58px)", animationDuration: "4s", animationDelay: "1s" }}>
        <Image src="/images/formations-bubble-green.png" alt="" width={58} height={58}
          style={{ width: "100%", height: "auto" }} />
      </div>
    </section>
  );
}

/* ─── Filtres ───────────────────────────────────────────────────────── */
function FiltreBar({ onFilter }: { onFilter: (filtre: string) => void }) {
  const [selected, setSelected] = useState<Record<string, string>>({});

  return (
    <div className="bg-white border-b border-border py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3">
        {FILTRES.map((f) => (
          <button key={f}
            className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-accent bg-white text-sm font-semibold text-foreground hover:bg-accent/5 transition-colors"
            onClick={() => setSelected((prev) => ({ ...prev, [f]: f }))}>
            {f}
            <ChevronDown size={14} className="text-muted-foreground" />
          </button>
        ))}

        {/* Bouton Filtrer */}
        <button onClick={() => onFilter(JSON.stringify(selected))}
          className="ml-auto flex items-center gap-2 px-5 py-2 rounded-full font-bold text-white text-sm hover:opacity-90 transition-opacity"
          style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
          <SlidersHorizontal size={15} />
          Filtrer
        </button>
      </div>
    </div>
  );
}

/* ─── Carte formation (horizontal) ─────────────────────────────────── */
function FormationCard({ f }: { f: typeof FORMATIONS[0] }) {
  return (
    <div className="relative rounded-2xl overflow-hidden flex flex-col sm:flex-row gap-0 shadow-sm hover:shadow-md transition-shadow">
      <Image src="/images/formations-bg-card.png" alt="" fill className="object-cover" aria-hidden />

      {/* Thumbnail */}
      <div className="relative w-full sm:w-44 h-40 sm:h-auto shrink-0">
        <Image src={f.image} alt={f.titre} fill className="object-cover" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 flex-1">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold text-primary">{f.domaine}</span>
          <p className="text-sm font-bold text-foreground leading-snug max-w-xs">{f.titre}</p>
          <Stars rating={f.note} />
        </div>

        {/* Prix + bouton */}
        <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 shrink-0">
          <span className="text-lg font-bold text-foreground">{formatCFA(f.prix)}</span>
          <Link href={`/formations/${f.id}`}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-white text-xs whitespace-nowrap cursor-pointer hover:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
              Acheter une formation
              <ChevronRight size={13} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Pagination ────────────────────────────────────────────────────── */
function Pagination({ current, total, onChange }: { current: number; total: number; onChange: (p: number) => void }) {
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button onClick={() => onChange(Math.max(1, current - 1))}
        className="w-8 h-8 flex items-center justify-center rounded-full border border-border hover:border-primary hover:text-primary transition-colors">
        <ChevronLeft size={16} />
      </button>
      {Array.from({ length: total }).map((_, i) => (
        <button key={i} onClick={() => onChange(i + 1)}
          className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-all ${
            current === i + 1
              ? "text-white shadow"
              : "border border-border text-muted-foreground hover:border-primary hover:text-primary"
          }`}
          style={current === i + 1 ? { background: "linear-gradient(to right, #2934f2, #57f27d)" } : {}}>
          {i + 1}
        </button>
      ))}
      <button onClick={() => onChange(Math.min(total, current + 1))}
        className="w-8 h-8 flex items-center justify-center rounded-full border border-border hover:border-primary hover:text-primary transition-colors">
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────── */
export default function FormationsPage() {
  const [page,     setPage]     = useState(1);
  const [filtered, setFiltered] = useState(FORMATIONS);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const displayed  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <FormationsHero />
      <FiltreBar onFilter={() => {}} />

      <section className="bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg sm:text-xl font-bold text-foreground mb-6">
            Nos différentes formations
          </h2>

          {displayed.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-16">
              <Image src="/images/db-empty.png" alt="Aucun résultat" width={80} height={80} />
              <p className="text-muted-foreground font-semibold">Aucun résultat</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {displayed.map((f) => <FormationCard key={f.id} f={f} />)}
            </div>
          )}

          {totalPages > 1 && (
            <Pagination current={page} total={totalPages} onChange={setPage} />
          )}
        </div>
      </section>
    </>
  );
}
