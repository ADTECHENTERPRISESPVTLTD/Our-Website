"use client";

import { motion } from "framer-motion";
import MoltenMetal from "@/components/MoltenMetal";

const steps = [
  {
    title: "Discover",
    description: "We understand your goals, challenges and transformation priorities.",
  },
  {
    title: "Design",
    description: "We shape the right strategy, architecture and user experience.",
  },
  {
    title: "Develop",
    description: "We build and integrate solutions with focus on performance and reliability.",
  },
  {
    title: "Deliver",
    description: "We launch, support and refine so your growth continues with momentum.",
  },
];

export default function Process() {
  return (
    <section className="relative section-shell overflow-hidden bg-[#111827]/80 px-6 py-24">
      <MoltenMetal
        color1="#0d1b2a"
        color2="#04a9dd"
        color3="#fdfafa"
        speed={0.15}
        scale={4.9}
        detail={4}
        glow={1.5}
        coreSize={0.11}
        swirl={1}
        fold={-0.3}
        blackPoint={0.06}
        brightness={1.4}
        colorMode="ember"
        grain
        grainIntensity={0.06}
        mouseInteraction
        mouseStrength={0.15}
        opacity={0.35}
      />
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="section-eyebrow">Our Process</p>
          <h2 className="mt-4 text-4xl font-bold text-[#F8FAFC] sm:text-5xl">
            A structured approach to lasting impact
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="section-card rounded-[24px] p-7 backdrop-blur-md bg-[#1e293b]/70 border border-[#334155]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/15 text-lg font-semibold text-cyan-300">
                0{index + 1}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-[#F8FAFC]">{step.title}</h3>
              <p className="mt-3 text-[#94A3B8]">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}