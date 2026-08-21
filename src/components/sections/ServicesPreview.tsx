"use client";

import { motion } from "framer-motion";
import { fadeUpProps } from "@/hooks/useAnimatedInView";
import MoltenMetal from "@/components/MoltenMetal";
import {
  Settings,
  Bot,
  Rocket,
  Monitor,
  Brain,
  BarChart3,
} from "lucide-react";

const services = [
  {
    title: "AI Automation",
    description: "Intelligent workflows that reduce manual effort and improve productivity.",
    Icon: Settings,
  },
  {
    title: "AI Agents",
    description: "Purpose-built agents that support decision-making and daily operations.",
    Icon: Bot,
  },
  {
    title: "Business Automation",
    description: "Streamlined systems that accelerate execution and improve consistency.",
    Icon: Rocket,
  },
  {
    title: "Custom Software",
    description: "Tailored digital products designed around your business processes.",
    Icon: Monitor,
  },
  {
    title: "AI Consulting",
    description: "Strategic guidance to identify the right solutions and roadmap for growth.",
    Icon: Brain,
  },
  {
    title: "Data Engineering",
    description: "Reliable data foundations that power analytics, automation and intelligence.",
    Icon: BarChart3,
  },
];

export default function ServicesPreview() {
  return (
    <section className="relative section-shell overflow-hidden bg-[#111827]/80 px-6 py-24">
      <MoltenMetal
        color1="#0a192f"
        color2="#04a9dd"
        color3="#fdfafa"
        speed={0.12}
        scale={4.5}
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
          {...fadeUpProps}
          className="text-center"
        >
          <p className="section-eyebrow">Our Services</p>
          <h2 className="mt-4 text-4xl font-bold text-[#F8FAFC] sm:text-5xl">
            Technology Solutions That Drive Growth
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg text-[#94A3B8]">
            From strategy to execution, we create solutions that help teams move faster and scale smarter.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ scale: 1.03 }}
              className="section-card hover-card rounded-[24px] p-7 backdrop-blur-md bg-[#1e293b]/70 border border-[#334155]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300">
                <service.Icon size={24} />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-[#F8FAFC]">{service.title}</h3>
              <p className="mt-3 text-[#94A3B8]">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
