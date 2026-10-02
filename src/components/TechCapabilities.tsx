'use client';

import React from 'react';
import { motion } from 'motion/react';
import { usePortal } from '@/context/ThemeLanguageContext';
import { Cpu, Code2, ShieldCheck, Terminal, Sparkles, CheckCircle2 } from 'lucide-react';

export default function TechCapabilities() {
  const { language } = usePortal();

  const domains = [
    {
      id: 'frontend',
      title: {
        en: 'Frontend & Web Architecture',
        kh: 'ស្ថាបត្យកម្ម Frontend & Web',
      },
      icon: Code2,
      accent: 'from-amber-500 via-orange-500 to-amber-600',
      glowBg: 'bg-amber-500/10 dark:bg-amber-500/15',
      accentBorder: 'hover:border-amber-500/50',
      badge: 'Modern UI/UX',
      badgeColor: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/25',
      pipColor: 'bg-amber-500',
      levelColor: 'text-amber-600 dark:text-amber-400',
      footerTag: '100% Type-Safe & SSR',
      skills: [
        { name: 'Next.js 16 (App Router & Turbopack)', level: 'Advanced' },
        { name: 'React 19 Server & Client Components', level: 'Advanced' },
        { name: 'TypeScript Strict Mode', level: 'Mastery' },
        { name: 'Tailwind CSS v4 & VisionOS Glass', level: 'Mastery' },
        { name: 'WebGL 3D Canvas & Web Audio API', level: 'High Speed' },
      ],
    },
    {
      id: 'bots',
      title: {
        en: 'Bot Automations & Backend APIs',
        kh: 'ប្រព័ន្ធ Bot ស្វ័យប្រវត្តិ & API',
      },
      icon: Terminal,
      accent: 'from-sky-500 via-blue-600 to-indigo-600',
      glowBg: 'bg-sky-500/10 dark:bg-sky-500/15',
      accentBorder: 'hover:border-sky-500/50',
      badge: 'High Concurrency',
      badgeColor: 'text-sky-600 dark:text-sky-400 bg-sky-500/10 border-sky-500/25',
      pipColor: 'bg-sky-500',
      levelColor: 'text-sky-600 dark:text-sky-400',
      footerTag: 'Edge Runtime < 100ms',
      skills: [
        { name: 'Telegram Bot API & Webhooks', level: 'Production' },
        { name: 'Node.js & Edge Serverless Functions', level: 'Scalable' },
        { name: 'Automated Daily Crons & Scheduler', level: '24/7 Uptime' },
        { name: 'RESTful Microservices & Webhooks', level: 'Low Latency' },
        { name: 'Game Server Reload APIs', level: 'Automated' },
      ],
    },
    {
      id: 'fintech',
      title: {
        en: 'FinTech & Universal KHQR Standard',
        kh: 'ប្រព័ន្ធទូទាត់ប្រាក់ KHQR & FinTech',
      },
      icon: ShieldCheck,
      accent: 'from-emerald-500 via-teal-500 to-green-600',
      glowBg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
      accentBorder: 'hover:border-emerald-500/50',
      badge: 'National Standard',
      badgeColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
      pipColor: 'bg-emerald-500',
      levelColor: 'text-emerald-600 dark:text-emerald-400',
      footerTag: 'EMVCo & Bakong Verified',
      skills: [
        { name: 'Bakong Universal KHQR Generation', level: 'Official' },
        { name: 'ABA Mobile Banking Verification', level: 'Instant Scan' },
        { name: 'Dynamic Currency Conversion (USD ↔ KHR)', level: 'Real-Time' },
        { name: 'Secure Transaction Checksums', level: 'Encrypted' },
      ],
    },
    {
      id: 'hardware',
      title: {
        en: 'Client-Side Hardware Sandbox',
        kh: 'បច្ចេកវិទ្យាតេស្ត Hardware Sandbox',
      },
      icon: Cpu,
      accent: 'from-purple-500 via-fuchsia-500 to-pink-500',
      glowBg: 'bg-purple-500/10 dark:bg-purple-500/15',
      accentBorder: 'hover:border-purple-500/50',
      badge: 'Zero Telemetry',
      badgeColor: 'text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/25',
      pipColor: 'bg-purple-500',
      levelColor: 'text-purple-600 dark:text-purple-400',
      footerTag: '100% In-Browser Isolation',
      skills: [
        { name: 'Multi-Core Prime Benchmark Algorithm', level: 'Multi-Thread' },
        { name: 'W3C Native Battery API Telemetry', level: 'Live Stats' },
        { name: 'Frame-Delta Screen Hz Analysis (60-165Hz)', level: 'Accurate' },
        { name: 'RAM Memory Buffer Bandwidth Allocation', level: 'Throughput' },
      ],
    },
  ];

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto w-full relative">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="section-tag inline-flex items-center gap-1.5 mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{language === 'kh' ? 'បច្ចេកវិទ្យា & ជំនាញស្នូល' : 'CORE CAPABILITIES'}</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
          {language === 'kh' 
            ? 'បច្ចេកវិទ្យាដែលប្រើក្នុងការអភិវឌ្ឍប្រព័ន្ធ' 
            : 'Engineering Stack & Architecture Framework'}
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1.5 leading-relaxed">
          {language === 'kh'
            ? 'ការរួមបញ្ចូលបច្ចេកវិទ្យាទំនើបៗដើម្បីបង្កើតផលិតផលឌីជីថលល្បឿនលឿន មានសុវត្ថិភាព និងគាំទ្រអ្នកប្រើប្រាស់រាប់ម៉ឺននាក់។'
            : 'Carefully engineered with modern frameworks to deliver fast, secure, and highly scalable digital products.'}
        </p>
      </div>

      {/* Grid of 4 Domain Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {domains.map((domain, idx) => {
          const Icon = domain.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: idx * 0.08 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className={`vision-glass p-5 sm:p-6 rounded-[2rem] border border-[var(--card-border)] ${domain.accentBorder} transition-colors duration-300 flex flex-col justify-between group shadow-md hover:shadow-xl relative overflow-hidden`}
            >
              {/* Top ambient color glow */}
              <div className={`absolute -top-12 -right-12 w-36 h-36 rounded-full ${domain.glowBg} blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500`} />

              <div>
                {/* Header: Icon + Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${domain.accent} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 ring-2 ring-white/20 dark:ring-white/10 shrink-0`}>
                    <Icon className="w-5 h-5 drop-shadow-sm" />
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border ${domain.badgeColor}`}>
                    {domain.badge}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] mb-4 group-hover:text-amber-500 transition-colors leading-tight">
                  {domain.title[language]}
                </h3>

                {/* Skills list with glowing pips */}
                <ul className="space-y-2.5">
                  {domain.skills.map((skill, sIdx) => (
                    <li 
                      key={sIdx} 
                      className="flex items-center justify-between text-[11px] gap-2 p-1.5 rounded-xl hover:bg-stone-500/5 transition-colors"
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className={`w-1.5 h-1.5 rounded-full ${domain.pipColor} shrink-0 opacity-80`} />
                        <span className="text-[var(--text-secondary)] font-medium leading-snug truncate">
                          {skill.name}
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-md bg-[var(--card-solid)] text-[9px] font-mono font-bold ${domain.levelColor} shrink-0 border border-[var(--card-border)] shadow-2xs`}>
                        {skill.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Footnote Badge */}
              <div className="pt-4 mt-4 border-t border-[var(--card-border)]/70 flex items-center justify-between">
                <span className="text-[10px] font-mono text-[var(--text-muted)] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  <span>{domain.footerTag}</span>
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
