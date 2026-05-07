"use client";

import SlideWrapper from "./SlideWrapper";
import Timeline from "@/app/story/components/Timeline";
import { timelineData } from "@/app/data/timelineData";
import { useLanguage } from "../../context/LanguageContext";

export default function StorySlide() {
  const { t } = useLanguage();

  return (
    <SlideWrapper padding="pt-8 sm:pt-10 px-4 sm:px-6 pb-24">
      <div className="max-w-3xl mx-auto overflow-y-auto h-full">
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-gold/40 text-xs sm:text-sm uppercase tracking-[0.3em] mb-3 font-sans">
            {t.story.sectionLabel}
          </p>
          <h1 className="font-script text-4xl sm:text-5xl text-gold mb-3">
            {t.story.heading}
          </h1>
          <p className="text-gold/70 text-sm sm:text-base font-sans">
            {t.story.subtitle}
          </p>
        </div>

        {/* Timeline component */}
        <Timeline milestones={timelineData} />
      </div>
    </SlideWrapper>
  );
}
