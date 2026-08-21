"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Educational Institution",
    message: "AD TECH helped us adopt modern digital solutions and improve our technology infrastructure.",
  },
  {
    name: "Startup Founder",
    message: "Their AI automation approach helped us reduce manual efforts and improve productivity.",
  },
  {
    name: "Business Enterprise",
    message: "A reliable technology partner delivering scalable and future-ready software solutions.",
  },
];

export default function Testimonials() {
  return (
    <section className="section-shell bg-[#0B1120]/70 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="section-eyebrow">Testimonials</p>
          <h2 className="mt-4 text-4xl font-bold text-[#F8FAFC] sm:text-5xl">
            What Our Partners Say
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="section-card rounded-[24px] p-8"
            >
              <div className="text-4xl text-cyan-300">“</div>
              <p className="mt-3 text-lg leading-8 text-[#CBD5E1]">{item.message}</p>
              <h3 className="mt-6 text-lg font-semibold text-[#F8FAFC]">{item.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}