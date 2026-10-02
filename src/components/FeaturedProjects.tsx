'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { usePortal } from '@/context/ThemeLanguageContext';
import { featuredProjects } from '@/data/portalData';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowUpRight,
  Gamepad2, 
  Cpu, 
  Bot, 
  LayoutGrid
} from 'lucide-react';

export default function FeaturedProjects() {
  const { language, t } = usePortal();

  // Helper to get project-specific icon and theme styles for all 5 flagship projects
  const getProjectTheme = (id: string) => {
    switch (id) {
      case 'khoemstore':
        return {
          icon: Gamepad2,
          iconBg: 'from-amber-500 to-orange-600',
          accentBorder: 'hover:border-amber-500/50',
          badgeColor: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/25',
          accentText: 'group-hover:text-amber-500',
          primaryTag: 'Bakong KHQR',
        };
      case 'telegram-bot-builder':
        return {
          icon: Bot,
          iconBg: 'from-sky-500 to-blue-600',
          accentBorder: 'hover:border-sky-500/50',
          badgeColor: 'text-sky-600 dark:text-sky-400 bg-sky-500/10 border-sky-500/25',
          accentText: 'group-hover:text-sky-500',
          primaryTag: 'Bot API',
        };
      case 'khmer-ai-studio':
        return {
          icon: Sparkles,
          iconBg: 'from-emerald-500 to-teal-600',
          accentBorder: 'hover:border-emerald-500/50',
          badgeColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
          accentText: 'group-hover:text-emerald-500',
          primaryTag: 'LLM AI',
        };
      case 'creator-utility-hub':
        return {
          icon: Cpu,
          iconBg: 'from-cyan-500 to-teal-500',
          accentBorder: 'hover:border-cyan-500/50',
          badgeColor: 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/25',
          accentText: 'group-hover:text-cyan-500',
          primaryTag: 'WebGL 3D',
        };
      default:
        return {
          icon: LayoutGrid,
          iconBg: 'from-purple-500 to-fuchsia-600',
          accentBorder: 'hover:border-purple-500/50',
          badgeColor: 'text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/25',
          accentText: 'group-hover:text-purple-500',
          primaryTag: 'Next.js 16',
        };
    }
  };

  return (
    <section id="projects" className="py-12 px-4 max-w-6xl mx-auto w-full relative">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
        <div>
          <span className="section-tag inline-flex items-center gap-2 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{language === 'kh' ? 'ស្នាដៃ & គម្រោងសំខាន់ៗ' : 'FEATURED PROJECTS'}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--text-primary)]">
            {language === 'kh' ? 'គម្រោងឌីជីថលលេចធ្លោទាំង ៥' : 'Flagship Systems & Products'}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 max-w-xl">
            {language === 'kh' 
              ? 'វេទិកាពាណិជ្ជកម្ម ឈុតឧបករណ៍តេស្តផ្នែករឹងកុំព្យូទ័រ និងបណ្តាញ Bot ស្វ័យប្រវត្តិ។' 
              : 'Production commerce platforms, hardware diagnostic engines, and automated bot networks.'}
          </p>
        </div>

        <div className="text-xs font-mono text-[var(--text-muted)] hidden sm:block">
          5 Systems Online
        </div>
      </div>

      {/* Projects Grid: Exactly 5 Clean Cards with Progressive Disclosure */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {featuredProjects.map((project, idx) => {
          const theme = getProjectTheme(project.id);
          const ProjectIcon = theme.icon;
          // Clean 2-3 tags maximum
          const displayTags = project.tags.slice(0, 3);
          // 4th and 5th card layout balance
          const isSpan = idx === 3 || idx === 4;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
              className={`rounded-[24px] border border-[var(--card-border)] bg-[var(--card-solid)] p-5 sm:p-6 flex flex-col justify-between group shadow-sm hover:shadow-md ${theme.accentBorder} transition-all ${
                isSpan ? 'lg:col-span-1' : ''
              }`}
            >
              <div>
                {/* Top Row: Icon + Category Badge */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${theme.iconBg} text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}>
                    <ProjectIcon className="w-5 h-5" />
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border ${theme.badgeColor}`}>
                    {project.category[language]}
                  </span>
                </div>

                {/* Title & Short Copy */}
                <h3 className={`text-lg font-bold text-[var(--text-primary)] ${theme.accentText} transition-colors line-clamp-1`}>
                  {project.title[language]}
                </h3>

                <p className="text-xs text-[var(--text-secondary)] mt-1.5 line-clamp-2 leading-relaxed">
                  {project.subtitle[language]}
                </p>

                {/* 2-3 Clean Tags Maximum */}
                <div className="flex flex-wrap gap-1.5 my-4">
                  {displayTags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-md bg-[var(--bg-page)] text-[10px] font-mono text-[var(--text-secondary)] border border-[var(--card-border)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Single Clear Action: Link to Dedicated Project Detail Route */}
              <div className="pt-3 border-t border-[var(--card-border)]/60">
                <Link
                  href={`/projects/${project.id}`}
                  className="w-full py-2.5 px-3 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)] hover:bg-amber-500/10 hover:border-amber-500/40 text-xs font-bold text-[var(--text-primary)] hover:text-amber-500 flex items-center justify-between transition-colors group/link"
                >
                  <span>{language === 'kh' ? 'មើលព័ត៌មានលម្អិត' : 'View Project Details'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
