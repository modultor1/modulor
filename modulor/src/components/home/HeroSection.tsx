import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#eef0fe] via-[#f4fef6] to-white min-h-[560px] flex items-center">
      {/* Décoration fond */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-primary/5 blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Texte gauche */}
          <div className="flex flex-col gap-5 z-10">
            <p className="text-foreground font-bold text-xl md:text-2xl">Nous vous</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary leading-tight">
              Formons&nbsp;!
            </h1>
            <p className="text-foreground font-bold text-xl md:text-2xl -mt-2">
              Nous donnons vie<br />
              <span className="text-foreground">à vos projets</span>
            </p>
            <div className="mt-2">
              <Link href="/formations">
                <Button size="lg">Commencer maintenant</Button>
              </Link>
            </div>
          </div>

          {/* Image droite + bulles */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Bulle bleue claire – en haut */}
            <Image
              src="/images/bubble-blue-light.png"
              alt=""
              width={80}
              height={80}
              className="absolute top-0 right-8 lg:right-16 z-20 animate-bounce"
              style={{ animationDuration: "3s" }}
            />
            {/* Bulle bleue foncée – en bas à gauche */}
            <Image
              src="/images/bubble-blue-dark.png"
              alt=""
              width={64}
              height={64}
              className="absolute bottom-8 left-0 lg:left-8 z-20 animate-bounce"
              style={{ animationDuration: "4s", animationDelay: "1s" }}
            />
            {/* Bulle verte – à droite */}
            <Image
              src="/images/bubble-green.png"
              alt=""
              width={56}
              height={56}
              className="absolute top-1/3 -right-2 z-20 animate-bounce"
              style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}
            />

            {/* Photo étudiant */}
            <div className="relative z-10">
              <Image
                src="/images/hero-girl.png"
                alt="Étudiante Modulor"
                width={420}
                height={500}
                className="object-contain drop-shadow-xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
