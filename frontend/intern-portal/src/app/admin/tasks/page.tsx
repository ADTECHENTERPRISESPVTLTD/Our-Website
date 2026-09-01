"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface Task {
  _id: string;
  title: string;
  description: string;
  assignedTo: string;
  currentStatus: string;
  deadline?: string;
}

export default function AdminTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks");
        setTasks(res.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white text-xl">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B1120] text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Task Management</h1>

      <div className="overflow-x-auto rounded-xl">
        <table className="w-full border-collapse">
          <thead className="bg-slate-800">
            <tr>
              <th className="p-4 text-left">Task</th>
              <th className="p-4 text-left">Assigned To</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Deadline</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task._id}
                className="border-b border-slate-700 hover:bg-slate-800"
              >
                <td className="p-4">
                  <div>
                    <p className="font-semibold">{task.title}</p>
                    <p className="text-sm text-slate-400">{task.description}</p>
                  </div>
                </td>
                <td className="p-4">{task.assignedTo}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      task.currentStatus === "Completed"
                        ? "bg-green-600"
                        : task.currentStatus === "In Progress"
                        ? "bg-yellow-600"
                        : "bg-red-600"
                    }`}
                  >
                    {task.currentStatus}
                  </span>
                </td>
                <td className="p-4">
                  {task.deadline
                    ? new Date(task.deadline).toLocaleDateString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
