"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import MoltenMetal from "@/components/MoltenMetal";

export default function FinalCTA() {
  return (
    <section className="relative section-shell overflow-hidden bg-[#0B1120]/80 px-6 py-24">
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
        opacity={0.4}
      />
      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-card rounded-[32px] p-10 text-center md:p-16 backdrop-blur-md bg-[#0f172a]/80 border border-[#2a3648]"
        >
          <p className="section-eyebrow">Start Your Digital Transformation</p>
          <h2 className="mt-4 text-4xl font-bold text-[#F8FAFC] sm:text-5xl">
            Ready to Build the Future with AI?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#CBD5E1]">
            Partner with AD TECH Enterprises Pvt. Ltd. to build scalable software solutions, automate business processes and transform your organization with Artificial Intelligence.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 md:flex-row">
            <Link href="/contact" className="rounded-2xl bg-[#F8FAFC] px-8 py-3.5 font-semibold text-[#0B1120] transition duration-300 hover:scale-105">
              Get Started
            </Link>
            <Link href="/services" className="rounded-2xl border border-[#334155] px-8 py-3.5 font-semibold text-[#F8FAFC] transition duration-300 hover:border-cyan-400 hover:bg-[#0B1120]">
              Explore Services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}