"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";

export default function AdminDashboard() {
  const [interns, setInterns] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const internRes = await api.get("/interns");
      const taskRes = await api.get("/tasks");

      setInterns(internRes.data.data || []);
      setTasks(taskRes.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const completed = tasks.filter(
    (t) => t.currentStatus === "Completed"
  ).length;

  const pending = tasks.filter(
    (t) => t.currentStatus === "Pending"
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B1120] text-white p-8">

      <h1 className="text-4xl font-bold mb-10">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-slate-800 rounded-xl p-6">
          <h2>Total Interns</h2>
          <p className="text-4xl font-bold mt-3">
            {interns.length}
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6">
          <h2>Total Tasks</h2>
          <p className="text-4xl font-bold mt-3">
            {tasks.length}
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6">
          <h2>Completed</h2>
          <p className="text-4xl font-bold mt-3 text-green-400">
            {completed}
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6">
          <h2>Pending</h2>
          <p className="text-4xl font-bold mt-3 text-red-400">
            {pending}
          </p>
        </div>

      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <Link
          href="/intern/admin/interns"
          className="bg-cyan-600 rounded-xl p-6 text-center font-semibold hover:bg-cyan-700"
        >
          Manage Interns
        </Link>

        <Link
          href="/intern/admin/tasks"
          className="bg-green-600 rounded-xl p-6 text-center font-semibold hover:bg-green-700"
        >
          Manage Tasks
        </Link>

        <Link
          href="/intern/admin/attendance"
          className="bg-purple-600 rounded-xl p-6 text-center font-semibold hover:bg-purple-700"
        >
          Attendance
        </Link>

      </div>

    </main>
  );
}