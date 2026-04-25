import Image from "next/image";
import Link from "next/link";

/* ─── Hero ─────────────────────────────────────────────────────────── */
function PresentationHero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Fond clair derrière l'homme */}
      <div className="absolute right-0 top-0 h-full w-1/2 pointer-events-none">
        <Image src="/images/pres-bg-man.png" alt="" fill className="object-cover" aria-hidden />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[540px]">

          {/* Texte gauche */}
          <div className="flex flex-col gap-5 py-16 z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              L&apos;école change.
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
              Et vous, êtes-vous prêt à{" "}
              <span className="text-primary">apprendre autrement ?</span>
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Modulor repense la formation pour les filières techniques et professionnelles.
              Des parcours flexibles, concrets et adaptés à votre rythme.
            </p>
            <div className="mt-2">
              <Link href="/formations">
                <span className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-bold text-white text-sm cursor-pointer"
                  style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
                  Rejoignez nous
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/30">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </span>
                </span>
              </Link>
            </div>
          </div>

          {/* Image droite + cercles flottants */}
          <div className="relative flex justify-center items-end min-h-[480px]">

            {/* Grande bulle fond */}
            <div className="absolute top-6 right-4 w-28 h-28 opacity-30 pointer-events-none">
              <Image src="/images/pres-illu-fond.png" alt="" fill className="object-contain" aria-hidden />
            </div>

            {/* Cercle DIGITAL — haut gauche */}
            <div className="absolute top-16 left-4 z-20">
              <div className="relative flex items-center justify-center w-28 h-16">
                <Image src="/images/cercle-digital.png" alt="" fill className="object-contain" aria-hidden />
                <span className="relative z-10 text-primary font-bold text-sm">DIGITAL</span>
              </div>
            </div>

            {/* Cercle EDUCATION — haut droit */}
            <div className="absolute top-12 right-4 z-20">
              <div className="relative flex items-center justify-center w-32 h-16">
                <Image src="/images/cercle-education.png" alt="" fill className="object-contain" aria-hidden />
                <span className="relative z-10 font-bold text-sm" style={{ color: "#2a1200" }}>EDUCATION</span>
              </div>
            </div>

            {/* Cercle PÉDAGOGIE MODERNE — milieu gauche */}
            <div className="absolute top-1/2 -left-2 z-20 -translate-y-1/2">
              <div className="relative flex items-center justify-center w-36 h-16">
                <Image src="/images/cercle-pedagogie.png" alt="" fill className="object-contain" aria-hidden />
                <span className="relative z-10 text-accent font-bold text-xs text-center leading-tight px-4">PÉDAGOGIE<br/>MODERNE</span>
              </div>
            </div>

            {/* Bulle alerte bleue gauche */}
            <Image src="/images/pres-bubble-blue-left.png" alt="" width={52} height={52}
              className="absolute bottom-24 left-2 z-20 animate-bounce" style={{ animationDuration: "3.5s" }} />

            {/* Bulle alerte bleue droite haut */}
            <Image src="/images/pres-bubble-blue-right.png" alt="" width={60} height={60}
              className="absolute top-6 left-1/3 z-20 animate-bounce" style={{ animationDuration: "3s", animationDelay: "0.5s" }} />

            {/* Bulle alerte verte */}
            <Image src="/images/pres-bubble-green.png" alt="" width={52} height={52}
              className="absolute bottom-32 right-2 z-20 animate-bounce" style={{ animationDuration: "4s", animationDelay: "1s" }} />

            {/* Homme pouce levé */}
            <div className="relative z-10">
              <Image src="/images/pres-hero-man.png" alt="Étudiant Modulor" width={340} height={460}
                className="object-contain object-bottom drop-shadow-xl" style={{ height: 460 }} priority />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Composant section réutilisable ────────────────────────────────── */
interface SectionProps {
  shapeSrc: string;
  iconSrc: string;
  badge: string;
  title: string;
  description: string;
  bullets: string[];
  buttonLabel?: string;
  buttonHref?: string;
  bgGreen?: boolean;
  reverse?: boolean;
}

