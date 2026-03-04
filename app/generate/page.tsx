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

export default function GeneratePage() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const name = titleCase(input);
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const url = name ? `${origin}/?to=${name.replace(/ /g, "+")}` : "";

  const copy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-4">Generate Invitation Link</h1>

        <label className="block text-sm text-gray-600 mb-1">Nama Tamu</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ester Siwi Prihardani"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        {url && (
          <div className="bg-gray-50 border border-gray-200 rounded-md p-3 flex items-center gap-2">
            <code className="flex-1 text-sm text-blue-700 break-all">{url}</code>
            <button
              onClick={copy}
              className="shrink-0 px-3 py-1.5 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
