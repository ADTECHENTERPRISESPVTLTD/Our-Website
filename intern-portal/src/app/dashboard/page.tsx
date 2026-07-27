"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  Calendar,
  Bell,
  Sparkles,
  Activity,
  LogOut,
  User,
  BarChart3,
  ListChecks,
} from "lucide-react";

type TaskStatus = "Pending" | "In Progress" | "Completed";

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  deadline?: string;
}

const initialTasks: Task[] = [
  {
    id: "TASK-01",
    title: "Database Schema & API Foundation",
    description: "Designed PostgreSQL schemas for hospital cms...",
    status: "Completed",
    deadline: "18 Jul",
  },
  {
    id: "TASK-02",
    title: "Multilingual Chatbot Logic Integration",
    description: "Implemented bilingual fallback logic...",
    status: "Completed",
    deadline: "21 Jul",
  },
  {
    id: "TASK-03",
    title: "Intern Portal Frontend & Authentication Flow",
    description: "Develop responsive Next.js dashboard...",
    status: "In Progress",
    deadline: "24 Jul",
  },
];

const statusColors: Record<TaskStatus, { bg: string; text: string; dot: string }> = {
  Pending: { bg: "bg-red-500/10", text: "text-red-400", dot: "bg-red-400" },
  "In Progress": { bg: "bg-amber-500/10", text: "text-amber-400", dot: "bg-amber-400" },
  Completed: { bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-400" },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const [tasks] = useState<Task[]>(initialTasks);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const totalTasks = tasks.length;
  const pendingCount = tasks.filter((t) => t.status === "Pending").length;
  const inProgressCount = tasks.filter((t) => t.status === "In Progress").length;
  const completedCount = tasks.filter((t) => t.status === "Completed").length;

  return (
    <main className="page-shell">
      {/* Background Effects */}
      <div className="bg-glow-cyan fixed -top-40 -left-40 h-[500px] w-[500px] opacity-30" />
      <div className="bg-glow-blue fixed -bottom-40 -right-40 h-[500px] w-[500px] opacity-40" />

      <div className="relative z-10 p-6 md:p-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wider bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/20">
                <Sparkles size={12} className="inline mr-1" />
                {greeting}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] flex items-center gap-3">
              Welcome back, Yuragi
              <span className="inline-flex w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            </h1>
            <p className="text-[#94A3B8] mt-1">
              Full Stack Developer Intern
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/tasks"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-400/20 text-cyan-300 px-5 py-2.5 rounded-xl text-sm font-semibold hover:from-cyan-500/30 hover:to-blue-600/30 hover:border-cyan-400/40 transition-all duration-300"
            >
              <ListChecks size={16} />
              My Tasks
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-red-400 border border-[#2A3648] px-5 py-2.5 rounded-xl text-sm font-semibold hover:border-red-400/30 transition-all duration-300"
            >
              <LogOut size={16} />
              Logout
            </Link>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-4 gap-5"
        >
          {[
            {
              label: "Total Tasks",
              value: totalTasks,
              icon: LayoutDashboard,
              color: "from-cyan-500/20 to-blue-600/20",
              border: "border-cyan-400/20",
              textColor: "text-cyan-300",
            },
            {
              label: "In Progress",
              value: inProgressCount,
              icon: Clock,
              color: "from-amber-500/20 to-orange-600/20",
              border: "border-amber-400/20",
              textColor: "text-amber-300",
            },
            {
              label: "Completed",
              value: completedCount,
              icon: CheckCircle2,
              color: "from-emerald-500/20 to-green-600/20",
              border: "border-emerald-400/20",
              textColor: "text-emerald-300",
            },
            {
              label: "Pending",
              value: pendingCount,
              icon: AlertCircle,
              color: "from-red-500/20 to-rose-600/20",
              border: "border-red-400/20",
              textColor: "text-red-300",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`portal-card p-6 bg-gradient-to-br ${stat.color} border ${stat.border}`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-[#94A3B8] font-semibold uppercase tracking-wider">
                  {stat.label}
                </span>
                <stat.icon size={20} className={stat.textColor} />
              </div>
              <p className={`text-4xl font-bold ${stat.textColor}`}>
                {stat.value}
              </p>
              <div className="mt-3 h-1.5 w-full rounded-full bg-[#1A2233] overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    index === 0
                      ? "bg-gradient-to-r from-cyan-400 to-blue-500 w-full"
                      : index === 1
                        ? "bg-gradient-to-r from-amber-400 to-orange-500"
                        : index === 2
                          ? "bg-gradient-to-r from-emerald-400 to-green-500"
                          : "bg-gradient-to-r from-red-400 to-rose-500"
                  }`}
                  style={{
                    width: `${
                      index === 0 ? 100 : (stat.value / Math.max(totalTasks, 1)) * 100
                    }%`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Tasks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 portal-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-400/10 border border-cyan-400/20">
                  <ListChecks size={18} className="text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#F8FAFC]">Recent Tasks</h2>
                  <p className="text-xs text-[#94A3B8]">Track your ongoing assignments</p>
                </div>
              </div>
              <Link
                href="/tasks"
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition"
              >
                View All <ArrowRight size={12} />
              </Link>
            </div>

            <div className="space-y-3">
              {tasks.map((task) => {
                const colors = statusColors[task.status];
                return (
                  <motion.div
                    key={task.id}
                    whileHover={{ x: 4 }}
                    className="group flex items-center justify-between p-4 rounded-xl bg-[#111827] border border-[#2A3648] hover:border-cyan-400/20 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className={`w-2.5 h-2.5 rounded-full ${colors.dot} shrink-0`} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-[#64748B]">{task.id}</span>
                          <h3 className="text-sm font-semibold text-[#F8FAFC] truncate">
                            {task.title}
                          </h3>
                        </div>
                        <p className="text-xs text-[#64748B] mt-0.5 truncate max-w-md">
                          {task.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {task.deadline && (
                        <span className="text-[10px] text-[#64748B] hidden sm:flex items-center gap-1">
                          <Calendar size={10} />
                          {task.deadline}
                        </span>
                      )}
                      <span
                        className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${colors.bg} ${colors.text} border border-current/20`}
                      >
                        {task.status}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Actions & Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Status Card */}
            <div className="portal-card p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-xl bg-emerald-400/10 border border-emerald-400/20">
                  <Activity size={18} className="text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#F8FAFC]">Status</h2>
                  <p className="text-xs text-[#94A3B8]">Current availability</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-[#111827] border border-[#2A3648]">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#F8FAFC]">Online</p>
                  <p className="text-xs text-[#64748B]">Active now</p>
                </div>
              </div>
            </div>

            {/* Attendance Card */}
            <div className="portal-card p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-xl bg-blue-400/10 border border-blue-400/20">
                  <Calendar size={18} className="text-blue-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#F8FAFC]">Attendance</h2>
                  <p className="text-xs text-[#94A3B8]">This month</p>
                </div>
              </div>

              <div className="text-center p-6 rounded-xl bg-[#111827] border border-[#2A3648]">
                <p className="text-4xl font-bold text-emerald-400">100%</p>
                <p className="text-sm text-[#94A3B8] mt-2">Active Attendance</p>
                <div className="mt-4 h-2 w-full rounded-full bg-[#1A2233] overflow-hidden">
                  <div className="h-full w-full rounded-full bg-gradient-to-r from-emerald-400 to-green-500" />
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="portal-card p-6">
              <h2 className="text-sm font-semibold text-[#94A3B8] uppercase tracking-wider mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Link
                  href="/attendance"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#111827] border border-[#2A3648] hover:border-cyan-400/20 hover:bg-gradient-to-r hover:from-cyan-500/5 hover:to-blue-600/5 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-cyan-400" />
                    <span className="text-sm text-[#CBD5E1] group-hover:text-[#F8FAFC] transition">
                      Mark Attendance
                    </span>
                  </div>
                  <ArrowRight size={14} className="text-[#64748B] group-hover:text-cyan-400 transition" />
                </Link>
                <Link
                  href="/tasks"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#111827] border border-[#2A3648] hover:border-cyan-400/20 hover:bg-gradient-to-r hover:from-cyan-500/5 hover:to-blue-600/5 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <ListChecks size={16} className="text-cyan-400" />
                    <span className="text-sm text-[#CBD5E1] group-hover:text-[#F8FAFC] transition">
                      View Tasks
                    </span>
                  </div>
                  <ArrowRight size={14} className="text-[#64748B] group-hover:text-cyan-400 transition" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center pt-8 border-t border-[#2A3648]/50"
        >
          <p className="text-xs text-[#64748B]">
            AD TECH Enterprises Pvt. Ltd. &mdash; Intern Portal Dashboard
          </p>
        </motion.div>
      </div>
    </main>
  );
}

