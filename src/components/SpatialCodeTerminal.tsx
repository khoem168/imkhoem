'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Terminal, 
  Play, 
  Pause, 
  RotateCcw, 
  Copy, 
  Check, 
  Sparkles, 
  Cpu, 
  Layers, 
  Zap,
  Code2,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { usePortal } from '@/context/ThemeLanguageContext';

interface CodeSnippet {
  id: string;
  filename: string;
  language: string;
  badge: string;
  badgeColor: string;
  lines: string[];
}

const SNIPPETS: CodeSnippet[] = [
  {
    id: 'core-engine',
    filename: 'core-engine.ts',
    language: 'typescript',
    badge: 'Next.js 16 + React 19',
    badgeColor: 'text-amber-500 bg-amber-500/10 border-amber-500/25',
    lines: [
      '// ⚡ Heang Chhengkhoem • Ecosystem Architecture v27.0',
      'import { NextEngine, VisionGlass, TurboServer } from "@khoem/core";',
      'import { KhmerAICluster } from "@khoem/ai-engine";',
      '',
      'export async function bootDigitalHub() {',
      '  const hub = new TurboServer({',
      '    region: "ap-southeast-1 // Phnom Penh",',
      '    telemetry: "ZERO_TRACKING_PRIVATE",',
      '    uptimeGuarantee: 0.999',
      '  });',
      '',
      '  // 1. Mount 400+ Game Topup & ABA KHQR Merchant',
      '  await hub.mountService("KHOEMSTORE", {',
      '    paymentGateway: "BAKONG_KHQR_INSTANT",',
      '    latencyMs: 14',
      '  });',
      '',
      '  // 2. Initialize 24+ Client-Side Diagnostic & AI Tools',
      '  const ai = await KhmerAICluster.initialize({',
      '    webWorkers: navigator.hardwareConcurrency || 8,',
      '    wasmAccelerated: true',
      '  });',
      '',
      '  return { status: "ONLINE_60FPS", hubReady: true };',
      '}',
    ],
  },
  {
    id: 'khmer-ai',
    filename: 'khmer-ai.ts',
    language: 'typescript',
    badge: 'Khmer LLM & OCR Engine',
    badgeColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/25',
    lines: [
      '// 🧠 Khmer AI Neural Studio • Zero Telemetry',
      'import { KhmerTokenizer, SpatialOCR } from "@khoem/khmer-ai";',
      '',
      'export class KhmerLanguagePipeline {',
      '  private model: SpatialOCR;',
      '',
      '  constructor() {',
      '    this.model = new SpatialOCR({ weights: "khmer-v4-quantized" });',
      '  }',
      '',
      '  async processImageToKhmerText(fileBuffer: ArrayBuffer) {',
      '    const segmentation = await this.model.segment(fileBuffer);',
      '    const text = KhmerTokenizer.decode(segmentation);',
      '    return {',
      '      confidence: 0.994,',
      '      script: "Kantumruy Pro // Khmer Unicode",',
      '      result: text',
      '    };',
      '  }',
      '}',
    ],
  },
  {
    id: 'telegram-bot',
    filename: 'bot-network.ts',
    language: 'typescript',
    badge: 'Telegram Bot API Cluster',
    badgeColor: 'text-sky-500 bg-sky-500/10 border-sky-500/25',
    lines: [
      '// 🤖 Autonomous Telegram Bot Router • 75K+ Users',
      'import { BotCluster, WebhookDispatcher } from "@khoem/telegram";',
      '',
      'const network = new BotCluster({',
      '  bots: ["KhmerQuizBot", "SmartToolBot", "ExchangeKHQRBot"],',
      '  rateLimit: "10,000 req/sec",',
      '});',
      '',
      'network.onMessage(async ({ user, text, reply }) => {',
      '  if (text.startsWith("/topup")) {',
      '    const qr = await network.generateKHQR({ amount: 1.00 });',
      '    return reply.withPhoto(qr, "Scan via ABA / Bakong");',
      '  }',
      '  return reply.send("⚡ Heang Chhengkhoem Bot Cluster Online");',
      '});',
    ],
  },
];

