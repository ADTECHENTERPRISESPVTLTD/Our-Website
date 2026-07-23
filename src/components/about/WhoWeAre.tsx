"use client";

import { motion } from "framer-motion";
import { Cpu, Bot, Globe, Cloud } from "lucide-react";

export default function WhoWeAre() {
  return (
    <section className="relative bg-[#0B1120] py-24 overflow-hidden">

      {/* Background Glow */}

      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="absolute right-0 bottom-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

        {/* LEFT SIDE */}

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
        >

          <p className="uppercase tracking-[4px] text-[#38BDF8] font-semibold">
            WHO WE ARE
          </p>

          <h2 className="text-5xl font-bold text-white mt-5 leading-tight">
            Empowering Organizations
            <span className="block text-[#38BDF8]">
              Through Intelligent Technology
            </span>
          </h2>

          <p className="text-[#94A3B8] leading-8 mt-8">
            AD TECH Enterprises Pvt. Ltd. is a modern software development
            and AI Automation company dedicated to helping organizations
            embrace digital transformation through intelligent technology
            solutions.
          </p>

          <p className="text-[#94A3B8] leading-8 mt-6">
            We partner with schools, colleges, MSMEs, startups and
            enterprises to design, develop and deploy scalable software
            products that solve real business challenges.
          </p>

          <p className="text-[#94A3B8] leading-8 mt-6">
            Beyond software development, we help businesses become
            <span className="text-white font-semibold">
              {" "}AI-First Companies
            </span>{" "}
            by integrating Artificial Intelligence into daily operations,
            decision-making and customer experiences.
          </p>

        </motion.div>

        {/* RIGHT SIDE */}

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
          className="relative"
        >

          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/20 to-cyan-400/10 blur-xl"></div>

          <div className="relative rounded-3xl border border-[#2A3648] bg-[#1A2233]/60 backdrop-blur-xl p-10">

            <div className="grid grid-cols-2 gap-6">

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="rounded-2xl bg-[#0F172A] border border-[#2A3648] p-6"
              >
                <Cpu size={40} className="text-[#38BDF8]" />
                <h3 className="mt-5 text-white font-semibold text-xl">
                  Software
                </h3>
                <p className="text-[#94A3B8] mt-3 text-sm">
                  Modern scalable applications for every business.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="rounded-2xl bg-[#0F172A] border border-[#2A3648] p-6"
              >
                <Bot size={40} className="text-[#38BDF8]" />
                <h3 className="mt-5 text-white font-semibold text-xl">
                  Artificial Intelligence
                </h3>
                <p className="text-[#94A3B8] mt-3 text-sm">
                  AI Chatbots, Automation and Intelligent Systems.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="rounded-2xl bg-[#0F172A] border border-[#2A3648] p-6"
              >
                <Cloud size={40} className="text-[#38BDF8]" />
                <h3 className="mt-5 text-white font-semibold text-xl">
                  Cloud
                </h3>
                <p className="text-[#94A3B8] mt-3 text-sm">
                  Reliable cloud infrastructure and deployment.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="rounded-2xl bg-[#0F172A] border border-[#2A3648] p-6"
              >
                <Globe size={40} className="text-[#38BDF8]" />
                <h3 className="mt-5 text-white font-semibold text-xl">
                  Digital Transformation
                </h3>
                <p className="text-[#94A3B8] mt-3 text-sm">
                  Helping businesses become AI-powered organizations.
                </p>
              </motion.div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}