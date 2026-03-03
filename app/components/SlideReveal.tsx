"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function SlideReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  isActive = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "fade";
  isActive?: boolean;
}) {
  const variants = {
    up: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
    fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      variants={variants[direction]}
      transition={{ duration: 0.8, delay: isActive ? delay : 0, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
