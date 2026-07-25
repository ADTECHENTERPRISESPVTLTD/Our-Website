"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import logoPic from "../assets/ad.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-[#F8FAFC] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1A2233] border border-[#2A3648] rounded-xl p-8 shadow-2xl">
        
        {/* Larger Logo Container with Tight Bottom Margin */}
        <div className="flex justify-center mb-[-12px]">
          <div className="relative w-72 h-28 flex items-center justify-center">
            <Image
              src={logoPic}
              alt="AdTech Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Heading with reduced top gap */}
        <h2 className="text-2xl font-bold text-center mb-5 text-[#F8FAFC]">
          Intern Portal Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#CBD5E1] mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="yuragi@adtech.com"
              className="w-full bg-[#111827] border border-[#2A3648] text-[#F8FAFC] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#64748B]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#CBD5E1] mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#111827] border border-[#2A3648] text-[#F8FAFC] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#64748B]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#F8FAFC] text-[#0B1120] font-semibold py-2.5 rounded-lg text-sm hover:bg-opacity-90 transition mt-6 cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}