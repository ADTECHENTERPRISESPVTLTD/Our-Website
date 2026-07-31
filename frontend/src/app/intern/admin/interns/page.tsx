"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  MoreVertical,
  User,
  Plus,
  Send,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  Award,
  X,
  PlusCircle,
  Clock,
  Eye,
  CheckCircle
} from "lucide-react";
import api from "@/lib/api";

interface Intern {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  department: string;
  college: string;
  skills: string[];
  currentStatus: string;
  presenceStatus: string;
  lastActive: string;
  currentPage: string;
  lastLogin: string;
}

export default function InternManagement() {
  const [interns, setInterns] = useState<Intern[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter state
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");

  // Modals state
  const [activeModal, setActiveModal] = useState<"add" | "edit" | "profile" | "task" | "message" | null>(null);
  const [selectedIntern, setSelectedIntern] = useState<Intern | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Form states
  const [internForm, setInternForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
    department: "",
    college: "",
    skills: "",
    currentStatus: "Active",
  });

  const [taskForm, setTaskForm] = useState({
    taskTitle: "",
    description: "",
    priority: "Medium",
    deadline: "",
    category: "General",
  });

  const [messageForm, setMessageForm] = useState({
    subject: "",
    message: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const internRes = await api.get("/interns");
      const taskRes = await api.get("/tasks");
      const attendanceRes = await api.get("/attendance").catch(() => ({ data: { data: [] } }));

      setInterns(internRes.data.data || []);
      setTasks(taskRes.data.data || []);
      setAttendance(attendanceRes.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const computedTasksCount = (internId: string) => {
    return tasks.filter((t) => t.assignedIntern?._id === internId || t.assignedIntern === internId).length;
  };

  const computedPerformance = (internId: string) => {
    const internTasks = tasks.filter((t) => t.assignedIntern?._id === internId || t.assignedIntern === internId);
    if (internTasks.length === 0) return 100; // default to 100 if no tasks
    const completed = internTasks.filter((t) => t.currentStatus === "Completed").length;
    return Math.round((completed / internTasks.length) * 100);
  };

  const computedAttendance = (internId: string) => {
    const records = attendance.filter((a) => {
      const id = a.internId?._id || a.internId;
      return id === internId;
    });
    const presentDays = new Set(records.map((r) => new Date(r.date).toDateString())).size;
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    return daysInMonth > 0 ? Math.round((presentDays / daysInMonth) * 100) : 0;
  };

  // Actions
  const handleAddIntern = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/interns", {
        ...internForm,
        skills: internForm.skills.split(",").map((s) => s.trim()),
      });
      alert("Intern Added Successfully");
      setActiveModal(null);
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to add intern");
    }
  };

  const handleUpdateIntern = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIntern) return;
    try {
      await api.put(`/interns/${selectedIntern._id}`, {
        fullName: internForm.fullName,
        email: internForm.email,
        phoneNumber: internForm.phoneNumber,
        role: internForm.role,
        department: internForm.department,
        college: internForm.college,
        currentStatus: internForm.currentStatus,
      });
      alert("Intern Updated Successfully");
      setActiveModal(null);
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to update intern");
    }
  };

  const handleDeactivateIntern = async (internId: string) => {
    if (!confirm("Are you sure you want to deactivate this account?")) return;
    try {
      await api.put(`/interns/${internId}`, { currentStatus: "Inactive" });
      alert("Account Deactivated Successfully");
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to deactivate account");
    }
  };

  const handleAssignTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIntern) return;
    try {
      await api.post("/tasks", {
        ...taskForm,
        assignedIntern: selectedIntern._id,
      });
      alert("Task Assigned Successfully");
      setActiveModal(null);
      setTaskForm({ taskTitle: "", description: "", priority: "Medium", deadline: "", category: "General" });
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to assign task");
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIntern) return;
    try {
      await api.post("/messages", {
        receiverId: selectedIntern._id,
        subject: messageForm.subject,
        message: messageForm.message,
      });
      alert("Message Sent Successfully!");
      setActiveModal(null);
      setMessageForm({ subject: "", message: "" });
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to send message");
    }
  };

  // Filter & Search Logic
  const filteredInterns = interns.filter((intern) => {
    const matchesSearch =
      intern.fullName.toLowerCase().includes(search.toLowerCase()) ||
      intern.email.toLowerCase().includes(search.toLowerCase()) ||
      intern.role.toLowerCase().includes(search.toLowerCase());

    const matchesDept = deptFilter === "All" || intern.department === deptFilter;
    const matchesStatus = statusFilter === "All" || intern.currentStatus === statusFilter;
    const matchesRole = roleFilter === "All" || intern.role === roleFilter;

    return matchesSearch && matchesDept && matchesStatus && matchesRole;
  });

  const departments = ["All", ...Array.from(new Set(interns.map((i) => i.department)))];
  const roles = ["All", ...Array.from(new Set(interns.map((i) => i.role)))];

  if (loading) {
    return <div className="text-center py-20 text-white text-xl">Loading Interns...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Intern Directory</h1>
          <p className="text-sm text-slate-400 mt-1">Manage, verify, and view real-time presence of interns.</p>
        </div>
        <button
          onClick={() => {
            setInternForm({
              fullName: "",
              email: "",
              password: "",
              phoneNumber: "",
              role: "",
              department: "",
              college: "",
              skills: "",
              currentStatus: "Active",
            });
            setActiveModal("add");
          }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-md cursor-pointer"
        >
          <Plus size={18} />
          Add Intern
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="portal-card p-4 bg-slate-900/40 border border-[#1e293b]/70 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search by name, email, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0b1120] border border-[#2a3648] text-white pl-11 pr-4 py-2.5 rounded-xl text-sm outline-none focus:border-cyan-500 transition"
          />
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="bg-[#0b1120] border border-[#2a3648] text-white px-3 py-2.5 rounded-xl text-xs outline-none cursor-pointer"
          >
            <option value="All">All Departments</option>
            {departments.filter(d => d !== "All").map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-[#0b1120] border border-[#2a3648] text-white px-3 py-2.5 rounded-xl text-xs outline-none cursor-pointer"
          >
            <option value="All">All Roles</option>
            {roles.filter(r => r !== "All").map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#0b1120] border border-[#2a3648] text-white px-3 py-2.5 rounded-xl text-xs outline-none cursor-pointer"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Interns Table / Grid */}
      <div className="portal-card bg-slate-900/30 border border-[#1e293b]/70 overflow-hidden rounded-2xl">
        
        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0d1527]/80 border-b border-[#1e293b] text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="p-4">Name</th>
                <th className="p-4">Department & Role</th>
                <th className="p-4">Presence</th>
                <th className="p-4 text-center">Tasks</th>
                <th className="p-4 text-center">Attendance %</th>
                <th className="p-4 text-center">Performance %</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]/50 text-sm text-slate-200">
              {filteredInterns.map((intern) => {
                const isOnline = intern.presenceStatus === "Online";
                const isIdle = intern.presenceStatus === "Idle";
                const taskCount = computedTasksCount(intern._id);
                const perf = computedPerformance(intern._id);
                const att = computedAttendance(intern._id);

                return (
                  <tr key={intern._id} className="hover:bg-[#111827]/40 transition duration-150">
                    <td className="p-4 flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-[#1e293b] border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-xs uppercase">
                        {intern.fullName.substring(0, 2)}
                      </div>
                      <div>
                        <p className="font-bold text-white">{intern.fullName}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{intern.email}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-slate-300">{intern.role}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{intern.department}</p>
                    </td>
                    <td className="p-4">
                      <span className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${
                          isOnline ? "bg-emerald-500 animate-pulse" : isIdle ? "bg-amber-500" : "bg-slate-600"
                        }`} />
                        <span className="text-xs font-semibold text-slate-300">
                          {intern.presenceStatus || "Offline"}
                        </span>
                      </span>
                    </td>
                    <td className="p-4 text-center font-mono font-bold text-cyan-400">{taskCount}</td>
                    <td className="p-4 text-center font-bold text-emerald-400">{att}%</td>
                    <td className="p-4 text-center font-bold text-blue-400">{perf}%</td>
                    <td className="p-4 text-center relative">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedIntern(intern);
                            setInternForm({
                              fullName: intern.fullName,
                              email: intern.email,
                              password: "",
                              phoneNumber: intern.phoneNumber,
                              role: intern.role,
                              department: intern.department,
                              college: intern.college,
                              skills: intern.skills ? intern.skills.join(",") : "",
                              currentStatus: intern.currentStatus,
                            });
                            setActiveModal("edit");
                          }}
                          className="p-1.5 hover:bg-[#1e293b] rounded-lg text-amber-400 hover:text-amber-300 transition cursor-pointer"
                          title="Edit Details"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setSelectedIntern(intern);
                            setActiveModal("profile");
                          }}
                          className="p-1.5 hover:bg-[#1e293b] rounded-lg text-cyan-400 hover:text-cyan-300 transition cursor-pointer"
                          title="View Profile"
                        >
                          Profile
                        </button>
                        <button
                          onClick={() => {
                            setSelectedIntern(intern);
                            setActiveModal("task");
                          }}
                          className="p-1.5 hover:bg-[#1e293b] rounded-lg text-emerald-400 hover:text-emerald-300 transition cursor-pointer"
                          title="Assign Task"
                        >
                          Task
                        </button>
                        <button
                          onClick={() => {
                            setSelectedIntern(intern);
                            setActiveModal("message");
                          }}
                          className="p-1.5 hover:bg-[#1e293b] rounded-lg text-purple-400 hover:text-purple-300 transition cursor-pointer"
                          title="Send Message"
                        >
                          Msg
                        </button>
                        {intern.currentStatus === "Active" && (
                          <button
                            onClick={() => handleDeactivateIntern(intern._id)}
                            className="p-1.5 hover:bg-[#1e293b] rounded-lg text-red-500 hover:text-red-400 transition cursor-pointer"
                            title="Deactivate Account"
                          >
                            Deac
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="block md:hidden p-4 space-y-4">
          {filteredInterns.map((intern) => {
            const isOnline = intern.presenceStatus === "Online";
            const isIdle = intern.presenceStatus === "Idle";
            const taskCount = computedTasksCount(intern._id);
            const perf = computedPerformance(intern._id);
            const att = computedAttendance(intern._id);

            return (
              <div key={intern._id} className="p-4 rounded-xl bg-[#0b1120] border border-[#1e293b] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#1e293b] border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold uppercase">
                    {intern.fullName.substring(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{intern.fullName}</h3>
                    <p className="text-xs text-slate-400">{intern.role} &bull; {intern.department}</p>
                  </div>
                  <span className={`ml-auto w-2.5 h-2.5 rounded-full ${
                    isOnline ? "bg-emerald-500" : isIdle ? "bg-amber-500" : "bg-slate-600"
                  }`} />
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs py-2 border-y border-[#1e293b]/50">
                  <div>
                    <p className="text-slate-500 uppercase tracking-wider text-[9px] font-bold">Tasks</p>
                    <p className="text-sm font-bold text-cyan-400 mt-0.5">{taskCount}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 uppercase tracking-wider text-[9px] font-bold">Attendance</p>
                    <p className="text-sm font-bold text-emerald-400 mt-0.5">{att}%</p>
                  </div>
                  <div>
                    <p className="text-slate-500 uppercase tracking-wider text-[9px] font-bold">Performance</p>
                    <p className="text-sm font-bold text-blue-400 mt-0.5">{perf}%</p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    onClick={() => {
                      setSelectedIntern(intern);
                      setActiveModal("profile");
                    }}
                    className="flex-1 bg-[#1e293b] py-2 rounded-lg text-xs font-semibold text-slate-200 cursor-pointer"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      setSelectedIntern(intern);
                      setActiveModal("task");
                    }}
                    className="flex-1 bg-emerald-600/20 text-emerald-300 py-2 rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Task
                  </button>
                  <button
                    onClick={() => {
                      setSelectedIntern(intern);
                      setActiveModal("message");
                    }}
                    className="flex-1 bg-purple-600/20 text-purple-300 py-2 rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Message
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredInterns.length === 0 && (
          <p className="text-sm text-slate-500 text-center py-10">No matching interns found.</p>
        )}
      </div>

      {/* MODALS */}
      <AnimatePresence>
        {activeModal && selectedIntern && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0f172a] border border-[#1e293b] rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 bg-[#0d1527] border-b border-[#1e293b] flex items-center justify-between">
                <h3 className="font-bold text-white text-lg">
                  {activeModal === "profile" && "Intern Profile Card"}
                  {activeModal === "task" && `Assign Task to ${selectedIntern.fullName}`}
                  {activeModal === "message" && `Send Message to ${selectedIntern.fullName}`}
                </h3>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-[#1e293b] cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto max-h-[75vh]">
                {activeModal === "profile" && (
                  <div className="space-y-6">
                    {/* Upper */}
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0b1120] border border-[#1e293b]">
                      <div className="h-16 w-16 rounded-full bg-[#1e293b] border-2 border-cyan-400/40 flex items-center justify-center text-cyan-400 text-2xl font-bold uppercase">
                        {selectedIntern.fullName.substring(0, 2)}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">{selectedIntern.fullName}</h4>
                        <p className="text-sm text-slate-400">{selectedIntern.role} &bull; {selectedIntern.department}</p>
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full mt-2 ${
                          selectedIntern.currentStatus === "Active" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
                        }`}>
                          {selectedIntern.currentStatus}
                        </span>
                      </div>
                    </div>

                    {/* Contacts info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-[#0b1120]/40 border border-[#1e293b]/70 rounded-xl flex items-center gap-3">
                        <Mail size={16} className="text-cyan-400 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-[10px] text-slate-500 font-bold uppercase">Email</p>
                          <p className="text-xs text-slate-200 truncate">{selectedIntern.email}</p>
                        </div>
                      </div>
                      <div className="p-3 bg-[#0b1120]/40 border border-[#1e293b]/70 rounded-xl flex items-center gap-3">
                        <Phone size={16} className="text-cyan-400 shrink-0" />
                        <div>
                          <p className="text-[10px] text-slate-500 font-bold uppercase">Phone</p>
                          <p className="text-xs text-slate-200">{selectedIntern.phoneNumber}</p>
                        </div>
                      </div>
                      <div className="p-3 bg-[#0b1120]/40 border border-[#1e293b]/70 rounded-xl flex items-center gap-3">
                        <Briefcase size={16} className="text-cyan-400 shrink-0" />
                        <div>
                          <p className="text-[10px] text-slate-500 font-bold uppercase">College</p>
                          <p className="text-xs text-slate-200">{selectedIntern.college}</p>
                        </div>
                      </div>
                      <div className="p-3 bg-[#0b1120]/40 border border-[#1e293b]/70 rounded-xl flex items-center gap-3">
                        <Calendar size={16} className="text-cyan-400 shrink-0" />
                        <div>
                          <p className="text-[10px] text-slate-500 font-bold uppercase">Last Login</p>
                          <p className="text-xs text-slate-200">
                            {selectedIntern.lastLogin ? new Date(selectedIntern.lastLogin).toLocaleString() : "Never"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Stats metrics */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-4 bg-slate-900 border border-[#1e293b] rounded-xl text-center">
                        <p className="text-[10px] text-slate-500 font-bold uppercase">Tasks Assigned</p>
                        <p className="text-2xl font-bold text-cyan-400 mt-1">{computedTasksCount(selectedIntern._id)}</p>
                      </div>
                      <div className="p-4 bg-slate-900 border border-[#1e293b] rounded-xl text-center">
                        <p className="text-[10px] text-slate-500 font-bold uppercase">Attendance %</p>
                        <p className="text-2xl font-bold text-emerald-400 mt-1">{computedAttendance(selectedIntern._id)}%</p>
                      </div>
                      <div className="p-4 bg-slate-900 border border-[#1e293b] rounded-xl text-center">
                        <p className="text-[10px] text-slate-500 font-bold uppercase">Performance %</p>
                        <p className="text-2xl font-bold text-blue-400 mt-1">{computedPerformance(selectedIntern._id)}%</p>
                      </div>
                    </div>

                    {/* Skills list */}
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Skills / Expertise</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedIntern.skills ? selectedIntern.skills.map((s) => (
                          <span key={s} className="text-xs bg-[#111827] border border-[#2a3648] text-slate-300 px-3 py-1 rounded-full">
                            {s}
                          </span>
                        )) : <span className="text-xs text-slate-500">None specified</span>}
                      </div>
                    </div>
                  </div>
                )}

                {activeModal === "task" && (
                  <form onSubmit={handleAssignTask} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Task Title</label>
                      <input
                        type="text"
                        required
                        value={taskForm.taskTitle}
                        onChange={(e) => setTaskForm({ ...taskForm, taskTitle: e.target.value })}
                        placeholder="e.g. Develop Next.js Admin Analytics"
                        className="w-full bg-[#0b1120] border border-[#2a3648] text-white px-4 py-2.5 rounded-xl text-sm outline-none focus:border-cyan-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Description</label>
                      <textarea
                        required
                        rows={4}
                        value={taskForm.description}
                        onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                        placeholder="Explain the tasks requirements..."
                        className="w-full bg-[#0b1120] border border-[#2a3648] text-white px-4 py-2.5 rounded-xl text-sm outline-none focus:border-cyan-500 transition resize-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Priority</label>
                        <select
                          value={taskForm.priority}
                          onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                          className="w-full bg-[#0b1120] border border-[#2a3648] text-white px-4 py-2.5 rounded-xl text-sm outline-none cursor-pointer"
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Category</label>
                        <input
                          type="text"
                          required
                          value={taskForm.category}
                          onChange={(e) => setTaskForm({ ...taskForm, category: e.target.value })}
                          placeholder="e.g. Frontend, Design"
                          className="w-full bg-[#0b1120] border border-[#2a3648] text-white px-4 py-2.5 rounded-xl text-sm outline-none focus:border-cyan-500 transition"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Deadline</label>
                      <input
                        type="date"
                        required
                        value={taskForm.deadline}
                        onChange={(e) => setTaskForm({ ...taskForm, deadline: e.target.value })}
                        className="w-full bg-[#0b1120] border border-[#2a3648] text-white px-4 py-2.5 rounded-xl text-sm outline-none cursor-pointer"
                      />
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-[#1e293b]/70">
                      <button
                        type="button"
                        onClick={() => setActiveModal(null)}
                        className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-sm font-semibold hover:bg-slate-700 transition cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-sm font-semibold shadow-md transition cursor-pointer"
                      >
                        Assign Task
                      </button>
                    </div>
                  </form>
                )}

                {activeModal === "message" && (
                  <form onSubmit={handleSendMessage} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Subject</label>
                      <input
                        type="text"
                        required
                        value={messageForm.subject}
                        onChange={(e) => setMessageForm({ ...messageForm, subject: e.target.value })}
                        placeholder="Message Subject..."
                        className="w-full bg-[#0b1120] border border-[#2a3648] text-white px-4 py-2.5 rounded-xl text-sm outline-none focus:border-cyan-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Message Body</label>
                      <textarea
                        required
                        rows={5}
                        value={messageForm.message}
                        onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                        placeholder="Write your quick message here..."
                        className="w-full bg-[#0b1120] border border-[#2a3648] text-white px-4 py-2.5 rounded-xl text-sm outline-none focus:border-cyan-500 transition resize-none"
                      />
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-[#1e293b]/70">
                      <button
                        type="button"
                        onClick={() => setActiveModal(null)}
                        className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-sm font-semibold hover:bg-slate-700 transition cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-sm font-semibold shadow-md transition cursor-pointer"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {activeModal === "add" && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0f172a] border border-[#1e293b] rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl"
            >
              <div className="px-6 py-4 bg-[#0d1527] border-b border-[#1e293b] flex items-center justify-between">
                <h3 className="font-bold text-white text-lg">Add New Intern</h3>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-[#1e293b] cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAddIntern} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      value={internForm.fullName}
                      onChange={(e) => setFormState("fullName", e.target.value)}
                      className="w-full bg-[#0b1120] border border-[#2a3648] text-white px-4 py-2 rounded-xl text-sm outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      value={internForm.email}
                      onChange={(e) => setFormState("email", e.target.value)}
                      className="w-full bg-[#0b1120] border border-[#2a3648] text-white px-4 py-2 rounded-xl text-sm outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Password</label>
                    <input
                      type="password"
                      required
                      value={internForm.password}
                      onChange={(e) => setFormState("password", e.target.value)}
                      className="w-full bg-[#0b1120] border border-[#2a3648] text-white px-4 py-2 rounded-xl text-sm outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Phone Number</label>
                    <input
                      type="text"
                      required
                      value={internForm.phoneNumber}
                      onChange={(e) => setFormState("phoneNumber", e.target.value)}
                      className="w-full bg-[#0b1120] border border-[#2a3648] text-white px-4 py-2 rounded-xl text-sm outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Role</label>
                    <input
                      type="text"
                      required
                      value={internForm.role}
                      onChange={(e) => setFormState("role", e.target.value)}
                      placeholder="e.g. Frontend Developer"
                      className="w-full bg-[#0b1120] border border-[#2a3648] text-white px-4 py-2 rounded-xl text-sm outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Department</label>
                    <input
                      type="text"
                      required
                      value={internForm.department}
                      onChange={(e) => setFormState("department", e.target.value)}
                      placeholder="e.g. Engineering"
                      className="w-full bg-[#0b1120] border border-[#2a3648] text-white px-4 py-2 rounded-xl text-sm outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-2">College</label>
                  <input
                    type="text"
                    required
                    value={internForm.college}
                    onChange={(e) => setFormState("college", e.target.value)}
                    className="w-full bg-[#0b1120] border border-[#2a3648] text-white px-4 py-2 rounded-xl text-sm outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Skills (React, Node, etc.)</label>
                  <input
                    type="text"
                    required
                    value={internForm.skills}
                    onChange={(e) => setFormState("skills", e.target.value)}
                    placeholder="Comma-separated values"
                    className="w-full bg-[#0b1120] border border-[#2a3648] text-white px-4 py-2 rounded-xl text-sm outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-[#1e293b]">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-sm font-semibold hover:bg-slate-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-sm font-semibold shadow-md transition"
                  >
                    Save Intern
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {activeModal === "edit" && selectedIntern && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0f172a] border border-[#1e293b] rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl"
            >
              <div className="px-6 py-4 bg-[#0d1527] border-b border-[#1e293b] flex items-center justify-between">
                <h3 className="font-bold text-white text-lg">Edit Intern Details</h3>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-[#1e293b] cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleUpdateIntern} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      value={internForm.fullName}
                      onChange={(e) => setFormState("fullName", e.target.value)}
                      className="w-full bg-[#0b1120] border border-[#2a3648] text-white px-4 py-2 rounded-xl text-sm outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      value={internForm.email}
                      onChange={(e) => setFormState("email", e.target.value)}
                      className="w-full bg-[#0b1120] border border-[#2a3648] text-white px-4 py-2 rounded-xl text-sm outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Phone Number</label>
                    <input
                      type="text"
                      required
                      value={internForm.phoneNumber}
                      onChange={(e) => setFormState("phoneNumber", e.target.value)}
                      className="w-full bg-[#0b1120] border border-[#2a3648] text-white px-4 py-2 rounded-xl text-sm outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-2">College</label>
                    <input
                      type="text"
                      required
                      value={internForm.college}
                      onChange={(e) => setFormState("college", e.target.value)}
                      className="w-full bg-[#0b1120] border border-[#2a3648] text-white px-4 py-2 rounded-xl text-sm outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Role</label>
                    <input
                      type="text"
                      required
                      value={internForm.role}
                      onChange={(e) => setFormState("role", e.target.value)}
                      className="w-full bg-[#0b1120] border border-[#2a3648] text-white px-4 py-2 rounded-xl text-sm outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Department</label>
                    <input
                      type="text"
                      required
                      value={internForm.department}
                      onChange={(e) => setFormState("department", e.target.value)}
                      className="w-full bg-[#0b1120] border border-[#2a3648] text-white px-4 py-2 rounded-xl text-sm outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Current Status</label>
                  <select
                    value={internForm.currentStatus}
                    onChange={(e) => setFormState("currentStatus", e.target.value)}
                    className="w-full bg-[#0b1120] border border-[#2a3648] text-white px-4 py-2 rounded-xl text-sm outline-none cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-[#1e293b]">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-sm font-semibold hover:bg-slate-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-sm font-semibold shadow-md transition"
                  >
                    Update Intern
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );

  function setFormState(field: string, value: string) {
    setInternForm((prev) => ({ ...prev, [field]: value }));
  }
}