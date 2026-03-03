"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SlideWrapper from "./SlideWrapper";
import SlideReveal from "../SlideReveal";
import { useSlideContext } from "../SlideManager";

const PHOTOS = [
  "DSC00106", "DSC00111", "DSC00136", "DSC00149", "DSC00167", "DSC00172",
  "DSC00187", "DSC00185", "DSC00191", "DSC00194", "DSC00198", "DSC00204",
  "DSC00220", "DSC00217", "DSC00215", "DSC00213", "DSC00210", "DSC00208",
  "DSC00257", "DSC00254", "DSC00252", "DSC00262", "DSC00266", "DSC00269",
  "DSC00271", "DSC00273", "DSC00276", "DSC00277", "DSC00307", "DSC00308",
  "DSC00312", "DSC00314", "DSC00317", "DSC00323", "DSC00338", "DSC00330",
  "DSC00328", "DSC00344", "DSC00345", "DSC00363", "DSC00361", "DSC00358",
  "DSC00377", "DSC00374", "DSC00379",
].map((name, i) => ({
  id: i,
  src: `/photos/${name}.jpg`,
  alt: `Prana & Ester ${i + 1}`,
}));

export default function GallerySlide({
  onLightboxChange,
}: {
  onLightboxChange: (open: boolean) => void;
}) {
  const { isActive } = useSlideContext();
  const [selected, setSelected] = useState<number | null>(null);

  const openLightbox = useCallback((idx: number) => {
    setSelected(idx);
    onLightboxChange(true);
  }, [onLightboxChange]);

  const closeLightbox = useCallback(() => {
    setSelected(null);
    onLightboxChange(false);
  }, [onLightboxChange]);

  const goNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected((prev) => (prev !== null ? (prev + 1) % PHOTOS.length : null));
  }, []);

  const goPrev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected((prev) => (prev !== null ? (prev - 1 + PHOTOS.length) % PHOTOS.length : null));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (selected === null) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") { setSelected(null); onLightboxChange(false); }
      if (e.key === "ArrowRight") setSelected((p) => (p !== null ? (p + 1) % PHOTOS.length : null));
      if (e.key === "ArrowLeft") setSelected((p) => (p !== null ? (p - 1 + PHOTOS.length) % PHOTOS.length : null));
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected, onLightboxChange]);

  // Touch swipe left/right for lightbox
  const touchStartX = useRef<number | null>(null);
  useEffect(() => {
    if (selected === null) return;
    function handleTouchStart(e: TouchEvent) {
      touchStartX.current = e.touches[0].clientX;
    }
    function handleTouchEnd(e: TouchEvent) {
      if (touchStartX.current === null) return;
      const deltaX = touchStartX.current - e.changedTouches[0].clientX;
      touchStartX.current = null;
      if (Math.abs(deltaX) < 40) return;
      if (deltaX > 0) {
        setSelected((p) => (p !== null ? (p + 1) % PHOTOS.length : null));
      } else {
        setSelected((p) => (p !== null ? (p - 1 + PHOTOS.length) % PHOTOS.length : null));
      }
    }
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [selected]);

  return (
    <SlideWrapper
      allowScroll
      style={{
        background: `
          radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.06) 0%, transparent 50%),
          linear-gradient(180deg, #060a14 0%, #0F1D33 25%, #1B2A4A 50%, #0F1D33 75%, #060a14 100%)
        `,
      }}
      padding="pt-12 sm:pt-16 px-3 sm:px-4 pb-28"
      className="flex flex-col items-center"
    >
      <div className="max-w-2xl mx-auto relative z-10 w-full">
        <SlideReveal isActive={isActive}>
          <div className="text-center mb-5 sm:mb-6">
            <p className="text-gold/35 text-[9px] sm:text-[10px] tracking-[0.4em] uppercase font-sans mb-2">
              Our Moments
            </p>
            <h2 className="font-script text-3xl sm:text-4xl text-gold mb-1">
              Galeri
            </h2>
            <div className="flex items-center justify-center gap-3 mt-3">
              <div className="w-8 sm:w-14 h-px bg-gradient-to-r from-transparent to-gold/20" />
              <div className="w-1.5 h-1.5 rotate-45 border border-gold/30" />
              <div className="w-8 sm:w-14 h-px bg-gradient-to-l from-transparent to-gold/20" />
            </div>
          </div>
        </SlideReveal>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 sm:gap-2">
          {PHOTOS.map((photo, idx) => (
            <SlideReveal key={photo.id} delay={Math.min(idx * 0.02, 0.4)} direction="fade" isActive={isActive}>
              <motion.button
                onClick={() => openLightbox(idx)}
                whileHover={{ scale: 1.03 }}
                className="relative aspect-square overflow-hidden group cursor-pointer w-full"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 33vw, 25vw"
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/20 transition-all duration-500" />
              </motion.button>
            </SlideReveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(6,10,20,0.96)" }}
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center text-gold/60 hover:text-gold hover:bg-white/5 transition-all cursor-pointer"
              style={{ backdropFilter: "blur(8px)" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Prev button */}
            <button
              onClick={goPrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-gold/50 hover:text-gold hover:bg-white/5 transition-all cursor-pointer"
              style={{ backdropFilter: "blur(8px)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Next button */}
            <button
              onClick={goNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-gold/50 hover:text-gold hover:bg-white/5 transition-all cursor-pointer"
              style={{ backdropFilter: "blur(8px)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Image */}
            <motion.div
              key={selected}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-full flex items-center justify-center px-14 sm:px-20 py-16"
            >
              <Image
                src={PHOTOS[selected].src}
                alt={PHOTOS[selected].alt}
                width={1200}
                height={800}
                className="object-contain w-full h-full max-h-[80vh]"
                priority
              />
            </motion.div>

            {/* Counter */}
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gold/40 font-sans text-xs tracking-widest z-50">
              {selected + 1} / {PHOTOS.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </SlideWrapper>
  );
}
