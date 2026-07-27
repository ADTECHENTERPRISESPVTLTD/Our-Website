"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Calendar,
  MessageSquare,
  Paperclip,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send,
  ChevronDown,
  ChevronUp,
  Filter,
} from "lucide-react";

type TaskStatus = "Pending" | "In Progress" | "Completed";

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  uploadedAt: string;
  uploadedAtDisplay: string;
  deadline: string;
  status: TaskStatus;
  comments: Comment[];
  attachedFile?: string | null;
}

const statusConfig: Record<TaskStatus, { label: string; color: string; bg: string; border: string; icon: any }> = {
  Pending: {
    label: "Pending",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-400/30",
    icon: AlertCircle,
  },
  "In Progress": {
    label: "In Progress",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-400/30",
    icon: Loader2,
  },
  Completed: {
    label: "Completed",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-400/30",
    icon: CheckCircle2,
  },
};

const initialTasks: Task[] = [
  {
    id: "TASK-01",
    title: "Database Schema & API Foundation",
    description:
      "Designed PostgreSQL schemas for hospital cms and configured initial Express.js route controllers for real-time synchronization.",
    uploadedAt: "2026-07-15T10:00:00",
    uploadedAtDisplay: "15 July, 10:00 AM IST",
    deadline: "18 July, 6:00 PM IST",
    status: "Completed",
    comments: [
      {
        id: "c1",
        author: "Lead Architect",
        text: "Schemas look solid. Proceed with API route protection.",
        timestamp: "15 July, 02:00 PM",
      },
    ],
    attachedFile: "database_schema_v1.zip",
  },
  {
    id: "TASK-02",
    title: "Multilingual Chatbot Logic Integration",
    description:
      "Implemented bilingual fallback logic (Hindi/English) for automated client interaction and error handling.",
    uploadedAt: "2026-07-19T14:30:00",
    uploadedAtDisplay: "19 July, 2:30 PM IST",
    deadline: "21 July, 8:00 PM IST",
    status: "Completed",
    comments: [],
    attachedFile: null,
  },
  {
    id: "TASK-03",
    title: "Intern Portal Frontend & Authentication Flow",
    description:
      "Develop responsive Next.js dashboard, integrate routing state, and finalize glassmorphic dark-theme UI components.",
    uploadedAt: "2026-07-22T09:15:00",
    uploadedAtDisplay: "22 July, 9:15 AM IST",
    deadline: "24 July, Friday, 7:00 PM IST",
    status: "In Progress",
    comments: [],
    attachedFile: null,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const taskVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [activeDrawers, setActiveDrawers] = useState<Record<string, { attachment?: boolean; comment?: boolean }>>({});
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "All">("All");

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  const toggleDrawer = (taskId: string, drawer: "attachment" | "comment") => {
    setActiveDrawers((prev) => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        [drawer]: !prev[taskId]?.[drawer],
      },
    }));
  };

  const handleAddComment = (taskId: string) => {
    const text = commentInputs[taskId]?.trim();
    if (!text) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      author: "Yuragi (You)",
      text,
      timestamp: "Just now",
    };

    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, comments: [...t.comments, newComment] } : t
      )
    );
    setCommentInputs((prev) => ({ ...prev, [taskId]: "" }));
  };

  const handleFileUpload = (taskId: string, file: File | null) => {
    if (!file) return;
    if (!file.name.endsWith(".zip")) {
      alert("Only .zip files are allowed");
      return;
    }
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, attachedFile: file.name } : t
      )
    );
  };

  const filteredTasks = tasks
    .filter((t) => statusFilter === "All" || t.status === statusFilter)
    .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

  const filters: (TaskStatus | "All")[] = ["All", "Pending", "In Progress", "Completed"];

  return (
    <main className="page-shell">
      {/* Background Effects */}
      <div className="bg-glow-cyan fixed -top-40 -right-40 h-[500px] w-[500px] opacity-30" />
      <div className="bg-glow-blue fixed -bottom-40 -left-40 h-[500px] w-[500px] opacity-40" />

      <div className="relative z-10 p-6 md:p-8 max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#F8FAFC]">Assigned Tasks</h1>
            <p className="text-sm text-[#94A3B8] mt-1">Track your ongoing assignments and timelines</p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#F8FAFC] border border-[#2A3648] px-4 py-2.5 rounded-xl hover:border-cyan-400/30 transition-all duration-300"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center gap-3"
        >
          <Filter size={16} className="text-[#64748B]" />
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`text-xs font-semibold px-4 py-2 rounded-xl border transition-all duration-300 cursor-pointer ${
                statusFilter === f
                  ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                  : "bg-[#1A2233] text-[#94A3B8] border-[#2A3648] hover:text-[#F8FAFC] hover:border-[#64748B]"
              }`}
            >
              {f === "All" ? "All Tasks" : f}
            </button>
          ))}
        </motion.div>

        {/* Tasks List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {filteredTasks.length === 0 ? (
            <div className="text-center py-16">
              <CheckCircle2 size={48} className="mx-auto text-[#2A3648] mb-4" />
              <p className="text-[#94A3B8]">No tasks match the selected filter.</p>
            </div>
          ) : (
            filteredTasks.map((task) => {
              const status = statusConfig[task.status];
              const StatusIcon = status.icon;
              const isAttachmentOpen = activeDrawers[task.id]?.attachment ?? false;
              const isCommentOpen = activeDrawers[task.id]?.comment ?? false;

              return (
                <motion.div
                  key={task.id}
                  variants={taskVariants}
                  layout
                  className="portal-card p-6 md:p-8 overflow-hidden"
                >
                  {/* Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2A3648]/60 pb-5">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-400/10 px-3 py-1.5 rounded-lg border border-cyan-400/20">
                        {task.id}
                      </span>
                      <span className="text-xs text-[#64748B] flex items-center gap-1">
                        <Calendar size={12} />
                        {task.uploadedAtDisplay}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${status.bg} ${status.color} ${status.border} border`}>
                        <StatusIcon size={12} className={status.color === "text-amber-400" ? "animate-spin" : ""} />
                        {status.label}
                      </span>

                      <button
                        onClick={() => toggleDrawer(task.id, "attachment")}
                        className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition cursor-pointer ${
                          isAttachmentOpen || task.attachedFile
                            ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/30"
                            : "bg-[#111827] text-[#64748B] border-[#2A3648] hover:text-[#F8FAFC]"
                        }`}
                      >
                        <Paperclip size={12} className="inline mr-1" />
                        File {task.attachedFile ? "(1)" : ""}
                      </button>

                      <button
                        onClick={() => toggleDrawer(task.id, "comment")}
                        className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition cursor-pointer ${
                          isCommentOpen
                            ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/30"
                            : "bg-[#111827] text-[#64748B] border-[#2A3648] hover:text-[#F8FAFC]"
                        }`}
                      >
                        <MessageSquare size={12} className="inline mr-1" />
                        Query ({task.comments.length})
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col md:flex-row justify-between items-start gap-6 pt-5">
                    <div className="flex-1 space-y-2">
                      <h3 className="text-xl font-bold text-[#F8FAFC]">{task.title}</h3>
                      <p className="text-sm md:text-base text-[#CBD5E1] leading-relaxed">
                        {task.description}
                      </p>
                    </div>

                    {/* Status Update */}
                    <div className="shrink-0 w-full md:w-auto bg-[#111827] border border-[#2A3648] rounded-xl p-4">
                      <span className="block text-[10px] text-[#64748B] font-semibold uppercase tracking-wider mb-3">
                        Update Status
                      </span>
                      <div className="flex md:flex-col gap-2">
                        {(["Pending", "In Progress", "Completed"] as TaskStatus[]).map((st) => {
                          const sc = statusConfig[st];
                          return (
                            <label
                              key={st}
                              className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg border cursor-pointer transition-all duration-200 ${
                                task.status === st
                                  ? `${sc.bg} ${sc.color} ${sc.border}`
                                  : "text-[#64748B] border-transparent hover:text-[#CBD5E1] hover:bg-[#1A2233]"
                              }`}
                            >
                              <input
                                type="radio"
                                name={`status-${task.id}`}
                                value={st}
                                checked={task.status === st}
                                onChange={() => handleStatusChange(task.id, st)}
                                className="accent-cyan-500 cursor-pointer"
                              />
                              {st}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Deadline */}
                  <div className="mt-5 bg-[#111827] border border-[#2A3648] p-4 rounded-xl flex items-center justify-between">
                    <span className="text-xs text-[#64748B] flex items-center gap-1">
                      <Clock size={12} />
                      Due Date / Deadline:
                    </span>
                    <span className="text-xs font-semibold text-red-400 bg-red-500/10 border border-red-400/20 px-3 py-1.5 rounded-lg">
                      ⌛ {task.deadline}
                    </span>
                  </div>

                  {/* Attachment Drawer */}
                  <AnimatePresence>
                    {isAttachmentOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 bg-[#111827] border border-cyan-400/20 p-4 rounded-xl space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                              Upload ZIP File
                            </span>
                            {task.attachedFile && (
                              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                                ✓ {task.attachedFile}
                              </span>
                            )}
                          </div>
                          <input
                            type="file"
                            accept=".zip"
                            onChange={(e) => handleFileUpload(task.id, e.target.files?.[0] || null)}
                            className="block w-full text-xs text-[#CBD5E1] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#1A2233] file:text-cyan-400 hover:file:bg-[#2A3648] cursor-pointer"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Comment Drawer */}
                  <AnimatePresence>
                    {isCommentOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 bg-[#111827] border border-cyan-400/20 p-4 rounded-xl space-y-4">
                          <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                            Task Discussion ({task.comments.length})
                          </h4>

                          {task.comments.length > 0 ? (
                            <div className="space-y-2.5 max-h-40 overflow-y-auto pr-2">
                              {task.comments.map((c) => (
                                <div
                                  key={c.id}
                                  className="bg-[#1A2233] border border-[#2A3648] p-3 rounded-lg text-xs space-y-1"
                                >
                                  <div className="flex justify-between items-center">
                                    <span className="font-semibold text-[#F8FAFC]">{c.author}</span>
                                    <span className="text-[10px] text-[#64748B]">{c.timestamp}</span>
                                  </div>
                                  <p className="text-[#CBD5E1]">{c.text}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-[#64748B] italic">No queries yet. Start a discussion!</p>
                          )}

                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Ask a question or leave a comment..."
                              value={commentInputs[task.id] || ""}
                              onChange={(e) =>
                                setCommentInputs({ ...commentInputs, [task.id]: e.target.value })
                              }
                              onKeyDown={(e) => { if (e.key === "Enter") handleAddComment(task.id); }}
                              className="flex-1 bg-[#1A2233] border border-[#2A3648] text-xs text-[#F8FAFC] rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-cyan-500 transition-all placeholder:text-[#64748B]"
                            />
                            <button
                              onClick={() => handleAddComment(task.id)}
                              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer"
                            >
                              <Send size={14} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </motion.div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-[#2A3648]/50">
          <p className="text-xs text-[#64748B]">
            AD TECH Enterprises Pvt. Ltd. &mdash; Task Management
          </p>
        </div>
      </div>
    </main>
  );
}

