"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What services does AD TECH Enterprises provide?",
    answer: "We provide end-to-end technology solutions including Web Application Development, Android and iOS Application Development, Artificial Intelligence & Automation, Learning Management Systems (LMS), and EV Installment Management Solutions."
  },
  {
    question: "What is AD TECH's core approach to Artificial Intelligence?",
    answer: "We help organizations integrate AI into their operations—not as a replacement for people, but as a tool that empowers teams to work faster, make better decisions, and automate repetitive workflows."
  },
  {
    question: "What does the company tagline 'Building Future Tech Talent' mean?",
    answer: "It reflects our commitment not only to developing innovative software solutions but also to nurturing the next generation of technology professionals through internships, mentorship, and real-world project experience."
  },
  {
    question: "Who can apply for opportunities or internships at AD TECH?",
    answer: "Students, freshers, and aspiring tech professionals looking to gain hands-on project experience, mentorship, and industry-standard development skills are welcome to apply."
  },
  {
    question: "What industries does AD TECH serve?",
    answer: "We work across multiple sectors including schools, colleges, educational institutions, MSMEs, startups, healthcare, manufacturing, retail, professional services, logistics, and financial services."
  },
  {
    question: "What is the typical software development workflow at AD TECH?",
    answer: "Every project follows a structured lifecycle: Requirement Analysis, Planning, Design, Development, Testing, Deployment, and long-term Support & Improvement."
  },
  {
    question: "How can clients get in touch or start a project?",
    answer: "Clients can reach out directly via email at hradtechenterpriseschepvtltd@gmail.com or call +91 83193 58568 to discuss digital transformation and software needs."
  },
  {
    question: "What are the core values driving AD TECH's team?",
    answer: "Our work is built on Innovation, Integrity, Quality, Collaboration, and a strong commitment to Continuous Learning as technology evolves."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full max-w-4xl mx-auto py-16 px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-brand-primary-text mb-3">Frequently Asked Questions</h2>
        <p className="text-brand-secondary-text">Everything you need to know about AD TECH and our solutions.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-brand-card-bg border border-brand-borders rounded-xl overflow-hidden transition-colors"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center font-medium text-brand-primary-text hover:bg-brand-secondary-bg/50 transition-colors"
            >
              <span>{faq.question}</span>
              <span className="text-xl text-brand-primary-accent">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {openIndex === index && (
              <div className="px-6 pb-4 text-brand-secondary-text border-t border-brand-divider pt-3 text-sm leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}