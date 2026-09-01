"use client";

import { motion } from "framer-motion";
import AuroraBackground from "@/components/ui/aurora-background";

const reasons = [
  {
    title: "Client-first approach",
    description: "Every solution is shaped around your people, priorities and growth plans.",
  },
  {
    title: "Scalable delivery",
    description: "We build systems that are ready for expansion, integration and long-term use.",
  },
  {
    title: "Innovation-led execution",
    description: "Our teams combine strategy, engineering and AI to deliver high-impact outcomes.",
  },
  {
    title: "Trusted partnership",
    description: "We stay close to your goals with transparent processes and dependable support.",
  },
];

export default function WhyChoose() {
  return (
    <section className="relative section-shell overflow-hidden bg-transparent px-6 py-24">
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="section-eyebrow">Why Choose AD TECH</p>
          <h2 className="mt-4 text-4xl font-bold text-[#F8FAFC] sm:text-5xl">
            A dependable partner for modern growth
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg text-[#94A3B8]">
            We turn complex transformation goals into elegant, actionable digital experiences that create momentum.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="section-card hover-card rounded-[24px] p-7 backdrop-blur-md bg-[#0f172a]/70 border border-[#2a3648]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/15 text-xl font-bold text-cyan-300">
                0{index + 1}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-[#F8FAFC]">{reason.title}</h3>
              <p className="mt-3 text-[#94A3B8]">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}