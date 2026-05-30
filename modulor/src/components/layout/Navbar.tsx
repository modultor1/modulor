"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, Menu, X, LogOut, User, ChevronDown, LayoutDashboard, Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { createClient } from "@/lib/supabase/client";
import { useScroll } from "@/components/ui/use-scroll";
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
  const scrolled = useScroll(10);
  const [open,          setOpen]          = useState(false);
  const [dropOpen,      setDropOpen]      = useState(false);
  const [authUser,      setAuthUser]      = useState<SupabaseUser | null>(null);
  const [userName,      setUserName]      = useState("");
  const [loadingAuth,   setLoadingAuth]   = useState(true);
  const [searchQuery,   setSearchQuery]   = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearch,    setShowSearch]    = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const count    = useCartStore((s) => s.count());
  const { logout } = useAuthStore();

  /* Scroll lock when mobile menu open */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowSearch(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  /* Debounced search */
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const res = await fetch(`/api/formations/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        setSearchResults(data.formations?.slice(0, 5) || []);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setSearchLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

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
    <header
      className={cn(
        "sticky z-50 mx-auto w-full border-b border-transparent md:rounded-md md:border md:transition-all md:ease-out",
        {
          "bg-white/95 supports-[backdrop-filter]:bg-white/50 border-border backdrop-blur-lg md:top-4 md:max-w-4xl md:shadow-lg":
            scrolled && !open,
          "bg-white/90 md:bg-white/90": !scrolled || open,
          "top-0 md:max-w-7xl": !scrolled,
        }
      )}
    >
      <div className={cn("mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between gap-4 transition-all md:ease-out", {
        "md:px-2": scrolled,
      })}>

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

        {/* Recherche */}
        <div ref={searchRef} className="hidden lg:flex items-center relative">
          {showSearch ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted">
              <Search size={16} className="text-muted-foreground" />
              <input
                type="text"
                placeholder="Chercher une formation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setShowSearch(false);
                  if (e.key === "Enter" && searchResults.length > 0) {
                    router.push(`/formations/${searchResults[0].id}`);
                    setShowSearch(false);
                  }
                }}
                autoFocus
                className="bg-transparent text-sm outline-none w-40 text-foreground placeholder:text-muted-foreground"
              />
              <button onClick={() => { setShowSearch(false); setSearchQuery(""); }} className="hover:text-foreground text-muted-foreground">
                <X size={14} />
              </button>

              {searchQuery && (
                <div className="absolute top-full left-0 mt-2 w-full min-w-80 rounded-2xl bg-white border border-border shadow-xl z-50 max-h-80 overflow-y-auto">
                  {searchLoading ? (
                    <div className="px-4 py-8 text-center text-sm text-muted-foreground">Recherche...</div>
                  ) : searchResults.length === 0 ? (
                    <div className="px-4 py-8 text-center text-sm text-muted-foreground">Aucun résultat</div>
                  ) : (
                    searchResults.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => {
                          router.push(`/formations/${f.id}`);
                          setShowSearch(false);
                          setSearchQuery("");
                        }}
                        className="flex items-center gap-3 w-full px-4 py-3 hover:bg-muted border-b border-border/30 transition-colors text-left last:border-0"
                      >
                        <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0 bg-muted">
                          <Image src={f.image || "/images/default-course.png"} alt={f.titre} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-foreground truncate">{f.titre}</p>
                          <p className="text-xs text-muted-foreground truncate">{f.domaine}</p>
                        </div>
                        <p className="text-xs font-bold text-primary whitespace-nowrap">{f.prix.toLocaleString()} FCFA</p>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => setShowSearch(true)} className="p-1.5 hover:text-primary transition-colors">
              <Search size={18} className="text-foreground" />
            </button>
          )}
        </div>

        {/* Profil button — right side */}
        <div className="hidden lg:flex items-center">
          <Link href="/profil">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-bold text-white text-sm cursor-pointer"
              style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
              <User size={16} />
              Profil
            </div>
          </Link>
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
