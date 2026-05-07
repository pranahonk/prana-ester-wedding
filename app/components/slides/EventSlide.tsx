"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SlideWrapper from "./SlideWrapper";
import SlideReveal from "../SlideReveal";
import Particles from "../Particles";
import { useSlideContext } from "../SlideManager";
import { useLanguage } from "../../context/LanguageContext";

const WEDDING_DATE = new Date("2026-05-30T09:30:00+07:00").getTime();

function MapPinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-[52px] h-[60px] sm:w-[64px] sm:h-[76px] rounded-lg flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(180deg, rgba(212,175,55,0.08) 0%, rgba(15,29,51,0.5) 100%)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(212,175,55,0.15)",
        }}
      >
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gold/30 z-10" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gold/30 z-10" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gold/20 z-10" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gold/20 z-10" />
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={display}
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-display text-xl sm:text-3xl font-semibold text-gold-shimmer"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-gold/35 text-[7px] sm:text-[9px] tracking-[0.2em] uppercase font-sans mt-2">
        {label}
      </span>
    </div>
  );
}

export default function EventSlide() {
  const { isActive } = useSlideContext();
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    function calc() {
      const diff = Math.max(0, WEDDING_DATE - Date.now());
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <SlideWrapper
      style={{
        background: `
          radial-gradient(ellipse at 30% 20%, rgba(212,175,55,0.06) 0%, transparent 50%),
          radial-gradient(ellipse at 70% 80%, rgba(212,175,55,0.06) 0%, transparent 50%),
          linear-gradient(180deg, #060a14 0%, #0F1D33 15%, #1B2A4A 45%, #1B2A4A 55%, #0F1D33 85%, #060a14 100%)
        `,
      }}
      padding="pt-12 sm:pt-16 px-4 sm:px-6 pb-28"
      className="flex flex-col items-center justify-start"
    >
      <Particles count={6} seed={303} durationMin={10} durationMax={18} leftMin={15} leftMax={85} showOpacity={false} />

      <div className="max-w-md mx-auto relative z-10 w-full overflow-y-auto h-full">
        {/* Header */}
        <SlideReveal isActive={isActive}>
          <div className="text-center mb-6 sm:mb-8">
            <p className="text-gold/40 text-[9px] sm:text-[10px] tracking-[0.5em] uppercase font-sans mb-2">
              {t.event.sectionLabel}
            </p>
            <h2 className="font-script text-3xl sm:text-4xl text-gold mb-1">
              {t.event.heading}
            </h2>
            <div className="flex items-center justify-center gap-3 mt-3">
              <div className="w-10 sm:w-16 h-px bg-gradient-to-r from-transparent to-gold/20" />
              <div className="w-1.5 h-1.5 rotate-45 border border-gold/30" />
              <div className="w-10 sm:w-16 h-px bg-gradient-to-l from-transparent to-gold/20" />
            </div>
          </div>
        </SlideReveal>

        {/* Countdown */}
        {mounted && (
          <SlideReveal delay={0.1} isActive={isActive}>
            <div className="text-center mb-6 sm:mb-8">
              <p className="text-gold/35 text-[8px] sm:text-[9px] tracking-[0.3em] uppercase font-sans mb-3">
                {t.event.countdownLabel}
              </p>
              <div className="flex justify-center gap-1.5 sm:gap-3">
                <TimeUnit value={timeLeft.days} label={t.event.days} />
                <div className="flex items-center pb-5">
                  <span className="text-gold/20 font-display text-base sm:text-lg">:</span>
                </div>
                <TimeUnit value={timeLeft.hours} label={t.event.hours} />
                <div className="flex items-center pb-5">
                  <span className="text-gold/20 font-display text-base sm:text-lg">:</span>
                </div>
                <TimeUnit value={timeLeft.minutes} label={t.event.minutes} />
                <div className="flex items-center pb-5">
                  <span className="text-gold/20 font-display text-base sm:text-lg">:</span>
                </div>
                <TimeUnit value={timeLeft.seconds} label={t.event.seconds} />
              </div>
            </div>
          </SlideReveal>
        )}

        {/* Date badge */}
        <SlideReveal delay={0.2} isActive={isActive}>
          <div className="flex items-center justify-center gap-3 mb-8 sm:mb-10">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold/20" />
            <p className="font-display text-xs sm:text-sm text-gold-light/70 tracking-[0.15em] uppercase whitespace-nowrap">
              Sabtu, 30 Mei 2026
            </p>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold/20" />
          </div>
        </SlideReveal>

        {/* Resepsi section */}
        <SlideReveal delay={0.3} isActive={isActive}>
          <div className="text-center mb-6 sm:mb-8">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="text-gold/50 mx-auto mb-3">
              <path d="M10 6 L13 18 L11 20 L19 20 L17 18 L20 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
              <line x1="11" y1="20" x2="11" y2="26" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
              <line x1="19" y1="20" x2="19" y2="26" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
              <line x1="8" y1="26" x2="22" y2="26" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
              <circle cx="24" cy="8" r="1" fill="currentColor" opacity="0.4" />
              <circle cx="7" cy="10" r="0.8" fill="currentColor" opacity="0.3" />
            </svg>
            <h3 className="font-script text-2xl sm:text-3xl text-gold mb-2">{t.event.reception}</h3>
            <p className="font-display text-base sm:text-lg text-gold-light/70 tracking-wider mb-2">13:00 WIB</p>
            <p className="font-display text-sm sm:text-base text-gold-light font-medium">Roemah Kopi Sandjaja</p>
            <p className="text-gold-light/35 font-sans text-[10px] sm:text-xs tracking-wider mt-1">{t.event.receptionLocation}</p>
            <a
              href="https://maps.app.goo.gl/hqueMQCEknq6c1RN8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 px-4 py-1.5 border border-gold/20 rounded-lg text-gold text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-sans hover:bg-gold/10 active:scale-[0.97] transition-all"
            >
              <MapPinIcon /> {t.event.viewLocation}
            </a>
            <div className="mt-4 border border-gold/10 overflow-hidden rounded-lg">
              <iframe
                src="https://maps.google.com/maps?q=Roemah+Kopi+Sandjaja+Kelapa+Gading&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="150"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t.event.receptionMapTitle}
              />
            </div>
          </div>
        </SlideReveal>

        {/* Ornamental divider */}
        <SlideReveal delay={0.4} isActive={isActive}>
          <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
            <div className="w-10 sm:w-16 h-px bg-gradient-to-r from-transparent to-gold/20" />
            <div className="w-1.5 h-1.5 rotate-45 border border-gold/30" />
            <div className="w-10 sm:w-16 h-px bg-gradient-to-l from-transparent to-gold/20" />
          </div>
        </SlideReveal>

        {/* Pemberkatan section */}
        <SlideReveal delay={0.5} isActive={isActive}>
          <div className="text-center">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="text-gold/50 mx-auto mb-3">
              <rect x="14.5" y="1" width="3" height="8" rx="0.5" fill="currentColor" opacity="0.7" />
              <rect x="12" y="3.5" width="8" height="3" rx="0.5" fill="currentColor" opacity="0.7" />
              <path d="M4 18 L16 9 L28 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
              <rect x="6" y="18" width="20" height="12" rx="0.5" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
              <path d="M13 30 L13 23 Q16 20 19 23 L19 30" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            </svg>
            <h3 className="font-script text-2xl sm:text-3xl text-gold mb-2">{t.event.ceremony}</h3>
            <p className="font-display text-base sm:text-lg text-gold-light/70 tracking-wider mb-2">09:30 WIB</p>
            <p className="font-display text-sm sm:text-base text-gold-light font-medium">GMS Kelapa Gading</p>
            <p className="text-gold-light/35 font-sans text-[10px] sm:text-xs tracking-wider mt-1">{t.event.ceremonyLocation}</p>
            <a
              href="https://maps.google.com/?q=GMS+Kelapa+Gading+Jakarta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 px-4 py-1.5 border border-gold/20 rounded-lg text-gold text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-sans hover:bg-gold/10 active:scale-[0.97] transition-all"
            >
              <MapPinIcon /> {t.event.viewLocation}
            </a>
            <div className="mt-4 border border-gold/10 overflow-hidden rounded-lg">
              <iframe
                src="https://maps.google.com/maps?q=GMS+Kelapa+Gading+Jakarta&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="150"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t.event.ceremonyMapTitle}
              />
            </div>
          </div>
        </SlideReveal>
      </div>
    </SlideWrapper>
  );
}
