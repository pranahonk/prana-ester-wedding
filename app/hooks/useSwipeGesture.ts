"use client";

import { useEffect, useRef, useCallback } from "react";

interface SwipeConfig {
  onNext: () => void;
  onPrev: () => void;
  enabled?: boolean;
  threshold?: number;
  velocityThreshold?: number;
}

export default function useSwipeGesture({
  onNext,
  onPrev,
  enabled = true,
  threshold = 50,
  velocityThreshold = 0.3,
}: SwipeConfig) {
  const touchStart = useRef<{ y: number; time: number } | null>(null);
  const wheelAccum = useRef(0);
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isScrollable = useCallback((el: EventTarget | null): boolean => {
    let node = el as HTMLElement | null;
    while (node && node !== document.body) {
      if (node.classList.contains("slide-scrollable")) {
        const { scrollTop, scrollHeight, clientHeight } = node;
        const atTop = scrollTop <= 0;
        const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
        if (!atTop || !atBottom) return true;
      }
      node = node.parentElement;
    }
    return false;
  }, []);

  // Touch events
  useEffect(() => {
    if (!enabled) return;

    function handleTouchStart(e: TouchEvent) {
      touchStart.current = { y: e.touches[0].clientY, time: Date.now() };
    }

    function handleTouchEnd(e: TouchEvent) {
      if (!touchStart.current) return;
      if (isScrollable(e.target)) {
        touchStart.current = null;
        return;
      }

      const deltaY = touchStart.current.y - e.changedTouches[0].clientY;
      const deltaTime = Date.now() - touchStart.current.time;
      const velocity = Math.abs(deltaY) / deltaTime;

      if (Math.abs(deltaY) > threshold || velocity > velocityThreshold) {
        if (deltaY > 0) onNext();
        else onPrev();
      }

      touchStart.current = null;
    }

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [enabled, onNext, onPrev, threshold, velocityThreshold, isScrollable]);

  // Wheel events
  useEffect(() => {
    if (!enabled) return;

    function handleWheel(e: WheelEvent) {
      if (isScrollable(e.target)) return;
      e.preventDefault();

      wheelAccum.current += e.deltaY;
      if (wheelTimer.current) clearTimeout(wheelTimer.current);

      wheelTimer.current = setTimeout(() => {
        if (Math.abs(wheelAccum.current) > 60) {
          if (wheelAccum.current > 0) onNext();
          else onPrev();
        }
        wheelAccum.current = 0;
      }, 80);
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (wheelTimer.current) clearTimeout(wheelTimer.current);
    };
  }, [enabled, onNext, onPrev, isScrollable]);

  // Keyboard events
  useEffect(() => {
    if (!enabled) return;

    function handleKey(e: KeyboardEvent) {
      // Don't intercept when typing in inputs
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        onNext();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        onPrev();
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [enabled, onNext, onPrev]);
}
