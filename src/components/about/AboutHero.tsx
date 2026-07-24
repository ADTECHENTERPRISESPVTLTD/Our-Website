"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-[#0B1120] py-28">

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[150px]" />

        <div className="absolute left-1/2 top-10 h-[250px] w-[250px] -translate-x-1/2 rounded-full bg-sky-400/10 blur-[120px]" />

      </div>

      {/* Floating Shapes */}

      <motion.div
        animate={{ y: [-15, 15, -15], rotate: [0, 12, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute left-20 top-32 h-20 w-20 rounded-2xl border border-blue-500/30 bg-blue-500/10"
      />

      <motion.div
        animate={{ y: [20, -20, 20], rotate: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute right-20 bottom-28 h-28 w-28 rounded-full border border-cyan-400/30 bg-cyan-400/10"
      />

      <motion.div
        animate={{ y: [-10, 15, -10] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute right-1/4 top-16 h-10 w-10 rotate-45 border border-sky-400/40 bg-sky-400/10"
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 text-center">

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          className="mb-5 rounded-full border border-[#2A3648] bg-[#1A2233]/60 px-5 py-2 uppercase tracking-[4px] text-[#38BDF8] backdrop-blur-md"
        >
          ABOUT AD TECH
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .2 }}
          className="max-w-5xl text-5xl font-extrabold leading-tight text-white md:text-7xl"
        >
          Building Intelligent Software
          <span className="block bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-300 bg-clip-text text-transparent">
            Empowering Businesses Through AI
          </span>
        </motion.h1>

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