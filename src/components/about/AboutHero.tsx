"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

export default function AboutHero() {
  return (
    <section className="site-hero relative overflow-hidden py-28">

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-glow-cyan -left-20 top-10 h-[360px] w-[360px] opacity-60" />
        <div className="bg-glow-blue -bottom-20 right-0 h-[360px] w-[360px] opacity-70" />
        <div className="bg-grid" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 text-center">

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          className="mb-5 rounded-full border border-sky-400/30 bg-sky-400/10 px-5 py-2 uppercase tracking-[4px] text-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.15)] backdrop-blur-md"
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
            textAlign="center"
          />
          <AnimatedHeading
            text="Empowering Businesses Through AI"
            className="mt-4 text-4xl font-extrabold leading-tight text-sky-300 drop-shadow-[0_0_18px_rgba(125,211,252,0.25)] md:text-6xl xl:text-7xl"
            tag="h2"
            textAlign="center"
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
            className="rounded-xl bg-[#2563EB] px-8 py-4 font-semibold text-white transition hover:scale-105 hover:bg-blue-700"
          >
            Explore Services →
          </Link>

          <Link
            href="/contact"
            className="rounded-xl border border-[#2A3648] bg-[#1A2233]/50 px-8 py-4 font-semibold text-white backdrop-blur-md transition hover:border-[#2563EB] hover:bg-[#2563EB]/20"
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