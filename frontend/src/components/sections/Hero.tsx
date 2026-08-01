"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Shield,
  Cloud,
  Code2,
  Bot,
  Users,
  Cpu,
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

  // Premium staged entrance variants
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

  // Interactive spotlight that follows the cursor inside the hero
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
      className="relative min-h-screen flex items-start lg:items-center justify-center bg-transparent overflow-hidden"
      aria-label="Hero section"
    >
      {/* ─── Animated Canvas Background ─── */}
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

      {/* ─── Decorative Floating Orbs ─── */}
      <div
        className="absolute top-1/4 left-[8%] w-64 h-64 rounded-full border border-cyan-400/10 floating-element pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-[6%] w-80 h-80 rounded-full border border-purple-500/10 floating-element-delayed pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-[12%] w-32 h-32 rounded-full border border-cyan-400/10 floating-element-delayed pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/3 left-[10%] w-24 h-24 rounded-full border border-blue-500/10 floating-element pointer-events-none"
        aria-hidden="true"
      />

      {/* ─── Main Content ─── */}
      <div
        ref={contentRef}
        className="hero-content-wrapper w-full z-10 mx-auto max-w-7xl px-6 pt-12 pb-24 sm:pt-24 sm:pb-28 lg:py-28"
      >
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate={isContentInView ? "visible" : "hidden"}
          className="mx-auto max-w-5xl text-center"
        >
          {/* Eyebrow */}
          <motion.p
            variants={heroItem}
            className="hero-eyebrow"
          >
            <span className="hero-eyebrow-dot" />
            AD TECH ENTERPRISES PVT. LTD.
          </motion.p>

          {/* Rotating Main Heading (SplitText char animation) */}
          <motion.div
            variants={heroItem}
            className="mt-8 flex items-center justify-center"
          >
            <AnimatedHeading
              key={subtitleIndex}
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
              <span className="hero-cta-shine" aria-hidden="true" />
              Explore Services
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </MagneticButton>

            <MagneticButton href="/contact" className="hero-cta hero-cta-secondary group">
              Contact Us
            </MagneticButton>

            <div className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
              <MagneticButton href="/careers" className="hero-cta hero-cta-ghost group">
                <Users size={16} />
                Careers
              </MagneticButton>

              <MagneticButton href="/login" className="hero-cta hero-cta-gradient group">
                <Cpu size={16} />
                Intern Dashboard
              </MagneticButton>
            </div>
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
                  className="hero-highlight-pill"
                >
                  <Icon size={14} className="text-cyan-400" />
                  {item.label}
                </span>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* ─── Scroll Indicator ─── */}
      <div
        className="scroll-indicator"
        onClick={scrollToNext}
        role="button"
        tabIndex={0}
        aria-label="Scroll to next section"
        onKeyDown={(e) => {
          if (e.key === "Enter") scrollToNext();
        }}
      >
        <span>Scroll</span>
        <div className="scroll-mouse" />
        <ChevronDown size={14} />
      </div>
    </section>
  );
}

