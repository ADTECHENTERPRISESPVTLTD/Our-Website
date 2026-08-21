"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Careers", href: "/careers" },
  { label: "FAQ", href: "/faq" },
  { label: "Callback", href: "/callback" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0B1120]/95 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-[#1A2233]"
          : "bg-[#0B1120]/80 backdrop-blur-md border-b border-[#374151]"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            <Image
              src="/adtech-logo.png"
              alt="AD Tech Logo"
              width={160}
              height={85}
              className="h-14 w-14 object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </motion.div>
          <motion.h1
            whileHover={{ scale: 1.02 }}
            className="text-2xl font-bold tracking-wide text-white"
          >
            AD<span className="text-cyan-400">TECH</span>
          </motion.h1>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-8 text-[#CBD5E1] font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative group text-sm transition-colors duration-300 hover:text-cyan-400"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/requirement"
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              Submit Requirement
            </Link>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden relative z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-[#2A3648] bg-[#1A2233]/50 text-white transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400/10"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden border-t border-[#1A2233] bg-[#0B1120]/98 backdrop-blur-xl"
          >
            <div className="px-6 py-6 space-y-3">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-xl border border-[#2A3648] bg-[#1A2233]/50 px-5 py-3 text-[#CBD5E1] font-medium transition-all duration-300 hover:border-cyan-400 hover:text-cyan-400 hover:bg-cyan-400/5"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="/requirement"
                  onClick={() => setIsOpen(false)}
                  className="block rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-center text-white font-semibold shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:shadow-xl"
                >
                  Submit Requirement
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

