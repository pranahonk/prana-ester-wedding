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
${name}
di tempat

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami:

🤵🏻 : Prana Apsara Wijaya
dengan
👰🏼‍♀️ : Ester Siwi Prihardani

yang akan dilaksanakan pada :
🗓️ Sabtu, 30 Mei 2026
📍 Roemah Kopi Sandjaja
    Kelapa Gading, Jakarta Utara

${url}

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami.

Kami yang berbahagia,
Prana & Ester`;
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-1">Generate Undangan</h1>
        <p className="text-sm text-gray-500 mb-5">Buat teks undangan WhatsApp untuk setiap tamu</p>

        <label className="block text-sm text-gray-600 mb-1">Nama Tamu</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tresya Hana Sintha"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
        />

        {message && (
          <div className="space-y-3">
            <div className="bg-[#e9fbe9] border border-green-200 rounded-xl p-4">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans leading-relaxed">{message}</pre>
            </div>
            <button
              onClick={copy}
              className="w-full py-2.5 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
            >
              {copied ? "✓ Tersalin!" : "Salin Pesan"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
