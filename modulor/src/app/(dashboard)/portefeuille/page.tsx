"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ChevronRight, Menu, X, Bell, Settings, Clock,
  GraduationCap, Activity, Wallet, Zap, KeyRound, LayoutDashboard, FileText,
  Loader2, CheckCircle2, XCircle, AlertCircle,
  type LucideIcon,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { formatCFA } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────────────── */
interface WalletData {
  solde_principal: number;
  solde_recu:      number;
  solde_achat:     number;
}
interface Transaction {
  id:          string;
  type:        string;
  montant:     number;
  description: string;
  statut:      string;
  created_at:  string;
}

/* ─── Sidebar ────────────────────────────────────────────────────────── */
const SIDEBAR: { id: string; label: string; Icon: LucideIcon; href: string }[] = [
  { id: "formations",   label: "Formations",   Icon: GraduationCap, href: "/tableau-de-bord" },
  { id: "activites",    label: "Activités",    Icon: Activity,      href: "/tableau-de-bord" },
  { id: "portefeuille", label: "Portefeuille", Icon: Wallet,        href: "/portefeuille"    },
  { id: "actions",      label: "Actions",      Icon: Zap,           href: "/tableau-de-bord" },
  { id: "acces",        label: "Accès",        Icon: KeyRound,      href: "/tableau-de-bord" },
];

const SOLDE_CARDS = [
  { key: "solde_principal" as const, label: "Solde principal", bg: "/images/pf-card-green.png",  textColor: "#03251c" },
  { key: "solde_recu"      as const, label: "Solde reçu",      bg: "/images/pf-card-pink.png",   textColor: "#e53935" },
  { key: "solde_achat"     as const, label: "Solde d'achat",   bg: "/images/pf-card-yellow.png", textColor: "#f59e0b" },
];

