"use client";

import { motion } from "framer-motion";
import { Cpu, Bot, Globe, Cloud } from "lucide-react";
import Card from "@/components/ui/Card";

export default function WhoWeAre() {
  return (
    <section className="relative bg-transparent py-24 overflow-hidden">

      {/* Background Glow */}

      <div className="bg-glow-blue absolute left-0 top-20 h-72 w-72" />

      <div className="bg-glow-cyan absolute right-0 bottom-10 h-80 w-80" />

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

          <h2 className="mt-5 text-4xl font-bold leading-tight text-white">
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

          <div className="relative rounded-3xl border border-[#2A3648] bg-[#1A2233]/60 backdrop-blur-xl p-5 sm:p-8 md:p-10">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 auto-rows-fr">

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="rounded-2xl h-full flex"
              >
                <Card className="w-full h-full rounded-2xl border border-[#2A3648] bg-[#0F172A] p-4 sm:p-6">
                  <div className="flex flex-col h-full justify-between sm:justify-start">
                    <div>
                      <Cpu size={40} className="h-8 w-8 sm:h-10 sm:w-10 text-[#38BDF8]" />
                      <h3 className="mt-4 sm:mt-5 text-white font-semibold text-lg sm:text-xl leading-snug break-words">
                        Software
                      </h3>
                      <p className="text-[#94A3B8] mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed">
                        Modern scalable applications for every business.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="rounded-2xl h-full flex"
              >
                <Card className="w-full h-full rounded-2xl border border-[#2A3648] bg-[#0F172A] p-4 sm:p-6">
                  <div className="flex flex-col h-full justify-between sm:justify-start">
                    <div>
                      <Bot size={40} className="h-8 w-8 sm:h-10 sm:w-10 text-[#38BDF8]" />
                      <h3 className="mt-4 sm:mt-5 text-white font-semibold text-lg sm:text-xl leading-snug break-words">
                        Artificial Intelligence
                      </h3>
                      <p className="text-[#94A3B8] mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed">
                        AI Chatbots, Automation and Intelligent Systems.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="rounded-2xl h-full flex"
              >
                <Card className="w-full h-full rounded-2xl border border-[#2A3648] bg-[#0F172A] p-4 sm:p-6">
                  <div className="flex flex-col h-full justify-between sm:justify-start">
                    <div>
                      <Cloud size={40} className="h-8 w-8 sm:h-10 sm:w-10 text-[#38BDF8]" />
                      <h3 className="mt-4 sm:mt-5 text-white font-semibold text-lg sm:text-xl leading-snug break-words">
                        Cloud
                      </h3>
                      <p className="text-[#94A3B8] mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed">
                        Reliable cloud infrastructure and deployment.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="rounded-2xl h-full flex"
              >
                <Card className="w-full h-full rounded-2xl border border-[#2A3648] bg-[#0F172A] p-4 sm:p-6">
                  <div className="flex flex-col h-full justify-between sm:justify-start">
                    <div>
                      <Globe size={40} className="text-[#38BDF8] h-8 w-8 sm:h-10 sm:w-10" />
                      <h3 className="mt-4 sm:mt-5 text-white font-semibold text-lg sm:text-xl leading-snug break-words">
                        Digital Transformation
                      </h3>
                      <p className="text-[#94A3B8] mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed">
                        Helping businesses become AI-powered organizations.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}