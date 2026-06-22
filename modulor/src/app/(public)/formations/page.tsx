"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown, SlidersHorizontal, Loader2, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
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
  // === CONFIG: MODIFIE ICI SEULEMENT ===
  const WOMAN = {
    width: 900,               // Largeur (réduit pour matcher Figma)
    height: 820,              // Hauteur (proportionnel)
    marginTop: "-180px",
    marginRight: "-140px",
    offsetX: "-200px",            // ← Déplacer DROITE (valeur +) ou GAUCHE (valeur -) SANS changer la taille
  };
  const TEXT = {
    offsetX: "60px",          // ← Bloc texte: DROITE (+) / GAUCHE (-)
    offsetY: "100px",           // ← Bloc texte: BAS (+) / HAUT (-)
  };
  // =====================================

  return (
    <motion.section className="relative overflow-hidden w-full min-h-[480px] lg:[height:clamp(400px,40vw,520px)]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Texte — gauche */}
          <motion.div className="flex flex-col justify-center gap-3 py-10 lg:py-0 text-center lg:text-left lg:[transform:translate(var(--tx),var(--ty))]" style={{ "--tx": TEXT.offsetX, "--ty": TEXT.offsetY } as React.CSSProperties}
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}>
            <motion.p style={{ fontFamily: "var(--font-tt-interphases)", fontWeight: 600, fontSize: "clamp(28px, 6vw, 44px)", color: "#03251C" }} className="leading-tight"
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
              Nos diverses
            </motion.p>
            <motion.h1 style={{ fontFamily: "var(--font-tt-interphases)", fontWeight: 700, fontSize: "clamp(40px, 12vw, 96px)", color: "#2934F2" }} className="leading-tight"
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
              Formations
            </motion.h1>
            <motion.p style={{ fontFamily: "var(--font-tt-interphases)", fontWeight: 500, fontSize: "clamp(15px, 4vw, 24px)", color: "#21D34C" }} className="leading-tight"
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
              Une riche diversification dans les domaines les plus recherchées
            </motion.p>
          </motion.div>

          {/* Femme — droite, ancrée en bas */}
          <div className="relative flex justify-center lg:justify-end items-center min-h-[320px] lg:min-h-[700px]">
            {/* Bulle bleue — haut droite */}
            <motion.div className="absolute z-20 hidden lg:block" style={{ top: "8%", left: "25%", transform: "translateX(-180%)" }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}>
              <Image src="/images/bubble-blue-light.png" alt="" width={100} height={125} className="object-contain" />
            </motion.div>

            {/* 2em Bulle bleue — haut droite */}
            <motion.div className="absolute z-20 hidden lg:block" style={{ top: "8%", right: "-95px", width: "150px" }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}>
              <Image src="/images/bubble-blue-light.png" alt="" width={150} height={200} className="object-contain" />
            </motion.div>

            {/* Bulle verte petite — centre */}
            <motion.div className="absolute z-20 hidden lg:block" style={{ top: "45%", left: "-3%" }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.95 }}>
              <Image src="/images/bubble-green.png" alt="" width={48} height={48} className="object-contain" />
            </motion.div>

            {/* Bulle bleue foncée — bas droite */}
            <motion.div className="absolute z-20 hidden lg:block" style={{ bottom: "38%", right: "26%", transform: "translateY(0px) translateX(0px)" }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}>
              <Image src="/images/bubble-blue-dark.png" alt="" width={52} height={52} className="object-contain" />
            </motion.div>

            {/* Femme */}
            <motion.div className="relative z-10 drop-shadow-xl flex items-center justify-center lg:justify-end lg:pr-8 lg:[margin-top:var(--mt)] lg:[margin-right:var(--mr)]"
              style={{ "--mt": WOMAN.marginTop, "--mr": WOMAN.marginRight } as React.CSSProperties}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}>
              <Image src="/images/formations-hero-woman.png" alt="Formations Modulor"
                width={WOMAN.width} height={WOMAN.height}
                style={{ "--wox": WOMAN.offsetX } as React.CSSProperties}
                className="object-contain max-h-[300px] w-auto lg:max-h-none lg:[transform:translateX(var(--wox))]" priority />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
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
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", { style: "decimal", minimumFractionDigits: 0 }).format(price) + "f CFA";
  };

  return (
    <div className="relative rounded-2xl overflow-hidden flex flex-col sm:flex-row gap-0 shadow-sm hover:shadow-md transition-shadow" style={{ backgroundColor: "#F9FBF0" }}>
      <Image src="/images/formations-bg-card.png" alt="" fill className="object-cover" aria-hidden />

      {/* Thumbnail */}
      <div className="relative w-full sm:w-44 h-40 sm:h-auto shrink-0">
        <Image src={f.image} alt={f.titre} fill className="object-cover" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 flex-1">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold text-primary">{f.domaine}</span>
          <p className="text-sm font-bold leading-snug max-w-xs" style={{ color: "#2934F2" }}>{f.titre}</p>
          <Stars rating={f.note} />
        </div>

        {/* Prix + bouton */}
        <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 shrink-0">
          <span className="text-lg font-bold" style={{ color: "#21D34C" }}>{formatPrice(f.prix)}</span>
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
    <div className="flex items-center justify-center gap-3 mt-8">
      <button onClick={() => onChange(Math.max(1, current - 1))}
        className="flex items-center justify-center w-10 h-10 text-foreground hover:text-primary transition-colors text-xl font-bold cursor-pointer">
        ‹
      </button>
      {Array.from({ length: Math.min(7, total) }).map((_, i) => (
        <button key={i} onClick={() => onChange(i + 1)}
          className={`w-10 h-10 flex items-center justify-center text-base font-bold transition-all cursor-pointer rounded ${
            current === i + 1
              ? "font-bold text-foreground bg-muted"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          }`}>
          {i + 1}
        </button>
      ))}
      <button onClick={() => onChange(Math.min(total, current + 1))}
        className="flex items-center justify-center w-10 h-10 text-foreground hover:text-primary transition-colors text-xl font-bold cursor-pointer">
        ›
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <>
      <FormationsHero />

      <motion.section className="bg-white py-8 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg sm:text-xl font-bold text-foreground mb-6">
            Nos différentes formations
          </h2>

          <div className="mb-6">
            <FiltreBar onFilter={() => {}} />
          </div>

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
            <motion.div className="flex flex-col gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{ visible: { transition: { staggerChildren: 0.15 } } }}>
              {displayed.map((f) => (
                <motion.div key={f.id} variants={cardVariants}>
                  <FormationCard f={f} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {totalPages > 1 && (
            <Pagination current={page} total={totalPages} onChange={setPage} />
          )}
        </div>
      </motion.section>
    </>
  );
}
