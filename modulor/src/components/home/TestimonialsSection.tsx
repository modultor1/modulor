"use client";

import Image from "next/image";
import { motion } from "motion/react";

const TESTIMONIALS = [
  {
    nom: "Francis KAKPO",
    role: "Étudiant",
    photo: "/images/testimonial-francis.png",
    texte: "Modulor a vraiment changé ma façon d'apprendre. Les cours sont clairs, bien structurés et les ateliers pratiques m'ont permis de mettre en application ce que j'ai appris.",
  },
  {
    nom: "France MARIO",
    role: "Étudiant",
    photo: "/images/testimonial-france.png",
    texte: "Je suis vraiment satisfait des formations proposées sur Modulor. La plateforme est intuitive et le contenu est de très grande qualité. Je recommande vivement.",
  },
];

export function TestimonialsSection() {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      className="bg-white py-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Avis et notes des utilisateurs
          </h2>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-white border border-border/20 shadow-sm hover:shadow-md transition-all text-foreground" aria-label="Précédent">
              <span className="text-base font-bold">‹</span>
            </button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-white border border-border/20 shadow-sm hover:shadow-md transition-all text-foreground" aria-label="Suivant">
              <span className="text-base font-bold">›</span>
            </button>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {TESTIMONIALS.map((t) => (
            <motion.div key={t.nom} className="relative rounded-2xl overflow-hidden p-6 flex flex-col gap-4 shadow-sm" variants={cardVariants}>
              {/* Fond dégradé mint→jaune */}
              <Image src="/images/bg-card-testimonial.png" alt="" fill className="object-cover" aria-hidden />

              {/* Contenu */}
              <div className="relative z-10 flex flex-col gap-4">
                <Image src="/images/icone-citation.png" alt="citation" width={36} height={28} />
                <p className="text-sm text-muted-foreground leading-relaxed">{t.texte}</p>
                <div className="flex items-center gap-3 mt-1">
                  <Image src={t.photo} alt={t.nom} width={44} height={44} className="rounded-full object-cover w-11 h-11" />
                  <div>
                    <p className="text-sm font-bold text-foreground">{t.nom}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