/* ─── Hero ──────────────────────────────────────────────────────────── */
function DashboardHero({ userName, userRole }: { userName: string; userRole: string }) {
  const initials = userName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "U";

  return (
    <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
      <Image src="/images/bg-hero.png" alt="" fill className="object-cover" aria-hidden />
      <div className="absolute inset-0 pointer-events-none">
        <Image src="/images/db-pattern.png" alt="" fill className="object-cover opacity-20" aria-hidden />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">Bonjour, {userName} !</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button aria-label="Notifications"
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/50 transition-colors group">
              <Bell size={18} className="text-primary group-hover:scale-110 transition-transform" />
            </button>
            <button aria-label="Paramètres"
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/50 transition-colors group">
              <Settings size={18} className="text-accent group-hover:rotate-45 transition-transform duration-300" />
            </button>
            <Link href="/profil" aria-label="Mon profil"
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/50 transition-colors group">
              <Clock size={18} className="text-primary group-hover:scale-110 transition-transform" />
            </Link>
          </div>
          <Link href="/profil" className="flex items-center gap-2 pl-3 border-l border-border hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
              style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
              {initials}
            </div>
            <div className="hidden sm:block">
              <p className="text-xs sm:text-sm font-bold text-foreground leading-tight">{userName}</p>
              <p className="text-xs text-muted-foreground">{userRole}</p>
            </div>
          </Link>
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
          { label: "Tableau",  Icon: LayoutDashboard, active: true  },
          { label: "Détails",  Icon: FileText,        active: false },
        ].map((tab) => (
          <button key={tab.label}
            className={`flex items-center gap-2 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
              tab.active ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}>
            <tab.Icon size={15} />
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Statut badge transaction ───────────────────────────────────────── */
function StatutBadge({ statut }: { statut: string }) {
  if (statut === "success") return (
    <span className="flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
      <CheckCircle2 size={10} /> Succès
    </span>
  );
  if (statut === "failed") return (
    <span className="flex items-center gap-1 text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
      <XCircle size={10} /> Échoué
    </span>
  );
  return (
    <span className="flex items-center gap-1 text-[10px] font-bold text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full">
      <AlertCircle size={10} /> En attente
    </span>
  );
}

/* ─── Contenu Portefeuille ──────────────────────────────────────────── */
function PortefeuilleContent({ wallet, transactions, loading }: {
  wallet: WalletData | null;
  transactions: Transaction[];
  loading: boolean;
}) {
  if (loading) {
    return <div className="flex justify-center py-12"><Loader2 size={28} className="text-primary animate-spin" /></div>;
  }

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("fr-FR", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

  return (
    <div className="flex flex-col gap-5">

      {/* 3 cartes soldes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {SOLDE_CARDS.map((s) => (
          <div key={s.label} className="relative rounded-2xl overflow-hidden p-5 min-h-[100px] flex flex-col gap-2 justify-center">
            <Image src={s.bg} alt="" fill className="object-cover" aria-hidden />
            <span className="relative z-10 text-xs text-muted-foreground font-semibold">{s.label}</span>
            <span className="relative z-10 text-3xl sm:text-4xl font-bold" style={{ color: s.textColor }}>
              {formatCFA(wallet?.[s.key] ?? 0)}
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
              {transactions.map((t) => (
                <div key={t.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-3">
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-sm text-foreground">{t.description}</span>
                    <span className="text-xs text-muted-foreground">{formatDate(t.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm font-bold text-foreground">{formatCFA(t.montant)}</span>
                    <StatutBadge statut={t.statut} />
                  </div>
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
  const [activeSection, setActiveSection] = useState("portefeuille");
  const [sidebarOpen,   setSidebarOpen]   = useState(false);
  const [userName,      setUserName]      = useState("Utilisateur");
  const [userRole,      setUserRole]      = useState("Étudiant");
  const [wallet,        setWallet]        = useState<WalletData | null>(null);
  const [transactions,  setTransactions]  = useState<Transaction[]>([]);
  const [loading,       setLoading]       = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      const uid  = data.user.id;
      const meta = data.user.user_metadata;

      const { data: profile } = await supabase
        .from("profiles").select("nom, role").eq("id", uid).single();

      setUserName(profile?.nom ?? meta?.nom ?? data.user.email?.split("@")[0] ?? "Utilisateur");
      const roleMap: Record<string, string> = {
        etudiant: "Étudiant", formateur: "Formateur",
        cadre: "Cadre éducatif", autre: "Autre", admin: "Admin",
      };
      setUserRole(roleMap[profile?.role ?? meta?.role ?? "etudiant"] ?? "Étudiant");

      /* Wallet */
      const { data: w } = await supabase
        .from("wallet").select("*").eq("user_id", uid).single();
      setWallet(w ?? null);

      /* Transactions */
      const { data: txs } = await supabase
        .from("transactions")
        .select("id, type, montant, description, statut, created_at")
        .eq("user_id", uid)
        .order("created_at", { ascending: false })
        .limit(50);
      setTransactions(txs ?? []);

      setLoading(false);
    });
  }, []);

  return (
    <div>
      <DashboardHero userName={userName} userRole={userRole} />
      <DashboardTabs />

      <div className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #EAF7EF 0%, #FFFFFF 28%)" }}>

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
                  <Link key={item.id} href={item.href}
                    onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                      isActive ? "text-white" : "bg-white border border-border text-foreground hover:border-primary hover:text-primary"
                    }`}
                    style={isActive ? { background: "linear-gradient(to right, #2934f2, #57f27d)" } : {}}>
                    <item.Icon size={14} />
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
                    <Link key={item.id} href={item.href}
                      onClick={() => setActiveSection(item.id)}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                        isActive ? "text-white shadow" : "text-foreground hover:bg-white/60 hover:text-primary"
                      }`}
                      style={isActive ? { background: "linear-gradient(to right, #2934f2, #57f27d)" } : {}}>
                      <item.Icon size={17} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </aside>

            {/* Contenu */}
            <main className="flex-1 min-w-0">
              <PortefeuilleContent wallet={wallet} transactions={transactions} loading={loading} />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
