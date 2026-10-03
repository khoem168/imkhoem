'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import { usePortal } from '@/context/ThemeLanguageContext';
import { 
  Sparkles, 
  Gamepad2, 
  Send, 
  QrCode, 
  ArrowUpRight, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  ExternalLink,
  Layers,
  Copy,
  Check,
  Download,
  Terminal,
  Activity
} from 'lucide-react';

export default function ModernBentoGrid() {
  const { language } = usePortal();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  // Interactive Live Sandbox: Instant QR Code Generator
  const [qrText, setQrText] = useState('https://t.me/heangchhengkhoem');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copiedQr, setCopiedQr] = useState(false);

  // Client-side hardware detection
  const [cpuCores, setCpuCores] = useState(8);
  const [screenRes, setScreenRes] = useState('1920x1080');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCpuCores(navigator.hardwareConcurrency || 8);
      setScreenRes(`${window.screen.width}x${window.screen.height}`);
    }
  }, []);

  // Generate real QR code on text change
  useEffect(() => {
    if (qrText.trim()) {
      QRCode.toDataURL(qrText.trim(), {
        width: 180,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch(() => {});
    }
  }, [qrText]);

  // Spotlight mouse tracker across the entire Bento Grid
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 });
  };

  const handleCopyQr = () => {
    navigator.clipboard.writeText(qrText);
    setCopiedQr(true);
    confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
    setTimeout(() => setCopiedQr(false), 2000);
  };

  return (
    <section 
      id="bento" 
      className="py-12 px-4 max-w-6xl mx-auto w-full relative"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
        <div>
          <span className="section-tag inline-flex items-center gap-2 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{language === 'kh' ? 'ប្រព័ន្ធអេកូឡូស៊ី' : 'ECOSYSTEM OVERVIEW'}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--text-primary)]">
            {language === 'kh' ? 'ស្ថាបត្យកម្មប្រព័ន្ធ & សមត្ថភាពស្នូល' : 'Architectural Systems & Live Capabilities'}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 max-w-xl">
            {language === 'kh'
              ? 'វេទិកាពាណិជ្ជកម្ម KHOEMSTORE, ឧបករណ៍ AI លើ Browser, និងបណ្តាញ Bot ស្វ័យប្រវត្ត ដំណើរការដោយ Next.js 16។'
              : 'Production commerce platforms, client-side zero-telemetry utilities, and autonomous Telegram bot networks.'}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Full Architecture Active</span>
        </div>
      </div>

      {/* Modern Bento Grid Container with Spotlight Cursor Illumination */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 group/bento"
        style={{
          // @ts-ignore
          '--spotlight-x': `${mousePos.x}px`,
          '--spotlight-y': `${mousePos.y}px`,
        }}
      >
        {/* Dynamic Global Spotlight Layer */}
        <div 
          className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500 z-0"
          style={{
            background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 158, 11, 0.12), transparent 75%)`,
          }}
        />

        {/* ====================================================================
            CELL 1: FLAGSHIP PLATFORM (KHOEMSTORE) — SPANS 2 COLUMNS ON LG
            ==================================================================== */}
        <div className="lg:col-span-2 rounded-[28px] border border-[var(--card-border)] bg-[var(--card-solid)] p-6 sm:p-7 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:border-amber-500/50 transition-all z-10">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            {/* Top row: Status pill + Link */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-600 dark:text-amber-400 text-[11px] font-mono font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{language === 'kh' ? 'គម្រោងហាងពាណិជ្ជកម្មផ្លូវការ' : 'Flagship Commerce Platform'}</span>
              </div>

              <a
                href="https://www.khoemstore.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 hover:text-amber-600 transition-colors"
              >
                <span>khoemstore.com</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Headline and Narrative */}
            <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] group-hover:text-amber-500 transition-colors">
              KHOEMSTORE — Direct Gaming Reload & Digital Commerce
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 leading-relaxed max-w-2xl">
              {language === 'kh'
                ? 'វេទិកាបញ្ចូលលុយហ្គេម និងទំនិញឌីជីថលជាង ៤០០+ ហ្គេម (Free Fire, Mobile Legends, Roblox, Honor of Kings, EAFC Mobile) ដំណើរការដោយស្វ័យប្រវត្ត ២៤/៧ ជាមួយការស្កេនទូទាត់ភ្លាមៗតាម Bakong ABA KHQR។'
                : 'Cambodia\'s premier automated direct game reload platform supporting 400+ titles with sub-60s server delivery and instant universal Bakong ABA KHQR payment processing.'}
            </p>

            {/* Badges / Proof Points */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="px-3 py-1 rounded-lg bg-[var(--bg-page)] text-[11px] font-mono text-[var(--text-primary)] border border-[var(--card-border)] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#005f87]" />
                <span>ABA KHQR Instant</span>
              </span>
              <span className="px-3 py-1 rounded-lg bg-[var(--bg-page)] text-[11px] font-mono text-[var(--text-primary)] border border-[var(--card-border)] font-bold flex items-center gap-1.5">
                <Gamepad2 className="w-3.5 h-3.5 text-amber-500" />
                <span>400+ Supported Games</span>
              </span>
              <span className="px-3 py-1 rounded-lg bg-[var(--bg-page)] text-[11px] font-mono text-[var(--text-primary)] border border-[var(--card-border)] font-bold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-500" />
                <span>Instant Auto-Fulfillment</span>
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 mt-6 border-t border-[var(--card-border)]/60 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs font-mono text-[var(--text-muted)]">
              Architecture: Next.js + KHQR Webhook Gateway
            </div>

            <a
              href="https://www.khoemstore.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <span>{language === 'kh' ? 'ចូលទៅកាន់ KHOEMSTORE ↗' : 'Launch KHOEMSTORE ↗'}</span>
            </a>
          </div>
        </div>

        {/* ====================================================================
            CELL 2: INTERACTIVE LIVE SANDBOX WIDGET (INSTANT QR CODE GENERATOR)
            ==================================================================== */}
        <div className="rounded-[28px] border border-[var(--card-border)] bg-[var(--card-solid)] p-6 flex flex-col justify-between shadow-sm relative group hover:border-cyan-500/50 transition-all z-10">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-600 dark:text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                <QrCode className="w-3.5 h-3.5 text-cyan-500" />
                <span>{language === 'kh' ? 'ឧបករណ៍សាកល្បងផ្ទាល់' : 'Live Interactive Sandbox'}</span>
              </div>
              <span className="text-[10px] font-mono text-[var(--text-muted)]">Instant Test</span>
            </div>

            <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-cyan-500 transition-colors">
              {language === 'kh' ? 'បង្កើត QR Code ផ្ទាល់' : 'Instant Client-Side QR Engine'}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              {language === 'kh' ? 'វាយបញ្ចូលតំណភ្ជាប់ ឬអក្សរដើម្បីបង្កើត QR ភ្លាមៗ:' : 'Type link or text to generate live QR instantly:'}
            </p>

            {/* Input field */}
            <div className="mt-3">
              <input
                type="text"
                value={qrText}
                onChange={(e) => setQrText(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3 py-2 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)] text-xs text-[var(--text-primary)] font-mono focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {/* Quick preset chips */}
            <div className="flex items-center gap-1.5 mt-2">
              <button
                onClick={() => setQrText('https://t.me/heangchhengkhoem')}
                className="px-2 py-0.5 rounded-md bg-[var(--bg-page)] hover:bg-cyan-500/10 hover:text-cyan-500 text-[10px] font-mono text-[var(--text-muted)] border border-[var(--card-border)] transition-colors cursor-pointer"
              >
                Telegram
              </button>
              <button
                onClick={() => setQrText('https://www.khoemstore.com/')}
                className="px-2 py-0.5 rounded-md bg-[var(--bg-page)] hover:bg-amber-500/10 hover:text-amber-500 text-[10px] font-mono text-[var(--text-muted)] border border-[var(--card-border)] transition-colors cursor-pointer"
              >
                KHOEMSTORE
              </button>
              <button
                onClick={() => setQrText('https://imkhoem.vercel.app/')}
                className="px-2 py-0.5 rounded-md bg-[var(--bg-page)] hover:bg-emerald-500/10 hover:text-emerald-500 text-[10px] font-mono text-[var(--text-muted)] border border-[var(--card-border)] transition-colors cursor-pointer"
              >
                Portfolio
              </button>
            </div>
          </div>

          {/* QR Code Graphic & Action */}
          <div className="mt-4 pt-3 border-t border-[var(--card-border)]/60 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-xl bg-white p-1 border border-stone-200 shadow-xs shrink-0 flex items-center justify-center overflow-hidden">
                {qrDataUrl ? (
                  <img src={qrDataUrl} alt="Generated QR" className="w-full h-full object-contain" />
                ) : (
                  <QrCode className="w-8 h-8 text-stone-400" />
                )}
              </div>
              <div className="text-[11px] font-mono text-[var(--text-muted)] leading-tight">
                <div>Client-side</div>
                <div className="text-emerald-500 font-bold">100% Zero Latency</div>
              </div>
            </div>

            <button
              onClick={handleCopyQr}
              className="p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)] hover:border-cyan-500 text-[var(--text-primary)] hover:text-cyan-500 transition-colors cursor-pointer shadow-xs active:scale-95"
              title="Copy QR link"
              aria-label="Copy QR code link"
            >
              {copiedQr ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* ====================================================================
            CELL 3: CREATOR & ARCHITECT IDENTITY
            ==================================================================== */}
        <div className="rounded-[28px] border border-[var(--card-border)] bg-[var(--card-solid)] p-6 flex flex-col justify-between shadow-sm relative group hover:border-amber-500/50 transition-all z-10">
          <div>
            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-12 h-12 rounded-2xl overflow-hidden ring-2 ring-amber-500/30 relative shrink-0">
                <Image
                  src="/avatar.jpg"
                  alt="Heang Chhengkhoem"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[var(--text-primary)]">
                  Heang Chhengkhoem
                </h4>
                <div className="text-[11px] font-mono text-[var(--text-muted)]">
                  Phnom Penh, Cambodia 🇰🇭
                </div>
              </div>
            </div>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mt-2">
              {language === 'kh'
                ? 'វិស្វករផ្នែកទន់ និងស្ថាបនិកប្រព័ន្ធឌីជីថល ជំនាញខាង Full-Stack Next.js 16, Telegram Bot Automations, និងប្រព័ន្ធ Web Tools ល្បឿនលឿន។'
                : 'Software architect and product engineer specialized in high-performance Next.js 16 stacks, autonomous Telegram bot engines, and client-side web tools.'}
            </p>

            {/* Core Stack Tags */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {['Next.js 16', 'TypeScript', 'Tailwind', 'Telegram API', 'Motion'].map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-[var(--bg-page)] text-[10px] font-mono text-[var(--text-secondary)] border border-[var(--card-border)] font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[var(--card-border)]/60 flex items-center justify-between text-xs">
            <span className="text-[11px] font-mono text-emerald-500 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Consultations</span>
            </span>

            <a
              href="https://t.me/heangchhengkhoem"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-500 hover:text-amber-600 font-bold inline-flex items-center gap-1"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* ====================================================================
            CELL 4: AUTONOMOUS TELEGRAM BOT CLUSTER
            ==================================================================== */}
        <div className="rounded-[28px] border border-[var(--card-border)] bg-[var(--card-solid)] p-6 flex flex-col justify-between shadow-sm relative group hover:border-sky-500/50 transition-all z-10">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/25 text-sky-600 dark:text-sky-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                <Send className="w-3.5 h-3.5 text-sky-500" />
                <span>Telegram Bot Network</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-500">75K+ Active</span>
            </div>

            <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-sky-500 transition-colors">
              {language === 'kh' ? 'បណ្តាញ Bot ស្វ័យប្រវត្ត ២៤/៧' : 'Autonomous Bot Webhook Network'}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
              {language === 'kh'
                ? 'បណ្តាញ Bot ស្វ័យប្រវត្តិបម្រើការជូនសហគមន៍ជាង ៧៥,០០០ នាក់ (Quiz, Utilities, Exchange Rate, AI Bot)។'
                : 'High-concurrency webhook infrastructure serving 75,000+ members across Cambodia with automated quiz, exchange rates, and utility routing.'}
            </p>

            <div className="space-y-1.5 mt-3 text-xs font-mono">
              <div className="flex items-center justify-between p-2 rounded-xl bg-[var(--bg-page)] border border-[var(--card-border)]">
                <span className="text-[var(--text-primary)]">@KhmerQuizBot</span>
                <span className="text-emerald-500 font-bold">25K+ Users</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-[var(--bg-page)] border border-[var(--card-border)]">
                <span className="text-[var(--text-primary)]">@SmartToolBot</span>
                <span className="text-sky-500 font-bold">18K+ Users</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[var(--card-border)]/60 flex items-center justify-between text-xs">
            <span className="text-[11px] font-mono text-[var(--text-muted)]">
              Webhook: 100% Uptime
            </span>
            <a
              href="#telegram"
              className="text-sky-500 hover:text-sky-600 font-bold inline-flex items-center gap-1"
            >
              <span>{language === 'kh' ? 'មើលបណ្តាញ Bot' : 'View Network'}</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* ====================================================================
            CELL 5: HARDWARE & DIAGNOSTIC SUITE
            ==================================================================== */}
        <div className="rounded-[28px] border border-[var(--card-border)] bg-[var(--card-solid)] p-6 flex flex-col justify-between shadow-sm relative group hover:border-emerald-500/50 transition-all z-10">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5 text-emerald-500" />
                <span>Hardware & IT Suite</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-500 font-bold">Client-Side</span>
            </div>

            <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-emerald-500 transition-colors">
              {language === 'kh' ? 'តេស្តផ្នែករឹងកុំព្យូទ័រ & ឧបករណ៍ AI' : 'In-Browser Diagnostics & AI Suite'}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
              {language === 'kh'
                ? 'តេស្ត CPU, GPU, RAM, អេក្រង់ និងក្តារចុចលើ Browser ផ្ទាល់ ដោយគ្មានការកត់ត្រាទិន្នន័យ (Zero Telemetry)។'
                : '100% private in-browser benchmark suite measuring CPU multi-threading, GPU shaders, audio latency, and memory performance.'}
            </p>

            {/* Live Detected Client Telemetry */}
            <div className="grid grid-cols-2 gap-2 mt-3 text-left">
              <div className="p-2.5 rounded-xl bg-[var(--bg-page)] border border-[var(--card-border)]">
                <div className="text-[10px] font-mono text-[var(--text-muted)]">DETECTED CPU</div>
                <div className="text-xs font-bold text-[var(--text-primary)] font-mono mt-0.5">
                  {cpuCores} Threads
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-[var(--bg-page)] border border-[var(--card-border)]">
                <div className="text-[10px] font-mono text-[var(--text-muted)]">DISPLAY RESOLUTION</div>
                <div className="text-xs font-bold text-[var(--text-primary)] font-mono mt-0.5">
                  {screenRes}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[var(--card-border)]/60 flex items-center justify-between text-xs">
            <span className="text-[11px] font-mono text-emerald-500 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero Cloud Telemetry</span>
            </span>
            <a
              href="#tools"
              className="text-emerald-500 hover:text-emerald-600 font-bold inline-flex items-center gap-1"
            >
              <span>{language === 'kh' ? 'រុករកឧបករណ៍' : 'Open Suite'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
