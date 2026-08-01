"use client";

import { motion } from "framer-motion";
import { premiumFadeUpProps } from "@/hooks/useAnimatedInView";
import {
  GraduationCap,
  School,
  HeartPulse,
  Factory,
  ShoppingBag,
  Rocket,
  Building2,
  CreditCard,
  Coffee,
  Hotel,
  UtensilsCrossed,
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
  { name: "Cafés", icon: Coffee },
  { name: "Hotels", icon: Hotel },
  { name: "Restaurants", icon: UtensilsCrossed },
];

export default function Industries() {
  return (
    <section className="section-shell bg-transparent px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          {...premiumFadeUpProps}
          className="text-center"
        >
          <p className="section-eyebrow">Industries We Serve</p>
          <h2 className="mt-4 text-4xl font-bold text-[#F8FAFC] sm:text-5xl">
            Empowering Businesses Across Industries
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg text-[#94A3B8]">
            Our solutions are tailored to help organizations across sectors modernize with clarity and confidence.
          </p>
        </motion.div>

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-14 flex flex-wrap items-center justify-center gap-4"
        >
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.name}
                variants={{
                  hidden: { opacity: 0, y: 24, scale: 0.94 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="section-card rounded-full px-6 py-4 text-center text-lg font-semibold text-[#F8FAFC] flex items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_8px_32px_rgba(6,182,212,0.12)]"
              >
                <Icon size={22} className="text-cyan-400 shrink-0" />
                <span>{industry.name}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

