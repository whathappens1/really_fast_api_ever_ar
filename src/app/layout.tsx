import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({ subsets: ["arabic"], weight: ["500", "700"] });

export const metadata: Metadata = {
  title: "البحث السريع⚡- واجهة برمجة التطبيقات",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar">
      <body className={tajawal.className}>{children}</body>
    </html>
  );
}
