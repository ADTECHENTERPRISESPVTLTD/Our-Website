"use client";

import { useEffect, useRef } from "react";

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let mouseX = -1000;
    let mouseY = -1000;
    let time = 0;

    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      hue: number;
      twinkleSpeed: number;
      twinklePhase: number;
    }[] = [];

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles.length = 0;
      const count = Math.min(100, Math.floor((canvas!.width * canvas!.height) / 13000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
          size: Math.random() * 2.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: (Math.random() - 0.5) * 0.4,
          opacity: Math.random() * 0.5 + 0.15,
          hue: Math.random() > 0.35 ? (Math.random() > 0.5 ? 190 : 215) : 270, // Cyan, Sky Blue, or Purple
          twinkleSpeed: Math.random() * 0.004 + 0.002,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const drawGrid = () => {
      if (!canvas || !ctx) return;
      const gridSize = 60;
      ctx.strokeStyle = "rgba(6, 182, 212, 0.03)";
      ctx.lineWidth = 1;

      // Calculate offset for subtle parallax
      const offsetX = mouseX * 0.005;
      const offsetY = mouseY * 0.005;

      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x + offsetX, 0);
        ctx.lineTo(x + offsetX, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y + offsetY);
        ctx.lineTo(canvas.width, y + offsetY);
        ctx.stroke();
      }
    };

    const drawOrbs = () => {
      if (!canvas || !ctx) return;

      // Orb 1 - Cyan (top-left)
      const orb1X = canvas.width * 0.2 + Math.sin(time * 0.0005) * 60;
      const orb1Y = canvas.height * 0.3 + Math.cos(time * 0.0007) * 40;
      const gradient1 = ctx.createRadialGradient(orb1X, orb1Y, 0, orb1X, orb1Y, 350);
      gradient1.addColorStop(0, "rgba(6, 182, 212, 0.08)");
      gradient1.addColorStop(0.5, "rgba(6, 182, 212, 0.04)");
      gradient1.addColorStop(1, "rgba(6, 182, 212, 0)");
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Orb 2 - Purple (bottom-right)
      const orb2X = canvas.width * 0.8 + Math.sin(time * 0.0006 + 2) * 50;
      const orb2Y = canvas.height * 0.7 + Math.cos(time * 0.0004 + 1) * 50;
      const gradient2 = ctx.createRadialGradient(orb2X, orb2Y, 0, orb2X, orb2Y, 400);
      gradient2.addColorStop(0, "rgba(129, 140, 248, 0.07)");
      gradient2.addColorStop(0.5, "rgba(129, 140, 248, 0.03)");
      gradient2.addColorStop(1, "rgba(129, 140, 248, 0)");
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Orb 3 - Blue (center-right)
      const orb3X = canvas.width * 0.7 + Math.sin(time * 0.0003 + 3) * 70;
      const orb3Y = canvas.height * 0.4 + Math.cos(time * 0.0008 + 2) * 60;
      const gradient3 = ctx.createRadialGradient(orb3X, orb3Y, 0, orb3X, orb3Y, 300);
      gradient3.addColorStop(0, "rgba(56, 189, 248, 0.06)");
      gradient3.addColorStop(1, "rgba(56, 189, 248, 0)");
      ctx.fillStyle = gradient3;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawParticles = () => {
      if (!canvas || !ctx) return;

      const len = particles.length;

      for (let i = 0; i < len; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Twinkling glitter opacity
        const twinkle = Math.sin(time * p.twinkleSpeed + p.twinklePhase) * 0.3;
        const currentOpacity = Math.max(0.12, Math.min(0.9, p.opacity + twinkle));

        // Slight size pulse
        const drawSize = p.size * (1 + Math.sin(time * 0.002 + p.twinklePhase) * 0.2);

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, drawSize, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 82%, 68%, ${currentOpacity})`;
        ctx.fill();

        // Draw connections (nearby particles) — single pass pair check
        for (let j = i + 1; j < len; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;

          // Quick reject via bounding box before sqrt
          if (Math.abs(dx) < 120 && Math.abs(dy) < 120) {
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(6, 182, 212, ${0.08 * (1 - dist / 120)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }

        // Interactive lines from particles near the cursor
        if (mouseX > 0 && mouseY > 0) {
          const mdx = p.x - mouseX;
          const mdy = p.y - mouseY;
          if (Math.abs(mdx) < 160 && Math.abs(mdy) < 160) {
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mdist < 160) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(mouseX, mouseY);
              ctx.strokeStyle = `rgba(56, 189, 248, ${0.16 * (1 - mdist / 160)})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      }
    };

    const animate = (timestamp: number) => {
      if (!canvas || !ctx) return;
      time = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawGrid();
      drawOrbs();
      drawParticles();

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    resize();
    initParticles();
    animate(0);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}

