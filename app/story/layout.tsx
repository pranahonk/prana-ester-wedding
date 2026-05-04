import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story - Prana & Ester",
  description:
    "The love story of Prana and Ester, from their first meeting in Kelapa Gading to their wedding day. A journey of love, second chances, and forever.",
  openGraph: {
    title: "Our Story - Prana & Ester",
    description:
      "A beautiful journey of love, reconnection, and commitment leading to forever.",
    type: "website",
  },
};

export default function StoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;

}
