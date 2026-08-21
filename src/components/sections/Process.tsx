"use client";

import { motion } from "framer-motion";

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
    <section className="section-shell bg-[#111827]/70 px-6 py-24">
      <div className="mx-auto max-w-7xl">
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
              className="section-card rounded-[24px] p-7"
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