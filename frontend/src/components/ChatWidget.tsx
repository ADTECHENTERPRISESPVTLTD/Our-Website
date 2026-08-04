'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  MessageSquare, X, Send, Phone, Briefcase, FileText, 
  Calendar, Info, HelpCircle, CheckCircle, Moon, Sun, 
  Minus, Sparkles, SendHorizontal, Mic, Volume2, VolumeX,
  Maximize2, Minimize2, Radio
} from 'lucide-react';
import { EMAIL, PHONE, KNOWLEDGE_BASE } from '@/data/knowledgeBase';
import { normalizeQueryTypos } from '@/lib/ragChain';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestions?: string[];
  isForm?: 'callback' | 'requirements' | 'none';
  formState?: 'active' | 'submitted';
}

// Ultra-User-Friendly Siri Volumetric Glass Orb Visualizer (AD TECH Brand Palette)
function CreativeSiriOrb({ isListening, isSpeaking, size = 80, onClick }: { isListening: boolean; isSpeaking: boolean; size?: number; onClick?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [painted, setPainted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let step = 0;
    let firstFrame = true;

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

      // Outer Glowing Atmosphere Aura
      const auraGrad = ctx.createRadialGradient(cx, cy, radius * 0.3, cx, cy, radius + 10);
      auraGrad.addColorStop(0, isSpeaking ? 'rgba(56, 189, 248, 0.6)' : isListening ? 'rgba(239, 68, 68, 0.6)' : 'rgba(14, 165, 233, 0.4)');
      auraGrad.addColorStop(0.7, 'rgba(34, 211, 238, 0.2)');
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.beginPath();
      ctx.arc(cx, cy, radius + 10, 0, Math.PI * 2);
      ctx.fillStyle = auraGrad;
      ctx.fill();

      // Deep Dark Glass Base Inner Sphere
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

      // Center 3D AI Energy Crystal Core Sparkle
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(step * 1.5);

      const crystalScale = isSpeaking ? 1.4 + Math.sin(step * 6) * 0.2 : isListening ? 1.25 : 1.0;

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

      // Glowing Neon Rim Border
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.lineWidth = 2.5;
      const rimGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      rimGrad.addColorStop(0, 'rgba(56, 189, 248, 0.85)');
      rimGrad.addColorStop(0.5, 'rgba(14, 165, 233, 0.5)');
      rimGrad.addColorStop(1, 'rgba(34, 211, 238, 0.7)');
      ctx.strokeStyle = rimGrad;
      ctx.stroke();

      // Soft Top Glass Specular Reflection
      ctx.beginPath();
      ctx.ellipse(cx, cy - radius * 0.45, radius * 0.65, radius * 0.22, 0, 0, Math.PI * 2);
      const glassReflect = ctx.createLinearGradient(0, cy - radius * 0.7, 0, cy - radius * 0.2);
      glassReflect.addColorStop(0, 'rgba(255, 255, 255, 0.38)');
      glassReflect.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
      ctx.fillStyle = glassReflect;
      ctx.fill();

      ctx.restore();

      // Signal that canvas has painted — safe to show the container
      if (firstFrame) {
        firstFrame = false;
        setPainted(true);
      }

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
      style={{ 
        width: size, 
        height: size,
        minWidth: size,
        minHeight: size,
        borderRadius: '9999px',
        background: 'radial-gradient(circle at center, #111C35 0%, #0B1120 70%, #050914 100%)',
        boxShadow: '0 0 25px rgba(56, 189, 248, 0.6), inset 0 0 15px rgba(34, 211, 238, 0.4)',
        opacity: painted ? 1 : 0,
        transition: 'opacity 0.2s ease-out',
      }}
      className="relative cursor-pointer group flex items-center justify-center hover:scale-105 active:scale-95 select-none shrink-0 overflow-hidden"
    >
      <canvas 
        ref={canvasRef} 
        width={size * 2.2} 
        height={size * 2.2} 
        style={{ 
          width: size, 
          height: size,
          background: 'transparent',
        }}
        className="rounded-full relative z-10"
      />
    </div>
  );
}

// ─── Premium Voice Waveform Visualizer ───────────────────────────────────────
function VoiceWaveform({ status }: { status: 'idle' | 'listening' | 'thinking' | 'speaking' }) {
  const bars = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="flex items-center justify-center gap-[3px] h-8">
      {bars.map((b) => (
        <div
          key={b}
          style={{
            width: 3,
            borderRadius: 4,
            animationDelay: `${b * 0.1}s`,
            animationDuration: status === 'speaking' ? '0.5s' : status === 'listening' ? '0.9s' : '2s',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
            animationName: status !== 'idle' ? 'ashaWave' : 'none',
            height: status === 'idle' ? 4 : undefined,
            minHeight: 4,
            maxHeight: 28,
            background:
              status === 'speaking' ? 'linear-gradient(to top, #06b6d4, #3b82f6)' :
              status === 'listening' ? 'linear-gradient(to top, #ef4444, #f97316)' :
              status === 'thinking' ? 'linear-gradient(to top, #f59e0b, #eab308)' :
              '#334155',
          }}
        />
      ))}
    </div>
  );
}

