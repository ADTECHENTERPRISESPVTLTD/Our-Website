"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutCTA() {
  return (
    <section className="relative overflow-hidden py-32 bg-[#0B1120]">

      {/* Background Glow */}

      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2563EB]/20 blur-[180px]" />

      <div className="bg-glow-cyan absolute left-10 top-10 h-80 w-80" />

      <div className="absolute right-10 bottom-10 h-96 w-96 rounded-full bg-blue-600/10 blur-[160px]" />

      <div className="relative max-w-5xl mx-auto px-6">

        <motion.div

          initial={{ opacity: 0, y: 80 }}

          whileInView={{ opacity: 1, y: 0 }}

          transition={{ duration: .8 }}

          viewport={{ once: true }}

          className="
          rounded-[40px]
          border
          border-[#2A3648]
          bg-[#1A2233]/70
          backdrop-blur-2xl
          p-16
          text-center
          "

        >

          <p className="
          uppercase
          tracking-[5px]
          text-[#38BDF8]
          font-semibold
          ">
            READY TO BUILD?
          </p>

          <h2 className="
          text-5xl
          md:text-7xl
          font-bold
          mt-8
          text-white
          leading-tight
          ">

            Let's Build The
            <br />

            <span className="
            bg-gradient-to-r
            from-[#38BDF8]
            to-[#2563EB]
            bg-clip-text
            text-transparent
            ">
              Future Together
            </span>

          </h2>

          <p className="
          mt-8
          text-[#94A3B8]
          text-lg
          leading-8
          max-w-3xl
          mx-auto
          ">

            Whether you're looking for AI-powered solutions,
            enterprise software or digital transformation,
            AD TECH Enterprises Pvt. Ltd. is ready to help
            your business grow.

          </p>

          <div className="
          mt-14
          flex
          flex-wrap
          justify-center
          gap-6
          ">

            <Link
              href="/contact"
              className="
              inline-flex
              items-center
              gap-3
              rounded-2xl
              bg-[#2563EB]
              px-8
              py-5
              font-semibold
              text-white
              transition
              duration-300
              hover:scale-105
              hover:bg-blue-700
              "
            >
              Contact Us

              <ArrowRight size={20} />

            </Link>

            <Link
              href="/services"
              className="
              rounded-2xl
              border
              border-[#2A3648]
              px-8
              py-5
              font-semibold
              text-white
              transition
              duration-300
              hover:border-[#38BDF8]
              hover:bg-[#38BDF8]/10
              "
            >
              Explore Services
            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  );
}