"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard, History, Settings,
  LogOut, Trash2, Pencil, X, Check,
} from "lucide-react";

/* ─── Champ profil éditable ─────────────────────────────────────────── */
function ProfileField({
  label, value, type = "text",
}: { label: string; value: string; type?: string }) {
  const [editing, setEditing]   = useState(false);
  const [current, setCurrent]   = useState(value);
  const [draft, setDraft]       = useState(value);

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground font-semibold">{label}</span>
      <div className="relative flex items-center">
        {/* Fond champ */}
        <div className="absolute inset-0 rounded-xl"
          style={{ background: "linear-gradient(to right, #eaf4ff, #f0faff)" }} />
        <div className="relative z-10 flex-1 px-3 py-2.5 text-sm font-semibold text-foreground rounded-l-xl">
          {editing ? (
            <input
              type={type}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="bg-transparent w-full focus:outline-none text-sm"
              autoFocus
            />
          ) : (
            <span className={type === "password" ? "tracking-widest text-muted-foreground" : ""}>
              {type === "password" ? "••••••••••••••••" : current}
            </span>
          )}
        </div>
        {/* Icône action */}
        <div className="relative z-10 flex items-center gap-1 pr-2">
          {editing ? (
            <>
              <button onClick={() => { setCurrent(draft); setEditing(false); }}
                className="p-1 rounded-lg bg-accent/20 hover:bg-accent/40 transition-colors">
                <Check size={13} className="text-accent" />
              </button>
              <button onClick={() => { setDraft(current); setEditing(false); }}
                className="p-1 rounded-lg hover:bg-red-50 transition-colors">
                <X size={13} className="text-red-400" />
              </button>
            </>
          ) : (
            <button onClick={() => setEditing(true)}
              className="p-1.5 rounded-lg hover:bg-accent/20 transition-colors">
              <Pencil size={13} className="text-primary" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Bouton action ─────────────────────────────────────────────────── */
function ActionButton({
  icon: Icon, label, href, danger, iconColor,
}: {
  icon: React.ElementType; label: string; href?: string;
  danger?: boolean; iconColor?: string;
}) {
  const cls = `flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
    danger ? "hover:bg-red-50 text-foreground" : "hover:bg-accent/10 text-foreground"
  }`;
  const inner = (
    <>
      <Icon size={16} className={iconColor ?? (danger ? "text-red-500" : "text-accent")} />
      <span className={danger ? "text-red-500" : ""}>{label}</span>
    </>
  );
  return href ? (
    <Link href={href} className={cls}>{inner}</Link>
  ) : (
    <button className={cls}>{inner}</button>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────── */
export default function ProfilPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fond */}
      <Image src="/images/bg-hero.png" alt="" fill className="object-cover fixed -z-10" aria-hidden />
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Image src="/images/pattern-hero.png" alt="" fill className="object-cover opacity-15" aria-hidden />
      </div>

      {/* Bulle verte déco */}
      <div className="absolute top-8 right-8 z-10 animate-bounce hidden sm:block" style={{ animationDuration: "3.5s" }}>
        <Image src="/images/profil-bubble-green.png" alt="" width={60} height={60} />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {/* Carte profil */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg">
          <Image src="/images/profil-card-bg.png" alt="" fill className="object-cover" aria-hidden />

          <div className="relative z-10 p-6 sm:p-8">

            {/* Avatar + nom */}
            <div className="flex flex-col items-center gap-2 mb-8">
              <div className="relative w-24 h-24">
                {/* Cercle vert */}
                <div className="absolute inset-0 rounded-full border-4 border-accent" />
                <Image
                  src="/images/profil-avatar.png"
                  alt="Franck KAKPO"
                  fill
                  className="rounded-full object-cover p-0.5"
                />
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-primary">Franck KAKPO</p>
                <p className="text-sm text-muted-foreground">Étudiant</p>
              </div>
            </div>

            {/* Corps de la carte : champs + actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

              {/* Champs éditables */}
              <div className="flex flex-col gap-4">
                <ProfileField label="Email"          value="franckkakpo@gmail.com" type="email" />
                <ProfileField label="Nom et prénoms" value="Franck KAKPO" />
                <ProfileField label="Mot de passe"   value="password123" type="password" />
                <ProfileField label="Titre"          value="franckkakpo@gmail.com" />
              </div>

              {/* Actions rapides */}
              <div className="flex flex-col gap-1">
                <ActionButton icon={LayoutDashboard} label="Mon tableau de bord"    href="/tableau-de-bord" iconColor="text-accent" />
                <ActionButton icon={History}          label="Historique de formation" href="/tableau-de-bord" iconColor="text-accent" />
                <ActionButton icon={Settings}         label="Paramètres"              iconColor="text-accent" />

                {/* Séparateur */}
                <div className="my-2 border-t border-border/40" />

                <ActionButton icon={LogOut}  label="Se déconnecter"   danger />
                <ActionButton icon={Trash2}  label="Supprimer le compte" danger />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
