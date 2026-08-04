"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

export default function ContactHero() {
  return (
    <section className="site-hero relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-24">
      {/* Background Glows */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-glow-cyan -left-20 top-10 h-[400px] w-[400px] opacity-60" />
        <div className="bg-glow-blue -bottom-20 right-0 h-[400px] w-[400px] opacity-70" />
        <div className="bg-grid" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-sm uppercase tracking-[4px] text-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.15)] backdrop-blur-md"
        >
          GET IN TOUCH
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-5xl"
        >
          <AnimatedHeading
            text="Let's Build Something Amazing Together"
            className="text-4xl font-extrabold leading-tight text-[#F8FAFC] md:text-6xl xl:text-7xl"
            tag="h1"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 max-w-3xl text-lg leading-8 text-[#94A3B8]"
        >
          Connect with AD TECH Enterprises Pvt. Ltd. for software
          development, AI automation, and digital transformation solutions.
          We&apos;re here to turn your vision into reality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex flex-wrap justify-center gap-5"
        >
          <Link
            href="mailto:hradtechenterpriseschepvtltd@gmail.com"
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Send an Email →
          </Link>

          <Link
            href="/services"
            className="rounded-xl border border-[#2A3648] bg-[#1A2233]/50 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400/10"
          >
            Explore Services
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-24 grid w-full max-w-5xl grid-cols-2 gap-6 md:grid-cols-4"
        >
          {[
            ["24/7", "Support Available"],
            ["1hr", "Response Time"],
            ["50+", "Projects Delivered"],
            ["100%", "Client Satisfaction"],
          ].map(([value, label]) => (
            <motion.div
              key={label}
              whileHover={{ y: -8 }}
              className="rounded-2xl border border-[#2A3648] bg-[#1A2233]/60 p-6 backdrop-blur-md"
            >
              <h3 className="text-3xl font-bold text-[#38BDF8]">{value}</h3>
              <p className="mt-2 text-[#94A3B8]">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

