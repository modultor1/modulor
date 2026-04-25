"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Clock, CheckCircle2, Menu, X } from "lucide-react";

/* ─── Données mock ──────────────────────────────────────────────────── */
const FORMATIONS_ACTIVES = [
  { id: "1", titre: "Développement web",                     progression: 70, bar: "/images/db-bar-blue.png",  circle: "/images/db-progress-70.png",  couleur: "#2934f2" },
  { id: "2", titre: "Design graphique et brand design",      progression: 30, bar: "/images/db-bar-green.png", circle: "/images/db-progress-30.png", couleur: "#57f27d" },
  { id: "3", titre: "Commerce en ligne et produits digitaux",progression: 40, bar: "/images/db-bar-red.png",   circle: "/images/db-progress-40.png",  couleur: "#ef4444" },
];
const FORMATIONS_TERMINEES = [
  { id: "4", titre: "Développement web" },
  { id: "5", titre: "Design graphique et brand design" },
  { id: "6", titre: "Commerce en ligne et produits digitaux" },
];
const ACTIVITES = [
  { texte: "Vous avez souscrit à la formation de Design graphique",    date: "10/01/2026 à 13h 05mn" },
  { texte: "Vous avez souscrit à la formation de E-Commerce",          date: "14/01/2026 à 11h 05mn" },
  { texte: "Vous avez souscrit à la formation de Développement...",    date: "17/01/2026 à 11h 06mn" },
];
const NOTIFICATIONS = [
  { texte: "Souscription de la formation Design graphique avec succès", date: "10/01/2026 à 11h 06mn" },
  { texte: "Souscription de la formation E-Commerce avec succès",       date: "14/01/2026 à 11h 06mn" },
];
const RECOMMANDATIONS = [
  { texte: "Alain SODJINOU s'est inscrit sur notre plateforme...", date: "10/01/2026 à 13h 06mn" },
  { texte: "Alain SODJINOU s'est inscrit sur notre plateforme...", date: "14/01/2026 à 11h 06mn" },
];

const SIDEBAR = [
  { id: "formations",    label: "Formations",   icon: "/images/db-icon-dashboard.png" },
  { id: "activites",     label: "Activités",    icon: "/images/db-icon-action.png"    },
  { id: "portefeuille",  label: "Portefeuille", icon: "/images/db-icon-wallet.png"    },
  { id: "actions",       label: "Actions",      icon: "/images/db-icon-action.png"    },
  { id: "acces",         label: "Accès",        icon: "/images/db-icon-docs.png"      },
];

