"use client";

import { motion } from "framer-motion";
import MoltenMetal from "@/components/MoltenMetal";

const testimonials = [
  {
    name: "Educational Institution",
    message: "AD TECH helped us adopt modern digital solutions and improve our technology infrastructure.",
  },
  {
    name: "Startup Founder",
    message: "Their AI automation approach helped us reduce manual efforts and improve productivity.",
  },
  {
    name: "Business Enterprise",
    message: "A reliable technology partner delivering scalable and future-ready software solutions.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative section-shell overflow-hidden bg-[#111827]/80 px-6 py-24">
      <MoltenMetal
        color1="#140d2a"
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
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="section-eyebrow">Testimonials</p>
          <h2 className="mt-4 text-4xl font-bold text-[#F8FAFC] sm:text-5xl">
            What Our Partners Say
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="section-card rounded-[24px] p-8 backdrop-blur-md bg-[#1e293b]/70 border border-[#334155]"
            >
              <div className="text-4xl text-cyan-300">“</div>
              <p className="mt-3 text-lg leading-8 text-[#CBD5E1]">{item.message}</p>
              <h3 className="mt-6 text-lg font-semibold text-[#F8FAFC]">{item.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}