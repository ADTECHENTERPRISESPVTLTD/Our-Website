"use client";

import { motion } from "framer-motion";
import {
  Search,
  PenTool,
  Code2,
  Rocket,
  Headphones,
} from "lucide-react";

const process = [
  {
    step: "01",
    title: "Discover",
    icon: Search,
    description:
      "We understand your business goals, challenges, and requirements before starting any project.",
  },
  {
    step: "02",
    title: "Design",
    icon: PenTool,
    description:
      "Our team creates intuitive UI/UX designs and scalable solution architecture.",
  },
  {
    step: "03",
    title: "Develop",
    icon: Code2,
    description:
      "Using modern technologies, we build secure, scalable, and high-performance software.",
  },
  {
    step: "04",
    title: "Deploy",
    icon: Rocket,
    description:
      "Applications are deployed with cloud-ready infrastructure and optimized performance.",
  },
  {
    step: "05",
    title: "Support",
    icon: Headphones,
    description:
      "Continuous maintenance, monitoring, upgrades, and dedicated client support.",
  },
];

export default function ProcessSection() {
  return (
    <section className="relative py-32 bg-[#0B1120] overflow-hidden">

      {/* Background Glow */}

      <div className="absolute left-10 top-20 h-96 w-96 rounded-full bg-blue-600/10 blur-[180px]" />
      <div className="absolute right-10 bottom-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-[180px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="text-center mb-24">

          <p className="uppercase tracking-[5px] text-[#38BDF8] font-semibold">
            OUR PROCESS
          </p>

          <h2 className="text-5xl md:text-6xl font-bold text-white mt-6">
            From Idea to Innovation
          </h2>

          <p className="mt-6 text-[#94A3B8] max-w-3xl mx-auto leading-8">
            We follow a structured development process to ensure every solution
            is reliable, scalable, and built for long-term success.
          </p>

        </div>

        <div className="relative">

          {/* Vertical Line */}

          <div className="absolute left-8 top-0 h-full w-[3px] bg-gradient-to-b from-[#2563EB] via-[#38BDF8] to-transparent"></div>

          <div className="space-y-16">

            {process.map((item, index) => {

              const Icon = item.icon;

              return (

                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: 80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: .7,
                    delay: index * .15,
                  }}
                  className="relative flex items-start gap-10"
                >

                  {/* Circle */}

                  <div className="
                  relative
                  z-10
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-[#2563EB]
                  shadow-[0_0_30px_rgba(37,99,235,.6)]
                  ">

                    <Icon className="text-white" size={28} />

                  </div>

                  {/* Card */}

                  <motion.div

                    whileHover={{
                      y: -6,
                      scale: 1.02,
                    }}

                    className="
                    flex-1
                    rounded-3xl
                    border
                    border-[#2A3648]
                    bg-[#1A2233]/70
                    backdrop-blur-xl
                    p-8
                    "

                  >

                    <span className="text-[#38BDF8] font-bold text-lg">
                      STEP {item.step}
                    </span>

                    <h3 className="text-3xl font-bold text-white mt-3">
                      {item.title}
                    </h3>

                    <p className="text-[#94A3B8] mt-5 leading-8">
                      {item.description}
                    </p>

                  </motion.div>

                </motion.div>

              );

            })}

          </div>

        </div>

      </div>

    </section>
  );
}