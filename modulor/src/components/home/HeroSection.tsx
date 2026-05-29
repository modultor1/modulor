import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: 480 }}>
      <Image src="/images/bg-hero.png" alt="" fill className="object-cover" aria-hidden priority />
      <div className="absolute left-0 top-0 h-full w-[180px] pointer-events-none hidden lg:block">
        <Image src="/images/pattern-hero.png" alt="" fill className="object-cover opacity-60" aria-hidden />
      </div>
      <div className="absolute right-0 top-0 h-full w-[180px] pointer-events-none hidden lg:block">
        <Image src="/images/pattern-hero.png" alt="" fill className="object-cover opacity-60 [transform:scaleX(-1)]" aria-hidden />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center" style={{ minHeight: 480 }}>

          {/* Texte — pleine largeur sur mobile */}
          <div className="flex flex-col justify-center gap-3 py-10 lg:py-0 text-center lg:text-left">
            <p className="text-foreground text-lg md:text-2xl">Nous vous</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary leading-tight">
              Formons&nbsp;!
            </h1>
            <p className="text-foreground text-lg md:text-2xl">
              Nous donnons vie{" "}
              <span className="text-accent font-bold">à vos projets</span>
            </p>
            <div className="mt-3 flex justify-center lg:justify-start">
              <Link href="/formations">
                <span className="inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 rounded-full font-bold text-white text-sm sm:text-base cursor-pointer"
                  style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
                  Acheter maintenant
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </Link>
            </div>
          </div>

          {/* Images — masquées sur mobile petit, visibles à partir de md */}
          <div className="relative hidden md:flex justify-center lg:justify-end items-end">
            <Image src="/images/bubble-blue-light.png" alt="" width={125} height={125}
              className="absolute z-20" style={{ top: "10%", left: "60%", transform: "translateX(-60%)" }} />
            <Image src="/images/bubble-blue-dark.png" alt="" width={52} height={52}
              className="absolute z-20" style={{ bottom: "12%", right: "12%" }} />
            <Image src="/images/bubble-green.png" alt="" width={68} height={68}
              className="absolute z-20" style={{ top: "30%", left: "10%" }} />
            <div className="relative z-10 drop-shadow-xl h-full flex items-end" style={{ transform: "translateY(13px)" }}>
              <Image src="/images/Deux étudiants.png" alt="Étudiants Modulor" width={650} height={620}
                className="object-contain" priority />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
