"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  Activity,
  CheckCircle2,
  Clock,
  AlertCircle,
  PhoneCall,
  LayoutDashboard,
  ArrowRight,
  ShieldCheck,
  Calendar
} from "lucide-react";
import api from "@/lib/api";

export default function AdminDashboardOverview() {
  const [interns, setInterns] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [callbacks, setCallbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const internRes = await api.get("/interns");
      const taskRes = await api.get("/tasks");
      const callbackRes = await api.get("/callback").catch(() => ({ data: { data: [] } }));

      setInterns(internRes.data.data || []);
      setTasks(taskRes.data.data || []);
      setCallbacks(callbackRes.data.data || []);
    } catch (err) {
      console.error("Error fetching overview data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 text-xl text-white font-medium">
        <svg className="animate-spin h-8 w-8 text-cyan-400 mr-3" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        Loading Summary...
      </div>
    );
  }

  // Calculations
  const totalInterns = interns.length;
  const activeOnline = interns.filter((i) => i.presenceStatus === "Online").length;
  const activeIdle = interns.filter((i) => i.presenceStatus === "Idle").length;
  const offlineCount = totalInterns - activeOnline - activeIdle;

  const totalTasks = tasks.length;
  const tasksPending = tasks.filter((t) => t.currentStatus === "Pending").length;
  const tasksInProgress = tasks.filter((t) => t.currentStatus === "In Progress").length;
  const tasksCompleted = tasks.filter((t) => t.currentStatus === "Completed").length;

  const stats = [
    { label: "Total Interns", value: totalInterns, icon: Users, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
    { label: "Online Interns", value: activeOnline, icon: Activity, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    { label: "Offline Interns", value: offlineCount, icon: AlertCircle, color: "text-slate-400", bg: "bg-slate-500/10", border: "border-slate-500/20" },
    { label: "Assigned Tasks", value: totalTasks, icon: LayoutDashboard, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    { label: "Tasks In Progress", value: tasksInProgress, icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
    { label: "Tasks Completed", value: tasksCompleted, icon: CheckCircle2, color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
    { label: "Pending Reviews", value: tasksPending, icon: ShieldCheck, color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" },
    { label: "Callback Requests", value: callbacks.length, icon: PhoneCall, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-sm text-slate-400 mt-1">Real-time status monitoring and operations metrics.</p>
        </div>
        <button
          onClick={fetchData}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md transition-all duration-300 text-sm cursor-pointer"
        >
          Refresh Data
        </button>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -4, scale: 1.02 }}
            className={`portal-card p-6 bg-slate-900/50 border ${stat.border} flex items-center justify-between`}
          >
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{stat.label}</span>
              <h3 className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</h3>
            </div>
            <div className={`p-3.5 rounded-xl ${stat.bg} ${stat.color} border border-current/10`}>
              <stat.icon size={22} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Overview Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Live Presence Status */}
        <div className="lg:col-span-2 portal-card p-6 bg-slate-900/40 border border-[#1e293b]/70">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-white">Live Intern Presence</h2>
              <p className="text-xs text-slate-400">Current active users on portal</p>
            </div>
            <Link href="/intern/admin/interns" className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
              View Directory <ArrowRight size={12} />
            </Link>
          </div>

          <div className="space-y-4">
            {interns.slice(0, 5).map((intern) => {
              const isOnline = intern.presenceStatus === "Online";
              const isIdle = intern.presenceStatus === "Idle";
              return (
                <div
                  key={intern._id}
                  className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 p-4 rounded-xl bg-[#0b1120]/60 border border-[#1e293b]/50"
                >
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-3.5 w-3.5 shrink-0">
                      {isOnline && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />}
                      <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${
                        isOnline ? "bg-emerald-500" : isIdle ? "bg-amber-500" : "bg-slate-600"
                      }`} />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{intern.fullName}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{intern.role} &bull; {intern.department}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <div className="text-left sm:text-right">
                      <p className="text-slate-300 font-mono text-[11px] truncate max-w-[150px] sm:max-w-xs" title={intern.currentPage}>
                        {intern.currentPage ? `Page: ${intern.currentPage}` : "No active page"}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        Last Active: {intern.lastActive ? new Date(intern.lastActive).toLocaleTimeString() : "Never"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            {interns.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-6">No interns found.</p>
            )}
          </div>
        </div>

        {/* Callback Requests Panel */}
        <div className="portal-card p-6 bg-slate-900/40 border border-[#1e293b]/70 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-white">Callback Requests</h2>
                <p className="text-xs text-slate-400">Recent client inquiries</p>
              </div>
              <span className="text-[10px] bg-purple-500/10 border border-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full font-bold">
                Client
              </span>
            </div>

            <div className="space-y-4">
              {callbacks.slice(0, 3).map((item) => (
                <div key={item._id} className="p-3.5 rounded-xl bg-[#0b1120]/60 border border-[#1e293b]/50">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-200">{item.name}</span>
                    <span className="text-[10px] font-mono text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 truncate">{item.company || "No Company"}</p>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Phone: {item.phoneNumber}</span>
                  </div>
                </div>
              ))}
              {callbacks.length === 0 && (
                <p className="text-sm text-slate-500 text-center py-6">No callback requests found.</p>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#1e293b]/50 text-center">
            <span className="text-xs text-slate-500">
              Total Inquiries: <span className="font-bold text-white">{callbacks.length}</span>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}