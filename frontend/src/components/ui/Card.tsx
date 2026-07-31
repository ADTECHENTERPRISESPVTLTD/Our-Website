import type { ReactNode } from "react";
import BorderGlow from "./BorderGlow";
import SpotlightCard from "./SpotlightCard";

interface CardProps {
  children: ReactNode;
  className?: string;
  backgroundColor?: string;
  borderRadius?: number;
}

export default function Card({
  children,
  className = "",
  backgroundColor = "#111827",
  borderRadius = 24,
}: CardProps) {
  return (
    <BorderGlow
      className={className}
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
    >
      <SpotlightCard className="h-full w-full" spotlightColor="rgba(255, 255, 255, 0.22)">
        <div className="h-full w-full">{children}</div>
      </SpotlightCard>
    </BorderGlow>
  );
}
