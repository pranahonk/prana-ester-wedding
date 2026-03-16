"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene3D } from "./components/Scene3D";
import { Overlay } from "./components/Overlay";

const SECTIONS = [
  "home", "groom", "bride", "verse", "events",
  "rsvp", "wishes", "gift", "gallery", "thanks",
] as const;

const LABELS: Record<string, string> = {
  home: "HOME", groom: "GROOM", bride: "BRIDE", verse: "AYAT",
  events: "ACARA", rsvp: "RSVP", wishes: "UCAPAN", gift: "GIFT",
  gallery: "GALLERY", thanks: "THANKS",
};

export default function Wedding3DPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const total = SECTIONS.length;

  useEffect(() => {
    const t = setTimeout(() => {
      setLoaded(true);
      // Auto-play music after preloader (may be blocked by browser, that's ok)
      if (audioRef.current) {
        audioRef.current.play().then(() => setMusicPlaying(true)).catch(() => {});
      }
    }, 2200);
    return () => clearTimeout(t);
  }, []);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const max = el.scrollHeight - el.clientHeight;
    const p = max > 0 ? el.scrollTop / max : 0;
    setScrollProgress(p);
    setCurrentSection(Math.min(Math.floor(p * total), total - 1));
  }, [total]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    musicPlaying ? audioRef.current.pause() : audioRef.current.play();
    setMusicPlaying(!musicPlaying);
  };

  const scrollTo = (i: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ top: (i / total) * (el.scrollHeight - el.clientHeight), behavior: "smooth" });
  };

  return (
    <div className="relative w-screen h-[100dvh] overflow-hidden bg-[#050a14]">
      {/* Preloader */}
      <div className={`fixed inset-0 z-[200] bg-[#050a14] flex flex-col items-center justify-center transition-all duration-1000 ${loaded ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        <p className="font-sans text-[9px] tracking-[0.5em] text-gold/25 uppercase mb-3">
          {"THE WEDDING OF".split("").map((c, i) => (
            <span key={i} className="inline-block animate-[fadeUp_0.5s_ease_forwards]" style={{ animationDelay: `${i * 0.04}s`, opacity: 0 }}>
              {c === " " ? "\u00A0" : c}
            </span>
          ))}
        </p>
        <h1 className="text-3xl sm:text-5xl font-display text-gold-light tracking-[0.08em]">
          {"PRANA & ESTER".split("").map((c, i) => (
            <span key={i} className="inline-block animate-[fadeUp_0.6s_ease_forwards]" style={{ animationDelay: `${0.6 + i * 0.05}s`, opacity: 0 }}>
              {c === " " ? "\u00A0" : c}
            </span>
          ))}
        </h1>
        <div className="mt-5 h-px w-32 bg-gradient-to-r from-transparent via-gold/25 to-transparent animate-[scaleX_1.5s_ease_forwards]" style={{ animationDelay: "1.5s", transform: "scaleX(0)" }} />
      </div>

      {/* Scanline */}
      <div className="fixed inset-0 z-[90] pointer-events-none opacity-[0.02]" style={{ background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(212,175,55,0.08) 2px,rgba(212,175,55,0.08) 4px)" }} />

      {/* 3D Background — sphere + particles, purely ambient */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} style={{ background: "#050a14" }}>
          <Scene3D scrollProgress={scrollProgress} currentSection={currentSection} />
        </Canvas>
      </div>

      {/* Scrollable content */}
      <div ref={containerRef} className="relative z-10 h-[100dvh] overflow-y-auto overflow-x-hidden scroll-smooth"
        style={{ WebkitOverflowScrolling: "touch" }}>
        <Overlay scrollProgress={scrollProgress} />
      </div>

      {/* Left nav — hidden on small mobile, visible on larger screens */}
      <div className="fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 hidden sm:flex flex-col items-start gap-0.5">
        {SECTIONS.map((name, i) => (
          <button key={name} onClick={() => scrollTo(i)}
            className={`group flex items-center gap-1.5 py-0.5 transition-all duration-500 ${currentSection === i ? "opacity-100" : "opacity-15 hover:opacity-40"}`}>
            <div className={`h-px transition-all duration-500 ${currentSection === i ? "w-5 bg-gold" : "w-2 bg-gold/50"}`} />
            <span className={`text-[7px] font-sans tracking-[0.25em] ${currentSection === i ? "text-gold" : "text-gold/40"}`}>{LABELS[name]}</span>
          </button>
        ))}
      </div>

      {/* Top center — P & E */}
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50">
        <div className="px-3 py-1 bg-black/30 backdrop-blur-xl border border-gold/10 rounded-sm">
          <span className="font-script text-gold text-xs sm:text-sm">P & E</span>
        </div>
      </div>

      {/* Top right — coordinates */}
      <div className="fixed top-3 right-2 sm:right-4 z-50 text-right hidden sm:block">
        <p className="text-[7px] font-sans tracking-[0.15em] text-gold/15">6.1751°S, 106.8650°E</p>
        <p className="text-[7px] font-sans tracking-[0.15em] text-gold/10">JAKARTA — 30.05.2026</p>
      </div>

      {/* Bottom progress */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
        <span className="text-[8px] font-sans text-gold/40 tracking-wider">{String(currentSection + 1).padStart(2, "0")}</span>
        <div className="w-8 sm:w-12 h-px bg-gold/8 relative">
          <div className="absolute top-0 left-0 h-full bg-gold/40 transition-all duration-700" style={{ width: `${((currentSection + 1) / total) * 100}%` }} />
        </div>
        <span className="text-[8px] font-sans text-gold/15 tracking-wider">{String(total).padStart(2, "0")}</span>
      </div>

      {/* Music — top right, matching main site */}
      <button onClick={toggleMusic} aria-label={musicPlaying ? "Pause music" : "Play music"}
        className="fixed top-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
        style={{
          background: "linear-gradient(135deg, #1B2A4A 0%, #0F1D33 100%)",
          boxShadow: musicPlaying ? "0 0 20px rgba(212,175,55,0.25), 0 4px 15px rgba(0,0,0,0.3)" : "0 4px 15px rgba(0,0,0,0.3)",
          border: "1px solid rgba(212,175,55,0.25)",
        }}>
        <div style={musicPlaying ? { animation: "spin 4s linear infinite" } : undefined}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={musicPlaying ? 1 : 0.5}>
            <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
            {!musicPlaying && <line x1="2" y1="2" x2="22" y2="22" />}
          </svg>
        </div>
        {musicPlaying && <div className="absolute inset-0 rounded-full border border-gold/20 animate-ping" style={{ animationDuration: "2s" }} />}
      </button>
      <audio ref={audioRef} loop preload="auto"><source src="/music/yellow-acoustic.mp3" type="audio/mpeg" /></audio>

      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scaleX { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>
    </div>
  );
}
