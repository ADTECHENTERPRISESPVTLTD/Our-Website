"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  UserCheck,
  Calendar,
  AlertCircle,
  X,
  AlertTriangle
} from "lucide-react";
import api from "@/lib/api";

interface Task {
  _id: string;
  taskCode: string;
  taskTitle: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  deadline: string;
  currentStatus: "Pending" | "In Progress" | "Completed";
  category: string;
  assignedIntern?: {
    _id: string;
    fullName: string;
    email: string;
  };
}

export default function AdminTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [interns, setInterns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filters
  const [search, setSearch] = useState("");
  const [internFilter, setInternFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  // Modals
  const [activeModal, setActiveModal] = useState<"create" | "edit" | "reassign" | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Form states
  const [taskForm, setTaskForm] = useState({
    taskTitle: "",
    description: "",
    priority: "Medium",
    deadline: "",
    category: "General",
    assignedIntern: "",
  });

  const [reassignInternId, setReassignInternId] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const taskRes = await api.get("/tasks");
      const internRes = await api.get("/interns");
      setTasks(taskRes.data.data || []);
      setInterns(internRes.data.data || []);
    } catch (error) {
      console.error("Error fetching tasks page data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handlers
  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/tasks", taskForm);
      alert("Task Created Successfully!");
      setActiveModal(null);
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to create task");
    }
  };

  const handleUpdateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTask) return;
    try {
      await api.put(`/tasks/${selectedTask._id}`, {
        taskTitle: taskForm.taskTitle,
        description: taskForm.description,
        priority: taskForm.priority,
        deadline: taskForm.deadline,
        category: taskForm.category,
      });
      alert("Task Updated Successfully!");
      setActiveModal(null);
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to update task");
    }
  };

  const handleReassignTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTask) return;
    try {
      await api.put(`/tasks/${selectedTask._id}`, { assignedIntern: reassignInternId });
      alert("Task Reassigned Successfully!");
      setActiveModal(null);
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to reassign task");
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/tasks/${taskId}`);
      alert("Task Deleted Successfully!");
      fetchData();
    } catch (err: any) {
      alert("Failed to delete task");
    }
  };

  const handleMarkCompleted = async (taskId: string) => {
    try {
      await api.put(`/tasks/${taskId}`, { currentStatus: "Completed" });
      alert("Task Marked Completed!");
      fetchData();
    } catch (err: any) {
      alert("Failed to update status");
    }
  };

  // Filtered list
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.taskTitle.toLowerCase().includes(search.toLowerCase()) ||
      task.taskCode.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());

    const matchesIntern = internFilter === "All" || task.assignedIntern?._id === internFilter;
    const matchesStatus = statusFilter === "All" || task.currentStatus === statusFilter;
    const matchesPriority = priorityFilter === "All" || task.priority === priorityFilter;

    return matchesSearch && matchesIntern && matchesStatus && matchesPriority;
  });

  if (loading) {
    return <div className="text-center py-20 text-white text-xl">Loading Task Management...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Task Management</h1>
          <p className="text-sm text-slate-400 mt-1">Assign, track status, edit, and reassign tasks for all interns.</p>
        </div>
        <button
          onClick={() => {
            setTaskForm({
              taskTitle: "",
              description: "",
              priority: "Medium",
              deadline: "",
              category: "General",
              assignedIntern: interns[0]?._id || "",
            });
            setActiveModal("create");
          }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-md cursor-pointer"
        >
          <Plus size={18} />
          Create Task
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="portal-card p-4 bg-slate-900/40 border border-[#1e293b]/70 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search by code, title, description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0b1120] border border-[#2a3648] text-white pl-11 pr-4 py-2.5 rounded-xl text-sm outline-none focus:border-cyan-500 transition"
          />
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
          <select
            value={internFilter}
            onChange={(e) => setInternFilter(e.target.value)}
            className="bg-[#0b1120] border border-[#2a3648] text-white px-3 py-2.5 rounded-xl text-xs outline-none cursor-pointer"
          >
            <option value="All">All Interns</option>
            {interns.map(i => (
              <option key={i._id} value={i._id}>{i.fullName}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#0b1120] border border-[#2a3648] text-white px-3 py-2.5 rounded-xl text-xs outline-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-[#0b1120] border border-[#2a3648] text-white px-3 py-2.5 rounded-xl text-xs outline-none cursor-pointer"
          >
            <option value="All">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {/* Task table / cards */}
      <div className="portal-card bg-slate-900/30 border border-[#1e293b]/70 overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0d1527]/80 border-b border-[#1e293b] text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="p-4">Code</th>
                <th className="p-4">Title & Category</th>
                <th className="p-4">Assigned Intern</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Deadline</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]/50 text-sm text-slate-200">
              {filteredTasks.map((task) => {
                const colors = {
                  Completed: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
                  "In Progress": "bg-amber-500/10 text-amber-400 border border-amber-500/20",
                  Pending: "bg-red-500/10 text-red-400 border border-red-500/20",
                }[task.currentStatus];

                const priorityColors = {
                  Low: "text-slate-400 bg-slate-400/10 border border-slate-400/20",
                  Medium: "text-blue-400 bg-blue-400/10 border border-blue-400/20",
                  High: "text-rose-400 bg-rose-400/10 border border-rose-400/20",
                }[task.priority];

                return (
                  <tr key={task._id} className="hover:bg-[#111827]/40 transition duration-150">
                    <td className="p-4 font-mono text-xs text-cyan-400 font-bold">{task.taskCode}</td>
                    <td className="p-4">
                      <p className="font-bold text-white">{task.taskTitle}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{task.category || "General"}</p>
                    </td>
                    <td className="p-4">
                      {task.assignedIntern ? (
                        <div>
                          <p className="font-semibold text-slate-300">{task.assignedIntern.fullName}</p>
                          <p className="text-xs text-slate-500">{task.assignedIntern.email}</p>
                        </div>
                      ) : (
                        <span className="text-slate-500 italic">Not Assigned</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${priorityColors}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="p-4 text-slate-300 text-xs">
                      {new Date(task.deadline).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="p-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors}`}>
                        {task.currentStatus}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {task.currentStatus !== "Completed" && (
                          <button
                            onClick={() => handleMarkCompleted(task._id)}
                            className="p-1.5 hover:bg-[#1e293b] rounded-lg text-emerald-400 hover:text-emerald-300 transition cursor-pointer"
                            title="Mark Completed"
                          >
                            <CheckCircle size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setSelectedTask(task);
                            setTaskForm({
                              taskTitle: task.taskTitle,
                              description: task.description,
                              priority: task.priority,
                              deadline: task.deadline ? task.deadline.substring(0, 10) : "",
                              category: task.category || "General",
                              assignedIntern: task.assignedIntern?._id || "",
                            });
                            setActiveModal("edit");
                          }}
                          className="p-1.5 hover:bg-[#1e293b] rounded-lg text-cyan-400 hover:text-cyan-300 transition cursor-pointer"
                          title="Edit Task"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedTask(task);
                            setReassignInternId(task.assignedIntern?._id || "");
                            setActiveModal("reassign");
                          }}
                          className="p-1.5 hover:bg-[#1e293b] rounded-lg text-purple-400 hover:text-purple-300 transition cursor-pointer"
                          title="Reassign Intern"
                        >
                          <UserCheck size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task._id)}
                          className="p-1.5 hover:bg-[#1e293b] rounded-lg text-red-500 hover:text-red-400 transition cursor-pointer"
                          title="Delete Task"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredTasks.length === 0 && (
          <p className="text-sm text-slate-500 text-center py-10">No tasks found.</p>
        )}
      </div>

      {/* CREATE / EDIT / REASSIGN MODALS */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0f172a] border border-[#1e293b] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
            >
              <div className="px-6 py-4 bg-[#0d1527] border-b border-[#1e293b] flex items-center justify-between">
                <h3 className="font-bold text-white text-lg">
                  {activeModal === "create" && "Create & Assign Task"}
                  {activeModal === "edit" && "Edit Task Details"}
                  {activeModal === "reassign" && "Reassign Task"}
                </h3>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-[#1e293b] cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6">
                {activeModal === "reassign" && selectedTask && (
                  <form onSubmit={handleReassignTask} className="space-y-4">
                    <div>
                      <p className="text-sm text-slate-300 mb-4">
                        Reassign <span className="text-cyan-400 font-bold">#{selectedTask.taskCode}</span> ({selectedTask.taskTitle}) to another intern:
                      </p>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Select Intern</label>
                      <select
                        value={reassignInternId}
                        onChange={(e) => setReassignInternId(e.target.value)}
                        className="w-full bg-[#0b1120] border border-[#2a3648] text-white px-4 py-2.5 rounded-xl text-sm outline-none cursor-pointer"
                      >
                        {interns.map((i) => (
                          <option key={i._id} value={i._id}>{i.fullName} ({i.role})</option>
                        ))}
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
                        Reassign
                      </button>
                    </div>
                  </form>
                )}

                {(activeModal === "create" || activeModal === "edit") && (
                  <form onSubmit={activeModal === "create" ? handleCreateTask : handleUpdateTask} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Task Title</label>
                      <input
                        type="text"
                        required
                        value={taskForm.taskTitle}
                        onChange={(e) => setTaskForm({ ...taskForm, taskTitle: e.target.value })}
                        className="w-full bg-[#0b1120] border border-[#2a3648] text-white px-4 py-2.5 rounded-xl text-sm outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Description</label>
                      <textarea
                        required
                        rows={4}
                        value={taskForm.description}
                        onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                        className="w-full bg-[#0b1120] border border-[#2a3648] text-white px-4 py-2.5 rounded-xl text-sm outline-none focus:border-cyan-500 resize-none"
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
                          className="w-full bg-[#0b1120] border border-[#2a3648] text-white px-4 py-2.5 rounded-xl text-sm outline-none focus:border-cyan-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
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
                      {activeModal === "create" && (
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Assign To</label>
                          <select
                            value={taskForm.assignedIntern}
                            onChange={(e) => setTaskForm({ ...taskForm, assignedIntern: e.target.value })}
                            className="w-full bg-[#0b1120] border border-[#2a3648] text-white px-4 py-2.5 rounded-xl text-sm outline-none cursor-pointer"
                          >
                            {interns.map((i) => (
                              <option key={i._id} value={i._id}>{i.fullName}</option>
                            ))}
                          </select>
                        </div>
                      )}
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
                        {activeModal === "create" ? "Create Task" : "Save Changes"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}