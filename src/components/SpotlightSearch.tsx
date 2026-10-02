'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortal } from '@/context/ThemeLanguageContext';
import { portalTools, portalServices, featuredProjects, telegramBots } from '@/data/portalData';
import { 
  Search, 
  X, 
  Wrench, 
  Sparkles, 
  FolderGit2, 
  ExternalLink,
  Languages,
  Sun,
  Moon,
  Send,
  Home,
  User,
  ShoppingBag,
  ArrowRight,
  Command
} from 'lucide-react';
import { ToolItem, ProjectItem } from '@/types';
import Link from 'next/link';

export default function SpotlightSearch() {
  const { 
    searchOpen, 
    setSearchOpen, 
    language, 
    toggleLanguage,
    theme, 
    toggleTheme,
    setActiveTool
  } = usePortal();
  
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [searchOpen]);

  // Global Keyboard Listener for Cmd+K and Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(!searchOpen);
      }
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen, setSearchOpen]);

  const q = query.toLowerCase().trim();

  // Search results grouping
  const matchedProjects = featuredProjects.filter((p) => {
    if (!q) return false;
    return (
      p.title[language]?.toLowerCase().includes(q) ||
      p.title.en.toLowerCase().includes(q) ||
      p.category[language]?.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  });

  const matchedTools = portalTools.filter((t) => {
    if (!q) return false;
    return (
      t.name[language]?.toLowerCase().includes(q) ||
      t.name.en.toLowerCase().includes(q) ||
      t.desc[language]?.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    );
  });

  const matchedServices = portalServices.filter((s) => {
    if (!q) return false;
    return (
      s.title[language]?.toLowerCase().includes(q) ||
      s.title.en.toLowerCase().includes(q) ||
      s.tag[language]?.toLowerCase().includes(q)
    );
  });

  const navItems = [
    { label: language === 'kh' ? 'ទំព័រដើម' : 'Home', hash: '/#home', category: 'Navigation', icon: Home },
    { label: language === 'kh' ? 'គម្រោងសំខាន់ៗ' : 'Featured Projects', hash: '/#projects', category: 'Navigation', icon: FolderGit2 },
    { label: language === 'kh' ? 'សេវាកម្មឌីជីថល' : 'Digital Services', hash: '/#services', category: 'Navigation', icon: ShoppingBag },
    { label: language === 'kh' ? 'ឧបករណ៍ Free Tools' : 'Free Tools', hash: '/#tools', category: 'Navigation', icon: Wrench },
    { label: language === 'kh' ? 'ស្ថាបនិក Heang' : 'About / Creator', hash: '/#connect', category: 'Navigation', icon: User },
    { label: language === 'kh' ? 'បណ្តាញ Telegram' : 'Telegram Network', hash: '/#telegram', category: 'Navigation', icon: Send },
  ];

  const matchedNav = navItems.filter((n) => {
    if (!q) return true;
    return n.label.toLowerCase().includes(q);
  });

  // Suggested (when query is empty)
  const suggestedItems = portalTools.slice(0, 4);

  // Flat list for keyboard selection
  type SearchResultItem = 
    | { type: 'project'; item: ProjectItem }
    | { type: 'tool'; item: ToolItem }
    | { type: 'nav'; item: typeof navItems[0] };

  const allResults: SearchResultItem[] = [];

  if (q) {
    matchedProjects.forEach(p => allResults.push({ type: 'project', item: p }));
    matchedTools.forEach(t => allResults.push({ type: 'tool', item: t }));
    matchedNav.forEach(n => allResults.push({ type: 'nav', item: n }));
  } else {
    suggestedItems.forEach(t => allResults.push({ type: 'tool', item: t }));
    matchedNav.slice(0, 4).forEach(n => allResults.push({ type: 'nav', item: n }));
  }

  // Keyboard Navigation: Up, Down, Enter
  useEffect(() => {
    const handleKeyNav = (e: KeyboardEvent) => {
      if (!searchOpen || allResults.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % allResults.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + allResults.length) % allResults.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const active = allResults[selectedIndex];
        if (active) {
          if (active.type === 'tool') {
            setSearchOpen(false);
            setActiveTool(active.item);
          } else if (active.type === 'project') {
            setSearchOpen(false);
            window.location.href = `/projects/${active.item.id}`;
          } else if (active.type === 'nav') {
            setSearchOpen(false);
            const el = document.querySelector(active.item.hash.replace('/', ''));
            el?.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyNav);
    return () => window.removeEventListener('keydown', handleKeyNav);
  }, [searchOpen, allResults, selectedIndex, setSearchOpen, setActiveTool]);

  if (!searchOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-150"
        onClick={() => setSearchOpen(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.15 }}
          className="w-full max-w-xl rounded-[24px] border border-[var(--card-border)] bg-[var(--card-solid)] text-[var(--text-primary)] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input Bar */}
          <div className="p-4 border-b border-[var(--card-border)] flex items-center gap-3">
            <Search className="w-5 h-5 text-amber-500 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder={language === 'kh' ? 'ស្វែងរកឧបករណ៍ គម្រោង ឬផ្លូវកាត់...' : 'Search tools, projects, or commands...'}
              className="flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
            />
            {query && (
              <button 
                onClick={() => setQuery('')}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono text-[var(--text-muted)] border border-[var(--card-border)] rounded-md bg-[var(--bg-page)]">
              ESC
            </kbd>
          </div>

          {/* Results List */}
          <div className="overflow-y-auto p-2 space-y-4 max-h-[60vh] divide-y divide-[var(--card-border)]/40">
            {/* 1. PROJECTS GROUP */}
            {matchedProjects.length > 0 && (
              <div className="pt-2 first:pt-0">
                <div className="px-3 py-1 text-[10px] font-mono font-bold text-amber-500 uppercase tracking-wider">
                  {language === 'kh' ? 'គម្រោងធំៗ' : 'Projects'}
                </div>
                <div className="space-y-1 mt-1">
                  {matchedProjects.map((project) => (
                    <Link
                      key={project.id}
                      href={`/projects/${project.id}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-amber-500/10 text-left transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                          <FolderGit2 className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[var(--text-primary)] group-hover:text-amber-500 truncate">
                            {project.title[language] || project.title.en}
                          </div>
                          <div className="text-[10px] text-[var(--text-muted)] truncate">
                            {project.category[language] || project.category.en}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-amber-500 shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* 2. TOOLS GROUP */}
            {(q ? matchedTools : suggestedItems).length > 0 && (
              <div className="pt-2 first:pt-0">
                <div className="px-3 py-1 text-[10px] font-mono font-bold text-cyan-500 uppercase tracking-wider">
                  {q ? (language === 'kh' ? 'ឧបករណ៍ប្រើប្រាស់' : 'Free Tools') : (language === 'kh' ? 'ឧបករណ៍ពេញនិយម (Suggested)' : 'Suggested Tools')}
                </div>
                <div className="space-y-1 mt-1">
                  {(q ? matchedTools : suggestedItems).map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => {
                        setSearchOpen(false);
                        setActiveTool(tool);
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-cyan-500/10 text-left transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0">
                          <Wrench className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[var(--text-primary)] group-hover:text-cyan-500 truncate">
                            {tool.name[language] || tool.name.en}
                          </div>
                          <div className="text-[10px] text-[var(--text-muted)] truncate">
                            {tool.desc[language] || tool.desc.en}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-500 border border-cyan-500/20 px-1.5 py-0.5 rounded shrink-0">
                        Run
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 3. NAVIGATION GROUP */}
            {matchedNav.length > 0 && (
              <div className="pt-2 first:pt-0">
                <div className="px-3 py-1 text-[10px] font-mono font-bold text-purple-500 uppercase tracking-wider">
                  {language === 'kh' ? 'ផ្លូវកាត់ទំព័រ' : 'Navigation'}
                </div>
                <div className="space-y-1 mt-1">
                  {matchedNav.map((nav, idx) => {
                    const NavIcon = nav.icon;
                    return (
                      <a
                        key={idx}
                        href={nav.hash}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-purple-500/10 text-left transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                            <NavIcon className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-semibold text-[var(--text-primary)] group-hover:text-purple-500">
                            {nav.label}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-[var(--text-muted)]">Jump</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Footer with Quick Controls */}
          <div className="p-3 border-t border-[var(--card-border)] bg-[var(--bg-page)]/60 flex items-center justify-between text-xs text-[var(--text-muted)] font-mono">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleLanguage}
                className="hover:text-amber-500 flex items-center gap-1 cursor-pointer"
              >
                <Languages className="w-3.5 h-3.5 text-amber-500" />
                <span>{language === 'kh' ? 'ខ្មែរ' : 'EN'}</span>
              </button>
              <span>•</span>
              <button
                onClick={toggleTheme}
                className="hover:text-amber-500 flex items-center gap-1 cursor-pointer"
              >
                {theme === 'dark' ? <Moon className="w-3.5 h-3.5 text-amber-400" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
                <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-3 text-[11px]">
              <span>↑↓ Navigate</span>
              <span>↵ Open</span>
              <span>ESC Close</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
