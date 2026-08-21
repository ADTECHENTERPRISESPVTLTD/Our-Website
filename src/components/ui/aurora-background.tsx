"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/utils/helpers";

export interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode;
  gradientColors?: string[];
  pulseDuration?: number;
  starCount?: number;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  gradientColors = [
    "rgba(6, 182, 212, 0.55)",   // Electric Cyan
    "rgba(99, 102, 241, 0.55)",   // Deep Indigo
    "rgba(168, 85, 247, 0.5)",    // Neon Violet / Purple
    "rgba(244, 63, 94, 0.45)",    // Hot Pink / Coral Rose
    "rgba(16, 185, 129, 0.35)",   // Emerald Cyan
  ],
  pulseDuration = 7,
  starCount = 90,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let mouseX = -1000;
    let mouseY = -1000;
    let time = 0;

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };

    resize();

    // Multi-color Particle Network
    const particleCount = Math.min(95, Math.floor((canvas.width * canvas.height) / 14000));
    const particles: {
      x: number;
      y: number;
      r: number;
      speedX: number;
      speedY: number;
      alpha: number;
      alphaSpeed: number;
      color: string;
    }[] = [];

    const palette = [
      "rgba(6, 182, 212, ",   // Cyan
      "rgba(56, 189, 248, ",  // Sky Blue
      "rgba(99, 102, 241, ",  // Indigo
      "rgba(168, 85, 247, ",  // Violet
      "rgba(244, 63, 94, ",   // Rose Pink
      "rgba(16, 185, 129, ",  // Emerald
      "rgba(245, 158, 11, ",  // Amber Gold
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2.5 + 0.8,
        speedX: (Math.random() - 0.5) * 0.55,
        speedY: (Math.random() - 0.5) * 0.55,
        alpha: Math.random() * 0.75 + 0.25,
        alphaSpeed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        color: palette[Math.floor(Math.random() * palette.length)],
      });
    }

    const drawVibrantOrbs = () => {
      // 1. Cyan Light Orb (Top Left)
      const orb1X = canvas.width * 0.2 + Math.sin(time * 0.0005) * 160;
      const orb1Y = canvas.height * 0.25 + Math.cos(time * 0.0007) * 120;
      const g1 = ctx.createRadialGradient(orb1X, orb1Y, 0, orb1X, orb1Y, 500);
      g1.addColorStop(0, "rgba(6, 182, 212, 0.3)");
      g1.addColorStop(0.5, "rgba(6, 182, 212, 0.1)");
      g1.addColorStop(1, "rgba(6, 182, 212, 0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Neon Violet / Purple Orb (Top Right)
      const orb2X = canvas.width * 0.8 + Math.sin(time * 0.0006 + 2) * 170;
      const orb2Y = canvas.height * 0.35 + Math.cos(time * 0.0004 + 1) * 130;
      const g2 = ctx.createRadialGradient(orb2X, orb2Y, 0, orb2X, orb2Y, 550);
      g2.addColorStop(0, "rgba(168, 85, 247, 0.28)");
      g2.addColorStop(0.5, "rgba(99, 102, 241, 0.12)");
      g2.addColorStop(1, "rgba(168, 85, 247, 0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 3. Hot Rose Pink / Coral Orb (Center Right)
      const orb3X = canvas.width * 0.7 + Math.sin(time * 0.0004 + 4) * 150;
      const orb3Y = canvas.height * 0.7 + Math.cos(time * 0.0006 + 3) * 110;
      const g3 = ctx.createRadialGradient(orb3X, orb3Y, 0, orb3X, orb3Y, 450);
      g3.addColorStop(0, "rgba(244, 63, 94, 0.22)");
      g3.addColorStop(0.6, "rgba(236, 72, 153, 0.08)");
      g3.addColorStop(1, "rgba(244, 63, 94, 0)");
      ctx.fillStyle = g3;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 4. Emerald Green / Teal Orb (Bottom Left)
      const orb4X = canvas.width * 0.3 + Math.sin(time * 0.0007 + 1) * 140;
      const orb4Y = canvas.height * 0.8 + Math.cos(time * 0.0005 + 2) * 100;
      const g4 = ctx.createRadialGradient(orb4X, orb4Y, 0, orb4X, orb4Y, 420);
      g4.addColorStop(0, "rgba(16, 185, 129, 0.18)");
      g4.addColorStop(0.5, "rgba(6, 182, 212, 0.06)");
      g4.addColorStop(1, "rgba(16, 185, 129, 0)");
      ctx.fillStyle = g4;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Mouse Dynamic Colorful Spotlight
      if (mouseX > 0 && mouseY > 0) {
        const mg = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 280);
        mg.addColorStop(0, "rgba(56, 189, 248, 0.25)");
        mg.addColorStop(0.4, "rgba(168, 85, 247, 0.12)");
        mg.addColorStop(0.8, "rgba(244, 63, 94, 0.05)");
        mg.addColorStop(1, "transparent");
        ctx.fillStyle = mg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    const drawTechGridAndNodes = () => {
      // Draw Particles and Connecting Lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        p.alpha += p.alphaSpeed;
        if (p.alpha >= 0.95 || p.alpha <= 0.2) p.alphaSpeed = -p.alphaSpeed;

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0.2, p.alpha)})`;
        ctx.fill();

        // Connect nearby nodes with multi-colored constellation lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 145) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `${p.color}${0.22 * (1 - dist / 145)})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Mouse interaction line connection
        const mdx = p.x - mouseX;
        const mdy = p.y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < 190) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.5 * (1 - mdist / 190)})`;
          ctx.lineWidth = 1.35;
          ctx.stroke();
        }
      }
    };

    const animate = (timestamp: number) => {
      time = timestamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawVibrantOrbs();
      drawTechGridAndNodes();

      animId = requestAnimationFrame(animate);
    };

    animate(0);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const color1 = gradientColors[0] || "rgba(6, 182, 212, 0.55)";
  const color2 = gradientColors[1] || "rgba(99, 102, 241, 0.55)";
  const color3 = gradientColors[2] || "rgba(168, 85, 247, 0.5)";
  const color4 = gradientColors[3] || "rgba(244, 63, 94, 0.45)";
  const color5 = gradientColors[4] || "rgba(16, 185, 129, 0.35)";

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center bg-[#0B1120] text-[#F8FAFC] overflow-hidden transition-colors duration-500",
        className
      )}
      {...props}
    >
      {/* Background Aurora & Vibrant Color Layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Dynamic Interactive Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-95" />

        {/* Pulsing Vibrant Multi-Color Gradient Waves */}
        <div
          className="absolute inset-0 opacity-65 mix-blend-screen filter blur-[90px]"
          style={{
            background: `radial-gradient(circle at 15% 20%, ${color1} 0%, transparent 45%), radial-gradient(circle at 85% 25%, ${color2} 0%, transparent 45%), radial-gradient(circle at 50% 80%, ${color3} 0%, transparent 50%), radial-gradient(circle at 80% 75%, ${color4} 0%, transparent 45%), radial-gradient(circle at 20% 80%, ${color5} 0%, transparent 45%)`,
            animation: `auroraPulse ${pulseDuration}s ease-in-out infinite alternate`,
          }}
        />

        {/* Animated Multi-Color Shimmer Wave */}
        <div
          className={cn(
            `
            [--aurora:repeating-linear-gradient(100deg,${color1}_10%,${color2}_20%,${color3}_30%,${color4}_40%,${color5}_50%)]
            [background-image:var(--aurora)]
            [background-size:200%_200%]
            animate-aurora
            filter blur-[25px] opacity-45
            absolute -inset-[10px]
            `,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_90%)]`
          )}
        />

        {/* Subtle Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120]/15 via-transparent to-[#0B1120]/40 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};

export default AuroraBackground;
