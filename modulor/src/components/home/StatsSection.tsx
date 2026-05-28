import Image from "next/image";
import CountUp from "@/components/ui/CountUp";

const STATS = [
  { to: 200, label: "Apprenants", suffix: "+" },
  { to: 10, label: "Achats", suffix: "K+" },
  { to: 15, label: "Formations", suffix: "+" },
  { to: 4.5, label: "avis utilisateurs", isStar: true },
];

export function StatsSection() {
  return (
    <section className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Carte blanche avec ombre */}
        <div className="relative rounded-2xl bg-white shadow-xl px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <div key={i} className="flex items-stretch">
                {/* Stat */}
                <div className="flex flex-col items-center text-center gap-1 px-4 py-2 flex-1">
                  <div className="flex items-center gap-1.5">
                    {stat.isStar && (
                      <Image src="/images/icone-etoile.png" alt="étoile" width={20} height={20} style={{ filter: "saturate(2) hue-rotate(-80deg) brightness(1.15)" }} />
                    )}
                    <div className="flex items-center gap-0">
                      <CountUp to={stat.to} className="text-3xl font-bold text-primary" />
                      {stat.suffix && <span className="text-3xl font-bold text-primary">{stat.suffix}</span>}
                    </div>
                  </div>
                  {stat.label && (
                    <span className="text-sm font-bold text-foreground">{stat.label}</span>
                  )}
                </div>

                {/* Séparateur vert vertical — sauf après le dernier */}
                {i < STATS.length - 1 && (
                  <div className="hidden md:flex items-center self-center">
                    <div className="w-0.5 h-10 bg-accent rounded-full" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
