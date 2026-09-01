"use client";

import React from "react";

export interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode;
  gradientColors?: string[];
  pulseDuration?: number;
  starCount?: number;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className = "",
  children,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div className={`relative pointer-events-none ${className}`.trim()} {...props}>
      {children}
    </div>
  );
};

export default AuroraBackground;
