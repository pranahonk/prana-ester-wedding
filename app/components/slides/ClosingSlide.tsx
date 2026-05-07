"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SlideWrapper from "./SlideWrapper";
import SlideReveal from "../SlideReveal";
import Particles from "../Particles";
import { useSlideContext } from "../SlideManager";
import { useLanguage } from "../../context/LanguageContext";

export default function ClosingSlide() {
  const { isActive } = useSlideContext();
  const { t } = useLanguage();

  return (
    <SlideWrapper padding="" className="flex flex-col items-center justify-center">
      {/* Background photo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/photos/DSC00479.jpg"
          alt="Prana & Ester"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 50% 50%, rgba(6,10,20,0.55) 0%, rgba(6,10,20,0.82) 60%),
              linear-gradient(180deg, rgba(6,10,20,0.88) 0%, rgba(15,29,51,0.68) 30%, rgba(15,29,51,0.65) 60%, rgba(6,10,20,0.92) 100%)
            `,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.07) 0%, transparent 50%)",
          }}
        />
      </div>

      <Particles count={8} seed={505} sizeMin={1} sizeMax={2.5} durationMin={8} durationMax={18} />

      <div className="relative z-10 text-center px-6">
        {/* Ornamental top */}
        <SlideReveal isActive={isActive}>
          <div className="flex flex-col items-center mb-8 sm:mb-10">
            <motion.div
              animate={{ opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-gold/40">
                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
                <circle cx="16" cy="16" r="8" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                <circle cx="16" cy="16" r="1.5" fill="currentColor" opacity="0.5" />
                <line x1="16" y1="2" x2="16" y2="8" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
                <line x1="16" y1="24" x2="16" y2="30" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
                <line x1="2" y1="16" x2="8" y2="16" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
                <line x1="24" y1="16" x2="30" y2="16" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
              </svg>
            </motion.div>
            <div className="flex items-center gap-3 mt-5">
              <div className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent to-gold/25" />
              <div className="w-1 h-1 rounded-full bg-gold/35" />
              <div className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent to-gold/25" />
            </div>
          </div>
        </SlideReveal>

        {/* Thank you label */}
        <SlideReveal delay={0.1} isActive={isActive}>
          <p className="text-gold/40 text-[9px] sm:text-[10px] tracking-[0.5em] uppercase font-sans mb-6 sm:mb-8">
            {t.closing.thankYou}
          </p>
        </SlideReveal>

        {/* Names */}
        <SlideReveal delay={0.2} isActive={isActive}>
          <h2 className="font-script text-[3.2rem] sm:text-6xl md:text-7xl text-gold-shimmer leading-[1.3] mb-1 overflow-visible">
            Prana
          </h2>
          <div className="flex items-center justify-center gap-3 my-1.5 sm:my-2">
            <div className="w-10 sm:w-14 h-px bg-gradient-to-r from-transparent to-gold/25" />
            <span className="font-script text-gold/45 text-lg sm:text-xl">&amp;</span>
            <div className="w-10 sm:w-14 h-px bg-gradient-to-l from-transparent to-gold/25" />
          </div>
          <h2 className="font-script text-[3.2rem] sm:text-6xl md:text-7xl text-gold-shimmer leading-[1.3] overflow-visible">
            Ester
          </h2>
        </SlideReveal>

        {/* Date */}
        <SlideReveal delay={0.3} isActive={isActive}>
          <div className="mt-8 sm:mt-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-gold/20" />
              <div className="w-1.5 h-1.5 rotate-45 border border-gold/25" />
              <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-gold/20" />
            </div>
            <p className="font-display text-gold-light/55 text-xs sm:text-sm tracking-[0.3em] uppercase">
              30 Mei 2026
            </p>
          </div>
        </SlideReveal>

        {/* Verse */}
        <SlideReveal delay={0.4} isActive={isActive}>
          <div className="mt-10 sm:mt-14 max-w-[300px] sm:max-w-sm mx-auto relative py-6 px-5 sm:px-6 border-t border-b border-gold/15">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-navy-deep px-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gold/40">
                <path d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="font-serif text-gold-light/60 text-[13px] sm:text-base italic leading-[2]">
              {t.closing.secondaryVerse}
            </p>
            <p className="font-display text-gold/40 text-[10px] sm:text-[11px] tracking-[0.3em] mt-4 uppercase">
              {t.closing.secondaryVerseRef}
            </p>
          </div>
        </SlideReveal>

        {/* Bottom heart */}
        <SlideReveal delay={0.5} isActive={isActive}>
          <div className="mt-10 sm:mt-14 flex flex-col items-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg className="w-4 h-4 text-gold/25" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>
          </div>
        </SlideReveal>
      </div>
    </SlideWrapper>
  );
}
