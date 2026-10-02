'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { usePortal } from '@/context/ThemeLanguageContext';
import { ProjectItem } from '@/types';
import SpotlightSearch from '@/components/SpotlightSearch';
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Share2,
  Check,
  Sparkles,
  Cpu,
  Bot,
  Gamepad2,
  LayoutGrid,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  Server,
  Globe,
  Terminal,
  Code2,
  Sun,
  Moon,
  Languages,
  Search
} from 'lucide-react';

interface ProjectDetailClientProps {
  project: ProjectItem;
  otherProjects: ProjectItem[];
}

export default function ProjectDetailClient({ project, otherProjects }: ProjectDetailClientProps) {
  const { language, toggleLanguage, theme, toggleTheme, setSearchOpen } = usePortal();
  const [copied, setCopied] = useState(false);

  // Helper to get theme visuals based on project ID
  const getTheme = (id: string) => {
    switch (id) {
      case 'khoemstore':
        return {
          icon: Gamepad2,
          gradient: 'from-amber-500 via-rose-500 to-red-500',
          glow: 'bg-rose-500/20',
          borderHover: 'hover:border-rose-500/50',
          badge: 'text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/25',
          btnPrimary: 'bg-gradient-to-r from-rose-500 via-amber-500 to-orange-500 hover:from-rose-400 hover:via-amber-400 hover:to-orange-400 shadow-[0_8px_30px_rgba(244,63,94,0.35)]',
          metricVal: 'text-rose-600 dark:text-rose-400',
          accentColor: '#f43f5e',
        };
      case 'telegram-bot-builder':
        return {
          icon: Bot,
          gradient: 'from-sky-500 via-blue-600 to-indigo-600',
          glow: 'bg-sky-500/20',
          borderHover: 'hover:border-sky-500/50',
          badge: 'text-sky-600 dark:text-sky-400 bg-sky-500/10 border-sky-500/25',
          btnPrimary: 'bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:via-blue-500 hover:to-indigo-500 shadow-[0_8px_30px_rgba(14,165,233,0.35)]',
          metricVal: 'text-sky-600 dark:text-sky-400',
          accentColor: '#0ea5e9',
        };
      case 'khmer-ai-studio':
        return {
          icon: Sparkles,
          gradient: 'from-emerald-500 via-teal-500 to-green-600',
          glow: 'bg-emerald-500/20',
          borderHover: 'hover:border-emerald-500/50',
          badge: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
          btnPrimary: 'bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 hover:from-emerald-400 hover:via-teal-400 hover:to-green-500 shadow-[0_8px_30px_rgba(16,185,129,0.35)]',
          metricVal: 'text-emerald-600 dark:text-emerald-400',
          accentColor: '#10b981',
        };
      case 'creator-utility-hub':
        return {
          icon: Cpu,
          gradient: 'from-cyan-500 via-teal-500 to-emerald-500',
          glow: 'bg-cyan-500/20',
          borderHover: 'hover:border-cyan-500/50',
          badge: 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/25',
          btnPrimary: 'bg-gradient-to-r from-cyan-600 via-teal-500 to-emerald-500 hover:from-cyan-500 hover:via-teal-400 hover:to-emerald-400 shadow-[0_8px_30px_rgba(6,182,212,0.35)]',
          metricVal: 'text-cyan-600 dark:text-cyan-400',
          accentColor: '#06b6d4',
        };
      default:
        return {
          icon: LayoutGrid,
          gradient: 'from-purple-500 via-fuchsia-500 to-pink-500',
          glow: 'bg-purple-500/20',
          borderHover: 'hover:border-purple-500/50',
          badge: 'text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/25',
          btnPrimary: 'bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 hover:from-purple-500 hover:via-fuchsia-400 hover:to-pink-400 shadow-[0_8px_30px_rgba(168,85,247,0.35)]',
          metricVal: 'text-purple-600 dark:text-purple-400',
          accentColor: '#a855f7',
        };
    }
  };

  const projectTheme = getTheme(project.id);
  const ProjectIcon = projectTheme.icon;

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-300 relative selection:bg-amber-500 selection:text-white">
      {/* Background Ambient Lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[140px] opacity-25 dark:opacity-20 transition-all duration-700"
          style={{ background: projectTheme.accentColor }}
        />
        <div className="absolute top-[600px] right-[-100px] w-[500px] h-[500px] bg-cyan-500/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-purple-500/10 blur-[130px] rounded-full" />
      </div>

      {/* Floating Top Navigation Header */}
      <header className="fixed left-1/2 top-4 z-50 w-[min(1180px,calc(100%-24px))] -translate-x-1/2">
        <div className="flex h-16 items-center justify-between gap-3 rounded-[24px] border border-white/70 dark:border-white/10 bg-white/70 dark:bg-zinc-900/65 px-4 sm:px-6 shadow-[0_12px_40px_rgba(15,23,42,0.08)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all">
          {/* Back to Portfolio Link */}
          <Link
            href="/#projects"
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[var(--text-secondary)] hover:text-amber-500 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full border border-[var(--card-border)] bg-[var(--card-solid)] flex items-center justify-center group-hover:border-amber-500/50 group-hover:-translate-x-1 transition-all shadow-xs">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="hidden sm:inline">
              {language === 'kh' ? 'ត្រឡប់ទៅទំព័រដើម' : 'Back to Projects'}
            </span>
          </Link>

          {/* Center: Breadcrumb Status */}
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
            <span>Portfolio</span>
            <span>/</span>
            <span className="text-[var(--text-secondary)]">{project.category[language]}</span>
            <span>/</span>
            <span className="text-amber-500 font-bold truncate max-w-[160px]">{project.title[language]}</span>
          </div>

          {/* Right Controls: Search, Lang, Theme */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="glass-icon flex items-center gap-1.5 px-3 w-auto"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="text-[10px] font-mono font-semibold hidden sm:inline text-[var(--text-muted)]">
                ⌘K
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              aria-label="Toggle language"
              className="glass-icon flex items-center gap-1.5 px-3 w-auto font-bold text-xs"
            >
              <Languages className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-xs font-semibold">{language === 'kh' ? 'ខ្មែរ' : 'EN'}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="glass-icon"
            >
              {theme === 'dark' ? (
                <Moon className="w-4 h-4 fill-amber-400 text-amber-400" />
              ) : (
                <Sun className="w-4 h-4 fill-amber-500 text-amber-500" />
              )}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 pt-28 sm:pt-36 pb-24 px-4 max-w-5xl mx-auto w-full">
        {/* Project Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="vision-glass p-7 sm:p-10 md:p-12 rounded-[2.5rem] border border-[var(--card-border)] relative overflow-hidden shadow-2xl"
        >
          {/* Top Ambient Glow */}
          <div 
            className={`absolute -top-32 -right-32 w-96 h-96 rounded-full ${projectTheme.glow} blur-3xl pointer-events-none`}
          />

          {/* Category & Status Badge Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2.5">
              <span className={`px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase border ${projectTheme.badge}`}>
                {project.category[language]}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-medium border border-[var(--card-border)] bg-[var(--card-solid)] text-[var(--text-secondary)]">
                {project.badge[language]}
              </span>
            </div>

            {/* Live Status Indicator */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>{project.status[language]}</span>
            </div>
          </div>

          {/* Project Title & Icon Header */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6 mb-6">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br ${projectTheme.gradient} text-white flex items-center justify-center shadow-xl ring-4 ring-white/20 dark:ring-white/10 shrink-0`}>
              <ProjectIcon className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-md" />
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[var(--text-primary)] leading-tight">
                {project.title[language]}
              </h1>
              <p className="text-sm sm:text-base font-semibold text-amber-600 dark:text-amber-400 mt-1 sm:mt-1.5">
                {project.subtitle[language]}
              </p>
            </div>
          </div>

          {/* Main Description */}
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-3xl mb-8">
            {project.description[language]}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[var(--card-border)]">
            <a
              href={project.liveUrl}
              target={project.liveUrl.startsWith('http') ? '_blank' : '_self'}
              rel={project.liveUrl.startsWith('http') ? 'noopener noreferrer' : ''}
              className={`py-3.5 px-6 rounded-2xl ${projectTheme.btnPrimary} text-white font-bold text-sm sm:text-base flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer`}
            >
              <span>{language === 'kh' ? 'បើកដំណើរការកម្មវិធីផ្ទាល់' : 'Launch Live Application'}</span>
              <ArrowUpRight className="w-5 h-5" />
            </a>

            <button
              onClick={handleShare}
              className="py-3.5 px-5 rounded-2xl border border-[var(--card-border)] bg-[var(--card-solid)] text-[var(--text-primary)] hover:border-amber-500/50 hover:text-amber-500 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-500 font-bold">{language === 'kh' ? 'បានចម្លង Link!' : 'Link Copied!'}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>{language === 'kh' ? 'ចែករំលែក Link' : 'Share Project'}</span>
                </>
              )}
            </button>

            <Link
              href="/#projects"
              className="py-3.5 px-5 rounded-2xl border border-[var(--card-border)] bg-[var(--card-solid)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{language === 'kh' ? 'មើលគម្រោងផ្សេងទៀត' : 'All Projects'}</span>
            </Link>
          </div>
        </motion.div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 my-10">
          {project.metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.5 }}
              className="vision-glass p-6 rounded-3xl border border-[var(--card-border)] text-center relative overflow-hidden shadow-lg group hover:border-amber-500/40 transition-colors"
            >
              <div className="text-xs font-mono font-medium text-[var(--text-muted)] uppercase tracking-wider">
                {metric.label[language]}
              </div>
              <div className={`text-2xl sm:text-3xl md:text-4xl font-black ${projectTheme.metricVal} font-mono mt-2 tracking-tight`}>
                {metric.value}
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        {/* Technical Architecture & System Design */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="vision-glass p-7 sm:p-10 rounded-[2.5rem] border border-[var(--card-border)] my-10 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-500">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-wider text-amber-500 uppercase">
                {language === 'kh' ? 'ស្ថាបត្យកម្មបច្ចេកទេស' : 'SYSTEM ARCHITECTURE'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
                {language === 'kh' ? 'ការរចនាប្រព័ន្ធ & សុវត្ថិភាព' : 'Engineering & Infrastructure Breakdown'}
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-8">
            {project.architecture[language]}
          </p>

          {/* Visual Architecture Flow Diagram */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-4 sm:p-5 rounded-2xl border border-[var(--card-border)] bg-[var(--bg-page)]/60 backdrop-blur-sm">
            <div className="p-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--card-solid)] text-center">
              <Globe className="w-5 h-5 text-amber-500 mx-auto mb-1.5" />
              <div className="text-[11px] font-bold text-[var(--text-primary)]">Client UI / App</div>
              <div className="text-[10px] text-[var(--text-muted)] font-mono mt-0.5">VisionOS 60FPS</div>
            </div>
            <div className="p-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--card-solid)] text-center">
              <Zap className="w-5 h-5 text-cyan-500 mx-auto mb-1.5" />
              <div className="text-[11px] font-bold text-[var(--text-primary)]">Edge Gateway</div>
              <div className="text-[10px] text-[var(--text-muted)] font-mono mt-0.5">Sub-100ms Latency</div>
            </div>
            <div className="p-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--card-solid)] text-center">
              <ShieldCheck className="w-5 h-5 text-emerald-500 mx-auto mb-1.5" />
              <div className="text-[11px] font-bold text-[var(--text-primary)]">Security & Auth</div>
              <div className="text-[10px] text-[var(--text-muted)] font-mono mt-0.5">HMAC & Bakong</div>
            </div>
            <div className="p-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--card-solid)] text-center">
              <Terminal className="w-5 h-5 text-purple-500 mx-auto mb-1.5" />
              <div className="text-[11px] font-bold text-[var(--text-primary)]">Core Engine</div>
              <div className="text-[10px] text-[var(--text-muted)] font-mono mt-0.5">APIs & WebAssembly</div>
            </div>
          </div>
        </motion.section>

        {/* Tech Stack & Engineering Roles */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="vision-glass p-7 sm:p-10 rounded-[2.5rem] border border-[var(--card-border)] my-10 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-500">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-wider text-cyan-500 uppercase">
                {language === 'kh' ? 'បច្ចេកវិទ្យាប្រើប្រាស់' : 'TECHNOLOGY STACK'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
                {language === 'kh' ? 'ឧបករណ៍ & ក្របខ័ណ្ឌការងារ' : 'Frameworks, Libraries & Services'}
              </h2>
            </div>
          </div>

          {/* Tech Stack Detailed Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {project.techStack.map((tech, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-[var(--card-border)] bg-[var(--card-solid)] flex items-start gap-3.5 hover:border-amber-500/40 transition-colors shadow-xs"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 font-bold" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[var(--text-primary)]">{tech.name}</div>
                  <div className="text-xs text-[var(--text-secondary)] font-mono mt-0.5">{tech.role}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Tags Chips */}
          <div className="pt-4 border-t border-[var(--card-border)] flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-[var(--text-muted)] mr-2">
              {language === 'kh' ? 'ស្លាកសម្គាល់:' : 'Tags:'}
            </span>
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-xl bg-[var(--card-solid)] text-xs font-mono font-semibold text-[var(--text-secondary)] border border-[var(--card-border)]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Core Features Showcase */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="vision-glass p-7 sm:p-10 rounded-[2.5rem] border border-[var(--card-border)] my-10 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-500">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-500 uppercase">
                {language === 'kh' ? 'មុខងារសំខាន់ៗ' : 'FEATURE HIGHLIGHTS'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
                {language === 'kh' ? 'សមត្ថភាពលេចធ្លោនៃគម្រោង' : 'Core Capabilities & User Experience'}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {project.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-[var(--card-border)] bg-[var(--card-solid)] flex flex-col justify-between hover:border-emerald-500/40 transition-colors shadow-xs group"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">
                    {feat.title[language]}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {feat.desc[language]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Explore Other Flagship Projects */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="my-16"
        >
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-wider text-amber-500 uppercase">
                {language === 'kh' ? 'ស្នាដៃបន្ថែមទៀត' : 'MORE CREATIONS'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
                {language === 'kh' ? 'ស្វែងយល់គម្រោងដទៃទៀត' : 'Explore Other Flagship Systems'}
              </h2>
            </div>
            <Link
              href="/#projects"
              className="text-xs font-bold text-amber-500 hover:underline flex items-center gap-1 shrink-0"
            >
              <span>{language === 'kh' ? 'មើលទាំងអស់' : 'View All'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {otherProjects.map((other) => {
              const otherTheme = getTheme(other.id);
              const OtherIcon = otherTheme.icon;

              return (
                <Link
                  key={other.id}
                  href={`/projects/${other.id}`}
                  className="vision-glass p-5 rounded-2xl border border-[var(--card-border)] hover:border-amber-500/40 transition-all flex flex-col justify-between group shadow-sm hover:shadow-md hover:-translate-y-1"
                >
                  <div>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${otherTheme.gradient} text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-xs`}>
                      <OtherIcon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                      {other.category[language]}
                    </span>
                    <h3 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-amber-500 transition-colors line-clamp-1 mt-0.5">
                      {other.title[language]}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mt-1">
                      {other.description[language]}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-amber-500 mt-4 pt-3 border-t border-[var(--card-border)]">
                    <span>{language === 'kh' ? 'ព័ត៌មានលម្អិត' : 'View Details'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.section>

        {/* Clean VisionOS Footer */}
        <footer className="mt-16 pt-8 border-t border-[var(--card-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)] font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Heang Chhengkhoem • Vision OS 27 Ecosystem</span>
          </div>
          <div>
            © {new Date().getFullYear()} All rights reserved.
          </div>
        </footer>
      </main>

      {/* Global Spotlight Palette Modal */}
      <SpotlightSearch />
    </div>
  );
}
