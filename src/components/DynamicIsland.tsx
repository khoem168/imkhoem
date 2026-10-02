'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { usePortal } from '@/context/ThemeLanguageContext';
import { 
  Search, 
  Sun, 
  Moon, 
  Home, 
  Sparkles, 
  ShoppingBag,
  Wrench, 
  Send, 
  User, 
  Languages,
  MoreHorizontal,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export default function DynamicIsland() {
  const { 
    language, 
    toggleLanguage, 
    theme, 
    toggleTheme, 
    setSearchOpen, 
    t 
  } = usePortal();
  
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  // Close more menu when clicking outside (mouse and touch)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const navLinks = [
    { href: '/#home', label: t.nav?.home || (language === 'kh' ? 'ដើម' : 'Home') },
    { href: '/#projects', label: language === 'kh' ? 'គម្រោង' : 'Projects' },
    { href: '/#services', label: language === 'kh' ? 'សេវាកម្ម' : 'Services' },
    { href: '/#tools', label: language === 'kh' ? 'ឧបករណ៍' : 'Free Tools' },
    { href: '/#connect', label: language === 'kh' ? 'ស្ថាបនិក' : 'About' },
  ];

  return (
    <>
      {/* Floating Glass Navbar with Spring Physics */}
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 22 }}
        className="fixed left-1/2 top-4 z-50 w-[min(1180px,calc(100%-24px))] -translate-x-1/2"
      >
        <div className="flex h-16 items-center justify-between gap-2 sm:gap-4 rounded-[24px] border border-white/70 dark:border-white/10 bg-white/70 dark:bg-zinc-900/65 px-3 sm:px-5 shadow-[0_12px_40px_rgba(15,23,42,0.08)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all">
          
          {/* Left: Brand Identity & Avatar */}
          <Link 
            href="/" 
            className="flex min-w-0 items-center gap-2 sm:gap-3 group focus:outline-none shrink"
          >
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full overflow-hidden ring-2 ring-amber-500/40 shadow-sm relative shrink-0">
              <Image
                src="/avatar.jpg"
                alt="heangchhengkhoem"
                width={40}
                height={40}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                priority
              />
            </div>
            <div className="min-w-0">
              <div className="truncate font-bold text-xs sm:text-sm tracking-tight text-[var(--text-primary)] group-hover:text-amber-500 transition-colors">
                heangchhengkhoem
              </div>
              <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-[var(--text-muted)]">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="hidden xs:inline">Vision OS 27</span>
                <span className="xs:hidden">v27</span>
              </div>
            </div>
          </Link>

          {/* Center: Quiet Floating Navigation Links (Desktop) */}
          <nav className="mx-auto hidden lg:flex items-center gap-1 p-1 rounded-full bg-stone-100/80 dark:bg-stone-800/60 border border-[var(--card-border)] shadow-inner">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white dark:hover:bg-zinc-700/80 transition-all cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: Refined Quick Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Command Search Button (⌘K / Ctrl+K) */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchOpen(true)}
              aria-label="Search Palette"
              className="glass-icon flex items-center gap-1.5 px-3 w-auto"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="text-[10px] font-mono font-semibold hidden sm:inline text-[var(--text-muted)]">
                ⌘K
              </span>
            </motion.button>

            {/* Language Switcher Pill */}
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

            {/* Smooth Theme Toggle Pill */}
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

            {/* More Menu Dropdown (Desktop secondary links & quick access) */}
            <div className="relative" ref={moreRef}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                aria-label="More options"
                className="glass-icon"
              >
                <MoreHorizontal className="w-4 h-4" />
              </motion.button>

              <AnimatePresence>
                {moreMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-12 w-52 p-2 rounded-2xl border border-[var(--card-border)] bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl shadow-xl flex flex-col gap-1 z-50 text-xs font-semibold"
                  >
                    <a
                      href="/#telegram"
                      onClick={() => setMoreMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-[var(--text-secondary)] hover:text-amber-500 hover:bg-amber-500/10 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Send className="w-3.5 h-3.5 text-sky-500" />
                        <span>{language === 'kh' ? 'បណ្តាញ Telegram' : 'Telegram Bots'}</span>
                      </div>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">20K+</span>
                    </a>

                    <a
                      href="https://www.khoemstore.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMoreMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-[var(--text-secondary)] hover:text-amber-500 hover:bg-amber-500/10 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-3.5 h-3.5 text-amber-500" />
                        <span>KHOEMSTORE</span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-[var(--text-muted)]" />
                    </a>

                    <a
                      href="https://t.me/heangchhengkhoem"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMoreMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-[var(--text-secondary)] hover:text-amber-500 hover:bg-amber-500/10 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{language === 'kh' ? 'ទាក់ទងផ្ទាល់' : 'Direct Contact'}</span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-[var(--text-muted)]" />
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
}
