import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "AD TECH Enterprises",
  description: "Building Future Tech Talent",
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="flex-1 relative z-[1]">
        {children}
      </main>
      <Footer />
    </>
  );
}
