"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, Clock, CheckCircle2, ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

/* ─── Hero ──────────────────────────────────────────────────────────── */
function ContactHero() {
  return (
    <motion.section className="relative overflow-hidden w-full" style={{ minHeight: 280 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}>
      <Image src="/images/bg-hero.png" alt="" fill className="object-cover" aria-hidden priority />
      <div className="absolute inset-0 pointer-events-none">
        <Image src="/images/pattern-hero.png" alt="" fill className="object-cover opacity-40" aria-hidden />
      </div>

      {/* Bulles décoratives */}
      <motion.div className="absolute top-8 right-[12%] z-10 pointer-events-none"
        initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.8 }}>
      </motion.div>
      <motion.div className="absolute bottom-10 left-[8%] z-10 pointer-events-none"
        initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.95 }}>
      </motion.div>
      <motion.div className="absolute top-10 left-[22%] z-10 pointer-events-none hidden sm:block"
        initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 1.1 }}>
      </motion.div>

      <motion.div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full py-14 sm:py-16 gap-3"
        initial="hidden" animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }}>
        <motion.p style={{ fontFamily: "var(--font-tt-interphases)", fontWeight: 600, color: "#03251C" }} className="text-sm sm:text-base"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
          Une question ?
        </motion.p>
        <motion.h1 style={{ fontFamily: "var(--font-tt-interphases)", fontWeight: 700, fontSize: "clamp(34px, 7vw, 60px)", color: "#2934F2" }} className="leading-tight"
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
          Contactez-nous
        </motion.h1>
        <motion.p style={{ fontFamily: "var(--font-tt-interphases)", fontWeight: 500, color: "#21D34C" }} className="text-sm sm:text-base max-w-sm leading-snug"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
          Notre équipe vous répond dans les plus brefs délais
        </motion.p>
      </motion.div>
    </motion.section>
  );
}

/* ─── Carte info ─────────────────────────────────────────────────────── */
const INFOS: { Icon: React.ElementType; title: string; lines: string[]; color: string }[] = [
  { Icon: Mail,   color: "#2934f2", title: "Email",     lines: ["modulororg@gmail.com", "support@modulor.bj"] },
  { Icon: Phone,  color: "#57f27d", title: "Téléphone", lines: ["+229 01 XX XX XX XX", "WhatsApp disponible"] },
  { Icon: MapPin, color: "#ef4444", title: "Adresse",   lines: ["Cotonou, Bénin", "Quartier Cadjehoun"] },
  { Icon: Clock,  color: "#f59e0b", title: "Horaires",  lines: ["Lun – Ven : 8h00 – 18h00", "Sam : 9h00 – 13h00"] },
];

