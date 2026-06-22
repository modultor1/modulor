"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { createClient } from "@/lib/supabase/client";
import {
  Bell, Settings, Clock, CheckCircle2, Menu, X, ChevronRight,
  BookOpen, Activity, Wallet, Zap, Lock, LayoutDashboard, FileText,
  Loader2, AlertCircle,
  PlayCircle, Compass, Heart, ShoppingCart, User, MessageCircle,
  type LucideIcon,
} from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────────── */
interface Enrollment {
  formation_id: string;
  titre:        string;
  domaine:      string;
  image:        string;
  prix:         number;
  statut:       string;
  pourcentage:  number;
  terminee:     boolean;
  enrolled_at:  string;
}

interface Notification {
  id:         string;
  titre:      string;
  message:    string;
  type:       string;
  lu:         boolean;
  created_at: string;
}

/* ─── Sidebar ────────────────────────────────────────────────────────── */
const SIDEBAR: { id: string; label: string; Icon: LucideIcon; href: string | null }[] = [
  { id: "formations",   label: "Formations",   Icon: BookOpen, href: null            },
  { id: "activites",    label: "Activités",    Icon: Activity, href: null            },
  { id: "portefeuille", label: "Portefeuille", Icon: Wallet,   href: "/portefeuille" },
  { id: "actions",      label: "Actions",      Icon: Zap,      href: null            },
  { id: "acces",        label: "Accès",        Icon: Lock,     href: null            },
];

/* ─── Barre de progression Tailwind ─────────────────────────────────── */
function ProgressBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="w-full h-2.5 rounded-full bg-border overflow-hidden">
      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────────── */
