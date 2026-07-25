"use client";

import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-[#374151] bg-brand-primary-bg py-4 px-6 md:px-12 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <span className="text-xl font-bold text-brand-primary-text tracking-wide">
          AD Tech
        </span>
      </div>
      <div className="flex items-center space-x-6 text-sm font-medium">
        <Link href="/" className="text-brand-secondary-text hover:text-brand-primary-text transition-colors">
          Home
        </Link>
        <Link href="/careers" className="text-brand-secondary-text hover:text-brand-primary-text transition-colors">
          Careers
        </Link>
        <Link href="/faq" className="text-brand-secondary-text hover:text-brand-primary-text transition-colors">
          FAQ
        </Link>
      </div>
    </nav>
  );
}