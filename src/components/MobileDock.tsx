'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { usePortal } from '@/context/ThemeLanguageContext';
import { Home, Sparkles, ShoppingBag, Wrench, User } from 'lucide-react';

export default function MobileDock() {
  const { language, t } = usePortal();
  const [activeSection, setActiveSection] = useState('home');

  const dockItems = [
    { id: 'home', href: '/#home', label: t.nav?.home || (language === 'kh' ? 'ដើម' : 'Home'), icon: Home },
    { id: 'projects', href: '/#projects', label: language === 'kh' ? 'គម្រោង' : 'Projects', icon: Sparkles },
    { id: 'services', href: '/#services', label: language === 'kh' ? 'សេវាកម្ម' : 'Services', icon: ShoppingBag },
    { id: 'tools', href: '/#tools', label: language === 'kh' ? 'ឧបករណ៍' : 'Tools', icon: Wrench },
    { id: 'connect', href: '/#connect', label: language === 'kh' ? 'អំពី' : 'About', icon: User },
  ];

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'services', 'tools', 'connect'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      aria-label="Mobile Navigation Dock"
      className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[min(380px,calc(100%-32px))]"
    >
      <div className="flex items-center justify-around p-1.5 rounded-full border border-white/70 dark:border-white/10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.2)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
        {dockItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setActiveSection(item.id)}
              className={`relative flex flex-col items-center justify-center min-w-[56px] py-1.5 px-2 rounded-full transition-all duration-200 select-none ${
                isActive 
                  ? 'text-amber-500 font-bold' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeDockBubble"
                  className="absolute inset-0 bg-amber-500/10 dark:bg-amber-500/15 rounded-full border border-amber-500/30"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
              <Icon className="w-4 h-4 mb-0.5 relative z-10" />
              <span className="text-[10px] tracking-tight relative z-10 leading-none">
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