export default function SpatialCodeTerminal() {
  const { language } = usePortal();
  const [selectedSnippetIdx, setSelectedSnippetIdx] = useState(0);
  const [displayedLineCount, setDisplayedLineCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionOutput, setExecutionOutput] = useState<string | null>(null);

  const snippet = SNIPPETS[selectedSnippetIdx];
  const totalLines = snippet.lines.length;

  // Stream typing effect
  useEffect(() => {
    setDisplayedLineCount(0);
    setExecutionOutput(null);
  }, [selectedSnippetIdx]);

  useEffect(() => {
    if (!isPlaying) return;

    if (displayedLineCount < totalLines) {
      const timer = setTimeout(() => {
        setDisplayedLineCount((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [displayedLineCount, totalLines, isPlaying]);

  const handleCopyCode = () => {
    const fullCode = snippet.lines.join('\n');
    navigator.clipboard.writeText(fullCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReplay = () => {
    setDisplayedLineCount(0);
    setIsPlaying(true);
    setExecutionOutput(null);
  };

  const handleExecuteSimulation = () => {
    setIsExecuting(true);
    setExecutionOutput(null);

    setTimeout(() => {
      setIsExecuting(false);
      setExecutionOutput(
        language === 'kh'
          ? `[SUCCESS] បានផ្ទៀងផ្ទាត់កូដ Next.js 16 ក្នុងរយៈពេល 128ms! ម៉ាស៊ីនដំណើរការ 60 FPS ដោយគ្មានបញ្ហា។`
          : `[SUCCESS] Compiled with Turbopack in 128ms! All 24+ AI Tools and services verified.`
      );
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#00e5ff', '#ff9500', '#10b981'],
      });
    }, 600);
  };

  // Syntax highlighting helper for code tokens
  const formatSyntax = (line: string) => {
    if (line.startsWith('//')) {
      return <span className="text-slate-400 dark:text-zinc-500 italic">{line}</span>;
    }
    if (line.startsWith('import') || line.startsWith('export') || line.startsWith('const') || line.startsWith('class') || line.startsWith('private') || line.startsWith('async') || line.startsWith('await') || line.startsWith('return') || line.startsWith('new')) {
      const parts = line.split(/(\b(?:import|from|export|async|await|const|class|private|constructor|return|new|function)\b)/g);
      return (
        <span>
          {parts.map((part, i) => {
            if (/^(import|from|export|async|await|const|class|private|constructor|return|new|function)$/.test(part)) {
              return <span key={i} className="text-purple-500 dark:text-purple-400 font-bold">{part}</span>;
            }
            if (part.includes('"') || part.includes("'")) {
              return <span key={i} className="text-emerald-600 dark:text-emerald-400">{part}</span>;
            }
            return <span key={i} className="text-[var(--text-primary)]">{part}</span>;
          })}
        </span>
      );
    }
    if (line.includes('"') || line.includes("'")) {
      return <span className="text-emerald-600 dark:text-emerald-400">{line}</span>;
    }
    return <span className="text-[var(--text-primary)]">{line}</span>;
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-10 px-4 perspective-1200">
      {/* 3D Holographic Code Terminal Window */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ rotateY: 1.5, rotateX: -1 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="rounded-[28px] border border-white/80 dark:border-white/10 bg-white/85 dark:bg-[#0c1017]/95 shadow-[0_20px_60px_rgba(15,23,42,0.12)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.8)] backdrop-blur-2xl overflow-hidden transition-transform duration-300"
      >
        {/* Terminal Title Bar */}
        <div className="px-4 sm:px-5 py-3.5 border-b border-[var(--card-border)] bg-[var(--bg-page)]/60 flex items-center justify-between gap-3 select-none">
          {/* macOS / VisionOS Traffic Light Dots */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-amber-500 shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm" />
            
            <div className="ml-2 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-amber-500 hidden sm:inline" />
              <span className="text-xs font-mono font-bold text-[var(--text-primary)]">
                {snippet.filename}
              </span>
            </div>
          </div>

          {/* Snippet Tabs */}
          <div className="flex items-center gap-1 bg-stone-200/60 dark:bg-zinc-800/80 p-1 rounded-xl border border-[var(--card-border)] overflow-x-auto scrollbar-none">
            {SNIPPETS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setSelectedSnippetIdx(idx)}
                className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  selectedSnippetIdx === idx
                    ? 'bg-[var(--card-solid)] text-amber-500 shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {item.filename}
              </button>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Play / Pause toggle */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-lg border border-[var(--card-border)] bg-[var(--card-solid)] text-[var(--text-secondary)] hover:text-amber-500 transition-colors cursor-pointer"
              title={isPlaying ? 'Pause streaming' : 'Resume streaming'}
              aria-label="Toggle code animation"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-500" />}
            </button>

            {/* Replay */}
            <button
              onClick={handleReplay}
              className="p-1.5 rounded-lg border border-[var(--card-border)] bg-[var(--card-solid)] text-[var(--text-secondary)] hover:text-amber-500 transition-colors cursor-pointer"
              title="Replay code animation"
              aria-label="Replay code"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Copy */}
            <button
              onClick={handleCopyCode}
              className="p-1.5 rounded-lg border border-[var(--card-border)] bg-[var(--card-solid)] text-[var(--text-secondary)] hover:text-amber-500 transition-colors cursor-pointer"
              title="Copy snippet"
              aria-label="Copy code"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Code Canvas Body */}
        <div className="p-4 sm:p-6 font-mono text-xs leading-relaxed overflow-x-auto min-h-[260px] sm:min-h-[290px] bg-stone-950/5 dark:bg-[#070a0e]/80">
          <div className="space-y-1">
            {snippet.lines.slice(0, displayedLineCount).map((line, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <span className="w-6 shrink-0 text-right text-[11px] font-mono text-stone-400 dark:text-zinc-600 select-none">
                  {idx + 1}
                </span>
                <span className="whitespace-pre flex-1 text-[11px] sm:text-xs">
                  {formatSyntax(line)}
                </span>
              </div>
            ))}

            {/* Glowing Blinking Cursor while streaming or active */}
            {displayedLineCount <= totalLines && (
              <div className="flex items-center gap-4">
                <span className="w-6 shrink-0 text-right text-[11px] font-mono text-stone-400 dark:text-zinc-600 select-none">
                  {displayedLineCount + 1}
                </span>
                <span className="w-2.5 h-4 bg-amber-500 animate-cursor-blink inline-block rounded-xs shadow-[0_0_8px_#f59e0b]" />
              </div>
            )}
          </div>

          {/* Interactive Simulation Output */}
          <AnimatePresence>
            {executionOutput && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[11px] font-mono flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>{executionOutput}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Terminal Footer Bar */}
        <div className="px-4 sm:px-6 py-3 border-t border-[var(--card-border)] bg-[var(--bg-page)]/80 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-3">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${snippet.badgeColor}`}>
              {snippet.badge}
            </span>
            <span className="hidden sm:inline">Lines: {displayedLineCount}/{totalLines}</span>
            <span>•</span>
            <span className="text-emerald-500 font-bold">Turbopack Ready</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExecuteSimulation}
              disabled={isExecuting}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold text-xs shadow-sm active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>{isExecuting ? 'Compiling...' : (language === 'kh' ? 'សាកល្បងដំណើរការ (Run)' : 'Execute Code')}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
