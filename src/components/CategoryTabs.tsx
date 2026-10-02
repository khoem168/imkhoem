'use client';

import React from 'react';
import { usePortal } from '@/context/ThemeLanguageContext';
import { ToolCategory } from '@/types';
import { Layers, Bot, Wrench, Gamepad2, Share2 } from 'lucide-react';

interface CategoryTabsProps {
  activeCategory: ToolCategory;
  onSelectCategory: (cat: ToolCategory) => void;
  counts: Record<ToolCategory, number>;
}

export default function CategoryTabs({
  activeCategory,
  onSelectCategory,
  counts,
}: CategoryTabsProps) {
  const { t } = usePortal();

  const tabs: { id: ToolCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: t.categories.all, icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'ai', label: t.categories.ai, icon: <Bot className="w-3.5 h-3.5" /> },
    { id: 'utility', label: t.categories.utility, icon: <Wrench className="w-3.5 h-3.5" /> },
    { id: 'fun', label: t.categories.fun, icon: <Gamepad2 className="w-3.5 h-3.5" /> },
    { id: 'social', label: t.categories.social, icon: <Share2 className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 scrollbar-none gap-1.5 p-1.5 rounded-full ios-glass border border-white/10 max-w-2xl mx-auto mb-8">
      {tabs.map((tab) => {
        const isActive = activeCategory === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectCategory(tab.id)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
              isActive
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25 scale-100'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            <span
              className={`ml-0.5 text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-400'
              }`}
            >
              {counts[tab.id] || 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}
