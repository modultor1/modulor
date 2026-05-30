"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, SlidersHorizontal, Loader2 } from "lucide-react";
import { formatCFA } from "@/lib/utils";

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
  return (
    <section className="relative overflow-hidden w-full" style={{ height: "clamp(400px, 40vw, 520px)", minHeight: "480px" }}>
      {/* Fond vert clair (comme la home) */}
      <Image src="/images/bg-hero.png" alt="" fill className="object-cover" aria-hidden priority />
      {/* Pattern */}
      <div className="absolute left-0 top-0 h-full w-[180px] pointer-events-none hidden lg:block">
        <Image src="/images/pattern-hero.png" alt="" fill className="object-cover opacity-60" aria-hidden />
      </div>
      <div className="absolute right-0 top-0 h-full w-[180px] pointer-events-none hidden lg:block">
        <Image src="/images/pattern-hero.png" alt="" fill className="object-cover opacity-60 [transform:scaleX(-1)]" aria-hidden />
      </div>

      <div className="relative z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center" style={{ minHeight: "480px" }}>
          {/* Texte — gauche */}
          <div className="flex flex-col justify-center gap-3 py-10 lg:py-0 text-center lg:text-left">
            <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 600, fontSize: "44px", color: "#03251C" }} className="leading-tight">
              Nos diverses
            </p>
            <h1 style={{ fontFamily: "var(--font-montserrat)", fontWeight: 700, fontSize: "96px", color: "#2934F2" }} className="leading-tight">
              Formations
            </h1>
            <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, fontSize: "24px", color: "#21D34C" }} className="leading-tight">
              Une riche diversification dans les domaines les plus recherchées
            </p>
          </div>

          {/* Femme — droite, ancrée en bas */}
          <div className="relative hidden md:flex justify-center lg:justify-end items-end">
            {/* Bulle bleue — haut droite */}
            <div className="absolute z-20" style={{ top: "8%", left: "60%", transform: "translateX(-60%)" }}>
              <Image src="/images/bubble-blue-light.png" alt="" width={125} height={125} className="object-contain" />
            </div>

            {/* Bulle verte petite — centre */}
            <div className="absolute z-20" style={{ top: "35%", left: "35%" }}>
              <Image src="/images/bubble-green.png" alt="" width={68} height={68} className="object-contain" />
            </div>

            {/* Bulle bleue foncée — bas droite */}
            <div className="absolute z-20" style={{ bottom: "12%", right: "12%" }}>
              <Image src="/images/bubble-blue-dark.png" alt="" width={52} height={52} className="object-contain" />
            </div>

            {/* Femme */}
            <div className="relative z-10 drop-shadow-xl h-full flex items-end" style={{ transform: "translateY(13px) scale(1.25)" }}>
              <Image src="/images/formations-hero-woman.png" alt="Formations Modulor" width={1313} height={1275}
                className="object-contain" priority />
            </div>
          </div>
        </div>
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
function FormationCard({ f }: { f: any }) {
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
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFormations() {
      setLoading(true);
      try {
        const res = await fetch("/api/formations/search");
        const data = await res.json();
        setFiltered(data.formations || []);
      } catch (error) {
        console.error("Error loading formations:", error);
        setFiltered([]);
      } finally {
        setLoading(false);
      }
    }
    loadFormations();
  }, []);

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

          {loading ? (
            <div className="flex flex-col items-center gap-4 py-20">
              <Loader2 size={40} className="text-primary animate-spin" />
              <p className="text-sm text-muted-foreground">Chargement des formations...</p>
            </div>
          ) : displayed.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-20">
              {/* OOPS mascot — grand et centré comme dans la maquette */}
              <Image src="/images/db-empty.png" alt="Aucun résultat" width={180} height={180} className="object-contain" />
              <p className="text-lg font-bold text-foreground">Aucun résultat</p>
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
