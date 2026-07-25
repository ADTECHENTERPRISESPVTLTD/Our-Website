"use client";

import React, { useState } from "react";
import Link from "next/link";

type TaskStatus = "Pending" | "In Progress" | "Completed";

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

// Global / Common initial task data
const initialTasks: Task[] = [
  {
    id: "TASK-01",
    title: "Database Schema & API Foundation",
    description: "Designed PostgreSQL schemas for hospital cms...",
    status: "Completed",
  },
  {
    id: "TASK-02",
    title: "Multilingual Chatbot Logic Integration",
    description: "Implemented bilingual fallback logic...",
    status: "Completed",
  },
  {
    id: "TASK-03",
    title: "Intern Portal Frontend & Authentication Flow",
    description: "Develop responsive Next.js dashboard...",
    status: "In Progress",
  },
];

export default function DashboardPage() {
  const [tasks] = useState<Task[]>(initialTasks);

  // Dynamic counts derived directly from tasks array
  const totalTasks = tasks.length;
  const pendingCount = tasks.filter((t) => t.status === "Pending").length;
  const inProgressCount = tasks.filter((t) => t.status === "In Progress").length;
  const completedCount = tasks.filter((t) => t.status === "Completed").length;

  return (
    <div className="w-full min-h-screen bg-[#0B1120] text-[#F8FAFC]">
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Welcome Card */}
        <div className="bg-[#1A2233] border border-[#2A3648] rounded-2xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
              Welcome, Yuragi!
            </h1>
            <p className="text-[#94A3B8] text-base md:text-lg mt-2 font-medium">
              Role: <span className="text-[#CBD5E1]">Full Stack Developer Intern</span>
            </p>
          </div>
          <Link
            href="/login"
            className="text-sm text-[#94A3B8] hover:text-[#EF4444] hover:border-[#EF4444] border border-[#2A3648] px-5 py-2.5 rounded-xl transition-colors duration-200 font-semibold"
          >
            Logout
          </Link>
        </div>

        {/* Grid Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Status Card */}
          <div className="bg-[#1A2233] border border-[#2A3648] p-7 rounded-2xl shadow-lg flex flex-col justify-between min-h-[180px]">
            <span className="text-sm text-[#94A3B8] font-semibold uppercase tracking-wider">
              Current Status
            </span>
            <div className="flex items-center gap-3 mt-4">
              <span className="w-4 h-4 rounded-full bg-[#10B981] animate-pulse"></span>
              <span className="font-bold text-2xl text-[#F8FAFC]">Online</span>
            </div>
          </div>

          {/* Dynamic Assigned Tasks Summary Card */}
          <div className="bg-[#1A2233] border border-[#2A3648] p-7 rounded-2xl shadow-lg space-y-4 min-h-[180px] flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#94A3B8] font-semibold uppercase tracking-wider">
                Assigned Tasks
              </span>
              <span className="text-xs text-[#F8FAFC] bg-[#111827] border border-[#2A3648] px-3 py-1 rounded-md font-bold">
                Total: {totalTasks}
              </span>
            </div>

            {/* Dynamic Task Breakdown Badges */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <div className="bg-[#111827] border border-[#2A3648] p-3 rounded-xl flex flex-col items-center justify-center text-center">
                <span className="text-[11px] text-[#94A3B8] font-medium uppercase whitespace-nowrap">Pending</span>
                <span className="font-bold text-xl text-[#EF4444] mt-1">{pendingCount}</span>
              </div>
              <div className="bg-[#111827] border border-[#2A3648] p-3 rounded-xl flex flex-col items-center justify-center text-center">
                <span className="text-[11px] text-[#94A3B8] font-medium uppercase whitespace-nowrap">In Progress</span>
                <span className="font-bold text-xl text-[#F59E0B] mt-1">{inProgressCount}</span>
              </div>
              <div className="bg-[#111827] border border-[#2A3648] p-3 rounded-xl flex flex-col items-center justify-center text-center">
                <span className="text-[11px] text-[#94A3B8] font-medium uppercase whitespace-nowrap">Completed</span>
                <span className="font-bold text-xl text-[#10B981] mt-1">{completedCount}</span>
              </div>
            </div>
          </div>

          {/* Attendance Card */}
          <div className="bg-[#1A2233] border border-[#2A3648] p-7 rounded-2xl shadow-lg flex flex-col justify-between min-h-[180px]">
            <span className="text-sm text-[#94A3B8] font-semibold uppercase tracking-wider">
              Attendance
            </span>
            <div className="font-bold text-3xl text-[#10B981] mt-4">
              100% Active
            </div>
          </div>
        </div>

        {/* Internal Navigation Shortcuts */}
        <div className="bg-[#1A2233] border border-[#2A3648] rounded-2xl p-8 space-y-6 shadow-xl">
          <h2 className="text-xl font-bold text-[#F8FAFC]">Quick Portal Actions</h2>
          <div className="flex flex-wrap gap-5">
            <Link
              href="/attendance"
              className="bg-[#111827] border border-[#2A3648] text-[#CBD5E1] hover:text-[#F8FAFC] hover:border-[#64748B] px-6 py-3.5 rounded-xl text-base font-semibold transition-all duration-200 hover:bg-[#1f293d]"
            >
              Go to Attendance Module →
            </Link>
            <Link
              href="/tasks"
              className="bg-[#111827] border border-[#2A3648] text-[#CBD5E1] hover:text-[#F8FAFC] hover:border-[#64748B] px-6 py-3.5 rounded-xl text-base font-semibold transition-all duration-200 hover:bg-[#1f293d]"
            >
              View Assigned Tasks →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}