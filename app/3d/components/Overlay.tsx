"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

/* ── Animation ───────────────────────────────────── */
const ease = [0.625, 0.05, 0, 1] as const;
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } };
const fadeLeft = { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease } } };
const fadeRight = { hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease } } };

function ST({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <span ref={ref} className={`inline-block overflow-hidden ${className}`}>
      {text.split("").map((c, i) => (
        <motion.span key={i} className="inline-block"
          initial={{ y: "110%", opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}
          transition={{ duration: 0.5, ease, delay: delay + i * 0.035 }}>
          {c === " " ? "\u00A0" : c}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Section — smooth reveal on scroll into view ── */
function S({ children, className = "", id }: { children: React.ReactNode; className?: string; id: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.15, margin: "0px" });

  return (
    <section ref={ref} id={id}
      className={`min-h-[100dvh] flex flex-col items-center justify-center px-6 sm:px-8 py-16 sm:py-20 relative ${className}`}>
      <motion.div
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full flex flex-col items-center"
      >
        {children}
      </motion.div>
    </section>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function A({ children, v = fadeUp, className = "", delay = 0 }: { children: React.ReactNode; v?: any; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"}
      variants={{ ...v, visible: { ...v.visible, transition: { ...(v.visible.transition as object), delay } } }}
      className={className}>{children}</motion.div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-xs sm:text-sm font-sans uppercase tracking-[0.4em] text-gold/50 mb-3 sm:mb-4">{children}</p>;
}

function Frame({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-t border-l border-gold/15" />
      <div className="absolute top-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-t border-r border-gold/15" />
      <div className="absolute bottom-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-b border-l border-gold/15" />
      <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-b border-r border-gold/15" />
    </div>
  );
}

function Divider() {
  return <div className="w-20 sm:w-24 h-px mx-auto bg-gradient-to-r from-transparent via-gold/40 to-transparent my-3" />;
}

function useCountdown(target: string) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const end = new Date(target).getTime();
    const tick = () => { const diff = Math.max(0, end - Date.now()); setT({ d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) }); };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, [target]);
  return t;
}

/* ════════════════════════════════════════════════════
   HOME — matching CoverSlide style
   ════════════════════════════════════════════════════ */
function HomeSection() {
  return (
    <S id="home">
      <div className="relative z-10 flex flex-col items-center w-full max-w-sm mx-auto text-center">
        <A delay={0.3}><Label>THE WEDDING OF</Label></A>

        <A v={scaleIn} delay={0.5} className="w-full mb-5">
          <div className="relative mx-auto px-3" style={{ maxWidth: 280 }}>
            <Frame />
            <div className="py-2.5">
              <div className="w-full aspect-[4/3] rounded overflow-hidden border border-gold/10">
                <img src="/photos/gallery-05.webp" alt="Prana & Ester" className="w-full h-full object-cover object-[center_30%]" />
              </div>
            </div>
          </div>
        </A>

        <A delay={0.7}>
          <h2 className="text-5xl sm:text-7xl font-script text-gold-shimmer py-2 leading-[1.3]">Prana</h2>
        </A>
        <A delay={0.8}><Divider /></A>
        <A delay={0.9}>
          <h2 className="text-5xl sm:text-7xl font-script text-gold-shimmer py-2 leading-[1.3]">Ester</h2>
        </A>

        <A delay={1.1}>
          <p className="mt-4 text-sm sm:text-base font-display tracking-[0.2em] text-gold-light/60">30 . 05 . 2026</p>
        </A>

        <A delay={1.3}><p className="mt-3 text-gold/35 text-sm font-sans tracking-[0.12em]">JAKARTA, INDONESIA</p></A>

        <motion.div className="mt-10 flex flex-col items-center gap-1"
          initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ delay: 1.8, duration: 1 }}>
          <span className="text-xs font-sans tracking-[0.3em] text-gold/40">SCROLL</span>
          <div className="w-px h-5 bg-gradient-to-b from-gold/25 to-transparent animate-pulse" />
        </motion.div>
      </div>
    </S>
  );
}

/* ════════════════════════════════════════════════════
   PROFILE
   ════════════════════════════════════════════════════ */
function Profile({ id, label, name, parents, ig, handle, photo, dir = "left" }: {
  id: string; label: string; name: string; parents: string; ig: string; handle: string; photo: string; dir?: "left" | "right";
}) {
  const v = dir === "left" ? fadeLeft : fadeRight;
  return (
    <S id={id}>
      <div className="max-w-xs sm:max-w-sm text-center">
        <A v={v}><Label>{label}</Label></A>
        <A v={scaleIn} delay={0.1}>
          <div className="relative inline-block mb-5 group">
            <div className="absolute -inset-3 border border-gold/6 rotate-[5deg] group-hover:rotate-[2deg] transition-transform duration-700" />
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full border border-gold/12 p-[2px] overflow-hidden">
              <img alt={name} className="w-full h-full object-cover rounded-full" src={photo} />
            </div>
          </div>
        </A>
        <A v={v} delay={0.2}>
          <h3 className="text-xl sm:text-2xl font-display text-gold-light mb-1.5">{name}</h3>
          <p className="text-gold/50 text-base font-serif mb-3" dangerouslySetInnerHTML={{ __html: parents }} />
          <a className="inline-flex items-center gap-1.5 text-gold/45 hover:text-gold/70 transition text-sm font-sans tracking-[0.1em]" href={ig} target="_blank" rel="noopener noreferrer">
            @{handle.replace("@", "")}
          </a>
        </A>
      </div>
    </S>
  );
}

/* ════════════════════════════════════════════════════
   VERSE
   ════════════════════════════════════════════════════ */
function VerseSection() {
  return (
    <S id="verse">
      <div className="max-w-xs sm:max-w-sm text-center">
        <A v={scaleIn}>
          <div className="relative p-6 sm:p-8 bg-black/40 backdrop-blur-sm rounded-lg">
            <Frame />
            <span className="text-3xl sm:text-4xl font-script text-gold/25 block mb-3">&ldquo;</span>
            <p className="text-base sm:text-lg font-serif italic text-gold-light/75 leading-[1.9]">
              Demikianlah mereka bukan lagi dua, melainkan satu. Karena itu, apa yang telah dipersatukan Allah, tidak boleh diceraikan manusia.
            </p>
            <Divider />
            <p className="text-xs sm:text-sm font-sans uppercase tracking-[0.4em] text-gold/50">Markus 10:9</p>
            <span className="text-3xl sm:text-4xl font-script text-gold/25 block mt-3 rotate-180">&rdquo;</span>
          </div>
        </A>
      </div>
    </S>
  );
}

/* ════════════════════════════════════════════════════
   EVENTS — with embedded maps
   ════════════════════════════════════════════════════ */
function EventsSection() {
  const c = useCountdown("May 30, 2026 09:30:00");
  return (
    <S id="events">
      <div className="max-w-sm sm:max-w-md w-full">
        <A className="text-center mb-6">
          <Label>SAVE THE DATE</Label>
          <h2 className="text-2xl sm:text-3xl font-script text-gold-shimmer mb-3">Acara Pernikahan</h2>
          <Divider />
          {/* Countdown */}
          <div className="flex justify-center gap-2 mt-4">
            {[{ v: c.d, l: "Hari" }, { v: c.h, l: "Jam" }, { v: c.m, l: "Menit" }, { v: c.s, l: "Detik" }].map((item) => (
              <div key={item.l} className="w-16 h-16 sm:w-18 sm:h-18 flex flex-col items-center justify-center rounded-lg" style={{ background: "rgba(212,175,55,0.08)" }}>
                <span className="text-lg sm:text-xl font-display font-bold text-gold-shimmer">{String(item.v).padStart(2, "0")}</span>
                <span className="text-[10px] text-gold/40 font-sans">{item.l}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm font-serif text-gold-light/50">Sabtu, 30 Mei 2026</p>
        </A>

        {/* Resepsi */}
        <A v={fadeLeft} className="mb-4">
          <div className="relative p-5 sm:p-6 bg-black/40 backdrop-blur-sm rounded-lg border border-gold/10">
            <p className="text-sm text-gold tracking-[0.25em] mb-1 font-sans font-bold">RESEPSI PERNIKAHAN</p>
            <p className="text-gold-light/70 text-base font-serif">13:00 WIB - Selesai</p>
            <p className="text-gold-light/50 text-sm italic font-serif mt-1">Roemah Kopi Sandjaja<br />Kelapa Gading, Jakarta Utara</p>
            {/* Embedded Map */}
            <div className="mt-3 rounded-lg overflow-hidden border border-gold/10">
              <iframe
                src="https://maps.google.com/maps?q=Roemah+Kopi+Sandjaja+Kelapa+Gading&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%" height="150"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)" }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Lokasi Resepsi"
              />
            </div>
            <a className="inline-flex items-center gap-1.5 mt-3 px-4 py-2 border border-gold/20 rounded-lg text-gold text-sm font-sans hover:bg-gold/10 active:scale-[0.97] transition"
              href="https://maps.app.goo.gl/hqueMQCEknq6c1RN8" target="_blank">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Lihat Lokasi
            </a>
          </div>
        </A>

        {/* Pemberkatan */}
        <A v={fadeRight} delay={0.15}>
          <div className="relative p-5 sm:p-6 bg-black/40 backdrop-blur-sm rounded-lg border border-gold/10">
            <p className="text-sm text-gold tracking-[0.25em] mb-1 font-sans font-bold">PEMBERKATAN NIKAH</p>
            <p className="text-gold-light/70 text-base font-serif">09:30 WIB</p>
            <p className="text-gold-light/50 text-sm italic font-serif mt-1">GMS Kelapa Gading<br />Kelapa Gading, Jakarta Utara</p>
            <div className="mt-3 rounded-lg overflow-hidden border border-gold/10">
              <iframe
                src="https://maps.google.com/maps?q=GMS+Kelapa+Gading+Jakarta&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%" height="150"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)" }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Lokasi Pemberkatan"
              />
            </div>
            <a className="inline-flex items-center gap-1.5 mt-3 px-4 py-2 border border-gold/20 rounded-lg text-gold text-sm font-sans hover:bg-gold/10 active:scale-[0.97] transition"
              href="https://maps.google.com/?q=GMS+Kelapa+Gading+Jakarta" target="_blank">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Lihat Lokasi
            </a>
          </div>
        </A>
      </div>
    </S>
  );
}

/* ════════════════════════════════════════════════════
   RSVP
   ════════════════════════════════════════════════════ */
function RSVPSection() {
  const [done, setDone] = useState(false);
  const [attendance, setAttendance] = useState<"hadir" | "tidak">("hadir");
  const [event, setEvent] = useState<"both" | "resepsi">("both");

  return (
    <S id="rsvp">
      <div className="max-w-lg w-full">
        {/* Header */}
        <A className="text-center mb-8">
          <p className="text-gold/35 text-xs sm:text-sm tracking-[0.4em] uppercase font-sans mb-2">RSVP</p>
          <h2 className="font-script text-3xl sm:text-4xl text-gold mb-1 py-1 leading-[1.3]">Konfirmasi Kehadiran</h2>
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="w-8 sm:w-14 h-px bg-gradient-to-r from-transparent to-gold/20" />
            <div className="w-1.5 h-1.5 rotate-45 border border-gold/30" />
            <div className="w-8 sm:w-14 h-px bg-gradient-to-l from-transparent to-gold/20" />
          </div>
        </A>

        {done ? (
          <A>
            <div className="text-center py-10">
              <div className="text-4xl text-gold mb-3">&#10003;</div>
              <p className="text-gold font-sans text-lg tracking-[0.1em]">Terima Kasih!</p>
              <p className="text-gold/40 font-serif text-sm mt-2">RSVP Anda telah kami terima.</p>
            </div>
          </A>
        ) : (
          <A>
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
              <div>
                <label className="block text-gold/40 font-sans text-xs tracking-[0.3em] uppercase mb-2">Nama Lengkap</label>
                <input className="w-full bg-white/[0.03] border border-gold/15 rounded-lg text-gold-light px-4 py-3 font-serif text-base focus:border-gold/40 focus:outline-none focus:bg-white/[0.05] transition-all placeholder:text-gold-light/20" placeholder="Masukkan nama lengkap" required type="text" />
              </div>
              <div>
                <label className="block text-gold/40 font-sans text-xs tracking-[0.3em] uppercase mb-2">No. WhatsApp</label>
                <input className="w-full bg-white/[0.03] border border-gold/15 rounded-lg text-gold-light px-4 py-3 font-serif text-base focus:border-gold/40 focus:outline-none focus:bg-white/[0.05] transition-all placeholder:text-gold-light/20" placeholder="08xxxxxxxxxx" required type="tel" />
              </div>
              <div>
                <label className="block text-gold/40 font-sans text-xs tracking-[0.3em] uppercase mb-2">Kehadiran</label>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setAttendance("hadir")}
                    className={`flex-1 py-3 border rounded-lg text-xs font-sans tracking-[0.2em] uppercase transition-all duration-500 cursor-pointer ${attendance === "hadir" ? "border-gold bg-gold/15 text-gold" : "border-gold/15 text-gold/40 hover:border-gold/30 hover:text-gold/60"}`}>
                    Hadir
                  </button>
                  <button type="button" onClick={() => setAttendance("tidak")}
                    className={`flex-1 py-3 border rounded-lg text-xs font-sans tracking-[0.2em] uppercase transition-all duration-500 cursor-pointer ${attendance === "tidak" ? "border-gold bg-gold/15 text-gold" : "border-gold/15 text-gold/40 hover:border-gold/30 hover:text-gold/60"}`}>
                    Tidak Hadir
                  </button>
                </div>
              </div>

              {attendance === "hadir" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-5">
                  <div>
                    <label className="block text-gold/40 font-sans text-xs tracking-[0.3em] uppercase mb-2">Acara yang Dihadiri</label>
                    <div className="flex gap-2 flex-wrap">
                      <button type="button" onClick={() => setEvent("both")}
                        className={`px-4 py-2.5 border rounded-lg text-xs font-sans tracking-[0.15em] uppercase transition-all duration-500 cursor-pointer ${event === "both" ? "border-gold bg-gold/15 text-gold" : "border-gold/15 text-gold/40 hover:border-gold/30 hover:text-gold/60"}`}>
                        Pemberkatan + Resepsi
                      </button>
                      <button type="button" onClick={() => setEvent("resepsi")}
                        className={`px-4 py-2.5 border rounded-lg text-xs font-sans tracking-[0.15em] uppercase transition-all duration-500 cursor-pointer ${event === "resepsi" ? "border-gold bg-gold/15 text-gold" : "border-gold/15 text-gold/40 hover:border-gold/30 hover:text-gold/60"}`}>
                        Resepsi Saja
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gold/40 font-sans text-xs tracking-[0.3em] uppercase mb-2">Jumlah Tamu</label>
                    <select className="w-full bg-white/[0.03] border border-gold/15 rounded-lg text-gold-light px-4 py-3 font-serif text-base focus:border-gold/40 focus:outline-none transition-all">
                      {[1,2,3,4,5].map(n => <option key={n} className="bg-navy-deep text-white">{n} orang</option>)}
                    </select>
                  </div>
                </motion.div>
              )}

              <motion.button whileTap={{ scale: 0.97 }} type="submit"
                className="w-full py-3 bg-gradient-to-r from-gold to-gold-bright rounded-lg text-navy-deep font-sans text-xs tracking-[0.3em] uppercase font-medium hover:shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-all duration-500">
                Kirim RSVP
              </motion.button>
            </form>
          </A>
        )}
      </div>
    </S>
  );
}

/* ════════════════════════════════════════════════════
   WISHES — with Supabase backend
   ════════════════════════════════════════════════════ */
interface Wish { id?: number; name: string; message: string; created_at: string; }

function WishesSection() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [form, setForm] = useState({ name: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [sort, setSort] = useState<"desc" | "asc">("desc");

  useEffect(() => {
    fetch("/api/wishes").then(r => r.json()).then(d => { if (Array.isArray(d)) setWishes(d); else if (d.data) setWishes(d.data); }).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/wishes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const d = await res.json();
      if (d && d.id) setWishes([d, ...wishes]);
      else if (d.data) setWishes([d.data, ...wishes]);
      setForm({ name: "", message: "" });
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch { setStatus("idle"); }
  };

  const sorted = sort === "desc" ? wishes : [...wishes].reverse();

  return (
    <S id="wishes">
      <div className="max-w-sm sm:max-w-md w-full">
        <A className="text-center mb-5">
          <Label>PESAN</Label>
          <h2 className="text-2xl sm:text-3xl font-script text-gold-shimmer">Ucapan & Doa</h2>
          <Divider />
        </A>

        {/* Form */}
        <A v={fadeUp} className="mb-5">
          <form onSubmit={handleSubmit} className="bg-black/40 backdrop-blur-sm rounded-lg p-4 sm:p-5 border border-gold/10 space-y-3">
            <input className="w-full bg-white/[0.03] border border-gold/15 rounded-lg text-gold-light px-4 py-3 text-base font-serif focus:border-gold/40 placeholder:text-gold-light/20 outline-none transition"
              placeholder="Nama Anda" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <textarea className="w-full bg-white/[0.03] border border-gold/15 rounded-lg text-gold-light px-4 py-3 text-base font-serif focus:border-gold/40 placeholder:text-gold-light/20 outline-none transition resize-none"
              placeholder="Tulis ucapan & doa..." rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
            <motion.button whileTap={{ scale: 0.97 }} type="submit"
              className="w-full py-3 bg-gradient-to-r from-gold to-gold-bright rounded-lg text-navy-deep font-sans text-sm uppercase tracking-[0.15em] font-bold hover:shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition">
              {status === "loading" ? "Mengirim..." : status === "success" ? "Terkirim ✓" : "Kirim Ucapan"}
            </motion.button>
          </form>
        </A>

        {/* Sort + count */}
        <A>
          <div className="flex items-center justify-between mb-3 px-1">
            <p className="text-sm text-gold/40 font-sans">{wishes.length} Ucapan</p>
            <button onClick={() => setSort(sort === "desc" ? "asc" : "desc")} className="text-sm text-gold/40 font-sans hover:text-gold/60 transition">
              {sort === "desc" ? "Terbaru" : "Terlama"}
            </button>
          </div>
        </A>

        {/* Wishes wall */}
        <div className="max-h-[50vh] overflow-y-auto space-y-2" style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
          {sorted.length === 0 && <p className="text-center text-gold/30 text-sm font-serif py-6">Belum ada ucapan. Jadilah yang pertama!</p>}
          {sorted.map((w, i) => (
            <motion.div key={w.id || i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="bg-white/[0.04] backdrop-blur-sm p-3 sm:p-4 border border-gold/8 rounded-lg">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center bg-gold/10 border border-gold/15 text-gold text-xs font-sans font-bold">
                  {w.name[0]?.toUpperCase()}
                </div>
                <p className="font-display text-gold-light font-semibold text-sm">{w.name}</p>
              </div>
              <p className="font-serif text-gold-light/50 text-sm leading-relaxed">{w.message}</p>
              {w.created_at && <p className="font-sans text-gold/30 text-[10px] mt-1.5">{new Date(w.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </S>
  );
}

/* ════════════════════════════════════════════════════
   GIFT — matching GiftSlide behavior
   ════════════════════════════════════════════════════ */
function GiftSection() {
  const [cp, setCp] = useState<string | null>(null);
  const [showQris, setShowQris] = useState(false);

  const copy = (t: string) => {
    navigator.clipboard.writeText(t.replace(/[-\s]/g, ""));
    setCp(t); setTimeout(() => setCp(null), 2500);
  };

  const downloadQris = () => {
    const a = document.createElement("a");
    a.href = "/qris.jpg"; a.download = "QRIS-Prana-Ester-Wedding.jpg"; a.click();
  };

  return (
    <S id="gift">
      <div className="max-w-xs sm:max-w-sm w-full text-center">
        <A>
          <Label>LOVE GIFT</Label>
          <h2 className="text-2xl sm:text-3xl font-script text-gold-shimmer mb-2">Wedding Gift</h2>
          <Divider />
          <p className="text-gold-light/50 text-sm font-serif mt-3 mb-2">Doa restu Anda merupakan karunia yang sangat berarti bagi kami.</p>
          <p className="text-gold-light/35 text-sm font-serif mb-6">Namun jika Anda ingin memberikan tanda kasih:</p>
        </A>

        {/* QRIS */}
        <A v={scaleIn} className="mb-5">
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-5 border border-gold/10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.04] rounded-full mb-3">
              <div className="w-2 h-2 rounded-full bg-gold/60" />
              <span className="font-sans text-sm text-gold-light/40 uppercase tracking-wider">QRIS</span>
            </div>
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto mb-3 cursor-pointer rounded-lg overflow-hidden" onClick={() => setShowQris(true)}>
              <Image src="/qris.jpg" alt="QRIS" fill className="object-contain" sizes="224px" />
            </div>
            <p className="text-sm text-gold-light/35 font-serif mb-3">a.n. Prana and Ester Wedding</p>
            <div className="flex justify-center gap-2">
              <button onClick={() => setShowQris(true)} className="px-4 py-2 border border-gold/20 rounded-lg text-gold text-sm font-sans hover:bg-gold/10 active:scale-[0.97] transition">Perbesar</button>
              <button onClick={downloadQris} className="px-4 py-2 border border-gold/20 rounded-lg text-gold text-sm font-sans hover:bg-gold/10 active:scale-[0.97] transition">Simpan</button>
            </div>
          </div>
        </A>

        {/* Bank cards */}
        <div className="space-y-3">
          <A v={fadeLeft}><BankCard name="Prana Apsara Wijaya" number="6841000070" copied={cp} onCopy={copy} /></A>
          <A v={fadeRight} delay={0.1}><BankCard name="Ester Siwi Prihardani" number="7510720924" copied={cp} onCopy={copy} /></A>
        </div>
      </div>

      {/* QRIS Zoom modal */}
      <AnimatePresence>
        {showQris && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6" style={{ background: "rgba(6,10,20,0.96)" }}
            onClick={() => setShowQris(false)}>
            <button className="absolute top-4 right-4 text-gold/60 hover:text-gold text-2xl">&times;</button>
            <div className="max-w-sm w-full" onClick={e => e.stopPropagation()}>
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                <Image src="/qris.jpg" alt="QRIS" fill className="object-contain" sizes="384px" />
              </div>
              <button onClick={downloadQris} className="w-full mt-4 py-3 bg-gradient-to-r from-gold to-gold-bright rounded-lg text-navy-deep font-sans text-sm uppercase tracking-wider font-bold">
                Simpan QRIS
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </S>
  );
}

function BankCard({ name, number, copied, onCopy }: { name: string; number: string; copied: string | null; onCopy: (n: string) => void }) {
  const isCopied = copied === number;
  return (
    <div className="relative p-5 text-center border border-gold/10 rounded-lg bg-black/40 backdrop-blur-sm">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.04] rounded-full mb-3">
        <div className="w-2 h-2 rounded-full bg-gold/60" />
        <span className="font-sans text-sm text-gold-light/40 uppercase tracking-wider">Bank BCA</span>
      </div>
      <p className="font-display text-lg sm:text-xl text-gold-light font-semibold">{number}</p>
      <p className="font-serif text-gold-light/40 text-sm mb-4">a.n. {name}</p>
      <motion.button whileTap={{ scale: 0.97 }} onClick={() => onCopy(number)}
        className={`inline-flex items-center gap-2 px-5 py-2 border rounded-lg text-sm font-sans transition ${isCopied ? "border-green-500/50 text-green-400 bg-green-500/10" : "border-gold/20 text-gold hover:bg-gold/5"}`}>
        {isCopied ? "Tersalin! ✓" : "Salin Nomor"}
      </motion.button>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
    </div>
  );
}

/* ════════════════════════════════════════════════════
   GALLERY — same photos as main site with lightbox
   ════════════════════════════════════════════════════ */
const PHOTOS = [
  "DSC00106","DSC00111","DSC00136","DSC00149","DSC00167","DSC00172",
  "DSC00187","DSC00185","DSC00191","DSC00194","DSC00198","DSC00204",
  "DSC00220","DSC00217","DSC00215","DSC00213","DSC00210","DSC00208",
  "DSC00257","DSC00254","DSC00252","DSC00262","DSC00266","DSC00269",
  "DSC00271","DSC00273","DSC00276","DSC00277","DSC00307","DSC00308",
  "DSC00312","DSC00314","DSC00317","DSC00323","DSC00338","DSC00330",
  "DSC00328","DSC00344","DSC00345","DSC00363","DSC00361","DSC00358",
  "DSC00377","DSC00374","DSC00379",
];

function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const touchStart = useRef(0);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox(i => i !== null ? (i + 1) % PHOTOS.length : null);
      if (e.key === "ArrowLeft") setLightbox(i => i !== null ? (i - 1 + PHOTOS.length) % PHOTOS.length : null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <S id="gallery">
      <div className="max-w-sm sm:max-w-lg lg:max-w-2xl w-full">
        <A className="text-center mb-5">
          <Label>MOMEN</Label>
          <h2 className="text-2xl sm:text-3xl font-script text-gold-shimmer">Galeri</h2>
          <Divider />
        </A>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 sm:gap-2">
          {PHOTOS.map((name, i) => (
            <A key={name} v={scaleIn} delay={Math.min(i * 0.02, 0.4)}>
              <motion.button whileHover={{ scale: 1.03 }} onClick={() => setLightbox(i)}
                className="aspect-square overflow-hidden group cursor-pointer block relative">
                <img src={`/photos/${name}.jpg`} alt={`Foto ${i + 1}`} loading="lazy"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/20 transition" />
              </motion.button>
            </A>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center" style={{ background: "rgba(6,10,20,0.96)" }}
            onClick={() => setLightbox(null)}
            onTouchStart={e => { touchStart.current = e.touches[0].clientX; }}
            onTouchEnd={e => {
              const dx = touchStart.current - e.changedTouches[0].clientX;
              if (Math.abs(dx) > 40) setLightbox(i => i !== null ? (dx > 0 ? (i + 1) % PHOTOS.length : (i - 1 + PHOTOS.length) % PHOTOS.length) : null);
            }}>
            <button className="absolute top-4 right-4 z-10 text-gold/60 hover:text-gold text-2xl" onClick={() => setLightbox(null)}>&times;</button>
            <button className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 text-gold/40 hover:text-gold text-3xl" onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? (i - 1 + PHOTOS.length) % PHOTOS.length : null); }}>&lsaquo;</button>
            <button className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 text-gold/40 hover:text-gold text-3xl" onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? (i + 1) % PHOTOS.length : null); }}>&rsaquo;</button>

            <motion.div key={lightbox} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-3xl w-full max-h-[80vh] mx-4" onClick={e => e.stopPropagation()}>
              <img src={`/photos/${PHOTOS[lightbox]}.jpg`} alt=""
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg" />
            </motion.div>

            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gold/40 text-sm font-sans">{lightbox + 1} / {PHOTOS.length}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </S>
  );
}

/* ════════════════════════════════════════════════════
   THANKS
   ════════════════════════════════════════════════════ */
function ThanksSection() {
  return (
    <S id="thanks">
      <div className="relative z-10 flex flex-col items-center text-center max-w-xs sm:max-w-sm">
        <A v={scaleIn}>
          <div className="w-32 sm:w-36 aspect-[4/3] rounded overflow-hidden border border-gold/8 mx-auto mb-6 opacity-70">
            <img src="/photos/gallery-06.webp" alt="Prana & Ester" className="w-full h-full object-cover object-[center_25%]" />
          </div>
          <div className="relative p-6 sm:p-8 bg-black/40 backdrop-blur-sm rounded-lg"><Frame />
            <h2 className="text-3xl sm:text-4xl font-script text-gold-shimmer mb-4">Terima Kasih</h2>
            <p className="text-gold-light/50 text-base font-serif leading-[1.8] mb-5">Atas kehadiran dan doa restu Anda.<br />Merupakan suatu kehormatan bagi kami.</p>
            <Divider />
            <p className="font-display text-gold-light text-base sm:text-lg tracking-[0.08em] mt-3 mb-2">Prana & Ester</p>
            <p className="text-sm font-sans tracking-[0.3em] text-gold/50">30.05.2026</p>
          </div>
          <p className="text-sm tracking-[0.3em] text-gold/25 mt-6 font-sans uppercase">Forever & Always</p>
        </A>
      </div>
    </S>
  );
}

/* ════════════════════════════════════════════════════
   EXPORT
   ════════════════════════════════════════════════════ */
export function Overlay({ scrollProgress }: { scrollProgress?: number }) {
  return (
    <>
      <HomeSection />
      <Profile id="groom" label="MEMPELAI PRIA" name="Prana Apsara Wijaya" parents="Putra dari<br/>Bpk. Kiki Winoto & Ibu Cholipah" ig="https://instagram.com/prana__wijaya" handle="@prana__wijaya" photo="/photos/DSC00240.jpg" dir="left" />
      <Profile id="bride" label="MEMPELAI WANITA" name="Ester Siwi Prihardani" parents="Putri dari<br/>Bpk. Daniel Didik & Ibu Surya Ningrum" ig="https://instagram.com/ershidani_" handle="@ershidani_" photo="/photos/DSC00220.jpg" dir="right" />
      <VerseSection />
      <EventsSection />
      <RSVPSection />
      <WishesSection />
      <GiftSection />
      <GallerySection />
      <ThanksSection />
    </>
  );
}
