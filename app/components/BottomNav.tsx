"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS: { label: string; slide?: number; href?: string; icon: React.ReactNode }[] = [
  {
    label: "Opening",
    slide: 1,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.144 20.782v-3.067c0-.777.632-1.408 1.414-1.413h2.875c.786 0 1.423.633 1.423 1.413v3.058c0 .674.548 1.222 1.227 1.227h1.96a3.46 3.46 0 0 0 2.444-1 3.41 3.41 0 0 0 1.013-2.422V9.866c0-.735-.328-1.431-.895-1.902l-6.662-5.29a3.115 3.115 0 0 0-3.958.071L3.467 7.963A2.474 2.474 0 0 0 2.5 9.867v8.703C2.5 20.464 4.047 22 5.956 22h1.916c.327.002.641-.125.873-.354.232-.228.363-.54.363-.864h.036Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Groom",
    slide: 2,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity=".4" d="M11.776 21.837a36.258 36.258 0 0 1-6.328-4.957 12.668 12.668 0 0 1-3.03-4.805C1.278 8.535 2.603 4.49 6.3 3.288A6.282 6.282 0 0 1 12.007 4.3a6.291 6.291 0 0 1 5.706-1.012c3.697 1.201 5.03 5.247 3.893 8.787a12.67 12.67 0 0 1-3.013 4.805 36.58 36.58 0 0 1-6.328 4.957l-.25.163-.24-.163Z" fill="currentColor" />
        <path d="m12.01 22-.234-.163a36.316 36.316 0 0 1-6.337-4.957 12.667 12.667 0 0 1-3.048-4.805c-1.13-3.54.195-7.586 3.892-8.787a6.296 6.296 0 0 1 5.728 1.023V22Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Bride",
    slide: 3,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity=".4" d="M11.776 21.837a36.258 36.258 0 0 1-6.328-4.957 12.668 12.668 0 0 1-3.03-4.805C1.278 8.535 2.603 4.49 6.3 3.288A6.282 6.282 0 0 1 12.007 4.3a6.291 6.291 0 0 1 5.706-1.012c3.697 1.201 5.03 5.247 3.893 8.787a12.67 12.67 0 0 1-3.013 4.805 36.58 36.58 0 0 1-6.328 4.957l-.25.163-.24-.163Z" fill="currentColor" />
        <path d="m12.01 22-.234-.163a36.316 36.316 0 0 1-6.337-4.957 12.667 12.667 0 0 1-3.048-4.805c-1.13-3.54.195-7.586 3.892-8.787a6.296 6.296 0 0 1 5.728 1.023V22Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Ayat",
    slide: 4,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity=".4" d="M16.191 2H7.81C4.77 2 3 3.78 3 6.83v10.33C3 20.26 4.77 22 7.81 22h8.381C19.28 22 21 20.26 21 17.16V6.83C21 3.78 19.28 2 16.191 2" fill="currentColor" />
        <path fillRule="evenodd" clipRule="evenodd" d="M8.08 6.65v.01a.78.78 0 0 0 0 1.56h2.989c.431 0 .781-.35.781-.791a.781.781 0 0 0-.781-.779H8.08Zm7.84 6.09H8.08a.78.78 0 0 1 0-1.561h7.84a.781.781 0 0 1 0 1.561Zm0 4.57H8.08c-.3.04-.59-.11-.75-.36a.795.795 0 0 1 .75-1.21h7.84c.399.04.7.38.7.79 0 .399-.301.74-.7.78Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Acara",
    slide: 5,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M3 16.87V9.257h18v7.674C21 20.07 19.024 22 15.863 22H8.127C4.996 22 3 20.03 3 16.87Zm4.96-2.46a.822.822 0 0 1-.85-.799c0-.46.355-.84.81-.861.444 0 .81.351.82.8a.822.822 0 0 1-.78.86Zm4.06 0a.822.822 0 0 1-.85-.799c0-.46.356-.84.81-.861.445 0 .81.351.82.8a.822.822 0 0 1-.78.86Zm4.03 3.68a.847.847 0 0 1-.82-.85.831.831 0 0 1 .81-.849h.01c.465 0 .84.38.84.849 0 .47-.375.85-.84.85Zm-4.88-.85c.02.46.395.821.85.8a.821.821 0 0 0 .78-.859.817.817 0 0 0-.82-.801.855.855 0 0 0-.81.86Zm-4.07 0c.02.46.395.821.85.8a.821.821 0 0 0 .78-.859.817.817 0 0 0-.82-.801.855.855 0 0 0-.81.86Zm8.14-3.639c0-.46.356-.83.81-.84.445 0 .8.359.82.8a.82.82 0 0 1-.79.849.814.814 0 0 1-.84-.799v-.01Z" fill="currentColor" />
        <path opacity=".4" d="M3.003 9.257c.013-.587.063-1.752.156-2.127.474-2.11 2.084-3.45 4.386-3.64h8.911c2.282.2 3.912 1.55 4.386 3.64.092.365.142 1.539.155 2.127H3.003Z" fill="currentColor" />
        <path d="M8.305 6.59c.435 0 .76-.329.76-.77V2.771A.748.748 0 0 0 8.306 2c-.435 0-.76.33-.76.771V5.82c0 .441.325.77.76.77ZM15.695 6.59c.425 0 .76-.329.76-.77V2.771a.754.754 0 0 0-.76-.771c-.435 0-.76.33-.76.771V5.82c0 .441.325.77.76.77Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "RSVP",
    slide: 6,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity=".4" d="M12.02 2C6.21 2 2 6.74 2 12c0 1.68.49 3.41 1.35 4.99.16.26.18.59.07.9l-.67 2.24c-.15.54.31.94.82.78l2.02-.6c.55-.18.98.05 1.491.36 1.46.86 3.279 1.3 4.919 1.3 4.96 0 10-3.83 10-10C22 6.65 17.7 2 12.02 2Z" fill="currentColor" />
        <path fillRule="evenodd" clipRule="evenodd" d="M11.98 13.29c-.71-.01-1.28-.58-1.28-1.29 0-.7.58-1.28 1.28-1.27.71 0 1.28.57 1.28 1.28 0 .7-.57 1.28-1.28 1.28Zm-4.61 0c-.7 0-1.28-.58-1.28-1.28 0-.71.57-1.28 1.28-1.28.71 0 1.28.57 1.28 1.28 0 .7-.57 1.27-1.28 1.28Zm7.94-1.28c0 .7.57 1.28 1.28 1.28.71 0 1.28-.58 1.28-1.28 0-.71-.57-1.28-1.28-1.28-.71 0-1.28.57-1.28 1.28Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Ucapan",
    slide: 7,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity=".4" d="M17.29 2H6.71C4.21 2 2 4.21 2 6.71v8.58c0 .96.3 1.89.86 2.67l2.2 3.07c.31.44.94.46 1.28.05l1.19-1.43c.34-.41.95-.42 1.31-.03l1.28 1.39c.37.41.99.41 1.37 0l1.28-1.39c.36-.39.97-.38 1.31.03l1.19 1.43c.34.41.97.39 1.28-.05l2.2-3.07c.56-.78.86-1.71.86-2.67V6.71C22 4.21 19.79 2 17.29 2Z" fill="currentColor" />
        <path d="M15.5 10.13H12.75V7.38c0-.41-.34-.75-.75-.75s-.75.34-.75.75v2.75H8.5c-.41 0-.75.34-.75.75s.34.75.75.75h2.75v2.75c0 .41.34.75.75.75s.75-.34.75-.75v-2.75h2.75c.41 0 .75-.34.75-.75s-.34-.75-.75-.75Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Gift",
    slide: 8,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    ),
  },
  {
    label: "Gallery",
    slide: 9,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 14.702v1.384c0 .23-.01.461-.03.69-.28 3.16-2.475 5.224-5.641 5.224H7.67c-1.603 0-2.956-.52-3.928-1.464a4.593 4.593 0 0 1-.951-1.232c.33-.402.7-.842 1.062-1.283a98.56 98.56 0 0 0 1.573-1.925c.55-.682 2.004-2.476 4.018-1.634.41.17.771.41 1.102.621.812.542 1.152.702 1.723.391.632-.34 1.043-1.012 1.473-1.714.23-.372.461-.732.712-1.063 1.092-1.423 2.775-1.804 4.178-.962.702.42 1.303.952 1.864 1.493.12.12.24.231.35.341.15.15.652.652 1.153 1.133Z" fill="currentColor" />
        <path opacity=".4" d="M16.339 2H7.67C4.275 2 2 4.376 2 7.914v8.172c0 1.232.28 2.326.792 3.218.33-.402.701-.842 1.062-1.284a95.981 95.981 0 0 0 1.573-1.924c.551-.682 2.004-2.476 4.018-1.634.41.17.771.41 1.102.621.812.542 1.152.702 1.723.39.632-.34 1.043-1.011 1.473-1.714.23-.37.461-.73.712-1.062 1.092-1.423 2.775-1.804 4.178-.962.702.42 1.303.952 1.864 1.493.12.12.24.231.35.342.151.149.652.65 1.153 1.133V7.914C22 4.376 19.726 2 16.339 2Z" fill="currentColor" />
        <path d="M11.454 8.797a2.604 2.604 0 0 1-2.58 2.581c-1.408 0-2.58-1.173-2.58-2.581s1.172-2.582 2.58-2.582c1.407 0 2.58 1.174 2.58 2.582Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Story",
    href: "/story",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity=".4" d="M17.29 2H6.71C4.21 2 2 4.21 2 6.71v8.58c0 .96.3 1.89.86 2.67l2.2 3.07c.31.44.94.46 1.28.05l1.19-1.43c.34-.41.95-.42 1.31-.03l1.28 1.39c.37.41.99.41 1.37 0l1.28-1.39c.36-.39.97-.38 1.31.03l1.19 1.43c.34.41.97.39 1.28-.05l2.2-3.07c.56-.78.86-1.71.86-2.67V6.71C22 4.21 19.79 2 17.29 2Z" fill="currentColor" />
        <path d="M10.75 8.63c0-.41.34-.75.75-.75s.75.34.75.75v2.75h2.75c.41 0 .75.34.75.75s-.34.75-.75.75H12.25v2.75c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-2.75H8c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h2.75V8.63Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Thanks",
    slide: 10,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity=".4" d="M16.34 2H7.67C4.28 2 2 4.38 2 7.92v8.17C2 19.62 4.28 22 7.67 22h8.67c3.39 0 5.66-2.38 5.66-5.91V7.92C22 4.38 19.73 2 16.34 2Z" fill="currentColor" />
        <path d="M10.813 15.248a.872.872 0 0 1-.619-.256l-2.373-2.373a.874.874 0 1 1 1.237-1.238l1.755 1.755 4.128-4.128a.874.874 0 1 1 1.237 1.238l-4.746 4.746a.872.872 0 0 1-.619.256Z" fill="currentColor" />
      </svg>
    ),
  },
];