/* ─── Hero ──────────────────────────────────────────────────────────── */
function DashboardHero() {
  return (
    <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
      <Image src="/images/bg-hero.png" alt="" fill className="object-cover" aria-hidden />
      <div className="absolute inset-0 pointer-events-none">
        <Image src="/images/db-pattern.png" alt="" fill className="object-cover opacity-20" aria-hidden />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">Bonjour !</h1>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full hover:bg-white/50 transition-colors">
              <Image src="/images/db-icon-notif.png"    alt="Notifications" width={20} height={20} />
            </button>
            <button className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full hover:bg-white/50 transition-colors">
              <Image src="/images/db-icon-settings.png" alt="Paramètres"    width={20} height={20} />
            </button>
            <button className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full hover:bg-white/50 transition-colors">
              <Image src="/images/db-icon-clock.png"    alt="Horloge"       width={20} height={20} />
            </button>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 pl-3 border-l border-border">
            <Image src="/images/db-avatar.png" alt="Franck KAKPO"
              width={36} height={36} className="rounded-full object-cover w-9 h-9 sm:w-10 sm:h-10" />
            <div className="hidden sm:block">
              <p className="text-xs sm:text-sm font-bold text-foreground leading-tight">Franck KAKPO</p>
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
      <Image src="/images/db-bg-tabs.png" alt="" fill className="object-cover" aria-hidden />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-6 sm:gap-8 overflow-x-auto">
        {[
          { id: "tableau", label: "Tableau",  icon: "/images/db-icon-dashboard.png" },
          { id: "details", label: "Détails",  icon: "/images/db-icon-docs.png"      },
        ].map((tab) => (
          <button key={tab.id} onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
              active === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}>
            <Image src={tab.icon} alt="" width={15} height={15} />
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Formations actives ────────────────────────────────────────────── */
function FormationsActives() {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-bold text-primary">Formations actives</h3>

      {/* Liste des cours */}
      <div className="relative rounded-2xl overflow-hidden p-4">
        <Image src="/images/db-card-active.png" alt="" fill className="object-cover" aria-hidden />
        <ul className="relative z-10 flex flex-col gap-2">
          {FORMATIONS_ACTIVES.map((f) => (
            <li key={f.id} className="flex items-center gap-2 text-sm text-foreground">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: f.couleur }} />
              <span className="truncate">{f.titre}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Barre de progression */}
      <h3 className="text-sm font-bold text-primary">Barre de progression</h3>
      <div className="relative rounded-2xl overflow-hidden p-4">
        <Image src="/images/db-card-progress.png" alt="" fill className="object-cover" aria-hidden />
        <div className="relative z-10 flex items-center gap-3">
          {/* Barres + labels */}
          <div className="flex-1 flex flex-col gap-3 min-w-0">
            {FORMATIONS_ACTIVES.map((f) => (
              <div key={f.id} className="flex flex-col gap-1">
                <span className="text-xs text-foreground truncate">{f.titre}</span>
                <div className="relative h-3 rounded-full overflow-hidden">
                  <Image src={f.bar} alt="" fill className="object-fill" aria-hidden />
                </div>
              </div>
            ))}
          </div>
          {/* Cercle 80% */}
          <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 relative">
            <Image src="/images/db-progress-80.png" alt="80%" fill className="object-contain" />
          </div>
        </div>
      </div>

      {/* Bouton Découvrir — image seule, pas de texte en doublon */}
      <Link href="/formations" className="w-fit">
        <Image src="/images/db-btn-decouvrir.png" alt="Découvrir" width={140} height={40} className="object-contain hover:opacity-90 transition-opacity cursor-pointer" />
      </Link>
    </div>
  );
}

/* ─── Formations terminées ──────────────────────────────────────────── */
function FormationsTerminees() {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-bold text-primary">Formations terminées</h3>

      <div className="relative rounded-2xl overflow-hidden p-4">
        <Image src="/images/db-card-done.png" alt="" fill className="object-cover" aria-hidden />
        <ul className="relative z-10 flex flex-col gap-2">
          {FORMATIONS_TERMINEES.map((f) => (
            <li key={f.id} className="flex items-center gap-2 text-sm text-foreground">
              <span className="w-2 h-2 rounded-full flex-shrink-0 bg-red-400" />
              <span className="truncate">{f.titre}</span>
            </li>
          ))}
        </ul>
      </div>

      <h3 className="text-sm font-bold text-primary">Barre de progression</h3>
      <div className="relative rounded-2xl overflow-hidden p-4">
        <Image src="/images/db-card-progress.png" alt="" fill className="object-cover" aria-hidden />
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex-1 flex flex-col gap-3">
            {FORMATIONS_TERMINEES.map((f) => (
              <div key={f.id} className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-accent flex-shrink-0" />
                <span className="text-xs text-muted-foreground">terminé</span>
                <div className="flex-1 h-2.5 rounded-full bg-accent/40" />
              </div>
            ))}
          </div>
          <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 relative">
            <Image src="/images/db-progress-80.png" alt="100%" fill className="object-contain" />
          </div>
        </div>
      </div>

      <Link href="/formations" className="w-fit">
        <Image src="/images/db-btn-revoir.png" alt="Revoir" width={120} height={40} className="object-contain hover:opacity-90 transition-opacity cursor-pointer" />
      </Link>
    </div>
  );
}

/* ─── État vide ─────────────────────────────────────────────────────── */
function EmptyFormations() {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-bold text-primary">Formations actives</h3>
      <div className="relative rounded-2xl overflow-hidden p-6 flex flex-col items-center gap-3">
        <Image src="/images/db-card-active.png" alt="" fill className="object-cover" aria-hidden />
        <Image src="/images/db-empty.png" alt="Aucune formation" width={64} height={64} className="relative z-10" />
        <p className="relative z-10 text-sm font-bold text-dark-green text-center">Aucune formation en cours !</p>
      </div>
      <h3 className="text-sm font-bold text-primary">Barre de progression</h3>
      <div className="relative rounded-2xl overflow-hidden p-6 flex flex-col items-center gap-3">
        <Image src="/images/db-card-progress.png" alt="" fill className="object-cover" aria-hidden />
        <Image src="/images/db-empty.png" alt="Aucune formation" width={64} height={64} className="relative z-10" />
        <p className="relative z-10 text-sm font-bold text-dark-green text-center">Aucune formation en cours !</p>
      </div>
      <Link href="/formations" className="w-fit">
        <Image src="/images/db-btn-decouvrir.png" alt="Découvrir" width={140} height={40} className="object-contain hover:opacity-90 transition-opacity cursor-pointer" />
      </Link>
    </div>
  );
}

/* ─── Activités ─────────────────────────────────────────────────────── */
function ActivitesContent({ hasData }: { hasData: boolean }) {
  const Section = ({ title, color, items }: { title: string; color: string; items: { texte: string; date: string }[] }) => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="text-sm font-bold flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />{title}
        </span>
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Clock size={11} /> Date et heures
        </span>
      </div>
      <div className="rounded-2xl border border-border bg-white/80 overflow-hidden">
        {hasData && items.length > 0 ? items.map((item, i) => (
          <div key={i} className={`flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4 px-4 py-3 text-sm ${i < items.length - 1 ? "border-b border-border" : ""}`}>
            <span className="text-foreground text-xs sm:text-sm">{item.texte}</span>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{item.date}</span>
          </div>
        )) : (
          <div className="px-4 py-6 text-xs text-muted-foreground text-center flex flex-col items-center gap-2">
            <Image src="/images/db-empty.png" alt="" width={48} height={48} />
            <span>Aucune {title.toLowerCase()}</span>
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

/* ─── Page principale ───────────────────────────────────────────────── */
export default function TableauDeBordPage() {
  const [activeTab,     setActiveTab]     = useState("tableau");
  const [activeSection, setActiveSection] = useState("formations");
  const [hasActive]                       = useState(true);
  const [hasActivity]                     = useState(true);
  const [sidebarOpen,   setSidebarOpen]   = useState(false);

  return (
    <div>
      <DashboardHero />
      <DashboardTabs active={activeTab} onChange={setActiveTab} />

      <div className="relative overflow-hidden">
        <Image src="/images/db-bg-content.png" alt="" fill className="object-cover" aria-hidden />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">

          {/* Bouton sidebar mobile */}
          <button className="lg:hidden flex items-center gap-2 mb-4 text-sm font-bold text-primary"
            onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
            Menu
          </button>

          {/* Sidebar mobile déroulante */}
          {sidebarOpen && (
            <div className="lg:hidden flex flex-wrap gap-2 mb-4">
              {SIDEBAR.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button key={item.id} onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
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
          )}

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
                      <Image src={item.icon} alt={item.label} width={17} height={17}
                        className={isActive ? "brightness-0 invert" : ""} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Contenu */}
            <main className="flex-1 min-w-0">
              {activeSection === "formations" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {hasActive ? <FormationsActives /> : <EmptyFormations />}
                  <FormationsTerminees />
                </div>
              )}
              {activeSection === "activites" && <ActivitesContent hasData={hasActivity} />}
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
