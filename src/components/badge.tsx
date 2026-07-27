import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "accent" | "success" | "warning" | "error";
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = "accent" }) => {
  const variantStyles = {
    accent: "bg-[#1A2233] text-[#CBD5E1] border border-[#06B6D4]/30",
    success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    error: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variantStyles[variant]}`}>
      {children}
    </span>
  );
};