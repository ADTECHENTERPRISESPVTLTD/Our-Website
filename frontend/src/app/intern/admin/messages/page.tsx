"use client";

import React, { useEffect, useState } from "react";
import { Search, Mail, Send, Eye, MessageSquare, Plus, Clock, User, X } from "lucide-react";
import api from "@/lib/api";

interface Message {
  _id: string;
  senderId: {
    fullName: string;
  };
  receiverId: {
    _id: string;
    fullName: string;
    email: string;
    department: string;
  };
  subject: string;
  message: string;
  status: "Unread" | "Read";
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [interns, setInterns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [receiverFilter, setReceiverFilter] = useState("All");

  // Create message modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageForm, setMessageForm] = useState({
    receiverId: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const messagesRes = await api.get("/messages");
      const internsRes = await api.get("/interns");

      setMessages(messagesRes.data.data || []);
      const activeInterns = internsRes.data.data || [];
      setInterns(activeInterns);

      if (activeInterns.length > 0) {
        setMessageForm((prev) => ({ ...prev, receiverId: activeInterns[0]._id }));
      }
    } catch (err) {
      console.error("Error fetching admin messages:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/messages", messageForm);
      alert("Message Sent Successfully!");
      setIsModalOpen(false);
      setMessageForm({
        receiverId: interns[0]?._id || "",
        subject: "",
        message: "",
      });
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to send message");
    }
  };

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch =
      msg.subject.toLowerCase().includes(search.toLowerCase()) ||
      msg.message.toLowerCase().includes(search.toLowerCase()) ||
      msg.receiverId?.fullName.toLowerCase().includes(search.toLowerCase());

    const matchesReceiver = receiverFilter === "All" || msg.receiverId?._id === receiverFilter;

    return matchesSearch && matchesReceiver;
  });

  if (loading) {
    return <div className="text-center py-20 text-white text-xl">Loading Messaging Center...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Internal Communications</h1>
          <p className="text-sm text-slate-400 mt-1">Broadcast instructions and review direct reading receipts.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-md cursor-pointer"
        >
          <Plus size={18} />
          Broadcast Message
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="portal-card p-4 bg-slate-900/40 border border-[#1e293b]/70 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search by subject, message, or intern..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0b1120] border border-[#2a3648] text-white pl-11 pr-4 py-2.5 rounded-xl text-sm outline-none focus:border-cyan-500 transition"
          />
        </div>

        <select
          value={receiverFilter}
          onChange={(e) => setReceiverFilter(e.target.value)}
          className="bg-[#0b1120] border border-[#2a3648] text-white px-4 py-2.5 rounded-xl text-xs outline-none cursor-pointer w-full md:w-auto"
        >
          <option value="All">Filter by Intern</option>
          {interns.map((i) => (
            <option key={i._id} value={i._id}>{i.fullName}</option>
          ))}
        </select>
      </div>

      {/* Messages List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMessages.map((msg) => {
          const isRead = msg.status === "Read";
          return (
            <div key={msg._id} className="portal-card p-5 bg-slate-900/40 border border-slate-500/10 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                      <User size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400">To: {msg.receiverId?.fullName || "Deleted Intern"}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{msg.receiverId?.department || "Unknown Dept"} &bull; {msg.receiverId?.email}</p>
                    </div>
                  </div>
                  <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    isRead ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                  }`}>
                    {msg.status}
                  </span>
                </div>

                <div className="mt-4">
                  <h4 className="font-bold text-white text-sm">{msg.subject}</h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#1e293b]/50 flex items-center justify-between text-[10px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
                <span>Sent by Admin</span>
              </div>
            </div>
          );
        })}
        {filteredMessages.length === 0 && (
          <p className="text-sm text-slate-500 text-center py-10 col-span-2">No messages found.</p>
        )}
      </div>

      {/* CREATE BROADCAST MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="px-6 py-4 bg-[#0d1527] border-b border-[#1e293b] flex items-center justify-between">
              <h3 className="font-bold text-white text-lg">Send Internal Announcement</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-[#1e293b] cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSendMessage} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Select Recipient</label>
                <select
                  value={messageForm.receiverId}
                  onChange={(e) => setMessageForm({ ...messageForm, receiverId: e.target.value })}
                  className="w-full bg-[#0b1120] border border-[#2a3648] text-white px-4 py-2.5 rounded-xl text-sm outline-none cursor-pointer"
                >
                  {interns.map((i) => (
                    <option key={i._id} value={i._id}>{i.fullName} ({i.role})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Subject</label>
                <input
                  type="text"
                  required
                  value={messageForm.subject}
                  onChange={(e) => setMessageForm({ ...messageForm, subject: e.target.value })}
                  placeholder="e.g. Schedule Update for August"
                  className="w-full bg-[#0b1120] border border-[#2a3648] text-white px-4 py-2.5 rounded-xl text-sm outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Message Body</label>
                <textarea
                  required
                  rows={6}
                  value={messageForm.message}
                  onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                  placeholder="Type your message details here..."
                  className="w-full bg-[#0b1120] border border-[#2a3648] text-white px-4 py-2.5 rounded-xl text-sm outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#1e293b]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-sm font-semibold hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-sm font-semibold shadow-md transition"
                >
                  Send Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
