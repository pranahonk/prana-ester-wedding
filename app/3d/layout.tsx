import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Wedding of Prana & Ester | 3D Invitation",
  description:
    "Anda diundang untuk merayakan pernikahan Prana & Ester — 30 Mei 2026",
};

export default function Layout3D({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
