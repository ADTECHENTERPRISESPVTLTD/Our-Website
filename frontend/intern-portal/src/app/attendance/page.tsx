"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function AttendancePage() {
  const [status, setStatus] = useState<"Online" | "Offline">("Online");
  const [lastLogin, setLastLogin] = useState("July 24, 2026 - 09:30 AM");
  const [lastLogout, setLastLogout] = useState("July 23, 2026 - 06:00 PM");

  const handleMarkOnline = () => {
    setStatus("Online");
    setLastLogin(new Date().toLocaleString());
  };

  const handleMarkOffline = () => {
    setStatus("Offline");
    setLastLogout(new Date().toLocaleString());
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-[#F8FAFC] p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center border-b border-[#374151] pb-4">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">Attendance Module</h1>
        <Link
          href="/dashboard"
          className="text-xs text-[#94A3B8] hover:text-[#F8FAFC] border border-[#2A3648] px-3 py-1.5 rounded-lg transition"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <div className="bg-[#1A2233] border border-[#2A3648] p-6 rounded-xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#374151] pb-6">
          <div>
            <p className="text-xs text-[#94A3B8] font-medium uppercase tracking-wider">Current Status</p>
            <p className={`font-bold text-xl mt-1 ${status === "Online" ? "text-[#10B981]" : "text-[#EF4444]"}`}>
              {status}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleMarkOnline}
              className="bg-[#10B981] text-[#0B1120] px-4 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition cursor-pointer"
            >
              Mark Online
            </button>
            <button
              onClick={handleMarkOffline}
              className="bg-[#EF4444] text-[#F8FAFC] px-4 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition cursor-pointer"
            >
              Mark Offline
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm pt-2">
          <div className="bg-[#111827] border border-[#2A3648] p-4 rounded-lg">
            <span className="text-[#94A3B8] block text-xs font-medium">Last Login Time</span>
            <span className="text-[#F8FAFC] font-semibold mt-1 block">{lastLogin}</span>
          </div>
          <div className="bg-[#111827] border border-[#2A3648] p-4 rounded-lg">
            <span className="text-[#94A3B8] block text-xs font-medium">Last Logout Time</span>
            <span className="text-[#F8FAFC] font-semibold mt-1 block">{lastLogout}</span>
          </div>
        </div>
      </div>
    </div>
  );
}