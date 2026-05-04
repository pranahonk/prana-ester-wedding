"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TimelineMilestone } from "@/app/data/timelineData";

interface TimelineCardProps {
  milestone: TimelineMilestone;
  isActive: boolean;
  isLeft?: boolean;
}

export default function TimelineCard({
  milestone,
  isActive,
  isLeft = false,
}: TimelineCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      className={`relative flex ${isLeft ? "flex-row-reverse" : "flex-row"} gap-4 mb-8 md:gap-8`}
    >
      {/* Timeline dot and connector line */}
      <div className="flex flex-col items-center">
        <div className="relative z-10 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-gold to-gold/80 flex items-center justify-center text-xl md:text-2xl flex-shrink-0">
          {milestone.emoji}
        </div>
        <div className="w-1 h-16 md:h-20 bg-gold/20 mt-4" />
      </div>

      {/* Card content - always expanded */}
      <div className="flex-1 mt-2">
        <div className="bg-gradient-to-br from-navy/40 to-navy/20 border border-gold/20 rounded-lg p-4 sm:p-6 hover:border-gold/40 transition-all">
          {/* Header with date and title */}
          <div className="mb-3">
            <p className="text-gold/60 text-xs uppercase tracking-wider font-sans">
              {milestone.date}
            </p>
            <h3 className="font-script text-2xl md:text-3xl text-gold mt-1">
              {milestone.title}
            </h3>
          </div>

          {/* Location badge */}
          <p className="text-gold/70 text-sm flex items-center gap-2 mb-4 font-sans">
            <span>📍</span>
            <span>{milestone.location}</span>
          </p>

          {/* Hero photo */}
          <div className="relative w-full h-56 sm:h-64 md:h-72 mb-4 rounded-lg overflow-hidden">
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
        </div>
      </div>
    </motion.div>
  );
}
