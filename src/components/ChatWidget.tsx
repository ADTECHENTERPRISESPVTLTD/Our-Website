"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Bot,
  Mic,
  SendHorizontal,
  X,
  Volume2,
  VolumeX,
  Sparkles,
  MessageSquare,
  Sun,
  Moon,
  Maximize2,
  Minimize2,
  Check,
  Phone,
  FileText,
} from "lucide-react";
import { QUICK_ACTIONS_RESPONSES } from "@/data/knowledgeBase";

interface Message {
  id: string;
  sender: "user" | "asha";
  text: string;
  timestamp: string;
  suggestions?: string[];
  type?: "text" | "form_callback" | "form_requirement";
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [unreadBadge, setUnreadBadge] = useState(true);

  // Forms inside chatbot
  const [activeForm, setActiveForm] = useState<"callback" | "requirement" | null>(null);
  const [callForm, setCallForm] = useState({ name: "", phone: "", preferredTime: "" });
  const [reqForm, setReqForm] = useState({ name: "", email: "", projectType: "Web App", budget: "$1,000 - $5,000", description: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "asha",
      text: "Namaste! 🙏 I'm **Asha**, AD TECH's AI Voice Assistant. How can I help you build your project or join our internship program today?",
      timestamp: "Just now",
      suggestions: ["What services do you offer?", "How to apply for Internship?", "Contact & Phone Number"],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);

  // Scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  // Speech Recognition Setup
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onerror = () => setIsListening(false);

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            setInputMessage(transcript);
            handleSendMessage(transcript);
          }
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  // Text To Speech Output
  const speakText = (text: string) => {
    if (isMuted || typeof window === "undefined" || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#~`]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopAudio = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      if (isSpeaking) stopAudio();
      try {
        recognitionRef.current?.start();
      } catch (err) {
        console.error("Speech recognition error:", err);
      }
    }
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputMessage.trim();
    if (!textToSend || isTyping) return;

    if (isSpeaking) stopAudio();

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputMessage("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend }),
      });

