"use client";

import { useCallback, useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import "./BorderGlow.css";

interface BorderGlowProps {
  children: ReactNode;
  className?: string;
  backgroundColor?: string;
  borderRadius?: number;
  style?: CSSProperties;
}

const BorderGlow = ({
  children,
  className = "",
  backgroundColor = "#111827",
  borderRadius = 24,
  style,
}: BorderGlowProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handlePointerMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current?.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current?.style.setProperty("--mouse-y", `${y}px`);
  }, []);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      className={`border-glow-card ${className}`.trim()}
      style={{
        "--card-bg": backgroundColor,
        "--border-radius": `${borderRadius}px`,
        ...style,
      } as CSSProperties}
    >
      <span className="edge-light" />
      <div className="border-glow-inner">{children}</div>
    </div>
  );
};

export default BorderGlow;
