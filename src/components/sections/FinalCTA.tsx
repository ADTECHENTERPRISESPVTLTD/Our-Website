"use client";

import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="bg-[#111827] py-24 px-6">

      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}

          className="
          bg-[#1A2233]
          border border-[#2A3648]
          rounded-3xl
          p-10
          md:p-16
          text-center
          "
        >

          <p className="text-[#94A3B8] uppercase tracking-widest">
            Start Your Digital Transformation
          </p>


          <h2 className="
          text-4xl
          md:text-5xl
          font-bold
          text-[#F8FAFC]
          mt-4
          ">
            Ready to Build the Future with AI?
          </h2>


          <p className="
          text-[#CBD5E1]
          mt-6
          max-w-2xl
          mx-auto
          leading-relaxed
          ">
            Partner with AD TECH Enterprises Pvt. Ltd. to build
            scalable software solutions, automate business processes,
            and transform your organization with Artificial Intelligence.
          </p>


          <div className="flex flex-col md:flex-row justify-center gap-5 mt-8">


            <button
              className="
              bg-[#F8FAFC]
              text-[#0B1120]
              px-8
              py-3
              rounded-lg
              font-semibold
              hover:scale-105
              transition
              "
            >
              Get Started
            </button>


            <button
              className="
              border
              border-[#64748B]
              text-[#F8FAFC]
              px-8
              py-3
              rounded-lg
              hover:bg-[#0B1120]
              transition
              "
            >
              Contact Us
            </button>


          </div>


        </motion.div>

      </div>

    </section>
  );
}