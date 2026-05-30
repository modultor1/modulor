import { HeroSection } from "@/components/home/HeroSection";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <section className="relative overflow-hidden" style={{ minHeight: 480 }}>
        <div className="absolute inset-0 bg-gradient-to-b from-green-50 to-white" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-center justify-center" style={{ minHeight: 480 }}>
          <div className="text-center max-w-2xl">
            <h1 className="text-6xl md:text-7xl font-bold text-primary mb-4">404</h1>
            <p className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Page non trouvée
            </p>
            <p className="text-foreground text-lg md:text-xl mb-8">
              Désolé, la page que vous cherchez n'existe pas ou a été supprimée.
            </p>
            <Link href="/">
              <span className="inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 rounded-full font-bold text-white text-sm sm:text-base cursor-pointer"
                style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
                Retour à l'accueil
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
      <HeroSection />
    </>
  );
}
