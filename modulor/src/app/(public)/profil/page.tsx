"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, History, Settings,
  LogOut, Trash2, Pencil, X, Check, Loader2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/store/authStore";

/* ─── Champ éditable ────────────────────────────────────────────────── */
function ProfileField({ label, value, type = "text", onSave }: {
  label: string; value: string; type?: string;
  onSave?: (val: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft,   setDraft]   = useState(value);

  useEffect(() => { setDraft(value); }, [value]);

  function save() {
    onSave?.(draft);
    setEditing(false);
  }

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground font-semibold">{label}</span>
      <div className="relative flex items-center rounded-xl overflow-hidden"
        style={{ background: "linear-gradient(to right, #eaf4ff, #f0faff)" }}>
        <div className="flex-1 px-3 py-2.5 text-sm font-semibold text-foreground">
          {editing ? (
            <input type={type} value={draft} onChange={(e) => setDraft(e.target.value)}
              className="bg-transparent w-full focus:outline-none text-sm" autoFocus />
          ) : (
            <span className={type === "password" ? "tracking-widest text-muted-foreground" : ""}>
              {type === "password" ? "••••••••••••••••" : value}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 pr-2">
          {editing ? (
            <>
              <button onClick={save}
                className="p-1 rounded-lg bg-accent/20 hover:bg-accent/40 transition-colors">
                <Check size={13} className="text-accent" />
              </button>
              <button onClick={() => { setDraft(value); setEditing(false); }}
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
function ActionButton({ icon: Icon, label, href, onClick, danger, iconColor }: {
  icon: React.ElementType; label: string; href?: string; onClick?: () => void;
  danger?: boolean; iconColor?: string;
}) {
  const cls = `flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
    danger ? "hover:bg-red-50" : "hover:bg-accent/10"
  }`;
  const inner = (
    <>
      <Icon size={16} className={iconColor ?? (danger ? "text-red-500" : "text-accent")} />
      <span className={danger ? "text-red-500" : "text-foreground"}>{label}</span>
    </>
  );
  if (href) return <Link href={href} className={cls}>{inner}</Link>;
  return <button onClick={onClick} className={cls}>{inner}</button>;
}

/* ─── Page ──────────────────────────────────────────────────────────── */
export default function ProfilPage() {
  const router  = useRouter();
  const { logout } = useAuthStore();

  const [loading,  setLoading]  = useState(true);
  const [nom,      setNom]      = useState("");
  const [email,    setEmail]    = useState("");
  const [role,     setRole]     = useState("Étudiant");
  const [avatar,   setAvatar]   = useState("/images/profil-avatar.png");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) { router.push("/connexion"); return; }

      const meta = data.user.user_metadata;
      setEmail(data.user.email ?? "");

      /* Cherche le profil dans la table profiles */
      const { data: profile } = await supabase
        .from("profiles")
        .select("nom, role")
        .eq("id", data.user.id)
        .single();

      setNom(profile?.nom ?? meta?.nom ?? "Utilisateur");
      const roleMap: Record<string, string> = {
        etudiant:  "Étudiant",
        formateur: "Formateur",
        cadre:     "Cadre éducatif",
        autre:     "Autre",
        admin:     "Administrateur",
      };
      setRole(roleMap[profile?.role ?? meta?.role ?? "etudiant"] ?? "Étudiant");
      setLoading(false);
    });
  }, [router]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    logout();
    router.push("/");
    router.refresh();
  }

  async function handleDeleteAccount() {
    if (!confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")) return;
    const supabase = createClient();
    await supabase.auth.signOut();
    logout();
    router.push("/");
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Image src="/images/bg-hero.png" alt="" fill className="object-cover fixed -z-10" aria-hidden />
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Image src="/images/pattern-hero.png" alt="" fill className="object-cover opacity-15" aria-hidden />
      </div>

      <div className="absolute top-8 right-8 z-10 animate-bounce hidden sm:block" style={{ animationDuration: "3.5s" }}>
        <Image src="/images/profil-bubble-green.png" alt="" width={60} height={60} />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="relative rounded-3xl overflow-hidden shadow-lg">
          <Image src="/images/profil-card-bg.png" alt="" fill className="object-cover" aria-hidden />

          <div className="relative z-10 p-6 sm:p-8">

            {/* Avatar + nom réel */}
            <div className="flex flex-col items-center gap-2 mb-8">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full border-4 border-accent" />
                <Image src={avatar} alt={nom} fill className="rounded-full object-cover p-0.5" />
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-primary">{nom || email}</p>
                <p className="text-sm text-muted-foreground">{role}</p>
              </div>
            </div>

            {/* Champs + actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

              {/* Champs éditables avec vraies données */}
              <div className="flex flex-col gap-4">
                <ProfileField label="Email"          value={email} type="email" />
                <ProfileField label="Nom et prénoms" value={nom}
                  onSave={async (val) => {
                    setNom(val);
                    const supabase = createClient();
                    const { data } = await supabase.auth.getUser();
                    if (data.user) {
                      await supabase.from("profiles").update({ nom: val }).eq("id", data.user.id);
                    }
                  }} />
                <ProfileField label="Mot de passe"   value="password" type="password" />
                <ProfileField label="Titre / Rôle"   value={role} />
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-1">
                <ActionButton icon={LayoutDashboard} label="Mon tableau de bord"    href="/tableau-de-bord" iconColor="text-accent" />
                <ActionButton icon={History}          label="Historique de formation" href="/tableau-de-bord" iconColor="text-accent" />
                <ActionButton icon={Settings}         label="Paramètres"              iconColor="text-accent" />
                <div className="my-2 border-t border-border/40" />
                <ActionButton icon={LogOut}  label="Se déconnecter"    danger onClick={handleLogout} />
                <ActionButton icon={Trash2}  label="Supprimer le compte" danger onClick={handleDeleteAccount} />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
