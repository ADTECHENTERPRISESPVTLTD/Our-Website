"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight, Loader2, CheckCircle } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Careers", href: "/careers" },
  { label: "Intern Portal", href: "/login" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const services = [
  { label: "Web Development", href: "/services" },
  { label: "Mobile Apps", href: "/services" },
  { label: "AI Solutions", href: "/services" },
  { label: "Cloud Solutions", href: "/services" },
  { label: "UI/UX Design", href: "/services" },
  { label: "Maintenance", href: "/services" },
];

const socialLinks = [
  { href: "#", label: "LinkedIn", icon: "in" },
  { href: "#", label: "Twitter / X", icon: "𝕏" },
  { href: "#", label: "Instagram", icon: "ig" },
  { href: "#", label: "GitHub", icon: "gh" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const [subscribeError, setSubscribeError] = useState("");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeError("");
    setIsSubscribing(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to subscribe");
      }

      setSubscribeSuccess(true);
      setEmail("");
    } catch (error: any) {
      setSubscribeError(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="relative bg-[#0B1120] border-t border-[#1A2233] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute left-0 bottom-0 h-64 w-64 bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute right-0 top-0 h-64 w-64 bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Top Grid */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/AD tech logo.png"
                alt="AD Tech Logo"
                className="h-12 w-12 object-contain"
              />
              <span className="text-xl font-bold text-white">AD TECH</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Building Future Tech Talent through innovative software, AI automation, 
              and digital transformation solutions.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1A2233] border border-[#2A3648] text-slate-400 transition-all duration-300 hover:border-cyan-400 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                >
                <span className="text-xs font-bold">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[3px] text-cyan-400 mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-all duration-300 hover:text-white"
                  >
                    <ArrowUpRight size={14} className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[3px] text-cyan-400 mb-6">
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-all duration-300 hover:text-white"
                  >
                    <ArrowUpRight size={14} className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info & Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[3px] text-cyan-400 mb-6">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:hradtechenterpriseschepvtltd@gmail.com"
                  className="group flex items-start gap-3 text-sm text-slate-400 transition-all duration-300 hover:text-white"
                >
                  <Mail size={16} className="mt-0.5 text-cyan-400 shrink-0" />
                  <span className="break-all">hradtechenterpriseschepvtltd@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+918319358568"
                  className="group flex items-start gap-3 text-sm text-slate-400 transition-all duration-300 hover:text-white"
                >
                  <Phone size={16} className="mt-0.5 text-cyan-400 shrink-0" />
                  <span>+91 83193 58568</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-slate-400">
                  <MapPin size={16} className="mt-0.5 text-cyan-400 shrink-0" />
                  <span>Nagpur, Maharashtra, India</span>
                </div>
              </li>
            </ul>

            {/* Newsletter Subscription */}
            <div className="mt-6">
              <h4 className="text-xs font-semibold uppercase tracking-[2px] text-slate-500 mb-3">
                Subscribe to Our Newsletter
              </h4>

              {subscribeSuccess ? (
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <CheckCircle size={16} />
                  <span>Subscribed successfully!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 rounded-xl border border-[#2A3648] bg-[#1A2233] px-3 py-2.5 text-sm text-white outline-none transition-all duration-300 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.1)] placeholder:text-slate-500"
                  />
                  <button
                    type="submit"
                    disabled={isSubscribing}
                    className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubscribing ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <ArrowUpRight size={16} />
                    )}
                  </button>
                </form>
              )}

              {subscribeError && (
                <p className="mt-1.5 text-xs text-red-400">{subscribeError}</p>
              )}
            </div>

            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              Get in Touch
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#1A2233] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} AD Tech Enterprises Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-slate-500 hover:text-slate-300 transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-slate-500 hover:text-slate-300 transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

