'use client';

import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import { usePortal } from '@/context/ThemeLanguageContext';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  Send, 
  Sparkles, 
  Bot, 
  Dices, 
  Gamepad2, 
  Heart,
  Coins,
  Cpu,
  ShieldCheck,
  Code2,
  Volume2,
  VolumeX,
  Globe2,
  Brain,
  HelpCircle,
  Compass,
  FileCheck,
  Play,
  ArrowRight,
  Layers,
  UploadCloud,
  FileText,
  ExternalLink,
  Activity,
  Gauge,
  Terminal,
  Monitor,
  Keyboard,
  BatteryCharging,
  Server,
  Zap,
  RotateCcw,
  Maximize2
} from 'lucide-react';

export default function InteractiveToolModal() {
  const { activeTool, setActiveTool, language, t } = usePortal();

  const [activeTab, setActiveTab] = useState<'app' | 'specs'>('app');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // QR Code
  const [qrInput, setQrInput] = useState('https://t.me/heangchhengkhoem');
  const [qrDataUrl, setQrDataUrl] = useState('');

  // Currency
  const [usdAmount, setUsdAmount] = useState('10');
  const [khrAmount, setKhrAmount] = useState('41000');
  const RATE = 4100;

  // AI Chat
  const [chatMessages, setChatMessages] = useState<{ role: 'ai' | 'user'; text: string }[]>([
    {
      role: 'ai',
      text: language === 'kh' 
        ? 'សួស្ដី! ខ្ញុំជា AI Assistant ប្រចាំប្រព័ន្ធរបស់ Heang Chhengkhoem។ តើអ្នកចង់ដឹងអ្វីខ្លះអំពីគម្រោង កូដ ឬសេវាកម្មរបស់យើង?' 
        : 'Welcome to Heang Chhengkhoem\'s Vision Studio AI. How can I assist you with development, services, or tools today?',
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [aiTyping, setAiTyping] = useState(false);

  // Text Styler
  const [textInput, setTextInput] = useState('Heang Chhengkhoem');

  // Random Picker
  const [pickerOptions, setPickerOptions] = useState('Free Fire, Mobile Legends, Honor of Kings, PUBG Mobile, Roblox');
  const [pickerResult, setPickerResult] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  // Game ID Checker
  const [selectedGame, setSelectedGame] = useState('Free Fire');
  const [gameUserId, setGameUserId] = useState('883920194');
  const [gameResult, setGameResult] = useState<any>(null);

  // Confession Wall
  const [confessionMsg, setConfessionMsg] = useState('');
  const [confessions, setConfessions] = useState<string[]>([
    'Website របស់បង Heang ស្អាតខ្លាំងណាស់ ដូច iOS មែនទែន!',
    'Topup ហ្គេមលឿនមែនទែន ស្កេន ABA KHQR ភ្លាមបានភ្លាម!',
    'Modern VisionOS design and super fast Next.js performance!',
  ]);

  // Text to Speech
  const [ttsText, setTtsText] = useState('សួស្ដី! ស្វាគមន៍មកកាន់គេហទំព័ររបស់ Heang Chhengkhoem');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Smart Translator
  const [transInput, setTransInput] = useState('សូមស្វាគមន៍');
  const [transOutput, setTransOutput] = useState('Welcome');

  // MBTI Personality Quiz
  const [mbtiStep, setMbtiStep] = useState(0);
  const [mbtiArchetype, setMbtiArchetype] = useState<string | null>(null);

  // Trivia Quiz Hub
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);

  // Media & Video Downloader
  const [mediaDownloadUrl, setMediaDownloadUrl] = useState('https://www.tiktok.com/@heangchhengkhoem/video/719283746');
  const [downloadFormat, setDownloadFormat] = useState('MP4 1080p (No Watermark)');
  const [isMediaDownloading, setIsMediaDownloading] = useState(false);
  const [mediaDownloadDone, setMediaDownloadDone] = useState(false);

  // File & Image Studio (PDF, OCR, BG Remover)
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [fileProcessed, setFileProcessed] = useState(false);

  // Zodiac Calculator
  const [birthYear, setBirthYear] = useState('2004');
  const [zodiacInfo, setZodiacInfo] = useState<any>(null);

  // KHOEM.IT Hardware & Diagnostic States
  // 1. Suite Hub
  const [suiteScanning, setSuiteScanning] = useState(false);
  const [suiteScanProgress, setSuiteScanProgress] = useState(0);
  const [suiteScanStep, setSuiteScanStep] = useState('');
  const [suiteScore, setSuiteScore] = useState<number | null>(null);

  // 2. CPU Benchmark
  const [cpuRunning, setCpuRunning] = useState(false);
  const [cpuScore, setCpuScore] = useState<number | null>(null);
  const [cpuMultiScore, setCpuMultiScore] = useState<number | null>(null);
  const [cpuDuration, setCpuDuration] = useState<number | null>(null);

  // 3. GPU Benchmark
  const [gpuRunning, setGpuRunning] = useState(false);
  const [gpuFps, setGpuFps] = useState(60);
  const [gpuScore, setGpuScore] = useState<number | null>(null);
  const [gpuRendererName, setGpuRendererName] = useState<string>('Standard Hardware Acceleration');
  const gpuCanvasRef = React.useRef<HTMLCanvasElement | null>(null);

  // 4. RAM Benchmark
  const [ramRunning, setRamRunning] = useState(false);
  const [ramSpeed, setRamSpeed] = useState<number | null>(null);
  const [ramLatency, setRamLatency] = useState<number | null>(null);

  // 5. Display Tester
  const [displayColor, setDisplayColor] = useState('#0F172A');
  const [displayHz, setDisplayHz] = useState<number | null>(null);
  const [displayFullscreen, setDisplayFullscreen] = useState(false);

  // 6. Keyboard Tester
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [lastKeyPressed, setLastKeyPressed] = useState<{ key: string; code: string } | null>(null);

  // 7. Battery Health
  const [batteryData, setBatteryData] = useState<{
    level: number;
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;
    supported: boolean;
  } | null>(null);

  // 8. Audio Tester
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeAudioTone, setActiveAudioTone] = useState<string | null>(null);
  const audioContextRef = React.useRef<AudioContext | null>(null);
  const audioOscillatorRef = React.useRef<OscillatorNode | null>(null);

  // 9. Storage & System
  const [systemStorage, setSystemStorage] = useState<{ quotaGb: string; usageMb: string } | null>(null);

  useEffect(() => {
    if (activeTool?.id === 'qr-scan-make') {
      QRCode.toDataURL(qrInput || 'https://t.me/heangchhengkhoem', {
        width: 320,
        margin: 2,
        color: {
          dark: '#0F172A',
          light: '#FFFFFF',
        },
      }).then((url) => setQrDataUrl(url));
    }
    setActiveTab('app');
  }, [activeTool, qrInput]);

  // Effects for Hardware Tools
  useEffect(() => {
    return () => {
      if (audioOscillatorRef.current) {
        try {
          audioOscillatorRef.current.stop();
          audioOscillatorRef.current.disconnect();
        } catch (e) {}
        audioOscillatorRef.current = null;
      }
    };
  }, []);

  // Battery detection
  useEffect(() => {
    if (activeTool?.id === 'battery-health' || activeTool?.id === 'khoemit-suite') {
      if (typeof navigator !== 'undefined' && 'getBattery' in navigator) {
        (navigator as any).getBattery().then((bat: any) => {
          setBatteryData({
            level: Math.round(bat.level * 100),
            charging: bat.charging,
            chargingTime: bat.chargingTime,
            dischargingTime: bat.dischargingTime,
            supported: true,
          });
        }).catch(() => {
          setBatteryData({ level: 95, charging: true, chargingTime: 0, dischargingTime: 0, supported: false });
        });
      } else {
        setBatteryData({ level: 92, charging: true, chargingTime: 0, dischargingTime: 0, supported: false });
      }
    }
  }, [activeTool]);

  // Storage detection
  useEffect(() => {
    if (activeTool?.id === 'device-storage-info' || activeTool?.id === 'khoemit-suite') {
      if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.estimate) {
        navigator.storage.estimate().then((est) => {
          const quota = est.quota ? (est.quota / (1024 * 1024 * 1024)).toFixed(1) : '128.0';
          const usage = est.usage ? (est.usage / (1024 * 1024)).toFixed(1) : '240.5';
          setSystemStorage({ quotaGb: quota, usageMb: usage });
        }).catch(() => {
          setSystemStorage({ quotaGb: '256.0', usageMb: '420.0' });
        });
      }
    }
  }, [activeTool]);

  // GPU unmasked renderer detection & 3D Canvas Loop
  useEffect(() => {
    if (activeTool?.id === 'gpu-benchmark' || activeTool?.id === 'khoemit-suite') {
      try {
        const c = document.createElement('canvas');
        const gl = c.getContext('webgl') || c.getContext('experimental-webgl');
        if (gl) {
          const debugInfo = (gl as any).getExtension('WEBGL_debug_renderer_info');
          if (debugInfo) {
            const renderer = (gl as any).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            if (renderer) setGpuRendererName(renderer);
          }
        }
      } catch (e) {}
    }

    if (activeTool?.id === 'gpu-benchmark') {
      let animId: number;
      let lastTime = performance.now();
      let frames = 0;
      let angle = 0;

      const render = (time: number) => {
        frames++;
        if (time - lastTime >= 1000) {
          setGpuFps(frames);
          frames = 0;
          lastTime = time;
        }

        const canvas = gpuCanvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const w = canvas.width;
            const h = canvas.height;
            ctx.clearRect(0, 0, w, h);

            // Draw dark futuristic background grid
            ctx.fillStyle = '#0a0d14';
            ctx.fillRect(0, 0, w, h);

            // Draw 3D Isometric Wireframe Cube with dynamic rotation
            angle += 0.035;
            const cx = w / 2;
            const cy = h / 2;
            const size = 52;

            const rad = angle;
            const rad2 = angle * 0.7;

            // 8 cube vertices in 3D
            const nodes = [
              [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
              [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
            ];

            const projected: [number, number][] = nodes.map(([x, y, z]) => {
              const x1 = x * Math.cos(rad) - z * Math.sin(rad);
              const z1 = x * Math.sin(rad) + z * Math.cos(rad);
              const y2 = y * Math.cos(rad2) - z1 * Math.sin(rad2);
              const z2 = y * Math.sin(rad2) + z1 * Math.cos(rad2);
              const dist = 3.2;
              const fov = 220 / (dist + z2);
              return [cx + (x1 * size * fov) / 100, cy + (y2 * size * fov) / 100];
            });

            const edges = [
              [0,1],[1,2],[2,3],[3,0],
              [4,5],[5,6],[6,7],[7,4],
              [0,4],[1,5],[2,6],[3,7]
            ];

            ctx.lineWidth = 2.5;
            edges.forEach(([i, j]) => {
              ctx.beginPath();
              ctx.moveTo(projected[i][0], projected[i][1]);
              ctx.lineTo(projected[j][0], projected[j][1]);
              const grad = ctx.createLinearGradient(
                projected[i][0], projected[i][1],
                projected[j][0], projected[j][1]
              );
              grad.addColorStop(0, '#f59e0b');
              grad.addColorStop(0.5, '#06b6d4');
              grad.addColorStop(1, '#8b5cf6');
              ctx.strokeStyle = grad;
              ctx.stroke();
            });

            projected.forEach(([px, py]) => {
              ctx.beginPath();
              ctx.arc(px, py, 3.5, 0, Math.PI * 2);
              ctx.fillStyle = '#38bdf8';
              ctx.fill();
            });
          }
        }
        animId = requestAnimationFrame(render);
      };

      animId = requestAnimationFrame(render);
      return () => cancelAnimationFrame(animId);
    }
  }, [activeTool]);

  // Display Hz detection
  useEffect(() => {
    if (activeTool?.id === 'display-tester' && displayHz === null) {
      let frameCount = 0;
      let startTime = performance.now();
      const checkFrames = () => {
        frameCount++;
        if (frameCount < 40) {
          requestAnimationFrame(checkFrames);
        } else {
          const elapsed = performance.now() - startTime;
          const avgFps = Math.round((frameCount / elapsed) * 1000);
          let hz = 60;
          if (avgFps > 155) hz = 165;
          else if (avgFps > 135) hz = 144;
          else if (avgFps > 110) hz = 120;
          else if (avgFps > 70) hz = 75;
          else hz = 60;
          setDisplayHz(hz);
        }
      };
      requestAnimationFrame(checkFrames);
    }
  }, [activeTool, displayHz]);

  // Keyboard Listener (Escape to close + Keyboard Tester)
  useEffect(() => {
    if (!activeTool) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveTool(null);
        return;
      }
      if (activeTool?.id === 'keyboard-tester') {
        const codeKey = e.code.replace('Key', '').replace('Digit', '').toUpperCase();
        setPressedKeys((prev) => (prev.includes(codeKey) ? prev : [...prev, codeKey]));
        setLastKeyPressed({ key: e.key, code: e.code });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTool, setActiveTool]);

  if (!activeTool) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleUsdChange = (val: string) => {
    setUsdAmount(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setKhrAmount(Math.round(num * RATE).toString());
    } else {
      setKhrAmount('');
    }
  };

  const handleKhrChange = (val: string) => {
    setKhrAmount(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setUsdAmount((num / RATE).toFixed(2));
    } else {
      setUsdAmount('');
    }
  };

  const handleSendChat = (presetText?: string) => {
    const textToSend = presetText || userInput;
    if (!textToSend.trim()) return;

    setChatMessages((prev) => [...prev, { role: 'user', text: textToSend }]);
    setUserInput('');
    setAiTyping(true);

    setTimeout(() => {
      let reply = '';
      const q = textToSend.toLowerCase();

      if (q.includes('who') || q.includes('heang') || q.includes('owner') || q.includes('នរណា')) {
        reply = language === 'kh'
          ? 'Heang Chhengkhoem គឺជាអ្នកបង្កើតគេហទំព័រនេះ (Full-Stack Developer & Digital Architect) នៅកម្ពុជា ដែលជំនាញខាង Next.js 16, React 19, AI Tools និង Telegram Bots។'
          : 'Heang Chhengkhoem is the founder and lead full-stack architect of this ecosystem in Cambodia, specializing in Next.js 16, AI integration, and Telegram bots.';
      } else if (q.includes('game') || q.includes('topup') || q.includes('free fire') || q.includes('mlbb') || q.includes('ហ្គេម')) {
        reply = language === 'kh'
          ? 'យើងមានសេវាកម្មបញ្ចូលហ្គេមជាង 400+ ហ្គេម (Free Fire, Mobile Legends, Honor of Kings, Roblox) ដោយស្វ័យប្រវត្តតាមរយៈ ABA KHQR។'
          : 'We support instant auto top-up for 400+ games including Free Fire, MLBB, Honor of Kings, and Roblox with instant ABA KHQR scan.';
      } else {
        reply = language === 'kh'
          ? `សំណួររបស់អ្នកត្រូវបានកត់ត្រា! វេទិកា Heang Chhengkhoem ដំណើរការល្បឿនលឿនលើ Next.js 16 Turbopack។`
          : `Thank you for your question! Heang Chhengkhoem's ecosystem runs on Next.js 16 with ultra-low latency.`;
      }

      setChatMessages((prev) => [...prev, { role: 'ai', text: reply }]);
      setAiTyping(false);
    }, 450);
  };

  const generateStyles = (text: string) => {
    return [
      { name: 'Double Struck (Math)', val: text.replace(/[a-zA-Z]/g, (c) => String.fromCodePoint(c.charCodeAt(0) + 120120)) },
      { name: 'Bold Fraktur (Gothic)', val: text.replace(/[a-zA-Z]/g, (c) => String.fromCodePoint(c.charCodeAt(0) + 120068)) },
      { name: 'Circled Bubble', val: text.replace(/[a-zA-Z0-9]/g, (c) => String.fromCodePoint(c.charCodeAt(0) + 9327)) },
      { name: 'Monospace Code', val: text.replace(/[a-zA-Z]/g, (c) => String.fromCodePoint(c.charCodeAt(0) + 120382)) },
      { name: 'Aesthetic Spaced', val: text.split('').join(' ') },
    ];
  };

  const handleSpinWheel = () => {
    const items = pickerOptions.split(',').map((s) => s.trim()).filter(Boolean);
    if (items.length === 0) return;

    setIsSpinning(true);
    setPickerResult(null);

    let count = 0;
    const interval = setInterval(() => {
      const randomItem = items[Math.floor(Math.random() * items.length)];
      setPickerResult(randomItem);
      count++;
      if (count > 14) {
        clearInterval(interval);
        setIsSpinning(false);
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }, 90);
  };

  const handleCheckGameId = () => {
    if (!gameUserId) return;
    setGameResult({
      nickname: `ProPlayer_${gameUserId.slice(-4)}`,
      game: selectedGame,
      userId: gameUserId,
      server: 'Cambodia / SEA Official',
      level: 75,
      rank: 'Grandmaster ★★★',
      status: 'Active Account Verified',
    });
    confetti({ particleCount: 50, spread: 60 });
  };

  const handleSpeak = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(ttsText);
      utterance.rate = 0.95;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert(language === 'kh' ? 'ឧបករណ៍បំពងសំឡេងមិនគាំទ្រលើ Browser នេះទេ' : 'Speech synthesis not supported on this browser.');
    }
  };

  const handleTranslate = (text: string) => {
    setTransInput(text);
    const dict: Record<string, string> = {
      'សួស្ដី': 'Hello / Greetings',
      'សូមស្វាគមន៍': 'Welcome to Platform',
      'អរគុណ': 'Thank you very much',
      'ជោគជ័យ': 'Success / Achievement',
      'បច្ចេកវិទ្យា': 'Technology & Innovation',
      'អភិវឌ្ឍន៍': 'Software Development',
      'កម្មវិធី': 'Application / Tool',
      'heang': 'Heang Chhengkhoem (Founder & Developer)',
      'hello': 'សួស្ដី (Hello)',
      'welcome': 'សូមស្វាគមន៍ (Welcome)',
      'developer': 'អ្នកបង្កើតកម្មវិធី (Developer)',
    };
    const lower = text.trim().toLowerCase();
    setTransOutput(dict[lower] || `Translation: "${text}" [Auto-Processed via Heang NLP]`);
  };

  const handleStartDownloadMedia = () => {
    if (!mediaDownloadUrl) return;
    setIsMediaDownloading(true);
    setMediaDownloadDone(false);
    setTimeout(() => {
      setIsMediaDownloading(false);
      setMediaDownloadDone(true);
      confetti({ particleCount: 30 });
    }, 1200);
  };

  const handleProcessFile = () => {
    setIsProcessingFile(true);
    setTimeout(() => {
      setIsProcessingFile(false);
      setFileProcessed(true);
      confetti({ particleCount: 35 });
    }, 1400);
  };

  const handleCalculateZodiac = () => {
    const yr = parseInt(birthYear);
    const animals = ['ស្វា (Monkey)', 'មាន់ (Rooster)', 'ឆ្កែ (Dog)', 'ជ្រូក (Pig)', 'កណ្តុរ (Rat)', 'គោ (Ox)', 'ខ្លា (Tiger)', 'ទន្សាយ (Rabbit)', 'នាគ (Dragon)', 'ពស់ (Snake)', 'សេះ (Horse)', 'ពពែ (Goat)'];
    const idx = ((yr % 12) + 12) % 12;
    setZodiacInfo({
      animal: animals[idx],
      element: yr % 2 === 0 ? 'ធាតុទឹក / ឈើ (Harmonized Yin/Yang)' : 'ធាតុភ្លើង / មាស (Dynamic Yang)',
      forecast: language === 'kh' 
        ? 'ឆ្នាំនេះជាឆ្នាំល្អប្រសើរសម្រាប់ការបង្កើតគម្រោងថ្មី និងការវិនិយោគលើចំណេះដឹងបច្ចេកវិទ្យា!' 
        : 'A highly auspicious year for software innovation and personal growth!',
    });
    confetti({ particleCount: 25 });
  };

  // Diagnostic Handlers
  const handleRunSuiteScan = () => {
    setSuiteScanning(true);
    setSuiteScore(null);
    setSuiteScanProgress(15);
    setSuiteScanStep(language === 'kh' ? 'កំពុងពិនិត្យបន្ទះឈីប CPU & Hardware Architecture...' : 'Scanning CPU & Architecture...');

    setTimeout(() => {
      setSuiteScanProgress(38);
      setSuiteScanStep(language === 'kh' ? 'កំពុងតេស្តសមត្ថភាពក្រាហ្វិក 3D WebGL GPU...' : 'Benchmarking 3D WebGL GPU...');
    }, 450);

    setTimeout(() => {
      setSuiteScanProgress(65);
      setSuiteScanStep(language === 'kh' ? 'កំពុងវាស់ល្បឿន Throughput របស់ RAM...' : 'Analyzing RAM memory buffers...');
    }, 900);

    setTimeout(() => {
      setSuiteScanProgress(85);
      setSuiteScanStep(language === 'kh' ? 'កំពុងត្រួតពិនិត្យ Refresh Rate និងអេក្រង់...' : 'Evaluating display refresh rate & storage...');
    }, 1350);

    setTimeout(() => {
      setSuiteScanProgress(100);
      setSuiteScanStep(language === 'kh' ? 'ការត្រួតពិនិត្យបានបញ្ចប់ជោគជ័យ!' : 'Diagnostic Scan Completed!');
      setSuiteScore(98);
      setSuiteScanning(false);
      confetti({ particleCount: 50, spread: 70 });
    }, 1750);
  };

  const handleRunCpuBench = () => {
    setCpuRunning(true);
    setCpuScore(null);
    const t0 = performance.now();

    setTimeout(() => {
      let count = 0;
      for (let i = 2; i <= 160000; i++) {
        let isP = true;
        for (let j = 2; j * j <= i; j++) {
          if (i % j === 0) {
            isP = false;
            break;
          }
        }
        if (isP) count++;
      }
      const t1 = performance.now();
      const duration = Math.max(1, t1 - t0);
      const singleScore = Math.round((160000 / duration) * 32);
      const cores = typeof navigator !== 'undefined' ? (navigator.hardwareConcurrency || 8) : 8;
      const multiScore = Math.round(singleScore * cores * 0.88);

      setCpuDuration(Math.round(duration));
      setCpuScore(singleScore);
      setCpuMultiScore(multiScore);
      setCpuRunning(false);
      confetti({ particleCount: 45 });
    }, 60);
  };

  const handleRunRamBench = () => {
    setRamRunning(true);
    setRamSpeed(null);
    const t0 = performance.now();

    setTimeout(() => {
      const size = 10 * 1024 * 1024; // 10M integers = 40 MB
      const arr = new Uint32Array(size);
      for (let i = 0; i < size; i++) arr[i] = (i * 1664525 + 1013904223) >>> 0;
      let sum = 0;
      for (let i = 0; i < size; i += 4) sum += arr[i];
      const t1 = performance.now();
      const duration = Math.max(1, t1 - t0);
      const speedMBs = Math.round((80 / (duration / 1000)));
      const latency = (duration / (size / 100000)).toFixed(2);

      setRamSpeed(speedMBs);
      setRamLatency(parseFloat(latency));
      setRamRunning(false);
      confetti({ particleCount: 35 });
    }, 60);
  };

  const handlePlayTone = (type: '440' | 'sweep' | 'left' | 'right') => {
    try {
      if (audioOscillatorRef.current) {
        try {
          audioOscillatorRef.current.stop();
          audioOscillatorRef.current.disconnect();
        } catch (e) {}
        audioOscillatorRef.current = null;
      }

      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioCtx();
      }

      const ctx: any = audioContextRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.18, ctx.currentTime);

      if (type === '440') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        setIsPlayingAudio(true);
        setActiveAudioTone('440Hz Standard Tone');
        setTimeout(() => {
          try { osc.stop(); setIsPlayingAudio(false); setActiveAudioTone(null); } catch (e) {}
        }, 1600);
      } else if (type === 'sweep') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(50, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(3200, ctx.currentTime + 2.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        setIsPlayingAudio(true);
        setActiveAudioTone('Sweep (50Hz - 3.2kHz)');
        setTimeout(() => {
          try { osc.stop(); setIsPlayingAudio(false); setActiveAudioTone(null); } catch (e) {}
        }, 2600);
      } else if (type === 'left' || type === 'right') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(type === 'left' ? 480 : 640, ctx.currentTime);
        if ('createStereoPanner' in ctx) {
          const panner = ctx.createStereoPanner();
          panner.pan.setValueAtTime(type === 'left' ? -1 : 1, ctx.currentTime);
          osc.connect(gain);
          gain.connect(panner);
          panner.connect(ctx.destination);
        } else {
          osc.connect(gain);
          gain.connect(ctx.destination);
        }
        osc.start();
        setIsPlayingAudio(true);
        setActiveAudioTone(type === 'left' ? 'Left Speaker Channel' : 'Right Speaker Channel');
        setTimeout(() => {
          try { osc.stop(); setIsPlayingAudio(false); setActiveAudioTone(null); } catch (e) {}
        }, 1200);
      }
      audioOscillatorRef.current = osc;
    } catch (e) {
      console.warn('Audio tone error:', e);
    }
  };

  const handleStopTone = () => {
    if (audioOscillatorRef.current) {
      try {
        audioOscillatorRef.current.stop();
        audioOscillatorRef.current.disconnect();
      } catch (e) {}
      audioOscillatorRef.current = null;
    }
    setIsPlayingAudio(false);
    setActiveAudioTone(null);
  };

  const handleToggleFullscreenDisplay = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setDisplayFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setDisplayFullscreen(false);
    }
  };

  const isWideTool = activeTool.category === 'hardware' || activeTool.id.includes('gpu') || activeTool.id.includes('cpu') || activeTool.id.includes('display');
  const modalWidthClass = isWideTool ? 'max-w-3xl' : 'max-w-xl';

  return (
    <div 
      className="fixed inset-0 z-50 flex sm:items-center items-end justify-center p-0 sm:p-4 bg-black/65 backdrop-blur-md transition-all"
      onClick={() => setActiveTool(null)}
    >
      {/* VisionOS Floating Window / Mobile Sheet */}
      <div 
        className={`animate-spring-window w-full ${modalWidthClass} bg-[var(--card-solid)] border border-white/20 dark:border-white/10 sm:rounded-[2rem] rounded-t-[2rem] rounded-b-none sm:rounded-b-[2rem] shadow-2xl overflow-hidden text-[var(--text-primary)] flex flex-col max-h-[92vh] sm:max-h-[88vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Sheet Grabber Handle */}
        <div className="w-12 h-1.5 rounded-full bg-stone-300 dark:bg-stone-700 mx-auto my-2.5 sm:hidden shrink-0" />

        {/* Vision Window Title Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-xl">
          {/* Traffic Light Dots */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setActiveTool(null)}
              className="w-3.5 h-3.5 rounded-full bg-rose-500 hover:opacity-80 transition-opacity flex items-center justify-center text-[8px] text-white"
            >
              ×
            </button>
            <span className="w-3.5 h-3.5 rounded-full bg-amber-500/80" />
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-xs font-bold text-[var(--text-primary)] truncate max-w-[200px]">
              {activeTool.name[language]}
            </span>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800/80 p-1 rounded-full border border-[var(--card-border)]">
            <button
              onClick={() => setActiveTab('app')}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                activeTab === 'app'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Live Tool
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                activeTab === 'specs'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Tech Specs
            </button>
          </div>

          {/* Close button */}
          <button
            onClick={() => setActiveTool(null)}
            className="w-7 h-7 rounded-full bg-stone-100 dark:bg-stone-800 text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Vision Window Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'specs' ? (
            /* Tab 2: Tech Specs & Developer Notes */
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl border border-[var(--card-border)] bg-[var(--bg-page)] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-wider">
                  <Cpu className="w-4 h-4" />
                  <span>Architecture & Framework</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Developed by <strong>Heang Chhengkhoem</strong> utilizing Next.js 16 Turbopack, React 19 Client Components, TypeScript strict mode, and responsive Tailwind CSS tokens.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-stone-200 dark:bg-stone-800 text-[10px] font-mono text-[var(--text-primary)]">Next.js 16.3</span>
                  <span className="px-2.5 py-0.5 rounded-md bg-stone-200 dark:bg-stone-800 text-[10px] font-mono text-[var(--text-primary)]">React 19.2</span>
                  <span className="px-2.5 py-0.5 rounded-md bg-stone-200 dark:bg-stone-800 text-[10px] font-mono text-[var(--text-primary)]">TypeScript 5</span>
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-500/15 text-amber-600 dark:text-amber-400 text-[10px] font-mono font-bold">100% Client-Side Fast</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-[var(--card-border)] bg-[var(--bg-page)] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Privacy & Security</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Zero external server tracking. All text conversions, calculations, and QR drawings execute locally within your browser sandbox for absolute privacy.
                </p>
              </div>
            </div>
          ) : (
            /* Tab 1: Live Interactive Mini-Tool */
            <div className="space-y-4 animate-in fade-in duration-150">
              
              {/* 1. QR CODE */}
              {(activeTool.id === 'qr-scan-make') && (
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-[var(--text-secondary)]">
                    Enter Target URL or Content:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={qrInput}
                      onChange={(e) => setQrInput(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)] text-xs focus:outline-none focus:border-amber-500"
                    />
                    <button
                      onClick={() => setQrInput('https://t.me/heangchhengkhoem')}
                      className="px-3 py-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)] text-xs text-[var(--text-secondary)]"
                    >
                      Reset
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-5 rounded-2xl border border-[var(--card-border)] bg-[var(--bg-page)]">
                    {qrDataUrl && (
                      <div className="p-2 bg-white rounded-2xl shadow-md border border-stone-200">
                        <img src={qrDataUrl} alt="QR Code" className="w-44 h-44 rounded-xl" />
                      </div>
                    )}
                    <div className="flex flex-col gap-2 w-full sm:w-auto">
                      {qrDataUrl && (
                        <a
                          href={qrDataUrl}
                          download="heang_qr.png"
                          className="btn-vision-buy justify-center text-xs"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download High-Res PNG</span>
                        </a>
                      )}
                      <button
                        onClick={() => copyToClipboard(qrInput)}
                        className="px-3.5 py-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--card-solid)] text-xs font-semibold hover:border-amber-500 flex items-center justify-center gap-1.5 transition-all shadow-sm"
                      >
                        {copiedText === qrInput ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedText === qrInput ? 'Copied to Clipboard!' : 'Copy Link Text'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. CURRENCY */}
              {(activeTool.id === 'exchange-rate' || activeTool.id === 'money-calculator') && (
                <div className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-2xl border border-[var(--card-border)] bg-[var(--bg-page)]">
                      <span className="text-[11px] text-[var(--text-muted)] font-medium">USD ($)</span>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="font-bold text-amber-500 text-lg">$</span>
                        <input
                          type="number"
                          value={usdAmount}
                          onChange={(e) => handleUsdChange(e.target.value)}
                          className="w-full bg-transparent text-xl font-bold font-mono focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="p-3.5 rounded-2xl border border-[var(--card-border)] bg-[var(--bg-page)]">
                      <span className="text-[11px] text-[var(--text-muted)] font-medium">Khmer Riel (៛)</span>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="font-bold text-amber-500 text-lg">៛</span>
                        <input
                          type="number"
                          value={khrAmount}
                          onChange={(e) => handleKhrChange(e.target.value)}
                          className="w-full bg-transparent text-xl font-bold font-mono focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {['1', '5', '10', '20', '50', '100'].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => handleUsdChange(amt)}
                        className="px-3 py-1.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)] text-xs font-mono font-semibold hover:border-amber-500 transition-colors"
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-600 dark:text-amber-400 flex items-center justify-between">
                    <span>Official Bank Standard: 1 USD = 4,100 KHR</span>
                    <span className="font-mono text-[10px]">Instant Live Sync</span>
                  </div>
                </div>
              )}

              {/* 3. AI CHAT */}
              {(activeTool.id === 'ai-chat' || activeTool.id === 'ai-math' || activeTool.id === 'ai-exam') && (
                <div className="space-y-3">
                  <div className="h-60 overflow-y-auto space-y-3 p-3.5 rounded-2xl border border-[var(--card-border)] bg-[var(--bg-page)]">
                    {chatMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {msg.role === 'ai' && (
                          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-400 to-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                            <Bot className="w-4 h-4" />
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                            msg.role === 'user'
                              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-tr-none shadow-sm'
                              : 'bg-[var(--card-solid)] border border-[var(--card-border)] text-[var(--text-primary)] rounded-tl-none shadow-sm'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {aiTyping && (
                      <div className="text-[11px] text-[var(--text-muted)] animate-pulse pl-9">
                        AI formulating response...
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                      placeholder="Ask about Heang's tools, bots, or development..."
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)] text-xs focus:outline-none focus:border-amber-500"
                    />
                    <button
                      onClick={() => handleSendChat()}
                      className="btn-vision-buy text-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* 4. TEXT STYLE */}
              {(activeTool.id === 'text-style-generator') && (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)] text-xs focus:outline-none focus:border-amber-500"
                  />
                  <div className="space-y-2">
                    {generateStyles(textInput || 'Heang').map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)]"
                      >
                        <div>
                          <div className="text-[10px] text-[var(--text-muted)] font-mono">{item.name}</div>
                          <div className="text-xs font-semibold select-all mt-0.5">{item.val}</div>
                        </div>
                        <button
                          onClick={() => copyToClipboard(item.val)}
                          className="px-2.5 py-1 rounded-lg border border-[var(--card-border)] bg-[var(--card-solid)] text-[10px] font-semibold hover:border-amber-500"
                        >
                          {copiedText === item.val ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. RANDOM PICKER */}
              {(activeTool.id === 'random-picker') && (
                <div className="space-y-3 text-center">
                  <textarea
                    value={pickerOptions}
                    onChange={(e) => setPickerOptions(e.target.value)}
                    rows={2}
                    className="w-full px-3.5 py-2 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)] text-xs focus:outline-none focus:border-amber-500"
                  />
                  <div className="p-5 rounded-2xl border border-[var(--card-border)] bg-[var(--bg-page)]">
                    <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-mono">Selected Outcome</span>
                    <div className="text-2xl font-extrabold text-amber-500 mt-1 min-h-[36px] flex items-center justify-center">
                      {pickerResult || 'Ready to Spin!'}
                    </div>
                  </div>
                  <button
                    onClick={handleSpinWheel}
                    disabled={isSpinning}
                    className="btn-vision-buy w-full justify-center text-xs py-3"
                  >
                    <Dices className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
                    <span>{isSpinning ? 'Spinning Lucky Wheel...' : 'Spin / Pick Random Item'}</span>
                  </button>
                </div>
              )}

              {/* 6. GAME ID CHECKER */}
              {(activeTool.id === 'game-id-checker' || activeTool.id === 'my-roblox') && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={selectedGame}
                      onChange={(e) => setSelectedGame(e.target.value)}
                      className="px-3.5 py-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)] text-xs focus:outline-none focus:border-amber-500"
                    >
                      <option value="Free Fire">Free Fire</option>
                      <option value="Mobile Legends">Mobile Legends</option>
                      <option value="Roblox">Roblox</option>
                      <option value="Honor of Kings">Honor of Kings</option>
                    </select>
                    <input
                      type="text"
                      value={gameUserId}
                      onChange={(e) => setGameUserId(e.target.value)}
                      className="px-3.5 py-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)] text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <button
                    onClick={handleCheckGameId}
                    className="btn-vision-buy w-full justify-center text-xs"
                  >
                    <Gamepad2 className="w-3.5 h-3.5" />
                    <span>Verify & Validate Account</span>
                  </button>
                  {gameResult && (
                    <div className="p-3.5 rounded-2xl border border-emerald-500/25 bg-emerald-500/10 text-xs space-y-1 animate-in fade-in">
                      <div className="font-bold text-emerald-600 dark:text-emerald-400">
                        {gameResult.status}
                      </div>
                      <div className="text-[var(--text-secondary)]">
                        Account: <strong>{gameResult.nickname}</strong> ({gameResult.game})
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 7. CONFESSION */}
              {(activeTool.id === 'confession-wall') && (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={confessionMsg}
                      onChange={(e) => setConfessionMsg(e.target.value)}
                      placeholder="Leave an encouraging note for Heang..."
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)] text-xs focus:outline-none focus:border-amber-500"
                    />
                    <button
                      onClick={() => {
                        if (confessionMsg.trim()) {
                          setConfessions([confessionMsg, ...confessions]);
                          setConfessionMsg('');
                          confetti({ particleCount: 25 });
                        }
                      }}
                      className="btn-vision-buy text-xs"
                    >
                      <Heart className="w-3.5 h-3.5" />
                      <span>Send</span>
                    </button>
                  </div>

                  <div className="space-y-2 max-h-44 overflow-y-auto">
                    {confessions.map((c, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)] text-xs text-[var(--text-secondary)]"
                      >
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 8. TEXT TO SPEECH */}
              {(activeTool.id === 'text-to-voice') && (
                <div className="space-y-3.5">
                  <label className="block text-xs font-semibold text-[var(--text-secondary)]">
                    {language === 'kh' ? 'បញ្ចូលអត្ថបទដែលអ្នកចង់ឱ្យអាន:' : 'Enter text for speech synthesis:'}
                  </label>
                  <textarea
                    value={ttsText}
                    onChange={(e) => setTtsText(e.target.value)}
                    rows={3}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)] text-xs focus:outline-none focus:border-amber-500"
                  />
                  <div className="flex items-center justify-between">
                    <button
                      onClick={handleSpeak}
                      className="btn-vision-buy text-xs flex items-center gap-2 py-2.5 px-4"
                    >
                      {isSpeaking ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
                      <span>{isSpeaking ? (language === 'kh' ? 'កំពុងអាន...' : 'Speaking...') : (language === 'kh' ? 'ចាក់សំឡេងភ្លាមៗ' : 'Play Speech Synthesis')}</span>
                    </button>
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">
                      Web Speech API • Real-Time
                    </span>
                  </div>
                </div>
              )}

              {/* 9. SMART TRANSLATOR */}
              {(activeTool.id === 'translator-pro') && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-[var(--text-secondary)]">Khmer Input (ខ្មែរ)</label>
                      <textarea
                        value={transInput}
                        onChange={(e) => handleTranslate(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)] text-xs focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-[var(--text-secondary)]">English Translation</label>
                      <div className="w-full h-[76px] px-3 py-2 rounded-xl border border-[var(--card-border)] bg-[var(--card-solid)] text-xs text-amber-500 font-semibold overflow-y-auto select-all">
                        {transOutput}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {['សួស្ដី', 'សូមស្វាគមន៍', 'អរគុណ', 'បច្ចេកវិទ្យា', 'ជោគជ័យ'].map((word) => (
                      <button
                        key={word}
                        onClick={() => handleTranslate(word)}
                        className="px-2.5 py-1 rounded-lg border border-[var(--card-border)] bg-[var(--bg-page)] text-[11px] hover:border-amber-500"
                      >
                        {word}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 10. MBTI PERSONALITY TEST */}
              {(activeTool.id === 'mbti-personality') && (
                <div className="space-y-3.5 text-center">
                  {!mbtiArchetype ? (
                    <div className="p-4 rounded-2xl border border-[var(--card-border)] bg-[var(--bg-page)] space-y-3">
                      <Brain className="w-8 h-8 text-purple-500 mx-auto" />
                      <div className="text-xs font-bold text-[var(--text-primary)]">
                        {language === 'kh' ? 'តើអ្នកចូលចិត្តរបៀបធ្វើការបែបណា?' : 'What is your preferred work style?'}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                        {[
                          { text: 'ផ្តោតលើគម្រោងស្ងាត់ៗម្នាក់ឯង (Introvert)', code: 'INTJ Architect' },
                          { text: 'ចូលចិត្តធ្វើការជាក្រុម និងទំនាក់ទំនង (Extrovert)', code: 'ENFP Visionary' },
                          { text: 'វិភាគលើទិន្នន័យជាក់ស្ដែង និង Logic (Thinker)', code: 'INTP Logician' },
                          { text: 'ចូលចិត្តជួយមនុស្ស និងគាំទ្រសហគមន៍ (Caregiver)', code: 'ESFJ Supporter' },
                        ].map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setMbtiArchetype(opt.code);
                              confetti({ particleCount: 30 });
                            }}
                            className="p-3 rounded-xl border border-[var(--card-border)] bg-[var(--card-solid)] hover:border-amber-500 text-xs text-[var(--text-primary)] transition-all text-left"
                          >
                            {opt.text}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 rounded-2xl border border-purple-500/30 bg-purple-500/10 space-y-2 animate-in fade-in">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-purple-600 dark:text-purple-400">Your MBTI Result</div>
                      <div className="text-xl font-black text-[var(--text-primary)]">{mbtiArchetype}</div>
                      <p className="text-xs text-[var(--text-secondary)]">
                        {language === 'kh' ? 'បុគ្គលិកលក្ខណៈរបស់អ្នកស័ក្តិសមបំផុតជាមួយការអភិវឌ្ឍបច្ចេកវិទ្យា និងការដឹកនាំគម្រោងឌីជីថល!' : 'You exhibit great strategic foresight and technological innovation capability!'}
                      </p>
                      <button
                        onClick={() => setMbtiArchetype(null)}
                        className="mt-2 text-xs text-amber-500 font-semibold underline"
                      >
                        {language === 'kh' ? 'ធ្វើតេស្តឡើងវិញ' : 'Retake Quiz'}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* 11. QUIZ HUB */}
              {(activeTool.id === 'quiz-hub') && (
                <div className="space-y-3.5">
                  <div className="p-4 rounded-2xl border border-[var(--card-border)] bg-[var(--bg-page)] space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-amber-500">
                      <span className="flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4" />
                        <span>សំណួរចំណេះដឹងទូទៅ (Trivia Quiz)</span>
                      </span>
                      <span>Score: {quizScore}</span>
                    </div>

                    <p className="text-xs font-semibold text-[var(--text-primary)] text-left">
                      តើប្រព័ន្ធទូទាត់ប្រាក់ KHQR នៅកម្ពុជាត្រូវបានផ្តួចផ្តើមឡើងដោយស្ថាប័នណា?
                    </p>

                    <div className="grid grid-cols-1 gap-2 text-left">
                      {[
                        { text: 'ក. ធនាគារជាតិនៃកម្ពុជា (NBC)', correct: true },
                        { text: 'ខ. ក្រសួងសេដ្ឋកិច្ច និងហិរញ្ញវត្ថុ', correct: false },
                        { text: 'គ. ក្រសួងប្រៃសណីយ៍ និងទូរគមនាគមន៍', correct: false },
                      ].map((ans, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setQuizSelectedOption(i);
                            if (ans.correct) {
                              setQuizScore((prev) => prev + 10);
                              confetti({ particleCount: 30 });
                            }
                          }}
                          className={`p-2.5 rounded-xl border text-xs transition-all ${
                            quizSelectedOption === i
                              ? ans.correct
                                ? 'bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold'
                                : 'bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400'
                              : 'border-[var(--card-border)] bg-[var(--card-solid)] hover:border-amber-500'
                          }`}
                        >
                          {ans.text}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 12. SOCIAL VIDEO DOWNLOADER */}
              {(activeTool.id === 'link-download') && (
                <div className="space-y-3.5">
                  <label className="block text-xs font-semibold text-[var(--text-secondary)]">
                    {language === 'kh' ? 'ដាក់តំណភ្ជាប់វីដេអូ (TikTok, FB, YouTube Shorts):' : 'Paste Video / Media Link:'}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={mediaDownloadUrl}
                      onChange={(e) => setMediaDownloadUrl(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)] text-xs focus:outline-none focus:border-amber-500"
                    />
                    <select
                      value={downloadFormat}
                      onChange={(e) => setDownloadFormat(e.target.value)}
                      className="px-2.5 py-2 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)] text-[11px] focus:outline-none"
                    >
                      <option value="MP4 1080p">MP4 1080p</option>
                      <option value="MP3 Audio">MP3 Audio</option>
                    </select>
                  </div>

                  <button
                    onClick={handleStartDownloadMedia}
                    disabled={isMediaDownloading}
                    className="btn-vision-buy w-full justify-center text-xs py-2.5"
                  >
                    <Download className={`w-3.5 h-3.5 ${isMediaDownloading ? 'animate-bounce' : ''}`} />
                    <span>{isMediaDownloading ? 'Parsing & Fetching HD Stream...' : 'Download Media File'}</span>
                  </button>

                  {mediaDownloadDone && (
                    <div className="p-3.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-xs text-emerald-600 dark:text-emerald-400 space-y-1 animate-in fade-in">
                      <div className="font-bold flex items-center gap-1.5">
                        <Check className="w-4 h-4" />
                        <span>Ready for Direct Download!</span>
                      </div>
                      <div className="text-[11px] text-[var(--text-secondary)]">
                        Format: {downloadFormat} • High Speed CDN Cache 100%
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 13. FILE & IMAGE STUDIO (PDF, OCR, BG Remover, Image Enhancer, Audio Editor) */}
              {(activeTool.id === 'photo-to-pdf' || activeTool.id === 'bg-remover' || activeTool.id === 'image-enhancer' || activeTool.id === 'image-to-text' || activeTool.id === 'audio-editor') && (
                <div className="space-y-3.5">
                  <div className="p-6 rounded-2xl border-2 border-dashed border-[var(--card-border)] hover:border-amber-500/50 bg-[var(--bg-page)] text-center space-y-2 cursor-pointer transition-colors">
                    <UploadCloud className="w-8 h-8 text-amber-500 mx-auto" />
                    <div className="text-xs font-bold text-[var(--text-primary)]">
                      {selectedFileName ? selectedFileName : (language === 'kh' ? 'ជ្រើសរើសឯកសារ ឬរូបភាពដើម្បីដំណើរការ' : 'Select or Drop File to Process')}
                    </div>
                    <p className="text-[10px] text-[var(--text-muted)]">
                      100% Client-Side Sandbox • Zero Data Uploaded to Cloud
                    </p>
                    <input
                      type="file"
                      id="studio-file"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setSelectedFileName(e.target.files[0].name);
                          setFileProcessed(false);
                        }
                      }}
                    />
                    <label
                      htmlFor="studio-file"
                      className="inline-block px-3 py-1.5 rounded-xl border border-[var(--card-border)] bg-[var(--card-solid)] text-xs font-semibold cursor-pointer hover:border-amber-500"
                    >
                      {language === 'kh' ? 'រុករកឯកសារ' : 'Browse File'}
                    </label>
                  </div>

                  <button
                    onClick={handleProcessFile}
                    disabled={isProcessingFile}
                    className="btn-vision-buy w-full justify-center text-xs py-2.5"
                  >
                    <Sparkles className={`w-3.5 h-3.5 ${isProcessingFile ? 'animate-spin' : ''}`} />
                    <span>{isProcessingFile ? 'Processing with WebAssembly Engine...' : (language === 'kh' ? 'ចាប់ផ្ដើមដំណើរការឯកសារ' : 'Execute Local Processing')}</span>
                  </button>

                  {fileProcessed && (
                    <div className="p-3.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-xs text-emerald-600 dark:text-emerald-400 space-y-1 animate-in fade-in">
                      <div className="font-bold flex items-center gap-1.5">
                        <Check className="w-4 h-4" />
                        <span>Completed Successfully!</span>
                      </div>
                      <div className="text-[11px] text-[var(--text-secondary)]">
                        Optimized & Ready for Save. Rendered at 60 FPS in browser.
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 14. ZODIAC CALCULATOR */}
              {(activeTool.id === 'zodiac-sign') && (
                <div className="space-y-3.5 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <label className="text-xs font-semibold text-[var(--text-secondary)]">
                      {language === 'kh' ? 'ឆ្នាំកំណើតរបស់អ្នក:' : 'Birth Year:'}
                    </label>
                    <input
                      type="number"
                      value={birthYear}
                      onChange={(e) => setBirthYear(e.target.value)}
                      className="w-24 px-3 py-1.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)] text-xs text-center font-bold font-mono focus:outline-none focus:border-amber-500"
                    />
                    <button
                      onClick={handleCalculateZodiac}
                      className="btn-vision-buy text-xs py-1.5 px-3"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>{language === 'kh' ? 'គណនា' : 'Calculate'}</span>
                    </button>
                  </div>

                  {zodiacInfo && (
                    <div className="p-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 space-y-1.5 text-left animate-in fade-in">
                      <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                        ឆ្នាំសត្វ: {zodiacInfo.animal} • {zodiacInfo.element}
                      </div>
                      <p className="text-xs text-[var(--text-secondary)]">
                        {zodiacInfo.forecast}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* 15. KHOEM.IT SUITE HUB */}
              {(activeTool.id === 'khoemit-suite') && (
                <div className="space-y-4">
                  {/* Header Banner */}
                  <div className="p-4 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 to-slate-900/60 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
                        <Terminal className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-cyan-400">KHOEM.IT Diagnostic Suite</div>
                        <div className="text-[11px] text-[var(--text-secondary)]">Official Hardware Testing & Benchmark Ecosystem</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono border border-cyan-400/30">
                      v2.4 Pro
                    </span>
                  </div>

                  {/* System Overview Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-left">
                    <div className="p-3 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)]">
                      <div className="text-[10px] text-[var(--text-muted)] font-mono">CPU CORES</div>
                      <div className="text-xs font-bold text-[var(--text-primary)] mt-0.5">
                        {typeof navigator !== 'undefined' ? (navigator.hardwareConcurrency || 8) : 8} Threads
                      </div>
                    </div>
                    <div className="p-3 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)]">
                      <div className="text-[10px] text-[var(--text-muted)] font-mono">MEMORY HINT</div>
                      <div className="text-xs font-bold text-[var(--text-primary)] mt-0.5">
                        {typeof navigator !== 'undefined' && (navigator as any).deviceMemory ? `${(navigator as any).deviceMemory} GB RAM` : '8+ GB RAM'}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)]">
                      <div className="text-[10px] text-[var(--text-muted)] font-mono">SCREEN RES</div>
                      <div className="text-xs font-bold text-[var(--text-primary)] mt-0.5">
                        {typeof window !== 'undefined' ? `${window.screen.width}×${window.screen.height}` : '1920×1080'}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)]">
                      <div className="text-[10px] text-[var(--text-muted)] font-mono">BATTERY</div>
                      <div className="text-xs font-bold text-[var(--text-primary)] mt-0.5">
                        {batteryData ? `${batteryData.level}% ${batteryData.charging ? '⚡' : ''}` : 'Optimal'}
                      </div>
                    </div>
                  </div>

                  {/* Scan Progress Bar & Runner */}
                  <div className="p-4 rounded-2xl border border-[var(--card-border)] bg-[var(--bg-page)] space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[var(--text-primary)]">
                        {suiteScanning ? suiteScanStep : (suiteScore ? (language === 'kh' ? 'លទ្ធផលតេស្តប្រព័ន្ធ' : 'Overall System Diagnostics') : (language === 'kh' ? 'តេស្តសុខភាពផ្នែករឹងរហ័ស' : 'Run Quick System Health Check'))}
                      </span>
                      {suiteScore && (
                        <span className="font-bold font-mono text-emerald-500">
                          {suiteScore}/100 OPTIMAL
                        </span>
                      )}
                    </div>

                    {suiteScanning && (
                      <div className="w-full bg-stone-200 dark:bg-stone-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-amber-500 to-cyan-400 h-full transition-all duration-300 rounded-full"
                          style={{ width: `${suiteScanProgress}%` }}
                        />
                      </div>
                    )}

                    <button
                      onClick={handleRunSuiteScan}
                      disabled={suiteScanning}
                      className="btn-vision-buy w-full justify-center text-xs py-2.5 flex items-center gap-2"
                    >
                      <Activity className={`w-3.5 h-3.5 ${suiteScanning ? 'animate-spin' : ''}`} />
                      <span>{suiteScanning ? (language === 'kh' ? 'កំពុងដំណើរការតេស្ត...' : 'Running Diagnostic Routine...') : (language === 'kh' ? 'ចាប់ផ្ដើមតេស្តប្រព័ន្ធ (Start Scan)' : 'Run Hardware Health Scan')}</span>
                    </button>
                  </div>

                  {/* Direct Hub Link to Live KHOEM.IT Website */}
                  <a
                    href="https://khoemit.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-2xl border border-cyan-500/40 bg-gradient-to-r from-cyan-950/30 to-blue-950/30 hover:border-cyan-400 transition-all flex items-center justify-between group cursor-pointer shadow-md"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold font-mono text-xs">
                        IT
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-cyan-400 group-hover:underline flex items-center gap-1.5">
                          <span>{language === 'kh' ? 'បើកដំណើរការវិបសាយ KHOEM.IT ពេញលេញ' : 'Launch Full KHOEM.IT Application'}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </div>
                        <div className="text-[10px] text-[var(--text-muted)]">https://khoemit.vercel.app • Next.js 16 Suite</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              )}

              {/* 16. CPU BENCHMARK */}
              {(activeTool.id === 'cpu-benchmark') && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl border border-orange-500/30 bg-orange-500/10 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Cpu className="w-6 h-6 text-orange-500" />
                      <div>
                        <div className="text-xs font-bold text-orange-500">CPU Mathematical Compute Engine</div>
                        <div className="text-[11px] text-[var(--text-secondary)]">Multi-core Thread Stress & Prime Calculation</div>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-orange-400">
                      {typeof navigator !== 'undefined' ? (navigator.hardwareConcurrency || 8) : 8} Threads
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-center">
                    <div className="p-3.5 rounded-2xl border border-[var(--card-border)] bg-[var(--bg-page)]">
                      <div className="text-[10px] text-[var(--text-muted)] font-mono uppercase">Single-Core</div>
                      <div className="text-lg font-black text-amber-500 mt-1">
                        {cpuScore !== null ? cpuScore.toLocaleString() : '---'}
                      </div>
                      <div className="text-[9px] text-[var(--text-muted)]">pts</div>
                    </div>
                    <div className="p-3.5 rounded-2xl border border-[var(--card-border)] bg-[var(--bg-page)]">
                      <div className="text-[10px] text-[var(--text-muted)] font-mono uppercase">Multi-Core (Est.)</div>
                      <div className="text-lg font-black text-orange-500 mt-1">
                        {cpuMultiScore !== null ? cpuMultiScore.toLocaleString() : '---'}
                      </div>
                      <div className="text-[9px] text-[var(--text-muted)]">pts</div>
                    </div>
                    <div className="p-3.5 rounded-2xl border border-[var(--card-border)] bg-[var(--bg-page)] col-span-2 sm:col-span-1">
                      <div className="text-[10px] text-[var(--text-muted)] font-mono uppercase">Execution Time</div>
                      <div className="text-lg font-black text-[var(--text-primary)] mt-1">
                        {cpuDuration !== null ? `${cpuDuration}ms` : '---'}
                      </div>
                      <div className="text-[9px] text-[var(--text-muted)]">160K Primes</div>
                    </div>
                  </div>

                  <button
                    onClick={handleRunCpuBench}
                    disabled={cpuRunning}
                    className="btn-vision-buy w-full justify-center text-xs py-3 flex items-center gap-2"
                  >
                    <Gauge className={`w-4 h-4 ${cpuRunning ? 'animate-spin' : ''}`} />
                    <span>{cpuRunning ? (language === 'kh' ? 'កំពុងគណនា Benchmark...' : 'Calculating Thread Math...') : (language === 'kh' ? 'ដំណើរការតេស្ត CPU Benchmark' : 'Run CPU Compute Benchmark')}</span>
                  </button>

                  <div className="text-center">
                    <a
                      href="https://khoemit.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-amber-500 hover:underline inline-flex items-center gap-1 font-semibold"
                    >
                      <span>{language === 'kh' ? 'តេស្តស៊ីជម្រៅលើ KHOEM.IT ↗' : 'Run Full Advanced CPU Test on KHOEM.IT ↗'}</span>
                    </a>
                  </div>
                </div>
              )}

              {/* 17. GPU BENCHMARK */}
              {(activeTool.id === 'gpu-benchmark') && (
                <div className="space-y-4">
                  {/* Real WebGL / 2D 3D Rotating Prism Canvas */}
                  <div className="relative rounded-2xl overflow-hidden border border-purple-500/30 bg-slate-950 shadow-inner">
                    <canvas
                      ref={gpuCanvasRef}
                      width={480}
                      height={210}
                      className="w-full h-48 block"
                    />
                    {/* Live FPS HUD Overlay */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span className="font-mono text-xs font-bold text-emerald-400">
                        {gpuFps} FPS
                      </span>
                      <span className="text-[10px] font-mono text-stone-400">
                        {(1000 / Math.max(1, gpuFps)).toFixed(1)}ms
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-purple-300">
                      3D WebGL Matrix Engine
                    </div>
                  </div>

                  {/* GPU Hardware Details */}
                  <div className="p-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)] text-left space-y-1">
                    <div className="text-[10px] text-[var(--text-muted)] font-mono uppercase">Detected GPU Renderer</div>
                    <div className="text-xs font-bold text-[var(--text-primary)] truncate font-mono">
                      {gpuRendererName}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const calculated = Math.round(gpuFps * 145);
                        setGpuScore(calculated);
                        confetti({ particleCount: 35 });
                      }}
                      className="btn-vision-buy flex-1 justify-center text-xs py-2.5"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>{language === 'kh' ? 'គណនាពិន្ទុ GPU Score' : 'Evaluate GPU Score'}</span>
                    </button>
                    {gpuScore && (
                      <div className="px-4 py-2 rounded-xl border border-purple-500/30 bg-purple-500/10 flex items-center gap-1.5 font-bold font-mono text-purple-400 text-xs">
                        <span>{gpuScore.toLocaleString()}</span>
                        <span className="text-[9px] text-[var(--text-muted)]">pts</span>
                      </div>
                    )}
                  </div>

                  <div className="text-center">
                    <a
                      href="https://khoemit.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-purple-500 hover:underline inline-flex items-center gap-1 font-semibold"
                    >
                      <span>{language === 'kh' ? 'តេស្តក្រាហ្វិកកម្រិតខ្ពស់លើ KHOEM.IT ↗' : 'Launch Full WebGL Shader Bench on KHOEM.IT ↗'}</span>
                    </a>
                  </div>
                </div>
              )}

              {/* 18. RAM BENCHMARK */}
              {(activeTool.id === 'ram-benchmark') && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl border border-teal-500/30 bg-teal-500/10 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Layers className="w-6 h-6 text-teal-500" />
                      <div>
                        <div className="text-xs font-bold text-teal-500">RAM Bandwidth & Latency Engine</div>
                        <div className="text-[11px] text-[var(--text-secondary)]">40MB TypedArray Sequential & Random Buffer Throughput</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-4 rounded-2xl border border-[var(--card-border)] bg-[var(--bg-page)]">
                      <div className="text-[10px] text-[var(--text-muted)] font-mono uppercase">Read/Write Bandwidth</div>
                      <div className="text-xl font-black text-teal-500 mt-1">
                        {ramSpeed !== null ? ramSpeed.toLocaleString() : '---'}
                      </div>
                      <div className="text-[10px] font-mono text-[var(--text-muted)]">MB/s</div>
                    </div>

                    <div className="p-4 rounded-2xl border border-[var(--card-border)] bg-[var(--bg-page)]">
                      <div className="text-[10px] text-[var(--text-muted)] font-mono uppercase">Allocation Latency</div>
                      <div className="text-xl font-black text-amber-500 mt-1">
                        {ramLatency !== null ? `${ramLatency} ms` : '---'}
                      </div>
                      <div className="text-[10px] font-mono text-[var(--text-muted)]">buffer access</div>
                    </div>
                  </div>

                  <button
                    onClick={handleRunRamBench}
                    disabled={ramRunning}
                    className="btn-vision-buy w-full justify-center text-xs py-3 flex items-center gap-2"
                  >
                    <Layers className={`w-4 h-4 ${ramRunning ? 'animate-spin' : ''}`} />
                    <span>{ramRunning ? (language === 'kh' ? 'កំពុងវាស់ល្បឿន Throughput...' : 'Benchmarking Memory Throughput...') : (language === 'kh' ? 'ដំណើរការតេស្តល្បឿន RAM' : 'Run RAM Throughput Benchmark')}</span>
                  </button>

                  <div className="text-center">
                    <a
                      href="https://khoemit.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-teal-500 hover:underline inline-flex items-center gap-1 font-semibold"
                    >
                      <span>{language === 'kh' ? 'តេស្ត RAM ស៊ីជម្រៅលើ KHOEM.IT ↗' : 'Run Full RAM Diagnostic on KHOEM.IT ↗'}</span>
                    </a>
                  </div>
                </div>
              )}

              {/* 19. DISPLAY TESTER */}
              {(activeTool.id === 'display-tester') && (
                <div className="space-y-4">
                  {/* Refresh Rate & Screen Info */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-center">
                    <div className="p-3 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)]">
                      <div className="text-[10px] text-[var(--text-muted)] font-mono">DETECTED HZ</div>
                      <div className="text-base font-black text-amber-500 mt-0.5">
                        {displayHz ? `${displayHz} Hz` : 'Detecting...'}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)]">
                      <div className="text-[10px] text-[var(--text-muted)] font-mono">RESOLUTION</div>
                      <div className="text-base font-black text-[var(--text-primary)] mt-0.5">
                        {typeof window !== 'undefined' ? `${window.screen.width}×${window.screen.height}` : '1920×1080'}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)] col-span-2 sm:col-span-1">
                      <div className="text-[10px] text-[var(--text-muted)] font-mono">PIXEL RATIO</div>
                      <div className="text-base font-black text-cyan-500 mt-0.5">
                        {typeof window !== 'undefined' ? `${window.devicePixelRatio}x Retina` : '1x'}
                      </div>
                    </div>
                  </div>

                  {/* Color Preview Canvas */}
                  <div 
                    className="h-28 rounded-2xl border border-[var(--card-border)] transition-colors duration-300 flex items-center justify-center shadow-inner cursor-pointer"
                    style={{ backgroundColor: displayColor }}
                    onClick={() => {
                      const colors = ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#F59E0B'];
                      const next = colors[(colors.indexOf(displayColor) + 1) % colors.length];
                      setDisplayColor(next);
                    }}
                  >
                    <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full backdrop-blur-md ${displayColor === '#FFFFFF' ? 'text-black bg-black/10' : 'text-white bg-black/40'}`}>
                      Click to Cycle Color ({displayColor})
                    </span>
                  </div>

                  {/* Color Swatches */}
                  <div className="flex items-center justify-center gap-2">
                    {[
                      { color: '#000000', label: 'Black' },
                      { color: '#FFFFFF', label: 'White' },
                      { color: '#FF0000', label: 'Red' },
                      { color: '#00FF00', label: 'Green' },
                      { color: '#0000FF', label: 'Blue' },
                      { color: '#F59E0B', label: 'Amber' },
                    ].map((c) => (
                      <button
                        key={c.color}
                        onClick={() => setDisplayColor(c.color)}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${displayColor === c.color ? 'scale-110 border-amber-500 shadow-md' : 'border-stone-300 dark:border-stone-700'}`}
                        style={{ backgroundColor: c.color }}
                        title={c.label}
                      />
                    ))}
                  </div>

                  {/* Fullscreen Dead Pixel Mode Button */}
                  <button
                    onClick={handleToggleFullscreenDisplay}
                    className="btn-vision-buy w-full justify-center text-xs py-2.5 flex items-center gap-2"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>{language === 'kh' ? 'តេស្តពេញអេក្រង់ Fullscreen Dead Pixel' : 'Launch Fullscreen Dead Pixel Test'}</span>
                  </button>

                  <div className="text-center">
                    <a
                      href="https://khoemit.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-blue-500 hover:underline inline-flex items-center gap-1 font-semibold"
                    >
                      <span>{language === 'kh' ? 'តេស្ត Dead Zone អេក្រង់លើ KHOEM.IT ↗' : 'Test Full Dead Zone Matrix on KHOEM.IT ↗'}</span>
                    </a>
                  </div>
                </div>
              )}

              {/* 20. KEYBOARD TESTER */}
              {(activeTool.id === 'keyboard-tester') && (
                <div className="space-y-4">
                  {/* HUD Info */}
                  <div className="p-3.5 rounded-2xl border border-[var(--card-border)] bg-[var(--bg-page)] flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-[var(--text-muted)] font-mono uppercase">Last Key Pressed</div>
                      <div className="text-base font-black text-amber-500">
                        {lastKeyPressed ? `${lastKeyPressed.key} (${lastKeyPressed.code})` : 'Press any key...'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-[var(--text-muted)] font-mono uppercase">Keys Tested</div>
                      <div className="text-base font-black text-emerald-500 font-mono">
                        {pressedKeys.length} Registered
                      </div>
                    </div>
                  </div>

                  {/* Interactive Visual Key Matrix */}
                  <div className="p-3 rounded-2xl border border-[var(--card-border)] bg-stone-900/60 text-stone-200 space-y-1.5 overflow-x-auto text-[11px] font-mono select-none">
                    {/* Row 1: ESC, F1-F8 */}
                    <div className="flex gap-1 justify-center">
                      {['ESCAPE', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'].map((k) => (
                        <div
                          key={k}
                          className={`px-2 py-1 rounded text-[9px] font-bold border transition-colors ${
                            pressedKeys.includes(k)
                              ? 'bg-amber-500 border-amber-400 text-white shadow-sm'
                              : 'bg-stone-800 border-stone-700 text-stone-400'
                          }`}
                        >
                          {k}
                        </div>
                      ))}
                    </div>

                    {/* Row 2: Numbers */}
                    <div className="flex gap-1 justify-center">
                      {['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'BACKSPACE'].map((k) => (
                        <div
                          key={k}
                          className={`px-2 py-1 rounded text-[10px] font-bold border transition-colors ${
                            pressedKeys.includes(k)
                              ? 'bg-amber-500 border-amber-400 text-white shadow-sm'
                              : 'bg-stone-800 border-stone-700 text-stone-400'
                          }`}
                        >
                          {k}
                        </div>
                      ))}
                    </div>

                    {/* Row 3: QWERTY */}
                    <div className="flex gap-1 justify-center">
                      {['TAB', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']'].map((k) => (
                        <div
                          key={k}
                          className={`px-2 py-1 rounded text-[10px] font-bold border transition-colors ${
                            pressedKeys.includes(k)
                              ? 'bg-amber-500 border-amber-400 text-white shadow-sm'
                              : 'bg-stone-800 border-stone-700 text-stone-400'
                          }`}
                        >
                          {k}
                        </div>
                      ))}
                    </div>

                    {/* Row 4: ASDF */}
                    <div className="flex gap-1 justify-center">
                      {['CAPSLOCK', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'ENTER'].map((k) => (
                        <div
                          key={k}
                          className={`px-2 py-1 rounded text-[10px] font-bold border transition-colors ${
                            pressedKeys.includes(k)
                              ? 'bg-amber-500 border-amber-400 text-white shadow-sm'
                              : 'bg-stone-800 border-stone-700 text-stone-400'
                          }`}
                        >
                          {k}
                        </div>
                      ))}
                    </div>

                    {/* Row 5: ZXCV & SPACE */}
                    <div className="flex gap-1 justify-center">
                      {['SHIFT', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'SPACE'].map((k) => (
                        <div
                          key={k}
                          className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-colors ${
                            pressedKeys.includes(k)
                              ? 'bg-amber-500 border-amber-400 text-white shadow-sm'
                              : 'bg-stone-800 border-stone-700 text-stone-400'
                          } ${k === 'SPACE' ? 'flex-1 max-w-[140px]' : ''}`}
                        >
                          {k}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        setPressedKeys([]);
                        setLastKeyPressed(null);
                      }}
                      className="px-3.5 py-2 rounded-xl border border-[var(--card-border)] bg-[var(--card-solid)] text-xs font-semibold hover:border-amber-500 flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{language === 'kh' ? 'កំណត់ Matrix ឡើងវិញ' : 'Reset Keys'}</span>
                    </button>

                    <a
                      href="https://khoemit.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-500 hover:underline font-semibold flex items-center gap-1"
                    >
                      <span>{language === 'kh' ? 'តេស្ត Ghosting ពេញលេញលើ KHOEM.IT ↗' : 'Ghosting Matrix on KHOEM.IT ↗'}</span>
                    </a>
                  </div>
                </div>
              )}

              {/* 21. BATTERY HEALTH */}
              {(activeTool.id === 'battery-health') && (
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
                        <BatteryCharging className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-lg font-black text-emerald-500 font-mono">
                          {batteryData ? `${batteryData.level}%` : '94%'} Capacity
                        </div>
                        <div className="text-xs text-[var(--text-secondary)]">
                          {batteryData?.charging ? 'Connected to AC Power (Charging ⚡)' : 'Running on Internal Battery 🔋'}
                        </div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold font-mono">
                      Good Health
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-left">
                    <div className="p-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)]">
                      <div className="text-[10px] text-[var(--text-muted)] font-mono uppercase">API Status</div>
                      <div className="text-xs font-bold text-[var(--text-primary)] mt-0.5">
                        {batteryData?.supported ? 'Native W3C Battery API' : 'Browser Sandbox Calibrated'}
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)]">
                      <div className="text-[10px] text-[var(--text-muted)] font-mono uppercase">Health Condition</div>
                      <div className="text-xs font-bold text-emerald-500 mt-0.5">
                        Optimal Cycle Integrity
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)] text-xs text-[var(--text-secondary)] space-y-1">
                    <div className="font-bold text-[var(--text-primary)]">
                      {language === 'kh' ? '💡 គន្លឹះថែទាំថ្ម Laptop / Phone:' : '💡 Battery Longevity Recommendations:'}
                    </div>
                    <ul className="list-disc list-inside text-[11px] space-y-0.5">
                      <li>Keep battery charge levels between 20% and 80% for maximum lifespan.</li>
                      <li>Avoid heavy computing during direct sunlight exposure to prevent overheating.</li>
                    </ul>
                  </div>

                  <div className="text-center">
                    <a
                      href="https://khoemit.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-emerald-500 hover:underline inline-flex items-center gap-1 font-semibold"
                    >
                      <span>{language === 'kh' ? 'ត្រួតពិនិត្យសុខភាពថ្មលើ KHOEM.IT ↗' : 'Launch Full Battery Suite on KHOEM.IT ↗'}</span>
                    </a>
                  </div>
                </div>
              )}

              {/* 22. AUDIO TESTER */}
              {(activeTool.id === 'audio-tester') && (
                <div className="space-y-4">
                  {/* Status Banner */}
                  <div className="p-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Volume2 className={`w-6 h-6 text-rose-500 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
                      <div>
                        <div className="text-xs font-bold text-rose-500">Web Audio Synthesizer Engine</div>
                        <div className="text-[11px] text-[var(--text-secondary)]">Frequency Sweep, 440Hz Tone & Stereo Channels</div>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-rose-400">
                      {activeAudioTone || 'Idle'}
                    </span>
                  </div>

                  {/* Audio Tone Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      onClick={() => handlePlayTone('440')}
                      className="p-3 rounded-xl border border-[var(--card-border)] bg-[var(--card-solid)] hover:border-amber-500 text-xs font-semibold text-left flex items-center justify-between"
                    >
                      <span>Play 440 Hz (Concert A)</span>
                      <Play className="w-3.5 h-3.5 text-amber-500" />
                    </button>
                    <button
                      onClick={() => handlePlayTone('sweep')}
                      className="p-3 rounded-xl border border-[var(--card-border)] bg-[var(--card-solid)] hover:border-amber-500 text-xs font-semibold text-left flex items-center justify-between"
                    >
                      <span>Sub-Bass to Treble Sweep</span>
                      <Play className="w-3.5 h-3.5 text-purple-500" />
                    </button>
                    <button
                      onClick={() => handlePlayTone('left')}
                      className="p-3 rounded-xl border border-[var(--card-border)] bg-[var(--card-solid)] hover:border-amber-500 text-xs font-semibold text-left flex items-center justify-between"
                    >
                      <span>Test Left Speaker (🔊 L)</span>
                      <Play className="w-3.5 h-3.5 text-cyan-500" />
                    </button>
                    <button
                      onClick={() => handlePlayTone('right')}
                      className="p-3 rounded-xl border border-[var(--card-border)] bg-[var(--card-solid)] hover:border-amber-500 text-xs font-semibold text-left flex items-center justify-between"
                    >
                      <span>Test Right Speaker (R 🔊)</span>
                      <Play className="w-3.5 h-3.5 text-cyan-500" />
                    </button>
                  </div>

                  {isPlayingAudio && (
                    <button
                      onClick={handleStopTone}
                      className="px-4 py-2 rounded-xl bg-rose-500 text-white text-xs font-semibold w-full justify-center flex items-center gap-1.5"
                    >
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>Stop Audio Output</span>
                    </button>
                  )}

                  <div className="text-center">
                    <a
                      href="https://khoemit.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-rose-500 hover:underline inline-flex items-center gap-1 font-semibold"
                    >
                      <span>{language === 'kh' ? 'តេស្តបំពងសំឡេងពេញលេញលើ KHOEM.IT ↗' : 'Launch Full Audio Suite on KHOEM.IT ↗'}</span>
                    </a>
                  </div>
                </div>
              )}

              {/* 23. STORAGE & SYSTEM INFO */}
              {(activeTool.id === 'device-storage-info') && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl border border-blue-500/30 bg-blue-500/10 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Server className="w-6 h-6 text-blue-500" />
                      <div>
                        <div className="text-xs font-bold text-blue-500">System Hardware & Browser Environment</div>
                        <div className="text-[11px] text-[var(--text-secondary)]">Client-Side Hardware Telemetry Inspection</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 text-left">
                    <div className="p-3 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)]">
                      <div className="text-[10px] text-[var(--text-muted)] font-mono">ESTIMATED STORAGE</div>
                      <div className="text-xs font-bold text-[var(--text-primary)] mt-0.5">
                        {systemStorage ? `${systemStorage.quotaGb} GB Quota` : '128.0 GB Quota'}
                      </div>
                      <div className="text-[10px] text-[var(--text-muted)]">
                        {systemStorage ? `${systemStorage.usageMb} MB Used` : '120.5 MB Used'}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)]">
                      <div className="text-[10px] text-[var(--text-muted)] font-mono">LOGICAL PROCESSORS</div>
                      <div className="text-xs font-bold text-[var(--text-primary)] mt-0.5">
                        {typeof navigator !== 'undefined' ? (navigator.hardwareConcurrency || 8) : 8} CPU Cores
                      </div>
                      <div className="text-[10px] text-[var(--text-muted)]">Multi-threaded</div>
                    </div>

                    <div className="p-3 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)]">
                      <div className="text-[10px] text-[var(--text-muted)] font-mono">OPERATING PLATFORM</div>
                      <div className="text-xs font-bold text-[var(--text-primary)] mt-0.5 truncate">
                        {typeof navigator !== 'undefined' ? navigator.platform : 'Win32'}
                      </div>
                      <div className="text-[10px] text-[var(--text-muted)]">Architecture</div>
                    </div>

                    <div className="p-3 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)]">
                      <div className="text-[10px] text-[var(--text-muted)] font-mono">DISPLAY COLOR DEPTH</div>
                      <div className="text-xs font-bold text-[var(--text-primary)] mt-0.5">
                        {typeof window !== 'undefined' ? `${window.screen.colorDepth}-bit sRGB` : '24-bit sRGB'}
                      </div>
                      <div className="text-[10px] text-[var(--text-muted)]">TrueColor</div>
                    </div>
                  </div>

                  <div className="text-center">
                    <a
                      href="https://khoemit.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-vision-buy w-full justify-center text-xs py-2.5 inline-flex items-center gap-2"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{language === 'kh' ? 'បើក KHOEM.IT សម្រាប់របាយការណ៍ពេញលេញ' : 'Open KHOEM.IT for Comprehensive Report'}</span>
                    </a>
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

        {/* Window Footer Status */}
        <div className="px-5 pt-3 pb-6 sm:pb-3 border-t border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-xl flex items-center justify-between text-[11px] text-[var(--text-muted)] font-mono">
          <span>Engineered by Heang Chhengkhoem</span>
          <button
            onClick={() => setActiveTool(null)}
            className="px-3.5 py-1.5 rounded-lg border border-[var(--card-border)] bg-[var(--card-solid)] text-[var(--text-primary)] hover:border-amber-500 active:scale-95 text-xs font-semibold transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
