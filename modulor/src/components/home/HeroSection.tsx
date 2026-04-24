import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: 480 }}>

      {/* Fond vert très clair */}
      <Image src="/images/bg-hero.png" alt="" fill className="object-cover" aria-hidden priority />

      {/* Pattern gauche */}
      <div className="absolute left-0 top-0 h-full w-[220px] pointer-events-none hidden md:block">
        <Image src="/images/pattern-hero.png" alt="" fill className="object-cover opacity-60" aria-hidden />
      </div>

      {/* Pattern droit */}
      <div className="absolute right-0 top-0 h-full w-[220px] pointer-events-none hidden md:block">
        <Image src="/images/pattern-hero.png" alt="" fill className="object-cover opacity-60 [transform:scaleX(-1)]" aria-hidden />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" style={{ minHeight: 480 }}>

          {/* Texte gauche */}
          <div className="flex flex-col justify-center gap-3 pt-6 pb-8">
            <p className="text-foreground text-xl md:text-2xl">Nous vous</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary leading-tight">
              Formons&nbsp;!
            </h1>
            <p className="text-foreground text-xl md:text-2xl">
              Nous donnons vie{" "}
              <span className="text-accent font-bold">à vos projets</span>
            </p>
            <div className="mt-3">
              <Link href="/formations">
                <span className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white text-base cursor-pointer select-none"
                  style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
                  Accéder maintenant
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          {/* Images — même taille, collées au bas */}
          <div className="relative hidden lg:flex justify-end items-end">

            {/* Bulle bleue claire */}
            <Image src="/images/bubble-blue-light.png" alt="" width={70} height={70}
              className="absolute top-6 right-10 z-20 animate-bounce" style={{ animationDuration: "3s" }} />

            {/* Bulle bleue foncée */}
            <Image src="/images/bubble-blue-dark.png" alt="" width={56} height={56}
              className="absolute top-1/2 left-2 z-20 animate-bounce" style={{ animationDuration: "4s", animationDelay: "1s" }} />

            {/* Bulle verte */}
            <Image src="/images/bubble-green.png" alt="" width={52} height={52}
              className="absolute top-1/3 right-2 z-20 animate-bounce" style={{ animationDuration: "3.5s", animationDelay: "0.5s" }} />

            {/* Fille */}
            <div className="relative z-10 drop-shadow-xl">
              <Image
                src="/images/hero-girl.png"
                alt="Étudiante Modulor"
                width={300}
                height={460}
                className="object-contain object-bottom"
                style={{ height: 460, width: 300 }}
                priority
              />
            </div>

            {/* Garçon — même taille */}
            <div className="relative z-10 drop-shadow-xl -ml-10">
              <Image
                src="/images/hero-boy.png"
                alt="Étudiant Modulor"
                width={300}
                height={460}
                className="object-contain object-bottom"
                style={{ height: 460, width: 300 }}
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
