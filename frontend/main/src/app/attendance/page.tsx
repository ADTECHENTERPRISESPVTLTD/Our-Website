"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  LogIn,
  LogOut,
  Calendar,
  CheckCircle2,
  Activity,
  Sun,
  Moon,
  TrendingUp,
} from "lucide-react";

export default function AttendancePage() {
  const [status, setStatus] = useState<"Online" | "Offline">("Online");
  const [lastLogin, setLastLogin] = useState("July 24, 2026 - 09:30 AM");
  const [lastLogout, setLastLogout] = useState("July 23, 2026 - 06:00 PM");
  const [isAnimating, setIsAnimating] = useState(false);

  const today = new Date();
  const currentTime = today.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleMarkOnline = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setStatus("Online");
      setLastLogin(`${today.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} - ${currentTime}`);
      setIsAnimating(false);
    }, 600);
  };

  const handleMarkOffline = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setStatus("Offline");
      setLastLogout(`${today.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} - ${currentTime}`);
      setIsAnimating(false);
    }, 600);
  };

  // Mock attendance data for the month
  const daysInMonth = 24;
  const presentDays = 22;
  const absentDays = 0;
  const leaveDays = 2;
  const attendancePercent = Math.round((presentDays / daysInMonth) * 100);

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <main className="page-shell">
      {/* Background Effects */}
      <div className="bg-glow-cyan fixed -top-40 -left-40 h-[500px] w-[500px] opacity-30" />
      <div className="bg-glow-blue fixed -bottom-40 -right-40 h-[500px] w-[500px] opacity-40" />

      <div className="relative z-10 p-6 md:p-8 max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#F8FAFC]">Attendance</h1>
            <p className="text-sm text-[#94A3B8] mt-1">Track your daily attendance and activity</p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#F8FAFC] border border-[#2A3648] px-4 py-2.5 rounded-xl hover:border-cyan-400/30 transition-all duration-300"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Status & Actions */}
          <div className="space-y-6">
            {/* Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="portal-card p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className={`p-2.5 rounded-xl ${status === "Online" ? "bg-emerald-400/10 border-emerald-400/20" : "bg-red-400/10 border-red-400/20"} border`}>
                  <Activity size={20} className={status === "Online" ? "text-emerald-400" : "text-red-400"} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#F8FAFC]">Current Status</h2>
                  <p className="text-xs text-[#94A3B8]">Your availability</p>
                </div>
              </div>

              <div className="text-center p-6 rounded-xl bg-[#111827] border border-[#2A3648] mb-5">
                <div className="relative inline-flex mb-3">
                  {status === "Online" ? (
                    <span className="relative flex h-16 w-16">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-30" />
                      <span className="relative inline-flex items-center justify-center rounded-full h-16 w-16 bg-emerald-500/20 border-2 border-emerald-400">
                        <Sun size={28} className="text-emerald-400" />
                      </span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center rounded-full h-16 w-16 bg-red-500/20 border-2 border-red-400">
                      <Moon size={28} className="text-red-400" />
                    </span>
                  )}
                </div>
                <p className={`text-2xl font-bold ${status === "Online" ? "text-emerald-400" : "text-red-400"}`}>
                  {status}
                </p>
                <p className="text-xs text-[#64748B] mt-1">
                  {status === "Online" ? "You are currently active" : "You are currently offline"}
                </p>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleMarkOnline}
                  disabled={status === "Online" || isAnimating}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer ${
                    status === "Online"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-400/20 cursor-not-allowed"
                      : "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/20 hover:shadow-xl"
                  }`}
                >
                  {isAnimating ? (
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <LogIn size={16} />
                  )}
                  {status === "Online" ? "Online" : "Mark Online"}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleMarkOffline}
                  disabled={status === "Offline" || isAnimating}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer ${
                    status === "Offline"
                      ? "bg-red-500/10 text-red-400 border border-red-400/20 cursor-not-allowed"
                      : "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/20 hover:shadow-xl"
                  }`}
                >
                  <LogOut size={16} />
                  {status === "Offline" ? "Offline" : "Mark Offline"}
                </motion.button>
              </div>
            </motion.div>

            {/* Session Log */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="portal-card p-6"
            >
              <h2 className="text-sm font-semibold text-[#94A3B8] uppercase tracking-wider mb-4">
                Session Log
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#111827] border border-[#2A3648]">
                  <div className="p-2 rounded-lg bg-emerald-400/10">
                    <LogIn size={14} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B]">Last Login</p>
                    <p className="text-sm font-semibold text-[#F8FAFC]">{lastLogin}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#111827] border border-[#2A3648]">
                  <div className="p-2 rounded-lg bg-red-400/10">
                    <LogOut size={14} className="text-red-400" />
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B]">Last Logout</p>
                    <p className="text-sm font-semibold text-[#F8FAFC]">{lastLogout}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Monthly Stats & Calendar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                { label: "Total Days", value: daysInMonth, icon: Calendar, color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/20" },
                { label: "Present", value: presentDays, icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
                { label: "Absent", value: absentDays, icon: Clock, color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/20" },
                { label: "Leave", value: leaveDays, icon: Sun, color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={`portal-card p-4 ${stat.bg} ${stat.border}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-[#94A3B8] font-semibold uppercase tracking-wider">
                      {stat.label}
                    </span>
                    <stat.icon size={16} className={stat.color} />
                  </div>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </motion.div>

            {/* Attendance Percentage */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="portal-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-400/10 border border-emerald-400/20">
                    <TrendingUp size={20} className="text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#F8FAFC]">Monthly Attendance</h2>
                    <p className="text-xs text-[#94A3B8]">July 2026</p>
                  </div>
                </div>
                <p className="text-3xl font-bold text-emerald-400">{attendancePercent}%</p>
              </div>

              <div className="h-3 w-full rounded-full bg-[#1A2233] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${attendancePercent}%` }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-green-500 relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </motion.div>
              </div>

              <div className="flex justify-between text-xs text-[#64748B] mt-2">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>

              <div className="mt-4 flex items-center justify-center gap-6 text-xs text-[#64748B] pt-4 border-t border-[#2A3648]/50">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Present ({presentDays})
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  Absent ({absentDays})
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  Leave ({leaveDays})
                </span>
              </div>
            </motion.div>

            {/* Weekly Calendar Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="portal-card p-6"
            >
              <h2 className="text-sm font-semibold text-[#94A3B8] uppercase tracking-wider mb-4">
                This Week
              </h2>
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((day, i) => (
                  <div key={day} className="text-center">
                    <p className="text-[10px] text-[#64748B] mb-2 font-medium">{day}</p>
                    <div
                      className={`p-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        i < 5
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-400/20"
                          : "bg-[#111827] text-[#64748B] border border-[#2A3648]"
                      }`}
                    >
                      {i + 19}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#64748B] mt-4 text-center">
                Week of July 19 &mdash; July 25, 2026
              </p>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-[#2A3648]/50">
          <p className="text-xs text-[#64748B]">
            AD TECH Enterprises Pvt. Ltd. &mdash; Attendance Tracker
          </p>
        </div>
      </div>
    </main>
  );
}
