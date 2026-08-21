"use client";

import { motion } from "framer-motion";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import RequirementForm from "@/components/requirement/RequirementForm";
import MoltenMetal from "@/components/MoltenMetal";

export default function RequirementPage() {
  return (
    <main className="page-shell relative min-h-screen overflow-hidden text-white">
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
      {/* Background Glows */}
      <div className="pointer-events-none absolute -right-32 top-16 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-28 bottom-16 h-[360px] w-[360px] rounded-full bg-blue-500/10 blur-3xl" />

      {/* Hero Section */}
      <section className="relative z-10 pt-28 pb-8">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-sm uppercase tracking-[4px] text-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.15)] backdrop-blur-md"
          >
            Requirement Intake
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <AnimatedHeading
              text="Share Your Vision"
              className="mt-6 text-4xl font-extrabold leading-tight text-[#F8FAFC] md:text-6xl xl:text-7xl"
              tag="h1"
            />
            <AnimatedHeading
              text="We'll shape the perfect project proposal."
              className="mt-4 text-2xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 md:text-4xl xl:text-5xl"
              tag="p"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-400"
          >
            Provide a clear brief and our team will convert your requirement into a strong action plan.
            Share your goals, budget, timeline, and must-have features.
          </motion.p>
        </div>
      </section>

      <div className="relative z-10">
        <RequirementForm />
      </div>
    </main>
  );
}
