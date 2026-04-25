"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronRight, CheckCircle2, Clock } from "lucide-react";
import { CircularProgress } from "@/components/dashboard/CircularProgress";

/* ─── Données mock ──────────────────────────────────────────────────── */
const FORMATIONS_ACTIVES = [
  { id: "1", titre: "Développement web",                        progression: 45, couleur: "#2934f2" },
  { id: "2", titre: "Design graphique et brand design",          progression: 60, couleur: "#2934f2" },
  { id: "3", titre: "Commerce en ligne et produits digitaux",    progression: 20, couleur: "#ef4444" },
];
const FORMATIONS_TERMINEES = [
  { id: "4", titre: "Développement web" },
  { id: "5", titre: "Design graphique et brand design" },
  { id: "6", titre: "Commerce en ligne et produits digitaux" },
];
const ACTIVITES = [
  { texte: "Vous avez souscrit à la formation de Design graphique",   date: "10/01/2026 à 13h 05mn" },
  { texte: "Vous avez souscrit à la formation de E-Commerce",         date: "14/01/2026 à 11h 05mn" },
  { texte: "Vous avez souscrit à la formation de Développement...",   date: "17/01/2026 à 11h 06mn" },
];
const NOTIFICATIONS = [
  { texte: "Souscription de la formation Design graphique avec succès", date: "10/01/2026 à 11h 06mn" },
  { texte: "Souscription de la formation E-Commerce avec succès",       date: "14/01/2026 à 11h 06mn" },
];
const RECOMMANDATIONS = [
  { texte: "Alain SODJINOU s'est inscrit sur notre plateforme pour votre...", date: "10/01/2026 à 13h 06mn" },
  { texte: "Alain SODJINOU s'est inscrit sur notre plateforme pour votre...", date: "14/01/2026 à 11h 06mn" },
];

/* ─── Sidebar items ─────────────────────────────────────────────────── */
const SIDEBAR = [
  { id: "formations",   label: "Formations",    icon: "/images/db-icon-dashboard.png" },
  { id: "activites",    label: "Activités",     icon: "/images/db-icon-action.png"    },
  { id: "portefeuille", label: "Portefeuille",  icon: "/images/db-icon-wallet.png"    },
  { id: "actions",      label: "Actions",       icon: "/images/db-icon-action.png"    },
  { id: "acces",        label: "Accès",         icon: "/images/db-icon-docs.png"      },
];

