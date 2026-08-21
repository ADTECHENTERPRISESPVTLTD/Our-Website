"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
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
import HeroBackground from "./HeroBackground";

// ─── Data ────────────────────────────────────────────────────────────────────

const highlights = [
  { label: "AI Strategy", icon: Bot },
  { label: "Cloud Modernization", icon: Cloud },
  { label: "Cyber Security", icon: Shield },
  { label: "Software Delivery", icon: Code2 },
];

const stats = [
  { value: 50, suffix: "+", label: "Projects Delivered", icon: Zap },
  { value: 38, suffix: "+", label: "Happy Clients", icon: Users },
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
  as: Component = "a",
  href,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  as?: any;
  href?: string;
  [key: string]: any;
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
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      ) : (
        <span className={className} {...props}>
          {children}
        </span>
      )}
    </div>
  );
}

// ─── Main Hero Component ─────────────────────────────────────────────────────

export default function Hero() {
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [spot, setSpot] = useState({ x: 50, y: 40 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isContentInView = useInView(contentRef, { once: true, margin: "-50px" });
  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

  const handleSpotMove = useCallback((e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpot({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  const taglines = [
    "Empowering Businesses Through Intelligent Technology",
    "Building Future Tech Talent With Innovation",
    "AI-Driven Solutions For Tomorrow's Challenges",
  ];

  const heroContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
  };
  const heroItem: Variants = {
    hidden: { opacity: 0, y: 26, scale: 0.985, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

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
      onMouseMove={handleSpotMove}
      className="relative min-h-screen flex flex-col bg-transparent overflow-hidden"
      aria-label="Hero section"
    >
      {/* ─── Animated Background ─── */}
      <HeroBackground />

      {/* ─── Interactive Cursor Spotlight ─── */}
      <motion.div
        aria-hidden="true"
        className="hero-spotlight pointer-events-none"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        style={{
          background: `radial-gradient(circle 420px at ${spot.x}% ${spot.y}%, rgba(6, 182, 212, 0.1), transparent 70%)`,
        }}
      />

      {/* ─── Gradient Overlays ─── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(6, 182, 212, 0.08), transparent), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(129, 140, 248, 0.06), transparent)",
        }}
        aria-hidden="true"
      />

      {/* ─── Grid Overlay ─── */}
      <div
        className="absolute inset-0 z-[1] bg-grid compact opacity-40 pointer-events-none"
        aria-hidden="true"
      />

      {/* ─── Main Content Area (flex-1 to push scroll indicator to bottom) ─── */}
      <div className="flex-1 flex items-start lg:items-center justify-center">
        <div
          ref={contentRef}
          className="hero-content-wrapper w-full z-10 mx-auto max-w-7xl px-6 pt-12 pb-8 sm:pt-24 sm:pb-8 lg:py-28"
        >
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate={isContentInView ? "visible" : "hidden"}
            className="mx-auto max-w-5xl text-center"
          >
            {/* Eyebrow */}
            <motion.p variants={heroItem} className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              AD TECH ENTERPRISES PVT. LTD.
            </motion.p>

            {/* Rotating Main Heading (SplitText char animation) */}
            <motion.div variants={heroItem} className="mt-8 flex items-center justify-center">
            <AnimatedHeading
              text={taglines[subtitleIndex]}
              className="hero-tagline text-center text-[#F8FAFC]"
              tag="h1"
            />
            </motion.div>

            {/* Description */}
            <motion.p
              variants={heroItem}
              className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-[#94A3B8] sm:text-xl"
            >
              We help organizations unlock growth with tailored AI, software, cloud
              and automation solutions built for performance, security and scale.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={heroItem}
              className="mt-12 flex flex-wrap items-center justify-center gap-4"
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
              variants={heroItem}
              className="mt-12 flex flex-wrap items-center justify-center gap-3"
            >
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#2A3648] bg-[#111827]/80 px-4 py-2 text-sm text-[#CBD5E1] transition-all duration-300 hover:border-cyan-400/40 hover:bg-[#111827]"
                >
                  <Icon size={14} className="text-cyan-400" />
                  {item.label}
                </span>
              );
             })}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ─── Stats + Tech Cards Below Hero ─── */}
      <div
        ref={statsRef}
        className="relative z-10 w-full"
      >
        <div className="mx-auto max-w-7xl px-6 pb-20">
          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="stat-card group text-center"
                >
                  <Icon
                    size={24}
                    className="mx-auto text-cyan-400/60 group-hover:text-cyan-400 transition-colors duration-300"
                  />
                  <h3 className="mt-3 text-3xl font-bold text-[#F8FAFC]">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </h3>
                  <p className="mt-1 text-sm text-[#94A3B8]">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Tech Floating Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-3 md:grid-cols-6"
          >
            {techItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                className="flex flex-col items-center gap-1.5 rounded-xl border border-[#2A3648]/60 bg-[#111827]/60 px-3 py-3 text-center transition-all duration-300 hover:border-cyan-400/30 hover:bg-[#111827]/90 hover:scale-105 cursor-default"
              >
                {(() => {
                  const IconComponent = item.icon;
                  return <IconComponent size={20} className="text-cyan-400" />;
                })()}
                <span className="text-xs font-medium text-[#94A3B8]">{item.label}</span>
              </motion.div>
            ))}
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
