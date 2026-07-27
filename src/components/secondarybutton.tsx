"use client";
import React from "react";

interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`border border-[#2A3648] text-[#F8FAFC] font-semibold px-6 py-2.5 rounded-lg transition-all duration-200 hover:border-cyan-400 hover:bg-[#1A2233] active:scale-95 cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