/* ─── Hero ──────────────────────────────────────────────────────────── */
function DashboardHero() {
  return (
    <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-5">
      <Image src="/images/bg-hero.png" alt="" fill className="object-cover" aria-hidden />
      <div className="absolute inset-0 pointer-events-none">
        <Image src="/images/pattern-hero.png" alt="" fill className="object-cover opacity-15" aria-hidden />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">Bonjour !</h1>

        <div className="flex items-center gap-4">
          {/* Icônes header */}
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/50 transition-colors">
              <Image src="/images/db-icon-notif.png"    alt="Notifications" width={22} height={22} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/50 transition-colors">
              <Image src="/images/db-icon-settings.png" alt="Paramètres"    width={22} height={22} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/50 transition-colors">
              <Image src="/images/db-icon-logout.png"   alt="Déconnexion"   width={22} height={22} />
            </button>
          </div>

          {/* Profil */}
          <div className="flex items-center gap-3 pl-4 border-l border-border">
            <Image src="/images/db-avatar.png" alt="Franck KAKPO"
              width={42} height={42} className="rounded-full object-cover w-[42px] h-[42px]" />
            <div>
              <p className="text-sm font-bold text-foreground leading-tight">Franck KAKPO</p>
              <p className="text-xs text-muted-foreground">Étudiant</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Tabs ──────────────────────────────────────────────────────────── */
function DashboardTabs({ active, onChange }: { active: string; onChange: (t: string) => void }) {
  return (
    <div className="relative overflow-hidden">
      {/* Fond dégradé pastel des tabs */}
      <Image src="/images/db-bg-tabs.png" alt="" fill className="object-cover" aria-hidden />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-8">
        {[
          { id: "tableau", label: "Tableau",  icon: "/images/db-icon-dashboard.png" },
          { id: "details", label: "Détails",  icon: "/images/db-icon-docs.png"      },
        ].map((tab) => (
          <button key={tab.id} onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 py-3 text-sm font-bold border-b-2 transition-colors ${
              active === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}>
            <Image src={tab.icon} alt="" width={16} height={16} />
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Formations ────────────────────────────────────────────────────── */
function FormationsContent({ hasActive }: { hasActive: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* Actives */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-bold text-primary">Formations actives</h3>
        <div className="rounded-2xl border border-border bg-white/80 backdrop-blur-sm p-4 min-h-[80px]">
          {hasActive ? (
            <ul className="flex flex-col gap-2">
              {FORMATIONS_ACTIVES.map((f) => (
                <li key={f.id} className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: f.couleur }} />
                  {f.titre}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-muted-foreground text-center py-3">Aucune formation en cours !</p>
          )}
        </div>

        <h3 className="text-sm font-bold text-primary">Barre de progression</h3>
        <div className="rounded-2xl border border-border bg-white/80 backdrop-blur-sm p-4">
          {hasActive ? (
            <div className="flex gap-4 items-center">
              <div className="flex-1 flex flex-col gap-3">
                {FORMATIONS_ACTIVES.map((f) => (
                  <div key={f.id} className="flex flex-col gap-1">
                    <span className="text-xs truncate">{f.titre}</span>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${f.progression}%`, background: f.couleur }} />
                    </div>
                  </div>
                ))}
              </div>
              <CircularProgress value={80} size={76} color="#2934f2" />
            </div>
          ) : (
            <p className="text-xs text-muted-foreground text-center py-3">Aucune formation en cours !</p>
          )}
        </div>

        <div>
          <Link href="/formations">
            <span className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-white text-sm cursor-pointer overflow-hidden">
              <Image src="/images/db-btn-shape.png" alt="" fill className="object-fill" aria-hidden />
              <span className="relative z-10 flex items-center gap-2">Découvrir <ChevronRight size={15} /></span>
            </span>
          </Link>
        </div>
      </div>

      {/* Terminées */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-bold text-primary">Formations terminées</h3>
        <div className="rounded-2xl border border-border bg-amber-50/60 p-4 min-h-[80px]">
          <ul className="flex flex-col gap-2">
            {FORMATIONS_TERMINEES.map((f) => (
              <li key={f.id} className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full flex-shrink-0 bg-red-400" />
                {f.titre}
              </li>
            ))}
          </ul>
        </div>

        <h3 className="text-sm font-bold text-primary">Barre de progression</h3>
        <div className="rounded-2xl border border-border bg-white/80 backdrop-blur-sm p-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1 flex flex-col gap-3">
              {FORMATIONS_TERMINEES.map((f) => (
                <div key={f.id} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-accent flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">terminé</span>
                  <div className="flex-1 h-2 rounded-full bg-accent/40" />
                </div>
              ))}
            </div>
            <CircularProgress value={100} size={76} color="#57f27d" />
          </div>
        </div>

        <div>
          <Link href="/formations">
            <span className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-white text-sm cursor-pointer overflow-hidden">
              <Image src="/images/db-btn-shape.png" alt="" fill className="object-fill" aria-hidden />
              <span className="relative z-10 flex items-center gap-2">Revoir <ChevronRight size={15} /></span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Activités ─────────────────────────────────────────────────────── */
function ActivitesContent({ hasData }: { hasData: boolean }) {
  const Section = ({ title, color, items }: {
    title: string; color: string; items: { texte: string; date: string }[];
  }) => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
          {title}
        </span>
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Clock size={11} /> Date et heures
        </span>
      </div>
      <div className="rounded-2xl border border-border bg-white/80 backdrop-blur-sm overflow-hidden">
        {hasData && items.length > 0 ? items.map((item, i) => (
          <div key={i} className={`flex items-start justify-between gap-4 px-4 py-3 text-sm ${i < items.length - 1 ? "border-b border-border" : ""}`}>
            <span className="text-foreground">{item.texte}</span>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{item.date}</span>
          </div>
        )) : (
          <div className="px-4 py-6 text-xs text-muted-foreground text-center">
            {title === "Dernières activités" ? "Aucune activité récente" :
             title === "Notifications récentes" ? "Aucune notification récente" : "Aucune recommandation"}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-5">
      <Section title="Dernières activités"    color="#57f27d" items={hasData ? ACTIVITES       : []} />
      <Section title="Notifications récentes" color="#f59e0b" items={hasData ? NOTIFICATIONS   : []} />
      <Section title="Recommandations"        color="#ef4444" items={hasData ? RECOMMANDATIONS : []} />
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────── */
export default function TableauDeBordPage() {
  const [activeTab,      setActiveTab]      = useState("tableau");
  const [activeSection,  setActiveSection]  = useState("formations");
  const [hasActive]                         = useState(false);
  const [hasActivity]                       = useState(true);

  return (
    <div>
      <DashboardHero />
      <DashboardTabs active={activeTab} onChange={setActiveTab} />

      {/* Zone contenu — fond dégradé Rectangle 67 */}
      <div className="relative overflow-hidden">
        <Image src="/images/db-bg-content.png" alt="" fill className="object-cover" aria-hidden />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-5">

            {/* Sidebar desktop */}
            <aside className="hidden lg:block shrink-0 w-44 relative">
              <Image src="/images/db-bg-sidebar.png" alt="" fill className="object-cover rounded-2xl" aria-hidden />
              <div className="relative z-10 flex flex-col gap-1 p-3">
                {SIDEBAR.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button key={item.id} onClick={() => setActiveSection(item.id)}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold text-left transition-all w-full ${
                        isActive ? "text-white shadow" : "text-foreground hover:bg-white/60"
                      }`}
                      style={isActive ? { background: "linear-gradient(to right, #2934f2, #57f27d)" } : {}}>
                      <Image src={item.icon} alt={item.label} width={18} height={18}
                        className={isActive ? "brightness-0 invert" : ""} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Sidebar mobile */}
            <div className="lg:hidden flex gap-2 mb-4 overflow-x-auto pb-1 w-full">
              {SIDEBAR.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button key={item.id} onClick={() => setActiveSection(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                      isActive ? "text-white" : "bg-white border border-border text-foreground"
                    }`}
                    style={isActive ? { background: "linear-gradient(to right, #2934f2, #57f27d)" } : {}}>
                    <Image src={item.icon} alt={item.label} width={14} height={14}
                      className={isActive ? "brightness-0 invert" : ""} />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Contenu */}
            <main className="flex-1 min-w-0">
              {activeSection === "formations"   && <FormationsContent hasActive={hasActive} />}
              {activeSection === "activites"    && <ActivitesContent  hasData={hasActivity}  />}
              {(activeSection === "portefeuille" || activeSection === "actions" || activeSection === "acces") && (
                <div className="rounded-2xl border border-border bg-white/80 p-8 text-center text-muted-foreground text-sm">
                  Section à venir
                </div>
              )}
            </main>

          </div>
        </div>
      </div>
    </div>
  );
}
