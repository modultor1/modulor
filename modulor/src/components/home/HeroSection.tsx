import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[560px] flex items-center">

      {/* Fond vert très clair */}
      <Image src="/images/bg-hero.png" alt="" fill className="object-cover" aria-hidden priority />

      {/* Pattern gauche */}
      <div className="absolute left-0 top-0 h-full w-[220px] pointer-events-none hidden md:block">
        <Image src="/images/pattern-hero.png" alt="" fill className="object-cover opacity-60" aria-hidden />
      </div>

      {/* Pattern droit */}
      <div className="absolute right-0 top-0 h-full w-[220px] pointer-events-none hidden md:block">
        <Image src="/images/pattern-hero.png" alt="" fill className="object-cover opacity-60 scale-x-[-1]" aria-hidden />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* Texte gauche */}
          <div className="flex flex-col gap-3">
            <p className="text-foreground text-xl md:text-2xl">Nous vous</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary leading-tight">
              Formons&nbsp;!
            </h1>
            <p className="text-foreground text-xl md:text-2xl">
              Nous donnons vie{" "}
              <span className="text-accent font-bold">à vos projets</span>
            </p>

            {/* Bouton Acheter maintenant */}
            <div className="mt-4">
              <Link href="/formations">
                <span className="relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white text-base cursor-pointer select-none"
                  style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
                  Acheter maintenant
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          {/* Images : fille + garçon côte à côte */}
          <div className="relative flex justify-center lg:justify-end items-end">

            {/* Bulle bleue claire — en haut à droite */}
            <Image src="/images/bubble-blue-light.png" alt="" width={72} height={72}
              className="absolute -top-2 right-8 z-20 animate-bounce" style={{ animationDuration: "3s" }} />

            {/* Bulle bleue foncée — en bas à gauche */}
            <Image src="/images/bubble-blue-dark.png" alt="" width={58} height={58}
              className="absolute bottom-2 left-0 z-20 animate-bounce" style={{ animationDuration: "4s", animationDelay: "1s" }} />

            {/* Bulle verte — milieu droite */}
            <Image src="/images/bubble-green.png" alt="" width={52} height={52}
              className="absolute top-1/3 right-0 z-20 animate-bounce" style={{ animationDuration: "3.5s", animationDelay: "0.5s" }} />

            {/* Fille */}
            <div className="relative z-10 drop-shadow-xl">
              <Image src="/images/hero-girl.png" alt="Étudiante Modulor" width={250} height={370} className="object-contain" priority />
            </div>

            {/* Garçon — à côté, légèrement en retrait */}
            <div className="relative z-10 -ml-6 drop-shadow-xl">
              <Image src="/images/hero-boy.png" alt="Étudiant Modulor" width={210} height={310} className="object-contain" priority />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
