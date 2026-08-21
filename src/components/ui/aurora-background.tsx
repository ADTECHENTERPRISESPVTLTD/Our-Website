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
  starCount = 80,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Twinkling Stars Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || starCount <= 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const stars: { x: number; y: number; r: number; alpha: number; speed: number }[] = [];

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };

    resize();

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random(),
        speed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        s.alpha += s.speed;
        if (s.alpha >= 1 || s.alpha <= 0.1) s.speed = -s.speed;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(248, 250, 252, ${Math.max(0.1, Math.min(1, s.alpha))})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [starCount]);

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
        {/* Twinkling Star Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-60" />

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
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120]/40 via-transparent to-[#0B1120]/60 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};

export default AuroraBackground;
