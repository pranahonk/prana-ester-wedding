"use client";

import { useState, useCallback, useRef, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSwipeGesture from "../hooks/useSwipeGesture";
import BottomNav from "./BottomNav";
import MusicPlayer from "./MusicPlayer";
import CoverSlide from "./slides/CoverSlide";
import GreetingSlide from "./slides/GreetingSlide";
import GroomSlide from "./slides/GroomSlide";
import BrideSlide from "./slides/BrideSlide";
import VerseSlide from "./slides/VerseSlide";
import EventSlide from "./slides/EventSlide";
import RSVPSlide from "./slides/RSVPSlide";
import WishesSlide from "./slides/WishesSlide";
import GiftSlide from "./slides/GiftSlide";
import GallerySlide from "./slides/GallerySlide";
import StorySlide from "./slides/StorySlide";
import ClosingSlide from "./slides/ClosingSlide";

const TOTAL_SLIDES = 12; // 0-11

const SLIDE_HASH_MAP: Record<string, number> = {
  opening: 1,
  groom: 2,
  bride: 3,
  verse: 4,
  event: 5,
  rsvp: 6,
  wishes: 7,
  gift: 8,
  gallery: 9,
  story: 10,
  closing: 11,
};

const INDEX_TO_HASH = Object.fromEntries(
  Object.entries(SLIDE_HASH_MAP).map(([k, v]) => [v, k])
);

// Context for passing active state to slides
export const SlideContext = createContext({ isActive: false, slideIndex: 0 });
export const useSlideContext = () => useContext(SlideContext);

export default function SlideManager({ guestName }: { guestName: string }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isOpen, setIsOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const isTransitioning = useRef(false);
  const initialSlide = useRef<number | null>(null);

  // Read hash on mount to determine initial slide after opening
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && SLIDE_HASH_MAP[hash] !== undefined) {
      initialSlide.current = SLIDE_HASH_MAP[hash];
    }
  }, []);

  const goToSlide = useCallback(
    (target: number) => {
      if (isTransitioning.current) return;
      if (target < 0 || target >= TOTAL_SLIDES) return;
      if (target === currentSlide) return;
      if (!isOpen && target !== 1) return; // Cover must be opened first

      isTransitioning.current = true;
      setDirection(target > currentSlide ? 1 : -1);
      setCurrentSlide(target);

      // Update URL hash without polluting history
      const hash = INDEX_TO_HASH[target];
      if (hash) {
        window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#${hash}`);
      }

      setTimeout(() => {
        isTransitioning.current = false;
      }, 650);
    },
    [currentSlide, isOpen]
  );

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    const target = initialSlide.current ?? 1;
    initialSlide.current = null;

    // Directly set slide state — can't use goToSlide here because
    // isOpen hasn't updated yet in the closure and the guard blocks it
    isTransitioning.current = true;
    setDirection(1);
    setCurrentSlide(target);

    const hash = INDEX_TO_HASH[target];
    if (hash) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#${hash}`);
    }

    setTimeout(() => {
      isTransitioning.current = false;
    }, 650);
  }, []);

  const handleNext = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  const handlePrev = useCallback(() => {
    if (currentSlide <= 1) return; // Can't go back to cover
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  useSwipeGesture({
    onNext: handleNext,
    onPrev: handlePrev,
    enabled: isOpen && !lightboxOpen,
  });

  const slideVariants = {
    enter: (dir: number) => ({
      y: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      y: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  const slides = [
    <CoverSlide key="cover" guestName={guestName} onOpen={handleOpen} />,
    <GreetingSlide key="greeting" />,
    <GroomSlide key="groom" />,
    <BrideSlide key="bride" />,
    <VerseSlide key="verse" />,
    <EventSlide key="event" />,
    <RSVPSlide key="rsvp" />,
    <WishesSlide key="wishes" />,
    <GiftSlide key="gift" />,
    <GallerySlide key="gallery" onLightboxChange={setLightboxOpen} />,
    <StorySlide key="story" />,
    <ClosingSlide key="closing" />,
  ];

  return (
    <div className="fixed inset-0 overflow-hidden bg-navy-darker">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0"
        >
          <SlideContext.Provider value={{ isActive: true, slideIndex: currentSlide }}>
            {slides[currentSlide]}
          </SlideContext.Provider>
        </motion.div>
      </AnimatePresence>

      <MusicPlayer shouldPlay={isOpen} />

      <BottomNav
        currentSlide={currentSlide}
        onNavigate={goToSlide}
        visible={isOpen && currentSlide > 0}
      />
    </div>
  );
}
