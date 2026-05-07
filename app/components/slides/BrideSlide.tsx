"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SlideWrapper from "./SlideWrapper";
import SlideReveal from "../SlideReveal";
import { useSlideContext } from "../SlideManager";
import { useLanguage } from "../../context/LanguageContext";

function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function BrideSlide() {
  const { isActive } = useSlideContext();
  const { t } = useLanguage();

  return (
    <SlideWrapper
      style={{
        background: `
          radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.06) 0%, transparent 50%),
          linear-gradient(180deg, #060a14 0%, #0F1D33 25%, #1B2A4A 50%, #0F1D33 75%, #060a14 100%)
        `,
      }}
      className="flex flex-col items-center justify-center"
    >
      {/* Side lines */}
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-gold/8 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-gold/8 to-transparent" />

      <div className="relative z-10 text-center max-w-sm mx-auto">
        <SlideReveal isActive={isActive}>
          <p className="text-gold/40 text-[9px] sm:text-[10px] tracking-[0.5em] uppercase font-sans mb-8 sm:mb-10">
            {t.bride.roleLabel}
          </p>
        </SlideReveal>

        {/* Photo circle */}
        <SlideReveal delay={0.1} isActive={isActive}>
          <div className="relative mx-auto mb-8 sm:mb-10 w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44">
            <div className="absolute inset-0 rounded-full border border-gold/15" />
            <div className="absolute inset-1.5 sm:inset-2 rounded-full border border-dashed border-gold/10" />
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="absolute inset-3 sm:inset-3.5 rounded-full overflow-hidden"
              style={{
                boxShadow: "0 8px 32px rgba(15,29,51,0.4), inset 0 1px 0 rgba(212,175,55,0.15)",
              }}
            >
              <Image
                src="/photos/DSC00232.jpg"
                alt="Ester Siwi Prihardani"
                fill
                className="object-cover object-[center_15%]"
                sizes="(max-width: 640px) 144px, 176px"
              />
            </motion.div>
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-gold/30" />
          </div>
        </SlideReveal>

        {/* Name */}
        <SlideReveal delay={0.2} isActive={isActive}>
          <h3 className="font-script text-4xl sm:text-5xl text-gold-shimmer mb-4 leading-tight">
            Ester Siwi Prihardani
          </h3>
        </SlideReveal>

        <SlideReveal delay={0.25} isActive={isActive}>
          <p className="text-gold/50 text-[9px] sm:text-[10px] tracking-[0.4em] uppercase font-sans mb-5">
            {t.bride.role}
          </p>
        </SlideReveal>

        {/* Decorative line */}
        <SlideReveal delay={0.3} isActive={isActive}>
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-gold/25" />
            <div className="w-1 h-1 rotate-45 bg-gold/30" />
            <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-gold/25" />
          </div>
        </SlideReveal>

        {/* Parents */}
        <SlideReveal delay={0.35} isActive={isActive}>
          <p className="font-serif text-gold-light/50 text-base sm:text-lg leading-relaxed mb-6">
            {t.bride.daughterOf} {t.bride.honorifMr} Daniel Didik
            <br />
            & {t.bride.honorifMrs} Surya Ningrum
          </p>
        </SlideReveal>

        {/* Instagram */}
        <SlideReveal delay={0.4} isActive={isActive}>
          <a
            href="https://instagram.com/ershidani_"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-gold/50 hover:text-gold transition-all duration-300 font-sans text-[11px] tracking-wider group"
          >
            <InstagramIcon />
            <span className="group-hover:underline underline-offset-4">@ershidani_</span>
          </a>
        </SlideReveal>
      </div>
    </SlideWrapper>
  );
}
