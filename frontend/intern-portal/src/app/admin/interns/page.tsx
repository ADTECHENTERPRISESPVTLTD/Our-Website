"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface Intern {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  department: string;
  college: string;
  currentStatus: string;
}

export default function InternManagement() {
  const [interns, setInterns] = useState<Intern[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState("");

const [form, setForm] = useState({
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

  useEffect(() => {
    fetchInterns();
  }, []);

  const fetchInterns = async () => {
    try {
      const res = await api.get("/interns");
      setInterns(res.data.data);
    } catch (err: any) {
        console.error(err);

        console.log(err.response);

        alert(
            err.response?.data?.error ||
            err.response?.data?.message ||
            "Failed to load interns"
        );
    } finally {
      setLoading(false);
    }
  };

  const handleAddIntern = async () => {
  try {
    await api.post("/interns", {
      fullName: form.fullName,
      email: form.email,
      password: form.password,
      phoneNumber: form.phoneNumber,
      role: form.role,
      department: form.department,
      college: form.college,
      skills: form.skills
        .split(",")
        .map((skill) => skill.trim()),
      currentStatus: form.currentStatus,
    });

    alert("Intern Added Successfully");

    setShowForm(false);
    setIsEditing(false);

    fetchInterns();
  } catch (err: any) {
    console.error(err);
    alert("Failed to add intern");
  }
};

const handleUpdateIntern = async () => {
  try {
    await api.put(`/interns/${editId}`, {
      fullName: form.fullName,
      email: form.email,
      phoneNumber: form.phoneNumber,
      role: form.role,
      department: form.department,
      college: form.college,
      currentStatus: form.currentStatus,
    });

    alert("Intern Updated Successfully");

    setShowForm(false);

    setIsEditing(false);
    setEditId("");

    setForm({
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

    fetchInterns();
  } catch (err: any) {
    console.error(err);
    alert(err.response?.data?.error || "Failed to add intern");
  }
};

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white text-xl">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B1120] text-white p-8">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
        Intern Management
      </h1>

    <button
    onClick={() => {
    setIsEditing(false);
    setEditId("");

    setForm({
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

    setShowForm(true);
}}
    className="bg-cyan-600 hover:bg-cyan-700 px-5 py-2 rounded-lg font-semibold">
    + Add Intern
    </button>
    </div>

      <div className="overflow-x-auto rounded-xl">

        <table className="w-full border-collapse">

          <thead className="bg-slate-800">

            <tr>

              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Email</th>

              <th className="p-4 text-left">Role</th>

              <th className="p-4 text-left">Department</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {interns.map((intern) => (

              <tr
                key={intern._id}
                className="border-b border-slate-700 hover:bg-slate-800"
              >

                <td className="p-4">{intern.fullName}</td>

                <td className="p-4">{intern.email}</td>

                <td className="p-4">{intern.role}</td>

                <td className="p-4">{intern.department}</td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      intern.currentStatus === "Active"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {intern.currentStatus}
                  </span>

                </td>

                <td className="p-4 text-center">

                  <button
                        onClick={() => {
                        setIsEditing(true);
                        setEditId(intern._id);

                        setForm({
                            fullName: intern.fullName,
                            email: intern.email,
                            password: "",
                            phoneNumber: intern.phoneNumber,
                            role: intern.role,
                            department: intern.department,
                            college: intern.college,
                            skills: "",
                            currentStatus: intern.currentStatus,
                        });

                    setShowForm(true);
                    }} className="bg-yellow-500 px-3 py-1 rounded mr-2">
                            Edit
                    </button>

                  <button onClick={async () => {
                    const confirmDelete = confirm("Are you sure you want to delete this intern?");

                    if (!confirmDelete) return;

                    try {
                    await api.delete(`/interns/${intern._id}`);

                    setInterns((prev) =>
                    prev.filter((item) => item._id !== intern._id)
                    );

                    alert("Intern deleted successfully");
                } catch (err) {
                    console.error(err);
                alert("Failed to delete intern");
                }
                }}
                className="bg-red-600 px-3 py-1 rounded">
                Delete
                </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {showForm && (
  <div className="fixed inset-0 bg-black/70 flex justify-center items-center">

    <div className="bg-slate-900 p-8 rounded-xl w-[600px]">

      <h2 className="text-2xl font-bold mb-6">
        {isEditing ? "Edit Intern" : "Add Intern"}
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <input
          placeholder="Full Name"
          className="p-3 rounded bg-slate-800"
          value={form.fullName}
          onChange={(e) =>
            setForm({ ...form, fullName: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="p-3 rounded bg-slate-800"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {!isEditing && (
        <input
            type="password"
            placeholder="Password"
            className="p-3 rounded bg-slate-800"
            value={form.password}
            onChange={(e) =>
            setForm({ ...form, password: e.target.value })
        }/>
        )}

        <input
          type="tel"
          placeholder="Phone"
          className="p-3 rounded bg-slate-800"
          value={form.phoneNumber}
          onChange={(e) =>
            setForm({ ...form, phoneNumber: e.target.value })
          }
        />

        <input
          placeholder="Role"
          className="p-3 rounded bg-slate-800"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        />

        <input
          placeholder="Department"
          className="p-3 rounded bg-slate-800"
          value={form.department}
          onChange={(e) =>
            setForm({ ...form, department: e.target.value })
          }
        />

        <input
          placeholder="College"
          className="p-3 rounded bg-slate-800"
          value={form.college}
          onChange={(e) =>
            setForm({ ...form, college: e.target.value })
          }
        />

        <input
          placeholder="Skills (React,Node)"
          className="p-3 rounded bg-slate-800"
          value={form.skills}
          onChange={(e) =>
            setForm({ ...form, skills: e.target.value })
          }
        />

      </div>

      <div className="flex justify-end gap-4 mt-6">

        <button
          onClick={() => {
            setShowForm(false);
            setIsEditing(false);
            setEditId("");
        }}
          className="bg-gray-600 px-4 py-2 rounded"
        >
          Cancel
        </button>

        <button
            onClick={isEditing ? handleUpdateIntern : handleAddIntern}
            className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded">
            {isEditing ? "Update" : "Save"}
        </button>

      </div>

    </div>

  </div>
)}

    </main>
  );
}