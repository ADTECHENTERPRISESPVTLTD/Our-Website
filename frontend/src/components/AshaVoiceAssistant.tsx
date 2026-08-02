'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Mic, MicOff, Volume2, VolumeX, Sparkles, X, Minus, Sun, Moon,
  Compass, RefreshCw, Send, RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ASHA_WELCOME_GREETING = "Hi, I am Asha! How can I assist you with AD TECH today?";

interface AshaMessage {
  id: string;
  role: 'user' | 'asha';
  text: string;
  timestamp: string;
  isNavigation?: boolean;
}

// Ultra-User-Friendly Siri Volumetric Glass Orb Visualizer (AD TECH Brand Palette)
function CreativeSiriOrb({ isListening, isSpeaking, size = 96, onClick }: { isListening: boolean; isSpeaking: boolean; size?: number; onClick?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let step = 0;

    // Floating ambient star dust particles
    const particles = Array.from({ length: 24 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.6 + 0.6,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      alpha: Math.random() * 0.8 + 0.2
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = canvas.width / 2 - 6;

      // Outer Glowing Atmosphere Aura (Matches AD TECH Sky Blue & Cyan)
      const auraGrad = ctx.createRadialGradient(cx, cy, radius * 0.3, cx, cy, radius + 10);
      auraGrad.addColorStop(0, isSpeaking ? 'rgba(56, 189, 248, 0.5)' : isListening ? 'rgba(239, 68, 68, 0.5)' : 'rgba(14, 165, 233, 0.35)');
      auraGrad.addColorStop(0.7, 'rgba(34, 211, 238, 0.15)');
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.beginPath();
      ctx.arc(cx, cy, radius + 10, 0, Math.PI * 2);
      ctx.fillStyle = auraGrad;
      ctx.fill();

      // Deep Dark Glass Base Inner Sphere (#0B1120 AD TECH Background)
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      
      const innerDarkGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      innerDarkGrad.addColorStop(0, '#111C35');
      innerDarkGrad.addColorStop(0.75, '#0B1120');
      innerDarkGrad.addColorStop(1, '#050914');
      ctx.fillStyle = innerDarkGrad;
      ctx.fill();
      ctx.clip();

      // Speed & Amplitude Dynamics
      const speed = isSpeaking ? 0.055 : isListening ? 0.042 : 0.022;
      const ampMult = isSpeaking ? 2.3 : isListening ? 1.7 : 1.1;
      step += speed;

      // AD TECH Sky Blue, Cyan, Royal Blue & Indigo Volumetric Swirl Ribbons
      const ribbons = [
        { c1: 'rgba(56, 189, 248, 0.95)', c2: 'rgba(2, 132, 199, 0.35)', angle: step, rMult: 0.68, yShift: 0 },
        { c1: 'rgba(34, 211, 238, 0.9)', c2: 'rgba(99, 102, 241, 0.3)', angle: -step * 1.25 + 1.2, rMult: 0.58, yShift: 4 },
        { c1: 'rgba(59, 130, 246, 0.92)', c2: 'rgba(56, 189, 248, 0.45)', angle: step * 0.85 + 2.4, rMult: 0.78, yShift: -4 },
        { c1: 'rgba(14, 165, 233, 0.85)', c2: 'rgba(34, 211, 238, 0.3)', angle: -step * 0.95 + 3.8, rMult: 0.52, yShift: 2 }
      ];

      ribbons.forEach((r) => {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.shadowBlur = 18;
        ctx.shadowColor = r.c1;

        const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, radius);
        grad.addColorStop(0, r.c1);
        grad.addColorStop(1, r.c2);

        ctx.fillStyle = grad;
        ctx.beginPath();

        const pointsCount = 120;
        for (let i = 0; i <= pointsCount; i++) {
          const t = i / pointsCount;
          const a = r.angle + t * Math.PI * 2;
          const wave = Math.sin(t * Math.PI * 6 + step * 3) * (9 * ampMult);
          const currentR = radius * r.rMult * Math.sin(t * Math.PI) + wave;

          const x = cx + Math.cos(a) * currentR;
          const y = cy + Math.sin(a * 1.4) * (currentR * 0.45) + r.yShift;

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });

      // Drifting Ambient Star Dust Sparkles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < cx - radius + 4 || p.x > cx + radius - 4) p.vx *= -1;
        if (p.y < cy - radius + 4 || p.y > cy + radius - 4) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(186, 230, 253, ${p.alpha})`;
        ctx.fill();
      });

      // Center 3D AI Energy Crystal Core Sparkle Math
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(step * 1.5);

      const crystalScale = isSpeaking ? 1.4 + Math.sin(step * 6) * 0.2 : isListening ? 1.25 : 1.0;

      // 4-Point AI Sparkle Star Core
      ctx.beginPath();
      const outerR = (size * 0.13) * crystalScale;
      const innerR = (size * 0.04) * crystalScale;

      for (let i = 0; i < 8; i++) {
        const r = i % 2 === 0 ? outerR : innerR;
        const angle = (i * Math.PI) / 4;
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();

      ctx.fillStyle = isListening ? 'rgba(239, 68, 68, 0.95)' : 'rgba(255, 255, 255, 0.95)';
      ctx.shadowBlur = 18;
      ctx.shadowColor = isListening ? '#EF4444' : '#38BDF8';
      ctx.fill();
      ctx.restore();

      // Realistic 3D Glass Specular Polish & Rim Lighting
      ctx.restore();
      ctx.save();

      // Glowing Neon Rim Border (AD TECH Sky Blue / Cyan)
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.lineWidth = 2.5;
      const rimGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      rimGrad.addColorStop(0, 'rgba(56, 189, 248, 0.85)');
      rimGrad.addColorStop(0.5, 'rgba(14, 165, 233, 0.5)');
      rimGrad.addColorStop(1, 'rgba(34, 211, 238, 0.7)');
      ctx.strokeStyle = rimGrad;
      ctx.stroke();

      // Soft Top Glass Lens Specular Reflection
      ctx.beginPath();
      ctx.ellipse(cx, cy - radius * 0.45, radius * 0.65, radius * 0.22, 0, 0, Math.PI * 2);
      const glassReflect = ctx.createLinearGradient(0, cy - radius * 0.7, 0, cy - radius * 0.2);
      glassReflect.addColorStop(0, 'rgba(255, 255, 255, 0.38)');
      glassReflect.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
      ctx.fillStyle = glassReflect;
      ctx.fill();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isListening, isSpeaking, size]);

  return (
    <div 
      onClick={onClick}
      style={{ width: size, height: size }}
      className="relative cursor-pointer group flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
    >
      {/* Concentric 3D Rotating Energy Rings */}
      <div className={`absolute inset-0 rounded-full border border-sky-400/40 pointer-events-none ${isSpeaking || isListening ? 'animate-ping' : 'animate-pulse'}`} />
      <div className="absolute -inset-1 rounded-full border border-sky-500/30 pointer-events-none animate-spin-slow" />

      <canvas 
        ref={canvasRef} 
        width={size * 2.2} 
        height={size * 2.2} 
        style={{ width: size, height: size }}
        className="rounded-full shadow-2xl shadow-sky-500/50"
      />
    </div>
  );
}

export default function AshaVoiceAssistant() {
  const router = useRouter();
  const pathname = usePathname() || '/';

  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [textInput, setTextInput] = useState('');
  const [messages, setMessages] = useState<AshaMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);

  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);
  const femaleVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const activeAudioRef = useRef<HTMLAudioElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Dynamic helper chips matched to ChatBot design
  const getDynamicChips = (path: string): string[] => {
    if (path.includes('/services')) {
      return ["AI Automation", "Case Studies", "Book Call", "Home"];
    }
    if (path.includes('/careers') || path.includes('/intern')) {
      return ["Apply Internship", "Internship FAQ", "Book Call", "Home"];
    }
    if (path.includes('/contact') || path.includes('/callback')) {
      return ["Book Call", "Open Services", "Open FAQ", "Home"];
    }
    if (path.includes('/faq')) {
      return ["Open Services", "Apply Internship", "Contact", "Home"];
    }
    if (path.includes('/about')) {
      return ["Open Services", "Apply Internship", "Contact", "Book Call"];
    }
    return ["Open Services", "Apply Internship", "Book Call", "Scroll Down"];
  };

  const dynamicChips = getDynamicChips(pathname);

  // Initialize Theme & Restore Conversation History from sessionStorage (Identical to ChatWidget AI Bot!)
  useEffect(() => {
    const savedTheme = localStorage.getItem('adtech_asha_theme');
    if (savedTheme === 'light') {
      setIsLightMode(true);
    }

    try {
      const savedHistory = sessionStorage.getItem('adtech_asha_history');
      if (savedHistory) {
        const parsed = JSON.parse(savedHistory);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch (e) {
      console.warn('Failed to restore Asha history from sessionStorage', e);
    }
  }, []);

  // Save Conversation History to sessionStorage whenever messages change
  useEffect(() => {
    try {
      if (messages.length > 0) {
        sessionStorage.setItem('adtech_asha_history', JSON.stringify(messages));
      } else {
        sessionStorage.removeItem('adtech_asha_history');
      }
    } catch (e) {
      console.warn('Failed to sync Asha history to sessionStorage', e);
    }
  }, [messages]);

  const toggleTheme = () => {
    const newTheme = !isLightMode;
    setIsLightMode(newTheme);
    localStorage.setItem('adtech_asha_theme', newTheme ? 'light' : 'dark');
  };

  // Immediate Mute / Unmute Toggle Action
  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);

    if (nextMute) {
      if (activeAudioRef.current) {
        activeAudioRef.current.pause();
        activeAudioRef.current.currentTime = 0;
        activeAudioRef.current = null;
      }
      if (synthesisRef.current) {
        synthesisRef.current.cancel();
      }
      setIsSpeaking(false);
    }
  };

  // Initialize Speech Synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthesisRef.current = window.speechSynthesis;

      const loadVoices = () => {
        const voices = synthesisRef.current?.getVoices() || [];
        const neuralVoice = voices.find(v => 
          /aria.*natural|jenny.*natural|natural.*female|google us english|samantha|karen/i.test(v.name) && v.lang.startsWith('en')
        ) || voices.find(v => 
          /natural/i.test(v.name) && v.lang.startsWith('en')
        ) || voices.find(v => 
          /female|woman/i.test(v.name) && v.lang.startsWith('en')
        ) || voices.find(v => v.lang.startsWith('en')) || null;

        if (neuralVoice) {
          femaleVoiceRef.current = neuralVoice;
        }
      };

      loadVoices();
      if (synthesisRef.current.onvoiceschanged !== undefined) {
        synthesisRef.current.onvoiceschanged = loadVoices;
      }
    }
  }, []);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = true;
        rec.lang = 'en-US';

        rec.onstart = () => setIsListening(true);
        rec.onend = () => setIsListening(false);
        rec.onerror = (event: any) => {
          console.warn('Asha Speech Error:', event.error);
          setIsListening(false);
        };

        rec.onresult = (event: any) => {
          const currentTranscript = Array.from(event.results)
            .map((result: any) => result[0].transcript)
            .join('');
          
          setTranscript(currentTranscript);

          if (event.results[0].isFinal) {
            handleVoiceInput(currentTranscript);
          }
        };

        recognitionRef.current = rec;
      } else {
        setSpeechSupported(false);
      }
    }
  }, []);

  // Listen for Navbar Custom Event trigger: "open-asha-voice"
  useEffect(() => {
    const handleNavbarTrigger = () => {
      openAssistantAndGreet();
    };

    window.addEventListener('open-asha-voice', handleNavbarTrigger);
    return () => {
      window.removeEventListener('open-asha-voice', handleNavbarTrigger);
    };
  }, []);

  // Scroll conversation panel
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isProcessing, isSpeaking]);

  // Smart Phonetic Speech Pre-processor (Expands abbreviations for natural human audio pronunciation!)
  const expandAbbreviationsForSpeech = (rawText: string): string => {
    return rawText
      .replace(/\bPvt\.?\s*Ltd\.?\b/gi, 'Private Limited')
      .replace(/\bInc\.?\b/gi, 'Incorporated')
      .replace(/\bCorp\.?\b/gi, 'Corporation')
      .replace(/\be\.g\.\b/gi, 'for example')
      .replace(/\bi\.e\.\b/gi, 'that is')
      .replace(/\bSaaS\b/g, 'Software as a Service')
      .replace(/\bEV\b/g, 'Electric Vehicle')
      .replace(/\bLMS\b/g, 'Learning Management System')
      .replace(/\bFAQ\b/g, 'F A Q')
      .replace(/[*_#`~]/g, '')
      .trim();
  };

  // Ultra-Fast Instant Web Speech for zero latency
  const speakInstantGreeting = (text: string, onEndCallback?: () => void) => {
    if (isMuted) {
      if (onEndCallback) onEndCallback();
      return;
    }

    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current = null;
    }
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
    }

    fallbackWebSpeech(text, onEndCallback);
  };

  // High-Speed Hybrid Voice Engine
  const speakText = async (text: string, onEndCallback?: () => void) => {
    if (isMuted) {
      if (onEndCallback) onEndCallback();
      return;
    }

    const cleanText = expandAbbreviationsForSpeech(text);
    if (!cleanText) return;

    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current = null;
    }
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
    }

    if (cleanText.split(' ').length <= 12) {
      fallbackWebSpeech(cleanText, onEndCallback);
      return;
    }

    let hasFallbackTriggered = false;

    const timer = setTimeout(() => {
      hasFallbackTriggered = true;
      fallbackWebSpeech(cleanText, onEndCallback);
    }, 600);

    try {
      const response = await fetch('/api/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleanText }),
      });

      clearTimeout(timer);

      if (response.ok && !hasFallbackTriggered) {
        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        activeAudioRef.current = audio;

        audio.onplay = () => setIsSpeaking(true);
        audio.onended = () => {
          setIsSpeaking(false);
          activeAudioRef.current = null;
          if (onEndCallback) onEndCallback();
        };
        audio.onerror = () => {
          setIsSpeaking(false);
          activeAudioRef.current = null;
          fallbackWebSpeech(cleanText, onEndCallback);
        };

        audio.play().catch((err) => {
          console.warn('Audio autoplay restricted on mobile device, using WebSpeech fallback:', err);
          setIsSpeaking(false);
          activeAudioRef.current = null;
          fallbackWebSpeech(cleanText, onEndCallback);
        });
        return;
      }
    } catch (e) {
      clearTimeout(timer);
      if (!hasFallbackTriggered) {
        fallbackWebSpeech(cleanText, onEndCallback);
      }
    }
  };

  const fallbackWebSpeech = (cleanText: string, onEndCallback?: () => void) => {
    if (!synthesisRef.current) {
      if (onEndCallback) onEndCallback();
      return;
    }

    try {
      const spokenText = expandAbbreviationsForSpeech(cleanText);
      const utterance = new SpeechSynthesisUtterance(spokenText);
      if (femaleVoiceRef.current) {
        utterance.voice = femaleVoiceRef.current;
      }

      utterance.pitch = 0.98;
      utterance.rate = 0.98;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        if (onEndCallback) onEndCallback();
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        if (onEndCallback) onEndCallback();
      };

      synthesisRef.current.speak(utterance);
    } catch (e) {
      console.warn('WebSpeech synthesis error:', e);
      setIsSpeaking(false);
      if (onEndCallback) onEndCallback();
    }
  };

  const openAssistantAndGreet = () => {
    setIsOpen(true);
    
    // Check if there are messages in state OR in sessionStorage!
    let existingMsgs = messages;
    if (existingMsgs.length === 0) {
      try {
        const saved = sessionStorage.getItem('adtech_asha_history');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            existingMsgs = parsed;
            setMessages(parsed);
          }
        }
      } catch (e) {}
    }

    if (existingMsgs.length === 0) {
      const welcomeMsg: AshaMessage = {
        id: `asha-welcome-${Date.now()}`,
        role: 'asha',
        text: ASHA_WELCOME_GREETING,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([welcomeMsg]);
      speakInstantGreeting(ASHA_WELCOME_GREETING);
    } else {
      if (synthesisRef.current) {
        synthesisRef.current.cancel();
      }
      setIsSpeaking(false);
    }
  };

  const startListening = () => {
    if (!speechSupported || !recognitionRef.current) return;

    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current = null;
    }
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
    }
    setIsSpeaking(false);

    try {
      setTranscript('');
      recognitionRef.current.start();
    } catch (e) {
      console.warn('Speech recognition exception:', e);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const clearChat = () => {
    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current = null;
    }
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
    }
    stopListening();
    setIsSpeaking(false);
    setMessages([]);
    setTranscript('');
    try {
      sessionStorage.removeItem('adtech_asha_history');
    } catch (e) {}
  };

  const minimizeAssistant = () => {
    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current = null;
    }
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
    }
    stopListening();
    setIsSpeaking(false);
    setIsOpen(false);
  };

  const closeAssistant = () => {
    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current = null;
    }
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
    }
    stopListening();
    setIsSpeaking(false);
    setMessages([]);
    setTranscript('');
    setIsOpen(false);
    try {
      sessionStorage.removeItem('adtech_asha_history');
    } catch (e) {}
  };

  const processVoiceNavigation = (phrase: string): { isNav: boolean; responseText: string } => {
    const lower = phrase.toLowerCase().trim();

    if (/\b(home|go to home|open home|take me home|home page)\b/i.test(lower)) {
      router.push('/');
      return { isNav: true, responseText: "Navigating to Home page." };
    }
    if (/\b(services|open services|go to services|show services|services page|our services)\b/i.test(lower)) {
      router.push('/services');
      return { isNav: true, responseText: "Opening AD TECH Services page." };
    }
    if (/\b(ai automation|automation solutions|ai services)\b/i.test(lower)) {
      router.push('/services');
      return { isNav: true, responseText: "Here are AD TECH Enterprise AI Automation Solutions." };
    }
    if (/\b(show case studies|case studies|view case studies)\b/i.test(lower)) {
      router.push('/services#case-studies');
      return { isNav: true, responseText: "Opening AD TECH Case Studies & Client Success Stories." };
    }
    if (/\b(apply internship|open internship|internship program|apply for internship|careers|open careers|intern portal|internship)\b/i.test(lower)) {
      router.push('/careers');
      return { isNav: true, responseText: "Opening Internship & Career Opportunities." };
    }
    if (/\b(internship faq|intern faq)\b/i.test(lower)) {
      router.push('/faq');
      return { isNav: true, responseText: "Opening Internship & General FAQ." };
    }
    if (/\b(contact|contact team|contact us|open contact|reach out)\b/i.test(lower)) {
      router.push('/contact');
      return { isNav: true, responseText: "Opening Contact page." };
    }
    if (/\b(open faq|frequently asked questions|show faq|faq)\b/i.test(lower)) {
      router.push('/faq');
      return { isNav: true, responseText: "Opening Frequently Asked Questions page." };
    }
    if (/\b(book discovery call|book call|book callback|schedule call|request callback|callback)\b/i.test(lower)) {
      router.push('/callback');
      return { isNav: true, responseText: "Opening Discovery Call & Callback booking." };
    }
    if (/\b(tell me about ad tech|about ad tech|what is ad tech|about company|about)\b/i.test(lower)) {
      router.push('/about');
      return { 
        isNav: true, 
        responseText: "AD TECH Enterprises Pvt. Ltd. is an AI Automation as a Service startup helping businesses become AI-First companies." 
      };
    }
    if (/\b(scroll down|down|scroll below)\b/i.test(lower)) {
      window.scrollBy({ top: 500, behavior: 'smooth' });
      return { isNav: true, responseText: "Scrolling down the page." };
    }
    if (/\b(scroll up|up|scroll top)\b/i.test(lower)) {
      window.scrollBy({ top: -500, behavior: 'smooth' });
      return { isNav: true, responseText: "Scrolling up." };
    }

    return { isNav: false, responseText: '' };
  };

  const handleVoiceInput = async (spokenText: string) => {
    const text = spokenText.trim();
    if (!text || text.length < 3) return;

    const userMsg: AshaMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setTranscript('');
    setTextInput('');
    setIsProcessing(true);

    const navResult = processVoiceNavigation(text);

    if (navResult.isNav) {
      const ashaMsg: AshaMessage = {
        id: `asha-nav-${Date.now()}`,
        role: 'asha',
        text: navResult.responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isNavigation: true
      };
      setMessages(prev => [...prev, ashaMsg]);
      setIsProcessing(false);
      speakText(navResult.responseText);
      return;
    }

    // Dynamic Website Link: Automatically navigate to relevant page/section based on spoken question topic!
    const lower = text.toLowerCase();
    if (/\b(service|services|web dev|android|ios|lms|ev|software|tech stack|solution|products)\b/i.test(lower)) {
      router.push('/services');
    } else if (/\b(intern|internship|career|careers|hiring|job|apply|sprint|stipend)\b/i.test(lower)) {
      router.push('/careers');
    } else if (/\b(contact|email|phone|call us|reach|location|office|address)\b/i.test(lower)) {
      router.push('/contact');
    } else if (/\b(faq|question|frequently)\b/i.test(lower)) {
      router.push('/faq');
    } else if (/\b(about|company|vision|mission|values|who are you|adtech)\b/i.test(lower)) {
      router.push('/about');
    } else if (/\b(callback|schedule call|book call|phone call)\b/i.test(lower)) {
      router.push('/callback');
    } else if (/\b(requirement|submit requirement|scope|quote|hire us)\b/i.test(lower)) {
      router.push('/submit-requirement');
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: [] })
      });

      const data = await response.json();
      let answerText = data.response || "I am glad to assist you with AD TECH Enterprises solutions!";
      answerText = answerText.replace(/^Hahaha\s*😊?\s*/i, '').trim();

      const ashaMsg: AshaMessage = {
        id: `asha-ai-${Date.now()}`,
        role: 'asha',
        text: answerText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, ashaMsg]);
      speakText(answerText);
    } catch (error) {
      console.error('Asha AI Fetch error:', error);
      const fallbackText = "I am ready to help you navigate our website or learn about AD TECH services and internships!";
      const ashaMsg: AshaMessage = {
        id: `asha-err-${Date.now()}`,
        role: 'asha',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, ashaMsg]);
      speakText(fallbackText);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {/* Floating Siri Glass Orb Launcher (Bottom-Left Corner bottom-4 left-4 sm:bottom-6 sm:left-6) */}
      {!isOpen && (
        <div className="group fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[9999] animate-float">
          <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center overflow-visible">
            <CreativeSiriOrb 
              isListening={false} 
              isSpeaking={false} 
              size={56} 
              onClick={openAssistantAndGreet} 
            />

            {/* Desktop Hover Tooltip */}
            <div className="absolute left-20 bottom-3 hidden lg:group-hover:flex flex-col items-start pointer-events-none">
              <div className={`text-xs py-2 px-3.5 rounded-2xl rounded-bl-none shadow-2xl backdrop-blur-xl whitespace-nowrap animate-bounce flex items-center gap-1.5 ${
                isLightMode ? 'bg-white/95 border border-slate-300 text-slate-800' : 'bg-[#0B1120]/95 border border-sky-500/40 text-sky-300'
              }`}>
                <span>Talk with Asha! 🎙️✨</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Asha Voice Experience Panel - Theme Perfectly Matched 1-to-1 to ChatWidget Bot */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed bottom-24 left-4 sm:bottom-24 sm:left-6 z-50 w-[92vw] max-w-[420px] sm:w-[420px] rounded-2xl sm:rounded-2xl shadow-2xl border flex flex-col h-[610px] max-h-[85vh] transition-colors duration-300 overflow-hidden ${
              isLightMode 
                ? 'bg-white border-slate-200 text-slate-800 shadow-slate-300/40' 
                : 'bg-[#0B1120] border-[#2A3648] text-slate-100 shadow-black/80'
            }`}
          >
            {/* Header Bar - Exactly matches ChatWidget solid dark gradient header! */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-slate-900 via-[#111827] to-[#1A2233] border-b border-[#2A3648] text-white shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <img src="/adtech-logo.png" className="h-7 w-7 object-contain shrink-0 select-none" alt="AD TECH Logo" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <h3 className="text-sm font-bold tracking-wide text-white">
                      Asha Voice AI
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                    <span className={`h-2 w-2 rounded-full ${isMuted ? 'bg-amber-400' : 'bg-emerald-500'} animate-pulse`} />
                    <span>{isMuted ? "Audio Muted" : isListening ? "Listening live..." : isSpeaking ? "Speaking..." : "Voice Assistant (Online)"}</span>
                  </div>
                </div>
              </div>

              {/* Clean Touch-Target Header Controls (Matching ChatWidget Header Buttons) */}
              <div className="flex items-center gap-0.5">
                {/* Mute/Unmute */}
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute Voice" : "Mute Voice"}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors cursor-pointer touch-manipulation"
                  title={isMuted ? "Unmute Voice" : "Mute Voice"}
                >
                  {isMuted ? <VolumeX className="h-4 w-4 text-amber-400" /> : <Volume2 className="h-4 w-4 text-sky-400" />}
                </button>

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  aria-label={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors cursor-pointer touch-manipulation"
                  title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
                >
                  {isLightMode ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5 text-amber-400" />}
                </button>

                {/* Minimize */}
                <button
                  onClick={minimizeAssistant}
                  aria-label="Minimize Window"
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors cursor-pointer touch-manipulation"
                  title="Minimize"
                >
                  <Minus className="h-4.5 w-4.5" />
                </button>

                {/* Close */}
                <button
                  onClick={closeAssistant}
                  aria-label="Close Window"
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-800/60 transition-colors cursor-pointer touch-manipulation"
                  title="Close"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>

            {/* Conversation Stream (Exactly matching ChatWidget background & bubble contrast!) */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin ${
              isLightMode ? 'bg-slate-50/50' : 'bg-[#0f172a]/20'
            }`}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap break-words ${
                      msg.role === 'user'
                        ? 'bg-slate-800 text-white rounded-br-none shadow-md'
                        : isLightMode
                          ? 'bg-slate-100 border border-slate-300 text-black rounded-bl-none shadow-sm'
                          : 'bg-[#1A2233] border border-[#2A3648] text-white rounded-bl-none shadow-sm'
                    }`}
                  >
                    {msg.isNavigation && (
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold mb-1.5 block tracking-wide ${
                        isLightMode ? 'text-sky-700' : 'text-sky-400'
                      }`}>
                        <Compass className="h-3.5 w-3.5 animate-spin-slow" /> Voice Navigation Executed
                      </span>
                    )}
                    <p 
                      className={`font-semibold text-sm ${
                        msg.role === 'user' 
                          ? 'text-white' 
                          : isLightMode 
                            ? 'text-black' 
                            : 'text-white'
                      }`}
                      style={{ color: isLightMode && msg.role !== 'user' ? '#000000' : undefined }}
                    >
                      {msg.text}
                    </p>
                  </div>
                  <span className={`text-[10px] mt-1 px-1 font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>{msg.timestamp}</span>
                </motion.div>
              ))}

              {isProcessing && (
                <div className={`flex items-center gap-2 text-xs p-3 rounded-2xl border max-w-[78%] shadow-sm ${
                  isLightMode ? 'bg-white border-slate-200 text-slate-700' : 'bg-[#1A2233] border-[#2A3648] text-sky-300'
                }`}>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin text-sky-500" />
                  <span>Processing query with AD TECH AI...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Interactive Volumetric Siri Glass Orb Controller */}
            <div className={`pt-3 pb-2 border-t flex flex-col items-center gap-2 shrink-0 ${
              isLightMode ? 'bg-white border-slate-200' : 'bg-[#0B1120] border-[#2A3648]'
            }`}>
              <div className="relative flex flex-col items-center">
                <CreativeSiriOrb 
                  isListening={isListening} 
                  isSpeaking={isSpeaking} 
                  size={76} 
                  onClick={isListening ? stopListening : startListening} 
                />
                <span className={`mt-1 text-[11px] font-semibold ${isLightMode ? 'text-slate-600' : 'text-sky-300'}`}>
                  {isListening ? "Listening... (Tap to stop)" : isSpeaking ? "Asha Speaking... (Tap to interrupt)" : "Tap Orb to Speak"}
                </span>
              </div>

              {/* Speech Recognition Live Transcript Bubble */}
              {transcript && (
                <div className={`w-[92%] text-xs italic p-2 rounded-xl border shadow-sm flex items-center gap-2 ${
                  isLightMode ? 'bg-slate-100 border-slate-200 text-slate-800' : 'bg-[#1A2233] border-[#2A3648] text-sky-200'
                }`}>
                  <Mic className="h-3.5 w-3.5 text-sky-500 animate-pulse shrink-0" />
                  <span className="truncate">"{transcript}"</span>
                </div>
              )}

              {/* Context-Aware Dynamic Quick Chips (Matched to Bot style!) */}
              <div className="w-[94%] flex items-center gap-2 overflow-x-auto py-1 px-1 scrollbar-none flex-nowrap">
                {dynamicChips.map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => handleVoiceInput(cmd)}
                    className={`text-[11px] px-3 py-1.5 rounded-xl border transition-all shrink-0 whitespace-nowrap cursor-pointer ${
                      isLightMode 
                        ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200' 
                        : 'bg-[#1A2233] border border-[#2A3648] text-sky-300 hover:border-sky-500'
                    }`}
                  >
                    "{cmd}"
                  </button>
                ))}
              </div>

              {/* Input Bar (Exactly matching ChatWidget!) */}
              <div className="w-[94%] flex items-center gap-2 pt-1">
                <button
                  onClick={clearChat}
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all ${
                    isLightMode 
                      ? 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200' 
                      : 'bg-[#1A2233] border border-[#2A3648] text-slate-400 hover:text-white'
                  }`}
                  title="Reset Conversation"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>

                <button
                  onClick={isListening ? stopListening : startListening}
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all ${
                    isListening 
                      ? 'bg-red-500 text-white border-red-400 animate-pulse' 
                      : isLightMode 
                        ? 'bg-slate-100 border-slate-200 text-slate-600 hover:border-sky-500' 
                        : 'bg-[#1A2233] border border-[#2A3648] text-sky-400 hover:border-sky-500'
                  }`}
                  title={isListening ? "Stop Listening" : "Voice Input"}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </button>

                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleVoiceInput(textInput)}
                  placeholder="Ask about AD TECH..."
                  className={`flex-1 text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none transition-colors ${
                    isLightMode 
                      ? 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-slate-500' 
                      : 'bg-[#1A2233] border border-[#2A3648] text-slate-100 placeholder-slate-500 focus:border-slate-500'
                  }`}
                />

                <button
                  onClick={() => handleVoiceInput(textInput)}
                  disabled={!textInput.trim() || isProcessing}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-600 hover:bg-sky-500 text-white transition-all disabled:opacity-40 shadow-sm cursor-pointer"
                  title="Send Message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>

              {/* Bottom Attribution Badge (Matching ChatWidget Bot!) */}
              <div className="mt-1 text-[10px] text-center text-slate-500 flex items-center justify-center gap-1.5">
                <img src="/adtech-logo.png" className="h-3.5 w-3.5 object-contain shrink-0 select-none" alt="AD TECH Logo" />
                <span>Powered by AD TECH Generative Engine</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
