"use client";

import Navbar from "@/components/Navbar";
import CareersPage from "@/components/careerpage";

export default function CareerRoute() {
  return (
    <main className="min-h-screen bg-brand-primary-bg text-brand-primary-text flex flex-col">
      <Navbar />
      <div className="flex-1 py-12">
        <CareersPage />
      </div>
    </main>
  );
}