import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
