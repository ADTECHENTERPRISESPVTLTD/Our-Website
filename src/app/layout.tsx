import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MoltenMetal from "@/components/MoltenMetal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AD TECH Enterprises",
  description: "Building Future Tech Talent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
    <body className="min-h-screen flex flex-col bg-transparent text-[#F8FAFC]">
        {/* Molten metal animated background */}
        <MoltenMetal
          color1="#140d2a"
          color2="#04a9dd"
          color3="#fdfafa"
          speed={0.15}
          scale={4.9}
          detail={4}
          glow={1.5}
          coreSize={0.11}
          swirl={1}
          fold={-0.3}
          blackPoint={0.06}
          brightness={1.4}
          colorMode="ember"
          grain
          grainIntensity={0.06}
          mouseInteraction
          mouseStrength={0.15}
          opacity={0.95}
        />

        {/* Background grid overlay visible on all pages */}
        <div className="fixed inset-0 bg-grid pointer-events-none z-0" aria-hidden="true" />

        <Navbar />

        <main className="flex-1 relative z-[1]">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}