"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface AttendanceRecord {
  _id: string;
  internId: string;
  internName: string;
  date: string;
  status: "Present" | "Absent" | "Late";
}

export default function AdminAttendancePage() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await api.get("/attendance");
        setRecords(res.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
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
      <h1 className="text-4xl font-bold mb-8">Attendance Management</h1>

      <div className="overflow-x-auto rounded-xl">
        <table className="w-full border-collapse">
          <thead className="bg-slate-800">
            <tr>
              <th className="p-4 text-left">Intern</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr
                key={record._id}
                className="border-b border-slate-700 hover:bg-slate-800"
              >
                <td className="p-4">{record.internName}</td>
                <td className="p-4">
                  {new Date(record.date).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      record.status === "Present"
                        ? "bg-green-600"
                        : record.status === "Late"
                        ? "bg-yellow-600"
                        : "bg-red-600"
                    }`}
                  >
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