export default function BottomNav({
  currentSlide,
  onNavigate,
  visible,
}: {
  currentSlide: number;
  onNavigate: (slide: number) => void;
  visible: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Find which nav item is closest active match (for slide-based items)
  function getActiveIdx() {
    for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
      if (NAV_ITEMS[i].slide && currentSlide >= NAV_ITEMS[i].slide!) return i;
    }
    return 0;
  }
  const activeIndex = getActiveIdx();

  // Auto-scroll active item into view
  useEffect(() => {
    if (!scrollRef.current) return;
    const ul = scrollRef.current.querySelector("ul");
    if (!ul) return;
    const activeEl = ul.children[activeIndex] as HTMLElement | undefined;
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [activeIndex]);

  if (!visible) return null;

  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-0 left-0 right-0 z-30"
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
        background: "rgba(15, 29, 51, 0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: "0 -1px 8px rgba(0, 0, 0, 0.25)",
        borderTop: "1px solid rgba(212, 175, 55, 0.1)",
      }}
    >
      <div
        ref={scrollRef}
        className="overflow-x-auto"
        style={{
          height: 72,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>{`
          nav div::-webkit-scrollbar { display: none; }
          @media (min-width: 768px) {
            .nav-list { width: 100% !important; max-width: 800px; margin: 0 auto; }
            .nav-item { flex: 1 1 0% !important; width: auto !important; min-width: 0 !important; max-width: none !important; }
          }
        `}</style>
        <ul
          className="nav-list flex items-center justify-center list-none m-0 p-0 h-full"
          style={{ minWidth: "100%", width: "max-content", margin: "0 auto" }}
        >
        {NAV_ITEMS.map((item, idx) => {
          const isActive = item.href
            ? pathname === item.href
            : idx === activeIndex;

          const navContent = (
            <>
              {/* Active background */}
              {isActive && (
                <motion.div
                  layoutId="nav-active-bg"
                  className="absolute rounded-xl"
                  style={{
                    inset: "4px 6px",
                    background: "rgba(212, 175, 55, 0.1)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.icon}</span>
              <span
                className="relative z-10 font-sans leading-none"
                style={{ fontSize: 10 }}
              >
                {item.label}
              </span>
            </>
          );

          return (
            <li
              key={item.label}
              className="nav-item flex-none"
              style={{ width: 76, minWidth: 72, maxWidth: 88 }}
            >
              {item.href ? (
                <Link
                  href={item.href}
                  className="relative flex flex-col items-center justify-center w-full h-full cursor-pointer transition-colors duration-200 gap-1 py-2"
                  style={{ color: isActive ? "#D4AF37" : "rgba(212, 175, 55, 0.3)" }}
                >
                  {navContent}
                </Link>
              ) : (
                <button
                  onClick={() => onNavigate(item.slide!)}
                  className="relative flex flex-col items-center justify-center w-full h-full cursor-pointer transition-colors duration-200 gap-1 py-2"
                  style={{ color: isActive ? "#D4AF37" : "rgba(212, 175, 55, 0.3)" }}
                >
                  {navContent}
                </button>
              )}
            </li>
          );
        })}
      </ul>
      </div>
    </motion.nav>
  );
}
