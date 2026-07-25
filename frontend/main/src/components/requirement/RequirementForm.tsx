"use client";

import { useState } from "react";

const services = [
  "AI Automation",
  "Software Development",
  "Web Development",
  "Mobile Application",
  "Training Solutions",
];

const benefits = [
  {
    title: "Tailored delivery plan",
    description: "We review your scope and suggest the fastest, most reliable build path.",
  },
  {
    title: "Clear project vision",
    description: "We help refine your requirement to make sure the final solution fits your goals.",
  },
  {
    title: "Fast expert response",
    description: "Our team reaches out quickly with next steps and estimated timelines.",
  },
];

export default function RequirementForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="grid gap-8 lg:grid-cols-[1.04fr_0.96fr]">
        <div className="glass-card border border-cyan-500/10 p-10 shadow-[0_40px_80px_rgba(2,12,27,0.45)]">
          <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm uppercase tracking-[0.24em] text-cyan-300">
            Why submit here
          </span>

          <h2 className="mt-6 text-3xl font-bold text-white">A polished intake for your next project</h2>
          <p className="mt-4 max-w-xl text-slate-400 leading-relaxed">
            Provide a clear brief and our team will convert your requirement into a strong action plan.
            This page is strictly frontend, so backend processing is not included.
          </p>

          <div className="mt-10 space-y-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-3xl border border-white/10 bg-[#0f1724]/80 p-5">
                <h3 className="text-lg font-semibold text-white">{benefit.title}</h3>
                <p className="mt-2 text-slate-400">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-[#0b1322] p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Process</p>
              <p className="mt-3 text-slate-400">We review, refine, and respond within 24-48 hours.</p>
            </div>
            <div className="rounded-3xl bg-[#0b1322] p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Scope</p>
              <p className="mt-3 text-slate-400">Share goals, budget, timeline, and must-have features.</p>
            </div>
          </div>
        </div>

        <div className="glass-card border border-cyan-500/20 p-10 shadow-[0_40px_80px_rgba(2,12,27,0.45)]">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Submit your requirement</p>
          <h2 className="mt-3 text-3xl font-bold text-white">Let’s get started</h2>
          <p className="mt-3 text-slate-400">The more details you provide, the better we can propose the right solution.</p>

          {submitted && (
            <div className="mt-6 rounded-3xl border border-cyan-400/30 bg-cyan-400/10 p-4 text-cyan-100">
              Thank you! Your requirement has been submitted successfully.
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-3xl border border-white/10 bg-[#0b1322] px-5 py-4 text-white outline-none transition focus:border-cyan-400"
              />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-3xl border border-white/10 bg-[#0b1322] px-5 py-4 text-white outline-none transition focus:border-cyan-400"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-3xl border border-white/10 bg-[#0b1322] px-5 py-4 text-white outline-none transition focus:border-cyan-400"
              />
              <input
                name="company"
                placeholder="Company / Organization"
                value={formData.company}
                onChange={handleChange}
                className="w-full rounded-3xl border border-white/10 bg-[#0b1322] px-5 py-4 text-white outline-none transition focus:border-cyan-400"
              />
            </div>

            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full rounded-3xl border border-white/10 bg-[#0b1322] px-5 py-4 text-white outline-none transition focus:border-cyan-400"
            >
              <option value="" disabled>
                Select Service
              </option>
              {services.map((service) => (
                <option key={service} value={service} className="bg-[#0b1322] text-white">
                  {service}
                </option>
              ))}
            </select>

            <textarea
              name="message"
              rows={6}
              placeholder="Describe your requirement..."
              value={formData.message}
              onChange={handleChange}
              className="w-full rounded-3xl border border-white/10 bg-[#0b1322] px-5 py-4 text-white outline-none transition focus:border-cyan-400"
            />

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-3xl bg-cyan-400 px-6 py-4 text-base font-semibold text-[#08101f] shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-300"
            >
              Submit Requirement
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
