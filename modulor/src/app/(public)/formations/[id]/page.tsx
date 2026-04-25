"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, ChevronRight, CheckCircle2, Star } from "lucide-react";
import { formatCFA } from "@/lib/utils";

/* ─── Données mock ──────────────────────────────────────────────────── */
const FORMATION = {
  id: "1",
  titre: "Développement Site web",
  domaine: "Développement web",
  niveau: "Facile",
  note: 4.5,
  nbAvis: 86,
  image: "/images/formation-1.png",
  prixUnitaire: 15500,
  description: `Le développement web est le processus de création et de maintenance de sites et d'applications web. Il englobe la conception de l'interface utilisateur (front-end), la gestion des serveurs et des bases de données (back-end), ainsi que les aspects techniques qui permettent à un site de fonctionner correctement sur internet.`,
  objectifs: [
    "Comprendre les fondamentaux du HTML, CSS et JavaScript",
    "Créer des interfaces responsives et accessibles",
    "Maîtriser les bases du développement back-end",
    "Déployer un site web complet sur un serveur",
  ],
  programme: [
    { titre: "Module 1 — Introduction au web",             desc: "Histoire du web, protocoles HTTP/HTTPS, navigateurs." },
    { titre: "Module 2 — HTML & CSS",                      desc: "Structure des pages, mise en forme, Flexbox, Grid." },
    { titre: "Module 3 — JavaScript",                      desc: "Variables, fonctions, DOM, événements, fetch API." },
    { titre: "Module 4 — Frameworks front-end",            desc: "Introduction à React, composants, état, props." },
    { titre: "Module 5 — Back-end & base de données",      desc: "Node.js, Express, SQL/NoSQL, authentification." },
    { titre: "Module 6 — Déploiement & bonnes pratiques",  desc: "Hébergement, CI/CD, performance, sécurité." },
  ],
  formateurs: [
    { nom: "Jean AHOHO",     photo: "/images/formations-teacher-1.png" },
    { nom: "Marie DOSSOU",   photo: "/images/formations-teacher-2.png" },
    { nom: "Kofi MENSAH",    photo: "/images/formations-teacher-3.png" },
  ],
  avis: [
    { nom: "Francis KAKPO", role: "Étudiant", photo: "/images/testimonial-francis.png",
      texte: "Excellente formation, très bien structurée et les exercices pratiques sont très utiles." },
    { nom: "France MARIO",  role: "Étudiant", photo: "/images/testimonial-france.png",
      texte: "J'ai beaucoup appris. Les formateurs sont disponibles et pédagogues. Je recommande !" },
  ],
};

/* ─── Stars ─────────────────────────────────────────────────────────── */
function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size}
          className={i < Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"} />
      ))}
      <span className="ml-1 text-sm font-bold text-muted-foreground">{rating.toFixed(1)}</span>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────── */
export default function FormationDetailPage() {
  const f = FORMATION;

  return (
    <div className="bg-white">
      {/* Hero image */}
      <div className="relative w-full h-56 sm:h-72 md:h-96 overflow-hidden">
        <Image src={f.image} alt={f.titre} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-primary text-white text-xs font-bold">{f.domaine}</span>
            <span className="px-3 py-1 rounded-full bg-accent text-dark-green text-xs font-bold">{f.niveau}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">{f.titre}</h1>
          <div className="mt-2 flex items-center gap-3">
            <Stars rating={f.note} size={14} />
            <span className="text-xs text-white/80">{f.nbAvis} avis</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-10">

        {/* Description */}
        <section>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{f.description}</p>
        </section>

        {/* Objectifs pédagogiques */}
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-foreground border-l-4 border-primary pl-3">
            Objectifs pédagogiques
          </h2>
          <ul className="flex flex-col gap-2">
            {f.objectifs.map((obj, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" />
                {obj}
              </li>
            ))}
          </ul>
        </section>

        {/* Programme */}
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-foreground border-l-4 border-primary pl-3">
            Programme
          </h2>
          <div className="flex flex-col gap-3">
            {f.programme.map((mod, i) => (
              <div key={i} className="rounded-xl border border-border p-4 hover:border-primary/40 transition-colors">
                <p className="text-sm font-bold text-foreground">{mod.titre}</p>
                <p className="text-xs text-muted-foreground mt-1">{mod.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Formateurs */}
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-foreground border-l-4 border-primary pl-3">
            Formateurs
          </h2>
          <div className="flex flex-wrap gap-4">
            {f.formateurs.map((form) => (
              <div key={form.nom} className="flex flex-col items-center gap-2">
                <Image src={form.photo} alt={form.nom} width={72} height={72}
                  className="rounded-full object-cover w-18 h-18 border-2 border-accent" />
                <span className="text-xs font-bold text-foreground text-center">{form.nom}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Avis utilisateurs */}
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-foreground border-l-4 border-primary pl-3">
            Avis et notes des utilisateurs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {f.avis.map((a) => (
              <div key={a.nom} className="rounded-2xl border border-border p-4 flex flex-col gap-3">
                <Image src="/images/icone-citation.png" alt="" width={32} height={24} />
                <p className="text-sm text-muted-foreground leading-relaxed">{a.texte}</p>
                <div className="flex items-center gap-3 mt-auto">
                  <Image src={a.photo} alt={a.nom} width={40} height={40}
                    className="rounded-full object-cover w-10 h-10" />
                  <div>
                    <p className="text-sm font-bold text-foreground">{a.nom}</p>
                    <p className="text-xs text-muted-foreground">{a.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Options d'achat */}
        <section className="rounded-2xl border border-border p-6 flex flex-col gap-4 bg-muted/30">
          <h2 className="text-lg font-bold text-foreground">Options d&apos;achat</h2>
          <p className="text-sm text-muted-foreground">
            Prix unitaire :{" "}
            <span className="text-xl font-bold text-foreground">{formatCFA(f.prixUnitaire)}</span>
          </p>

          <div className="flex flex-col gap-3">
            {/* S'inscrire */}
            <button className="w-full py-3.5 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
              S&apos;inscrire
            </button>

            {/* Ajouter au panier */}
            <button className="w-full py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity bg-primary">
              <ShoppingCart size={16} />
              Ajouter au panier
            </button>

            {/* Acheter maintenant */}
            <button className="w-full py-3.5 rounded-xl font-bold text-dark-green text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              style={{ background: "#57f27d" }}>
              Acheter maintenant
              <ChevronRight size={16} />
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
