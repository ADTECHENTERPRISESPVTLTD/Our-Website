import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GradientWaves from "@/components/ui/GradientWaves";
import ChatWidget from "@/components/ChatWidget";

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
        <div className="fixed inset-0 z-0 pointer-events-none w-full h-full opacity-90 overflow-hidden" aria-hidden="true">
          <GradientWaves
            horizonColor="#5227FF"
            waveColor="#FF9FFC"
            crestColor="#FFFFFF"
            speed={0.4}
            amplitude={2.1}
            waveScale={0.9}
            waveRatio={0.9}
            swell={35}
            turbulence={26.5}
            tilt={1.11}
            zoom={1.05}
            height={4.8}
            fogDepth={15}
            detail="medium"
            brightness={0.65}
            opacity={1}
            mouseInteraction={false}
            parallaxStrength={0.59}
            grain
            grainIntensity={0.1}
            className="w-full h-full"
          />
        </div>

        {/* Background grid overlay visible on all pages */}
        <div className="fixed inset-0 bg-grid pointer-events-none z-0" aria-hidden="true" />

        <Navbar />

        <main className="flex-1 relative z-[1]">
          {children}
        </main>

        <Footer />

        {/* Asha AI Voice Assistant Chatbot */}
        <ChatWidget />
      </body>
    </html>
  );
}