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
                  Accéder maintenant
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </Link>
            </div>
          </div>

          {/* Images — masquées sur mobile petit, visibles à partir de md */}
          <div className="relative hidden md:flex justify-center lg:justify-end items-end">
            <Image src="/images/bubble-blue-light.png" alt="" width={65} height={65}
              className="absolute top-6 right-10 z-20 animate-bounce" style={{ animationDuration: "3s" }} />
            <Image src="/images/bubble-blue-dark.png" alt="" width={52} height={52}
              className="absolute top-1/2 left-2 z-20 animate-bounce" style={{ animationDuration: "4s", animationDelay: "1s" }} />
            <Image src="/images/bubble-green.png" alt="" width={48} height={48}
              className="absolute top-1/3 right-2 z-20 animate-bounce" style={{ animationDuration: "3.5s", animationDelay: "0.5s" }} />
            <div className="relative z-10 drop-shadow-xl">
              <Image src="/images/hero-girl.png" alt="Étudiante Modulor" width={260} height={420}
                className="object-contain object-bottom" style={{ height: 420, width: 260 }} priority />
            </div>
            <div className="relative z-10 drop-shadow-xl -ml-8">
              <Image src="/images/hero-boy.png" alt="Étudiant Modulor" width={220} height={380}
                className="object-contain object-bottom" style={{ height: 380, width: 220 }} priority />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
