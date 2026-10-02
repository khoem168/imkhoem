'use client';

import React from 'react';
import { motion } from 'motion/react';
import { usePortal } from '@/context/ThemeLanguageContext';
import { 
  Sparkles, 
  Search, 
  Gamepad2, 
  Zap, 
  ArrowUpRight,
  Send,
  Wrench,
  ShieldCheck,
  Users
} from 'lucide-react';

import type { Variants } from 'motion/react';

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function HeroUniverse() {
  const { language, t, setSearchOpen } = usePortal();

  const metricCards = [
    {
      value: '400+',
      label: language === 'kh' ? 'ផលិតផល & ហ្គេម' : 'Products & Games',
      subtext: 'Direct Server Reload',
      href: 'https://www.khoemstore.com/',
      icon: Gamepad2,
      accent: 'text-amber-500',
      badgeBg: 'bg-amber-500/10 text-amber-500',
    },
    {
      value: '24+',
      label: language === 'kh' ? 'ឧបករណ៍ឥតគិតថ្លៃ' : 'Free Web Tools',
      subtext: '100% Client-Side Fast',
      href: '#tools',
      icon: Wrench,
      accent: 'text-cyan-500',
      badgeBg: 'bg-cyan-500/10 text-cyan-500',
    },
    {
      value: '99.9%',
      label: language === 'kh' ? 'ស្ថេរភាពដំណើរការ' : 'Uptime Stability',
      subtext: 'High-Availability Cloud',
      href: '#projects',
      icon: ShieldCheck,
      accent: 'text-emerald-500',
      badgeBg: 'bg-emerald-500/10 text-emerald-500',
    },
    {
      value: '50K+',
      label: language === 'kh' ? 'សហគមន៍សកម្ម' : 'Active Community',
      subtext: 'Cambodia & Telegram SEA',
      href: 'https://t.me/heangchhengkhoem',
      icon: Users,
      accent: 'text-purple-500',
      badgeBg: 'bg-purple-500/10 text-purple-500',
    },
  ];

  return (
    <section id="home" className="relative overflow-hidden px-4 sm:px-6 pt-32 sm:pt-36 pb-16 max-w-5xl mx-auto w-full text-center">
      {/* Visual Depth 1: Soft Animated Ambient Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-36 top-16 h-[500px] w-[500px] rounded-full bg-orange-300/20 dark:bg-orange-500/10 blur-[110px]" />
        <div className="absolute -right-32 top-40 h-[520px] w-[520px] rounded-full bg-sky-300/25 dark:bg-sky-500/10 blur-[120px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-4xl"
      >
        {/* Visual Depth 2: Available Status Capsule */}
        <motion.div variants={itemVariants} className="inline-block mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-300/60 dark:border-white/10 bg-orange-50/70 dark:bg-white/[.06] text-orange-700 dark:text-orange-400 text-xs font-semibold backdrop-blur-xl shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="tracking-wide">
              {language === 'kh' ? 'ប្រព័ន្ធឌីជីថល & ស្ថាបនិក • HEANG CHHENGKHOEM' : 'Building tools & products'}
            </span>
            <span className="rounded-full bg-orange-100/90 dark:bg-orange-950/70 px-2 py-0.5 text-[10px] font-mono text-orange-600 dark:text-orange-300 font-bold border border-orange-300/40 dark:border-orange-500/20">
              Vision OS 27
            </span>
          </div>
        </motion.div>

        {/* Clean, High-Contrast Headline */}
        <motion.h1 
          variants={itemVariants} 
          className="text-balance text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-950 dark:text-white leading-[1.14]"
        >
          <span>Full-Stack Platform &</span>
          <span className="block mt-1 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 bg-clip-text text-transparent">
            {language === 'kh' ? 'ឧបករណ៍បច្ចេកវិទ្យា AI ទំនើប' : 'AI Tools for Creators'}
          </span>
        </motion.h1>

        {/* Subtitle with Calibrated Reading Width (640-720px) */}
        <motion.p 
          variants={itemVariants} 
          className="mx-auto mt-6 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-600 dark:text-zinc-400"
        >
          {language === 'kh' 
            ? 'បណ្ដុំស្នាដៃ និងគម្រោងផ្ទាល់ខ្លួនរបស់ Heang Chhengkhoem។ វេទិកាហាង KHOEMSTORE (400+ ហ្គេម), បណ្តាញ Telegram Bots ស្វ័យប្រវត្ត និងឧបករណ៍ AI & Web Tools ឥតគិតថ្លៃជាង ២០+ ដំណើរការលើ Browser ផ្ទាល់។'
            : 'Digital products, automation, Telegram bots, AI utilities and modern web experiences engineered for high speed and scale.'}
        </motion.p>

        {/* Action Button Hierarchy: Orange Primary CTA + Quiet Secondary CTAs */}
        <motion.div variants={itemVariants} className="mt-8 flex flex-wrap justify-center items-center gap-3">
          {/* Strong Primary CTA */}
          <motion.a
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="https://www.khoemstore.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-orange-400 to-orange-500 hover:from-orange-400 hover:to-orange-600 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white shadow-[0_12px_30px_rgba(249,115,22,.28)] transition-shadow cursor-pointer"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>{language === 'kh' ? 'ចូលទៅកាន់ KHOEMSTORE ↗' : 'Explore KHOEMSTORE'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>

          {/* Quiet Secondary CTA */}
          <motion.a
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            href="#tools"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[.06] hover:bg-white/90 dark:hover:bg-white/[.10] px-6 py-3.5 text-xs sm:text-sm font-semibold text-[var(--text-primary)] backdrop-blur-xl transition-all cursor-pointer shadow-xs"
          >
            <Zap className="w-4 h-4 text-amber-500" />
            <span>{language === 'kh' ? 'រុករកឧបករណ៍ ២៤+' : 'Browse free tools'}</span>
          </motion.a>

          {/* Quiet Tertiary CTA */}
          <motion.a
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            href="https://t.me/heangchhengkhoem"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[.06] hover:bg-white/90 dark:hover:bg-white/[.10] px-6 py-3.5 text-xs sm:text-sm font-semibold text-[var(--text-primary)] backdrop-blur-xl transition-all cursor-pointer shadow-xs"
          >
            <Send className="w-4 h-4 text-sky-500" />
            <span>Telegram</span>
          </motion.a>
        </motion.div>

        {/* Command Search Bar (⌘K / Ctrl+K) */}
        <motion.div variants={itemVariants} className="mt-8 max-w-md mx-auto">
          <div 
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-full border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[.06] shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:border-orange-500/50 backdrop-blur-xl transition-all cursor-pointer group"
          >
            <Search className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs text-[var(--text-muted)] flex-1 text-left">
              {t.hero.searchPlaceholder}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-[var(--text-secondary)] border border-[var(--card-border)] font-semibold">
                ⌘K
              </span>
            </div>
          </div>
        </motion.div>

        {/* Visual Depth 3: Interactive Product / Stats Cards */}
        <motion.div 
          variants={itemVariants} 
          className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 max-w-4xl mx-auto"
        >
          {metricCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.a
                key={i}
                href={card.href}
                target={card.href.startsWith('http') ? '_blank' : '_self'}
                rel={card.href.startsWith('http') ? 'noopener noreferrer' : ''}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="group rounded-[24px] border border-white/70 dark:border-white/10 bg-white/65 dark:bg-white/[.04] p-4 sm:p-5 shadow-[0_8px_30px_rgba(15,23,42,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-2xl transition-colors hover:border-orange-400/50 block text-center cursor-pointer"
              >
                <div className={`w-8 h-8 rounded-xl ${card.badgeBg} flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className={`text-2xl sm:text-3xl font-black ${card.accent} font-mono tracking-tight`}>
                  {card.value}
                </div>
                <div className="text-xs font-bold text-[var(--text-primary)] mt-1 truncate">
                  {card.label}
                </div>
                <div className="text-[10px] text-[var(--text-muted)] font-mono mt-0.5 truncate">
                  {card.subtext}
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
