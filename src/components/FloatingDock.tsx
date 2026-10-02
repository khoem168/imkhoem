'use client';

import React, { useState, useEffect } from 'react';
import { usePortal } from '@/context/ThemeLanguageContext';
import { 
  Home, 
  Gamepad2, 
  Sparkles, 
  ShoppingBag, 
  User, 
  ExternalLink,
  ChevronUp
} from 'lucide-react';

export default function FloatingDock() {
  const { language } = usePortal();
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(true);

  const navItems = [
    { id: 'home', label: language === 'kh' ? 'ទំព័រដើម' : 'Home', icon: Home, href: '#home' },
    { id: 'games', label: language === 'kh' ? 'ហ្គេម Topup' : 'Games', icon: Gamepad2, href: '#games' },
    { id: 'tools', label: language === 'kh' ? 'ឧបករណ៍' : 'Tools', icon: Sparkles, href: '#tools' },
    { 
      id: 'store', 
      label: 'KhoemStore', 
      icon: ShoppingBag, 
      href: 'https://www.khoemstore.com/', 
      external: true,
      badge: 'HOT'
    },
    { id: 'connect', label: language === 'kh' ? 'ស្ថាបនិក' : 'Founder', icon: User, href: '#connect' },
  ];

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside aria-label="Floating Quick Navigation" className="fixed bottom-3.5 inset-x-0 z-40 flex justify-center pointer-events-none px-3">
      <nav 
        className="pointer-events-auto flex items-center gap-1 sm:gap-2 px-2.5 py-1.5 rounded-full border border-white/30 dark:border-white/15 bg-white/80 dark:bg-stone-900/85 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.25)] transition-all duration-300 ring-1 ring-black/5"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          if (item.external) {
            return (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 shadow-md hover:scale-105 transition-all group"
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{item.label}</span>
                <span className="text-[8px] font-black bg-black/30 px-1 rounded-sm leading-none">
                  {item.badge}
                </span>
              </a>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                scrollTo(item.href);
              }}
              className={`relative flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'text-amber-600 dark:text-amber-400 bg-amber-500/15'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-stone-100/60 dark:hover:bg-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="text-[11px] font-medium hidden xs:inline">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
