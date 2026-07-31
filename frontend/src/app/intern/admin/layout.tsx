"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  ListChecks,
  Calendar,
  MessageSquare,
  BarChart3,
  Bell,
  LogOut,
  User,
  Menu,
  X,
  Sparkles,
  AlertTriangle,
  ArrowRight
} from "lucide-react";
import api from "@/lib/api";

interface NotificationItem {
  id: string;
  type: "callback" | "task_complete" | "task_overdue" | "new_intern";
  title: string;
  description: string;
  time: string;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const router = useRouter();
  const pathname = usePathname() || "";

  useEffect(() => {
    checkAdminAuth();
  }, []);

  const checkAdminAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/intern/login");
        return;
      }

      const res = await api.get("/auth/me");
      const me = res.data.data;
      if (me && me.role === "Admin") {
        setUser(me);
        setIsAdmin(true);
        // Load initial admin notifications
        fetchNotifications();
      } else {
        alert("Access Denied: Admins only.");
        router.push("/intern/dashboard");
      }
    } catch (err) {
      console.error(err);
      router.push("/intern/login");
    }
  };

  const fetchNotifications = async () => {
    try {
      // Gather some dynamic dashboard alerts
      const callbackRes = await api.get("/callback").catch(() => ({ data: { data: [] } }));
      const tasksRes = await api.get("/tasks").catch(() => ({ data: { data: [] } }));
      const internsRes = await api.get("/interns").catch(() => ({ data: { data: [] } }));

      const list: NotificationItem[] = [];

      // Callbacks
      const callbacks = callbackRes.data.data || [];
      callbacks.slice(0, 3).forEach((c: any) => {
        list.push({
          id: `c-${c._id}`,
          type: "callback",
          title: "New Callback Request",
          description: `${c.name} from ${c.company || "Unknown Company"} requested a call.`,
          time: new Date(c.createdAt).toLocaleDateString(),
        });
      });

      // Overdue Tasks / Completed
      const tasks = tasksRes.data.data || [];
      tasks.filter((t: any) => t.currentStatus === "Completed").slice(0, 2).forEach((t: any) => {
        list.push({
          id: `t-c-${t._id}`,
          type: "task_complete",
          title: "Task Completed",
          description: `Task #${t._id.slice(-6)} completed by ${t.assignedIntern?.fullName || "Intern"}.`,
          time: new Date(t.updatedAt).toLocaleDateString(),
        });
      });

      tasks.filter((t: any) => {
        return t.currentStatus !== "Completed" && t.deadline && new Date(t.deadline).getTime() < Date.now();
      }).slice(0, 2).forEach((t: any) => {
        list.push({
          id: `t-o-${t._id}`,
          type: "task_overdue",
          title: "Task Overdue",
          description: `Task #${t._id.slice(-6)} is past deadline.`,
          time: "Overdue",
        });
      });

      // New Interns
      const interns = internsRes.data.data || [];
      interns.slice(-2).forEach((i: any) => {
        list.push({
          id: `i-${i._id}`,
          type: "new_intern",
          title: "New Intern Joined",
          description: `${i.fullName} joined the ${i.department} department.`,
          time: new Date(i.createdAt).toLocaleDateString(),
        });
      });

      setNotifications(list);
    } catch (error) {
      console.error("Error generating admin notifications:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/intern/login");
  };

  if (isAdmin === null) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex justify-center items-center text-xl text-white font-medium">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-10 w-10 text-cyan-400" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Checking Admin Credentials...
        </div>
      </div>
    );
  }

  const menuItems = [
    { name: "Overview", icon: LayoutDashboard, path: "/intern/admin" },
    { name: "Intern Management", icon: Users, path: "/intern/admin/interns" },
    { name: "Task Management", icon: ListChecks, path: "/intern/admin/tasks" },
    { name: "Attendance Log", icon: Calendar, path: "/intern/admin/attendance" },
    { name: "Internal Messaging", icon: MessageSquare, path: "/intern/admin/messages" },
    { name: "Analytics Center", icon: BarChart3, path: "/intern/admin/analytics" },
  ];

  return (
    <main className="page-shell min-h-screen flex relative overflow-hidden bg-[#070b15]">
      {/* Background Glows */}
      <div className="bg-glow-cyan fixed -top-40 -left-40 h-[600px] w-[600px] opacity-25 pointer-events-none" />
      <div className="bg-glow-blue fixed -bottom-40 -right-40 h-[600px] w-[600px] opacity-35 pointer-events-none" />

      {/* Sidebar for Desktop */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 bg-[#0d1527]/90 border-r border-[#1e293b]/70 backdrop-blur-md transition-all duration-300 flex flex-col ${
          isSidebarOpen ? "w-64" : "w-20"
        } hidden md:flex`}
      >
        {/* Sidebar Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-[#1e293b]/70">
          <Link href="/intern/admin" className="flex items-center gap-3">
            <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-cyan-500/20">
              AD
            </span>
            {isSidebarOpen && (
              <span className="font-bold text-[#F8FAFC] tracking-wider text-sm">
                AD TECH ADMIN
              </span>
            )}
          </Link>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 group cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 text-cyan-300"
                    : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#111827]/40 border border-transparent"
                }`}
              >
                <item.icon size={20} className={isActive ? "text-cyan-400" : "text-[#64748B] group-hover:text-[#94A3B8] transition"} />
                {isSidebarOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#1e293b]/70">
          <div className={`flex items-center gap-3 p-3 rounded-xl bg-[#111827]/50 border border-[#1e293b]/50 ${isSidebarOpen ? "justify-between" : "justify-center"}`}>
            {isSidebarOpen && (
              <div className="min-w-0">
                <p className="text-sm font-bold text-[#F8FAFC] truncate">{user?.fullName}</p>
                <p className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider">Admin Portal</p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="p-2 text-[#64748B] hover:text-red-400 rounded-lg hover:bg-red-500/10 transition cursor-pointer"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isSidebarOpen ? "md:pl-64" : "md:pl-20"}`}>
        
        {/* Header */}
        <header className="h-20 bg-[#0d1527]/70 border-b border-[#1e293b]/70 backdrop-blur-md sticky top-0 z-30 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-[#1e293b]/50 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] cursor-pointer"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-lg font-bold text-[#F8FAFC]">
              {menuItems.find((item) => pathname === item.path)?.name || "Admin Management"}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2.5 rounded-xl bg-[#111827]/80 border border-[#1e293b] text-[#94A3B8] hover:text-[#F8FAFC] transition relative cursor-pointer"
              >
                <Bell size={18} />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                )}
              </button>

              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-80 bg-[#0e1628]/95 border border-[#1e293b] rounded-2xl p-4 shadow-2xl backdrop-blur-lg"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-[#1e293b] mb-3">
                      <span className="font-bold text-sm text-[#F8FAFC]">System Alerts</span>
                      <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-full font-semibold">
                        {notifications.length} Alerts
                      </span>
                    </div>

                    <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                      {notifications.map((item) => (
                        <div key={item.id} className="p-2.5 rounded-xl bg-[#111827]/80 border border-[#1e293b]/70 flex items-start gap-3">
                          {item.type === "task_overdue" ? (
                            <AlertTriangle size={16} className="text-red-400 shrink-0 mt-0.5" />
                          ) : (
                            <Sparkles size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                          )}
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-[#F8FAFC]">{item.title}</p>
                            <p className="text-[10px] text-[#94A3B8] mt-0.5 leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      ))}
                      {notifications.length === 0 && (
                        <p className="text-xs text-[#64748B] text-center py-4">No recent notifications</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown */}
            <div className="flex items-center gap-3 pl-4 border-l border-[#1e293b]">
              <div className="h-9 w-9 rounded-full bg-[#111827] border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <User size={16} />
              </div>
              <div className="hidden lg:block">
                <p className="text-xs font-bold text-[#F8FAFC]">{user?.fullName}</p>
                <p className="text-[10px] text-[#64748B] font-semibold">{user?.department}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Wrapper */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </div>
      </div>
    </main>
  );
}