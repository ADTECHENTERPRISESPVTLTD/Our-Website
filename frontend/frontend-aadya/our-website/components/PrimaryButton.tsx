
"use client";
import React from "react";

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode; // Explicitly typed instead of 'any'
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`bg-brand-primary-text text-brand-primary-bg font-semibold px-6 py-2.5 rounded-lg transition-all duration-200 hover:opacity-90 active:scale-95 cursor-pointer shadow-md ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};