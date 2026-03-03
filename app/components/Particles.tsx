"use client";

import { useMemo } from "react";

// Deterministic pseudo-random number generator (mulberry32)
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface ParticleConfig {
  count: number;
  seed: number;
  sizeMin?: number;
  sizeMax?: number;
  durationMin?: number;
  durationMax?: number;
  leftMin?: number;
  leftMax?: number;
  showOpacity?: boolean;
}

export default function Particles({
  count,
  seed,
  sizeMin = 2,
  sizeMax = 5,
  durationMin = 6,
  durationMax = 14,
  leftMin = 0,
  leftMax = 100,
  showOpacity = true,
}: ParticleConfig) {
  const particles = useMemo(() => {
    const rand = seededRandom(seed);
    return Array.from({ length: count }, () => ({
      left: `${leftMin + rand() * (leftMax - leftMin)}%`,
      animationDuration: `${durationMin + rand() * (durationMax - durationMin)}s`,
      animationDelay: `${rand() * 6}s`,
      width: `${sizeMin + rand() * (sizeMax - sizeMin)}px`,
      height: `${sizeMin + rand() * (sizeMax - sizeMin)}px`,
      ...(showOpacity ? { opacity: 0.4 + rand() * 0.6 } : {}),
    }));
  }, [count, seed, sizeMin, sizeMax, durationMin, durationMax, leftMin, leftMax, showOpacity]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((style, i) => (
        <div key={i} className="particle" style={style} />
      ))}
    </div>
  );
}
