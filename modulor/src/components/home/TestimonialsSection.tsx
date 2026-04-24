import Image from "next/image";

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
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Avis et notes des utilisateurs
          </h2>
          <Image src="/images/icone-etoile.png" alt="étoile" width={28} height={28} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.nom} className="relative rounded-2xl overflow-hidden p-6 flex flex-col gap-4 shadow-sm">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
