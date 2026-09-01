"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Sparkles,
  Shield,
  Cpu,
  Cloud,
  Code2,
  Bot,
  Users,
  Building2,
  Zap,
  Smartphone,
  Globe,
} from "lucide-react";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import AuroraBackground from "@/components/ui/aurora-background";

// ─── Data ────────────────────────────────────────────────────────────────────

const highlights = [
  { label: "AI Strategy", icon: Bot },
  { label: "Cloud Modernization", icon: Cloud },
  { label: "Cyber Security", icon: Shield },
  { label: "Software Delivery", icon: Code2 },
];

const stats = [
  { value: 100, suffix: "+", label: "Projects Delivered", icon: Zap },
  { value: 50, suffix: "+", label: "Happy Clients", icon: Users },
  { value: 99, suffix: "%", label: "Client Satisfaction", icon: Sparkles },
  { value: 5, suffix: "+", label: "Years Excellence", icon: Building2 },
];

const techItems = [
  { icon: Bot, label: "AI & ML" },
  { icon: Cloud, label: "Cloud Native" },
  { icon: Shield, label: "Cyber Security" },
  { icon: Smartphone, label: "App Development" },
  { icon: Globe, label: "Web Solutions" },
  { icon: Zap, label: "Automation" },
];

// ─── Animated Counter ─────────────────────────────────────────────────────────

function AnimatedCounter({
  value,
  suffix = "",
  duration = 2,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(eased * value));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ─── Magnetic Button Wrapper ──────────────────────────────────────────────────

function MagneticButton({
  children,
  className = "",
  href,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="magnetic-btn inline-block"
    >
      {href ? (
        <Link href={href} className={className} onClick={onClick}>
          {children}
        </Link>
      ) : (
        <button type="button" className={className} onClick={onClick}>
          {children}
        </button>
      )}
    </div>
  );
}

// ─── Main Hero Component ─────────────────────────────────────────────────────

export default function Hero() {
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isContentInView = useInView(contentRef, { once: true, margin: "-50px" });

  const taglines = [
    "Empowering Businesses Through Intelligent Technology",
    "Building Future Tech Talent With Innovation",
    "AI-Driven Solutions For Tomorrow's Challenges",
  ];

  // Rotating tagline effect
  useEffect(() => {
    const interval = setInterval(() => {
      setSubtitleIndex((prev) => (prev + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll to next section
  const scrollToNext = () => {
    const next = sectionRef.current?.nextElementSibling;
    if (next) {
      next.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-transparent overflow-hidden"
      aria-label="Hero section"
    >
      {/* ─── Grid Overlay ─── */}
      <div
        className="absolute inset-0 z-[1] bg-grid compact opacity-25 pointer-events-none"
        aria-hidden="true"
      />


      {/* ─── Main Content ─── */}
      <div
        ref={contentRef}
        className="hero-content-wrapper w-full z-10 mx-auto max-w-7xl px-6 py-20 lg:py-28"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
          {/* ─── Left Column: Text + CTAs ─── */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isContentInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 max-w-2xl"
          >
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
                <Sparkles size={14} className="text-cyan-400" />
                AI • Cloud • Cyber Security • Software Development
              </span>
            </motion.div>

            {/* Main Heading */}
            <div className="mt-8">
              <AnimatedHeading
                text="AD TECH ENTERPRISES PVT. LTD."
                className="hero-title text-left text-[#F8FAFC]"
                tag="h1"
              />
              <div className="mt-2 h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
            </div>

            {/* Rotating Tagline */}
            <div className="mt-6 h-12 overflow-hidden">
              <motion.p
                key={subtitleIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-2xl font-semibold text-[#E2E8F0] sm:text-3xl typing-cursor"
              >
                {taglines[subtitleIndex]}
              </motion.p>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 max-w-2xl text-lg leading-8 text-[#94A3B8]"
            >
              We help organizations unlock growth with tailored AI, software, cloud
              and automation solutions built for performance, security and scale.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <MagneticButton href="/services" className="hero-cta hero-cta-primary group">
                Explore Services
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </MagneticButton>

              <MagneticButton href="/contact" className="hero-cta hero-cta-secondary group">
                Contact Us
              </MagneticButton>

              <MagneticButton href="/careers" className="hero-cta hero-cta-ghost group">
                <Users size={18} />
                Careers
              </MagneticButton>

              <MagneticButton href="/login" className="hero-cta hero-cta-gradient group">
                <Cpu size={18} />
                Intern Dashboard
              </MagneticButton>
            </motion.div>

            {/* Highlights Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#2A3648] bg-[#111827]/80 px-4 py-2 text-sm text-[#CBD5E1] transition-all duration-300 hover:border-cyan-400/40 hover:bg-[#111827]/70"
                  >
                    <Icon size={14} className="text-cyan-400" />
                    {item.label}
                  </span>
                );
              })}
            </motion.div>
          </motion.div>

          {/* ─── Right Column: Stats + Tech Cards ─── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isContentInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex-1 mt-12 lg:mt-0"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="stat-card group"
                  >
                    <Icon
                      size={20}
                      className="text-cyan-400/60 group-hover:text-cyan-400 transition-colors duration-300"
                    />
                    <h3 className="mt-2 text-3xl font-bold text-[#F8FAFC]">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </h3>
                    <p className="mt-1 text-sm text-[#94A3B8]">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Tech Floating Cards */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {techItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.05 }}
                  className="flex flex-col items-center gap-1.5 rounded-xl border border-[#2A3648]/60 bg-[#111827]/60 px-3 py-3 text-center transition-all duration-300 hover:border-cyan-400/30 hover:bg-[#111827]/90 hover:scale-105 cursor-default"
                >
                  {(() => {
                    const IconComponent = item.icon;
                    return <IconComponent size={20} className="text-cyan-400" />;
                  })()}
                  <span className="text-xs font-medium text-[#94A3B8]">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── Scroll Indicator ─── */}
      <div className="scroll-indicator" onClick={scrollToNext} role="button" tabIndex={0} aria-label="Scroll to next section" onKeyDown={(e) => { if (e.key === 'Enter') scrollToNext(); }}>
        <span>Scroll</span>
        <div className="scroll-mouse" />
        <ChevronDown size={14} />
      </div>

      {/* ─── Decorative Elements ─── */}
      <div
        className="absolute top-1/4 right-[5%] w-72 h-72 border border-cyan-400/5 rounded-full floating-element pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 left-[3%] w-48 h-48 border border-purple-500/5 rounded-full floating-element-delayed pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
