"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, Menu, X, LogOut, User, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const NAV_LINKS = [
  { label: "Tableau de bord",    href: "/tableau-de-bord" },
  { label: "Formations",         href: "/formations" },
  { label: "Panier et paiement", href: "/panier" },
  { label: "Contact",            href: "/contact" },
];

/* ─── Avatar initiales ──────────────────────────────────────────────── */
function UserAvatar({ name, size = 32 }: { name: string; size?: number }) {
  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  return (
    <div className="rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0"
      style={{ width: size, height: size, background: "linear-gradient(to right, #2934f2, #57f27d)", fontSize: size * 0.35 }}>
      {initials || "U"}
    </div>
  );
}

/* ─── Navbar ────────────────────────────────────────────────────────── */
export function Navbar() {
  const pathname = usePathname();
  const router   = useRouter();
  const [open,        setOpen]        = useState(false);
  const [dropOpen,    setDropOpen]    = useState(false);
  const [authUser,    setAuthUser]    = useState<SupabaseUser | null>(null);
  const [userName,    setUserName]    = useState("");
  const [loadingAuth, setLoadingAuth] = useState(true);
  const dropRef = useRef<HTMLDivElement>(null);

  const count    = useCartStore((s) => s.count());
  const { logout } = useAuthStore();

  /* Écoute les changements d'auth Supabase */
  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(async ({ data }) => {
      setAuthUser(data.user ?? null);
      if (data.user) {
        const meta = data.user.user_metadata;
        const name = meta?.nom || data.user.email?.split("@")[0] || "Utilisateur";
        setUserName(name);
      }
      setLoadingAuth(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_, session) => {
      setAuthUser(session?.user ?? null);
      if (session?.user) {
        const meta = session.user.user_metadata;
        setUserName(meta?.nom || session.user.email?.split("@")[0] || "Utilisateur");
      } else {
        setUserName("");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  /* Ferme le dropdown si clic en dehors */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    logout();
    setDropOpen(false);
    router.push("/");
    router.refresh();
  }

  const isLoggedIn = !!authUser;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between gap-4">

        <Link href="/" className="flex items-center shrink-0">
          <Image src="/images/logo-bleu.png" alt="Modulor" width={90} height={24} className="object-contain" priority />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-5 flex-1 justify-center">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}
              className={cn("text-sm font-bold transition-colors hover:text-primary whitespace-nowrap",
                pathname === link.href ? "text-primary" : "text-foreground")}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions droite */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Panier */}
          <Link href="/panier" className="relative p-1.5">
            <ShoppingCart size={18} className="text-foreground" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>

          {!loadingAuth && (
            isLoggedIn ? (
              /* Utilisateur connecté — dropdown */
              <div className="relative" ref={dropRef}>
                <button onClick={() => setDropOpen(!dropOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-muted transition-colors">
                  <UserAvatar name={userName} size={28} />
                  <span className="text-sm font-bold text-foreground max-w-[120px] truncate hidden xl:block">
                    {userName}
                  </span>
                  <ChevronDown size={14} className={cn("text-muted-foreground transition-transform", dropOpen && "rotate-180")} />
                </button>

                {dropOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl bg-white border border-border shadow-xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-xs font-bold text-foreground truncate">{userName}</p>
                      <p className="text-xs text-muted-foreground truncate">{authUser?.email}</p>
                    </div>
                    <Link href="/profil" onClick={() => setDropOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                      <User size={15} className="text-accent" /> Mon profil
                    </Link>
                    <Link href="/tableau-de-bord" onClick={() => setDropOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                      <Image src="/images/db-icon-dashboard.png" alt="" width={15} height={15} />
                      Tableau de bord
                    </Link>
                    <div className="border-t border-border mt-1 pt-1">
                      <button onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 w-full transition-colors">
                        <LogOut size={15} /> Se déconnecter
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Non connecté */
              <Link href="/connexion">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-bold text-white text-sm cursor-pointer"
                  style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
                  Se connecter
                </span>
              </Link>
            )
          )}
        </div>

        <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="lg:hidden border-t border-border bg-white px-4 py-4 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
              className={cn("text-sm font-bold py-2.5 border-b border-border/50 transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-foreground")}>
              {link.label}
            </Link>
          ))}
          <div className="pt-2 flex items-center justify-between">
            <Link href="/panier" onClick={() => setOpen(false)} className="flex items-center gap-2 text-sm text-foreground">
              <ShoppingCart size={16} /> Panier {count > 0 && `(${count})`}
            </Link>
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link href="/profil" onClick={() => setOpen(false)}>
                  <UserAvatar name={userName} size={30} />
                </Link>
                <button onClick={handleLogout} className="text-xs text-red-500 font-bold">
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link href="/connexion" onClick={() => setOpen(false)}>
                <span className="inline-flex items-center px-4 py-2 rounded-full font-bold text-white text-sm"
                  style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
                  Se connecter
                </span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
