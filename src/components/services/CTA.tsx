import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-[#0B1120] py-24">
      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-[#111827] to-[#0F172A] p-12 text-center">

          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-400">
            LET'S BUILD TOGETHER
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            Ready to Start Your
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Next Digital Project?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            Whether it's a website, mobile application, AI solution or cloud
            platform, we're ready to transform your ideas into reality.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-slate-900 transition hover:scale-105 hover:bg-cyan-400"
            >
              Get Free Consultation
              <ArrowRight size={20} />
            </Link>

            <Link
              href="/about"
              className="rounded-xl border border-slate-700 px-8 py-4 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-400"
            >
              Learn More
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}