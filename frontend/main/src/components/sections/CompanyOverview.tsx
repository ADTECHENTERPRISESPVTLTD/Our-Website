"use client";

import { motion } from "framer-motion";

const points = [
  "Scalable software solutions tailored for modern business challenges.",
  "AI-driven automation that improves productivity and operational clarity.",
  "Secure, cloud-ready platforms designed for long-term growth.",
];

export default function CompanyOverview() {
  return (
    <section className="section-shell bg-[#0B1120] px-6 py-24">
      <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="section-eyebrow">About AD TECH</p>
          <h2 className="mt-4 text-4xl font-bold text-[#F8FAFC] sm:text-5xl">
            Building Intelligent Solutions for the Digital Future
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#CBD5E1]">
            AD TECH Enterprises Pvt. Ltd. is a modern software development and AI automation company helping organizations adopt intelligent technology solutions with confidence.
          </p>
          <p className="mt-4 text-lg leading-8 text-[#94A3B8]">
            We build scalable software products, AI-powered workflows, automation systems and digital platforms that create measurable impact and lasting value.
          </p>

          <ul className="mt-8 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 rounded-2xl border border-[#2A3648] bg-[#111827]/70 px-4 py-3 text-[#CBD5E1]">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-card rounded-[28px] p-8 md:p-10"
        >
          <div className="rounded-[24px] border border-[#2A3648] bg-[#0F172A]/70 p-6">
            <h3 className="text-2xl font-semibold text-[#F8FAFC]">Our Vision</h3>
            <p className="mt-3 text-[#94A3B8]">
              To become one of India&apos;s most trusted technology companies by empowering organizations with AI-driven solutions.
            </p>

            <h3 className="mt-8 text-2xl font-semibold text-[#F8FAFC]">Our Mission</h3>
            <p className="mt-3 text-[#94A3B8]">
              Making advanced technology accessible through software, automation and Artificial Intelligence.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#2A3648] bg-[#111827]/70 p-5">
              <p className="text-3xl font-semibold text-[#F8FAFC]">10+</p>
              <p className="mt-2 text-sm text-[#94A3B8]">Years of experience</p>
            </div>
            <div className="rounded-2xl border border-[#2A3648] bg-[#111827]/70 p-5">
              <p className="text-3xl font-semibold text-[#F8FAFC]">100%</p>
              <p className="mt-2 text-sm text-[#94A3B8]">Client-focused delivery</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}