export default function ChatWidget() {
  const router = useRouter();
  const pathname = usePathname() || '/';

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [viewportHeight, setViewportHeight] = useState<string>('100dvh');

  // Voice States
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  // Conversational Mode — Asha auto-listens after every reply
  const [isConversationMode, setIsConversationMode] = useState(false);
  const isConversationModeRef = useRef(false);
  const [voiceStatus, setVoiceStatus] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const savedScrollTopRef = useRef<number | null>(null);

  // Audio & Speech References
  const activeAudioRef = useRef<HTMLAudioElement | null>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);
  const femaleVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const recognitionRef = useRef<any>(null);

  // Callback form states
  const [callbackForm, setCallbackForm] = useState({ name: '', phone: '', email: '', note: '' });
  // Requirements form states
  const [reqForm, setReqForm] = useState({ name: '', company: '', scope: '', budget: '1000-5000' });

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

  // Initialize Speech Synthesis and find the top polite, warm female voice
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthesisRef.current = window.speechSynthesis;

      const loadVoices = () => {
        const voices = synthesisRef.current?.getVoices() || [];
        // Pin strictly to a single consistent female voice across reloads
        const politeFemaleVoice = voices.find(v => 
          /google us english female|microsoft jenny|aria.*natural|samantha/i.test(v.name) && v.lang.startsWith('en')
        ) || voices.find(v => 
          /female|woman/i.test(v.name) && !/zira|desktop/i.test(v.name) && v.lang.startsWith('en')
        ) || voices[0] || null;

        if (politeFemaleVoice) {
          femaleVoiceRef.current = politeFemaleVoice;
        }
      };

      loadVoices();
      if (synthesisRef.current.onvoiceschanged !== undefined) {
        synthesisRef.current.onvoiceschanged = loadVoices;
      }
    }
  }, []);

  // Clean raw markdown text for natural, accurate speech pronunciation
  const cleanTextForSpeech = (text: string): string => {
    let clean = text
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}🌸✨🚀💻📱🤖🎓⚡✅]/gu, '')
      .replace(/[*_#`~•]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/https?:\/\/\S+/g, '')
      .trim();

    // Specific phonetic formatting for email addresses (e.g. ad.tech.enterprises.pvt.ltd@gmail.com -> A D Tech Enterprises Private Limited at gmail dot com)
    clean = clean.replace(/([a-zA-Z0-9.\-_]+)@([a-zA-Z0-9.\-_]+)/gi, (match: string, username: string, domain: string) => {
      let cleanUser = username
        .replace(/\./g, ' ')
        .replace(/hradtech/gi, 'H R A D Tech ')
        .replace(/adtech/gi, 'A D Tech ')
        .replace(/\bad\b/gi, 'A D')
        .replace(/\btech\b/gi, 'Tech')
        .replace(/enterprises/gi, 'Enterprises')
        .replace(/che/gi, ' ')
        .replace(/pvtltd/gi, 'Private Limited')
        .replace(/\bpvt\b/gi, 'Private')
        .replace(/\bltd\b/gi, 'Limited')
        .replace(/\bhr\b/gi, 'H R');

      let cleanDomain = domain.replace(/\./g, ' dot ');
      return `${cleanUser} at ${cleanDomain}`;
    });

    // Format phone numbers digit-by-digit for clear speech (e.g. +91 83193 58568 -> plus 9 1, 8 3 1 9 3, 5 8 5 6 8)
    clean = clean.replace(/(\+\d{1,3})?\s*(\d{5})\s*(\d{5})/g, (m: string, country: string | undefined, p1: string, p2: string) => {
      const countryStr = country ? `plus ${country.replace('+', '').split('').join(' ')}, ` : '';
      const part1 = p1.split('').join(' ');
      const part2 = p2.split('').join(' ');
      return `${countryStr}${part1}, ${part2}`;
    });

    // Expand company & legal abbreviations phonetically
    clean = clean
      .replace(/\bpvt\.?\s*ltd\.?\b/gi, 'Private Limited')
      .replace(/\bltd\.?\b/gi, 'Limited')
      .replace(/\bpvt\.?\b/gi, 'Private')
      .replace(/\binc\.?\b/gi, 'Incorporated')
      .replace(/\bcorp\.?\b/gi, 'Corporation')
      .replace(/\bad\s*tech\b/gi, 'A D Tech')
      .replace(/\badtech\b/gi, 'A D Tech');

    // Expand departmental & tech acronyms letter-by-letter for clear TTS
    clean = clean
      .replace(/\bandroid\/ios\b/gi, 'Android or i O S')
      .replace(/\bui\/ux\b/gi, 'U I or U X')
      .replace(/\bresume\s*\/\s*cv\b/gi, 'Resume or C V')
      .replace(/\bcv\b/gi, 'C V')
      .replace(/\bhr\b/gi, 'H R')
      .replace(/\bpr\b/gi, 'P R')
      .replace(/\bui\b/gi, 'U I')
      .replace(/\bux\b/gi, 'U X')
      .replace(/\bai\b/gi, 'Ay Eye')
      .replace(/\blms\b/gi, 'L M S')
      .replace(/\bev\b/gi, 'E V')
      .replace(/\bqa\b/gi, 'Q A')
      .replace(/\bapis\b/gi, 'A P Is')
      .replace(/\bapi\b/gi, 'A P I')
      .replace(/\bfaqs\b/gi, 'F A Qs')
      .replace(/\bfaq\b/gi, 'F A Q')
      .replace(/\bemi\b/gi, 'E M I')
      .replace(/\bceo\b/gi, 'C E O')
      .replace(/\bcto\b/gi, 'C T O')
      .replace(/\bcfo\b/gi, 'C F O');

    return clean.replace(/\s+/g, ' ').trim();
  };

  const speechIdRef = useRef(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const activeAudioSourceRef = useRef<AudioBufferSourceNode | null>(null);

  // Unlock AudioContext on first user interaction (required by browser autoplay policy)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const unlock = () => {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume().catch(() => {});
      }
      window.removeEventListener('click', unlock);
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('keydown', unlock);
    };
    window.addEventListener('click', unlock);
    window.addEventListener('touchstart', unlock);
    window.addEventListener('keydown', unlock);
    return () => {
      window.removeEventListener('click', unlock);
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, []);

  const isSpeakingRef = useRef(false);

  const setSpeakingState = (speaking: boolean) => {
    isSpeakingRef.current = speaking;
    setIsSpeaking(speaking);
  };

  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetSilenceTimeout = () => {
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
    }
    // Automatically close microphone if 2.5 seconds pass without speech/sound
    silenceTimeoutRef.current = setTimeout(() => {
      if (isMicActiveRef.current && !isSpeakingRef.current) {
        stopMicrophone();
        setVoiceStatus('idle');
      }
    }, 2500);
  };

  const stopMicrophone = () => {
    isMicActiveRef.current = false;
    setIsListening(false);
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }
    if (speechDebounceTimerRef.current) {
      clearTimeout(speechDebounceTimerRef.current);
      speechDebounceTimerRef.current = null;
    }
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }
  };

  const stopAudio = () => {
    speechIdRef.current++;
    if (activeAudioSourceRef.current) {
      try {
        activeAudioSourceRef.current.stop();
        activeAudioSourceRef.current.disconnect();
      } catch (e) {}
      activeAudioSourceRef.current = null;
    }
    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current.currentTime = 0;
      activeAudioRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingState(false);
  };

  // Speak Asha's response — ElevenLabs premium voice first, browser TTS as silent fallback only
  const speakAshaResponse = async (rawText: string, onStart?: () => void, isFromVoice: boolean = true) => {
    if (!isVoiceEnabled || !isFromVoice) {
      if (onStart) onStart();
      return;
    }
    stopAudio();
    stopMicrophone();

    const currentId = speechIdRef.current;
    const cleanText = cleanTextForSpeech(rawText);
    if (!cleanText) {
      if (onStart) onStart();
      return;
    }

    let hasTriggeredOnStart = false;
    const triggerOnStartOnce = () => {
      if (!hasTriggeredOnStart) {
        hasTriggeredOnStart = true;
        if (onStart) onStart();
      }
    };

    // Browser Web Speech — only used if ElevenLabs API fails
    const fallbackWebSpeech = () => {
      if (currentId !== speechIdRef.current || !synthesisRef.current) {
        setSpeakingState(false);
        triggerOnStartOnce();
        return;
      }
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(cleanText);
        if (femaleVoiceRef.current) utterance.voice = femaleVoiceRef.current;
        utterance.pitch = 1.0;
        utterance.rate = 1.0;
        utterance.onstart = () => {
          if (currentId === speechIdRef.current) {
            setSpeakingState(true);
            setVoiceStatus('speaking');
            triggerOnStartOnce();
          }
        };
        utterance.onend = () => {
          setSpeakingState(false);
          setVoiceStatus('idle');
          if (isConversationModeRef.current && recognitionRef.current && !isMicActiveRef.current) {
            setTimeout(() => {
              if (isConversationModeRef.current && !isSpeakingRef.current) {
                isMicActiveRef.current = true;
                setVoiceStatus('listening');
                try { recognitionRef.current?.start(); } catch (e) {}
              }
            }, 400);
          }
        };
        utterance.onerror = () => { setSpeakingState(false); triggerOnStartOnce(); };
        if (currentId === speechIdRef.current) {
          synthesisRef.current.speak(utterance);
        }
      } catch (e) {
        setSpeakingState(false);
        triggerOnStartOnce();
      }
    };

    // ── Primary: ElevenLabs via /api/voice ──
    try {
      const response = await fetch('/api/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleanText }),
      });

      if (currentId !== speechIdRef.current) { triggerOnStartOnce(); return; }

      if (response.ok) {
        const arrayBuffer = await response.arrayBuffer();
        if (currentId !== speechIdRef.current) { triggerOnStartOnce(); return; }

        const AudioContextClass = typeof window !== 'undefined'
          ? (window.AudioContext || (window as any).webkitAudioContext)
          : null;

        if (AudioContextClass) {
          if (!audioCtxRef.current) audioCtxRef.current = new AudioContextClass();
          const audioCtx = audioCtxRef.current;
          if (audioCtx.state === 'suspended') await audioCtx.resume();

          audioCtx.decodeAudioData(arrayBuffer, (decodedBuffer) => {
            if (currentId !== speechIdRef.current) { triggerOnStartOnce(); return; }

            // 350ms silence pad so the DAC has time to un-mute
            const sampleRate = decodedBuffer.sampleRate;
            const nCh = decodedBuffer.numberOfChannels;
            const pad = Math.floor(sampleRate * 0.35);
            const padded = audioCtx.createBuffer(nCh, decodedBuffer.length + pad, sampleRate);
            for (let ch = 0; ch < nCh; ch++) {
              padded.getChannelData(ch).set(decodedBuffer.getChannelData(ch), pad);
            }

            const source = audioCtx.createBufferSource();
            source.buffer = padded;
            source.connect(audioCtx.destination);
            activeAudioSourceRef.current = source;
            source.onended = () => {
              setSpeakingState(false);
              setVoiceStatus('idle');
              activeAudioSourceRef.current = null;
              if (isConversationModeRef.current && recognitionRef.current && !isMicActiveRef.current) {
                setTimeout(() => {
                  if (isConversationModeRef.current && !isSpeakingRef.current) {
                    isMicActiveRef.current = true;
                    setVoiceStatus('listening');
                    try { recognitionRef.current?.start(); } catch (e) {}
                  }
                }, 400);
              }
            };
            setSpeakingState(true);
            setVoiceStatus('speaking');
            triggerOnStartOnce();
            // Stop mic so it doesn't pick up Asha's voice and cancel playback
            stopMicrophone();
            source.start(0);
          }, () => {
            // Audio decode failed → fall back to browser TTS
            fallbackWebSpeech();
          });
          return;
        }
      }
      // API returned non-ok (quota/error) → fall back to browser TTS
      fallbackWebSpeech();
    } catch (e) {
      // Network error → fall back to browser TTS
      fallbackWebSpeech();
    }
  };

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

  // Listen for open-asha-voice and open-chat-widget custom events from Navbar / pages
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOpenTrigger = () => {
      setIsOpen(true);
      setUnreadCount(0);
      triggerEntranceGreetingOnce();
    };

    window.addEventListener('open-asha-voice', handleOpenTrigger);
    window.addEventListener('open-chat-widget', handleOpenTrigger);

    return () => {
      window.removeEventListener('open-asha-voice', handleOpenTrigger);
      window.removeEventListener('open-chat-widget', handleOpenTrigger);
    };
  }, []);

  const handleSendMessageRef = useRef<(text?: string, isFromVoice?: boolean) => Promise<void>>(async () => {});
  const isMicActiveRef = useRef(false);

  const currentSpeechRef = useRef('');
  const speechDebounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastProcessedSpeechRef = useRef<{ text: string; time: number }>({ text: '', time: 0 });

  // Safe deduplicated speech submission helper
  const processSpeechOnce = (rawText: string) => {
    if (speechDebounceTimerRef.current) {
      clearTimeout(speechDebounceTimerRef.current);
      speechDebounceTimerRef.current = null;
    }
    const clean = rawText.trim();
    if (!clean || clean.length < 2) return;
    const now = Date.now();
    const lowerClean = clean.toLowerCase();
    
    // Prevent duplicate processing of the exact same phrase within 3 seconds
    if (lastProcessedSpeechRef.current.text === lowerClean && (now - lastProcessedSpeechRef.current.time) < 3000) {
      currentSpeechRef.current = '';
      return;
    }

    lastProcessedSpeechRef.current = { text: lowerClean, time: now };
    currentSpeechRef.current = '';

    // Stop mic FIRST so isMicActiveRef.current is false before state updates
    stopMicrophone();
    setInputMessage('');

    if (handleSendMessageRef.current) {
      handleSendMessageRef.current(clean, true);
    }
  };

  // Initialize Speech Recognition for Voice Input (STT) & Real-Time Phrase Listener
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false; // Fast instant phrase finalization (0ms lag)
        rec.interimResults = true;
        rec.lang = 'en-US';

        rec.onstart = () => {
          setIsListening(true);
          setVoiceStatus('listening');
          currentSpeechRef.current = '';
          resetSilenceTimeout();
        };

        rec.onspeechstart = () => {
          if (!isSpeakingRef.current) {
            stopAudio();
            resetSilenceTimeout();
          }
        };

        rec.onsoundstart = () => {
          if (!isSpeakingRef.current) {
            stopAudio();
            resetSilenceTimeout();
          }
        };

        rec.onend = () => {
          setIsListening(false);
          if (silenceTimeoutRef.current) {
            clearTimeout(silenceTimeoutRef.current);
            silenceTimeoutRef.current = null;
          }
          // Process any lingering speech transcript ONLY if mic was still actively active
          if (isMicActiveRef.current && currentSpeechRef.current && currentSpeechRef.current.trim().length >= 2) {
            processSpeechOnce(currentSpeechRef.current);
          }
          currentSpeechRef.current = '';

          // Restart listener ONLY if user is in continuous conversation mode AND mic toggled ON AND NOT speaking
          if (isConversationModeRef.current && isMicActiveRef.current && isVoiceEnabled && !isSpeakingRef.current) {
            setTimeout(() => {
              if (isConversationModeRef.current && isMicActiveRef.current && recognitionRef.current && !isSpeakingRef.current) {
                try {
                  recognitionRef.current.start();
                } catch (err) {
                  // Ignore silent restart errors
                }
              }
            }, 300);
          }
        };

        rec.onerror = (e: any) => {
          setIsListening(false);
          if (silenceTimeoutRef.current) {
            clearTimeout(silenceTimeoutRef.current);
            silenceTimeoutRef.current = null;
          }
          if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
            isMicActiveRef.current = false;
            setVoiceStatus('idle');
            setPopText("🎙️ Mobile Mic requires HTTPS/Localhost. Type your prompt below!");
            setShowPopBubble(true);
          } else if (isMicActiveRef.current && isVoiceEnabled && !isSpeakingRef.current) {
            setTimeout(() => {
              if (isMicActiveRef.current && recognitionRef.current && !isSpeakingRef.current) {
                try { recognitionRef.current.start(); } catch (err) {}
              }
            }, 1000);
          }
        };

        rec.onresult = (e: any) => {
          // Ignore any results if mic is no longer active or Asha is speaking
          if (!isMicActiveRef.current || isSpeakingRef.current) return;
          stopAudio();
          resetSilenceTimeout();
          
          let combinedTranscript = '';
          for (let i = 0; i < e.results.length; ++i) {
            combinedTranscript += e.results[i][0].transcript;
          }
          const cleanTranscript = combinedTranscript.trim();
          if (!cleanTranscript || !isMicActiveRef.current) return;

          currentSpeechRef.current = cleanTranscript;
          setShowPopBubble(true);
          setPopText(`🎙️ "${cleanTranscript}"`);
          setInputMessage(cleanTranscript);

          // Clear previous silence timer
          if (speechDebounceTimerRef.current) {
            clearTimeout(speechDebounceTimerRef.current);
          }

          // If Chrome finalized the result or user stopped talking for 750ms, auto-process speech immediately!
          const isFinal = e.results[e.results.length - 1]?.isFinal;
          if (isFinal) {
            processSpeechOnce(cleanTranscript);
          } else {
            speechDebounceTimerRef.current = setTimeout(() => {
              if (currentSpeechRef.current && isMicActiveRef.current) {
                processSpeechOnce(currentSpeechRef.current);
              }
            }, 750);
          }
        };
        recognitionRef.current = rec;
      } else {
        setSpeechSupported(false);
      }
    }
  }, [isVoiceEnabled]);

  const handleMicClick = () => {
    if (!speechSupported || !recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Try Google Chrome or Safari!");
      return;
    }
    stopAudio();
    try {
      if (isListening) {
        stopMicrophone();
        setVoiceStatus('idle');
        setPopText("🌸 \"Welcome! I'm Asha! How can I help you?\"");
      } else {
        isMicActiveRef.current = true;
        setIsListening(true);
        setVoiceStatus('listening');
        setShowPopBubble(true);
        setPopText("🎙️ Listening... Say 'Hey Asha' or your request!");
        resetSilenceTimeout();
        try { recognitionRef.current.start(); } catch (e) {}
      }
    } catch (err) {
      console.error("Speech recognition toggle:", err);
    }
  };

  // Instant Real-Human Voice Greeting for Initial Page Entrance
  const speakInstantGreeting = (text: string) => {
    if (typeof window === 'undefined' || !isVoiceEnabled) return;
    speakAshaResponse(text);
  };

  const hasGreetedRef = useRef(false);
  const hasMountedEntranceRef = useRef(false);
  const [showPopBubble, setShowPopBubble] = useState(false);
  const [popText, setPopText] = useState("🌸 \"Welcome! I'm Asha! How can I help you?\"");
  const [introStage, setIntroStage] = useState<'center' | 'completed'>('center');

  // Trigger initial voice greeting exactly ONCE per session/reload
  const triggerEntranceGreetingOnce = () => {
    if (!hasGreetedRef.current && isVoiceEnabled) {
      hasGreetedRef.current = true;
      speakInstantGreeting("Welcome! I am Asha! How can I assist you with AD TECH today?");
    }
  };

  // Center logo for 1.0s, then glide to corner and show greeting ONLY on home page load/refresh
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('adtech_asha_open');
    }

    if (hasMountedEntranceRef.current) return;
    hasMountedEntranceRef.current = true;

    // Always minimize chatbot window on page refresh/load so it rests at the right corner
    setIsOpen(false);

    // If user is on a subpage, position at corner immediately and DO NOT greet
    if (pathname !== '/') {
      setIntroStage('completed');
      setShowPopBubble(true);
      return;
    }

    // On Home Page ('/'): Animate widget to corner after 1s & trigger greeting
    const glideTimer = setTimeout(() => {
      setIntroStage('completed');
      setShowPopBubble(true);
      triggerEntranceGreetingOnce();
    }, 1000);

    // Trigger greeting on home page load
    triggerEntranceGreetingOnce();

    // Fallback interaction listener to unlock audio if browser autoplay blocks un-muted playback on home page
    const handleFirstUserInteraction = () => {
      triggerEntranceGreetingOnce();
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
    };

    window.addEventListener('click', handleFirstUserInteraction);
    window.addEventListener('touchstart', handleFirstUserInteraction);

    return () => {
      clearTimeout(glideTimer);
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
    };
  }, []);

  // Initialize and load chat history & auto theme detection
  useEffect(() => {
    const savedHistory = localStorage.getItem('adtech_chat_history');
    const savedTheme = localStorage.getItem('adtech_chat_theme');
    
    if (savedTheme) {
      setIsLightMode(savedTheme === 'light');
    } else if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches) {
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
        content: `Hi, I am **Asha**, your AI Assistant for **AD TECH Enterprises**! 🌸\n\nI can help you explore our services, developer internship programs, or submit project requirements. You can type your questions or tap the microphone to talk with me!\n\nHow may I assist you today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ['Our Services', 'Apply for Internship', 'Book a Callback', 'Submit Requirements', 'Hiring Process FAQ']
      };
      setMessages([welcomeMessage]);
      localStorage.setItem('adtech_chat_history', JSON.stringify([welcomeMessage]));
    }
  }, []);

  // Restore scroll position where user left off
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

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen && messagesContainerRef.current) {
      const timer = setTimeout(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTo({
            top: messagesContainerRef.current.scrollHeight,
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

  // Minimize chat
  const toggleChat = () => {
    if (isOpen) {
      stopAudio();
    }
    setIsOpen(!isOpen);
    setUnreadCount(0);
    setPopText("🌸 \"Welcome! I'm Asha! How can I help you?\"");
    setShowPopBubble(true);
  };

  // Close chat
  const handleCloseChat = () => {
    stopAudio();
    savedScrollTopRef.current = 0;
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = 0;
    }
    setIsOpen(false);
    setUnreadCount(0);
    // Reset pop bubble back to clean greeting message only
    setPopText("🌸 \"Welcome! I'm Asha! How can I help you?\"");
    setShowPopBubble(true);
  };

  // Toggle Theme
  const toggleTheme = () => {
    const newTheme = !isLightMode;
    setIsLightMode(newTheme);
    localStorage.setItem('adtech_chat_theme', newTheme ? 'light' : 'dark');
  };

  // Toggle Voice Output Mute
  const toggleVoiceOutput = () => {
    const nextState = !isVoiceEnabled;
    setIsVoiceEnabled(nextState);
    if (!nextState) {
      stopAudio();
    }
  };

  // Handle Text/Voice Submission
  const handleSendMessage = async (textToSend?: string, isFromVoice: boolean = false) => {
    stopAudio();
    stopMicrophone();
    const rawText = (textToSend || inputMessage).trim();
    if (!rawText) return;

    setInputMessage('');

    // Strip punctuation for bulletproof matching
    const lower = rawText.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").trim();

    // Phonetic & Fuzzy Wake-Word Matcher (catches 'asha', 'asia', 'aisha', 'ayasha', 'a sha', 'ash', 'isha')
    const isWakeWordSpoken = 
      /\b(asha|asia|aisha|ayasha|a\s*sha|ash|isha)\b/i.test(lower) ||
      lower.includes('asha') || lower.includes('asia') || lower.includes('aisha') || lower.includes('hey asha');

    // Extract query portion after wake word ("hey asha", "hi asha", "hello asha", "asha", "ok asha", "asia", "aisha")
    const cleanQuery = lower
      .replace(/^(hey|hi|hello|okay|ok)\s*(asha|asia|aisha|ayasha|a\s*sha|ash|isha)\b/i, '')
      .replace(/^(asha|asia|aisha|ayasha|a\s*sha|ash|isha)\b/i, '')
      .trim();

    const targetText = cleanQuery.length > 0 ? cleanQuery : lower;

    // Check if prompt contains question words or business query context
    const isQuestionOrQuery = 
      /\b(if|how|what|why|where|when|can|will|should|could|would|is|are|do|does|did)\b/i.test(lower) || 
      lower.includes('?') || lower.includes('help') || lower.includes('company') || lower.includes('business') || 
      lower.includes('store') || lower.includes('shop') || lower.includes('open a') || lower.includes('start a') ||
      rawText.split(/\s+/).length >= 5;

    // SCROLL COMMANDS — handled instantly before route matching
    const isScrollDown = /\b(scroll down|scroll page down|page down|go down|move down)\b/i.test(lower);
    const isScrollUp = /\b(scroll up|scroll page up|page up|go up|move up|back to top|top of page)\b/i.test(lower);
    if (isScrollDown || isScrollUp) {
      const scrollAmount = isScrollDown ? 400 : -400;
      const userMsg: Message = {
        id: `msg-${Date.now()}-user`, role: 'user', content: rawText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const reply = isScrollDown ? 'Scrolling down for you!' : 'Scrolling up for you!';
      const assistantMsg: Message = {
        id: `msg-${Date.now()}-assistant`, role: 'assistant', content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, userMsg, assistantMsg]);
      speakAshaResponse(reply, undefined, isFromVoice);
      window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
      return;
    }

    // GO BACK / PREVIOUS PAGE COMMANDS (Excludes 'call back' / 'callback' requests)
    const isCallbackRequest = lower.includes('callback') || lower.includes('call back');
    const isGoBack = !isCallbackRequest && (
      targetText === 'go back' || targetText === 'back' || targetText === 'previous page' ||
      /\b(go back|previous page|go to previous page|navigate back|take me back|return to previous page|go back page|back page)\b/i.test(targetText) ||
      /\b(go back|previous page|go to previous page|navigate back|take me back|return to previous page|go back page|back page)\b/i.test(lower)
    );
    if (isGoBack) {
      const userMsg: Message = {
        id: `msg-${Date.now()}-user`, role: 'user', content: rawText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const reply = 'Going back for you!';
      const assistantMsg: Message = {
        id: `msg-${Date.now()}-assistant`, role: 'assistant', content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, userMsg, assistantMsg]);
      speakAshaResponse(reply, undefined, isFromVoice);
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('adtech_asha_open', 'true');
          setIsOpen(true);
          if (window.history.length > 1) {
            router.back();
          } else {
            router.push('/');
          }
        }
      }, 300);
      return;
    }

    // A PURE redirect command — catches all natural navigation phrases
    const isPureRedirectCommand = !isQuestionOrQuery && (
      /\b(redirect|take|open|go|navigate|show|visit|launch|bring|load|switch)\b/i.test(lower) ||
      lower.startsWith('open ') || lower.startsWith('go to ') || lower.startsWith('take me to ') ||
      lower.startsWith('show me ') || lower.startsWith('navigate to ') || lower.startsWith('visit ') ||
      lower.includes('page') || lower.includes('section') ||
      lower === 'home' || lower === 'intern portal' || lower === 'inter portal' ||
      lower === 'services' || lower === 'contact' || lower === 'careers' ||
      lower === 'faq' || lower === 'about' || lower === 'callback'
    );

    const normalizedLower = normalizeQueryTypos(lower);

    let matchingRoute: string | null = null;
    let matchingRedirectText: string | null = null;

    const isInternPortal =
      lower.includes('intern portal') || lower.includes('inter portal') ||
      lower.includes('enter portal') || lower.includes('internship portal') ||
      lower.includes('intern login') ||
      (lower.includes('intern') && lower.includes('portal')) ||
      (lower.includes('inter') && lower.includes('portal')) ||
      /\b(redirect|take|open|go|navigate|show)\b.*(intern\s*portal|inter\s*portal|portal)\b/i.test(lower);

    const isPraise =
      lower.includes('good job') || lower.includes('great job') || lower.includes('nice job') ||
      lower.includes('well done') || lower.includes('awesome') || lower.includes('thank you') ||
      lower.includes('thanks') || lower === 'good' || lower === 'great' || lower === 'nice';

    if (isPraise) {
      matchingRoute = null;
      matchingRedirectText = null;

    } else if (isInternPortal) {
      matchingRoute = '/intern-portal';
      matchingRedirectText = 'Sure! Opening the Intern Portal for you!';

    // HOME
    } else if (
      /\b(home|main|landing|homepage|home\s*page)\b/i.test(lower) ||
      lower === 'go home' || lower.includes('go back home') || lower.includes('take me home') ||
      lower.includes('back to home') || lower.includes('main page')
    ) {
      matchingRoute = '/';
      matchingRedirectText = 'Taking you home!';

    // SERVICES / CASE STUDIES / PORTFOLIO
    } else if (
      /\b(service|services|sevice|sevices|web dev|web development|app development|android|ios|lms|ev software|ai solutions|software|tech stack|website|web app|mobile app|build|e-commerce|furniture|restaurant|hotel|clinic|hospital|real estate|retail|store|saas|dashboard|platform|case stud|portfolio|our work|what you do|what do you do)\b/i.test(lower) ||
      lower.includes('service') || lower.includes('sevice') || normalizedLower.includes('service') ||
      lower.includes('case stud') || lower.includes('portfolio') || lower.includes('our work') || lower.includes('show services')
    ) {
      matchingRoute = '/services';
      matchingRedirectText = 'Opening Services for you! You can explore all our software solutions here.';

    // ABOUT / COMPANY INFO
    } else if (
      /\b(about|company|vision|mission|who are|who is adtech|tell me about|adtech story|our team|team members|leadership)\b/i.test(lower) ||
      lower === 'about us' || lower.includes('about adtech') || lower.includes('tell me about adtech') ||
      lower.includes('adtech team') || lower.includes('contact team') || lower.includes('meet the team')
    ) {
      matchingRoute = '/about';
      matchingRedirectText = 'Opening the About AD TECH page! Here you can learn our story, team, and vision.';

    // CONTACT
    } else if (
      /\b(contact|reach|email|phone|location|office|address|get in touch|reach out|connect|contact team)\b/i.test(lower) ||
      lower.includes('contact') || lower.includes('reach us') || lower.includes('get in touch')
    ) {
      matchingRoute = '/contact';
      matchingRedirectText = 'Opening the Contact page! Our team is ready to connect with you.';

    // CAREERS / INTERNSHIP
    } else if (
      /\b(career|careers|carrier|carriers|carrerr|carrer|carear|kareer|kareers|internship|internships|apply|hiring|stipend|job|jobs|joining|student|intern|interview|resume|work with us|join us|open internship|open position)\b/i.test(lower) ||
      lower.includes('apply') || lower.includes('internship') || lower.includes('career') || lower.includes('carrier') || lower.includes('carrerr') || lower.includes('carrer') ||
      normalizedLower.includes('internship') || normalizedLower.includes('career') || normalizedLower.includes('careers') ||
      lower.includes('open internship') || lower.includes('work with')
    ) {
      matchingRoute = '/careers';
      matchingRedirectText = 'Opening Careers and Internships! Check out all open positions here.';

    // REQUIREMENTS / QUOTE
    } else if (
      /\b(requirement|requirements|quote|scope|budget|hire|pricing|cost|estimate|proposal|start a project|new project|build for me)\b/i.test(lower) ||
      lower.includes('requirement') || lower.includes('get a quote') || lower.includes('price') ||
      lower.includes('how much') || lower.includes('start project') || lower.includes('build for me')
    ) {
      matchingRoute = '/submit-requirement';
      matchingRedirectText = 'Opening Submit Requirement! Tell us about your project.';

    // BOOK A CALL / DISCOVERY CALL
    } else if (
      /\b(callback|call\s*back|call|schedule call|book call|phone call|discovery call|book discovery|schedule a call|talk to team|book a meeting|meeting|schedule meeting)\b/i.test(lower) ||
      lower.includes('callback') || lower.includes('call back') || lower.includes('book a call') ||
      lower.includes('discovery call') || lower.includes('book discovery') || lower.includes('schedule call')
    ) {
      matchingRoute = '/callback';
      matchingRedirectText = 'Booking a discovery call! Our team will connect with you shortly.';

    // FAQ
    } else if (
      /\b(faq|faqs|frequently|questions|common questions|help center)\b/i.test(lower) ||
      lower === 'faq' || lower.includes('frequently asked') || lower.includes('open faq')
    ) {
      matchingRoute = '/faq';
      matchingRedirectText = 'Opening FAQs! Find answers to the most common questions here.';
    }

    // PURE DIRECT REDIRECT COMMAND → Navigate immediately without waiting for RAG
    if (isPureRedirectCommand && matchingRoute && matchingRedirectText) {
      if (!textToSend) setInputMessage('');
      stopAudio();

      setPopText(`🚀 "${matchingRedirectText}"`);
      setShowPopBubble(true);
      if (isFromVoice) {
        setVoiceStatus('speaking');
      }

      const userMsg: Message = {
        id: `msg-${Date.now()}-user`, role: 'user', content: rawText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const assistantMsg: Message = {
        id: `msg-${Date.now()}-assistant`, role: 'assistant', content: matchingRedirectText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      speakAshaResponse(matchingRedirectText, () => {
        saveHistory([...messages, userMsg, assistantMsg]);
      }, isFromVoice);

      const targetPath = matchingRoute;
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('adtech_asha_open', 'true');
          setIsOpen(true);
          router.push(targetPath);
        }
      }, 300);
      return;
    }

    if (!textToSend) setInputMessage('');
    stopAudio();

    // Wake word only or short greeting ("hey asha", "asha")
    const isJustWakeWord = isWakeWordSpoken && targetText.length <= 2;

    if (isJustWakeWord) {
      const greetingReply = "Yes, I'm here! How can I assist you with AD TECH today?";
      setPopText(`🌸 "${greetingReply}"`);
      setShowPopBubble(true);

      const userMsg: Message = {
        id: `msg-${Date.now()}-user`,
        role: 'user',
        content: rawText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const assistantMsg: Message = {
        id: `msg-${Date.now()}-assistant`,
        role: 'assistant',
        content: greetingReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ['Our Services', 'Internship Portal', 'Book a Callback']
      };
      
      speakAshaResponse(greetingReply, () => {
        saveHistory([...messages, userMsg, assistantMsg]);
      }, isFromVoice);
      return;
    }

    // Standard RAG query execution for Questions (e.g. "how can I apply for internship?")
    const userMsg: Message = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content: rawText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMsg];
    saveHistory(updatedMessages);
    setIsTyping(true);
    setPopText("💬 Thinking...");
    setShowPopBubble(true);
    setVoiceStatus('thinking');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: rawText,
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
      if (rawText.toLowerCase().includes('service')) {
        suggestions = ['Book a Callback', 'Submit Requirements'];
      } else if (rawText.toLowerCase().includes('intern') || rawText.toLowerCase().includes('career')) {
        suggestions = ['Hiring Process FAQ', 'Contact Us'];
      } else {
        suggestions = ['Our Services', 'Book a Callback', 'Apply for Internship'];
      }

      const responseContent = data.response || "I apologize, I encountered a communication error. Please try again.";

      const assistantMsg: Message = {
        id: `msg-${Date.now()}-assistant`,
        role: 'assistant',
        content: responseContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions
      };

      // Clean raw text formatting for concise display in speech pop bubble
      const cleanPop = responseContent
        .replace(/[*_#`~•]/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/\n+/g, ' ')
        .trim();
      const truncatedPop = cleanPop.slice(0, 130) + (cleanPop.length > 130 ? '...' : '');

      speakAshaResponse(responseContent, () => {
        setIsTyping(false);
        saveHistory([...updatedMessages, assistantMsg]);
        setPopText("🌸 \"Welcome! I'm Asha! How can I help you?\"");
        setShowPopBubble(true);
      }, isFromVoice);

      // DUAL ACTION: If question matches a specific page destination (e.g. Services page for 'what services you provide'), open page immediately!
      if (matchingRoute) {
        const targetPath = matchingRoute;
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('adtech_asha_open', 'true');
          setIsOpen(true);
          router.push(targetPath);
        }
      }
    } catch (e) {
      console.error(e);
      setApiMode('offline');
      const errorContent = "I'm having trouble connecting to the network right now. You can email our support team directly at **" + EMAIL + "** or call **" + PHONE + "**.";
      const errorMsg: Message = {
        id: `msg-${Date.now()}-error`,
        role: 'assistant',
        content: errorContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ['Our Services', 'Book a Callback']
      };
      speakAshaResponse(errorContent, () => {
        setIsTyping(false);
        saveHistory([...updatedMessages, errorMsg]);
        setPopText(`🌸 "${errorContent.slice(0, 100)}..."`);
        setShowPopBubble(true);
      }, isFromVoice);
    }
  };

  // Keep handleSendMessageRef synchronized with the latest handleSendMessage closure across renders
  useEffect(() => {
    handleSendMessageRef.current = handleSendMessage;
  });

  // Handle Quick Actions & Recommendation Chips
  const handleQuickAction = (action: string) => {
    stopAudio();

    if (action === 'Our Services') {
      sessionStorage.setItem('adtech_asha_open', 'true');
      setIsOpen(true);
      router.push('/services');

      const userMsg: Message = {
        id: `action-${Date.now()}-u`,
        role: 'user',
        content: "Tell me about AD TECH's services.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const textContent = `We offer tailored web development, mobile applications, and artificial intelligence solutions:\n\n1. 💻 **Web Application Development**: Responsive sites, enterprise dashboards & SaaS platforms.\n2. 📱 **Android & iOS Mobile Apps**: Native high-performance mobile apps.\n3. 🤖 **AI Automations & Agents**: Custom chatbots, Gemini AI integrations, and RAG pipelines.\n4. 🎓 **Learning Management Systems (LMS)**: Student & teacher portals with progress analytics.\n5. ⚡ **EV Installment Software**: Financing, EMI tracking, and inventory dashboards.`;
      const assistantMsg: Message = {
        id: `action-${Date.now()}-a`,
        role: 'assistant',
        content: textContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ['Book a Callback', 'Submit Requirements']
      };

      const historyWithUser = [...messages, userMsg];
      saveHistory(historyWithUser);
      setIsTyping(true);

      speakAshaResponse(textContent, () => {
        setIsTyping(false);
        saveHistory([...historyWithUser, assistantMsg]);
      }, false);
    } 
    else if (action === 'Apply for Internship') {
      sessionStorage.setItem('adtech_asha_open', 'true');
      setIsOpen(true);
      router.push('/careers');

      const userMsg: Message = {
        id: `action-${Date.now()}-u`,
        role: 'user',
        content: "How can I apply for an internship?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const textContent = `Our Developer Internship Program places candidates in real-world 5-day evaluation sprints across AI, Frontend, and Backend roles.\n\nTo apply, please submit your resume and GitHub portfolio to: **${EMAIL}** or call **${PHONE}**.`;
      const assistantMsg: Message = {
        id: `action-${Date.now()}-a`,
        role: 'assistant',
        content: textContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ['Hiring Process FAQ', 'Contact Us']
      };

      const historyWithUser = [...messages, userMsg];
      saveHistory(historyWithUser);
      setIsTyping(true);

      speakAshaResponse(textContent, () => {
        setIsTyping(false);
        saveHistory([...historyWithUser, assistantMsg]);
      }, false);
    }
    else if (action === 'Book a Callback') {
      sessionStorage.setItem('adtech_asha_open', 'true');
      setIsOpen(true);
      router.push('/callback');

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

      const historyWithUser = [...messages, userMsg];
      saveHistory(historyWithUser);
      setIsTyping(true);

      speakAshaResponse("Please provide your details below so that our tech advisory team can schedule a callback for you.", () => {
        setIsTyping(false);
        saveHistory([...historyWithUser, formMsg]);
      }, false);
    }
    else if (action === 'Submit Requirements') {
      sessionStorage.setItem('adtech_asha_open', 'true');
      setIsOpen(true);
      router.push('/submit-requirement');

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

      const historyWithUser = [...messages, userMsg];
      saveHistory(historyWithUser);
      setIsTyping(true);

      speakAshaResponse("Please fill out our Project Scope Form below to receive a custom quote.", () => {
        setIsTyping(false);
        saveHistory([...historyWithUser, formMsg]);
      }, false);
    }
    else if (action === 'Hiring Process FAQ') {
      sessionStorage.setItem('adtech_asha_open', 'true');
      setIsOpen(true);
      router.push('/faq');

      const userMsg: Message = {
        id: `action-${Date.now()}-u`,
        role: 'user',
        content: "What is the hiring process?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const matched = KNOWLEDGE_BASE.find(k => k.category === 'hiring');
      const textContent = matched ? matched.answer : "Our hiring process is: Resume screening -> Practical tech assignment -> Technical Interview -> HR interview.";
      const assistantMsg: Message = {
        id: `action-${Date.now()}-a`,
        role: 'assistant',
        content: textContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ['Apply for Internship', 'Contact Us']
      };

      const historyWithUser = [...messages, userMsg];
      saveHistory(historyWithUser);
      setIsTyping(true);

      speakAshaResponse(textContent, () => {
        setIsTyping(false);
        saveHistory([...historyWithUser, assistantMsg]);
      }, false);
    }
    else if (action === 'Contact Us') {
      sessionStorage.setItem('adtech_asha_open', 'true');
      setIsOpen(true);
      router.push('/contact');

      const userMsg: Message = {
        id: `action-${Date.now()}-u`,
        role: 'user',
        content: "How do I contact you?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const matched = KNOWLEDGE_BASE.find(k => k.category === 'contact');
      const textContent = matched ? matched.answer : `You can email us at ${EMAIL} or call ${PHONE}.`;
      const assistantMsg: Message = {
        id: `action-${Date.now()}-a`,
        role: 'assistant',
        content: textContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ['Book a Callback', 'Our Services']
      };

      const historyWithUser = [...messages, userMsg];
      saveHistory(historyWithUser);
      setIsTyping(true);

      speakAshaResponse(textContent, () => {
        setIsTyping(false);
        saveHistory([...historyWithUser, assistantMsg]);
      }, false);
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

    const successContent = `✅ **Callback Request Submitted!**\n\nThank you, **${callbackForm.name}**. We have logged your request under phone number **${callbackForm.phone}**.\n\nAn AD TECH advisor will contact you within 24 hours at your email **${callbackForm.email || 'N/A'}** or phone.`;
    const successMsg: Message = {
      id: `callback-success-${Date.now()}`,
      role: 'assistant',
      content: successContent,
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
    speakAshaResponse(`Thank you ${callbackForm.name}, your callback request has been submitted successfully.`, undefined, false);
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

    const successContent = `✅ **Project Scope Submitted!**\n\nThank you, **${reqForm.name}** of **${reqForm.company || 'Personal Project'}**.\n\nOur solutions architect will analyze your scope and budget preference (**$${reqForm.budget}**) and reach out shortly.`;
    const successMsg: Message = {
      id: `req-success-${Date.now()}`,
      role: 'assistant',
      content: successContent,
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
    speakAshaResponse(`Thank you ${reqForm.name}, your project scope has been submitted successfully.`, undefined, false);
  };

  return (
    <>
      {/* Orb Launcher — uses bottom/right for both states so CSS can interpolate smoothly */}
      <div 
        suppressHydrationWarning
        aria-label="Asha AI Assistant Widget"
        className={`fixed z-[9999] ${isLightMode ? 'light' : ''}`}
        style={{
          bottom: introStage === 'center' && !isOpen ? 'calc(50vh - 60px)' : '24px',
          right: introStage === 'center' && !isOpen ? 'calc(50vw - 60px)' : '24px',
          transition: introStage === 'center' ? 'none' : 'bottom 1.2s cubic-bezier(0.22, 1, 0.36, 1), right 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
      
      {/* 1. Floating Trigger Button with Auto-Pop Speech Bubble */}
      {!isOpen && (
        <div className="relative flex items-center">
          {/* Auto-Popping Speech Bubble Banner — only after orb lands in corner */}
          {showPopBubble && introStage === 'completed' && (
            <div 
              onClick={toggleChat}
              className="absolute right-18 sm:right-22 bottom-2 z-40 flex flex-col items-end cursor-pointer group animate-fade-in-up min-w-[260px] max-w-[340px] sm:max-w-[420px]"
            >
              <div className="relative bg-gradient-to-r from-slate-900/95 via-[#0F172A]/95 to-indigo-950/95 border border-sky-400/60 text-slate-100 text-xs py-3 px-4 rounded-2xl rounded-br-none shadow-[0_0_25px_rgba(56,189,248,0.4)] flex items-center justify-between gap-3 backdrop-blur-md hover:border-sky-300 transition-all duration-300 group-hover:scale-105">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
                </span>
                <span className="font-semibold text-white tracking-wide text-xs leading-normal flex-1">
                  {popText}
                </span>
              </div>
            </div>
          )}

          <div 
            className="relative z-30"
            style={{
              transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
              transform: introStage === 'center' && !isOpen ? 'scale(1)' : 'scale(1)',
              animation: introStage === 'center' && !isOpen ? 'orbBreathe 2s ease-in-out infinite' : 'none',
            }}
          >
            <CreativeSiriOrb 
              isListening={isListening} 
              isSpeaking={isSpeaking} 
              size={introStage === 'center' && !isOpen ? 120 : 64} 
              onClick={toggleChat} 
            />

            {/* Unread notification badge — only after orb lands in corner */}
            {unreadCount > 0 && introStage === 'completed' && (
              <span className="absolute top-0 left-0 z-40 flex h-5.5 w-5.5 items-center justify-center rounded-full bg-red-500 text-[10px] font-extrabold text-white animate-pulse shadow-md pointer-events-none">
                {unreadCount}
              </span>
            )}
          </div>
        </div>
      )}

      {/* 2. Main Assistant Window */}
      {isOpen && (
        <>
          {/* CSS Keyframes injected once */}
          <style>{`
            @keyframes ashaWave {
              0%, 100% { height: 4px; }
              50% { height: 24px; }
            }
            @keyframes ashaSlideIn {
              from { opacity: 0; transform: translateY(16px) scale(0.97); }
              to   { opacity: 1; transform: translateY(0) scale(1); }
            }
            @keyframes ashaMsgIn {
              from { opacity: 0; transform: translateY(10px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes ashaMicRing {
              0%   { transform: scale(1);   opacity: 0.8; }
              100% { transform: scale(1.9); opacity: 0; }
            }
            @keyframes ashaThinkDot {
              0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
              40%            { transform: scale(1.1); opacity: 1; }
            }
            .asha-msg-in { animation: ashaMsgIn 0.3s cubic-bezier(0.22,1,0.36,1) both; }
          `}</style>

          <div
            ref={chatWindowRef}
            role="dialog"
            aria-modal="true"
            aria-label="Asha AI Assistant Window"
            style={{
              height: typeof window !== 'undefined' && window.innerWidth < 640 ? viewportHeight : undefined,
              animation: 'ashaSlideIn 0.35s cubic-bezier(0.22,1,0.36,1) both',
              boxShadow: '0 0 0 1px rgba(34,211,238,0.18), 0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(34,211,238,0.1)',
            }}
            className={`fixed inset-x-0 bottom-0 w-full h-[100dvh] max-h-[100dvh] sm:static sm:inset-auto sm:h-[85vh] sm:max-h-[660px] sm:w-[92vw] sm:max-w-[430px] flex flex-col overflow-hidden z-[9999] rounded-none sm:rounded-2xl
              ${ isLightMode
                ? 'bg-white/95 backdrop-blur-xl border border-slate-200 text-slate-800'
                : 'bg-gradient-to-b from-[#07101F]/98 via-[#0B1422]/98 to-[#060D1B]/98 backdrop-blur-2xl border border-cyan-500/15 text-slate-100'
              }`}
          >
          {/* Floating Mascot Siri Orb on iPad & PC */}
          <div className="absolute right-3 bottom-24 z-30 hidden md:block pointer-events-none opacity-60">
            <CreativeSiriOrb isListening={isListening} isSpeaking={isSpeaking} size={56} />
          </div>

          {/* ── Premium Header ─────────────────────────────── */}
          <div className={`flex items-center justify-between px-4 py-3 shrink-0 border-b relative overflow-hidden
            ${ isLightMode
              ? 'bg-gradient-to-r from-slate-50 via-white to-slate-50 border-slate-200'
              : 'bg-gradient-to-r from-[#07101F] via-[#0D1B35] to-[#07101F] border-cyan-500/10'
            }`}>

            {/* Ambient glow line at top */}
            {!isLightMode && (
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
            )}

            <div className="flex items-center gap-3">
              {/* Logo with ring glow */}
              <div className="relative shrink-0">
                <div className={`absolute inset-0 rounded-full blur-sm ${ isSpeaking ? 'bg-cyan-500/50' : isListening ? 'bg-red-500/40' : 'bg-cyan-500/20'} transition-all duration-500`} />
                <img src="/adtech-logo.png" className="h-8 w-8 object-contain relative z-10 drop-shadow-lg" alt="AD TECH" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold tracking-wide bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">Asha AI</h3>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-semibold border transition-all duration-300
                    ${ isSpeaking
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_8px_rgba(34,211,238,0.3)]'
                      : isListening
                      ? 'bg-red-500/20 text-red-300 border-red-500/40 shadow-[0_0_8px_rgba(239,68,68,0.3)]'
                      : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                    }`}>
                    { isSpeaking ? '🔊 Speaking' : isListening ? '🎙️ Listening' : '● Online' }
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">AD TECH Voice Assistant</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-0.5">
              {/* Voice Mode Toggle */}
              <button
                onClick={() => {
                  const next = !isConversationMode;
                  setIsConversationMode(next);
                  isConversationModeRef.current = next;
                  if (next) {
                    setIsVoiceEnabled(true);
                    if (!isListening) {
                      handleMicClick();
                    }
                  } else {
                    stopMicrophone();
                    setVoiceStatus('idle');
                  }
                }}
                aria-label={isConversationMode ? 'Disable Voice Mode' : 'Enable Voice Mode'}
                title={isConversationMode ? 'Voice Mode ON' : 'Enable Voice Mode'}
                className={`relative flex h-9 w-9 items-center justify-center rounded-xl transition-all cursor-pointer touch-manipulation
                  ${ isConversationMode || isListening
                    ? 'bg-cyan-500/20 text-cyan-400 ring-1 ring-cyan-500/40'
                    : 'text-slate-500 hover:text-cyan-400 hover:bg-white/5'}`}
              >
                <Radio className="h-4 w-4" />
                {(isConversationMode || isListening) && (
                  <span className="absolute inset-0 rounded-xl animate-ping bg-cyan-500/20" />
                )}
              </button>

              {/* Mute Toggle */}
              <button onClick={toggleVoiceOutput}
                className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all cursor-pointer touch-manipulation
                  ${ isVoiceEnabled ? 'text-cyan-400 hover:bg-white/5' : 'text-slate-600 hover:bg-white/5'}`}
                title={isVoiceEnabled ? 'Mute' : 'Unmute'}
              >
                {isVoiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </button>

              {/* Theme Toggle */}
              <button onClick={toggleTheme}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all cursor-pointer touch-manipulation"
              >
                {isLightMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </button>

              {/* Minimize */}
              <button onClick={toggleChat}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all cursor-pointer touch-manipulation"
              >
                <Minus className="h-4 w-4" />
              </button>

              {/* Close */}
              <button onClick={handleCloseChat}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer touch-manipulation"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* ── Voice Mode Premium Panel ────────────────────── */}
          {isConversationMode && (
            <div className={`relative shrink-0 flex flex-col items-center justify-center gap-3 py-5 border-b overflow-hidden
              ${ isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-gradient-to-b from-[#060D1F] to-[#07101F] border-cyan-500/10'}`}>

              {/* Ambient radial glow */}
              {!isLightMode && (
                <div className={`absolute inset-0 transition-all duration-700 pointer-events-none
                  ${ voiceStatus === 'listening' ? 'bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.12)_0%,transparent_70%)]'
                    : voiceStatus === 'speaking' ? 'bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.12)_0%,transparent_70%)]'
                    : voiceStatus === 'thinking' ? 'bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.08)_0%,transparent_70%)]'
                    : 'bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.05)_0%,transparent_70%)]'}`}
                />
              )}

              {/* Orb + Mic ring */}
              <div className="relative">
                {isListening && (
                  <>
                    <span className="absolute inset-[-8px] rounded-full border border-red-400/40" style={{ animation: 'ashaMicRing 1.2s ease-out infinite' }} />
                    <span className="absolute inset-[-18px] rounded-full border border-red-400/20" style={{ animation: 'ashaMicRing 1.2s ease-out 0.4s infinite' }} />
                  </>
                )}
                {isSpeaking && (
                  <>
                    <span className="absolute inset-[-8px] rounded-full border border-cyan-400/40" style={{ animation: 'ashaMicRing 1s ease-out infinite' }} />
                    <span className="absolute inset-[-18px] rounded-full border border-cyan-400/20" style={{ animation: 'ashaMicRing 1s ease-out 0.3s infinite' }} />
                  </>
                )}
                <CreativeSiriOrb isListening={isListening} isSpeaking={isSpeaking} size={72} />
              </div>

              {/* Waveform */}
              <VoiceWaveform status={voiceStatus} />

              {/* Status label */}
              <p className={`text-[11px] font-semibold tracking-widest uppercase transition-all duration-300
                ${ voiceStatus === 'listening' ? 'text-red-400'
                  : voiceStatus === 'speaking' ? 'text-cyan-400'
                  : voiceStatus === 'thinking' ? 'text-amber-400'
                  : 'text-slate-500'}`}>
                { voiceStatus === 'listening' ? '🎙️  Listening…'
                  : voiceStatus === 'speaking' ? '🔊  Asha is speaking…'
                  : voiceStatus === 'thinking' ? '💭  Thinking…'
                  : '📻  Voice Mode · Speak anytime'}
              </p>
            </div>
          )}

          {/* ── Messages ───────────────────────────────────── */}
          <div
            ref={messagesContainerRef}
            onScroll={(e) => { savedScrollTopRef.current = e.currentTarget.scrollTop; }}
            aria-live="polite"
            className={`flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 custom-scrollbar
              ${ isLightMode ? 'bg-slate-50/40' : ''}`}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col asha-msg-in ${ msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                {/* ── Bubble ───────────── */}
                <div
                  className={`max-w-[88%] sm:max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words
                    ${ msg.role === 'user'
                      ? 'bg-gradient-to-br from-cyan-600 to-blue-700 text-white rounded-br-none shadow-[0_4px_20px_rgba(34,211,238,0.25)]'
                      : isLightMode
                        ? 'bg-white border border-slate-100 text-slate-800 rounded-bl-none shadow-sm'
                        : 'bg-white/5 border border-white/8 text-slate-100 rounded-bl-none backdrop-blur-sm'
                    }`}
                >
                  {/* Markdown Bold formatting */}
                  {msg.content.split('**').map((chunk, i) => 
                    i % 2 === 1 ? <strong key={i} className="font-bold text-sky-400 light:text-indigo-600">{chunk}</strong> : chunk
                  )}

                  {/* Callback Form */}
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

                  {/* Requirements Form */}
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
                          placeholder="Brief description of the software or app needed..."
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
                <span className="text-[9px] text-slate-600 mt-1 px-1">
                  {msg.timestamp}
                </span>

                {/* Quick suggestions */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                    {msg.suggestions.map((sug, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickAction(sug)}
                        className={`text-[11px] px-3 py-1.5 rounded-full border transition-all cursor-pointer active:scale-95 touch-manipulation hover:scale-105
                          ${ isLightMode
                            ? 'border-slate-200 text-slate-600 bg-slate-50 hover:bg-cyan-50 hover:border-cyan-300 hover:text-cyan-700'
                            : 'border-white/10 text-slate-400 bg-white/5 hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:text-cyan-300'}`}
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* ── Typing Indicator ───────────────────────── */}
            {isTyping && (
              <div className="flex items-start gap-2 asha-msg-in">
                <div className={`flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-bl-none
                  ${ isLightMode
                    ? 'bg-white border border-slate-100 shadow-sm'
                    : 'bg-white/5 border border-white/8 backdrop-blur-sm'}`}>
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <span key={i} className="inline-block h-2 w-2 rounded-full bg-cyan-400/80"
                      style={{ animation: `ashaThinkDot 1.2s ease-in-out ${delay}s infinite` }}
                    />
                  ))}
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* ── Premium Input Bar ──────────────────────────── */}
          <div 
            style={{ paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))' }}
            className={`px-3 pt-3 shrink-0 border-t relative
            ${ isLightMode ? 'bg-white border-slate-100' : 'bg-[#07101F] border-cyan-500/10'}`}
          >
            {!isLightMode && (
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
            )}
            <div className="flex items-center gap-2">

              {/* Mic Button — glowing ring when active */}
              <button
                onClick={handleMicClick}
                disabled={isTyping}
                aria-label={isListening ? 'Stop Listening' : 'Voice Input'}
                className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all active:scale-90 cursor-pointer touch-manipulation disabled:opacity-40"
                style={{
                  background: isListening
                    ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                    : isLightMode
                    ? '#f1f5f9'
                    : 'rgba(255,255,255,0.06)',
                  boxShadow: isListening ? '0 0 20px rgba(239,68,68,0.5)' : undefined,
                  border: isListening ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {isListening && (
                  <span className="absolute inset-0 rounded-xl" style={{ animation: 'ashaMicRing 1.2s ease-out infinite', border: '1px solid rgba(239,68,68,0.4)' }} />
                )}
                <Mic className={`h-5 w-5 ${ isListening ? 'text-white' : isLightMode ? 'text-slate-500' : 'text-slate-400'}`} />
              </button>

              {/* Text Input */}
              <input
                type="text"
                value={inputMessage}
                disabled={isTyping}
                onChange={(e) => {
                  if (isSpeaking) stopAudio();
                  setInputMessage(e.target.value);
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={isTyping ? 'Asha is thinking…' : 'Ask Asha anything…'}
                className={`flex-1 text-base sm:text-sm px-4 py-2.5 rounded-xl focus:outline-none transition-all disabled:opacity-50
                  ${ isLightMode
                    ? 'bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20'
                    : 'bg-white/5 border border-white/8 text-slate-100 placeholder-slate-600 focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/10 backdrop-blur-sm'}`}
              />

              {/* Send Button */}
              <button
                onClick={() => handleSendMessage()}
                disabled={isTyping || !inputMessage.trim()}
                aria-label="Send Message"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all active:scale-90 cursor-pointer touch-manipulation disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  background: inputMessage.trim() && !isTyping
                    ? 'linear-gradient(135deg, #06b6d4, #3b82f6)'
                    : isLightMode ? '#e2e8f0' : 'rgba(255,255,255,0.06)',
                  boxShadow: inputMessage.trim() && !isTyping ? '0 4px 20px rgba(34,211,238,0.3)' : undefined,
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <SendHorizontal className={`h-5 w-5 ${ inputMessage.trim() && !isTyping ? 'text-white' : isLightMode ? 'text-slate-400' : 'text-slate-600'}`} />
              </button>
            </div>

            {/* Branding footer */}
            <div className="mt-2 text-[10px] text-center flex items-center justify-center gap-1.5 text-slate-600">
              <img src="/adtech-logo.png" className="h-3 w-3 object-contain opacity-60" alt="" />
              <span>Asha AI · AD TECH Enterprises · Powered by Gemini</span>
            </div>
          </div>

          </div>
        </>
      )}
    </div>
    </>
  );
}
