"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SlideWrapper from "./SlideWrapper";
import SlideReveal from "../SlideReveal";
import Particles from "../Particles";
import { useSlideContext } from "../SlideManager";
import { useLanguage } from "../../context/LanguageContext";

export default function VerseSlide() {
  const { isActive } = useSlideContext();
  const { t } = useLanguage();

  return (
    <SlideWrapper padding="pt-12 sm:pt-16 px-4 sm:px-8 pb-24" className="flex flex-col items-center justify-center">
      {/* Photo background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/photos/DSC09868.jpg"
          alt="Prana & Ester"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 50% 50%, rgba(6,10,20,0.6) 0%, rgba(6,10,20,0.82) 60%),
              linear-gradient(180deg, rgba(6,10,20,0.9) 0%, rgba(15,29,51,0.72) 30%, rgba(15,29,51,0.7) 60%, rgba(6,10,20,0.92) 100%)
            `,
          }}
        />
        {/* Gold haze */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.06) 0%, transparent 50%)",
          }}
        />
      </div>

      <Particles count={12} seed={303} sizeMin={1.5} sizeMax={3} />

      <div className="max-w-md sm:max-w-xl md:max-w-2xl mx-auto text-center relative z-10">
        {/* Cross with halo */}
        <SlideReveal isActive={isActive}>
          <div className="flex flex-col items-center mb-10 sm:mb-14">
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div
                className="absolute inset-0 -m-4 sm:-m-5 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)",
                }}
              />
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                className="text-gold relative"
              >
                <rect x="15.5" y="3" width="5" height="30" rx="1.5" fill="currentColor" opacity="0.6" />
                <rect x="6" y="11" width="24" height="5" rx="1.5" fill="currentColor" opacity="0.6" />
                <circle cx="18" cy="14" r="2" fill="currentColor" opacity="0.35" />
              </svg>
            </motion.div>

            <div className="flex items-center gap-3 mt-5 sm:mt-6">
              <div className="w-14 sm:w-24 h-px bg-gradient-to-r from-transparent to-gold/30" />
              <div className="w-1 h-1 rounded-full bg-gold/40" />
              <div className="w-14 sm:w-24 h-px bg-gradient-to-l from-transparent to-gold/30" />
            </div>
          </div>
        </SlideReveal>

        {/* Verse */}
        <SlideReveal delay={0.15} isActive={isActive}>
          <div className="relative px-4 sm:px-8 md:px-12">
            <span className="absolute -top-8 sm:-top-10 left-2 sm:left-4 md:left-8 font-serif text-[60px] sm:text-[72px] md:text-[88px] leading-none text-gold/[0.12] select-none">
              &ldquo;
            </span>

            <blockquote>
              <p className="font-serif text-xl sm:text-[1.65rem] md:text-[1.85rem] leading-[2] sm:leading-[1.95] text-gold-light/80 italic">
                {t.verse.verseBody1}
              </p>
              <p className="font-serif text-lg sm:text-[1.45rem] md:text-[1.6rem] leading-[2] sm:leading-[1.95] text-gold-light/40 italic mt-4 sm:mt-5">
                {t.verse.verseBody2}
              </p>
            </blockquote>

            <span className="absolute -bottom-6 sm:-bottom-8 right-2 sm:right-4 md:right-8 font-serif text-[60px] sm:text-[72px] md:text-[88px] leading-none text-gold/[0.12] select-none">
              &rdquo;
            </span>
          </div>
        </SlideReveal>

        {/* Ornamental divider */}
        <SlideReveal delay={0.35} isActive={isActive}>
          <div className="mt-12 sm:mt-16">
            <div className="divider-gold" />
          </div>
        </SlideReveal>

        {/* Attribution */}
        <SlideReveal delay={0.45} isActive={isActive}>
          <div className="mt-6 sm:mt-8">
            <p className="font-display text-gold/70 text-sm sm:text-base tracking-[0.35em] font-semibold uppercase">
              {t.verse.reference}
            </p>
            <p className="font-serif text-gold-light/30 text-[11px] sm:text-xs mt-2 tracking-[0.2em] uppercase">
              {t.verse.source}
            </p>
          </div>
        </SlideReveal>
      </div>
    </SlideWrapper>
  );
}
