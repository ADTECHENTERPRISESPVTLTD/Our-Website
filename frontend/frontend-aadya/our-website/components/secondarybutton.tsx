import React from "react";

interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`bg-transparent text-brand-primary-text border border-brand-accent px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 hover:bg-brand-card-bg active:scale-95 cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};