"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronRight, Menu, X } from "lucide-react";

/* ─── Mock data ─────────────────────────────────────────────────────── */
const TRANSACTIONS_VIDES: never[] = [];

const TRANSACTIONS_EXEMPLE = [
  { texte: "Vous avez acheté une formation Design graphique de 15 000f CFA",  date: "10/01/2026 à 13h 06mn" },
  { texte: "Vous avez acheté une formation Développement web de 15 000f CFA", date: "14/01/2026 à 11h 06mn" },
  { texte: "Vous avez reçu sur votre portefeuille une somme de 30 000f CFA",  date: "16/01/2026 à 11h 06mn" },
];

const SIDEBAR = [
  { id: "formations",   label: "Formations",   icon: "/images/db-icon-dashboard.png" },
  { id: "activites",    label: "Activités",    icon: "/images/db-icon-action.png"    },
  { id: "portefeuille", label: "Portefeuille", icon: "/images/db-icon-wallet.png"    },
  { id: "actions",      label: "Actions",      icon: "/images/db-icon-action.png"    },
  { id: "acces",        label: "Accès",        icon: "/images/db-icon-docs.png"      },
];

const SOLDES = [
  { label: "Solde principal", montant: "00f CFA", bg: "/images/pf-card-green.png",  textColor: "#03251c" },
  { label: "Solde reçu",      montant: "00f CFA", bg: "/images/pf-card-pink.png",   textColor: "#e53935" },
  { label: "Solde d'achat",   montant: "00f CFA", bg: "/images/pf-card-yellow.png", textColor: "#f59e0b" },
];

/* ─── Hero ──────────────────────────────────────────────────────────── */
function DashboardHero() {
  return (
    <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
      <Image src="/images/bg-hero.png" alt="" fill className="object-cover" aria-hidden />
      <div className="absolute inset-0 pointer-events-none">
        <Image src="/images/db-pattern.png" alt="" fill className="object-cover opacity-20" aria-hidden />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">Bonjour !</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/50">
              <Image src="/images/db-icon-notif.png"    alt="Notifications" width={20} height={20} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/50">
              <Image src="/images/db-icon-settings.png" alt="Paramètres"    width={20} height={20} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/50">
              <Image src="/images/db-icon-clock.png"    alt="Horloge"       width={20} height={20} />
            </button>
          </div>
          <div className="flex items-center gap-2 pl-3 border-l border-border">
            <Image src="/images/db-avatar.png" alt="Franck KAKPO"
              width={36} height={36} className="rounded-full object-cover w-9 h-9" />
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
function DashboardTabs() {
  return (
    <div className="relative overflow-hidden">
      <Image src="/images/db-bg-tabs.png" alt="" fill className="object-cover" aria-hidden />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-6 sm:gap-8">
        {[
          { label: "Tableau",  icon: "/images/db-icon-dashboard.png", active: true  },
          { label: "Détails",  icon: "/images/db-icon-docs.png",      active: false },
        ].map((tab) => (
          <button key={tab.label}
            className={`flex items-center gap-2 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
              tab.active ? "border-primary text-primary" : "border-transparent text-muted-foreground"
            }`}>
            <Image src={tab.icon} alt="" width={15} height={15} />
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Contenu Portefeuille ──────────────────────────────────────────── */
function PortefeuilleContent({ hasTransactions }: { hasTransactions: boolean }) {
  const transactions = hasTransactions ? TRANSACTIONS_EXEMPLE : TRANSACTIONS_VIDES;

  return (
    <div className="flex flex-col gap-5">

      {/* 3 cartes soldes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {SOLDES.map((s) => (
          <div key={s.label} className="relative rounded-2xl overflow-hidden p-5 min-h-[100px] flex flex-col gap-2 justify-center">
            <Image src={s.bg} alt="" fill className="object-cover" aria-hidden />
            <span className="relative z-10 text-xs text-muted-foreground font-semibold">{s.label}</span>
            <span className="relative z-10 text-3xl sm:text-4xl font-bold" style={{ color: s.textColor }}>
              {s.montant}
            </span>
          </div>
        ))}
      </div>

      {/* Historique de transaction */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-bold text-foreground">Historique de transaction</h3>

        <div className="relative rounded-2xl overflow-hidden">
          <Image src="/images/pf-card-white.png" alt="" fill className="object-cover" aria-hidden />

          {transactions.length === 0 ? (
            <div className="relative z-10 flex flex-col items-center justify-center gap-3 py-10 px-4">
              <Image src="/images/pf-empty.png" alt="Aucune transaction" width={64} height={64} />
              <p className="text-sm text-muted-foreground text-center font-medium">
                Vous n&apos;avez effectué aucune transaction
              </p>
            </div>
          ) : (
            <div className="relative z-10 divide-y divide-border">
              {transactions.map((t, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 px-4 py-3">
                  <span className="text-sm text-foreground">{t.texte}</span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{t.date}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="flex flex-wrap gap-3">
        <Link href="/formations">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-white text-sm hover:opacity-90 transition-opacity cursor-pointer"
            style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
            Acheter une formation <ChevronRight size={14} />
          </span>
        </Link>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-white text-sm hover:opacity-90 transition-opacity cursor-pointer"
          style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
          Recharger <ChevronRight size={14} />
        </button>
      </div>

    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────── */
export default function PortefeuillePage() {
  const [activeSection,  setActiveSection]  = useState("portefeuille");
  const [hasTransactions]                   = useState(false);
  const [sidebarOpen,    setSidebarOpen]    = useState(false);

  return (
    <div>
      <DashboardHero />
      <DashboardTabs />

      <div className="relative overflow-hidden">
        <Image src="/images/db-bg-content.png" alt="" fill className="object-cover" aria-hidden />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">

          {/* Sidebar mobile */}
          <button className="lg:hidden flex items-center gap-2 mb-4 text-sm font-bold text-primary"
            onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
            Menu
          </button>
          {sidebarOpen && (
            <div className="lg:hidden flex flex-wrap gap-2 mb-4">
              {SIDEBAR.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <Link key={item.id} href={item.id === "formations" ? "/tableau-de-bord" : item.id === "portefeuille" ? "/portefeuille" : "#"}
                    onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                      isActive ? "text-white" : "bg-white border border-border text-foreground"
                    }`}
                    style={isActive ? { background: "linear-gradient(to right, #2934f2, #57f27d)" } : {}}>
                    <Image src={item.icon} alt={item.label} width={14} height={14}
                      className={isActive ? "brightness-0 invert" : ""} />
                    {item.label}
                  </Link>
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
                    <Link key={item.id}
                      href={item.id === "formations" ? "/tableau-de-bord" : item.id === "portefeuille" ? "/portefeuille" : "#"}
                      onClick={() => setActiveSection(item.id)}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                        isActive ? "text-white shadow" : "text-foreground hover:bg-white/60"
                      }`}
                      style={isActive ? { background: "linear-gradient(to right, #2934f2, #57f27d)" } : {}}>
                      <Image src={item.icon} alt={item.label} width={17} height={17}
                        className={isActive ? "brightness-0 invert" : ""} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </aside>

            {/* Contenu */}
            <main className="flex-1 min-w-0">
              <PortefeuilleContent hasTransactions={hasTransactions} />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
