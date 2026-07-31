"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface Attendance {
  _id: string;
  internId: {
    fullName: string;
    email: string;
  } | null;
  date: string;
  loginTime: string;
  logoutTime?: string;
  totalWorkingHours: number;
}

export default function AttendancePage() {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAttendance = async () => {
    try {
      const res = await api.get("/attendance");
      setAttendance(res.data.data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-lg font-semibold">
        Loading attendance...
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Attendance</h1>

        <button
          onClick={fetchAttendance}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Intern</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Login</th>
              <th className="p-3 text-left">Logout</th>
              <th className="p-3 text-left">Hours</th>
            </tr>
          </thead>

          <tbody>
            {attendance.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="p-3">
                    {item.internId?.fullName || "Deleted Intern"}
                </td>

                <td className="p-3">
                    {item.internId?.email || "-"}
                </td>
                <td className="p-3">
                  {new Date(item.date).toLocaleDateString("en-IN")}
                </td>
                <td className="p-3">
                  {new Date(item.loginTime).toLocaleTimeString("en-IN")}
                </td>
                <td className="p-3">
                  {item.logoutTime
                    ? new Date(item.logoutTime).toLocaleTimeString()
                    : "-"}
                </td>
                <td className="p-3">
                    {item.totalWorkingHours
                    ? `${item.totalWorkingHours.toFixed(2)} hrs`
                    : "0 hrs"}
                </td>
              </tr>
            ))}

            {attendance.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center p-6">
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}