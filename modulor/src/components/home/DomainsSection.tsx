"use client";

import Image from "next/image";
import { motion } from "motion/react";

const DOMAINS = [
  {
    icon: "/images/illu-etudes.png",
    title: "Études",
    description: "Accédez à des formations académiques rigoureuses pour renforcer vos bases théoriques et préparer vos projets professionnels.",
  },
  {
    icon: "/images/illu-digital.png",
    title: "Digital",
    description: "Maîtrisez les outils numériques essentiels et développez des compétences adaptées aux exigences du monde digital.",
  },
  {
    icon: "/images/illu-pedagogie.png",
    title: "Pédagogie",
    description: "Explorez des méthodes d'enseignement innovantes pour transmettre le savoir avec efficacité et créativité.",
  },
];

export function DomainsSection() {
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

        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Nos domaines de compétences
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Nous vous présentons brièvement les domaines importants dans lesquels nous apportons nos compétences
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {DOMAINS.map((domain) => (
            <motion.div key={domain.title} className="relative rounded-2xl overflow-hidden p-8 flex flex-col items-center text-center gap-4 hover:shadow-md transition-shadow" variants={cardVariants}>
              {/* Fond dégradé mint→jaune */}
              <Image src="/images/bg-card-domaine.png" alt="" fill className="object-cover" aria-hidden />
              {/* Contenu */}
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-16 h-16 flex items-center justify-center">
                  <Image src={domain.icon} alt={domain.title} width={56} height={56} className="object-contain" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{domain.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{domain.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 border-t border-border" />
      </div>
    </motion.section>
  );
}
