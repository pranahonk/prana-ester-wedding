"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { TimelineMilestone } from "@/app/data/timelineData";

interface TimelineCardProps {
  milestone: TimelineMilestone;
  isExpanded: boolean;
  onToggle: (id: number) => void;
  isActive: boolean;
  isLeft?: boolean;
}

export default function TimelineCard({
  milestone,
  isExpanded,
  onToggle,
  isActive,
  isLeft = false,
}: TimelineCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className={`relative flex ${isLeft ? "flex-row-reverse" : "flex-row"} gap-4 mb-8 md:gap-8`}
    >
      {/* Timeline dot and connector line */}
      <div className="flex flex-col items-center">
        <motion.button
          onClick={() => onToggle(milestone.id)}
          className="relative z-10 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-gold to-gold/80 flex items-center justify-center text-xl md:text-2xl hover:scale-110 transition-transform cursor-pointer flex-shrink-0"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {milestone.emoji}
        </motion.button>
        <div className="w-1 h-16 md:h-20 bg-gold/20 mt-4" />
      </div>

      {/* Card content */}
      <motion.div
        onClick={() => onToggle(milestone.id)}
        className="flex-1 cursor-pointer mt-2"
      >
        <motion.div
          layout
          className="bg-gradient-to-br from-navy/40 to-navy/20 border border-gold/20 rounded-lg p-4 sm:p-6 hover:border-gold/40 transition-all"
        >
          {/* Header with date and title */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <p className="text-gold/60 text-xs uppercase tracking-wider font-sans">
                {milestone.date}
              </p>
              <h3 className="font-script text-2xl md:text-3xl text-gold mt-1">
                {milestone.title}
              </h3>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-gold/40 ml-4 flex-shrink-0"
            >
              ▼
            </motion.div>
          </div>

          {/* Location badge (always visible) */}
          <p className="text-gold/70 text-sm flex items-center gap-2 mb-4 font-sans">
            <span>📍</span>
            <span>{milestone.location}</span>
          </p>

          {/* Expanded content with animation */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                {/* Hero photo */}
                <div className="relative w-full h-56 sm:h-64 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={milestone.photo}
                    alt={milestone.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    priority={milestone.id === 1}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                </div>

                {/* Description text */}
                <p className="text-white/80 text-sm leading-relaxed font-sans">
                  {milestone.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expand hint for collapsed state */}
          {!isExpanded && (
            <p className="text-gold/40 text-xs uppercase tracking-wide mt-2 font-sans">
              Tap to read more
            </p>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