function InfoCard({ Icon, title, lines, color }: {
  Icon: React.ElementType; title: string; lines: string[]; color: string;
}) {
  return (
    <div className="relative rounded-2xl overflow-hidden p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
      <Image src="/images/db-card-active.png" alt="" fill className="object-cover" aria-hidden />
      <div className="relative z-10 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: color + "1a" }}>
          <Icon size={20} style={{ color }} />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-bold text-foreground">{title}</p>
          {lines.map((l, i) => (
            <p key={i} className="text-xs text-muted-foreground">{l}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Formulaire ─────────────────────────────────────────────────────── */
function ContactForm() {
  const [nom,     setNom]     = useState("");
  const [email,   setEmail]   = useState("");
  const [sujet,   setSujet]   = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent,    setSent]    = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: dbError } = await supabase.from("contact_messages").insert({
      nom, email, sujet, message,
    });

    setLoading(false);
    if (dbError) {
      setError("Une erreur est survenue. Veuillez réessayer.");
      return;
    }

    setSent(true);
    setNom(""); setEmail(""); setSujet(""); setMessage("");
  }

  const fieldCls = "w-full rounded-xl border-2 border-accent bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all";

  if (sent) {
    return (
      <motion.div className="flex flex-col items-center gap-4 py-12 text-center"
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
          <CheckCircle2 size={32} className="text-accent" />
        </div>
        <h3 className="text-lg font-bold text-foreground">Message envoyé !</h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Merci pour votre message. Notre équipe vous répondra dans les 24 heures.
        </p>
        <button onClick={() => setSent(false)}
          className="mt-2 text-sm text-primary font-bold hover:underline cursor-pointer">
          Envoyer un autre message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-foreground">Nom / Prénoms</label>
          <input required value={nom} onChange={(e) => setNom(e.target.value)}
            placeholder="Votre nom complet" className={fieldCls} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-foreground">Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com" className={fieldCls} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-foreground">Sujet</label>
        <select required value={sujet} onChange={(e) => setSujet(e.target.value)} className={fieldCls}>
          <option value="">Choisir un sujet...</option>
          <option value="Information sur une formation">Information sur une formation</option>
          <option value="Problème de paiement">Problème de paiement</option>
          <option value="Accès à mon compte">Accès à mon compte</option>
          <option value="Partenariat">Partenariat</option>
          <option value="Devenir formateur">Devenir formateur</option>
          <option value="Autre">Autre</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-foreground">Message</label>
        <textarea required rows={5} value={message} onChange={(e) => setMessage(e.target.value)}
          placeholder="Décrivez votre demande en détail..."
          className={fieldCls + " resize-none"} />
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 text-center">
          {error}
        </div>
      )}

      <button type="submit" disabled={loading}
        className="w-full sm:w-fit py-3 px-7 rounded-full font-bold text-white text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center gap-2 justify-center cursor-pointer"
        style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
        <Send size={16} />
        {loading ? "Envoi en cours..." : "Envoyer le message"}
      </button>
    </form>
  );
}

/* ─── FAQ ────────────────────────────────────────────────────────────── */
const FAQ = [
  { q: "Comment m'inscrire à une formation ?", r: "Créez votre compte, parcourez le catalogue et cliquez sur « Acheter maintenant » sur la formation de votre choix." },
  { q: "Quels moyens de paiement acceptez-vous ?", r: "Nous acceptons Mobile Money (MTN MoMo, Moov), les cartes VISA et Mastercard via FedaPay." },
  { q: "Puis-je accéder à mes formations hors ligne ?", r: "Les formations sont accessibles en ligne sur tous vos appareils. Le téléchargement hors ligne arrive bientôt." },
  { q: "Comment obtenir mon certificat ?", r: "Après avoir complété 100% d'une formation, votre certificat est généré automatiquement dans votre espace." },
  { q: "Puis-je devenir formateur sur Modulor ?", r: "Oui ! Contactez-nous via ce formulaire avec le sujet « Devenir formateur » et nous reviendrons vers vous." },
  { q: "Y a-t-il une période d'essai ?", r: "Certaines formations proposent du contenu gratuit en aperçu. Rendez-vous sur la page de la formation pour découvrir." },
];

/* ─── Page ──────────────────────────────────────────────────────────── */
export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <section className="bg-white py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* Infos de contact */}
          <motion.div className="flex flex-col gap-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}>
            <div>
              <h2 className="text-xl font-bold text-primary mb-1">Nos coordonnées</h2>
              <p className="text-sm text-muted-foreground">
                Nous sommes disponibles du lundi au vendredi, de 8h à 18h (GMT+1).
              </p>
            </div>

            <motion.div className="flex flex-col gap-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
              {INFOS.map((info) => (
                <motion.div key={info.title}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
                  <InfoCard {...info} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Formulaire */}
          <motion.div className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="relative rounded-2xl overflow-hidden p-6 sm:p-8">
              <Image src="/images/db-card-active.png" alt="" fill className="object-cover" aria-hidden />
              <div className="relative z-10">
                <h2 className="text-xl font-bold text-primary mb-1">Envoyer un message</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
                </p>
                <ContactForm />
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* FAQ rapide */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-bold text-primary mb-6 text-center">Questions fréquentes</h2>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
            {FAQ.map((item, i) => (
              <motion.div key={i} className="rounded-2xl border border-border bg-white p-4 flex flex-col gap-2 hover:shadow-md hover:border-primary/30 transition-all"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}>
                <p className="text-sm font-bold text-primary flex items-start gap-1.5">
                  <ChevronRight size={15} className="text-accent shrink-0 mt-0.5" />
                  {item.q}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed pl-[22px]">{item.r}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
