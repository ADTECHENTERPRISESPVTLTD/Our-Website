'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, X, Send, Phone, Briefcase, FileText, 
  Calendar, Info, HelpCircle, CheckCircle, Moon, Sun, 
  Minus, Sparkles, SendHorizontal, Mic
} from 'lucide-react';
import { EMAIL, PHONE, KNOWLEDGE_BASE } from '@/data/knowledgeBase';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestions?: string[];
  isForm?: 'callback' | 'requirements' | 'none';
  formState?: 'active' | 'submitted';
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Callback form states
  const [callbackForm, setCallbackForm] = useState({ name: '', phone: '', email: '', note: '' });
  // Requirements form states
  const [reqForm, setReqForm] = useState({ name: '', company: '', scope: '', budget: '1000-5000' });

  // Speech Recognition States
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = 'en-US';

        rec.onstart = () => setIsListening(true);
        rec.onend = () => setIsListening(false);
        rec.onresult = (e: any) => {
          const transcript = e.results[0][0].transcript;
          setInputMessage(transcript);
        };
        recognitionRef.current = rec;
      }
    }
  }, []);

  const handleMicClick = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Try Google Chrome or Microsoft Edge!");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  // Initialize and load chat history
  useEffect(() => {
    const savedHistory = localStorage.getItem('adtech_chat_history');
    const savedTheme = localStorage.getItem('adtech_chat_theme');
    
    if (savedTheme === 'light') {
      setIsLightMode(true);
    }

    if (savedHistory) {
      setMessages(JSON.parse(savedHistory));
      setUnreadCount(0);
    } else {
      const welcomeMessage: Message = {
        id: 'welcome',
        role: 'assistant',
        content: `Welcome to **AD Tech Enterprises**! 🚀\n\nI am your AI Knowledge Assistant. I can help you learn about our services, our internship programs, our hiring process, or help you submit project requirements.\n\nWhat can I help you with today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ['Our Services', 'Apply for Internship', 'Book a Callback', 'Submit Requirements', 'Hiring Process FAQ']
      };
      setMessages([welcomeMessage]);
      localStorage.setItem('adtech_chat_history', JSON.stringify([welcomeMessage]));
    }
  }, []);

  // Sync scroll to bottom when messages or typing changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Save history helper
  const saveHistory = (newMessages: Message[]) => {
    setMessages(newMessages);
    localStorage.setItem('adtech_chat_history', JSON.stringify(newMessages));
  };

  // Toggle open/close
  const toggleChat = () => {
    setIsOpen(!isOpen);
    setUnreadCount(0);
  };

  // Toggle Theme
  const toggleTheme = () => {
    const newTheme = !isLightMode;
    setIsLightMode(newTheme);
    localStorage.setItem('adtech_chat_theme', newTheme ? 'light' : 'dark');
  };

  // Handle Text Submission
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    if (!textToSend) setInputMessage('');

    // Add user message
    const userMsg: Message = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMsg];
    saveHistory(updatedMessages);
    setIsTyping(true);

    // Call our API handler
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          // Map to format required by server endpoint
          history: updatedMessages.map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      const data = await response.json();
      
      let suggestions: string[] = [];
      if (text.toLowerCase().includes('service')) {
        suggestions = ['Book a Callback', 'Submit Requirements'];
      } else if (text.toLowerCase().includes('intern') || text.toLowerCase().includes('career')) {
        suggestions = ['Hiring Process FAQ', 'Contact Us'];
      } else {
        suggestions = ['Our Services', 'Book a Callback', 'Apply for Internship'];
      }

      const assistantMsg: Message = {
        id: `msg-${Date.now()}-assistant`,
        role: 'assistant',
        content: data.response || "I apologize, I encountered a communication error. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions
      };

      saveHistory([...updatedMessages, assistantMsg]);
    } catch (e) {
      console.error(e);
      const errorMsg: Message = {
        id: `msg-${Date.now()}-error`,
        role: 'assistant',
        content: "I'm having trouble connecting to the network right now. You can email our support team directly at **" + EMAIL + "** or call **" + PHONE + "**.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ['Our Services', 'Book a Callback']
      };
      saveHistory([...updatedMessages, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  // Handle Quick Actions
  const handleQuickAction = (action: string) => {
    // 1. Interactive quick action handling
    if (action === 'Our Services') {
      const el = document.getElementById('services');
      el?.scrollIntoView({ behavior: 'smooth' });
      
      const userMsg: Message = {
        id: `action-${Date.now()}-u`,
        role: 'user',
        content: "Tell me about AD TECH's services.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const assistantMsg: Message = {
        id: `action-${Date.now()}-a`,
        role: 'assistant',
        content: `We offer premium web development, database scaling, and bespoke artificial intelligence integrations:\n\n1. 💻 **Frontend Web Development**: Beautiful, high-converting interfaces built with Next.js, React, and Tailwind CSS.\n2. ⚙️ **Backend APIs & Database scaling**: Production-ready, secure services using Node.js, Express, and database clusters.\n3. 🤖 **AI Automations & Agents**: Seamlessly integrated chatbot widgets, custom LLM solutions (Gemini/OpenAI), and vector retrieval databases.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ['Book a Callback', 'Submit Requirements']
      };
      saveHistory([...messages, userMsg, assistantMsg]);
    } 
    else if (action === 'Apply for Internship') {
      const el = document.getElementById('careers');
      el?.scrollIntoView({ behavior: 'smooth' });

      const userMsg: Message = {
        id: `action-${Date.now()}-u`,
        role: 'user',
        content: "How can I apply for an internship?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const assistantMsg: Message = {
        id: `action-${Date.now()}-a`,
        role: 'assistant',
        content: `Our **Talent Development Program** places interns in real-world environments. You can apply for open positions such as AI Lead, Frontend Intern, or Backend Intern.\n\nTo apply, please submit your resume and active Github projects portfolio to our HR email: **${EMAIL}** or reach us via phone at **${PHONE}**.\n\nI have scrolled down to the Careers section of our page where you can see open slots!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ['Hiring Process FAQ', 'Contact Us']
      };
      saveHistory([...messages, userMsg, assistantMsg]);
    }
    else if (action === 'Book a Callback') {
      const userMsg: Message = {
        id: `action-${Date.now()}-u`,
        role: 'user',
        content: "I want to book a callback.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const formMsg: Message = {
        id: `form-${Date.now()}-callback`,
        role: 'assistant',
        content: "Please provide your details below so that our tech advisory team can schedule a callback for you:",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isForm: 'callback',
        formState: 'active'
      };
      saveHistory([...messages, userMsg, formMsg]);
    }
    else if (action === 'Submit Requirements') {
      const userMsg: Message = {
        id: `action-${Date.now()}-u`,
        role: 'user',
        content: "I want to submit business project requirements.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const formMsg: Message = {
        id: `form-${Date.now()}-req`,
        role: 'assistant',
        content: "Please fill out our Project Scope Form below to receive a custom quote:",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isForm: 'requirements',
        formState: 'active'
      };
      saveHistory([...messages, userMsg, formMsg]);
    }
    else if (action === 'Hiring Process FAQ') {
      const userMsg: Message = {
        id: `action-${Date.now()}-u`,
        role: 'user',
        content: "What is the hiring process?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const matched = KNOWLEDGE_BASE.find(k => k.category === 'hiring');
      const assistantMsg: Message = {
        id: `action-${Date.now()}-a`,
        role: 'assistant',
        content: matched ? matched.answer : "Our hiring process is: Resume screening -> Practical tech assignment -> Technical Interview -> HR interview.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ['Apply for Internship', 'Contact Us']
      };
      saveHistory([...messages, userMsg, assistantMsg]);
    }
    else if (action === 'Contact Us') {
      const el = document.getElementById('contact');
      el?.scrollIntoView({ behavior: 'smooth' });

      const userMsg: Message = {
        id: `action-${Date.now()}-u`,
        role: 'user',
        content: "How do I contact you?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const matched = KNOWLEDGE_BASE.find(k => k.category === 'contact');
      const assistantMsg: Message = {
        id: `action-${Date.now()}-a`,
        role: 'assistant',
        content: matched ? matched.answer : `You can email us at ${EMAIL} or call ${PHONE}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ['Book a Callback', 'Our Services']
      };
      saveHistory([...messages, userMsg, assistantMsg]);
    }
    else {
      handleSendMessage(action);
    }
  };

  // Submit Callback Form
  const handleCallbackSubmit = async (e: React.FormEvent, msgId: string) => {
    e.preventDefault();
    if (!callbackForm.name || !callbackForm.phone) return;

    // Send data to backend endpoint
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'callback',
          name: callbackForm.name,
          phone: callbackForm.phone,
          email: callbackForm.email
        })
      });
    } catch (err) {
      console.error('Failed to send lead to backend:', err);
    }

    const successMsg: Message = {
      id: `callback-success-${Date.now()}`,
      role: 'assistant',
      content: `✅ **Callback Request Submitted!**\n\nThank you, **${callbackForm.name}**. We have logged your request under phone number **${callbackForm.phone}**.\n\nAn AD TECH advisor will contact you within 24 hours at your email **${callbackForm.email || 'N/A'}** or phone.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: ['Our Services', 'Submit Requirements']
    };

    // Update form state to submitted
    const updated = messages.map(m => {
      if (m.id === msgId) {
        return { ...m, formState: 'submitted' as const };
      }
      return m;
    });

    saveHistory([...updated, successMsg]);
    setCallbackForm({ name: '', phone: '', email: '', note: '' });
  };

  // Submit Requirements Form
  const handleReqSubmit = async (e: React.FormEvent, msgId: string) => {
    e.preventDefault();
    if (!reqForm.name || !reqForm.scope) return;

    // Send data to backend endpoint
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'requirements',
          name: reqForm.name,
          company: reqForm.company,
          scope: reqForm.scope,
          budget: reqForm.budget
        })
      });
    } catch (err) {
      console.error('Failed to send lead to backend:', err);
    }

    const successMsg: Message = {
      id: `req-success-${Date.now()}`,
      role: 'assistant',
      content: `✅ **Project Scope Submitted!**\n\nThank you, **${reqForm.name}** of **${reqForm.company || 'Personal Project'}**.\n\nOur solutions architect will analyze your scope: *"${reqForm.scope.substring(0, 40)}..."* and budget preference (**$${reqForm.budget}**) and reach out shortly to begin your AI transformation.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: ['Book a Callback', 'Our Services']
    };

    const updated = messages.map(m => {
      if (m.id === msgId) {
        return { ...m, formState: 'submitted' as const };
      }
      return m;
    });

    saveHistory([...updated, successMsg]);
    setReqForm({ name: '', company: '', scope: '', budget: '1000-5000' });
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isLightMode ? 'light' : ''}`}>
      
      {/* 1. Chat Trigger Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 shadow-xl border border-slate-700 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer hover:shadow-2xl overflow-visible animate-float"
          title="Talk to AD TECH Assistant"
        >
          {/* Outer ring glow */}
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-600 opacity-30 blur-sm group-hover:opacity-75 transition-opacity duration-300"></div>
          
          {/* Cute Robot Image Bubble */}
          <div className="relative h-full w-full rounded-full overflow-hidden border border-slate-600/50 bg-[#111827]">
            <img src="/bot-avatar.png" className="h-full w-full object-cover avatar-wave transition-transform duration-300" alt="AD TECH Bot" />
          </div>
          
          {/* Wiggle notification badge */}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white animate-pulse">
              {unreadCount}
            </span>
          )}
          
          {/* Quick intro text on hover (Cute moments bubble) */}
          <div className="absolute right-16 bottom-1 hidden md:group-hover:flex flex-col items-end">
            <div className="bg-slate-900 border border-slate-700 text-slate-200 text-xs py-2 px-3.5 rounded-2xl rounded-br-none shadow-xl whitespace-nowrap animate-bounce flex items-center gap-1.5">
              <span>Hi there! 👋 Need help?</span>
            </div>
          </div>
        </button>
      )}

      {/* 2. Chat Window */}
      {isOpen && (
        <div
          ref={chatWindowRef}
          className={`flex h-[600px] w-[92vw] max-w-[400px] flex-col rounded-2xl border shadow-2xl transition-all duration-300 animate-slide-in overflow-hidden
            ${isLightMode 
              ? 'bg-white border-slate-200 text-slate-800' 
              : 'bg-[#0B1120] border-[#2A3648] text-slate-100'
            }`}
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-slate-900 via-[#111827] to-[#1A2233] border-b border-[#2A3648] text-white">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-9.5 w-9.5 items-center justify-center rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
                <img src="/bot-avatar.png" className="h-full w-full object-cover" alt="AD TECH Bot" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#10B981] border border-slate-950"></span>
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-wide">AD TECH Assistant</h3>
                <span className="text-[10px] text-slate-400">AI Knowledge Assistant</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5">
              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
                title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
              >
                {isLightMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </button>

              {/* Minimize */}
              <button 
                onClick={toggleChat}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
                title="Minimize"
              >
                <Minus className="h-4 w-4" />
              </button>

              {/* Close */}
              <button 
                onClick={toggleChat}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className={`flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar ${isLightMode ? 'bg-slate-50/50' : 'bg-[#0f172a]/20'}`}>
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-fade-in-up`}
              >
                {/* Bubble */}
                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm leading-relaxed whitespace-pre-wrap
                    ${msg.role === 'user' 
                      ? 'bg-slate-700 text-white rounded-br-none' 
                      : isLightMode
                        ? 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                        : 'bg-[#1A2233] border border-[#2A3648] text-slate-100 rounded-bl-none'
                    }`}
                >
                  {/* Format markdown bold correctly for UI rendering */}
                  {msg.content.split('**').map((chunk, i) => 
                    i % 2 === 1 ? <strong key={i} className="font-bold text-sky-400 light:text-indigo-600">{chunk}</strong> : chunk
                  )}

                  {/* Render Callback Form if Active */}
                  {msg.isForm === 'callback' && msg.formState === 'active' && (
                    <form onSubmit={(e) => handleCallbackSubmit(e, msg.id)} className={`mt-3 space-y-2 border-t pt-3 ${isLightMode ? 'border-slate-200' : 'border-[#374151]'}`}>
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Your Name *</label>
                        <input 
                          type="text" 
                          required
                          value={callbackForm.name}
                          onChange={(e) => setCallbackForm({ ...callbackForm, name: e.target.value })}
                          className={`w-full text-xs px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-slate-500 ${isLightMode ? 'bg-slate-100 border border-slate-300 text-slate-900' : 'bg-[#0B1120] border border-[#2A3648] text-slate-100'}`}
                          placeholder="Soham"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Phone Number *</label>
                        <input 
                          type="tel" 
                          required
                          value={callbackForm.phone}
                          onChange={(e) => setCallbackForm({ ...callbackForm, phone: e.target.value })}
                          className={`w-full text-xs px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-slate-500 ${isLightMode ? 'bg-slate-100 border border-slate-300 text-slate-900' : 'bg-[#0B1120] border border-[#2A3648] text-slate-100'}`}
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Email Address</label>
                        <input 
                          type="email" 
                          value={callbackForm.email}
                          onChange={(e) => setCallbackForm({ ...callbackForm, email: e.target.value })}
                          className={`w-full text-xs px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-slate-500 ${isLightMode ? 'bg-slate-100 border border-slate-300 text-slate-900' : 'bg-[#0B1120] border border-[#2A3648] text-slate-100'}`}
                          placeholder="example@gmail.com"
                        />
                      </div>
                      <button 
                        type="submit" 
                        className="w-full bg-slate-200 text-[#0B1120] text-xs font-semibold py-1.5 rounded-lg transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer block text-center"
                      >
                        Request Callback
                      </button>
                    </form>
                  )}

                  {/* Render Requirements Form if Active */}
                  {msg.isForm === 'requirements' && msg.formState === 'active' && (
                    <form onSubmit={(e) => handleReqSubmit(e, msg.id)} className={`mt-3 space-y-2 border-t pt-3 ${isLightMode ? 'border-slate-200' : 'border-[#374151]'}`}>
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Your Name *</label>
                        <input 
                          type="text" 
                          required
                          value={reqForm.name}
                          onChange={(e) => setReqForm({ ...reqForm, name: e.target.value })}
                          className={`w-full text-xs px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-slate-500 ${isLightMode ? 'bg-slate-100 border border-slate-300 text-slate-900' : 'bg-[#0B1120] border border-[#2A3648] text-slate-100'}`}
                          placeholder="Soham Amne"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Company Name</label>
                        <input 
                          type="text" 
                          value={reqForm.company}
                          onChange={(e) => setReqForm({ ...reqForm, company: e.target.value })}
                          className={`w-full text-xs px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-slate-500 ${isLightMode ? 'bg-slate-100 border border-slate-300 text-slate-900' : 'bg-[#0B1120] border border-[#2A3648] text-slate-100'}`}
                          placeholder="AD TECH"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Project Scope / Requirements *</label>
                        <textarea 
                          required
                          value={reqForm.scope}
                          onChange={(e) => setReqForm({ ...reqForm, scope: e.target.value })}
                          rows={2}
                          className={`w-full text-xs px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-slate-500 resize-none ${isLightMode ? 'bg-slate-100 border border-slate-300 text-slate-900' : 'bg-[#0B1120] border border-[#2A3648] text-slate-100'}`}
                          placeholder="Brief description of the chatbot or site needed..."
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Budget Preference</label>
                        <select 
                          value={reqForm.budget}
                          onChange={(e) => setReqForm({ ...reqForm, budget: e.target.value })}
                          className={`w-full text-xs px-2 py-1.5 rounded-lg focus:outline-none focus:border-slate-500 ${isLightMode ? 'bg-slate-100 border border-slate-300 text-slate-900' : 'bg-[#0B1120] border border-[#2A3648] text-slate-100'}`}
                        >
                          <option value="1000-5000">$1,000 - $5,000</option>
                          <option value="5000-15000">$5,000 - $15,000</option>
                          <option value="15000+">$15,000+</option>
                        </select>
                      </div>
                      <button 
                        type="submit" 
                        className="w-full bg-slate-200 text-[#0B1120] text-xs font-semibold py-1.5 rounded-lg transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer block text-center"
                      >
                        Submit Scope
                      </button>
                    </form>
                  )}
                </div>

                {/* Timestamp */}
                <span className="text-[9px] text-slate-500 mt-1 px-1">
                  {msg.timestamp}
                </span>

                {/* Quick suggestions right below the bubble */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                    {msg.suggestions.map((sug, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickAction(sug)}
                        className={`text-[11px] px-2.5 py-1 rounded-full border transition-all cursor-pointer active:scale-95
                          ${isLightMode 
                            ? 'border-slate-200 text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-900' 
                            : 'border-slate-600/40 text-slate-300 bg-slate-800/40 hover:bg-slate-800 hover:text-white hover:border-slate-500'}`}
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex flex-col items-start animate-fade-in-up">
                <div className={`flex items-center gap-1.5 border rounded-2xl rounded-bl-none px-4 py-3 ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#1A2233] border-[#2A3648]'}`}>
                  <div className="h-2 w-2 rounded-full bg-slate-500 animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 rounded-full bg-slate-500 animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 rounded-full bg-slate-500 animate-bounce"></div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Input Bar */}
          <div className={`px-4 py-3 border-t bg-[#0B1120] ${isLightMode ? 'bg-white border-slate-200' : 'border-[#2A3648]'}`}>
            <div className="flex gap-2">
              {/* Mic Button */}
              <button
                onClick={handleMicClick}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all active:scale-95 cursor-pointer
                  ${isListening 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : isLightMode
                      ? 'bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800'
                      : 'bg-[#1a2233] border border-[#2a3648] text-slate-400 hover:text-slate-200'}`}
                title={isListening ? "Listening... Click to stop" : "Voice Input"}
              >
                <Mic className={`h-4.5 w-4.5 ${isListening ? 'animate-bounce' : ''}`} />
              </button>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about AD TECH..."
                className={`flex-1 text-sm px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-slate-500
                  ${isLightMode 
                    ? 'bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400' 
                    : 'bg-[#1A2233] border border-[#2A3648] text-slate-100 placeholder-slate-500'}`}
              />
              <button
                onClick={() => handleSendMessage()}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-700 hover:bg-slate-600 hover:text-white transition-all active:scale-95 text-slate-200 cursor-pointer"
                title="Send Message"
              >
                <SendHorizontal className="h-4.5 w-4.5" />
              </button>
            </div>
            <div className="mt-2 text-[10px] text-center text-slate-500 flex items-center justify-center gap-1">
              <Sparkles className="h-3 w-3 text-sky-400" />
              Powered by AD TECH Generative Engine
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
