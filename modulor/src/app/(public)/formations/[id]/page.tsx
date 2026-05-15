"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ShoppingCart, ChevronRight, CheckCircle2, Star, Loader2, BookOpen } from "lucide-react";
import { formatCFA } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

/* ─── Types ──────────────────────────────────────────────────────────── */
interface Module { titre: string; desc: string; }
interface Formation {
  id: string;
  titre: string;
  domaine: string;
  niveau: string;
  note: number;
  nb_avis: number;
  image: string;
  prix: number;
  description: string;
  duree?: string;
  formateur?: string;
  /* données JSON stockées dans Supabase (colonne JSONB ou fallback mock) */
  objectifs?: string[];
  programme?: Module[];
  formateurs?: { nom: string; photo: string }[];
  avis?: { nom: string; role: string; photo: string; texte: string }[];
}

/* ─── Données de fallback (si la formation DB n'a pas encore ces champs) */
const FALLBACK: Partial<Formation> = {
  objectifs: [
    "Comprendre les fondamentaux du domaine",
    "Appliquer les connaissances via des exercices pratiques",
    "Réaliser un projet complet de A à Z",
    "Obtenir votre certificat Modulor",
  ],
  programme: [
    { titre: "Module 1 — Introduction",         desc: "Présentation du domaine, outils et environnement de travail." },
    { titre: "Module 2 — Bases fondamentales",   desc: "Concepts essentiels et premières applications pratiques." },
    { titre: "Module 3 — Approfondissement",     desc: "Techniques avancées et cas d'usage réels." },
    { titre: "Module 4 — Projet fil rouge",      desc: "Réalisation d'un projet complet encadré par les formateurs." },
    { titre: "Module 5 — Certification",         desc: "Évaluation finale et délivrance du certificat Modulor." },
  ],
  formateurs: [
    { nom: "Jean AHOHO",   photo: "/images/formations-teacher-1.png" },
    { nom: "Marie DOSSOU", photo: "/images/formations-teacher-2.png" },
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
  const { id }   = useParams<{ id: string }>();
  const router   = useRouter();

  const [formation,   setFormation]   = useState<Formation | null>(null);
  const [videos,      setVideos]      = useState<any[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [isLoggedIn,  setIsLoggedIn]  = useState(false);
  const [isEnrolled,  setIsEnrolled]  = useState(false);
  const [inCart,      setInCart]      = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [buyLoading,  setBuyLoading]  = useState(false);
  const [feedback,    setFeedback]    = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();

      /* Charger la formation et ses vidéos */
      try {
        const [formRes, vidRes] = await Promise.all([
          fetch(`/api/formations/${id}`),
          fetch(`/api/videos?formationId=${id}`),
        ]);
        const formData = await formRes.json();
        const vidData = await vidRes.json();

        if (formData.formation) {
          setFormation({ ...FALLBACK, ...formData.formation });
        } else {
          setFormation(null);
        }

        if (vidData.videos) {
          setVideos(vidData.videos);
        }
      } catch (error) {
        console.error("Error loading formation:", error);
        setFormation(null);
      }

      /* Vérifier la session */
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setIsLoggedIn(true);

        /* Enrôlement existant ? */
        const { data: enrollment } = await supabase
          .from("enrollments")
          .select("id")
          .eq("user_id", user.id)
          .eq("formation_id", id)
          .single();
        setIsEnrolled(!!enrollment);

        /* Dans le panier ? */
        const { data: cartItem } = await supabase
          .from("cart_items")
          .select("id")
          .eq("user_id", user.id)
          .eq("formation_id", id)
          .single();
        setInCart(!!cartItem);
      }

      setLoading(false);
    }
    load();
  }, [id]);

  async function addToCart() {
    if (!isLoggedIn) { router.push(`/connexion?redirect=/formations/${id}`); return; }
    setCartLoading(true);
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formationId: id }),
    });
    if (res.ok) {
      setInCart(true);
      setFeedback("Formation ajoutée au panier !");
    } else {
      const data = await res.json();
      setFeedback(data.error ?? "Erreur");
    }
    setCartLoading(false);
    setTimeout(() => setFeedback(null), 3000);
  }

  async function buyNow() {
    if (!isLoggedIn) { router.push(`/connexion?redirect=/formations/${id}`); return; }
    setBuyLoading(true);
    const res = await fetch("/api/fedapay/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formationIds: [id], type: "direct" }),
    });
    const data = await res.json();
    setBuyLoading(false);
    if (data.paymentUrl) {
      router.push(data.paymentUrl);
    } else {
      setFeedback(data.error ?? "Erreur lors du paiement");
      setTimeout(() => setFeedback(null), 4000);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 size={36} className="text-primary animate-spin" />
      </div>
    );
  }

  if (!formation) return null;

  const f = formation;
  const objectifs  = f.objectifs  ?? FALLBACK.objectifs!;

  // Use real videos as programme if available, otherwise fallback
  const programme = videos.length > 0
    ? videos.map(v => ({ titre: v.titre, desc: v.description || "" }))
    : FALLBACK.programme!;

  const formateurs = f.formateurs ?? FALLBACK.formateurs!;
  const avis       = f.avis       ?? FALLBACK.avis!;

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
            <span className="text-xs text-white/80">{f.nb_avis} avis</span>
            {f.duree && <span className="text-xs text-white/80">· {f.duree}</span>}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-10">

        {/* Feedback message */}
        {feedback && (
          <div className="rounded-xl bg-accent/10 border border-accent/30 px-4 py-3 text-sm text-dark-green text-center font-semibold">
            {feedback}
          </div>
        )}

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
            {objectifs.map((obj, i) => (
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
            {programme.map((mod, i) => (
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
            Formateur
          </h2>
          {f.teacher_name ? (
            <div className="flex items-center gap-4 rounded-xl border border-border p-4 bg-muted/30">
              {f.teacher_photo && (
                <Image src={f.teacher_photo} alt={f.teacher_name} width={72} height={72}
                  className="rounded-full object-cover w-[72px] h-[72px] border-2 border-accent flex-shrink-0" />
              )}
              <div>
                <p className="text-sm font-bold text-foreground">{f.teacher_name}</p>
                <p className="text-xs text-muted-foreground mt-1">Créateur de cette formation</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-4">
              {formateurs.map((form) => (
                <div key={form.nom} className="flex flex-col items-center gap-2">
                  <Image src={form.photo} alt={form.nom} width={72} height={72}
                    className="rounded-full object-cover w-[72px] h-[72px] border-2 border-accent" />
                  <span className="text-xs font-bold text-foreground text-center">{form.nom}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Avis */}
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-foreground border-l-4 border-primary pl-3">
            Avis et notes des utilisateurs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {avis.map((a) => (
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
            <span className="text-xl font-bold text-foreground">{formatCFA(f.prix)}</span>
          </p>

          {isEnrolled ? (
            /* Déjà enrôlé */
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 rounded-xl bg-accent/20 border border-accent/30 px-4 py-3">
                <CheckCircle2 size={18} className="text-accent" />
                <span className="text-sm font-bold text-dark-green">Vous êtes déjà inscrit à cette formation</span>
              </div>
              <Link href="/tableau-de-bord">
                <span className="w-full py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
                  style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
                  <BookOpen size={16} /> Accéder à ma formation
                </span>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {/* S'inscrire = achat direct */}
              <button onClick={buyNow} disabled={buyLoading}
                className="w-full py-3.5 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60"
                style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
                {buyLoading ? <Loader2 size={16} className="animate-spin" /> : null}
                S&apos;inscrire
              </button>

              {/* Ajouter au panier */}
              <button onClick={addToCart} disabled={cartLoading || inCart}
                className="w-full py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity bg-primary disabled:opacity-60">
                {cartLoading
                  ? <Loader2 size={16} className="animate-spin" />
                  : <ShoppingCart size={16} />}
                {inCart ? "Dans le panier" : "Ajouter au panier"}
              </button>

              {/* Acheter maintenant */}
              <button onClick={buyNow} disabled={buyLoading}
                className="w-full py-3.5 rounded-xl font-bold text-dark-green text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
                style={{ background: "#57f27d" }}>
                Acheter maintenant <ChevronRight size={16} />
              </button>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
