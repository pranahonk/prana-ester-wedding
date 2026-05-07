"use client";

import { useLanguage } from "../context/LanguageContext";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  // top-20 = MusicPlayer top-6 (24px) + h-12 (48px) + 8px gap
  return (
    <button
      onClick={() => setLang(lang === "id" ? "en" : "id")}
      className="fixed top-20 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center gap-0.5"
      style={{
        background: "linear-gradient(135deg, #1B2A4A 0%, #0F1D33 100%)",
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        border: "1px solid rgba(212,175,55,0.25)",
      }}
      aria-label={lang === "id"
        ? "Current language: Indonesian. Switch to English"
        : "Current language: English. Switch to Indonesian"}
    >
      <span
        className="text-lg leading-none"
        style={{ opacity: lang === "id" ? 1 : 0.35 }}
      >
        🇮🇩
      </span>
      <span
        className="text-lg leading-none"
        style={{ opacity: lang === "en" ? 1 : 0.35 }}
      >
        🇬🇧
      </span>
    </button>
  );
}
