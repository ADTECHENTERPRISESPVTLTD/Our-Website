"use client";

import React, { ReactNode } from "react";
import { cn } from "@/utils/helpers";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children?: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center bg-[#0B1120] text-[#F8FAFC] transition-colors duration-500 overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className={cn(
            `
            [--white-gradient:repeating-linear-gradient(100deg,rgba(6,182,212,0.15)_0%,rgba(6,182,212,0.15)_7%,transparent_10%,transparent_12%,rgba(59,130,246,0.15)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,#0B1120_0%,#0B1120_7%,transparent_10%,transparent_12%,#0B1120_16%)]
            [--aurora:repeating-linear-gradient(100deg,#06b6d4_10%,#3b82f6_15%,#6366f1_20%,#8b5cf6_25%,#0d9488_30%)]
            [background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px] opacity-40
            after:content-[''] after:absolute after:inset-0 after:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%_100%] 
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-50
            `,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]`
          )}
        />
        {/* Ambient Pulsing Aurora Blobs */}
        <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-indigo-600/20 blur-[140px] animate-pulse" />
        <div className="absolute top-[40%] left-[30%] h-[400px] w-[400px] rounded-full bg-blue-500/15 blur-[130px] animate-pulse" />
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      </div>

      {children && <div className="relative z-10 w-full">{children}</div>}
    </div>
  );
};

export default AuroraBackground;
