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
        <p className="section-eyebrow">FAQ</p>
        <h2 className="mt-4 text-4xl font-bold text-[#F8FAFC] sm:text-5xl">Frequently Asked Questions</h2>
        <p className="mx-auto mt-5 max-w-3xl text-lg text-[#94A3B8]">Everything you need to know about AD TECH and our solutions.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className="bg-[#1A2233] border border-[#2A3648] rounded-xl overflow-hidden transition-colors hover:border-[#06B6D4]/30"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center font-medium text-[#F8FAFC] hover:bg-[#111827]/50 transition-colors"
            >
              <span>{faq.question}</span>
              <span className="text-xl text-[#06B6D4]">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            
            {openIndex === index && (
              <div className="px-6 pb-4 text-[#CBD5E1] border-t border-[#374151] pt-3 text-sm leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
