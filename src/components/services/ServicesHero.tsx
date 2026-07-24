"use client";

import Link from "next/link";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

export default function ServicesHero() {
  return (
    <section className="site-hero pt-36 pb-24">
      <div className="bg-glow-cyan -top-40 -left-40 h-[450px] w-[450px]" />
      <div className="bg-glow-blue -bottom-40 -right-40 h-[450px] w-[450px]" />

      <div className="bg-grid compact" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center lg:px-8">
        <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium tracking-wide text-cyan-400">
          OUR SERVICES
        </span>

        <AnimatedHeading
          text={"Smart Digital Solutions For Modern Businesses"}
          className="mt-8 text-5xl md:text-6xl lg:text-7xl"
          tag="h1"
        />

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-400 md:text-xl">
          We build high-performance websites, intelligent AI solutions,
          scalable cloud platforms, and modern mobile applications that help
          your business grow faster.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-slate-900 transition-all duration-300 hover:scale-105 hover:bg-cyan-400"
          >
            Start Your Project
          </Link>

          <Link
            href="/about"
            className="rounded-xl border border-slate-700 px-8 py-4 font-semibold text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-400"
          >
            Learn More
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-4xl font-bold text-cyan-400">50+</h3>
            <p className="mt-2 text-slate-400">Projects</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-cyan-400">25+</h3>
            <p className="mt-2 text-slate-400">Clients</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-cyan-400">99%</h3>
            <p className="mt-2 text-slate-400">Success Rate</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-cyan-400">24/7</h3>
            <p className="mt-2 text-slate-400">Support</p>
          </div>
        </div>
      </div>
    </section>
  );
}