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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo bleu */}
        <Link href="/" className="flex items-center">
          <Image src="/images/logo-bleu.png" alt="Modulor" width={120} height={32} className="object-contain" priority />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-bold transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions droite */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Panier */}
          <Link href="/panier" className="relative p-2">
            <ShoppingCart size={20} className="text-foreground" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>

          {/* Bouton Profil avec shape dégradé bleu→vert */}
          {isAuthenticated ? (
            <Link href="/profil">
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-bold text-white text-sm cursor-pointer"
                style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
                Profil
              </span>
            </Link>
          ) : (
            <Link href="/connexion">
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-bold text-white text-sm cursor-pointer"
                style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
                Se connecter
              </span>
            </Link>
          )}
        </div>

        {/* Burger mobile */}
        <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="lg:hidden border-t border-border bg-white px-4 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "text-sm font-bold py-2 transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-border">
            <Link href={isAuthenticated ? "/profil" : "/connexion"} onClick={() => setOpen(false)}>
              <span className="w-full inline-flex justify-center items-center px-5 py-2.5 rounded-full font-bold text-white text-sm cursor-pointer"
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
