"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="bg-[#0B1120] py-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">

        <div className="rounded-3xl border border-slate-800 bg-[#111827] p-8 md:p-10">

          <h2 className="text-3xl font-bold text-white">
            Send Us A Message
          </h2>

          <p className="mt-3 text-slate-400">
            Tell us about your project requirements and we will get back to you.
          </p>

          {submitted && (
            <div className="mt-6 rounded-xl border border-cyan-400/30 bg-cyan-400/10 p-4 text-cyan-400">
              Thank you! We will contact you soon.
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full rounded-xl border border-slate-700 bg-[#0B1120] px-5 py-3 text-white outline-none transition focus:border-cyan-400"
            />

            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full rounded-xl border border-slate-700 bg-[#0B1120] px-5 py-3 text-white outline-none transition focus:border-cyan-400"
            />

            <input
              type="text"
              placeholder="Subject"
              required
              className="w-full rounded-xl border border-slate-700 bg-[#0B1120] px-5 py-3 text-white outline-none transition focus:border-cyan-400"
            />

            <textarea
              placeholder="Your Message"
              rows={5}
              required
              className="w-full rounded-xl border border-slate-700 bg-[#0B1120] px-5 py-3 text-white outline-none transition focus:border-cyan-400"
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-cyan-500 py-4 font-semibold text-slate-900 transition hover:bg-cyan-400"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}