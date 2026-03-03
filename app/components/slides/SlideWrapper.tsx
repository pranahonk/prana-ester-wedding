"use client";

import { ReactNode } from "react";

export default function SlideWrapper({
  children,
  className = "",
  allowScroll = false,
  style,
  padding = "pt-12 sm:pt-16 px-4 sm:px-6 pb-24",
}: {
  children: ReactNode;
  className?: string;
  allowScroll?: boolean;
  style?: React.CSSProperties;
  padding?: string;
}) {
  return (
    <div
      className={`h-[100dvh] w-full relative ${
        allowScroll ? "overflow-y-auto slide-scrollable" : "overflow-hidden"
      } ${padding} ${className}`}
      style={{
        ...style,
      }}
    >
      {children}
    </div>
  );
}
