"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Zap,
  Users,
  Sparkles,
  Building2,
  Bot,
  Cloud,
  Shield,
  Smartphone,
  Globe,
  Cpu,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

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
  { icon: Cpu, label: "Automation" },
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
  const isInView = useInView(ref, { once: true, margin: "-80px" });

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

// ─── HeroStats Component ──────────────────────────────────────────────────────

// ─── Staggered Entrance Variants ──────────────────────────────────────────────

const gridContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const gridItem = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const chipContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.5 } },
};

const chipItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function HeroStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-transparent px-6 pb-20"
      aria-label="Company statistics and technologies"
    >
      <div className="mx-auto max-w-7xl">
        {/* ─── Stats Grid ─── */}
        <motion.div
          variants={gridContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={gridItem}
                className="hero-stat-card group"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/15 text-cyan-300 transition-all duration-300 group-hover:bg-cyan-400/25 group-hover:scale-110">
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 text-4xl font-bold text-[#F8FAFC] sm:text-5xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </h3>
                <p className="mt-2 text-sm font-medium text-[#94A3B8] sm:text-base">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ─── Tech Chips ─── */}
        <motion.div
          variants={chipContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {techItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.span
                key={item.label}
                variants={chipItem}
                className="hero-tech-chip"
              >
                <Icon size={16} className="text-cyan-400" />
                {item.label}
              </motion.span>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

