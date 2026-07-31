"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface Task {
  _id: string;
  taskCode: string;
  taskTitle: string;
  description: string;
  priority: string;
  deadline: string;
  currentStatus: string;
  assignedIntern?: 
  {
  fullName: string;
  email: string;
};
}

export default function AdminTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data.data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading Tasks...
      </div>
    );
  }

    return (
    <main className="min-h-screen bg-[#0B1120] text-white p-8">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          Manage Tasks
        </h1>

        <button
          onClick={fetchTasks}
          className="bg-cyan-600 hover:bg-cyan-700 px-5 py-2 rounded-lg"
        >
          Refresh
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="bg-slate-800 rounded-xl p-8 text-center">
          No Tasks Found
        </div>
      ) : (
        <div className="overflow-x-auto bg-slate-900 rounded-xl">

          <table className="w-full">

            <thead className="bg-slate-700">

              <tr>

                <th className="p-4 text-left">Task Code</th>

                <th className="p-4 text-left">Title</th>

                <th className="p-4 text-left">Assigned Intern</th>

                <th className="p-4 text-left">Priority</th>

                <th className="p-4 text-left">Deadline</th>

                <th className="p-4 text-left">Status</th>

              </tr>

            </thead>

            <tbody>

              {tasks.map((task) => (

                <tr
                  key={task._id}
                  className="border-b border-slate-700 hover:bg-slate-800"
                >

                  <td className="p-4">{task.taskCode}</td>

                  <td className="p-4">{task.taskTitle}</td>

                  <td className="p-4">
                    {task.assignedIntern ? task.assignedIntern.fullName : "Not Assigned"}
                  </td>

                  <td className="p-4">{task.priority}</td>

                  <td className="p-4">
                    {new Date(task.deadline).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
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

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </main>
  );
}