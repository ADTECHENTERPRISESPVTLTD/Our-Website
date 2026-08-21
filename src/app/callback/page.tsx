"use client";

import { motion } from "framer-motion";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import CallbackForm from "@/components/callback/CallbackForm";
import AuroraBackground from "@/components/ui/aurora-background";

export default function CallbackPage() {
  return (
    <main className="page-shell min-h-screen overflow-hidden relative">
      <AuroraBackground starCount={75} pulseDuration={8} className="absolute inset-0 z-0 pointer-events-none" />
      {/* Background Glows */}
      <div className="pointer-events-none absolute -right-32 top-16 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-28 bottom-16 h-[360px] w-[360px] rounded-full bg-blue-500/10 blur-3xl" />

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-12 text-center">
        <motion.span
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-sm uppercase tracking-[4px] text-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.15)] backdrop-blur-md"
        >
          Book a Callback
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <AnimatedHeading
            text="Schedule a Callback"
            className="mt-6 text-4xl font-extrabold leading-tight text-[#F8FAFC] md:text-6xl xl:text-6xl"
            tag="h1"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-[#94A3B8] max-w-2xl mx-auto text-lg leading-8"
        >
          Tell us when to call and our team will reach out at your preferred
          date and time. No spam, just a friendly conversation.
        </motion.p>
      </section>

      <div className="relative z-10">
        <CallbackForm />
      </div>
    </main>
  );
}
