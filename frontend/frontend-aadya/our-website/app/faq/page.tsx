"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import FAQsection from "@/components/FAQsection";

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-brand-primary-bg">
      <Navbar />
      <div className="max-w-4xl mx-auto py-12 px-4 md:px-8">
        <FAQsection />
      </div>
    </main>
  );
}