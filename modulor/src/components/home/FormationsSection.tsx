import Image from "next/image";
import Link from "next/link";
import { StarRating } from "@/components/ui/StarRating";
import { formatCFA } from "@/lib/utils";

const FORMATIONS = [
  {
    id: "1",
    image: "/images/formation-1.png",
    domaine: "Développement web",
    titre: "Apprendre les bases du codage et la création des sites",
    note: 4.5,
    prix: 15000,
  },
  {
    id: "2",
    image: "/images/formation-2.png",
    domaine: "E-Commerce",
    titre: "Apprendre l'achat des produits digitaux et ventes",
    note: 4.5,
    prix: 15000,
  },
  {
    id: "3",
    image: "/images/formation-3.png",
    domaine: "Développement web",
    titre: "Apprendre les bases du codage et la création des sites",
    note: 4.5,
    prix: 15000,
  },
];

export function FormationsSection() {
  return (
    <section className="relative overflow-hidden py-16">
      {/* Fond vert clair */}
      <Image src="/images/bg-formations.png" alt="" fill className="object-cover" aria-hidden />
      {/* Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <Image src="/images/pattern-formations.png" alt="" fill className="object-cover opacity-40" aria-hidden />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* En-tête */}
        <div className="flex items-start justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Nos formations</h2>
            <p className="text-muted-foreground text-sm mt-1">Découvrez nos meilleures formations du moment</p>
          </div>
          <Link href="/formations" className="shrink-0">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-bold text-white text-sm cursor-pointer"
              style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
              Voir tout
            </span>
          </Link>
        </div>

        {/* Grid cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FORMATIONS.map((f) => (
            <div key={f.id} className="rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow group">
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <Image src={f.image} alt={f.titre} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>

              {/* Contenu */}
              <div className="p-4 flex flex-col gap-3">
                <span className="text-xs font-bold text-primary">{f.domaine}</span>
                <h3 className="text-sm font-bold text-foreground leading-snug line-clamp-2">{f.titre}</h3>
                <StarRating rating={f.note} size={13} />

                {/* Prix + bouton */}
                <div className="flex items-center justify-between mt-1">
                  <span className="text-base font-bold text-foreground">{formatCFA(f.prix)}</span>
                  <Link href={`/formations/${f.id}`}>
                    <span className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                      style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
                      <Image src="/images/icone-plus.png" alt="Acheter" width={14} height={14} />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
