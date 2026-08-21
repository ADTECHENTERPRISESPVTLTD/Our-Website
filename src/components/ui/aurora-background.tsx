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
    "rgba(6, 182, 212, 0.25)",
    "rgba(99, 102, 241, 0.25)",
    "rgba(139, 92, 246, 0.25)",
  ],
  pulseDuration = 8,
  starCount = 70,
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

    // 1. Particle Constellation Nodes
    const particleCount = Math.min(75, Math.floor((canvas.width * canvas.height) / 18000));
    const particles: {
      x: number;
      y: number;
      r: number;
      speedX: number;
      speedY: number;
      alpha: number;
      alphaSpeed: number;
      hue: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.8,
        speedX: (Math.random() - 0.5) * 0.45,
        speedY: (Math.random() - 0.5) * 0.45,
        alpha: Math.random() * 0.6 + 0.2,
        alphaSpeed: (Math.random() * 0.01 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
        hue: Math.random() > 0.5 ? 190 : 250, // Cyan or Indigo hue
      });
    }

    const drawOrbs = () => {
      // Dynamic Floating Light Orbs
      const orb1X = canvas.width * 0.25 + Math.sin(time * 0.0004) * 120;
      const orb1Y = canvas.height * 0.35 + Math.cos(time * 0.0006) * 90;
      const grad1 = ctx.createRadialGradient(orb1X, orb1Y, 0, orb1X, orb1Y, 400);
      grad1.addColorStop(0, "rgba(6, 182, 212, 0.12)");
      grad1.addColorStop(0.5, "rgba(6, 182, 212, 0.04)");
      grad1.addColorStop(1, "rgba(6, 182, 212, 0)");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const orb2X = canvas.width * 0.75 + Math.sin(time * 0.0005 + 2) * 130;
      const orb2Y = canvas.height * 0.65 + Math.cos(time * 0.0003 + 1) * 100;
      const grad2 = ctx.createRadialGradient(orb2X, orb2Y, 0, orb2X, orb2Y, 450);
      grad2.addColorStop(0, "rgba(99, 102, 241, 0.12)");
      grad2.addColorStop(0.5, "rgba(99, 102, 241, 0.04)");
      grad2.addColorStop(1, "rgba(99, 102, 241, 0)");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const orb3X = canvas.width * 0.5 + Math.sin(time * 0.0003 + 4) * 140;
      const orb3Y = canvas.height * 0.8 + Math.cos(time * 0.0005 + 3) * 80;
      const grad3 = ctx.createRadialGradient(orb3X, orb3Y, 0, orb3X, orb3Y, 350);
      grad3.addColorStop(0, "rgba(139, 92, 246, 0.1)");
      grad3.addColorStop(1, "rgba(139, 92, 246, 0)");
      ctx.fillStyle = grad3;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawParticlesAndMesh = () => {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Pulse opacity
        p.alpha += p.alphaSpeed;
        if (p.alpha >= 0.85 || p.alpha <= 0.15) p.alphaSpeed = -p.alphaSpeed;

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 85%, 65%, ${Math.max(0.1, p.alpha)})`;
        ctx.fill();

        // Connect nearby nodes (Constellation effect)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.14 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }

        // Mouse interaction line connection
        const mdx = p.x - mouseX;
        const mdy = p.y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < 160) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.35 * (1 - mdist / 160)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    };

    const animate = (timestamp: number) => {
      time = timestamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawOrbs();
      drawParticlesAndMesh();

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

  const color1 = gradientColors[0] || "rgba(6, 182, 212, 0.25)";
  const color2 = gradientColors[1] || "rgba(99, 102, 241, 0.25)";
  const color3 = gradientColors[2] || "rgba(139, 92, 246, 0.25)";

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center bg-[#0B1120] text-[#F8FAFC] overflow-hidden transition-colors duration-500",
        className
      )}
      {...props}
    >
      {/* Background Aurora Layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Dynamic Interactive Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-85" />

        {/* Pulsing Gradient Waves */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-screen filter blur-[80px]"
          style={{
            background: `radial-gradient(circle at 20% 20%, ${color1} 0%, transparent 50%), radial-gradient(circle at 80% 30%, ${color2} 0%, transparent 50%), radial-gradient(circle at 50% 80%, ${color3} 0%, transparent 50%)`,
            animation: `auroraPulse ${pulseDuration}s ease-in-out infinite alternate`,
          }}
        />

        {/* Animated Shimmer Wave */}
        <div
          className={cn(
            `
            [--aurora:repeating-linear-gradient(100deg,${color1}_10%,${color2}_20%,${color3}_30%)]
            [background-image:var(--aurora)]
            [background-size:200%_200%]
            animate-aurora
            filter blur-[20px] opacity-30
            absolute -inset-[10px]
            `,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]`
          )}
        />

        {/* Radial Dark Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120]/30 via-transparent to-[#0B1120]/60 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};

export default AuroraBackground;