function DashboardHero({ userName, userEmail, userRole, unreadCount, onNotif, onSettings }: {
  userName: string; userEmail: string; userRole: string;
  unreadCount: number; onNotif: () => void; onSettings: () => void;
}) {
  const initials = userName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "U";

  return (
    <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
      <Image src="/images/bg-hero.png" alt="" fill className="object-cover" aria-hidden />
      <div className="absolute inset-0 pointer-events-none">
        <Image src="/images/db-pattern.png" alt="" fill className="object-cover opacity-20" aria-hidden />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
          Bonjour, {userName} !
        </h1>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <button onClick={onNotif} aria-label="Notifications"
              className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full hover:bg-white/50 transition-colors group">
              <Bell size={18} className="text-primary group-hover:scale-110 transition-transform" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>
            <button onClick={onSettings} aria-label="Paramètres"
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full hover:bg-white/50 transition-colors group">
              <Settings size={18} className="text-accent group-hover:rotate-45 transition-transform duration-300" />
            </button>
            <Link href="/profil" aria-label="Mon profil"
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full hover:bg-white/50 transition-colors group">
              <Clock size={18} className="text-primary group-hover:scale-110 transition-transform" />
            </Link>
          </div>

          <Link href="/profil" className="flex items-center gap-2 sm:gap-3 pl-3 border-l border-border hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
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

/* ─── Panel Notifications ────────────────────────────────────────────── */
function NotifPanel({ notifs, onClose, onMarkRead }: {
  notifs: Notification[];
  onClose: () => void;
  onMarkRead: () => void;
}) {
  const typeColor: Record<string, string> = {
    success: "#57f27d", info: "#2934f2", warning: "#f59e0b", error: "#ef4444",
  };
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative z-10 w-full max-w-sm bg-white border-l border-border shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <span className="font-bold text-foreground text-sm">Notifications</span>
          <div className="flex items-center gap-3">
            <button onClick={onMarkRead} className="text-xs text-primary hover:underline">
              Tout lire
            </button>
            <button onClick={onClose}>
              <X size={18} className="text-muted-foreground" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {notifs.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-12 px-4 text-center">
              <Bell size={32} className="text-border" />
              <p className="text-sm text-muted-foreground">Aucune notification</p>
            </div>
          ) : notifs.map((n) => (
            <div key={n.id}
              className={`px-4 py-3 border-b border-border/50 flex gap-3 ${n.lu ? "opacity-60" : "bg-muted/30"}`}>
              <div className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                style={{ background: typeColor[n.type] ?? "#6b7280" }} />
              <div className="flex flex-col gap-0.5 min-w-0">
                <p className="text-xs font-bold text-foreground">{n.titre}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{n.message}</p>
                <p className="text-[10px] text-muted-foreground mt-1">
                  {new Date(n.created_at).toLocaleDateString("fr-FR", {
                    day: "numeric", month: "long", hour: "2-digit", minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
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
          { id: "tableau", label: "Tableau",  Icon: LayoutDashboard },
          { id: "details", label: "Détails",  Icon: FileText        },
        ].map((tab) => (
          <button key={tab.id} onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
              active === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}>
            <tab.Icon size={15} />
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Formations actives ────────────────────────────────────────────── */
const COLORS = ["#2934f2", "#57f27d", "#ef4444", "#f59e0b", "#8b5cf6"];

function FormationsActives({ enrollments }: { enrollments: Enrollment[] }) {
  const actives = enrollments.filter((e) => !e.terminee);
  return (
    <motion.div className="flex flex-col gap-3"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}>
      <h3 className="text-sm font-bold text-primary">Formations actives</h3>

      <div className="relative rounded-2xl overflow-hidden p-4">
        <Image src="/images/db-card-active.png" alt="" fill className="object-cover" aria-hidden />
        <ul className="relative z-10 flex flex-col gap-2">
          {actives.map((e, i) => (
            <li key={e.formation_id} className="flex items-center gap-2 text-sm text-foreground">
              <span className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: COLORS[i % COLORS.length] }} />
              <span className="truncate">{e.titre}</span>
            </li>
          ))}
        </ul>
      </div>

      <h3 className="text-sm font-bold text-primary">Barre de progression</h3>
      <div className="relative rounded-2xl overflow-hidden p-4">
        <Image src="/images/db-card-progress.png" alt="" fill className="object-cover" aria-hidden />
        <div className="relative z-10 flex flex-col gap-3">
          {actives.map((e, i) => (
            <div key={e.formation_id} className="flex flex-col gap-1">
              <span className="text-xs text-foreground truncate">{e.titre}</span>
              <div className="flex items-center gap-2">
                <ProgressBar pct={e.pourcentage} color={COLORS[i % COLORS.length]} />
                <span className="text-xs font-bold text-muted-foreground shrink-0">{e.pourcentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Link href="/formations" className="w-fit">
        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-white text-sm hover:opacity-90 transition-opacity cursor-pointer"
          style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
          Découvrir <ChevronRight size={14} />
        </span>
      </Link>
    </motion.div>
  );
}

/* ─── Formations terminées ──────────────────────────────────────────── */
function FormationsTerminees({ enrollments }: { enrollments: Enrollment[] }) {
  const done = enrollments.filter((e) => e.terminee);
  return (
    <motion.div className="flex flex-col gap-3"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}>
      <h3 className="text-sm font-bold text-primary">Formations terminées</h3>

      <div className="relative rounded-2xl overflow-hidden p-4">
        <Image src="/images/db-card-done.png" alt="" fill className="object-cover" aria-hidden />
        <ul className="relative z-10 flex flex-col gap-2">
          {done.map((e) => (
            <li key={e.formation_id} className="flex items-center gap-2 text-sm text-foreground">
              <CheckCircle2 size={13} className="text-accent flex-shrink-0" />
              <span className="truncate">{e.titre}</span>
            </li>
          ))}
        </ul>
      </div>

      <h3 className="text-sm font-bold text-primary">Barre de progression</h3>
      <div className="relative rounded-2xl overflow-hidden p-4">
        <Image src="/images/db-card-progress.png" alt="" fill className="object-cover" aria-hidden />
        <div className="relative z-10 flex flex-col gap-3">
          {done.map((e) => (
            <div key={e.formation_id} className="flex flex-col gap-1">
              <span className="text-xs text-foreground truncate">{e.titre}</span>
              <div className="flex items-center gap-2">
                <ProgressBar pct={100} color="#57f27d" />
                <span className="text-xs font-bold text-accent shrink-0">100%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Link href="/formations" className="w-fit">
        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-white text-sm hover:opacity-90 transition-opacity cursor-pointer"
          style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
          Revoir <ChevronRight size={14} />
        </span>
      </Link>
    </motion.div>
  );
}

/* ─── États vides ───────────────────────────────────────────────────── */
function EmptyFormations() {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-bold text-primary">Formations actives</h3>
      <div className="relative rounded-2xl overflow-hidden p-6 flex flex-col items-center gap-3">
        <Image src="/images/db-card-active.png" alt="" fill className="object-cover" aria-hidden />
        <Image src="/images/db-empty.png" alt="" width={64} height={64} className="relative z-10" />
        <p className="relative z-10 text-sm font-bold text-dark-green text-center">Aucune formation en cours !</p>
      </div>
      <h3 className="text-sm font-bold text-primary">Barre de progression</h3>
      <div className="relative rounded-2xl overflow-hidden p-6 flex flex-col items-center gap-3">
        <Image src="/images/db-card-progress.png" alt="" fill className="object-cover" aria-hidden />
        <Image src="/images/db-empty.png" alt="" width={64} height={64} className="relative z-10" />
        <p className="relative z-10 text-sm font-bold text-dark-green text-center">Aucune formation en cours !</p>
      </div>
      <Link href="/formations" className="w-fit">
        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-white text-sm hover:opacity-90 transition-opacity cursor-pointer"
          style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
          Découvrir <ChevronRight size={14} />
        </span>
      </Link>
    </div>
  );
}

function EmptyTerminees() {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-bold text-primary">Formations terminées</h3>
      <div className="relative rounded-2xl overflow-hidden p-6 flex flex-col items-center gap-3">
        <Image src="/images/db-card-done.png" alt="" fill className="object-cover" aria-hidden />
        <Image src="/images/db-empty.png" alt="" width={56} height={56} className="relative z-10" />
        <p className="relative z-10 text-sm font-bold text-dark-green text-center">Aucune formation terminée</p>
      </div>
      <h3 className="text-sm font-bold text-primary">Barre de progression</h3>
      <div className="relative rounded-2xl overflow-hidden p-6 flex flex-col items-center gap-3">
        <Image src="/images/db-card-progress.png" alt="" fill className="object-cover" aria-hidden />
        <p className="relative z-10 text-xs text-muted-foreground">Complétez vos formations pour voir votre progression</p>
      </div>
      <Link href="/formations" className="w-fit">
        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-white text-sm hover:opacity-90 transition-opacity cursor-pointer"
          style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
          Explorer <ChevronRight size={14} />
        </span>
      </Link>
    </div>
  );
}

/* ─── Onglet Détails ────────────────────────────────────────────────── */
function DetailsTab({ userName, userEmail, userRole, enrollments }: {
  userName: string; userEmail: string; userRole: string; enrollments: Enrollment[];
}) {
  const actives = enrollments.filter((e) => !e.terminee).length;
  const terminees = enrollments.filter((e) => e.terminee).length;

  return (
    <motion.div className="flex flex-col gap-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}>
      <div className="relative rounded-2xl overflow-hidden p-5">
        <Image src="/images/db-card-active.png" alt="" fill className="object-cover" aria-hidden />
        <div className="relative z-10 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-primary">Informations du compte</h3>
          {[
            { label: "Nom", value: userName },
            { label: "Email", value: userEmail },
            { label: "Rôle", value: userRole },
            { label: "Statut", value: "Compte actif" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between border-b border-border/30 pb-2 last:border-0">
              <span className="text-xs text-muted-foreground">{item.label}</span>
              <span className="text-xs font-bold text-foreground">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <motion.div className="grid grid-cols-2 sm:grid-cols-3 gap-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
        {[
          { label: "Formations achetées",  value: String(enrollments.length) },
          { label: "Formations terminées", value: String(terminees) },
          { label: "En cours",             value: String(actives) },
        ].map((stat) => (
          <motion.div key={stat.label} className="relative rounded-2xl overflow-hidden p-4 text-center"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
            <Image src="/images/db-card-active.png" alt="" fill className="object-cover" aria-hidden />
            <p className="relative z-10 text-2xl font-bold text-primary">{stat.value}</p>
            <p className="relative z-10 text-xs text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="relative rounded-2xl overflow-hidden p-5">
        <Image src="/images/db-card-active.png" alt="" fill className="object-cover" aria-hidden />
        <div className="relative z-10 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-primary">Actions rapides</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/formations">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white cursor-pointer hover:opacity-90"
                style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
                Découvrir les formations
              </span>
            </Link>
            <Link href="/profil">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border-2 border-primary text-primary cursor-pointer hover:bg-primary/5">
                Modifier mon profil
              </span>
            </Link>
            <Link href="/portefeuille">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border-2 border-accent text-dark-green cursor-pointer hover:bg-accent/10">
                Mon portefeuille
              </span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Activités ─────────────────────────────────────────────────────── */
function ActivitesContent({ enrollments, notifications }: {
  enrollments: Enrollment[];
  notifications: Notification[];
}) {
  const Section = ({ title, color, items }: {
    title: string; color: string;
    items: { texte: string; date: string }[];
  }) => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="text-sm font-bold flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />{title}
        </span>
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Clock size={11} /> Date et heure
        </span>
      </div>
      <div className="rounded-2xl border border-border bg-white/80 overflow-hidden">
        {items.length > 0 ? items.map((item, i) => (
          <div key={i} className={`flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4 px-4 py-3 text-sm ${
            i < items.length - 1 ? "border-b border-border" : ""}`}>
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

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("fr-FR", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

  const activites = enrollments.map((e) => ({
    texte: `Vous vous êtes inscrit à la formation "${e.titre}"`,
    date:  formatDate(e.enrolled_at),
  }));

  const notifItems = notifications.map((n) => ({
    texte: n.message,
    date:  formatDate(n.created_at),
  }));

  return (
    <motion.div className="flex flex-col gap-5"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}>
      <Section title="Dernières activités"    color="#57f27d" items={activites}  />
      <Section title="Notifications récentes" color="#f59e0b" items={notifItems} />
    </motion.div>
  );
}

/* ─── Actions rapides ───────────────────────────────────────────────── */
function ActionsContent({ enrollments }: { enrollments: Enrollment[] }) {
  const lastActive = enrollments.find((e) => !e.terminee);
  const continueHref = lastActive ? `/formations/${lastActive.formation_id}/cours` : "/formations";

  const actions: { label: string; desc: string; Icon: LucideIcon; href: string; color: string }[] = [
    { label: lastActive ? "Reprendre le cours" : "Commencer à apprendre", desc: lastActive ? lastActive.titre : "Découvrez nos formations", Icon: PlayCircle,   href: continueHref,   color: "#2934f2" },
    { label: "Explorer les formations", desc: "Parcourir le catalogue",        Icon: Compass,      href: "/formations",   color: "#57f27d" },
    { label: "Mes favoris",             desc: "Formations enregistrées",       Icon: Heart,        href: "/mes-favoris",  color: "#ef4444" },
    { label: "Mon panier",              desc: "Finaliser un achat",            Icon: ShoppingCart, href: "/panier",       color: "#f59e0b" },
    { label: "Mon portefeuille",        desc: "Solde et transactions",         Icon: Wallet,       href: "/portefeuille", color: "#8b5cf6" },
    { label: "Mon profil",              desc: "Modifier mes informations",     Icon: User,         href: "/profil",       color: "#2934f2" },
    { label: "Contacter le support",    desc: "Besoin d'aide ?",               Icon: MessageCircle,href: "/contact",      color: "#57f27d" },
  ];

  return (
    <motion.div className="flex flex-col gap-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}>
      <h3 className="text-sm font-bold text-primary">Actions rapides</h3>
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
        {actions.map((a) => (
          <motion.div key={a.label}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}>
            <Link href={a.href}
              className="group flex items-center gap-3 rounded-2xl border border-border bg-white/80 hover:bg-white hover:shadow-md hover:border-primary/30 transition-all p-4 h-full">
              <span className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${a.color}1a` }}>
                <a.Icon size={20} style={{ color: a.color }} />
              </span>
              <span className="flex flex-col min-w-0 flex-1">
                <span className="text-sm font-bold text-foreground truncate">{a.label}</span>
                <span className="text-xs text-muted-foreground truncate">{a.desc}</span>
              </span>
              <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ─── Page principale ───────────────────────────────────────────────── */
export default function TableauDeBordPage() {
  const [activeTab,      setActiveTab]      = useState("tableau");
  const [activeSection,  setActiveSection]  = useState("formations");
  const [sidebarOpen,    setSidebarOpen]    = useState(false);
  const [showNotif,      setShowNotif]      = useState(false);
  const [userName,       setUserName]       = useState("Utilisateur");
  const [userEmail,      setUserEmail]      = useState("");
  const [userRole,       setUserRole]       = useState("Étudiant");
  const [userId,         setUserId]         = useState<string | null>(null);
  const [enrollments,    setEnrollments]    = useState<Enrollment[]>([]);
  const [notifications,  setNotifications]  = useState<Notification[]>([]);
  const [loadingData,    setLoadingData]    = useState(true);

  const unreadCount = notifications.filter((n) => !n.lu).length;
  const channelRef  = useRef<ReturnType<typeof createClient> extends { channel: (...args: unknown[]) => infer R } ? R : unknown>(null);

  /* ─── Charger l'utilisateur + données ── */
  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      const uid  = data.user.id;
      const meta = data.user.user_metadata;
      setUserEmail(data.user.email ?? "");
      setUserId(uid);

      const { data: profile } = await supabase
        .from("profiles").select("nom, role").eq("id", uid).single();

      const nom = profile?.nom ?? meta?.nom ?? data.user.email?.split("@")[0] ?? "Utilisateur";
      setUserName(nom);

      const roleMap: Record<string, string> = {
        etudiant: "Étudiant", formateur: "Formateur",
        cadre: "Cadre éducatif", autre: "Autre", admin: "Admin",
      };
      setUserRole(roleMap[profile?.role ?? meta?.role ?? "etudiant"] ?? "Étudiant");

      /* Enrôlements via la vue user_formations */
      const { data: envs } = await supabase
        .from("user_formations")
        .select("*")
        .eq("user_id", uid)
        .order("enrolled_at", { ascending: false });
      setEnrollments(envs ?? []);

      /* Notifications */
      const { data: notifs } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", uid)
        .order("created_at", { ascending: false })
        .limit(30);
      setNotifications(notifs ?? []);

      setLoadingData(false);

      /* ── Realtime : nouvelles notifications ── */
      // Clean up old channel if exists
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((channelRef as any).current) {
        supabase.removeChannel((channelRef as any).current);
      }

      const ch = supabase
        .channel(`notif-${uid}`)
        .on("postgres_changes", {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${uid}`,
        }, (payload) => {
          setNotifications((prev) => [payload.new as Notification, ...prev]);
        })
        .subscribe();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (channelRef as any).current = ch;
    });

    return () => {
      const supabase = createClient();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((channelRef as any).current) {
        supabase.removeChannel((channelRef as any).current);
      }
    };
  }, []);

  async function markAllRead() {
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    setNotifications((prev) => prev.map((n) => ({ ...n, lu: true })));
  }

  const hasActive   = enrollments.some((e) => !e.terminee);
  const hasTerminee = enrollments.some((e) => e.terminee);

  return (
    <div>
      <DashboardHero userName={userName} userEmail={userEmail} userRole={userRole}
        unreadCount={unreadCount}
        onNotif={() => setShowNotif(!showNotif)}
        onSettings={() => { window.location.href = "/profil"; }} />

      {showNotif && (
        <NotifPanel
          notifs={notifications}
          onClose={() => setShowNotif(false)}
          onMarkRead={() => { markAllRead(); setShowNotif(false); }}
        />
      )}

      <DashboardTabs active={activeTab} onChange={setActiveTab} />

      <div className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #EAF7EF 0%, #FFFFFF 28%)" }}>

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
                const cls = `flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  isActive ? "text-white" : "bg-white border border-border text-foreground hover:border-primary hover:text-primary"
                }`;
                const style = isActive ? { background: "linear-gradient(to right, #2934f2, #57f27d)" } : {};
                const inner = <><item.Icon size={14} />{item.label}</>;
                return item.href ? (
                  <Link key={item.id} href={item.href} className={cls} style={style}>{inner}</Link>
                ) : (
                  <button key={item.id} onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
                    className={cls} style={style}>{inner}</button>
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
                  const cls = `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold text-left transition-all w-full ${
                    isActive ? "text-white shadow" : "text-foreground hover:bg-white/60 hover:text-primary"
                  }`;
                  const style = isActive ? { background: "linear-gradient(to right, #2934f2, #57f27d)" } : {};
                  const inner = <><item.Icon size={17} />{item.label}</>;
                  return item.href ? (
                    <Link key={item.id} href={item.href} className={cls} style={style}>{inner}</Link>
                  ) : (
                    <button key={item.id} onClick={() => setActiveSection(item.id)} className={cls} style={style}>
                      {inner}
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Contenu */}
            <main className="flex-1 min-w-0">
              {loadingData ? (
                <div className="flex justify-center py-12">
                  <Loader2 size={28} className="text-primary animate-spin" />
                </div>
              ) : (
                <>
                  {activeSection === "formations" && activeTab === "tableau" && (
                    <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-5"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6 }}>
                      {hasActive ? <FormationsActives enrollments={enrollments} /> : <EmptyFormations />}
                      {hasTerminee ? <FormationsTerminees enrollments={enrollments} /> : <EmptyTerminees />}
                    </motion.div>
                  )}
                  {activeSection === "formations" && activeTab === "details" && (
                    <DetailsTab userName={userName} userEmail={userEmail} userRole={userRole} enrollments={enrollments} />
                  )}
                  {activeSection === "activites" && (
                    <ActivitesContent enrollments={enrollments} notifications={notifications} />
                  )}
                  {activeSection === "actions" && (
                    <ActionsContent enrollments={enrollments} />
                  )}
                  {activeSection === "acces" && (
                    <div className="rounded-2xl border border-border bg-white/80 p-8 text-center flex flex-col items-center gap-3">
                      <AlertCircle size={32} className="text-muted-foreground" />
                      <p className="text-sm text-muted-foreground font-medium">Section à venir prochainement</p>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
