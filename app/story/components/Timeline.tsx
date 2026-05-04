"use client";

import { useState, useEffect } from "react";
import TimelineCard from "./TimelineCard";
import { TimelineMilestone } from "@/app/data/timelineData";

interface TimelineProps {
  milestones: TimelineMilestone[];
}

export default function Timeline({ milestones }: TimelineProps) {
  const [activeIds, setActiveIds] = useState<Set<number>>(new Set());
  const [isWideScreen, setIsWideScreen] = useState(false);

  useEffect(() => {
    setIsWideScreen(window.innerWidth > 768);

    const handleResize = () => setIsWideScreen(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);

    const observer = new IntersectionObserver(
      (entries) => {
        const newActive = new Set(activeIds);
        entries.forEach((entry) => {
          const id = parseInt(
            entry.target.getAttribute("data-milestone-id") || "0"
          );
          if (entry.isIntersecting) {
            newActive.add(id);
          }
        });
        setActiveIds(newActive);
      },
      { threshold: 0.5 }
    );

    setTimeout(() => {
      document.querySelectorAll("[data-milestone-id]").forEach((el) => {
        observer.observe(el);
      });
    }, 0);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative py-8 sm:py-12">
      {/* Vertical timeline line */}
      <div className="absolute left-[1.75rem] md:left-1/2 top-0 bottom-0 w-1 bg-gold/10 transform md:-translate-x-1/2" />

      {/* Timeline cards - always visible */}
      <div className="space-y-8 relative z-10 max-w-2xl mx-auto px-4">
        {milestones.map((milestone, idx) => (
          <div key={milestone.id} data-milestone-id={milestone.id}>
            <TimelineCard
              milestone={milestone}
              isActive={activeIds.has(milestone.id)}
              isLeft={idx % 2 === 0 && isWideScreen}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
