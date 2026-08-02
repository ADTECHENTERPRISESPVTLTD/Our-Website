import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ChatWidget from "@/components/ChatWidget";
import AshaVoiceAssistant from "@/components/AshaVoiceAssistant";
import GlobalBackground from "@/components/layout/GlobalBackground";

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
      <body className="min-h-screen flex flex-col bg-[#0B1120] text-[#F8FAFC]">
        {/* Animated glittering canvas background visible on all pages */}
        <GlobalBackground />
        <div className="fixed inset-0 bg-grid pointer-events-none z-0 opacity-40" aria-hidden="true" />

        {children}

        <ChatWidget />
        <AshaVoiceAssistant />
      </body>
    </html>
  );
}