"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";

const NAV_LINKS = [
  { label: "Tableau de bord",    href: "/tableau-de-bord" },
  { label: "Formations",         href: "/formations" },
  { label: "Panier et paiement", href: "/panier" },
  { label: "Contact",            href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const count = useCartStore((s) => s.count());
  const { isAuthenticated } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">

        <Link href="/" className="flex items-center shrink-0">
          <Image src="/images/logo-bleu.png" alt="Modulor" width={90} height={24} className="object-contain" priority />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-5">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}
              className={cn("text-sm font-bold transition-colors hover:text-primary whitespace-nowrap",
                pathname === link.href ? "text-primary" : "text-foreground")}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/panier" className="relative p-2">
            <ShoppingCart size={18} className="text-foreground" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          <Link href={isAuthenticated ? "/profil" : "/connexion"}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-bold text-white text-sm cursor-pointer"
              style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
              {isAuthenticated ? "Profil" : "Se connecter"}
            </span>
          </Link>
        </div>

        <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Menu mobile — plein écran */}
      {open && (
        <div className="lg:hidden border-t border-border bg-white px-4 py-4 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
              className={cn("text-sm font-bold py-2.5 border-b border-border/50 transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-foreground")}>
              {link.label}
            </Link>
          ))}
          <div className="pt-2 flex gap-3">
            <Link href="/panier" onClick={() => setOpen(false)} className="flex items-center gap-2 text-sm text-foreground">
              <ShoppingCart size={16} /> Panier {count > 0 && `(${count})`}
            </Link>
            <Link href={isAuthenticated ? "/profil" : "/connexion"} onClick={() => setOpen(false)} className="ml-auto">
              <span className="inline-flex items-center px-4 py-2 rounded-full font-bold text-white text-sm cursor-pointer"
                style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
                {isAuthenticated ? "Profil" : "Se connecter"}
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
