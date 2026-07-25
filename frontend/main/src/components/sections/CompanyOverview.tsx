"use client";

import { motion } from "framer-motion";

export default function CompanyOverview() {
  return (
    <section className="bg-[#0B1120] py-20 px-6">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        <motion.div
          initial={{opacity:0, x:-50}}
          whileInView={{opacity:1, x:0}}
          transition={{duration:0.6}}
          viewport={{once:true}}
        >

          <p className="text-[#94A3B8] uppercase tracking-widest">
            About AD TECH
          </p>

          <h2 className="text-4xl font-bold text-[#F8FAFC] mt-3">
            Building Intelligent Solutions For The Digital Future
          </h2>

          <p className="text-[#CBD5E1] mt-5 leading-relaxed">
            AD TECH Enterprises Pvt. Ltd. is a modern software development
            and AI Automation company helping organizations adopt intelligent
            technology solutions.
          </p>

          <p className="text-[#94A3B8] mt-4 leading-relaxed">
            We build scalable software products, AI-powered workflows,
            automation solutions, and digital platforms that help businesses
            improve efficiency and growth.
          </p>

        </motion.div>


        <motion.div
          initial={{opacity:0, x:50}}
          whileInView={{opacity:1, x:0}}
          transition={{duration:0.6}}
          viewport={{once:true}}
          className="bg-[#1A2233] border border-[#2A3648] rounded-2xl p-10"
        >

          <h3 className="text-2xl font-semibold text-[#F8FAFC]">
            Our Vision
          </h3>

          <p className="text-[#94A3B8] mt-3">
            To become one of India's most trusted technology companies by
            empowering organizations with AI-driven solutions.
          </p>


          <h3 className="text-2xl font-semibold text-[#F8FAFC] mt-8">
            Our Mission
          </h3>

          <p className="text-[#94A3B8] mt-3">
            Making advanced technology accessible through software,
            automation, and Artificial Intelligence.
          </p>

        </motion.div>

      </div>

    </section>
  );
}