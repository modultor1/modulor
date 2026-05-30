"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const bubbleVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const getAnimationProps = (shouldReduce: boolean) => {
    if (shouldReduce) {
      return { initial: false, animate: false };
    }
    return {};
  };

  return (
    <section className="relative overflow-hidden" style={{ minHeight: 480 }}>
      <Image src="/images/bg-hero.png" alt="" fill className="object-cover" aria-hidden priority />
      <div className="absolute left-0 top-0 h-full w-[180px] pointer-events-none hidden lg:block">
        <Image src="/images/pattern-hero.png" alt="" fill className="object-cover opacity-60" aria-hidden />
      </div>
      <div className="absolute right-0 top-0 h-full w-[180px] pointer-events-none hidden lg:block">
        <Image src="/images/pattern-hero.png" alt="" fill className="object-cover opacity-60 [transform:scaleX(-1)]" aria-hidden />
      </div>

      <div className="relative z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center" style={{ minHeight: 480 }}>

          {/* Texte — pleine largeur sur mobile */}
          <motion.div
            className="flex flex-col justify-center gap-3 py-10 lg:py-0 text-center lg:text-left"
            initial={shouldReduceMotion ? false : "hidden"}
            animate={shouldReduceMotion ? false : "visible"}
            variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } }}
          >
            <motion.p className="leading-tight" variants={textVariants} style={{ fontFamily: "var(--font-montserrat)", fontWeight: 600, fontSize: "44px", color: "#03251C" }}>
              Nous vous
            </motion.p>
            <motion.h1 className="leading-tight" variants={textVariants} style={{ fontFamily: "var(--font-montserrat)", fontWeight: 700, fontSize: "66px", color: "#2934F2" }}>
              Formons&nbsp;!
            </motion.h1>
            <motion.p className="leading-tight" variants={textVariants} style={{ fontFamily: "var(--font-montserrat)", fontWeight: 600, fontSize: "38px", color: "#2934F2" }}>
              Nous donnons vie{" "}
              <span style={{ fontFamily: "var(--font-montserrat)", fontWeight: 600, fontSize: "28px", color: "#21D34C" }}>à vos projets</span>
            </motion.p>
            <motion.div className="mt-3 flex justify-center lg:justify-start" variants={buttonVariants}>
              <Link href="/formations">
                <span className="inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 rounded-full font-bold text-white text-sm sm:text-base cursor-pointer"
                  style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
                  Acheter maintenant
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Images — masquées sur mobile petit, visibles à partir de md */}
          <div className="relative hidden md:flex justify-center lg:justify-end items-end">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.5 }}
              animate={shouldReduceMotion ? false : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 1.0 }}
            >
              <Image src="/images/bubble-blue-light.png" alt="" width={125} height={125}
                className="absolute z-20" style={{ top: "10%", left: "60%", transform: "translateX(-60%)" }} />
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.5 }}
              animate={shouldReduceMotion ? false : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 1.15 }}
            >
              <Image src="/images/bubble-blue-dark.png" alt="" width={52} height={52}
                className="absolute z-20" style={{ bottom: "12%", right: "12%" }} />
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.5 }}
              animate={shouldReduceMotion ? false : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 1.3 }}
            >
              <Image src="/images/bubble-green.png" alt="" width={68} height={68}
                className="absolute z-20" style={{ top: "30%", left: "10%" }} />
            </motion.div>

            <motion.div
              className="relative z-10 drop-shadow-xl h-full flex items-end"
              style={{ transform: "translateY(13px)" }}
              initial={shouldReduceMotion ? false : "hidden"}
              animate={shouldReduceMotion ? false : "visible"}
              variants={imageVariants}
              transition={{ ...imageVariants.visible.transition, delay: 0.6 }}
            >
              <Image src="/images/Deux étudiants.png" alt="Étudiants Modulor" width={650} height={620}
                className="object-contain" priority />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
