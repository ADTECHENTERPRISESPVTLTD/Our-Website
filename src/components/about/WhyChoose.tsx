"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  Rocket,
  ShieldCheck,
  CloudCog,
  Users,
  Headphones,
} from "lucide-react";

const reasons = [
  {
    icon: BrainCircuit,
    title: "AI Powered Solutions",
    description:
      "We develop intelligent AI-driven software that automates workflows and improves productivity.",
  },
  {
    icon: Rocket,
    title: "Fast Development",
    description:
      "Agile development methodology ensures rapid delivery without compromising quality.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "Every application follows modern security standards with scalable architecture.",
  },
  {
    icon: CloudCog,
    title: "Cloud Ready",
    description:
      "Deploy seamlessly on cloud infrastructure with high availability and performance.",
  },
  {
    icon: Users,
    title: "Client First",
    description:
      "Every solution is tailored according to your business objectives and user needs.",
  },
  {
    icon: Headphones,
    title: "24×7 Support",
    description:
      "Continuous support, maintenance and future upgrades whenever your business grows.",
  },
];

export default function WhyChoose() {
  return (
    <section className="relative py-28 overflow-hidden bg-[#0B1120]">

      {/* Background Glow */}

      <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue-600/10 blur-[150px]" />
      <div className="absolute -right-20 bottom-0 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[170px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >

          <p className="uppercase tracking-[5px] text-[#38BDF8] font-semibold">
            WHY CHOOSE US
          </p>

          <h2 className="text-5xl md:text-6xl font-bold text-white mt-5">
            Why Choose AD TECH
          </h2>

          <p className="max-w-3xl mx-auto mt-7 text-[#94A3B8] leading-8">
            We combine innovation, Artificial Intelligence, cloud technologies
            and modern software engineering to deliver reliable digital
            transformation solutions.
          </p>

        </motion.div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

          {reasons.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div

                key={index}

                initial={{
                  opacity: 0,
                  y: 50,
                }}

                whileInView={{
                  opacity: 1,
                  y: 0,
                }}

                viewport={{ once: true }}

                transition={{
                  duration: .6,
                  delay: index * .1,
                }}

                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}

                className="
                relative
                overflow-hidden
                rounded-[28px]
                border
                border-[#2A3648]
                bg-white/5
                backdrop-blur-xl
                p-8
                group
                duration-300
                "

              >

                <div className="
                absolute
                inset-0
                opacity-0
                group-hover:opacity-100
                duration-500
                bg-gradient-to-br
                from-[#2563EB]/10
                to-[#38BDF8]/5
                " />

                <div className="
                relative
                h-16
                w-16
                rounded-2xl
                bg-[#2563EB]/15
                flex
                items-center
                justify-center
                group-hover:bg-[#2563EB]
                duration-300
                ">

                  <Icon
                    size={34}
                    className="
                    text-[#38BDF8]
                    group-hover:text-white
                    duration-300
                    "
                  />

                </div>

                <h3 className="
                relative
                mt-8
                text-2xl
                font-bold
                text-white
                ">

                  {item.title}

                </h3>

                <p className="
                relative
                mt-5
                text-[#94A3B8]
                leading-8
                ">

                  {item.description}

                </p>

                <div className="
                absolute
                bottom-0
                left-0
                h-1
                w-0
                bg-gradient-to-r
                from-[#2563EB]
                to-[#38BDF8]
                duration-500
                group-hover:w-full
                " />

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}