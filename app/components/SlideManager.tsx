"use client";

import { useState, useCallback, useRef, createContext, useContext } from "react";
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
import ClosingSlide from "./slides/ClosingSlide";

const TOTAL_SLIDES = 11; // 0-10

// Context for passing active state to slides
export const SlideContext = createContext({ isActive: false, slideIndex: 0 });
export const useSlideContext = () => useContext(SlideContext);

export default function SlideManager({ guestName }: { guestName: string }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isOpen, setIsOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const isTransitioning = useRef(false);

  const goToSlide = useCallback(
    (target: number) => {
      if (isTransitioning.current) return;
      if (target < 0 || target >= TOTAL_SLIDES) return;
      if (target === currentSlide) return;
      if (!isOpen && target !== 1) return; // Cover must be opened first

      isTransitioning.current = true;
      setDirection(target > currentSlide ? 1 : -1);
      setCurrentSlide(target);

      setTimeout(() => {
        isTransitioning.current = false;
      }, 650);
    },
    [currentSlide, isOpen]
  );

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    goToSlide(1);
  }, [goToSlide]);

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
