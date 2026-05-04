"use client";

import { motion } from "framer-motion";
import Timeline from "./components/Timeline";
import { timelineData } from "@/app/data/timelineData";
import Link from "next/link";

export default function StoryPage() {
  return (
    <div
      className="min-h-screen py-12 sm:py-16 md:py-20 px-4"
      style={{
        background: `
          radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.06) 0%, transparent 50%),
          linear-gradient(180deg, #060a14 0%, #0F1D33 25%, #1B2A4A 50%, #0F1D33 75%, #060a14 100%)
        `,
      }}
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 sm:mb-16 md:mb-20 max-w-2xl mx-auto"
      >
        <p className="text-gold/40 text-xs sm:text-sm uppercase tracking-[0.3em] mb-4 font-sans">
          Our Journey
        </p>
        <h1 className="font-script text-4xl sm:text-5xl md:text-6xl text-gold mb-4">
          Our Story
        </h1>
        <p className="text-gold/70 text-lg sm:text-xl font-sans mb-6">
          A Journey of Love
        </p>
        
        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-gradient-to-r from-transparent to-gold/30" />
          <div className="w-2 h-2 rotate-45 border border-gold/40" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-gradient-to-l from-transparent to-gold/30" />
        </div>
      </motion.div>

      {/* Timeline Section */}
      <Timeline milestones={timelineData} />

      {/* Footer Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center mt-16 sm:mt-20 md:mt-28 max-w-2xl mx-auto"
      >
        <p className="text-gold/60 text-lg sm:text-xl mb-8 font-sans">
          Let's celebrate this beautiful journey together
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 sm:px-8 py-3 border border-gold/40 text-gold hover:bg-gold/10 transition-all rounded-lg font-sans text-sm sm:text-base"
          >
            Back to Wedding
          </Link>
          <Link
            href="/#event"
            className="px-6 sm:px-8 py-3 bg-gold/20 border border-gold/40 text-gold hover:bg-gold/30 transition-all rounded-lg font-sans text-sm sm:text-base"
          >
            View Events
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
