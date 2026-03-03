"use client";

import { motion } from "framer-motion";
import SlideWrapper from "./SlideWrapper";
import SlideReveal from "../SlideReveal";
import Particles from "../Particles";
import { useSlideContext } from "../SlideManager";

function OrnamentalDivider() {
  return (
    <svg viewBox="0 0 300 30" className="w-48 sm:w-64 mx-auto text-gold" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="15" x2="120" y2="15" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
      <line x1="180" y1="15" x2="300" y2="15" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
      <path d="M130 15 L150 5 L170 15 L150 25 Z" stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
      <circle cx="150" cy="15" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="115" cy="15" r="1.2" fill="currentColor" opacity="0.2" />
      <circle cx="185" cy="15" r="1.2" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

export default function GreetingSlide() {
  const { isActive } = useSlideContext();

  return (
    <SlideWrapper
      style={{
        background: `
          radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.08) 0%, transparent 55%),
          radial-gradient(ellipse at 20% 80%, rgba(212,175,55,0.03) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, rgba(212,175,55,0.03) 0%, transparent 50%),
          linear-gradient(180deg, #060a14 0%, #0F1D33 20%, #1B2A4A 50%, #0F1D33 80%, #060a14 100%)
        `,
      }}
      className="flex flex-col items-center justify-center"
      padding=""
    >
      {/* Animated rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] md:w-[650px] md:h-[650px] rounded-full border border-gold/[0.04]"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          className="absolute w-[220px] h-[220px] sm:w-[380px] sm:h-[380px] md:w-[500px] md:h-[500px] rounded-full border border-gold/[0.06]"
          style={{ borderStyle: "dashed" }}
        />
        <div className="absolute w-[160px] h-[160px] sm:w-[260px] sm:h-[260px] md:w-[350px] md:h-[350px] rounded-full border border-gold/[0.03]" />
      </div>

      <Particles count={8} seed={202} sizeMin={1.5} sizeMax={3.5} durationMin={8} durationMax={18} leftMin={10} leftMax={90} showOpacity={false} />

      <div className="relative z-10 w-full max-w-2xl mx-auto text-center px-4 sm:px-6">
        <SlideReveal isActive={isActive}>
          <p className="text-gold/35 text-[9px] sm:text-[11px] tracking-[0.4em] sm:tracking-[0.5em] uppercase font-sans mb-8 sm:mb-12">
            Together with their families
          </p>
        </SlideReveal>

        <SlideReveal delay={0.15} isActive={isActive}>
          <h1 className="font-script text-[clamp(3.5rem,12vw,9rem)] text-gold-shimmer leading-[1.3] whitespace-nowrap overflow-visible">
            Prana
          </h1>
        </SlideReveal>

        <SlideReveal delay={0.25} isActive={isActive}>
          <div className="flex items-center justify-center gap-4 sm:gap-6 my-4 sm:my-6">
            <div className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent to-gold/25" />
            <span className="font-script text-2xl sm:text-3xl text-gold/25">&</span>
            <div className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent to-gold/25" />
          </div>
        </SlideReveal>

        <SlideReveal delay={0.35} isActive={isActive}>
          <h1 className="font-script text-[clamp(3.5rem,12vw,9rem)] text-gold-shimmer leading-[1.3] whitespace-nowrap overflow-visible">
            Ester
          </h1>
        </SlideReveal>

        <SlideReveal delay={0.45} isActive={isActive}>
          <div className="mt-8 sm:mt-12 mb-8 sm:mb-10">
            <OrnamentalDivider />
          </div>
        </SlideReveal>

        <SlideReveal delay={0.55} isActive={isActive}>
          <p className="text-gold-light/35 font-display text-base sm:text-xl md:text-2xl tracking-[0.15em] font-light">
            30 . 05 . 2026
          </p>
          <p className="text-gold-light/50 font-sans text-[9px] sm:text-[10px] tracking-[0.35em] uppercase mt-3 sm:mt-4">
            GMS Kelapa Gading &middot; Jakarta
          </p>
        </SlideReveal>
      </div>
    </SlideWrapper>
  );
}
