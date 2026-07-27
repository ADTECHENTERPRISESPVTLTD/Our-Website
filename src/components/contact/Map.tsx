"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function Map() {
  return (
    <section className="section-shell bg-[#0B1120] pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-sm font-medium text-cyan-300">
            <MapPin size={16} />
            Our Location
          </div>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">Find Us Here</h2>
          <p className="mt-3 text-slate-400">Nagpur, Maharashtra — We serve clients nationwide.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-3xl border border-slate-700 shadow-[0_0_40px_rgba(34,211,238,0.08)]"
        >
          <iframe
            title="AdTech Location - Nagpur, Maharashtra"
            src="https://maps.google.com/maps?q=Nagpur%20Maharashtra&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="h-[400px] w-full border-0"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
}

