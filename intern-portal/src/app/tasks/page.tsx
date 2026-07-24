"use client";

import React, { useState } from "react";
import Link from "next/link";

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

const statusStyles: Record<TaskStatus, string> = {
  Pending: "text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/30",
  "In Progress": "text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/30",
  Completed: "text-[#10B981] bg-[#10B981]/10 border-[#10B981]/30",
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

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  
  const [activeAttachmentDrawer, setActiveAttachmentDrawer] = useState<Record<string, boolean>>({});
  const [activeCommentDrawer, setActiveCommentDrawer] = useState<Record<string, boolean>>({});

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  const toggleAttachmentDrawer = (taskId: string) => {
    setActiveAttachmentDrawer((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const toggleCommentDrawer = (taskId: string) => {
    setActiveCommentDrawer((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
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
      alert("Kripya sirf .zip file hi upload karein!");
      return;
    }

    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, attachedFile: file.name } : t
      )
    );
  };

  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
  );

  return (
    <div className="min-h-screen bg-[#0B1120] text-[#F8FAFC] p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#2A3648] pb-5">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
            Assigned Tasks
          </h1>
          <p className="text-sm text-[#94A3B8] mt-2">
            Track your ongoing assignments and timelines.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="text-sm font-semibold text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#64748B] border border-[#2A3648] px-4 py-2 rounded-xl transition duration-200 bg-[#111827]"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Tasks List */}
      <div className="space-y-8">
        {sortedTasks.map((task) => {
          const isAttachmentOpen = !!activeAttachmentDrawer[task.id];
          const isCommentOpen = !!activeCommentDrawer[task.id];

          return (
            <div
              key={task.id}
              className="bg-[#1A2233] border border-[#2A3648] p-7 rounded-2xl space-y-6 shadow-xl hover:border-[#3B82F6]/50 transition duration-300"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2A3648]/60 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-[#3B82F6] bg-[#3B82F6]/10 px-2.5 py-1 rounded-md border border-[#3B82F6]/20">
                    {task.id}
                  </span>
                  <span className="text-xs text-[#94A3B8] font-medium">
                    Uploaded: <span className="text-[#CBD5E1]">{task.uploadedAtDisplay}</span>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-3 py-1 rounded-full border font-semibold tracking-wide flex items-center gap-1.5 ${statusStyles[task.status]}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                    {task.status}
                  </span>

                  <button
                    onClick={() => toggleAttachmentDrawer(task.id)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition cursor-pointer ${
                      isAttachmentOpen || task.attachedFile
                        ? "bg-[#3B82F6]/20 text-[#3B82F6] border-[#3B82F6]/40"
                        : "bg-[#111827] text-[#94A3B8] border-[#2A3648] hover:text-[#F8FAFC]"
                    }`}
                  >
                    📎 File {task.attachedFile ? "(1)" : ""}
                  </button>

                  <button
                    onClick={() => toggleCommentDrawer(task.id)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition cursor-pointer ${
                      isCommentOpen
                        ? "bg-[#3B82F6]/20 text-[#3B82F6] border-[#3B82F6]/40"
                        : "bg-[#111827] text-[#94A3B8] border-[#2A3648] hover:text-[#F8FAFC]"
                    }`}
                  >
                    💬 Query ({task.comments.length})
                  </button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="space-y-2 flex-1">
                  <h3 className="text-xl font-bold text-[#F8FAFC] tracking-wide">
                    {task.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#CBD5E1] leading-relaxed">
                    {task.description}
                  </p>
                </div>

                <div className="space-y-2 shrink-0 min-w-[140px] pt-1">
                  <span className="block text-[11px] text-[#94A3B8] font-semibold uppercase tracking-wider mb-2">
                    Update Status:
                  </span>
                  {(["Pending", "In Progress", "Completed"] as TaskStatus[]).map(
                    (st) => (
                      <label
                        key={st}
                        className="flex items-center gap-2 text-xs text-[#CBD5E1] hover:text-[#F8FAFC] cursor-pointer transition-colors"
                      >
                        <input
                          type="radio"
                          name={`status-${task.id}`}
                          value={st}
                          checked={task.status === st}
                          onChange={() => handleStatusChange(task.id, st)}
                          className="accent-[#3B82F6] cursor-pointer"
                        />
                        <span className={task.status === st ? "font-semibold text-[#F8FAFC]" : ""}>
                          {st}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>

              <div className="bg-[#111827] border border-[#2A3648] p-3.5 rounded-xl flex items-center justify-between text-xs md:text-sm">
                <span className="text-[#94A3B8] font-medium">Due Date / Deadline:</span>
                <span className="text-[#EF4444] font-semibold bg-[#EF4444]/10 border border-[#EF4444]/20 px-3 py-1 rounded-lg">
                  ⌛ {task.deadline}
                </span>
              </div>

              {isAttachmentOpen && (
                <div className="bg-[#111827] border border-[#3B82F6]/30 p-4 rounded-xl space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-[#3B82F6] uppercase tracking-wider">
                      Upload ZIP
                    </span>
                    {task.attachedFile && (
                      <span className="text-xs text-[#10B981] font-mono flex items-center gap-1">
                        ✓ File: {task.attachedFile}
                      </span>
                    )}
                  </div>

                  <input
                    type="file"
                    accept=".zip"
                    onChange={(e) =>
                      handleFileUpload(
                        task.id,
                        e.target.files ? e.target.files[0] : null
                      )
                    }
                    className="block w-full text-xs text-[#CBD5E1] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#1A2233] file:text-[#3B82F6] hover:file:bg-[#2A3648] cursor-pointer"
                  />
                </div>
              )}

              {isCommentOpen && (
                <div className="bg-[#111827] border border-[#3B82F6]/30 p-4 rounded-xl space-y-4">
                  <h4 className="text-xs font-semibold text-[#3B82F6] uppercase tracking-wider">
                    Task Discussion & Queries ({task.comments.length})
                  </h4>

                  {task.comments.length > 0 ? (
                    <div className="space-y-2.5 max-h-40 overflow-y-auto pr-2">
                      {task.comments.map((c) => (
                        <div
                          key={c.id}
                          className="bg-[#1A2233] border border-[#2A3648] p-3 rounded-lg text-xs space-y-1"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-[#F8FAFC]">
                              {c.author}
                            </span>
                            <span className="text-[10px] text-[#64748B]">
                              {c.timestamp}
                            </span>
                          </div>
                          <p className="text-[#CBD5E1]">{c.text}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[#64748B] italic">
                      No queries yet. Ask a question below!
                    </p>
                  )}

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ask a question or comment about this task..."
                      value={commentInputs[task.id] || ""}
                      onChange={(e) =>
                        setCommentInputs({
                          ...commentInputs,
                          [task.id]: e.target.value,
                        })
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleAddComment(task.id);
                      }}
                      className="flex-1 bg-[#1A2233] border border-[#2A3648] text-xs text-[#F8FAFC] rounded-lg px-3.5 py-2 focus:outline-none focus:border-[#3B82F6]"
                    />
                    <button
                      onClick={() => handleAddComment(task.id)}
                      className="bg-[#3B82F6] text-[#F8FAFC] text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#2563EB] transition cursor-pointer"
                    >
                      Post
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}