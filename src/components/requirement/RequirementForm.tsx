"use client";

import { useState } from "react";

export default function RequirementForm() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData);
    alert("Requirement submitted successfully!");
  };


  return (
    <section className="max-w-4xl mx-auto px-6 pb-20">

      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">

        <form 
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="input-style"
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="input-style"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="input-style"
          />

          <input
            name="company"
            placeholder="Company / Organization"
            value={formData.company}
            onChange={handleChange}
            className="input-style"
          />


          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="input-style"
          >
            <option value="">Select Service</option>
            <option>AI Automation</option>
            <option>Software Development</option>
            <option>Web Development</option>
            <option>Mobile Application</option>
            <option>Training Solutions</option>
          </select>


          <textarea
            name="message"
            rows={5}
            placeholder="Describe your requirement..."
            value={formData.message}
            onChange={handleChange}
            className="input-style md:col-span-2"
          />


          <button
            type="submit"
            className="md:col-span-2 rounded-lg bg-cyan-400 py-3 font-semibold text-black hover:bg-cyan-300 transition"
          >
            Submit Requirement
          </button>

        </form>

      </div>

    </section>
  );
}