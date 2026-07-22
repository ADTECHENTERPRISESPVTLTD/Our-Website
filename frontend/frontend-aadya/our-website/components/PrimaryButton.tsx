"use client";
import React from 'react';
interface PrimaryButtonProps {
    children : React.ReactNode;
    onClick? :() => void;
    type?: "button" | "submit" | "reset";
}
 // component function
 export default function PrimaryButton({ children, onClick, type = "button" }: PrimaryButtonProps) {
  return (
    <button
    type={type}
    onClick={onClick}
    className="bg-brand-primaryButton text-brand-primaryButtonText font-medium px-6 py-2.5 rounded-lg transition-all duration-200 hover:opacity-90 active:scale-95 shadow-md"
    >
        {children}
        </button>
  );
}
    
