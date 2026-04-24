import Image from "next/image";

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
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Nos domaines de compétences
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Découvrez nos filières pensées pour répondre aux besoins des apprenants et des professionnels d'aujourd'hui.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DOMAINS.map((domain) => (
            <div key={domain.title} className="relative rounded-2xl overflow-hidden p-8 flex flex-col items-center text-center gap-4 hover:shadow-md transition-shadow">
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
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border" />
      </div>
    </section>
  );
}
