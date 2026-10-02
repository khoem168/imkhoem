'use client';

import React from 'react';
import { usePortal } from '@/context/ThemeLanguageContext';
import { telegramBots } from '@/data/portalData';
import { 
  HelpCircle, 
  Cpu, 
  BookOpen, 
  TrendingUp, 
  Gamepad, 
  BellRing,
  Send,
  Users,
  ArrowUpRight
} from 'lucide-react';

export default function TelegramEcosystem() {
  const { language } = usePortal();

  const getBotDesign = (id: string) => {
    switch (id) {
      case 'khmer-quiz':
        return {
          icon: <HelpCircle className="w-5 h-5 text-amber-500" />,
          color: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
          hover: 'hover:border-amber-500/50',
        };
      case 'smart-bot':
        return {
          icon: <Cpu className="w-5 h-5 text-cyan-500" />,
          color: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
          hover: 'hover:border-cyan-500/50',
        };
      case 'english-quiz':
        return {
          icon: <BookOpen className="w-5 h-5 text-purple-500" />,
          color: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
          hover: 'hover:border-purple-500/50',
        };
      case 'exchange-bot':
        return {
          icon: <TrendingUp className="w-5 h-5 text-emerald-500" />,
          color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
          hover: 'hover:border-emerald-500/50',
        };
      case 'game-bot':
        return {
          icon: <Gamepad className="w-5 h-5 text-rose-500" />,
          color: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
          hover: 'hover:border-rose-500/50',
        };
      default:
        return {
          icon: <BellRing className="w-5 h-5 text-sky-500" />,
          color: 'bg-sky-500/10 text-sky-500 border-sky-500/20',
          hover: 'hover:border-sky-500/50',
        };
    }
  };

  return (
    <section id="telegram" className="py-12 px-4 max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <span className="section-tag inline-flex items-center gap-2 mb-2">
            <Send className="w-3.5 h-3.5 text-sky-500" />
            <span>{language === 'kh' ? 'បណ្ដាញ TELEGRAM BOTS' : 'TELEGRAM BOT NETWORK'}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--text-primary)]">
            {language === 'kh' ? 'ប្រព័ន្ធ Bot ស្វ័យប្រវត្តិ & សហគមន៍' : 'Autonomous Telegram Bots & Feeds'}
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>75,000+ Active Members</span>
        </div>
      </div>

      {/* 6 Clean Bot Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {telegramBots.map((bot) => {
          const design = getBotDesign(bot.id);
          return (
            <a
              key={bot.id}
              href={bot.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-4 rounded-2xl border border-[var(--card-border)] bg-[var(--card-solid)] flex items-start gap-3.5 group cursor-pointer shadow-xs hover:-translate-y-0.5 ${design.hover} transition-all`}
            >
              <div className={`w-10 h-10 rounded-xl border ${design.color} flex items-center justify-center shrink-0`}>
                {design.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] group-hover:text-amber-500 transition-colors truncate">
                    {bot.title[language] || bot.title.en}
                  </h3>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-amber-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </div>

                <p className="text-[11px] text-[var(--text-secondary)] line-clamp-2 mt-1 leading-relaxed">
                  {bot.desc[language] || bot.desc.en}
                </p>

                <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-[var(--card-border)]/50 text-[10px] font-mono">
                  <span className="text-[var(--text-muted)]">{bot.tag[language] || bot.tag.en}</span>
                  <span className="text-emerald-500 font-semibold">{bot.members}</span>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
