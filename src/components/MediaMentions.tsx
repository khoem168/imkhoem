'use client';

import React from 'react';
import { usePortal } from '@/context/ThemeLanguageContext';
import { mediaMentions } from '@/data/portalData';
import { CheckCircle2, Newspaper, ExternalLink } from 'lucide-react';

export default function MediaMentions() {
  const { language } = usePortal();

  const getMediaDesign = (id: string) => {
    switch (id) {
      case 'tnaot':
        return {
          crest: 'TNAOT',
          sub: 'ត្នោត ញូស៍',
          gradient: 'from-red-600 via-rose-600 to-amber-600',
          shadow: 'rgba(225,29,72,0.35)',
          tag: 'News Portal',
        };
      case 'khmerload':
        return {
          crest: 'KL',
          sub: 'ខ្មែរឡូត',
          gradient: 'from-slate-900 via-cyan-900 to-blue-900',
          shadow: 'rgba(6,182,212,0.35)',
          tag: 'Digital Media',
        };
      case 'cmp':
        return {
          crest: 'CMP',
          sub: 'Post Daily',
          gradient: 'from-blue-700 via-indigo-700 to-violet-900',
          shadow: 'rgba(79,70,229,0.35)',
          tag: 'Business Press',
        };
      case 'tech-cambodia':
        return {
          crest: 'TECH',
          sub: 'បច្ចេកវិទ្យា',
          gradient: 'from-cyan-500 via-teal-600 to-emerald-700',
          shadow: 'rgba(20,184,166,0.35)',
          tag: 'Tech Review',
        };
      case 'kiripost':
        return {
          crest: 'KIRI',
          sub: 'គិរីផូស្ត',
          gradient: 'from-emerald-600 via-green-600 to-teal-800',
          shadow: 'rgba(16,185,129,0.35)',
          tag: 'Startup Press',
        };
      case 'cctimes':
        return {
          crest: 'CC',
          sub: 'ស៊ីស៊ីថាមស៍',
          gradient: 'from-rose-600 via-red-700 to-pink-800',
          shadow: 'rgba(244,63,94,0.35)',
          tag: 'Commercial',
        };
      default:
        return {
          crest: 'PRESS',
          sub: 'Media',
          gradient: 'from-amber-500 to-orange-600',
          shadow: 'rgba(245,158,11,0.35)',
          tag: 'Journal',
        };
    }
  };

  return (
    <section id="media" className="py-8 px-4 max-w-6xl mx-auto w-full">
      {/* Section Header with Glowing Amber Indicator */}
      <div className="mb-6 flex items-center justify-between">
        <span className="section-tag">
          {language === 'kh' ? 'សារព័ត៌មានល្បីៗដែលបានចុះផ្សាយ' : 'FEATURED IN CAMBODIAN MEDIA'}
        </span>
        <span className="text-[11px] font-mono text-emerald-500 flex items-center gap-1 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-bold shadow-sm">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Verified Press Recognition</span>
        </span>
      </div>

      {/* 6 Clean Editorial Glass Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {mediaMentions.map((item) => {
          const design = getMediaDesign(item.id);
          return (
            <div
              key={item.id}
              className="vision-glass p-4 flex flex-col items-center justify-between text-center gap-2.5 min-h-[145px] group cursor-pointer hover:scale-105 transition-all duration-300"
            >
              {/* 3D Tactile Editorial Media Seal */}
              <div 
                className={`icon-3d-tile w-14 h-14 bg-gradient-to-br ${design.gradient} flex flex-col items-center justify-center relative shadow-lg group-hover:scale-110 transition-transform`}
                style={{ boxShadow: `0 10px 22px -3px ${design.shadow}` }}
              >
                <span className="font-black text-xs text-white tracking-widest font-mono drop-shadow-md">
                  {design.crest}
                </span>
                <span className="text-[8px] text-white/80 font-bold tracking-tight">
                  {design.sub}
                </span>
              </div>

              {/* Title & Tag */}
              <div className="w-full mt-1">
                <div className="text-xs font-bold text-[var(--text-primary)] group-hover:text-amber-500 transition-colors leading-tight line-clamp-1">
                  {language === 'kh' ? item.khName : item.name}
                </div>
                <div className="text-[9px] text-[var(--text-muted)] font-mono uppercase tracking-wider mt-1 px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800/80 inline-block border border-[var(--card-border)]">
                  {design.tag}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
