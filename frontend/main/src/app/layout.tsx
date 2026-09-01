import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/ChatWidget";
import GradientWaves from "@/components/ui/GradientWaves";

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
      <body className="min-h-screen flex flex-col bg-[#0B1120] text-[#F8FAFC] relative">
        {/* Global GradientWaves Background */}
        <div className="fixed inset-0 z-0 pointer-events-none w-full h-full opacity-95 overflow-hidden" aria-hidden="true">
          <GradientWaves
            horizonColor="#5227FF"
            waveColor="#FF9FFC"
            crestColor="#FFFFFF"
            speed={0.45}
            amplitude={2.3}
            waveScale={0.85}
            waveRatio={0.9}
            swell={32}
            turbulence={22.0}
            tilt={1.11}
            zoom={1.05}
            height={4.8}
            fogDepth={16}
            detail="high"
            brightness={0.85}
            opacity={1}
            mouseInteraction={false}
            parallaxStrength={0.59}
            grain
            grainIntensity={0.05}
            className="w-full h-full"
          />
        </div>

        <div className="fixed inset-0 bg-grid pointer-events-none z-0 opacity-25" aria-hidden="true" />

        <Navbar />

        <main className="flex-1 relative z-[1]">
          {children}
        </main>

        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}