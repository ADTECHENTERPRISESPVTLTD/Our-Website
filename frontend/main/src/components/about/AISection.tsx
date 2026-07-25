"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Bot,
  Cpu,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Solutions",
    desc: "Intelligent systems designed for the future."
  },
  {
    icon: Bot,
    title: "Automation",
    desc: "Reduce repetitive work through AI."
  },
  {
    icon: Cpu,
    title: "Modern Technology",
    desc: "Latest software engineering practices."
  },
  {
    icon: Sparkles,
    title: "Innovation",
    desc: "Creating impactful digital experiences."
  }
];

export default function AISection() {
  return (
    <section className="relative py-32 bg-[#0B1120] overflow-hidden">

      {/* Background Glow */}

      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-[180px]" />

      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-[180px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}

          <motion.div
            initial={{ opacity:0,x:-60 }}
            whileInView={{ opacity:1,x:0 }}
            transition={{ duration:.8 }}
            viewport={{ once:true }}
          >

            <p className="uppercase tracking-[5px] text-[#38BDF8] font-semibold">
              AI FIRST COMPANY
            </p>

            <h2 className="text-5xl md:text-6xl font-bold text-white mt-6 leading-tight">
              Intelligent Technology
              <span className="block text-[#38BDF8]">
                Powered by AI
              </span>
            </h2>

            <p className="mt-8 text-[#94A3B8] leading-8 text-lg">

              At AD TECH Enterprises Pvt. Ltd. we integrate
              Artificial Intelligence into software products,
              automation systems and enterprise solutions,
              enabling organizations to work smarter,
              faster and more efficiently.

            </p>

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{ opacity:0,x:60 }}
            whileInView={{ opacity:1,x:0 }}
            transition={{ duration:.8 }}
            viewport={{ once:true }}
            className="grid grid-cols-2 gap-6"
          >

            {features.map((item,index)=>{

              const Icon=item.icon;

              return(

                <motion.div

                  key={index}

                  whileHover={{
                    scale:1.05,
                    y:-10
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

                  <h3 className="text-white text-2xl font-bold mt-8">
                    {item.title}
                  </h3>

                  <p className="text-[#94A3B8] mt-5 leading-7">
                    {item.desc}
                  </p>

                </motion.div>

              )

            })}

          </motion.div>

        </div>

      </div>

    </section>
  );
}