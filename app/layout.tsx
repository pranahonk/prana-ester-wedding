import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Great_Vibes, Cormorant_Garamond, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  weight: "400",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1B2A4A",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.pranaester.com"
  ),
  title: "Undangan Pernikahan Prana & Ester - 30 Mei 2026",
  description:
    "Tanpa Mengurangi Rasa Hormat. Kami Bermaksud Mengundang Bapak/Ibu/Saudara/i, Pada Pernikahan Kami — 30 Mei 2026",
  openGraph: {
    title: "Undangan Pernikahan Prana & Ester",
    description:
      "Kami mengundang Anda untuk hadir dan memberikan doa restu pada pernikahan kami — 30 Mei 2026, GMS Kelapa Gading, Jakarta",
    url: "https://www.pranaester.com",
    type: "website",
    locale: "id_ID",
    siteName: "Undangan Pernikahan Prana & Ester",
    images: [
      {
        url: "https://www.pranaester.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Undangan Pernikahan Prana & Ester - 30 Mei 2026",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Undangan Pernikahan Prana & Ester",
    description:
      "Kami mengundang Anda untuk hadir dan memberikan doa restu pada pernikahan kami — 30 Mei 2026",
    images: [
      {
        url: "https://www.pranaester.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Undangan Pernikahan Prana & Ester - 30 Mei 2026",
      },
    ],
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${greatVibes.variable} ${cormorant.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
