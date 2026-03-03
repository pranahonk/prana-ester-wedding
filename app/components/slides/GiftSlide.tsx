"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SlideWrapper from "./SlideWrapper";
import SlideReveal from "../SlideReveal";
import { useSlideContext } from "../SlideManager";

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function BankCard({
  accountNumber,
  accountName,
  delay,
}: {
  accountNumber: string;
  accountName: string;
  delay: number;
}) {
  const { isActive } = useSlideContext();
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    const digits = accountNumber.replace(/[-\s]/g, "");
    navigator.clipboard.writeText(digits).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  return (
    <SlideReveal delay={delay} isActive={isActive}>
      <div className="relative p-5 sm:p-6 text-center border border-gold/10 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <div className="inline-flex items-center gap-2 px-4 py-1 bg-white/[0.04] rounded-full mb-4">
          <div className="w-2 h-2 rounded-full bg-gold/60" />
          <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-gold-light/40 font-medium">Bank BCA</span>
        </div>

        <p className="font-display text-lg sm:text-xl text-gold-light font-semibold tracking-[0.05em] sm:tracking-[0.1em] mb-2">
          {accountNumber}
        </p>
        <p className="font-serif text-gold-light/40 text-sm mb-4">a.n. {accountName}</p>

        <motion.button
          onClick={handleCopy}
          whileTap={{ scale: 0.97 }}
          className={`inline-flex items-center gap-2 px-5 py-2 border rounded-lg text-[10px] font-sans tracking-[0.15em] uppercase cursor-pointer transition-all duration-500 ${
            copied
              ? "border-green-500/50 text-green-400 bg-green-500/10"
              : "border-gold/30 text-gold hover:border-gold hover:bg-gold/5"
          }`}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? "Tersalin!" : "Salin Nomor"}
        </motion.button>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
      </div>
    </SlideReveal>
  );
}

export default function GiftSlide() {
  const { isActive } = useSlideContext();

  return (
    <SlideWrapper
      allowScroll
      style={{
        background: `
          radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.06) 0%, transparent 50%),
          linear-gradient(180deg, #060a14 0%, #0F1D33 25%, #1B2A4A 50%, #0F1D33 75%, #060a14 100%)
        `,
      }}
      padding="pt-12 sm:pt-16 px-4 sm:px-6 pb-28"
      className="flex flex-col items-center"
    >
      <div className="max-w-md mx-auto relative z-10 w-full">
        <SlideReveal isActive={isActive}>
          <div className="text-center mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold/60 mx-auto mb-4">
              <polyline points="20 12 20 22 4 22 4 12" />
              <rect x="2" y="7" width="20" height="5" />
              <line x1="12" y1="22" x2="12" y2="7" />
              <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
              <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
            </svg>
            <p className="text-gold/35 text-[9px] sm:text-[10px] tracking-[0.4em] uppercase font-sans mb-2">
              Love Gift
            </p>
            <h2 className="font-script text-3xl sm:text-4xl text-gold mb-1">
              Wedding Gift
            </h2>
            <div className="flex items-center justify-center gap-3 mt-3">
              <div className="w-8 sm:w-14 h-px bg-gradient-to-r from-transparent to-gold/20" />
              <div className="w-1.5 h-1.5 rotate-45 border border-gold/30" />
              <div className="w-8 sm:w-14 h-px bg-gradient-to-l from-transparent to-gold/20" />
            </div>
          </div>
        </SlideReveal>

        <SlideReveal delay={0.1} isActive={isActive}>
          <p className="font-serif text-center text-gold-light/50 mb-1.5 text-sm sm:text-base max-w-sm mx-auto leading-relaxed">
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami.
          </p>
          <p className="font-serif text-center text-gold-light/30 mb-8 text-sm">
            Namun jika Anda ingin memberikan tanda kasih:
          </p>
        </SlideReveal>

        <div className="space-y-4">
          <BankCard
            accountNumber="6841000070"
            accountName="Prana Apsara Wijaya"
            delay={0.2}
          />
          <BankCard
            accountNumber="7510720924"
            accountName="Ester Siwi Prihardani"
            delay={0.3}
          />
        </div>
      </div>
    </SlideWrapper>
  );
}
