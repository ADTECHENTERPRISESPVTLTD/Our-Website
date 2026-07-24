"use client";

import { motion } from "framer-motion";

const stats = [
  {
    number: "50+",
    title: "Projects Delivered",
  },
  {
    number: "20+",
    title: "Happy Clients",
  },
  {
    number: "10+",
    title: "AI Solutions",
  },
  {
    number: "24/7",
    title: "Support",
  },
];

export default function StatsSection() {
  return (
    <section className="relative py-28 bg-[#0B1120] overflow-hidden">

      {/* Background Glow */}

      <div className="bg-glow-blue absolute left-10 top-10 h-80 w-80" />

      <div className="bg-glow-cyan absolute right-10 bottom-10 h-96 w-96" />

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="text-center mb-20">

          <p className="uppercase tracking-[5px] text-[#38BDF8] font-semibold">
            OUR ACHIEVEMENTS
          </p>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            Numbers That Matter
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-[#94A3B8] leading-8">
            We believe in measurable success and delivering impactful
            technology solutions for every client.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item, index) => (

            <motion.div

              key={index}

              initial={{ opacity: 0, y: 60 }}

              whileInView={{ opacity: 1, y: 0 }}

              transition={{
                duration: .6,
                delay: index * .15
              }}

              viewport={{ once: true }}

              whileHover={{
                y: -10,
                scale: 1.05
              }}

              className="
              rounded-3xl
              border
              border-[#2A3648]
              bg-[#1A2233]/70
              backdrop-blur-xl
              text-center
              py-12
              "

            >

              <h3 className="
              text-6xl
              font-bold
              text-[#38BDF8]
              ">
                {item.number}
              </h3>

              <p className="
              mt-6
              text-lg
              text-[#94A3B8]
              ">
                {item.title}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}