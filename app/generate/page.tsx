"use client";

import { useState } from "react";

function titleCase(str: string) {
  return str
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function buildMessage(name: string): string {
  const encodedName = name.replace(/ /g, "+");
  const url = `https://www.pranaester.com/?to=${encodedName}`;

  return `Kepada Yth.
Bapak/Ibu/Saudara/i
*${name}*
di tempat

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami:

🤵🏻 : *Prana Apsara Wijaya*
dengan
👰🏼‍♀️ : *Ester Siwi Prihardani*

yang akan dilaksanakan pada :
🗓️ *Sabtu, 30 Mei 2026*
📍 *Roemah Kopi Sandjaja*
    Kelapa Gading, Jakarta Utara

${url}

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami.

Kami yang berbahagia,
Prana & Ester`;
}

/* Renders *bold* markdown as <strong> and plain text as-is */
function WaBold({ children }: { children: string }) {
  const parts = children.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <strong key={i}>{part.slice(1, -1)}</strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function StyledMessage({ name }: { name: string }) {
  const encodedName = name.replace(/ /g, "+");
  const url = `https://www.pranaester.com/?to=${encodedName}`;

  return (
    <div
      className="font-sans text-gray-800 space-y-2.5"
      style={{ fontSize: "13.5px", lineHeight: "1.55" }}
    >
      {/* Address block */}
      <div className="space-y-0">
        <p className="text-gray-500">Kepada Yth.</p>
        <p className="text-gray-500">Bapak/Ibu/Saudara/i</p>
        <p><strong>{name}</strong></p>
        <p className="text-gray-500">di tempat</p>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#b2dfb4] my-1" />

      {/* Intro */}
      <p>
        Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami:
      </p>

      {/* Couple */}
      <div className="text-center space-y-0.5 py-0.5">
        <p>🤵🏻 : <strong>Prana Apsara Wijaya</strong></p>
        <p className="text-gray-500 text-[12px]">dengan</p>
        <p>👰🏼‍♀️ : <strong>Ester Siwi Prihardani</strong></p>
      </div>

      {/* Date & Venue */}
      <div className="space-y-0.5">
        <p className="text-gray-500 text-[12px]">yang akan dilaksanakan pada :</p>
        <p>🗓️ <strong>Sabtu, 30 Mei 2026</strong></p>
        <p>📍 <strong>Roemah Kopi Sandjaja</strong></p>
        <p className="text-gray-500 text-[12px] pl-5">Kelapa Gading, Jakarta Utara</p>
      </div>

      {/* Link */}
      <p
        className="break-all underline"
        style={{ color: "#0d72b2", fontSize: "12px" }}
      >
        {url}
      </p>

      {/* Divider */}
      <div className="h-px bg-[#b2dfb4] my-1" />

      {/* Closing */}
      <p>
        Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami.
      </p>
      <div>
        <p className="text-gray-500 text-[12px]">Kami yang berbahagia,</p>
        <p><strong>Prana & Ester 💍</strong></p>
      </div>
    </div>
  );
}

export default function GeneratePage() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const name = titleCase(input);
  const message = name ? buildMessage(name) : "";

  const copy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen bg-[#ece5dd] px-4 py-8">
      {/* WhatsApp header bar */}
      <div className="max-w-lg mx-auto mb-4">
        <div className="flex items-center gap-3 bg-[#075E54] rounded-xl px-4 py-3 shadow-md">
          <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white font-bold text-base shrink-0 shadow-inner">
            💍
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-semibold leading-tight">Prana & Ester</p>
            <p className="text-[#a7d9a2] text-[11px]">Wedding Invitation Generator</p>
          </div>
          <div className="text-[#a7d9a2]">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.25 2.25H3.75a1.5 1.5 0 00-1.5 1.5v12a1.5 1.5 0 001.5 1.5h3v3.75l4.5-3.75h9a1.5 1.5 0 001.5-1.5v-12a1.5 1.5 0 00-1.5-1.5z"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto space-y-4">
        {/* Input */}
        <div className="bg-white rounded-xl shadow-sm px-4 py-4">
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
            Nama Tamu
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tresya Hana Sintha"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] bg-gray-50"
          />
        </div>

        {message && (
          <>
            {/* Chat bubble */}
            <div className="flex justify-end pr-1">
              <div className="relative" style={{ maxWidth: "92%" }}>
                {/* Bubble tail */}
                <div
                  className="absolute -right-[9px] top-0"
                  style={{
                    width: 0, height: 0,
                    borderLeft: "9px solid #dcf8c6",
                    borderBottom: "9px solid transparent",
                  }}
                />
                <div className="bg-[#dcf8c6] rounded-2xl rounded-tr-none px-4 pt-3.5 pb-7 shadow">
                  <StyledMessage name={name} />
                  {/* Time + ticks */}
                  <div className="absolute bottom-2 right-3 flex items-center gap-1">
                    <span className="text-[10px] text-gray-400">
                      {new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
                      <path d="M1 5.5L4.5 9L9 1" stroke="#53bdeb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5 5.5L8.5 9L15 1" stroke="#53bdeb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Note */}
            <p className="text-center text-[11px] text-gray-500">
              Teks yang disalin menggunakan format <code className="bg-white px-1 rounded">*bold*</code> WhatsApp
            </p>

            {/* Copy button */}
            <button
              onClick={copy}
              className="w-full py-3 rounded-xl text-white text-sm font-semibold shadow-md transition-all active:scale-[0.98]"
              style={{ background: copied ? "#128C7E" : "#25D366" }}
            >
              {copied ? "✓ Pesan Tersalin!" : "📋 Salin Pesan"}
            </button>
          </>
        )}

        {!message && (
          <div className="text-center py-14 space-y-2">
            <p className="text-4xl">💬</p>
            <p className="text-gray-400 text-sm">Masukkan nama tamu untuk melihat preview</p>
          </div>
        )}
      </div>
    </div>
  );
}
