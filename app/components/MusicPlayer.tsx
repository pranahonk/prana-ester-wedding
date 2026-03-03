"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

// Set to true once you add a music file at public/music/wedding-song.mp3
const MUSIC_ENABLED = false;

export default function MusicPlayer({ shouldPlay }: { shouldPlay: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasMusic, setHasMusic] = useState(false);

  useEffect(() => {
    if (!MUSIC_ENABLED) return;
    fetch("/music/wedding-song.mp3", { method: "HEAD" })
      .then((res) => { if (res.ok) setHasMusic(true); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (shouldPlay && hasMusic && audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [shouldPlay, hasMusic]);

  function toggle() {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }

  if (!hasMusic) return null;

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src="/music/wedding-song.mp3" type="audio/mpeg" />
      </audio>

      <motion.button
        onClick={toggle}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="fixed top-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
        style={{
          background: "linear-gradient(135deg, #1B2A4A 0%, #0F1D33 100%)",
          boxShadow: isPlaying
            ? "0 0 20px rgba(212,175,55,0.25), 0 4px 15px rgba(0,0,0,0.3)"
            : "0 4px 15px rgba(0,0,0,0.3)",
          border: "1px solid rgba(212,175,55,0.25)",
        }}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        <motion.div
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={isPlaying ? { repeat: Infinity, duration: 3, ease: "linear" } : {}}
        >
          {isPlaying ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
              <line x1="2" y1="2" x2="22" y2="22" />
            </svg>
          )}
        </motion.div>

        {/* Ripple effect when playing */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full border border-gold/20"
            animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.button>
    </>
  );
}
