"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SlideWrapper from "./SlideWrapper";
import Particles from "../Particles";

function Flourish({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 20"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 10 Q25 0 50 10 T100 10 T150 10 T200 10"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.4"
      />
      <circle cx="100" cy="10" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="60" cy="10" r="1" fill="currentColor" opacity="0.3" />
      <circle cx="140" cy="10" r="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

export default function CoverSlide({
  guestName,
  onOpen,
}: {
  guestName: string;
  onOpen: () => void;
}) {
  return (
    <SlideWrapper padding="" className="flex flex-col items-center justify-center">
      {/* Photo background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/photos/DSC00194.jpg"
          alt="Prana & Ester"
          fill
          priority
          className="object-cover object-[center_65%]"
          sizes="100vw"
        />
        {/* Dark overlay — heavy enough for text readability, light enough to let the photo mood through */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 50% 60%, rgba(6,10,20,0.55) 0%, rgba(6,10,20,0.8) 60%),
              linear-gradient(180deg, rgba(6,10,20,0.88) 0%, rgba(15,29,51,0.72) 35%, rgba(15,29,51,0.68) 55%, rgba(6,10,20,0.92) 100%)
            `,
          }}
        />
        {/* Subtle gold haze to tie into the theme */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.06) 0%, transparent 50%),
              radial-gradient(ellipse at 30% 20%, rgba(212,175,55,0.03) 0%, transparent 40%)
            `,
          }}
        />
      </div>

      <Particles count={15} seed={101} sizeMin={1.5} sizeMax={3} />

      {/* Ornate border */}
      <div className="absolute inset-3 sm:inset-5 border border-gold/8 pointer-events-none z-1" />
      <div className="absolute inset-5 sm:inset-8 border border-gold/5 pointer-events-none z-1" />

      {/* Corner ornaments */}
      {[
        "top-3 left-3 sm:top-5 sm:left-5",
        "top-3 right-3 sm:top-5 sm:right-5 scale-x-[-1]",
        "bottom-3 left-3 sm:bottom-5 sm:left-5 scale-y-[-1]",
        "bottom-3 right-3 sm:bottom-5 sm:right-5 scale-[-1]",
      ].map((pos, i) => (
        <svg
          key={i}
          className={`absolute w-10 h-10 sm:w-14 sm:h-14 text-gold/20 ${pos} z-[1]`}
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
        >
          <path d="M2 40 Q2 2 40 2" />
          <path d="M2 28 Q2 6 24 2" />
          <circle cx="6" cy="6" r="1.5" fill="currentColor" opacity="0.4" />
        </svg>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="text-center px-10 sm:px-16 relative z-10 w-full max-w-lg"
      >
        {/* Top flourish */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Flourish className="w-40 sm:w-52 mx-auto mb-8 text-gold" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.15em" }}
          animate={{ opacity: 1, letterSpacing: "0.35em" }}
          transition={{ delay: 0.6, duration: 1.5 }}
          className="text-gold-light/40 text-[10px] sm:text-xs uppercase font-sans mb-5 sm:mb-8"
        >
          The Wedding of
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="font-script text-5xl sm:text-7xl md:text-8xl text-gold-shimmer leading-[1.3] whitespace-nowrap overflow-visible"
        >
          Prana
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex items-center justify-center gap-4 my-3 sm:my-4"
        >
          <div className="w-10 sm:w-16 h-px bg-gradient-to-r from-transparent to-gold/25" />
          <span className="font-script text-2xl sm:text-3xl text-gold/30">&</span>
          <div className="w-10 sm:w-16 h-px bg-gradient-to-l from-transparent to-gold/25" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="font-script text-5xl sm:text-7xl md:text-8xl text-gold-shimmer leading-[1.3] whitespace-nowrap overflow-visible"
        >
          Ester
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-5 sm:mt-8 mb-5 sm:mb-8"
        >
          <div className="divider-gold" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-gold-light/60 font-display text-sm sm:text-base tracking-[0.2em] mb-6"
        >
          30 . 05 . 2026
        </motion.p>

        {guestName && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.8 }}
            className="mb-6 py-5 sm:py-6 px-6 border-y border-gold/[0.15]"
          >
            <p className="text-gold/50 text-[9px] sm:text-[10px] tracking-[0.4em] uppercase font-sans mb-3">
              Kepada Yth. Bapak/Ibu/Saudara/i
            </p>
            <p className="text-gold-shimmer font-script text-2xl sm:text-3xl tracking-wide leading-snug">
              {guestName}
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: guestName ? 2.1 : 1.8, duration: 0.8 }}
          className="relative mx-auto mt-2 flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpen}
            className="relative cursor-pointer group"
          >
            {/* Pulsing glow behind button */}
            <motion.div
              animate={{
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-3 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(ellipse, rgba(212,175,55,0.12) 0%, transparent 70%)",
              }}
            />

            {/* Button content */}
            <span className="relative z-10 flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full border border-gold/30 backdrop-blur-sm"
              style={{
                background: "linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.03) 50%, rgba(212,175,55,0.1) 100%)",
              }}
            >
              {/* Shimmer sweep */}
              <span className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              </span>

              {/* Envelope icon */}
              <motion.span
                animate={{ y: [0, -1.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gold">
                  <rect x="2" y="6" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M2 6l10 7 10-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.span>

              <span className="relative tracking-[0.3em] uppercase text-[10px] sm:text-[11px] font-sans text-gold font-medium">
                Buka Undangan
              </span>
            </span>
          </motion.button>
        </motion.div>

        {/* Bottom flourish */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="mt-8"
        >
          <Flourish className="w-40 sm:w-52 mx-auto text-gold rotate-180" />
        </motion.div>
      </motion.div>
    </SlideWrapper>
  );
}
