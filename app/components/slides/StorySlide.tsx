"use client";

import SlideWrapper from "./SlideWrapper";
import Timeline from "@/app/story/components/Timeline";
import { timelineData } from "@/app/data/timelineData";

export default function StorySlide() {
  return (
    <SlideWrapper allowScroll padding="pt-8 sm:pt-10 px-4 sm:px-6 pb-24">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-gold/40 text-xs sm:text-sm uppercase tracking-[0.3em] mb-3 font-sans">
            Our Journey
          </p>
          <h1 className="font-script text-4xl sm:text-5xl text-gold mb-3">
            Our Story
          </h1>
          <p className="text-gold/70 text-sm sm:text-base font-sans">
            A Journey of Love
          </p>
        </div>

        {/* Timeline component */}
        <Timeline milestones={timelineData} />
      </div>
    </SlideWrapper>
  );
}
