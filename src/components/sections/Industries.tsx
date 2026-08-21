"use client";

import AuroraBackground from "@/components/ui/aurora-background";
import {
  GraduationCap,
  School,
  HeartPulse,
  Factory,
  ShoppingBag,
  Rocket,
  Building2,
  CreditCard,
} from "lucide-react";

const industries = [
  { name: "Schools", icon: GraduationCap },
  { name: "Colleges", icon: School },
  { name: "Healthcare", icon: HeartPulse },
  { name: "Manufacturing", icon: Factory },
  { name: "Retail", icon: ShoppingBag },
  { name: "Startups", icon: Rocket },
  { name: "MSMEs", icon: Building2 },
  { name: "Financial Services", icon: CreditCard },
];

export default function Industries() {
  return (
    <section className="relative section-shell overflow-hidden bg-[#0B1120]/80 px-6 py-24">
      <AuroraBackground starCount={60} pulseDuration={8} className="absolute inset-0 z-0 pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center">
          <p className="section-eyebrow">Industries We Serve</p>
          <h2 className="mt-4 text-4xl font-bold text-[#F8FAFC] sm:text-5xl">
            Empowering Businesses Across Industries
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg text-[#94A3B8]">
            Our solutions are tailored to help organizations across sectors modernize with clarity and confidence.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <div key={industry.name} className="section-card rounded-full px-6 py-4 text-center text-lg font-semibold text-[#F8FAFC] flex items-center justify-center gap-3 backdrop-blur-md bg-[#0f172a]/70 border border-[#2a3648]">
                <Icon size={22} className="text-cyan-400 shrink-0" />
                <span>{industry.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
