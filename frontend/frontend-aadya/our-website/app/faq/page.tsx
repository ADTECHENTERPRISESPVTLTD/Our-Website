"use client";

import Navbar from "@/components/Navbar";
import FAQSection from "@/components/FAQsection";

export default function FAQRoute() {
  return (
    <main className="min-h-screen bg-brand-primary-bg text-brand-primary-text flex flex-col">
      <Navbar />
      <div className="flex-1 py-12">
        <FAQSection />
      </div>
    </main>
  );
}