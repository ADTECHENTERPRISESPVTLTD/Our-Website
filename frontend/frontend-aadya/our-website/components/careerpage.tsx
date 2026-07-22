"use client";

import { useState } from "react";

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

export default function CareersPage() {
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
    <section className="w-full max-w-5xl mx-auto py-16 px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-brand-primary-text mb-3">Careers at AD TECH</h2>
        <p className="text-brand-secondary-text max-w-2xl mx-auto">
          Join our mission of Building Future Tech Talent. Explore our open positions and grow your career with us.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-12">
        {openJobs.map((job, index) => (
          <div 
            key={index}
            className="bg-brand-card-bg border border-brand-borders rounded-xl p-6 flex flex-col justify-between hover:border-brand-primary-accent transition-colors"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-brand-primary-text">{job.title}</h3>
                <span className="text-xs bg-brand-secondary-bg text-brand-secondary-text px-3 py-1 rounded-full border border-brand-divider">
                  {job.type}
                </span>
              </div>
              <p className="text-sm text-brand-primary-accent mb-4">{job.location}</p>
              <p className="text-brand-secondary-text text-sm mb-6 leading-relaxed">
                {job.description}
              </p>
            </div>
            
            <button
              onClick={() => handleApply(job.title)}
              className="w-full bg-brand-primary-button text-brand-primary-button-text font-medium py-2 px-4 rounded-lg hover:bg-brand-primary-button-hover transition-colors text-sm"
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>

      {selectedJob && (
        <div className="bg-brand-card-bg border border-brand-primary-accent rounded-xl p-8 max-w-2xl mx-auto shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-brand-primary-text">
              Apply for: <span className="text-brand-primary-accent">{selectedJob}</span>
            </h3>
            <button 
              onClick={() => setSelectedJob(null)}
              className="text-brand-muted-text hover:text-brand-primary-text text-sm"
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
              <button
                type="submit"
                className="w-full bg-brand-primary-button text-brand-primary-button-text font-medium py-2.5 px-4 rounded-lg hover:bg-brand-primary-button-hover transition-colors text-sm mt-2"
              >
                Submit Application
              </button>
            </form>
          )}
        </div>
      )}
    </section>
  );
}