"use client";

import Link from "next/link";
import AuroraBackground from "@/components/ui/aurora-background";

export default function AttendancePage() {
  return (
    <main className="page-shell relative min-h-screen overflow-hidden text-[#F8FAFC] bg-[#0B1120]/80">
      <AuroraBackground starCount={75} pulseDuration={8} className="absolute inset-0 z-0 pointer-events-none" />
      <div className="relative z-10 min-h-screen p-8 max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#2A3648] pb-5">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
              Attendance
            </h1>
            <p className="text-sm text-[#94A3B8] mt-2">
              Track your daily attendance and working hours.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="text-sm font-semibold text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#64748B] border border-[#2A3648] px-4 py-2 rounded-xl transition duration-200 bg-[#111827]/70"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1A2233] border border-[#2A3648] p-7 rounded-2xl shadow-lg">
            <span className="text-sm text-[#94A3B8] font-semibold uppercase tracking-wider">
              Present Days
            </span>
            <p className="font-bold text-4xl text-[#10B981] mt-4">22</p>
          </div>
          <div className="bg-[#1A2233] border border-[#2A3648] p-7 rounded-2xl shadow-lg">
            <span className="text-sm text-[#94A3B8] font-semibold uppercase tracking-wider">
              Total Working Days
            </span>
            <p className="font-bold text-4xl text-[#F8FAFC] mt-4">22</p>
          </div>
          <div className="bg-[#1A2233] border border-[#2A3648] p-7 rounded-2xl shadow-lg">
            <span className="text-sm text-[#94A3B8] font-semibold uppercase tracking-wider">
              Attendance %
            </span>
            <p className="font-bold text-4xl text-[#38BDF8] mt-4">100%</p>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-[#1A2233] border border-[#2A3648] rounded-2xl p-8 shadow-xl">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-6">Monthly Attendance</h2>
          <p className="text-[#94A3B8]">Attendance records are being maintained. Check back for detailed logs.</p>
        </div>
      </div>
    </main>
  );
}

