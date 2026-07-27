"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import { SectionHeading } from "@/components/sectionheading";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Badge } from "@/components/badge";
import { Divider } from "@/components/divider";
import { useCareer } from "@/hooks/useCareer";
import { Loader2, CheckCircle, AlertTriangle, Check, X } from "lucide-react";

interface JobOpening {
  title: string;
  type: string;
  location: string;
  description: string;
}

const openJobs: JobOpening[] = [
  {
    title: "Full Stack Developer Intern",
    type: "Internship",
    location: "Remote / Hybrid",
    description: "Work with Next.js, React, and TypeScript to build scalable web applications and gain hands-on mentorship."
  },
  {
    title: "AI & Automation Engineer",
    type: "Full-time",
    location: "Remote",
    description: "Design and implement AI chatbots, LLM workflows, and business process automation solutions."
  },
  {
    title: "Mobile App Developer (Android/iOS)",
    type: "Internship / Full-time",
    location: "Remote",
    description: "Develop high-performance mobile business applications and student portals optimized for performance and security."
  },
  {
    title: "UI/UX Design Intern",
    type: "Internship",
    location: "Remote",
    description: "Create intuitive user flows, wireframes, and modern web interfaces focused on usability and accessibility."
  }
];

const internshipBenefits = [
  { title: "Real-World Projects", desc: "Gain hands-on experience working on production-grade software and enterprise client solutions." },
  { title: "Expert Mentorship", desc: "Learn modern development practices, clean code standards, and workflows directly from senior engineers." },
  { title: "AI-First Exposure", desc: "Work closely with cutting-edge AI automation, LLMs, and digital transformation architectures." },
  { title: "Career Growth", desc: "Build a robust professional portfolio and unlock full-time career opportunities upon successful completion." }
];

const hiringProcessSteps = [
  { step: "01", title: "Application Review", desc: "Our team reviews your resume, portfolio, or past projects submitted through the portal." },
  { step: "02", title: "Technical Task", desc: "A practical frontend or system assignment designed to evaluate your code quality and problem-solving skills." },
  { step: "03", title: "Technical & Cultural Interview", desc: "A discussion with our engineering leads regarding your technical mindset and alignment with our values." },
  { step: "04", title: "Onboarding", desc: "Welcome to the team! Begin your structured onboarding, mentorship, and project assignment." }
];

