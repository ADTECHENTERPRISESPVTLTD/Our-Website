'use client';

import React from 'react';
import ChatWidget from '@/components/ChatWidget';
import { 
  Sparkles, Code, Server, Bot, Cpu, 
  Mail, Phone, Clock, ArrowUpRight, GraduationCap, CheckCircle2 
} from 'lucide-react';
import { EMAIL, PHONE } from '@/data/knowledgeBase';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-accent/40 selection:text-white">
      
      {/* 1. Navigation Header */}
      <header className="sticky top-0 z-40 w-full glass border-b border-border/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/adtech-logo.png" className="h-9 w-9 object-contain select-none" alt="AD TECH Logo" />
            <div>
              <span className="font-bold font-display text-base tracking-wide bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                AD TECH
              </span>
              <span className="text-[9px] text-slate-500 block -mt-1 font-medium uppercase tracking-wider">
                Enterprises
              </span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-text-secondary">
            <a href="#hero" className="nav-text hover:text-white transition-colors">Home</a>
            <a href="#services" className="nav-text hover:text-white transition-colors">Services</a>
            <a href="#careers" className="nav-text hover:text-white transition-colors">Careers & Internships</a>
            <a href="#contact" className="nav-text hover:text-white transition-colors">Contact</a>
          </nav>

          <a 
            href="#contact" 
            className="hidden sm:inline-flex items-center gap-1.5 px-6 py-2.5 btn-text rounded-full bg-btn-primary text-btn-primary-text hover:bg-slate-200 hover:scale-[1.03] transition-all cursor-pointer shadow-md"
          >
            Get In Touch
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section id="hero" className="relative pt-24 pb-20 md:pt-32 md:pb-28 max-w-7xl mx-auto px-6 overflow-hidden">
        {/* Decorative ambient blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] md:h-[500px] md:w-[500px] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none -z-10 animate-pulse-slow"></div>
        <div className="absolute top-1/3 left-1/4 h-[250px] w-[250px] rounded-full bg-sky-500/10 blur-[80px] pointer-events-none -z-10"></div>
        
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card-bg/60 small-text text-text-secondary animate-fade-in-up">
            <Sparkles className="h-3.5 w-3.5 text-yellow-400" />
            <span>Building Future Tech Talent</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] animate-fade-in-up">
            Powering Your Business with{" "}
            <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Practical AI
            </span>
          </h1>

          <p className="body-large text-text-secondary max-w-2xl mx-auto animate-fade-in-up">
            We build state-of-the-art intelligent agents, high-performance web products, and nurture world-class developer talent to lead the AI-first revolution.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 animate-fade-in-up">
            <a 
              href="#services" 
              className="w-full sm:w-auto px-8 py-3.5 btn-text rounded-xl bg-btn-primary text-btn-primary-text hover:bg-slate-200 transition-colors shadow-lg cursor-pointer text-center"
            >
              Explore Services
            </a>
            <a 
              href="#careers" 
              className="w-full sm:w-auto px-8 py-3.5 btn-text rounded-xl border border-border bg-card-bg/50 hover:bg-card-bg text-white transition-colors cursor-pointer text-center"
            >
              Apply for Internship
            </a>
          </div>
        </div>
      </section>

      {/* 3. Services Section */}
      <section id="services" className="py-20 md:py-24 border-t border-border/40 bg-secondary-bg/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Core Services</h2>
            <p className="body-regular text-text-secondary">Custom engineering designed to scale and optimize your operations.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1: Web Development */}
            <div className="glass-card p-8 rounded-2xl flex flex-col justify-between hover:border-slate-500/50 hover:scale-[1.01] transition-all group duration-300">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:scale-105 transition-transform">
                  <Code className="h-6 w-6" />
                </div>
                <h3 className="card-title-style text-white">Frontend Web Development</h3>
                <p className="card-desc text-text-muted">
                  Fast, accessible, responsive websites engineered with React, Next.js, and Tailwind CSS. Built to deliver outstanding performance and delightful user experience.
                </p>
              </div>
              <div className="pt-6">
                <a href="#contact" className="inline-flex items-center gap-1 card-btn text-sky-400 hover:text-sky-300">
                  Request Info <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Card 2: Backend APIs */}
            <div className="glass-card p-8 rounded-2xl flex flex-col justify-between hover:border-slate-500/50 hover:scale-[1.01] transition-all group duration-300">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                  <Server className="h-6 w-6" />
                </div>
                <h3 className="card-title-style text-white">Backend & DB Architecting</h3>
                <p className="card-desc text-text-muted">
                  Production-ready microservices built on Node.js, Express, and modern secure architectures. Scaling relational databases and vector indexing systems.
                </p>
              </div>
              <div className="pt-6">
                <a href="#contact" className="inline-flex items-center gap-1 card-btn text-indigo-400 hover:text-indigo-300">
                  Request Info <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Card 3: AI Automation */}
            <div className="glass-card p-8 rounded-2xl flex flex-col justify-between hover:border-slate-500/50 hover:scale-[1.01] transition-all group duration-300">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                  <Bot className="h-6 w-6" />
                </div>
                <h3 className="card-title-style text-white">AI Integrations & Agents</h3>
                <p className="card-desc text-text-muted">
                  Bespoke large language model integration (Gemini, OpenAI), specialized search/retrieval knowledge bases, and floating chatbot widgets tailored for corporate environments.
                </p>
              </div>
              <div className="pt-6">
                <a href="#contact" className="inline-flex items-center gap-1 card-btn text-purple-400 hover:text-purple-300">
                  Request Info <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Careers & Internship Section */}
      <section id="careers" className="py-20 md:py-24 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-card-bg/60 small-text text-indigo-400">
                <GraduationCap className="h-4 w-4" />
                <span>Talent Incubator</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Empowering the Next Generation of Tech Leaders
              </h2>
              
              <p className="body-regular text-text-secondary">
                AD TECH is committed to "Building Future Tech Talent." Our structured developer internships place you in the driving seat of production-grade tasks under the guidance of tech experts.
              </p>

              <ul className="space-y-3.5 body-regular text-text-muted">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-4.5 w-4.5 text-success shrink-0" />
                  <span>Sprint-based workflows modeled after live software delivery environments.</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-4.5 w-4.5 text-success shrink-0" />
                  <span>Opportunities to work directly with AI APIs, TypeScript, and modern frameworks.</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-4.5 w-4.5 text-success shrink-0" />
                  <span>Mentorship and direct assignment evaluation from senior engineering staff.</span>
                </li>
              </ul>

              <div className="pt-2">
                <a 
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 px-6 py-2.5 btn-text rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white cursor-pointer"
                >
                  Send Application Email
                  <Mail className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Active Roles list */}
            <div className="glass-card p-8 rounded-2xl space-y-6">
              <h3 className="card-title-style font-semibold border-b border-border/80 pb-4">
                Active Internship Openings
              </h3>
              
              <div className="space-y-4">
                {/* Role 1 */}
                <div className="flex justify-between items-start border-b border-border/40 pb-4">
                  <div>
                    <h4 className="font-semibold text-[17px] text-white">AI Lead / Agent Architect</h4>
                    <span className="small-text text-text-muted">Research & AI Integrations</span>
                  </div>
                  <span className="small-text bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded border border-sky-500/20">
                    2 Positions
                  </span>
                </div>

                {/* Role 2 */}
                <div className="flex justify-between items-start border-b border-border/40 pb-4">
                  <div>
                    <h4 className="font-semibold text-[17px] text-white">Frontend Intern (Next.js/TS)</h4>
                    <span className="small-text text-text-muted">User Interfaces & Custom CSS</span>
                  </div>
                  <span className="small-text bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20">
                    3 Positions
                  </span>
                </div>

                {/* Role 3 */}
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-[17px] text-white">Backend Engineer Intern</h4>
                    <span className="small-text text-text-muted">Node.js, Express, APIs</span>
                  </div>
                  <span className="small-text bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded border border-purple-500/20">
                    1 Position
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Contact Section */}
      <section id="contact" className="py-20 md:py-24 border-t border-border/40 bg-secondary-bg/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Connect with Us</h2>
              <p className="body-regular text-text-secondary">
                Whether you want to discuss an AI automation pilot project, submit technical requirements, or schedule a callback, our team is ready to assist.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-card-bg border border-border flex items-center justify-center text-accent">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="small-text text-text-muted block">EMAIL HR</span>
                    <a href={`mailto:${EMAIL}`} className="body-regular font-semibold text-white hover:underline">{EMAIL}</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-card-bg border border-border flex items-center justify-center text-accent">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="small-text text-text-muted block">PHONE</span>
                    <a href={`tel:${PHONE}`} className="body-regular font-semibold text-white hover:underline">{PHONE}</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="glass-card p-8 rounded-2xl">
              <form className="space-y-4">
                <div>
                  <label className="form-label text-text-secondary block mb-1">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-[#0B1120] border border-border form-input px-3.5 py-2.5 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:border-slate-500"
                    placeholder="Soham"
                  />
                </div>
                <div>
                  <label className="form-label text-text-secondary block mb-1">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-[#0B1120] border border-border form-input px-3.5 py-2.5 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:border-slate-500"
                    placeholder="soham@example.com"
                  />
                </div>
                <div>
                  <label className="form-label text-text-secondary block mb-1">Message / Project Description</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-[#0B1120] border border-border form-input px-3.5 py-2.5 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:border-slate-500 resize-none"
                    placeholder="How can we help your business?"
                  />
                </div>
                <button 
                  type="submit" 
                  onClick={(e) => { e.preventDefault(); alert("Form submitted successfully! You can also use the AI Chatbot's callback or requirements submission tools below."); }}
                  className="w-full bg-btn-primary text-btn-primary-text font-semibold btn-text py-3 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="py-12 border-t border-border/20 text-center footer-copyright text-text-muted">
        <div className="max-w-7xl mx-auto px-6 space-y-2">
          <p>© 2026 AD Tech Enterprises Pvt. Ltd. All rights reserved.</p>
          <p className="footer-link text-slate-600">Building Future Tech Talent • AI Lead Sprint MVP v1.0</p>
        </div>
      </footer>

      {/* 7. Chatbot Floating Widget */}
      <ChatWidget />

    </div>
  );
}
