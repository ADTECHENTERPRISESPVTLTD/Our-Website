"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import MoltenMetal from "@/components/MoltenMetal";
import AuroraBackground from "@/components/ui/AuroraBackground";

export default function AboutHero() {
  return (
    <section className="site-hero relative overflow-hidden py-28 bg-[#0B1120]/80">
      <AuroraBackground className="absolute inset-0 z-0 pointer-events-none opacity-70" />
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
        opacity={0.3}
      />

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-glow-cyan -left-20 top-10 h-[360px] w-[360px] opacity-60" />
        <div className="bg-glow-blue -bottom-20 right-0 h-[360px] w-[360px] opacity-70" />
        <div className="bg-grid" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          className="mb-5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 uppercase tracking-[4px] text-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.15)] backdrop-blur-md"
        >
          ABOUT AD TECH
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .2 }}
          className="max-w-5xl"
        >
          <AnimatedHeading
            text="Building Intelligent Software"
            className="text-4xl font-extrabold leading-tight text-[#F8FAFC] md:text-6xl xl:text-7xl"
            tag="h1"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .5 }}
          className="mt-8 max-w-3xl text-lg leading-8 text-[#94A3B8]"
        >
          AD TECH Enterprises Pvt. Ltd. is a modern software development and
          AI Automation company helping organizations embrace digital
          transformation through intelligent software, automation,
          cloud technologies and Artificial Intelligence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .8 }}
          className="mt-12 flex flex-wrap justify-center gap-5"
        >
          <Link
            href="/services"
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Explore Services →
          </Link>

          <Link
            href="/contact"
            className="rounded-xl border border-[#2A3648] bg-[#1A2233]/50 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400/10"
          >
            Contact Us
          </Link>
        </motion.div>

        {/* Stats */}
        <div className="mt-24 grid w-full max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
          {[
            ["10+", "Industries"],
            ["50+", "Solutions"],
            ["100%", "Client Focus"],
            ["24/7", "Support"],
          ].map(([value, label]) => (
            <motion.div
              key={label}
              whileHover={{ y: -8 }}
              className="rounded-2xl border border-[#2A3648] bg-[#1A2233]/60 p-6 backdrop-blur-md"
            >
              <h3 className="text-3xl font-bold text-[#38BDF8]">
                {value}
              </h3>

              <p className="mt-2 text-[#94A3B8]">
                {label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
