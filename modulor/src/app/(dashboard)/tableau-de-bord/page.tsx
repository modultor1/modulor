"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Bell, Settings, Clock, BookOpen, Activity, Wallet, Send, Lock, ChevronRight, CheckCircle2, XCircle } from "lucide-react";
import { CircularProgress } from "@/components/dashboard/CircularProgress";

/* ─── Données mock ──────────────────────────────────────────────────── */
const FORMATIONS_ACTIVES = [
  { id: "1", titre: "Développement web", progression: 45, couleur: "#2934f2" },
  { id: "2", titre: "Design graphique et brand design", progression: 60, couleur: "#2934f2" },
  { id: "3", titre: "Commerce en ligne et produits digitaux", progression: 20, couleur: "#ef4444" },
];

const FORMATIONS_TERMINEES = [
  { id: "4", titre: "Développement web", couleur: "#57f27d" },
  { id: "5", titre: "Design graphique et brand design", couleur: "#57f27d" },
  { id: "6", titre: "Commerce en ligne et produits digitaux", couleur: "#57f27d" },
];

const ACTIVITES = [
  { texte: "Vous avez souscrit à la formation de Design graphique", date: "10/01/2026 à 13h 05mn" },
  { texte: "Vous avez souscrit à la formation de E-Commerce", date: "14/01/2026 à 11h 05mn" },
  { texte: "Vous avez souscrit à la formation de Développement...", date: "17/01/2026 à 11h 06mn" },
];

const NOTIFICATIONS = [
  { texte: "Souscription de la formation Design graphique avec succès", date: "10/01/2026 à 11h 06mn" },
  { texte: "Souscription de la formation E-Commerce avec succès", date: "14/01/2026 à 11h 06mn" },
];

const RECOMMANDATIONS = [
  { texte: "Alain SODJINOU s'est inscrit sur notre plateforme pour votre...", date: "10/01/2026 à 13h 06mn" },
  { texte: "Alain SODJINOU s'est inscrit sur notre plateforme pour votre...", date: "14/01/2026 à 11h 06mn" },
];

/* ─── Sidebar items ─────────────────────────────────────────────────── */
const SIDEBAR_ITEMS = [
  { id: "formations",  label: "Formations",   icon: BookOpen,  dotColor: "bg-primary" },
  { id: "activites",   label: "Activités",    icon: Activity,  dotColor: "bg-accent" },
  { id: "portefeuille",label: "Portefeuille", icon: Wallet,    dotColor: "bg-accent" },
  { id: "actions",     label: "Actions",      icon: Send,      dotColor: "bg-primary" },
  { id: "acces",       label: "Accès",        icon: Lock,      dotColor: "bg-accent" },
];