export default function CareerRoute() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const {
    formData,
    errors,
    resumeFile,
    isSubmitting,
    submitted,
    apiError,
    handleChange,
    handleResumeChange,
    handleSubmit,
    resetForm,
  } = useCareer();

  const handleApply = (title: string) => {
    setSelectedJob(title);
    resetForm();
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <main className="page-shell min-h-screen">
      {/* Hero Section */}
      <section className="site-hero relative overflow-hidden py-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="bg-glow-cyan -left-20 top-10 h-[400px] w-[400px] opacity-60" />
          <div className="bg-glow-blue -bottom-20 right-0 h-[400px] w-[400px] opacity-70" />
          <div className="bg-grid" />
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-sm uppercase tracking-[4px] text-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.15)] backdrop-blur-md"
          >
            JOIN OUR TEAM
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-5xl"
          >
            <AnimatedHeading
              text="Careers at AD TECH"
              className="text-4xl font-extrabold leading-tight text-[#F8FAFC] md:text-6xl xl:text-7xl"
              tag="h1"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 max-w-3xl text-lg leading-8 text-[#94A3B8]"
          >
            AD TECH Enterprises Pvt. Ltd. is a modern software development and AI automation company. 
            We partner with organizations to design, develop, and deploy scalable tech products while 
            empowering the next generation of technology professionals through meaningful internships 
            and real-world project experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-10 flex flex-wrap justify-center gap-5"
          >
            <Link
              href="#open-positions"
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              View Open Positions →
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-[#2A3648] bg-[#1A2233]/50 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400/10"
            >
              Contact Us
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mt-20 grid w-full max-w-5xl grid-cols-2 gap-6 md:grid-cols-4"
          >
            {[
              ["4+", "Open Positions"],
              ["100%", "Remote Friendly"],
              ["AI-First", "Development"],
              ["24/7", "Mentorship"],
            ].map(([value, label]) => (
              <motion.div
                key={label}
                whileHover={{ y: -8 }}
                className="rounded-2xl border border-[#2A3648] bg-[#1A2233]/60 p-6 backdrop-blur-md"
              >
                <h3 className="text-3xl font-bold text-[#38BDF8]">{value}</h3>
                <p className="mt-2 text-[#94A3B8]">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="w-full max-w-5xl mx-auto py-16 px-6">

        {/* Internship Benefits */}
        <div className="my-16">
          <div className="text-center mb-12">
            <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm uppercase tracking-[4px] text-cyan-300">
              Why Intern With Us?
            </span>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">Grow Your Skills With Real Projects</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {internshipBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#1A2233] border border-[#2A3648] rounded-2xl p-6 hover:border-cyan-400/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.08)] transition-all duration-300"
              >
                <Badge variant="success">Benefit</Badge>
                <h4 className="text-lg font-semibold text-[#F8FAFC] mt-3 mb-2">{benefit.title}</h4>
                <p className="text-[#CBD5E1] text-sm leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <Divider />

        {/* Hiring Process */}
        <div className="my-16">
          <div className="text-center mb-12">
            <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm uppercase tracking-[4px] text-cyan-300">
              Our Process
            </span>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">How We Hire</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {hiringProcessSteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#1A2233] border border-[#2A3648] rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-400/40 transition-all duration-300"
              >
                <div>
                  <span className="text-[#06B6D4] text-sm font-bold block mb-2">STEP {item.step}</span>
                  <h4 className="text-base font-semibold text-[#F8FAFC] mb-2">{item.title}</h4>
                  <p className="text-[#CBD5E1] text-xs leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <Divider />

        {/* Open Positions */}
        <div className="my-16" id="open-positions">
          <div className="text-center mb-12">
            <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm uppercase tracking-[4px] text-cyan-300">
              Join Us
            </span>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">Open Positions</h2>
            <p className="mt-3 text-slate-400">Find your role and apply today.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {openJobs.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#1A2233] border border-[#2A3648] rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-400/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.08)] transition-all duration-300"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-xl font-semibold text-[#F8FAFC]">{job.title}</h4>
                    <Badge variant="accent">{job.type}</Badge>
                  </div>
                  <p className="text-sm text-[#06B6D4] mb-4">{job.location}</p>
                  <p className="text-[#CBD5E1] text-sm mb-6 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                <PrimaryButton onClick={() => handleApply(job.title)} className="w-full text-center">
                  Apply Now
                </PrimaryButton>
              </motion.div>
            ))}
          </div>
        </div>

        <Divider />

        {/* Career FAQ */}
        <div className="my-16" id="career-faq">
          <div className="text-center mb-12">
            <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm uppercase tracking-[4px] text-cyan-300">
              FAQ
            </span>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">Career Questions</h2>
            <p className="mt-3 text-slate-400">Common questions about joining our team.</p>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              {
                q: "What is the duration of the internship?",
                a: "Internships typically run for 3 to 6 months, depending on the role and project requirements. We offer flexible start dates throughout the year."
              },
              {
                q: "Is the internship paid?",
                a: "Yes, we offer performance-based stipends and incentives for our interns. Exceptional contributors may also receive pre-placement offers."
              },
              {
                q: "Do I need to know AI/ML to apply?",
                a: "Not necessarily. While AI exposure is a plus, we look for strong fundamentals, problem-solving skills, and a willingness to learn new technologies."
              },
              {
                q: "What tools and technologies will I work with?",
                a: "Our tech stack includes Next.js, React, TypeScript, Node.js, Python, PostgreSQL, cloud platforms, and AI/LLM tools depending on your project."
              },
              {
                q: "Can I work remotely?",
                a: "Yes, all our positions are remote-friendly with optional hybrid collaboration for local team members."
              },
              {
                q: "What is the selection process?",
                a: "Our process includes application review, a practical technical task, a technical & cultural interview, and final onboarding."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-[#1A2233] border border-[#2A3648] rounded-xl overflow-hidden transition-colors hover:border-[#06B6D4]/30"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center font-medium text-[#F8FAFC] hover:bg-[#111827]/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-xl text-[#06B6D4]">
                    {openFaqIndex === index ? "−" : "+"}
                  </span>
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-4 text-[#CBD5E1] border-t border-[#374151] pt-3 text-sm leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Application Modal Form */}
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1A2233] border border-cyan-400/40 rounded-2xl p-8 max-w-2xl mx-auto shadow-xl mt-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#F8FAFC]">
                Apply for: <span className="text-[#06B6D4]">{selectedJob}</span>
              </h3>
              <button 
                onClick={() => setSelectedJob(null)}
                className="text-[#94A3B8] hover:text-[#F8FAFC] text-sm cursor-pointer"
              >
                <X size={16} className="inline" /> Close
              </button>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-400/20 to-emerald-500/20 mb-4"
                >
                  <CheckCircle size={36} className="text-green-400" />
                </motion.div>
                <p className="text-[#10B981] font-semibold text-lg mb-2">Application Submitted Successfully!</p>
                <p className="text-[#CBD5E1] text-sm">Thank you for your interest. Our team will review your application and get back to you soon.</p>
              </motion.div>
            ) : (
              <>
                {/* API Error */}
                {apiError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 rounded-lg border border-red-400/30 bg-gradient-to-r from-red-500/10 to-rose-500/10 p-3 text-red-300 text-sm font-medium"
                  >
                    <AlertTriangle size={16} className="inline mr-1" /> {apiError}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-[#CBD5E1] mb-1">Full Name *</label>
                    <input 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text" 
                      placeholder="John Doe" 
                      className={`w-full bg-[#111827] border ${
                        errors.name ? "border-red-400" : "border-[#2A3648]"
                      } rounded-lg px-4 py-2.5 text-[#F8FAFC] text-sm focus:outline-none focus:border-[#06B6D4] transition-all`}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm text-[#CBD5E1] mb-1">Email Address *</label>
                    <input 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email" 
                      placeholder="john@example.com" 
                      className={`w-full bg-[#111827] border ${
                        errors.email ? "border-red-400" : "border-[#2A3648]"
                      } rounded-lg px-4 py-2.5 text-[#F8FAFC] text-sm focus:outline-none focus:border-[#06B6D4] transition-all`}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm text-[#CBD5E1] mb-1">Phone Number *</label>
                    <input 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      type="tel" 
                      placeholder="+91 98765 43210" 
                      className={`w-full bg-[#111827] border ${
                        errors.phone ? "border-red-400" : "border-[#2A3648]"
                      } rounded-lg px-4 py-2.5 text-[#F8FAFC] text-sm focus:outline-none focus:border-[#06B6D4] transition-all`}
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-sm text-[#CBD5E1] mb-1">College / University *</label>
                    <input 
                      name="college"
                      value={formData.college}
                      onChange={handleChange}
                      type="text" 
                      placeholder="Your College Name" 
                      className={`w-full bg-[#111827] border ${
                        errors.college ? "border-red-400" : "border-[#2A3648]"
                      } rounded-lg px-4 py-2.5 text-[#F8FAFC] text-sm focus:outline-none focus:border-[#06B6D4] transition-all`}
                    />
                    {errors.college && <p className="mt-1 text-xs text-red-400">{errors.college}</p>}
                  </div>
                  <div>
                    <label className="block text-sm text-[#CBD5E1] mb-1">Skills *</label>
                    <input 
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      type="text" 
                      placeholder="React, TypeScript, Python, etc." 
                      className={`w-full bg-[#111827] border ${
                        errors.skills ? "border-red-400" : "border-[#2A3648]"
                      } rounded-lg px-4 py-2.5 text-[#F8FAFC] text-sm focus:outline-none focus:border-[#06B6D4] transition-all`}
                    />
                    {errors.skills && <p className="mt-1 text-xs text-red-400">{errors.skills}</p>}
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm text-[#CBD5E1] mb-1">Portfolio (optional)</label>
                      <input 
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleChange}
                        type="url" 
                        placeholder="https://yourportfolio.com" 
                        className="w-full bg-[#111827] border border-[#2A3648] rounded-lg px-4 py-2.5 text-[#F8FAFC] text-sm focus:outline-none focus:border-[#06B6D4] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#CBD5E1] mb-1">LinkedIn (optional)</label>
                      <input 
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        type="url" 
                        placeholder="https://linkedin.com/in/..." 
                        className="w-full bg-[#111827] border border-[#2A3648] rounded-lg px-4 py-2.5 text-[#F8FAFC] text-sm focus:outline-none focus:border-[#06B6D4] transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-[#CBD5E1] mb-1">Upload Resume * (PDF, max 5MB)</label>
                    <input 
                      name="resume"
                      onChange={handleResumeChange}
                      type="file" 
                      accept=".pdf,.doc,.docx"
                      className={`w-full bg-[#111827] border ${
                        errors.resume ? "border-red-400" : "border-[#2A3648]"
                      } rounded-lg px-4 py-2.5 text-[#F8FAFC] text-sm focus:outline-none focus:border-[#06B6D4] transition-all file:mr-3 file:rounded-md file:border-0 file:bg-cyan-500/20 file:px-3 file:py-1 file:text-sm file:text-cyan-300`}
                    />
                    {errors.resume && <p className="mt-1 text-xs text-red-400">{errors.resume}</p>}
                  {resumeFile && <p className="mt-1 text-xs text-green-400"><Check size={14} className="inline mr-1" />{resumeFile.name}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </section>
    </main>
  );
}

