"use client";

import React, { useEffect, useState } from "react";
import { Search, Calendar, Clock, Award, ShieldAlert, Coffee, BarChart2 } from "lucide-react";
import api from "@/lib/api";

interface AttendanceRecord {
  _id: string;
  internId: {
    _id: string;
    fullName: string;
    email: string;
  } | null;
  date: string;
  loginTime: string;
  logoutTime?: string;
  totalWorkingHours: number;
}

interface Intern {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  department: string;
}

export default function AdminAttendancePage() {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [interns, setInterns] = useState<Intern[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const attendanceRes = await api.get("/attendance");
      const internRes = await api.get("/interns");
      setAttendance(attendanceRes.data.data || []);
      setInterns(internRes.data.data || []);
    } catch (err) {
      console.error("Error fetching attendance details:", err);
    } finally {
      setLoading(false);
    }
  };

  const getInternStats = (internId: string) => {
    const records = attendance.filter((a) => {
      const id = a.internId?._id || a.internId;
      return id === internId;
    });

    const todayStr = new Date().toDateString();
    const todayRecord = records.find((r) => new Date(r.date).toDateString() === todayStr);

    const totalHours = records.reduce((sum, r) => sum + (r.totalWorkingHours || 0), 0);
    const presentDays = new Set(records.map((r) => new Date(r.date).toDateString())).size;

    // Days in current month
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    
    // Check-in after 9:30 AM is marked as Late
    const lateDays = records.filter((r) => {
      const checkIn = new Date(r.loginTime);
      const hours = checkIn.getHours();
      const minutes = checkIn.getMinutes();
      return (hours > 9 || (hours === 9 && minutes > 30));
    }).length;

    const absentDays = Math.max(0, today.getDate() - presentDays);
    const attendancePercentage = daysInMonth > 0 ? Math.round((presentDays / daysInMonth) * 100) : 0;

    return {
      todayCheckIn: todayRecord ? new Date(todayRecord.loginTime).toLocaleTimeString("en-IN") : "Not Checked In",
      todayCheckOut: todayRecord && todayRecord.logoutTime ? new Date(todayRecord.logoutTime).toLocaleTimeString("en-IN") : (todayRecord ? "Active" : "-"),
      hoursWorked: totalHours.toFixed(1),
      presentDays,
      absentDays,
      lateDays,
      attendancePercentage,
    };
  };

  // Monthly Summaries
  const totalCheckIns = attendance.length;
  const avgWorkingHours = totalCheckIns > 0 ? (attendance.reduce((sum, r) => sum + (r.totalWorkingHours || 0), 0) / totalCheckIns).toFixed(1) : "0";
  
  // Late check-ins count this month
  const totalLateCheckIns = attendance.filter((r) => {
    const checkIn = new Date(r.loginTime);
    const hours = checkIn.getHours();
    const minutes = checkIn.getMinutes();
    return (hours > 9 || (hours === 9 && minutes > 30));
  }).length;

  const filteredInterns = interns.filter((i) =>
    i.fullName.toLowerCase().includes(search.toLowerCase()) ||
    i.email.toLowerCase().includes(search.toLowerCase()) ||
    i.department.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-20 text-white text-xl">Loading Attendance Analytics...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Attendance Monitor</h1>
          <p className="text-sm text-slate-400 mt-1">Review check-in status, late days, present count, and working hours.</p>
        </div>
        <button
          onClick={fetchData}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition shadow-md cursor-pointer"
        >
          Refresh Log
        </button>
      </div>

      {/* Monthly Statistics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="portal-card p-6 bg-slate-900/50 border border-slate-500/10 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Check-ins</span>
            <h3 className="text-3xl font-bold mt-2 text-cyan-400">{totalCheckIns}</h3>
            <p className="text-[10px] text-slate-500 mt-1">Current month statistics</p>
          </div>
          <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl">
            <Calendar size={20} />
          </div>
        </div>

        <div className="portal-card p-6 bg-slate-900/50 border border-slate-500/10 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Avg Hours / Day</span>
            <h3 className="text-3xl font-bold mt-2 text-emerald-400">{avgWorkingHours} hrs</h3>
            <p className="text-[10px] text-slate-500 mt-1">Target is 8.0 hrs</p>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
            <Clock size={20} />
          </div>
        </div>

        <div className="portal-card p-6 bg-slate-900/50 border border-slate-500/10 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Late Check-ins</span>
            <h3 className="text-3xl font-bold mt-2 text-rose-400">{totalLateCheckIns}</h3>
            <p className="text-[10px] text-slate-500 mt-1">Check-in after 9:30 AM</p>
          </div>
          <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl">
            <ShieldAlert size={20} />
          </div>
        </div>

        <div className="portal-card p-6 bg-slate-900/50 border border-slate-500/10 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Active Present Today</span>
            <h3 className="text-3xl font-bold mt-2 text-purple-400">
              {attendance.filter((a) => new Date(a.date).toDateString() === new Date().toDateString()).length}
            </h3>
            <p className="text-[10px] text-slate-500 mt-1">Checked in interns</p>
          </div>
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl">
            <Award size={20} />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="portal-card p-4 bg-slate-900/40 border border-[#1e293b]/70">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search by name, email, or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0b1120] border border-[#2a3648] text-white pl-11 pr-4 py-2.5 rounded-xl text-sm outline-none focus:border-cyan-500 transition"
          />
        </div>
      </div>

      {/* Attendance Detail Table */}
      <div className="portal-card bg-slate-900/30 border border-[#1e293b]/70 overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0d1527]/80 border-b border-[#1e293b] text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="p-4">Intern Name</th>
                <th className="p-4 text-center">Today check-in</th>
                <th className="p-4 text-center">Today check-out</th>
                <th className="p-4 text-center">Hours (Total)</th>
                <th className="p-4 text-center">Present</th>
                <th className="p-4 text-center">Absent</th>
                <th className="p-4 text-center">Late Days</th>
                <th className="p-4 text-center">Monthly Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]/50 text-sm text-slate-200">
              {filteredInterns.map((intern) => {
                const stats = getInternStats(intern._id);
                return (
                  <tr key={intern._id} className="hover:bg-[#111827]/40 transition duration-150">
                    <td className="p-4">
                      <p className="font-bold text-white">{intern.fullName}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{intern.department} &bull; {intern.role}</p>
                    </td>
                    <td className="p-4 text-center font-mono text-xs">{stats.todayCheckIn}</td>
                    <td className="p-4 text-center font-mono text-xs text-slate-300">{stats.todayCheckOut}</td>
                    <td className="p-4 text-center font-bold text-cyan-400">{stats.hoursWorked} hrs</td>
                    <td className="p-4 text-center text-emerald-400 font-bold">{stats.presentDays} days</td>
                    <td className="p-4 text-center text-rose-400 font-bold">{stats.absentDays} days</td>
                    <td className="p-4 text-center text-amber-400 font-bold">{stats.lateDays} days</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-xs font-bold text-white shrink-0 w-8">{stats.attendancePercentage}%</span>
                        <div className="w-20 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              stats.attendancePercentage > 75
                                ? "bg-emerald-500"
                                : stats.attendancePercentage > 50
                                ? "bg-amber-500"
                                : "bg-rose-500"
                            }`}
                            style={{ width: `${stats.attendancePercentage}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredInterns.length === 0 && (
          <p className="text-sm text-slate-500 text-center py-10">No records found.</p>
        )}
      </div>
    </div>
  );
}