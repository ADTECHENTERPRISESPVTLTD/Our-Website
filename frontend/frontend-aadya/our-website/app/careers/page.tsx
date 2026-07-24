"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { SectionHeading } from "@/components/sectionheading";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Badge } from "@/components/badge";
import { Divider } from "@/components/divider";

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
  const [submitted, setSubmitted] = useState(false);

  const handleApply = (title: string) => {
    setSelectedJob(title);
    setSubmitted(false);
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-brand-primary-bg">
      <Navbar />
      <section className="w-full max-w-5xl mx-auto py-16 px-6">

        {/* Company Introduction */}
        <div className="text-center mb-16">
          <SectionHeading
            title="Careers at AD TECH"
            subtitle="Building Future Tech Talent through innovation, scalable software solutions, and an AI-first approach."
            centered={true}
          />
          <p className="text-brand-secondary-text text-base max-w-3xl mx-auto leading-relaxed mt-4">
            AD TECH Enterprises Pvt. Ltd. is a modern software development and AI automation company. We partner with organizations to design, develop, and deploy scalable tech products while empowering the next generation of technology professionals through meaningful internships and real-world project experience.
          </p>
        </div>

        <Divider />

        {/* Internship Benefits */}
        <div className="my-16">
          <h3 className="text-2xl font-bold text-brand-primary-text mb-8 text-center">Why Intern With Us?</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {internshipBenefits.map((benefit, index) => (
              <div key={index} className="bg-brand-card-bg border border-brand-borders rounded-xl p-6">
                <Badge variant="success">Benefit</Badge>
                <h4 className="text-lg font-semibold text-brand-primary-text mt-3 mb-2">{benefit.title}</h4>
                <p className="text-brand-secondary-text text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* Hiring Process */}
        <div className="my-16">
          <h3 className="text-2xl font-bold text-brand-primary-text mb-8 text-center">Our Hiring Process</h3>
          <div className="grid gap-6 md:grid-cols-4">
            {hiringProcessSteps.map((item, index) => (
              <div key={index} className="bg-brand-card-bg border border-brand-borders rounded-xl p-6 flex flex-col justify-between">
                <div>
                  <span className="text-brand-primary-accent text-sm font-bold block mb-2">STEP {item.step}</span>
                  <h4 className="text-base font-semibold text-brand-primary-text mb-2">{item.title}</h4>
                  <p className="text-brand-secondary-text text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* Open Positions */}
        <div className="my-16" id="open-positions">
          <h3 className="text-2xl font-bold text-brand-primary-text mb-8 text-center">Open Positions</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {openJobs.map((job, index) => (
              <div
                key={index}
                className="bg-brand-card-bg border border-brand-borders rounded-xl p-6 flex flex-col justify-between hover:border-brand-primary-accent transition-colors"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-xl font-semibold text-brand-primary-text">{job.title}</h4>
                    <Badge variant="accent">{job.type}</Badge>
                  </div>
                  <p className="text-sm text-brand-primary-accent mb-4">{job.location}</p>
                  <p className="text-brand-secondary-text text-sm mb-6 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                <PrimaryButton onClick={() => handleApply(job.title)} className="w-full text-center">
                  Apply Now
                </PrimaryButton>
              </div>
            ))}
          </div>
        </div>

        {/* Application Modal Form */}
        {selectedJob && (
          <div className="bg-brand-card-bg border border-brand-primary-accent rounded-xl p-8 max-w-2xl mx-auto shadow-xl mt-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-brand-primary-text">
                Apply for: <span className="text-brand-primary-accent">{selectedJob}</span>
              </h3>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-brand-muted-text hover:text-brand-primary-text text-sm cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-8">
                <p className="text-brand-success font-semibold text-lg mb-2">Application Submitted Successfully!</p>
                <p className="text-brand-secondary-text text-sm">Thank you for your interest. Our team will review your application and get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="space-y-4">
                <div>
                  <label className="block text-sm text-brand-secondary-text mb-1">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-brand-secondary-bg border border-brand-borders rounded-lg px-4 py-2 text-brand-primary-text text-sm focus:outline-none focus:border-brand-primary-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-brand-secondary-text mb-1">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-brand-secondary-bg border border-brand-borders rounded-lg px-4 py-2 text-brand-primary-text text-sm focus:outline-none focus:border-brand-primary-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-brand-secondary-text mb-1">Resume / LinkedIn / Portfolio Link</label>
                  <input
                    required
                    type="url"
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="w-full bg-brand-secondary-bg border border-brand-borders rounded-lg px-4 py-2 text-brand-primary-text text-sm focus:outline-none focus:border-brand-primary-accent"
                  />
                </div>
                <PrimaryButton type="submit" className="w-full text-center mt-2">
                  Submit Application
                </PrimaryButton>
              </form>
            )}
          </div>
        )}
      </section>
    </main>
  );
}