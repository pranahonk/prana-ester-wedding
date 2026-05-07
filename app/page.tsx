"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SlideManager from "./components/SlideManager";
import { LanguageProvider } from "./context/LanguageContext";

function WeddingContent() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to")?.replace(/\+/g, " ") || "";

  return (
    <LanguageProvider>
      <SlideManager guestName={guestName} />
    </LanguageProvider>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div
          className="h-[100dvh] flex items-center justify-center"
          style={{
            background: "radial-gradient(ellipse at center, #1B2A4A, #080d18)",
          }}
        >
          <div className="text-center">
            <p className="font-script text-5xl text-gold-shimmer animate-pulse">
              Prana & Ester
            </p>
            <div className="divider-gold mt-4" />
          </div>
        </div>
      }
    >
      <WeddingContent />
    </Suspense>
  );
}