      if (res.ok) {
        const data = await res.json();
        const ashaMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: "asha",
          text: data.response || "Thank you for asking! How else can I assist your team?",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, ashaMsg]);
        speakText(data.response);
      } else {
        throw new Error("API error");
      }
    } catch (err) {
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "asha",
        text: "We specialize in custom web development, mobile apps, SaaS platforms, and AI workflows. Reach out to us at **hradtechenterpriseschepvtltd@gmail.com** or call **+91 83193 58568**!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
      speakText("We specialize in custom web development, mobile apps, SaaS platforms, and AI workflows.");
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (suggestion: string) => {
    const lower = suggestion.toLowerCase();
    if (lower.includes("services")) {
      const data = QUICK_ACTIONS_RESPONSES.services;
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), sender: "user", text: suggestion, timestamp: "Just now" },
        { id: (Date.now() + 1).toString(), sender: "asha", text: data.message, timestamp: "Just now", suggestions: data.suggestions }
      ]);
      speakText("We offer tailored web development, mobile apps, and AI automation solutions.");
    } else if (lower.includes("internship") || lower.includes("careers")) {
      const data = QUICK_ACTIONS_RESPONSES.internship;
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), sender: "user", text: suggestion, timestamp: "Just now" },
        { id: (Date.now() + 1).toString(), sender: "asha", text: data.message, timestamp: "Just now", suggestions: data.suggestions }
      ]);
      speakText("Our internship program embodies our tagline Building Future Tech Talent.");
    } else if (lower.includes("contact") || lower.includes("phone")) {
      const data = QUICK_ACTIONS_RESPONSES.contact;
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), sender: "user", text: suggestion, timestamp: "Just now" },
        { id: (Date.now() + 1).toString(), sender: "asha", text: data.message, timestamp: "Just now", suggestions: data.suggestions }
      ]);
      speakText("You can connect directly with AD TECH Enterprises.");
    } else if (lower.includes("callback")) {
      setActiveForm("callback");
    } else if (lower.includes("submit requirement") || lower.includes("scope")) {
      setActiveForm("requirement");
    } else {
      handleSendMessage(suggestion);
    }
  };

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callForm.name || !callForm.phone) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setActiveForm(null);
      setFormSubmitted(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "asha",
          text: `Thank you, **${callForm.name}**! Our team has received your callback request for **${callForm.preferredTime || "as soon as possible"}**. We will call you at **${callForm.phone}**.`,
          timestamp: "Just now",
        },
      ]);
      setCallForm({ name: "", phone: "", preferredTime: "" });
    }, 1000);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setUnreadBadge(false);
          }}
          aria-label="Open Asha AI Assistant"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-5 py-3.5 rounded-full shadow-[0_10px_30px_rgba(6,182,212,0.4)] border border-cyan-300/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center">
            <Bot className="w-6 h-6 animate-pulse" />
            {unreadBadge && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-300"></span>
              </span>
            )}
          </div>
          <span className="font-semibold text-sm tracking-wide hidden sm:inline">Ask Asha AI</span>
        </button>
      )}

      {/* Floating Chat Drawer */}
      {isOpen && (
        <div
          className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col rounded-2xl shadow-2xl border transition-all duration-300 overflow-hidden ${
            isExpanded
              ? "w-[95vw] sm:w-[650px] h-[85vh]"
              : "w-[92vw] sm:w-[420px] h-[600px] max-h-[85vh]"
          } ${
            isLightMode
              ? "bg-slate-50 border-slate-200 text-slate-900"
              : "bg-[#0A1224] border-cyan-500/20 text-slate-100 shadow-[0_20px_60px_rgba(2,6,23,0.8)]"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#0B1120] via-[#111827] to-[#1e293b] border-b border-cyan-500/20 text-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 border border-cyan-400/30 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <Bot className="h-6 w-6 text-cyan-300" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0B1120]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-white tracking-wide">Asha AI Voice Assistant</h3>
                  <span className="text-[10px] bg-cyan-400/15 border border-cyan-400/30 text-cyan-300 px-2 py-0.5 rounded-full font-mono">LIVE</span>
                </div>
                <p className="text-[11px] text-slate-400">AD TECH Enterprises • Official Assistant</p>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-1 text-slate-400">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 hover:text-white rounded-lg transition"
                title={isMuted ? "Unmute Voice" : "Mute Voice"}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="text-cyan-400" />}
              </button>
              <button
                onClick={() => setIsLightMode(!isLightMode)}
                className="p-1.5 hover:text-white rounded-lg transition"
                title="Toggle Theme"
              >
                {isLightMode ? <Moon size={18} /> : <Sun size={18} className="text-amber-400" />}
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 hover:text-white rounded-lg transition hidden sm:block"
                title={isExpanded ? "Minimize" : "Expand"}
              >
                {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:text-white rounded-lg transition ml-1 cursor-pointer"
                title="Close Chat"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed shadow-sm ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-none"
                      : isLightMode
                      ? "bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm"
                      : "bg-[#162032] border border-[#2A3648] text-slate-100 rounded-bl-none"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
                <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>

                {/* Quick Action Suggestions */}
                {msg.suggestions && (
                  <div className="flex flex-wrap gap-2 mt-3 max-w-[90%]">
                    {msg.suggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickAction(sug)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition hover:scale-105 active:scale-95 cursor-pointer ${
                          isLightMode
                            ? "bg-slate-100 border-slate-300 text-slate-700 hover:bg-cyan-50 hover:border-cyan-400 hover:text-cyan-700"
                            : "bg-[#111827] border-[#2A3648] text-slate-300 hover:bg-cyan-500/10 hover:border-cyan-500/40 hover:text-cyan-300"
                        }`}
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Active Callback Form Inside Chat */}
            {activeForm === "callback" && (
              <div className="bg-[#111827] border border-cyan-500/30 p-4 rounded-2xl space-y-3">
                <div className="flex justify-between items-center border-b border-[#2A3648] pb-2">
                  <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                    <Phone size={14} /> Book a Call Back
                  </span>
                  <button onClick={() => setActiveForm(null)} className="text-slate-400 hover:text-white">
                    <X size={14} />
                  </button>
                </div>
                {formSubmitted ? (
                  <p className="text-xs text-emerald-400 flex items-center gap-1">
                    <Check size={14} /> Callback request submitted!
                  </p>
                ) : (
                  <form onSubmit={handleCallbackSubmit} className="space-y-2.5 text-xs">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={callForm.name}
                      onChange={(e) => setCallForm({ ...callForm, name: e.target.value })}
                      className="w-full bg-[#1A2233] border border-[#2A3648] text-white px-3 py-2 rounded-lg outline-none focus:border-cyan-400"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number (+91...)"
                      value={callForm.phone}
                      onChange={(e) => setCallForm({ ...callForm, phone: e.target.value })}
                      className="w-full bg-[#1A2233] border border-[#2A3648] text-white px-3 py-2 rounded-lg outline-none focus:border-cyan-400"
                    />
                    <input
                      type="text"
                      placeholder="Preferred Time (e.g. 3:00 PM)"
                      value={callForm.preferredTime}
                      onChange={(e) => setCallForm({ ...callForm, preferredTime: e.target.value })}
                      className="w-full bg-[#1A2233] border border-[#2A3648] text-white px-3 py-2 rounded-lg outline-none focus:border-cyan-400"
                    />
                    <button
                      type="submit"
                      className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2 rounded-lg transition"
                    >
                      Request Call
                    </button>
                  </form>
                )}
              </div>
            )}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Bot className="w-4 h-4 text-cyan-400 animate-spin" />
                <span>Asha is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Bar */}
          <div className={`p-3 border-t flex items-center gap-2 ${
            isLightMode ? "bg-white border-slate-200" : "bg-[#0B1120] border-cyan-500/20"
          }`}>
            <button
              onClick={handleMicClick}
              disabled={isTyping}
              className={`p-2.5 rounded-xl border transition ${
                isListening
                  ? "bg-red-500 text-white animate-pulse border-red-400"
                  : isLightMode
                  ? "bg-slate-100 border-slate-300 text-slate-600 hover:text-cyan-600"
                  : "bg-[#162032] border-[#2A3648] text-slate-400 hover:text-cyan-400"
              }`}
              title={isListening ? "Listening... Click to stop" : "Voice Input"}
            >
              <Mic size={18} />
            </button>

            <input
              type="text"
              value={inputMessage}
              disabled={isTyping}
              onChange={(e) => {
                if (isSpeaking) stopAudio();
                setInputMessage(e.target.value);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder={isTyping ? "Asha is replying..." : "Ask Asha anything..."}
              className={`flex-1 text-xs px-3.5 py-2.5 rounded-xl outline-none border transition ${
                isLightMode
                  ? "bg-slate-50 border-slate-300 text-slate-900 focus:border-cyan-500"
                  : "bg-[#162032] border-[#2A3648] text-white focus:border-cyan-400"
              }`}
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={isTyping || !inputMessage.trim()}
              className="p-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl disabled:opacity-40 hover:opacity-90 transition cursor-pointer"
            >
              <SendHorizontal size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