function InfoSection({ shapeSrc, iconSrc, badge, title, description, bullets, buttonLabel, buttonHref, bgGreen, reverse }: SectionProps) {
  return (
    <section className="relative overflow-hidden py-16">
      {bgGreen && (
        <Image src="/images/pres-bg-rest.png" alt="" fill className="object-cover" aria-hidden />
      )}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 items-center`}>

          {/* Icône dans burst */}
          <div className="relative flex-shrink-0 w-44 h-44 flex items-center justify-center">
            <Image src={shapeSrc} alt="" fill className="object-contain" aria-hidden />
            <div className="relative z-10 w-16 h-16">
              <Image src={iconSrc} alt={badge} fill className="object-contain" />
            </div>
          </div>

          {/* Texte */}
          <div className="flex flex-col gap-4 max-w-xl">
            <span className="text-xs font-bold text-accent uppercase tracking-widest">{badge}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
            <ul className="flex flex-col gap-2 mt-1">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="mt-1 w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
            {buttonLabel && buttonHref && (
              <div className="mt-3">
                <Link href={buttonHref}>
                  <span className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-bold text-white text-sm cursor-pointer"
                    style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
                    {buttonLabel}
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/30">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </span>
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Communauté footer ─────────────────────────────────────────── */
function CommunauteCTA() {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden flex flex-col items-center text-center gap-5 py-14 px-6">
          {/* Fond dégradé bleu→vert */}
          <Image src="/images/pres-footer-shape.png" alt="" fill className="object-fill" aria-hidden />
          {/* Pattern par-dessus */}
          <Image src="/images/pattern-in-shape.png" alt="" fill className="object-fill opacity-25" aria-hidden />
          <div className="relative z-10 flex flex-col items-center gap-5">
            <h2 className="text-2xl md:text-3xl font-bold text-white max-w-lg leading-snug">
              Rejoins la communauté Modulor et donne vie à tes projets grâce à une nouvelle façon d&apos;apprendre.
            </h2>
            <Link href="/connexion">
              <span className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-primary bg-white text-sm cursor-pointer hover:bg-white/90 transition-colors">
                Rejoignez nous
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────── */
export default function PresentationPage() {
  return (
    <>
      <PresentationHero />

      <InfoSection
        shapeSrc="/images/shape-burst-vert.png"
        iconSrc="/images/icone-lampe.png"
        badge="Notre Approche"
        title="Une pédagogie pensée pour vous"
        description="Chez Modulor, nous croyons que chaque apprenant est unique. Notre approche combine théorie et pratique dans des parcours flexibles adaptés à votre rythme et vos ambitions."
        bullets={[
          "Apprentissage modulable à votre propre rythme",
          "Contenus produits par des experts du domaine",
          "Ateliers pratiques pour ancrer les acquis",
        ]}
        buttonLabel="En savoir plus"
        buttonHref="/formations"
      />

      <InfoSection
        shapeSrc="/images/shape-burst-vert.png"
        iconSrc="/images/icone-tasks.png"
        badge="Nos Services"
        title="Des services adaptés à chaque profil"
        description="Que vous soyez étudiant, professionnel en reconversion ou formateur, Modulor propose des services sur mesure pour accompagner chaque étape de votre parcours."
        bullets={[
          "Accès illimité aux cours vidéo de votre filière",
          "Suivi personnalisé de votre progression",
          "Certification à l'issue des formations complètes",
        ]}
        buttonLabel="Rejoignez nous"
        buttonHref="/connexion"
        bgGreen
      />

      <InfoSection
        shapeSrc="/images/shape-burst-contenus.png"
        iconSrc="/images/icone-engrenages.png"
        badge="Nos Contenus"
        title="Des contenus riches et variés"
        description="Modulor met à disposition une bibliothèque de contenus pédagogiques de qualité, couvrant un large spectre de filières techniques et professionnelles."
        bullets={[
          "Vidéos HD avec sous-titres et ressources téléchargeables",
          "Quiz interactifs pour valider vos acquis",
          "Mises à jour régulières par nos formateurs experts",
        ]}
      />

      <InfoSection
        shapeSrc="/images/shape-burst-question.png"
        iconSrc="/images/icone-question.png"
        badge="Pourquoi Modulor ?"
        title="Parce que l'apprentissage doit évoluer"
        description="Modulor est né du constat simple : les méthodes d'apprentissage traditionnelles ne suffisent plus. Nous proposons une alternative moderne, accessible et efficace."
        bullets={[
          "Plateforme 100% pensée pour les filières techniques",
          "Communauté active d'apprenants et de formateurs",
          "Tarifs accessibles adaptés au contexte local",
        ]}
        bgGreen
      />

      <CommunauteCTA />
    </>
  );
}
