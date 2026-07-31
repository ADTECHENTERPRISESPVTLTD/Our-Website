
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import { useRequirement } from "@/hooks/useRequirement";

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
  const {
    formData,
    errors,
    isSubmitting,
    submitted,
    apiError,
    handleChange,
    handleSubmit,
    resetForm,
  } = useRequirement();

  if (submitted) {
    return (
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-10 md:p-14 text-center border border-cyan-500/20 shadow-[0_40px_80px_rgba(2,12,27,0.45)]">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400/20 to-emerald-500/20 mb-6"
              >
                <CheckCircle size={48} className="text-green-400" />
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Requirement Submitted!
              </h2>
              <p className="text-lg text-slate-400 max-w-lg mx-auto leading-relaxed">
                Thank you, <span className="text-cyan-400 font-semibold">{formData.contactPerson}</span>! We&apos;ve received your project requirements and our team will review them shortly.
              </p>
              <div className="mt-8 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-6 py-3 text-cyan-300 text-sm">
                We typically respond within 24-48 hours
              </div>
              <br />
              <button
                onClick={resetForm}
                className="mt-4 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-6 py-3 text-cyan-300 text-sm hover:bg-cyan-400/20 transition-all duration-300"
              >
                Submit Another Requirement
              </button>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="grid gap-8 lg:grid-cols-[1.04fr_0.96fr]">
    <Card className="border border-cyan-500/10 p-10 shadow-[0_40px_80px_rgba(2,12,27,0.45)]">
          <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm uppercase tracking-[0.24em] text-cyan-300">
            Why submit here
          </span>

          <h2 className="mt-6 text-3xl font-bold text-white">A polished intake for your next project</h2>
          <p className="mt-4 max-w-xl text-slate-400 leading-relaxed">
            Provide a clear brief and our team will convert your requirement into a strong action plan.
          </p>

          <div className="mt-10 space-y-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-xl border border-white/10 bg-[#0f1724]/80 p-5">
                <h3 className="text-lg font-semibold text-white">{benefit.title}</h3>
                <p className="mt-2 text-slate-400">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-[#0b1322] p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Process</p>
              <p className="mt-3 text-slate-400">We review, refine, and respond within 24-48 hours.</p>
            </div>
            <div className="rounded-xl bg-[#0b1322] p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Scope</p>
              <p className="mt-3 text-slate-400">Share goals, budget, timeline, and must-have features.</p>
            </div>
          </div>
        </Card>

        <Card className="border border-cyan-500/20 p-10 shadow-[0_40px_80px_rgba(2,12,27,0.45)]">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Submit your requirement</p>
          <h2 className="mt-3 text-3xl font-bold text-white">Let&apos;s get started</h2>
          <p className="mt-3 text-slate-400">The more details you provide, the better we can propose the right solution.</p>

          {/* API Error */}
          {apiError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 rounded-xl border border-red-400/30 bg-gradient-to-r from-red-500/10 to-rose-500/10 p-4 text-red-300 font-medium"
            >
                <AlertTriangle size={16} className="inline mr-1" /> {apiError}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <input
                  name="companyName"
                  placeholder="Company Name *"
                  value={formData.companyName}
                  onChange={handleChange}
                  className={`w-full rounded-xl border bg-[#0b1322] px-5 py-4 text-white outline-none transition focus:border-cyan-400 ${
                    errors.companyName ? "border-red-400" : "border-white/10"
                  }`}
                />
                {errors.companyName && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 text-sm text-red-400 pl-2">
                    {errors.companyName}
                  </motion.p>
                )}
              </div>
              <div>
                <input
                  name="contactPerson"
                  placeholder="Contact Person *"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className={`w-full rounded-xl border bg-[#0b1322] px-5 py-4 text-white outline-none transition focus:border-cyan-400 ${
                    errors.contactPerson ? "border-red-400" : "border-white/10"
                  }`}
                />
                {errors.contactPerson && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 text-sm text-red-400 pl-2">
                    {errors.contactPerson}
                  </motion.p>
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full rounded-xl border bg-[#0b1322] px-5 py-4 text-white outline-none transition focus:border-cyan-400 ${
                    errors.email ? "border-red-400" : "border-white/10"
                  }`}
                />
                {errors.email && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 text-sm text-red-400 pl-2">
                    {errors.email}
                  </motion.p>
                )}
              </div>
              <div>
                <input
                  name="phoneNumber"
                  placeholder="Phone Number *"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`w-full rounded-xl border bg-[#0b1322] px-5 py-4 text-white outline-none transition focus:border-cyan-400 ${
                    errors.phoneNumber ? "border-red-400" : "border-white/10"
                  }`}
                />
                {errors.phoneNumber && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 text-sm text-red-400 pl-2">
                    {errors.phoneNumber}
                  </motion.p>
                )}
              </div>
            </div>

            <div>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                className={`w-full rounded-xl border bg-[#0b1322] px-5 py-4 text-white outline-none transition focus:border-cyan-400 appearance-none ${ // Added appearance-none
                  errors.businessType ? "border-red-400" : "border-white/10" 
                }`}
              >
                <option value="" disabled>
                  Select Business Type *
                </option>
                {services.map((service) => (
                  <option key={service} value={service} className="bg-[#0b1322] text-white">
                    {service}
                  </option>
                ))}
              </select>
              {errors.businessType && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 text-sm text-red-400 pl-2">
                  {errors.businessType}
                </motion.p>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                name="budget"
                placeholder="Budget Estimate (optional)"
                value={formData.budget}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-[#0b1322] px-5 py-4 text-white outline-none transition focus:border-cyan-400"
              />
              <input
                name="timeline"
                placeholder="Expected Timeline (optional)"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-[#0b1322] px-5 py-4 text-white outline-none transition focus:border-cyan-400"
              />
            </div>

            <div>
              <textarea
                name="projectRequirement"
                rows={6}
                placeholder="Describe your requirement in detail *"
                value={formData.projectRequirement}
                onChange={handleChange}
                className={`w-full rounded-xl border bg-[#0b1322] px-5 py-4 text-white outline-none transition focus:border-cyan-400 ${
                  errors.projectRequirement ? "border-red-400" : "border-white/10"
                }`}
              />
              {errors.projectRequirement && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 text-sm text-red-400 pl-2">
                  {errors.projectRequirement}
                </motion.p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:shadow-xl hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Requirement"
              )}
            </button>
          </form>
        </Card>
      </div>
    </section>
  );
}
