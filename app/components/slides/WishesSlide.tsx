"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SlideWrapper from "./SlideWrapper";
import SlideReveal from "../SlideReveal";
import Particles from "../Particles";
import { useSlideContext } from "../SlideManager";

interface Wish {
  id?: number;
  name: string;
  message: string;
  created_at: string;
}

export default function WishesSlide() {
  const { isActive } = useSlideContext();
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [form, setForm] = useState({ name: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/wishes")
      .then((res) => res.json())
      .then((data) => setWishes(data))
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.message) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, message: form.message }),
      });
      if (res.ok) {
        const newWish = await res.json();
        setWishes((prev) => [newWish, ...prev]);
        setForm({ name: "", message: "" });
        setStatus("success");
        setTimeout(() => setStatus("idle"), 3000);
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const handleTouchStart = () => {
    if (scrollRef.current) {
      scrollRef.current.style.animationPlayState = "paused";
    }
  };

  const handleTouchEnd = () => {
    if (scrollRef.current) {
      scrollRef.current.style.animationPlayState = "running";
    }
  };

  return (
    <SlideWrapper
      allowScroll
      style={{
        background: `
          radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.06) 0%, transparent 50%),
          linear-gradient(180deg, #060a14 0%, #0F1D33 20%, #1B2A4A 50%, #0F1D33 80%, #060a14 100%)
        `,
      }}
      padding="pt-12 sm:pt-16 px-4 sm:px-6 pb-28"
      className="flex flex-col items-center"
    >
      <Particles count={8} seed={701} />

      <div className="max-w-lg mx-auto relative z-10 w-full">
        {/* Header */}
        <SlideReveal isActive={isActive}>
          <div className="text-center mb-6">
            <p className="text-gold/35 text-[9px] sm:text-[10px] tracking-[0.4em] uppercase font-sans mb-2">
              Wishes & Prayers
            </p>
            <h2 className="font-script text-3xl sm:text-4xl text-gold mb-1">
              Ucapan & Doa
            </h2>
            <div className="flex items-center justify-center gap-3 mt-3">
              <div className="w-8 sm:w-14 h-px bg-gradient-to-r from-transparent to-gold/20" />
              <div className="w-1.5 h-1.5 rotate-45 border border-gold/30" />
              <div className="w-8 sm:w-14 h-px bg-gradient-to-l from-transparent to-gold/20" />
            </div>
          </div>
        </SlideReveal>

        {/* Wish Form */}
        <SlideReveal delay={0.1} isActive={isActive}>
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
              <label className="block text-gold/40 font-sans text-[10px] tracking-[0.3em] uppercase mb-2">
                Nama
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-white/[0.03] border border-gold/15 rounded-lg text-gold-light px-4 py-3 font-serif text-base focus:border-gold/40 focus:outline-none transition-all placeholder:text-gold-light/20"
                placeholder="Nama Anda"
                required
              />
            </div>
            <div>
              <label className="block text-gold/40 font-sans text-[10px] tracking-[0.3em] uppercase mb-2">
                Ucapan & Doa
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={3}
                className="w-full bg-white/[0.03] border border-gold/15 rounded-lg text-gold-light px-4 py-3 font-serif text-base focus:border-gold/40 focus:outline-none transition-all resize-none placeholder:text-gold-light/20"
                placeholder="Tulis ucapan & doa..."
                required
              />
            </div>
            <motion.button
              type="submit"
              disabled={status === "loading" || !form.name || !form.message}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-gold to-gold-bright rounded-lg text-navy-deep font-sans text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-medium hover:shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-all duration-500 disabled:opacity-40 cursor-pointer"
            >
              {status === "loading" ? "Mengirim..." : "Kirim Ucapan"}
            </motion.button>
            {status === "success" && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gold text-center font-serif text-sm"
              >
                Terima kasih atas ucapan dan doanya!
              </motion.p>
            )}
          </form>
        </SlideReveal>

        {/* Auto-scrolling wishes wall */}
        {wishes.length > 0 && (
          <SlideReveal delay={0.2} isActive={isActive}>
            <div
              className="overflow-hidden relative"
              style={{ maxHeight: 260 }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onMouseEnter={handleTouchStart}
              onMouseLeave={handleTouchEnd}
            >
              {/* Fade masks */}
              <div className="absolute top-0 left-0 right-0 h-6 z-10 pointer-events-none" style={{ background: "linear-gradient(to bottom, #0F1D33, transparent)" }} />
              <div className="absolute bottom-0 left-0 right-0 h-6 z-10 pointer-events-none" style={{ background: "linear-gradient(to top, #0F1D33, transparent)" }} />

              <div
                ref={scrollRef}
                className="wishes-scroll-container"
              >
                {[...wishes, ...wishes].map((wish, idx) => (
                  <div
                    key={`${wish.id ?? wish.name}-${idx}`}
                    className="relative bg-white/[0.04] backdrop-blur-sm p-3 sm:p-4 border border-gold/8 rounded-lg mb-2"
                  >
                    <div className="absolute top-0 left-0 w-6 h-px bg-gold/20" />
                    <div className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-gold/10 border border-gold/15">
                        <span className="font-script text-sm text-gold/70">{wish.name[0]}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-gold-light font-semibold text-sm">
                          {wish.name}
                        </p>
                        <p className="font-serif text-gold-light/50 text-sm leading-relaxed mt-0.5">
                          {wish.message}
                        </p>
                        <p className="font-sans text-gold/20 text-[9px] mt-1 tracking-wider">
                          {new Date(wish.created_at).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SlideReveal>
        )}
      </div>
    </SlideWrapper>
  );
}
