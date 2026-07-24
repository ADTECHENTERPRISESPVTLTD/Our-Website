"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lightbulb,
  Users,
  Sparkles,
} from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    desc: "We build trust through transparency, responsibility and long-term relationships."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We continuously explore modern technologies to deliver future-ready solutions."
  },
  {
    icon: Users,
    title: "Customer First",
    desc: "Every product we build is designed around our clients' real business needs."
  },
  {
    icon: Sparkles,
    title: "Excellence",
    desc: "We strive to deliver high-quality software with exceptional user experiences."
  }
];

export default function CoreValues() {
  return (
    <section className="relative py-28 bg-[#0B1120] overflow-hidden">

      <div className="bg-glow-blue absolute left-0 top-10 h-80 w-80" />
      <div className="bg-glow-cyan absolute right-0 bottom-0 h-96 w-96" />

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="text-center mb-20">

          <p className="uppercase tracking-[5px] text-[#38BDF8] font-semibold">
            OUR VALUES
          </p>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            What Drives Us
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-[#94A3B8] leading-8">
            Our values shape every decision we make and every solution we
            deliver.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {values.map((value, index) => {

            const Icon = value.icon;

            return (

              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: .6,
                  delay: index * .15
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -12,
                  scale: 1.04
                }}
                className="
                rounded-3xl
                border
                border-[#2A3648]
                bg-[#1A2233]/70
                backdrop-blur-xl
                p-8
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

                  <Icon
                    size={34}
                    className="text-[#38BDF8]"
                  />

                </div>

                <h3 className="text-2xl font-bold text-white mt-8">
                  {value.title}
                </h3>

                <p className="text-[#94A3B8] leading-7 mt-5">
                  {value.desc}
                </p>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}