"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-brand-primaryBg border-b border-brand-borders px-6 py-4 flex items-center justify-between text-brand-primaryText">
      <div className="text-xl font-bold tracking-wider">
        ADTech
      </div>
      <div className="flex gap-6 items-center text-brand-secondaryText">
        <Link href="/" className="hover:text-brand-primaryText transition-colors">Home</Link>
        <Link href="/careers" className="hover:text-brand-primaryText transition-colors">Careers</Link>
        <Link href="/faq" className="hover:text-brand-primaryText transition-colors">FAQ</Link>
      </div>
    </nav>
  );
}