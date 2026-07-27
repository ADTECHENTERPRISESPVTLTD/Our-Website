"use client";

import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import { Phone, Calendar, Clock, User, Building2, MessageSquare, Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import { useCallbackForm } from "@/hooks/useCallbackForm";

export default function CallbackForm() {
  const {
    formData,
    errors,
    isSubmitting,
    submitted,
    apiError,
    handleChange,
    handleSubmit,
    resetForm,
    today,
  } = useCallbackForm();

  if (submitted) {
    return (
      <section className="section-shell bg-[#0B1120] py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-10 md:p-14 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400/20 to-emerald-500/20 mb-6"
              >
                <CheckCircle size={48} className="text-green-400" />
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Callback Request Submitted!
              </h2>
              <p className="text-lg text-slate-400 max-w-lg mx-auto leading-relaxed">
                Thank you, <span className="text-cyan-400 font-semibold">{formData.name}</span>! We&apos;ve received your request and will call you back on{" "}
                <span className="text-cyan-400 font-semibold">{formData.preferredDate}</span> at{" "}
                <span className="text-cyan-400 font-semibold">{formData.preferredTime}</span>.
              </p>
              <div className="mt-8 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-6 py-3 text-cyan-300 text-sm">
                Our team will contact you within 24 hours
              </div>
              <br />
              <button
                onClick={resetForm}
                className="mt-4 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-6 py-3 text-cyan-300 text-sm hover:bg-cyan-400/20 transition-all duration-300"
              >
                Request Another Callback
              </button>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-shell bg-[#0B1120] py-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="p-8 md:p-10">
            <div className="flex items-center gap-4 mb-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                <Phone size={24} className="text-cyan-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Request a Callback</h2>
                <p className="mt-1 text-slate-400">
                  Fill in your details and we&apos;ll call you at your preferred time.
                </p>
              </div>
            </div>

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

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Name & Company - Row */}
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className={`w-full rounded-xl border bg-[#0B1120] px-5 py-3.5 pl-11 text-white outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(34,211,238,0.1)] ${
                        errors.name
                          ? "border-red-400 focus:border-red-400"
                          : "border-slate-700 focus:border-cyan-400"
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1.5 text-sm text-red-400 pl-1"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <Building2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company Name"
                      className={`w-full rounded-xl border bg-[#0B1120] px-5 py-3.5 pl-11 text-white outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(34,211,238,0.1)] ${
                        errors.company
                          ? "border-red-400 focus:border-red-400"
                          : "border-slate-700 focus:border-cyan-400"
                      }`}
                    />
                  </div>
                  {errors.company && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1.5 text-sm text-red-400 pl-1"
                    >
                      {errors.company}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div>
                <div className="relative">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className={`w-full rounded-xl border bg-[#0B1120] px-5 py-3.5 pl-11 text-white outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(34,211,238,0.1)] ${
                      errors.phoneNumber
                        ? "border-red-400 focus:border-red-400"
                        : "border-slate-700 focus:border-cyan-400"
                    }`}
                  />
                </div>
                {errors.phoneNumber && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1.5 text-sm text-red-400 pl-1"
                  >
                    {errors.phoneNumber}
                  </motion.p>
                )}
              </div>

              {/* Date & Time - Row */}
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      min={today}
                      className={`w-full rounded-xl border bg-[#0B1120] px-5 py-3.5 pl-11 text-white outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(34,211,238,0.1)] [color-scheme:dark] ${
                        errors.preferredDate
                          ? "border-red-400 focus:border-red-400"
                          : "border-slate-700 focus:border-cyan-400"
                      }`}
                    />
                  </div>
                  {errors.preferredDate && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1.5 text-sm text-red-400 pl-1"
                    >
                      {errors.preferredDate}
                    </motion.p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="time"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className={`w-full rounded-xl border bg-[#0B1120] px-5 py-3.5 pl-11 text-white outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(34,211,238,0.1)] [color-scheme:dark] ${
                        errors.preferredTime
                          ? "border-red-400 focus:border-red-400"
                          : "border-slate-700 focus:border-cyan-400"
                      }`}
                    />
                  </div>
                  {errors.preferredTime && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1.5 text-sm text-red-400 pl-1"
                    >
                      {errors.preferredTime}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <div className="relative">
                  <MessageSquare size={18} className="absolute left-4 top-3 text-slate-500" />
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Brief message about what you'd like to discuss..."
                    className={`w-full rounded-xl border bg-[#0B1120] px-5 py-3.5 pl-11 text-white outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(34,211,238,0.1)] resize-none ${
                      errors.message
                        ? "border-red-400 focus:border-red-400"
                        : "border-slate-700 focus:border-cyan-400"
                    }`}
                  />
                </div>
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1.5 text-sm text-red-400 pl-1"
                  >
                    {errors.message}
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={isSubmitting ? {} : { scale: 1.02 }}
                whileTap={isSubmitting ? {} : { scale: 0.98 }}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Phone size={18} className="transition-transform group-hover:translate-x-1" />
                    Request Callback
                  </>
                )}
              </motion.button>
            </form>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

