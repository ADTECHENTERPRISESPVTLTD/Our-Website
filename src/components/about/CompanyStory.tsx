"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    year: "2022",
    title: "Company Founded",
    desc: "AD TECH Enterprises Pvt. Ltd. was established with a vision to deliver innovative software solutions."
  },
  {
    year: "2023",
    title: "Digital Transformation",
    desc: "Expanded into cloud solutions, web applications and enterprise software development."
  },
  {
    year: "2024",
    title: "Artificial Intelligence",
    desc: "Started delivering AI-powered automation, chatbots and intelligent business systems."
  },
  {
    year: "2025",
    title: "Future Vision",
    desc: "Building AI-first products that empower businesses through innovation and automation."
  }
];

export default function CompanyStory() {
  return (
    <section className="relative py-28 bg-[#0B1120] overflow-hidden">

      {/* Background Glow */}
      <div className="absolute left-10 top-20 h-80 w-80 rounded-full bg-blue-600/10 blur-[140px]" />
      <div className="bg-glow-cyan absolute right-10 bottom-20 h-96 w-96" />

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="text-center mb-20">

          <p className="uppercase tracking-[5px] text-[#38BDF8] font-semibold">
            OUR JOURNEY
          </p>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            Company Story
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-[#94A3B8] leading-8">
            Every milestone reflects our commitment towards innovation,
            technology and helping businesses embrace digital transformation.
          </p>

        </div>

        <div className="relative">

          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#2563EB] via-[#38BDF8] to-transparent"></div>

          {timeline.map((item, index) => (

            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: .7,
                delay: index * .2
              }}
              className={`relative mb-20 flex ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >

              {/* Circle */}

              <div className="absolute left-1/2 top-10 z-10 h-6 w-6 -translate-x-1/2 rounded-full bg-[#38BDF8] shadow-[0_0_25px_#38BDF8]" />

              {/* Card */}

              <motion.div
                whileHover={{
                  y: -8,
                  scale: 1.02
                }}
                className="
                w-full
                md:w-[45%]
                rounded-3xl
                border
                border-[#2A3648]
                bg-[#1A2233]/70
                backdrop-blur-xl
                p-8
                shadow-xl
                "
              >

                <span className="inline-block rounded-full bg-[#2563EB]/20 px-4 py-2 text-[#38BDF8] font-semibold">
                  {item.year}
                </span>

                <h3 className="mt-6 text-3xl font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-5 leading-8 text-[#94A3B8]">
                  {item.desc}
                </p>

              </motion.div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}