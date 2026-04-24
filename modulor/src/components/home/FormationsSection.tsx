import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { formatCFA } from "@/lib/utils";

const FORMATIONS = [
  {
    id: "1",
    image: "/images/formation-1.png",
    domaine: "Développement web",
    titre: "Apprendre les bases du codages et la création des sites",
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
    titre: "Apprendre les bases du codages et la création des sites",
    note: 4.5,
    prix: 15000,
  },
];

export function FormationsSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="flex items-start justify-between mb-3 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Nos formations
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Découvrez nos meilleures formations du moment
            </p>
          </div>
          <Link href="/formations" className="shrink-0">
            <Button variant="secondary" size="sm">Voir tout</Button>
          </Link>
        </div>

        {/* Grid cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {FORMATIONS.map((f) => (
            <div
              key={f.id}
              className="rounded-2xl border border-border bg-white overflow-hidden hover:shadow-lg transition-shadow group"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={f.image}
                  alt={f.titre}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Contenu */}
              <div className="p-4 flex flex-col gap-3">
                <span className="text-xs font-bold text-primary">{f.domaine}</span>
                <h3 className="text-sm font-bold text-foreground leading-snug line-clamp-2">
                  {f.titre}
                </h3>
                <StarRating rating={f.note} size={13} />

                {/* Prix + bouton */}
                <div className="flex items-center justify-between mt-1">
                  <span className="text-base font-bold text-foreground">
                    {formatCFA(f.prix)}
                  </span>
                  <Link href={`/formations/${f.id}`}>
                    <button className="w-8 h-8 rounded-full bg-accent flex items-center justify-center hover:bg-accent-dark transition-colors">
                      <Image
                        src="/images/icone-plus.png"
                        alt="Acheter"
                        width={14}
                        height={14}
                      />
                    </button>
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
