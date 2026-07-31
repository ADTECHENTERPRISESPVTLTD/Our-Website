"use client";

import { useEffect, useRef } from "react";

export default function GlobalBackground() {
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

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      hue: number;
      twinkleSpeed: number;
      twinklePhase: number;
    }

    const particles: Particle[] = [];

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles.length = 0;
      const count = Math.min(110, Math.floor((canvas!.width * canvas!.height) / 11000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
          size: Math.random() * 2.2 + 0.6,
          speedX: (Math.random() - 0.5) * 0.45,
          speedY: (Math.random() - 0.5) * 0.45,
          opacity: Math.random() * 0.5 + 0.25,
          hue: Math.random() > 0.35 ? (Math.random() > 0.5 ? 190 : 215) : 270, // Cyan, Sky Blue, or Purple
          twinkleSpeed: Math.random() * 0.004 + 0.002,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const drawGrid = () => {
      if (!canvas || !ctx) return;
      const gridSize = 65;
      ctx.strokeStyle = "rgba(6, 182, 212, 0.035)";
      ctx.lineWidth = 1;

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

      // Orb 1 - Cyan (top-left ambient glow)
      const orb1X = canvas.width * 0.2 + Math.sin(time * 0.0005) * 70;
      const orb1Y = canvas.height * 0.3 + Math.cos(time * 0.0007) * 50;
      const gradient1 = ctx.createRadialGradient(orb1X, orb1Y, 0, orb1X, orb1Y, 400);
      gradient1.addColorStop(0, "rgba(6, 182, 212, 0.09)");
      gradient1.addColorStop(0.5, "rgba(6, 182, 212, 0.035)");
      gradient1.addColorStop(1, "rgba(6, 182, 212, 0)");
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Orb 2 - Indigo/Purple (bottom-right ambient glow)
      const orb2X = canvas.width * 0.8 + Math.sin(time * 0.0006 + 2) * 60;
      const orb2Y = canvas.height * 0.7 + Math.cos(time * 0.0004 + 1) * 60;
      const gradient2 = ctx.createRadialGradient(orb2X, orb2Y, 0, orb2X, orb2Y, 450);
      gradient2.addColorStop(0, "rgba(129, 140, 248, 0.08)");
      gradient2.addColorStop(0.5, "rgba(129, 140, 248, 0.03)");
      gradient2.addColorStop(1, "rgba(129, 140, 248, 0)");
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Orb 3 - Blue (center-right ambient glow)
      const orb3X = canvas.width * 0.65 + Math.sin(time * 0.0003 + 3) * 80;
      const orb3Y = canvas.height * 0.45 + Math.cos(time * 0.0008 + 2) * 70;
      const gradient3 = ctx.createRadialGradient(orb3X, orb3Y, 0, orb3X, orb3Y, 350);
      gradient3.addColorStop(0, "rgba(56, 189, 248, 0.07)");
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

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Twinkling glitter calculation
        const twinkle = Math.sin(time * p.twinkleSpeed + p.twinklePhase) * 0.35;
        const currentOpacity = Math.max(0.12, Math.min(0.95, p.opacity + twinkle));

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 85%, 70%, ${currentOpacity})`;
        ctx.fill();

        // Connect nearby particles (single-pass pair check)
        for (let j = i + 1; j < len; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;

          // Quick bounding box check before sqrt
          if (Math.abs(dx) < 95 && Math.abs(dy) < 95) {
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 95) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(6, 182, 212, ${0.08 * (1 - dist / 95)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }

        // Connect to mouse cursor when nearby
        if (mouseX > 0 && mouseY > 0) {
          const mdx = p.x - mouseX;
          const mdy = p.y - mouseY;
          if (Math.abs(mdx) < 140 && Math.abs(mdy) < 140) {
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mdist < 140) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(mouseX, mouseY);
              ctx.strokeStyle = `rgba(56, 189, 248, ${0.18 * (1 - mdist / 140)})`;
              ctx.lineWidth = 0.65;
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

    window.addEventListener("resize", () => {
      resize();
      initParticles();
    });
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
      className="fixed inset-0 z-0 pointer-events-none w-full h-full"
      aria-hidden="true"
    />
  );
}
