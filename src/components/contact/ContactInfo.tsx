"use client";

import { motion } from "framer-motion";
import { contactInfo } from "@/data/contact";
import Card from "@/components/ui/Card";

export default function ContactInfo() {
  return (
    <section className="bg-[#0B1120]/70 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {contactInfo.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/50 hover:shadow-[0_0_35px_rgba(34,211,238,0.15)]">
                  <div className="flex items-start gap-5">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400"
                    >
                      <Icon size={26} />
                    </motion.div>

                    <div>
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      <a
                        href={item.link}
                        className="mt-2 block text-slate-400 transition hover:text-cyan-400"
                      >
                        {item.value}
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

