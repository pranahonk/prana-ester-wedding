"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SlideWrapper from "./SlideWrapper";
import SlideReveal from "../SlideReveal";
import Particles from "../Particles";
import { useSlideContext } from "../SlideManager";

export default function RSVPSlide() {
  const { isActive } = useSlideContext();
  const [form, setForm] = useState({ name: "", eventType: "", phone: "", attendance: "", guests: "1" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.attendance) return;
    if (form.attendance === "yes" && !form.eventType) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          event_type: form.eventType,
          phone: form.phone,
          attendance: form.attendance,
          guests: parseInt(form.guests),
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", eventType: "", phone: "", attendance: "", guests: "1" });
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <SlideWrapper
      style={{
        background: `
          radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.06) 0%, transparent 50%),
          linear-gradient(180deg, #060a14 0%, #0F1D33 20%, #1B2A4A 50%, #0F1D33 80%, #060a14 100%)
        `,
      }}
      padding="pt-12 sm:pt-16 px-4 sm:px-6 pb-28"
      className="flex flex-col items-center"
    >
      <Particles count={8} seed={601} />

      <div className="max-w-lg mx-auto relative z-10 w-full overflow-y-auto h-full">
        {/* Header */}
        <SlideReveal isActive={isActive}>
          <div className="text-center mb-8">
            <p className="text-gold/35 text-[9px] sm:text-[10px] tracking-[0.4em] uppercase font-sans mb-2">
              RSVP
            </p>
            <h2 className="font-script text-3xl sm:text-4xl text-gold mb-1">
              Konfirmasi Kehadiran
            </h2>
            <div className="flex items-center justify-center gap-3 mt-3">
              <div className="w-8 sm:w-14 h-px bg-gradient-to-r from-transparent to-gold/20" />
              <div className="w-1.5 h-1.5 rotate-45 border border-gold/30" />
              <div className="w-8 sm:w-14 h-px bg-gradient-to-l from-transparent to-gold/20" />
            </div>
          </div>
        </SlideReveal>

        {/* RSVP Form */}
        <SlideReveal delay={0.1} isActive={isActive}>
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-14 h-14 rounded-full border border-gold/30 flex items-center justify-center mx-auto mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="font-script text-3xl text-gold mb-3">Terima Kasih!</p>
              <p className="font-serif text-gold-light/50 text-base">
                Konfirmasi kehadiran Anda telah kami terima.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gold/40 font-sans text-[10px] tracking-[0.3em] uppercase mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white/[0.03] border border-gold/15 rounded-lg text-gold-light px-4 py-3 font-serif text-base focus:border-gold/40 focus:outline-none focus:bg-white/[0.05] transition-all placeholder:text-gold-light/20"
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </div>

              <div>
                <label className="block text-gold/40 font-sans text-[10px] tracking-[0.3em] uppercase mb-2">
                  No. WhatsApp
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-white/[0.03] border border-gold/15 rounded-lg text-gold-light px-4 py-3 font-serif text-base focus:border-gold/40 focus:outline-none focus:bg-white/[0.05] transition-all placeholder:text-gold-light/20"
                  placeholder="08xxxxxxxxxx"
                  required
                />
              </div>

              <div>
                <label className="block text-gold/40 font-sans text-[10px] tracking-[0.3em] uppercase mb-2">
                  Kehadiran
                </label>
                <div className="flex gap-2">
                  {[
                    { value: "yes", label: "Hadir" },
                    { value: "no", label: "Tidak Hadir" },
                  ].map((opt) => (
                    <motion.button
                      key={opt.value}
                      type="button"
                      onClick={() => setForm({ ...form, attendance: opt.value })}
                      whileTap={{ scale: 0.98 }}
                      className={`flex-1 py-3 border rounded-lg text-[10px] sm:text-[11px] font-sans tracking-[0.2em] uppercase transition-all duration-500 cursor-pointer ${
                        form.attendance === opt.value
                          ? "border-gold bg-gold/15 text-gold"
                          : "border-gold/15 text-gold/40 hover:border-gold/30 hover:text-gold/60"
                      }`}
                    >
                      {opt.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {form.attendance === "yes" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-gold/40 font-sans text-[10px] tracking-[0.3em] uppercase mb-2">
                      Acara yang Dihadiri
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {[
                        { value: "both", label: "Pemberkatan + Resepsi" },
                        { value: "reception", label: "Resepsi Saja" },
                      ].map((opt) => (
                        <motion.button
                          key={opt.value}
                          type="button"
                          onClick={() => setForm({ ...form, eventType: opt.value })}
                          whileTap={{ scale: 0.98 }}
                          className={`px-4 py-2.5 border rounded-lg text-[10px] sm:text-[11px] font-sans tracking-[0.15em] uppercase transition-all duration-500 cursor-pointer ${
                            form.eventType === opt.value
                              ? "border-gold bg-gold/15 text-gold"
                              : "border-gold/15 text-gold/40 hover:border-gold/30 hover:text-gold/60"
                          }`}
                        >
                          {opt.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gold/40 font-sans text-[10px] tracking-[0.3em] uppercase mb-2">
                      Jumlah Tamu
                    </label>
                    <select
                      value={form.guests}
                      onChange={(e) => setForm({ ...form, guests: e.target.value })}
                      className="w-full bg-white/[0.03] border border-gold/15 rounded-lg text-gold-light px-4 py-3 font-serif text-base focus:border-gold/40 focus:outline-none transition-all"
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n} className="bg-navy-deep text-white">
                          {n} orang
                        </option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={status === "loading" || !form.name || !form.phone || !form.attendance || (form.attendance === "yes" && !form.eventType)}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-gold to-gold-bright rounded-lg text-navy-deep font-sans text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-medium hover:shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-all duration-500 disabled:opacity-40 cursor-pointer"
              >
                {status === "loading" ? "Mengirim..." : "Kirim RSVP"}
              </motion.button>

              {status === "error" && (
                <p className="text-red-400/80 text-center font-sans text-xs tracking-wider">
                  Terjadi kesalahan. Silakan coba lagi.
                </p>
              )}
            </form>
          )}
        </SlideReveal>
      </div>
    </SlideWrapper>
  );
}
