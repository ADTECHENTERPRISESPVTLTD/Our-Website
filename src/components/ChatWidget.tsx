'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, X, Send, Phone, Briefcase, FileText, 
  Calendar, Info, HelpCircle, CheckCircle, Moon, Sun, 
  Minus, Sparkles, SendHorizontal, Mic, Maximize2, Minimize2
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
  const [viewportHeight, setViewportHeight] = useState<string>('100dvh');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const savedScrollTopRef = useRef<number | null>(null);

  // Callback form states
  const [callbackForm, setCallbackForm] = useState({ name: '', phone: '', email: '', note: '' });
  // Requirements form states
  const [reqForm, setReqForm] = useState({ name: '', company: '', scope: '', budget: '1000-5000' });

  // Speech Recognition States
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  // Connection/API Status State
  const [apiMode, setApiMode] = useState<'online' | 'offline' | 'checking'>('checking');

  // Verify API connectivity on load
  useEffect(() => {
    const verifyStatus = async () => {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: 'ping', history: [] })
        });
        const data = await response.json();
        setApiMode(data.mode || 'offline');
      } catch (err) {
        setApiMode('offline');
      }
    };
    verifyStatus();
  }, []);

  // Visual Viewport Adaptability (iOS / Android Mobile Soft Keyboard Resize)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleVisualViewportResize = () => {
      if (window.visualViewport) {
        setViewportHeight(`${window.visualViewport.height}px`);
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleVisualViewportResize);
      window.visualViewport.addEventListener('scroll', handleVisualViewportResize);
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleVisualViewportResize);
        window.visualViewport.removeEventListener('scroll', handleVisualViewportResize);
      }
    };
  }, []);

  // Background Body Scroll Lock on Mobile Fullscreen Mode
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isMobile = window.innerWidth < 640;
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Initialize Speech Recognition with cross-browser detection
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
        rec.onerror = () => setIsListening(false);
        rec.onresult = (e: any) => {
          const transcript = e.results[0][0].transcript;
          setInputMessage(transcript);
        };
        recognitionRef.current = rec;
      } else {
        setSpeechSupported(false);
      }
    }
  }, []);

  const handleMicClick = () => {
    if (!speechSupported || !recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Try Google Chrome or Safari!");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error("Speech recognition error:", err);
      }
    }
  };

  // Initialize and load chat history & auto theme detection
  useEffect(() => {
    const savedHistory = localStorage.getItem('adtech_chat_history');
    const savedTheme = localStorage.getItem('adtech_chat_theme');
    
    if (savedTheme) {
      setIsLightMode(savedTheme === 'light');
    } else if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches) {
      // Auto-sync with system preference if user hasn't explicitly set a preference
      setIsLightMode(true);
    }

    if (savedHistory) {
      try {
        setMessages(JSON.parse(savedHistory));
        setUnreadCount(0);
      } catch (e) {
        console.error('Failed to parse chat history:', e);
      }
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

  // Restore scroll position where user left off when un-minimizing / re-opening
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        if (messagesContainerRef.current) {
          if (savedScrollTopRef.current !== null) {
            messagesContainerRef.current.scrollTop = savedScrollTopRef.current;
          } else {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
          }
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Scroll to bottom when new messages arrive or typing status changes
  useEffect(() => {
    if (isOpen && messagesContainerRef.current) {
      const timer = setTimeout(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTo({
            top: messagesContainerRef.current.scrollHeight,
            behavior: 'smooth'
          });
          savedScrollTopRef.current = messagesContainerRef.current.scrollHeight;
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [messages.length, isTyping]);

  // Save history helper
  const saveHistory = (newMessages: Message[]) => {
    setMessages(newMessages);
    localStorage.setItem('adtech_chat_history', JSON.stringify(newMessages));
  };

  // Minimize chat (keeps current scroll position)
  const toggleChat = () => {
    setIsOpen(!isOpen);
    setUnreadCount(0);
  };

  // Close chat (resets scroll position to top where chat starts)
  const handleCloseChat = () => {
    savedScrollTopRef.current = 0;
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = 0;
    }
    setIsOpen(false);
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
          history: updatedMessages.map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      const data = await response.json();
      if (data.mode) {
        setApiMode(data.mode);
      }
      
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
      setApiMode('offline');
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
    <div 
      aria-label="AD TECH AI Chatbot Widget"
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] transition-all duration-300 ${isLightMode ? 'light' : ''}`}
    >
      
      {/* 1. Chat Trigger Button (Cross-Device Touch Target Optimized: Min 56x56px) */}
      {!isOpen && (
        <>
          {/* External Notification Bubble */}
          <div className="absolute bottom-24 right-0 sm:bottom-28 sm:right-0 z-50 w-64 sm:w-72 animate-slide-in">
            <div className="relative bg-gradient-to-br from-slate-900 via-[#111827] to-[#1A2233] border border-[#2A3648] rounded-2xl rounded-br-sm shadow-2xl p-3 sm:p-4">
              {/* Bot Image */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-full overflow-visible border-2 border-sky-400/50 bg-[#0B1120] shadow-[0_0_15px_rgba(56,189,248,0.3)] shrink-0">
                  <img 
                    src="/chatbot-logo.svg" 
                    className="h-full w-full rounded-full object-cover" 
                    alt="AD TECH Bot" 
                  />
                  <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-[#0B1120] shadow-[0_0_8px_rgba(16,185,129,0.95)] z-10 animate-pulse"></span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-white leading-tight">Hi, I am Aasha</p>
                  <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 leading-tight">How can I help you? 😊</p>
                </div>
              </div>
              {/* Arrow pointer */}
              <div className="absolute -bottom-2 right-5 sm:right-6 w-4 h-4 bg-gradient-to-br from-slate-900 via-[#111827] to-[#1A2233] border-r border-b border-[#2A3648] transform rotate-45"></div>
            </div>
          </div>

          <button
            onClick={toggleChat}
            aria-label="Open AD TECH AI Assistant Chat"
            className="group relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer overflow-visible animate-float touch-manipulation"
            title="Talk to AD TECH Assistant"
          >
            {/* Futuristic Hologram Back-Glow */}
            <div className="absolute h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-600 opacity-40 blur-md group-hover:opacity-85 transition-opacity duration-300"></div>
            
            {/* Glowing ring */}
            <div className="absolute inset-1 sm:inset-1.5 rounded-full border border-sky-400/30 group-hover:border-sky-400/80 transition-colors duration-300 animate-pulse-slow"></div>

            {/* Robot Image Bubble with Green Online Indicator Dot */}
            <div className="relative h-13 w-13 sm:h-15 sm:w-15 rounded-full overflow-visible shadow-2xl border border-slate-700/50">
              <img src="/chatbot-logo.svg" className="h-full w-full rounded-full object-cover avatar-wave transition-transform duration-300" alt="AD TECH Bot" />
              
              {/* Green Active/Online Status Dot */}
              <span className="absolute top-0 right-0 h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full bg-emerald-500 border-2 border-[#0B1120] shadow-[0_0_10px_rgba(16,185,129,0.9)] z-20 animate-pulse"></span>
            </div>
            
            {/* Unread notification badge */}
            {unreadCount > 0 && (
              <span className="absolute top-0 left-0 z-20 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white animate-pulse">
                {unreadCount}
              </span>
            )}
            
            {/* Quick intro text on desktop hover */}
            <div className="absolute right-20 bottom-3 hidden lg:group-hover:flex flex-col items-end">
              <div className="bg-slate-900 border border-slate-700 text-slate-200 text-xs py-2 px-3.5 rounded-2xl rounded-br-none shadow-xl whitespace-nowrap animate-bounce flex items-center gap-1.5">
                <span>Hi there! 👋 Need help?</span>
              </div>
            </div>
          </button>
        </>
      )}

      {/* 2. Chat Window (Cross-Device Responsive: Mobile Fullscreen, iPad Drawer, PC Modal) */}
      {isOpen && (
        <div
          ref={chatWindowRef}
          role="dialog"
          aria-modal="true"
          aria-label="AD TECH Assistant Conversation Window"
          style={{ height: typeof window !== 'undefined' && window.innerWidth < 640 ? viewportHeight : undefined }}
          className={`fixed inset-0 w-full h-[100dvh] rounded-none sm:static sm:inset-auto sm:h-[85vh] sm:max-h-[640px] sm:w-[92vw] sm:max-w-[420px] flex flex-col border shadow-2xl transition-all duration-300 animate-slide-in overflow-hidden z-[9999]
            ${isLightMode 
              ? 'bg-white border-slate-200 text-slate-800' 
              : 'bg-[#0B1120] border-[#2A3648] text-slate-100'
            }`}
        >
          {/* Circular Mascot Avatar on iPad & PC */}
          <div className="absolute right-2 bottom-24 z-30 h-16 w-16 lg:h-20 lg:w-20 rounded-full overflow-visible border-2 border-sky-400/50 bg-[#0B1120] shadow-[0_0_20px_rgba(56,189,248,0.25)] animate-float hidden md:block">
            <img 
              src="/chatbot-logo.svg" 
              className="h-full w-full rounded-full object-cover avatar-wave" 
              alt="AD TECH Mascot" 
            />
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-emerald-500 border-2 border-[#0B1120] shadow-[0_0_12px_rgba(16,185,129,0.95)] z-40 animate-pulse"></span>
          </div>

          {/* Chat Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-slate-900 via-[#111827] to-[#1A2233] border-b border-[#2A3648] text-white shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <img src="/chatbot-logo.svg" className="h-7 w-7 object-contain shrink-0 select-none" alt="AD TECH Logo" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-wide">AD TECH Assistant</h3>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>AI Knowledge Assistant (Online)</span>
                </div>
              </div>
            </div>
            
            {/* Header Controls (Touch Targets >= 44px) */}
            <div className="flex items-center gap-1">
              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                aria-label={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors cursor-pointer touch-manipulation"
                title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
              >
                {isLightMode ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5" />}
              </button>

              {/* Minimize */}
              <button 
                onClick={toggleChat}
                aria-label="Minimize Chatbot Window"
                className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors cursor-pointer touch-manipulation"
                title="Minimize"
              >
                <Minus className="h-5 w-5" />
              </button>

              {/* Close */}
              <button 
                onClick={handleCloseChat}
                aria-label="Close Chatbot Window"
                className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-800/60 transition-colors cursor-pointer touch-manipulation"
                title="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div 
            ref={messagesContainerRef}
            onScroll={(e) => { savedScrollTopRef.current = e.currentTarget.scrollTop; }}
            aria-live="polite"
            className={`flex-1 overflow-y-auto p-3 sm:p-4 md:pr-20 space-y-4 custom-scrollbar ${isLightMode ? 'bg-slate-50/50' : 'bg-[#0f172a]/20'}`}
          >
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-fade-in-up`}
              >
                {/* Bubble */}
                <div 
                  className={`max-w-[88%] sm:max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm shadow-sm leading-relaxed whitespace-pre-wrap break-words
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
                    <form onSubmit={(e) => handleCallbackSubmit(e, msg.id)} className={`mt-3 space-y-3 border-t pt-3 ${isLightMode ? 'border-slate-200' : 'border-[#374151]'}`}>
                      <div>
                        <label className="form-label text-slate-400 block mb-1 text-xs">Your Name *</label>
                        <input 
                          type="text" 
                          required
                          value={callbackForm.name}
                          onChange={(e) => setCallbackForm({ ...callbackForm, name: e.target.value })}
                          className={`w-full form-input px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-slate-500 placeholder-slate-500 ${isLightMode ? 'bg-slate-100 border border-slate-300 text-slate-900' : 'bg-[#0B1120] border border-[#2A3648] text-slate-100'}`}
                          placeholder="Soham"
                        />
                      </div>
                      <div>
                        <label className="form-label text-slate-400 block mb-1 text-xs">Phone Number *</label>
                        <input 
                          type="tel" 
                          required
                          value={callbackForm.phone}
                          onChange={(e) => setCallbackForm({ ...callbackForm, phone: e.target.value })}
                          className={`w-full form-input px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-slate-500 placeholder-slate-500 ${isLightMode ? 'bg-slate-100 border border-slate-300 text-slate-900' : 'bg-[#0B1120] border border-[#2A3648] text-slate-100'}`}
                          placeholder="+91 83193 58568"
                        />
                      </div>
                      <div>
                        <label className="form-label text-slate-400 block mb-1 text-xs">Email Address</label>
                        <input 
                          type="email" 
                          value={callbackForm.email}
                          onChange={(e) => setCallbackForm({ ...callbackForm, email: e.target.value })}
                          className={`w-full form-input px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-slate-500 placeholder-slate-500 ${isLightMode ? 'bg-slate-100 border border-slate-300 text-slate-900' : 'bg-[#0B1120] border border-[#2A3648] text-slate-100'}`}
                          placeholder="example@gmail.com"
                        />
                      </div>
                      <button 
                        type="submit" 
                        className="w-full bg-sky-600 hover:bg-sky-500 text-white font-medium py-2.5 rounded-lg transition-transform active:scale-[0.98] cursor-pointer block text-center touch-manipulation text-sm shadow-md"
                      >
                        Request Callback
                      </button>
                    </form>
                  )}

                  {/* Render Requirements Form if Active */}
                  {msg.isForm === 'requirements' && msg.formState === 'active' && (
                    <form onSubmit={(e) => handleReqSubmit(e, msg.id)} className={`mt-3 space-y-3 border-t pt-3 ${isLightMode ? 'border-slate-200' : 'border-[#374151]'}`}>
                      <div>
                        <label className="form-label text-slate-400 block mb-1 text-xs">Your Name *</label>
                        <input 
                          type="text" 
                          required
                          value={reqForm.name}
                          onChange={(e) => setReqForm({ ...reqForm, name: e.target.value })}
                          className={`w-full form-input px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-slate-500 placeholder-slate-500 ${isLightMode ? 'bg-slate-100 border border-slate-300 text-slate-900' : 'bg-[#0B1120] border border-[#2A3648] text-slate-100'}`}
                          placeholder="Soham Amne"
                        />
                      </div>
                      <div>
                        <label className="form-label text-slate-400 block mb-1 text-xs">Company Name</label>
                        <input 
                          type="text" 
                          value={reqForm.company}
                          onChange={(e) => setReqForm({ ...reqForm, company: e.target.value })}
                          className={`w-full form-input px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-slate-500 placeholder-slate-500 ${isLightMode ? 'bg-slate-100 border border-slate-300 text-slate-900' : 'bg-[#0B1120] border border-[#2A3648] text-slate-100'}`}
                          placeholder="AD TECH"
                        />
                      </div>
                      <div>
                        <label className="form-label text-slate-400 block mb-1 text-xs">Project Scope / Requirements *</label>
                        <textarea 
                          required
                          value={reqForm.scope}
                          onChange={(e) => setReqForm({ ...reqForm, scope: e.target.value })}
                          rows={2}
                          className={`w-full form-input px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-slate-500 resize-none placeholder-slate-500 ${isLightMode ? 'bg-slate-100 border border-slate-300 text-slate-900' : 'bg-[#0B1120] border border-[#2A3648] text-slate-100'}`}
                          placeholder="Brief description of the chatbot or site needed..."
                        />
                      </div>
                      <div>
                        <label className="form-label text-slate-400 block mb-1 text-xs">Budget Preference</label>
                        <select 
                          value={reqForm.budget}
                          onChange={(e) => setReqForm({ ...reqForm, budget: e.target.value })}
                          className={`w-full form-input px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-slate-500 ${isLightMode ? 'bg-slate-100 border border-slate-300 text-slate-900' : 'bg-[#0B1120] border border-[#2A3648] text-slate-100'}`}
                        >
                          <option value="1000-5000">$1,000 - $5,000</option>
                          <option value="5000-15000">$5,000 - $15,000</option>
                          <option value="15000+">$15,000+</option>
                        </select>
                      </div>
                      <button 
                        type="submit" 
                        className="w-full bg-sky-600 hover:bg-sky-500 text-white font-medium py-2.5 rounded-lg transition-transform active:scale-[0.98] cursor-pointer block text-center touch-manipulation text-sm shadow-md"
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
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                    {msg.suggestions.map((sug, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickAction(sug)}
                        aria-label={`Quick suggestion: ${sug}`}
                        className={`text-[11px] px-3 py-1.5 rounded-full border transition-all cursor-pointer active:scale-95 touch-manipulation
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

          {/* Quick Input Bar (Touch Target & Keyboard Adaptive) */}
          <div className={`px-3 py-3 border-t shrink-0 ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0B1120] border-[#2A3648]'}`}>
            <div className="flex items-center gap-2">
              {/* Mic Button */}
              <button
                onClick={handleMicClick}
                disabled={isTyping}
                aria-label={isListening ? "Listening... Click to stop" : "Voice Input"}
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all active:scale-95 cursor-pointer touch-manipulation disabled:opacity-40 disabled:cursor-not-allowed
                  ${isListening 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : isLightMode
                      ? 'bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800'
                      : 'bg-[#1a2233] border border-[#2a3648] text-slate-400 hover:text-slate-200'}`}
                title={isListening ? "Listening... Click to stop" : "Voice Input"}
              >
                <Mic className={`h-5 w-5 ${isListening ? 'animate-bounce' : ''}`} />
              </button>

              <input
                type="text"
                value={inputMessage}
                disabled={isTyping}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={isTyping ? "AI Assistant is thinking..." : "Ask about AD TECH..."}
                className={`flex-1 text-sm px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-slate-500 disabled:opacity-50 disabled:cursor-not-allowed
                  ${isLightMode 
                    ? 'bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400' 
                    : 'bg-[#1A2233] border border-[#2A3648] text-slate-100 placeholder-slate-500'}`}
              />

              <button
                onClick={() => handleSendMessage()}
                disabled={isTyping || !inputMessage.trim()}
                aria-label="Send Message"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-600 hover:bg-sky-500 active:scale-95 text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer touch-manipulation shadow-md"
                title="Send Message"
              >
                <SendHorizontal className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-2 text-[10px] text-center text-slate-500 flex items-center justify-center gap-1.5">
              <img src="/adtech-logo.png" className="h-3.5 w-3.5 object-contain shrink-0 select-none" alt="AD TECH Logo" />
              <span>Powered by AD TECH Generative Engine</span>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
