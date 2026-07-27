"use client";

import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";

export default function VisionMission() {
  return (
    <section className="relative bg-[#0B1120] py-24 overflow-hidden">

      <div className="absolute inset-0">

        <div className="bg-glow-blue absolute left-20 top-10 h-72 w-72" />

        <div className="bg-glow-cyan absolute right-10 bottom-10 h-96 w-96" />

      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <p className="uppercase tracking-[5px] text-[#38BDF8] font-semibold">
            OUR PURPOSE
          </p>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            Vision & Mission
          </h2>

          <p className="text-[#94A3B8] mt-6 max-w-3xl mx-auto leading-8">
            Our commitment is to build intelligent software solutions that help
            businesses innovate, automate and grow through Artificial
            Intelligence and modern technology.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Vision */}

          <motion.div

            initial={{ opacity: 0, y: 60 }}

            whileInView={{ opacity: 1, y: 0 }}

            transition={{ duration: .7 }}

            viewport={{ once: true }}

            whileHover={{
              y: -10,
              scale: 1.02
            }}

            className="
            rounded-3xl
            border
            border-[#2A3648]
            bg-[#1A2233]/70
            backdrop-blur-xl
            p-10
            "

          >

            <div className="
            h-16
            w-16
            rounded-2xl
            bg-blue-600/20
            flex
            items-center
            justify-center
            ">

              <Eye
                size={34}
                className="text-[#38BDF8]"
              />

            </div>

            <h3 className="
            text-3xl
            font-bold
            mt-8
            text-white
            ">
              Our Vision
            </h3>

            <p className="
            mt-6
            text-[#94A3B8]
            leading-8
            ">

              To become one of India's most trusted technology companies by
              empowering organizations with intelligent software and
              AI-driven solutions that transform the way businesses operate.

            </p>

          </motion.div>

          {/* Mission */}

          <motion.div

            initial={{ opacity: 0, y: 60 }}

            whileInView={{ opacity: 1, y: 0 }}

            transition={{ duration: .7, delay: .2 }}

            viewport={{ once: true }}

            whileHover={{
              y: -10,
              scale: 1.02
            }}

            className="
            rounded-3xl
            border
            border-[#2A3648]
            bg-[#1A2233]/70
            backdrop-blur-xl
            p-10
            "

          >

            <div className="
            h-16
            w-16
            rounded-2xl
            bg-cyan-500/20
            flex
            items-center
            justify-center
            ">

              <Target
                size={34}
                className="text-[#38BDF8]"
              />

            </div>

            <h3 className="
            text-3xl
            font-bold
            mt-8
            text-white
            ">
              Our Mission
            </h3>

            <ul className="
            mt-6
            space-y-4
            text-[#94A3B8]
            leading-7
            ">

              <li>✓ Build high-quality software solutions.</li>

              <li>✓ Help organizations adopt AI responsibly.</li>

              <li>✓ Reduce operational inefficiencies.</li>

              <li>✓ Deliver scalable digital products.</li>

              <li>✓ Enable innovation through technology.</li>

            </ul>

          </motion.div>

        </div>

      </div>

    </section>
  );
}