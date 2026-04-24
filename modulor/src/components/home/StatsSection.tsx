import Image from "next/image";

const STATS = [
  { value: "200+", label: "Élèves",      sub: "inscrits sur la plateforme" },
  { value: "10K+", label: "Profils",     sub: "créés sur la plateforme" },
  { value: "15+",  label: "Formations",  sub: "disponibles sur la plateforme" },
  { value: "4,5",  label: "",            sub: "Note moyenne des utilisateurs", isStar: true },
];

export function StatsSection() {
  return (
    <section className="bg-white border-y border-border py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-border">
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center px-4 gap-1">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-primary">{stat.value}</span>
                {stat.isStar && (
                  <Image
                    src="/images/icone-etoile.png"
                    alt="étoile"
                    width={22}
                    height={22}
                  />
                )}
              </div>
              {stat.label && (
                <span className="text-sm font-bold text-foreground">{stat.label}</span>
              )}
              <span className="text-xs text-muted-foreground">{stat.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