/* ─── Dashboard Hero ────────────────────────────────────────────────── */
function DashboardHero() {
  return (
    <div className="relative overflow-hidden py-6 px-4 sm:px-6 lg:px-8"
      style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #eef0fe 100%)" }}>
      <Image src="/images/pattern-hero.png" alt="" fill className="object-cover opacity-20" aria-hidden />
      <div className="relative z-10 max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Bonjour */}
        <h1 className="text-3xl md:text-4xl font-bold text-primary">Bonjour !</h1>

        {/* Icônes + profil */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <button className="p-1.5 rounded-full hover:bg-white/50 transition-colors">
              <Bell size={18} className="text-foreground" />
            </button>
            <button className="p-1.5 rounded-full hover:bg-white/50 transition-colors">
              <Settings size={18} className="text-foreground" />
            </button>
            <button className="p-1.5 rounded-full hover:bg-white/50 transition-colors">
              <Clock size={18} className="text-accent" />
            </button>
          </div>
          <div className="flex items-center gap-3 border-l border-border pl-4">
            <Image src="/images/testimonial-francis.png" alt="Franck KAKPO"
              width={40} height={40} className="rounded-full object-cover w-10 h-10" />
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
function DashboardTabs({ activeTab, onChange }: { activeTab: string; onChange: (t: string) => void }) {
  return (
    <div className="border-b border-border bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex gap-8">
        {[
          { id: "tableau",  label: "Tableau",  icon: "⊞" },
          { id: "details",  label: "Détails",  icon: "⊟" },
        ].map((tab) => (
          <button key={tab.id} onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 py-3 text-sm font-bold border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}>
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Section Formations ────────────────────────────────────────────── */
function FormationsContent({ hasActive }: { hasActive: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* Formations actives */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-bold text-primary">Formations actives</h3>

        {/* Liste */}
        <div className="rounded-xl border border-border bg-white p-4">
          {hasActive ? (
            <ul className="flex flex-col gap-1.5">
              {FORMATIONS_ACTIVES.map((f) => (
                <li key={f.id} className="flex items-center gap-2 text-sm text-foreground">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: f.couleur }} />
                  {f.titre}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-muted-foreground text-center py-4">Aucune formation en cours !</p>
          )}
        </div>

        {/* Barre de progression */}
        <p className="text-sm font-bold text-primary">Barre de progression</p>
        <div className="rounded-xl border border-border bg-white p-4">
          {hasActive ? (
            <div className="flex gap-4 items-center">
              <div className="flex-1 flex flex-col gap-3">
                {FORMATIONS_ACTIVES.map((f) => (
                  <div key={f.id} className="flex flex-col gap-1">
                    <span className="text-xs text-foreground truncate">{f.titre}</span>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full transition-all"
                        style={{ width: `${f.progression}%`, background: f.couleur }} />
                    </div>
                  </div>
                ))}
              </div>
              <CircularProgress value={80} size={80} color="#2934f2" />
            </div>
          ) : (
            <p className="text-xs text-muted-foreground text-center py-4">Aucune formation en cours !</p>
          )}
        </div>

        {/* Bouton */}
        {hasActive ? (
          <Link href="/formations" className="w-fit">
            <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-white text-sm cursor-pointer"
              style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
              Découvrir <ChevronRight size={16} />
            </span>
          </Link>
        ) : (
          <Link href="/formations" className="w-fit">
            <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-white text-sm cursor-pointer"
              style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
              Découvrir <ChevronRight size={16} />
            </span>
          </Link>
        )}
      </div>

      {/* Formations terminées */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-bold text-primary">Formations terminées</h3>

        {/* Liste */}
        <div className="rounded-xl border border-border bg-amber-50/50 p-4">
          <ul className="flex flex-col gap-1.5">
            {FORMATIONS_TERMINEES.map((f) => (
              <li key={f.id} className="flex items-center gap-2 text-sm text-foreground">
                <span className="w-2 h-2 rounded-full flex-shrink-0 bg-red-400" />
                {f.titre}
              </li>
            ))}
          </ul>
        </div>

        {/* Barre de progression */}
        <p className="text-sm font-bold text-primary">Barre de progression</p>
        <div className="rounded-xl border border-border bg-white p-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1 flex flex-col gap-3">
              {FORMATIONS_TERMINEES.map((f) => (
                <div key={f.id} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-accent flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">terminé</span>
                  <div className="flex-1 h-2 rounded-full bg-accent/30" />
                </div>
              ))}
            </div>
            <CircularProgress value={100} size={80} color="#57f27d" />
          </div>
        </div>

        {/* Bouton Revoir */}
        <Link href="/formations" className="w-fit">
          <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-white text-sm cursor-pointer bg-accent hover:bg-accent-dark transition-colors">
            Revoir <ChevronRight size={16} />
          </span>
        </Link>
      </div>
    </div>
  );
}

/* ─── Section Activités ─────────────────────────────────────────────── */
function ActivitesContent({ hasData }: { hasData: boolean }) {
  const Section = ({ title, color, items }: {
    title: string; color: string;
    items: { texte: string; date: string }[];
  }) => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: color }} />
          {title}
        </span>
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Clock size={11} /> Date et heures
        </span>
      </div>
      <div className="rounded-xl border border-border bg-white overflow-hidden">
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
    <div className="flex flex-col gap-6">
      <Section title="Dernières activités"     color="#57f27d" items={hasData ? ACTIVITES : []} />
      <Section title="Notifications récentes"  color="#f59e0b" items={hasData ? NOTIFICATIONS : []} />
      <Section title="Recommandations"         color="#ef4444" items={hasData ? RECOMMANDATIONS : []} />
    </div>
  );
}

/* ─── Page principale ───────────────────────────────────────────────── */
export default function TableauDeBordPage() {
  const [activeTab,     setActiveTab]     = useState<"tableau" | "details">("tableau");
  const [activeSection, setActiveSection] = useState("formations");
  const [hasActive,     setHasActive]     = useState(false); // false = vue "Formations terminées"
  const [hasActivity,   setHasActivity]   = useState(true);

  return (
    <div className="relative min-h-screen">
      {/* Fond + pattern page entière */}
      <Image src="/images/bg-hero.png" alt="" fill className="object-cover fixed -z-10" aria-hidden />
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Image src="/images/pattern-hero.png" alt="" fill className="object-cover opacity-10" aria-hidden />
      </div>

      <DashboardHero />
      <DashboardTabs activeTab={activeTab} onChange={(t) => setActiveTab(t as "tableau" | "details")} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">

          {/* Sidebar */}
          <aside className="hidden lg:flex flex-col gap-1 w-48 shrink-0">
            {SIDEBAR_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button key={item.id} onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-left transition-all ${
                    isActive
                      ? "text-white shadow-sm"
                      : "text-foreground hover:bg-white/60"
                  }`}
                  style={isActive ? { background: "linear-gradient(to right, #2934f2, #57f27d)" } : {}}>
                  <Icon size={15} className={isActive ? "text-white" : "text-accent"} />
                  {item.label}
                </button>
              );
            })}
          </aside>

          {/* Mobile sidebar (horizontal scroll) */}
          <div className="lg:hidden flex gap-2 mb-4 overflow-x-auto pb-1 w-full">
            {SIDEBAR_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button key={item.id} onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    isActive ? "text-white" : "text-foreground bg-white border border-border"
                  }`}
                  style={isActive ? { background: "linear-gradient(to right, #2934f2, #57f27d)" } : {}}>
                  <Icon size={12} /> {item.label}
                </button>
              );
            })}
          </div>

          {/* Contenu principal */}
          <main className="flex-1 min-w-0">
            {activeSection === "formations" && (
              <FormationsContent hasActive={hasActive} />
            )}
            {activeSection === "activites" && (
              <ActivitesContent hasData={hasActivity} />
            )}
            {(activeSection === "portefeuille" || activeSection === "actions" || activeSection === "acces") && (
              <div className="rounded-xl border border-border bg-white p-8 text-center text-muted-foreground text-sm">
                Section à venir
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
