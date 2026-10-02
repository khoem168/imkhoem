'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortal } from '@/context/ThemeLanguageContext';
import { portalTools } from '@/data/portalData';
import { ToolCategory, ToolItem } from '@/types';
import ToolCard from './ToolCard';
import { ChevronDown, ChevronUp, Sparkles, Wrench } from 'lucide-react';

export default function ToolGrid() {
  const { language, t, setActiveTool, searchQuery } = usePortal();
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('all');
  const [showAll, setShowAll] = useState(false);

  const categories: { id: ToolCategory; label: string }[] = [
    { id: 'all', label: language === 'kh' ? 'ទាំងអស់' : 'All' },
    { id: 'hardware', label: language === 'kh' ? 'តេស្តកុំព្យូទ័រ (IT)' : 'Hardware & IT' },
    { id: 'ai', label: language === 'kh' ? 'AI & វៃឆ្លាត' : 'AI Tools' },
    { id: 'utility', label: language === 'kh' ? 'ឧបករណ៍ប្រើប្រាស់' : 'Utilities' },
    { id: 'fun', label: language === 'kh' ? 'កម្សាន្ត & ហ្គេម' : 'Games & Fun' },
    { id: 'social', label: language === 'kh' ? 'បណ្ដាញសង្គម' : 'Social' },
  ];

  // Priority / Flagship tools to feature by default when in 'all' view
  const featuredIds = [
    'cpu-benchmark',
    'gpu-benchmark',
    'ram-benchmark',
    'qr-scan-make',
    'exchange-rate',
    'ai-chat',
    'battery-health',
    'display-tester',
  ];

  const filteredTools = portalTools.filter((tool) => {
    const matchesCat = selectedCategory === 'all' || tool.category === selectedCategory;
    if (!matchesCat) return false;

    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      tool.name[language]?.toLowerCase().includes(q) ||
      tool.name.en?.toLowerCase().includes(q) ||
      tool.desc[language]?.toLowerCase().includes(q) ||
      tool.desc.en?.toLowerCase().includes(q)
    );
  });

  // Apply progressive disclosure: If in 'all' with no search query and showAll is false, show 8 tools
  const isDefaultView = selectedCategory === 'all' && !searchQuery;
  const visibleTools = isDefaultView && !showAll 
    ? filteredTools.slice(0, 8) 
    : filteredTools;

  return (
    <section id="tools" className="py-12 px-4 max-w-6xl mx-auto w-full relative">
      {/* Header with Section Tag & Category Pills */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <span className="section-tag inline-flex items-center gap-2 mb-2">
            <Wrench className="w-3.5 h-3.5 text-amber-500" />
            <span>{language === 'kh' ? 'ឧបករណ៍ឥតគិតថ្លៃ' : 'FREE WEB TOOLS'}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--text-primary)]">
            {language === 'kh' ? 'ឈុតឧបករណ៍ឌីជីថល & តេស្តផ្នែករឹង' : 'Client-Side Utilities & Hardware Suite'}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 max-w-xl">
            {language === 'kh' 
              ? 'ដំណើរការ ១០០% លើ Browser ផ្ទាល់ ដោយគ្មានការកត់ត្រាទិន្នន័យ (Zero Telemetry)។' 
              : '100% Client-side tools and hardware diagnostics with zero cloud telemetry.'}
          </p>
        </div>

        {/* Minimalist Filter Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none -mx-1 px-1 touch-pan-x">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setShowAll(false);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 active:scale-95 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm font-bold'
                  : 'bg-[var(--card-solid)] border border-[var(--card-border)] text-[var(--text-secondary)] hover:text-amber-500 hover:border-amber-500/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Clean Squircle Tool Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {visibleTools.map((tool) => (
          <ToolCard 
            key={tool.id} 
            tool={tool} 
            onOpen={setActiveTool} 
          />
        ))}
      </div>

      {/* Progressive Disclosure Toggle Button: 'View all tools' / 'Show less' */}
      {isDefaultView && filteredTools.length > 8 && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--card-border)] bg-[var(--card-solid)] hover:border-amber-500/50 hover:bg-amber-500/10 text-xs sm:text-sm font-bold text-[var(--text-primary)] hover:text-amber-500 transition-all shadow-sm cursor-pointer"
          >
            <span>
              {showAll 
                ? (language === 'kh' ? 'បង្រួមមកវិញ' : 'Show less') 
                : (language === 'kh' ? `មើលឧបករណ៍ទាំងអស់ (${filteredTools.length}+)` : `View all tools (${filteredTools.length}+)`)}
            </span>
            {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      )}
    </section>
  );
}
