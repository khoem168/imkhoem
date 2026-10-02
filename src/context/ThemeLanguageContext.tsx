'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Theme, ToolItem, ServiceItem } from '@/types';
import { translations } from '@/data/portalData';

interface ThemeLanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  t: typeof translations.en;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  activeTool: ToolItem | null;
  setActiveTool: (tool: ToolItem | null) => void;
  activeService: ServiceItem | null;
  setActiveService: (service: ServiceItem | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ThemeLanguageContext = createContext<ThemeLanguageContextType | undefined>(undefined);

export function ThemeLanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('kh'); // Default to Khmer as requested by user
  const [theme, setTheme] = useState<Theme>('dark'); // Sleek futuristic dark mode default
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeTool, setActiveTool] = useState<ToolItem | null>(null);
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Check saved preferences
    const savedLang = localStorage.getItem('hk_lang') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'kh')) {
      setLanguage(savedLang);
    }

    const savedTheme = localStorage.getItem('hk_theme') as Theme;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      document.documentElement.classList.add('dark');
    }

    // Keyboard shortcut for Cmd/Ctrl+K
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setActiveTool(null);
        setActiveService(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('hk_lang', lang);
  };

  const toggleLanguage = () => {
    const nextLang = language === 'kh' ? 'en' : 'kh';
    handleSetLanguage(nextLang);
  };

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('hk_theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    handleSetTheme(nextTheme);
  };

  const t = translations[language];

  return (
    <ThemeLanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        toggleLanguage,
        theme,
        setTheme: handleSetTheme,
        toggleTheme,
        t,
        searchOpen,
        setSearchOpen,
        activeTool,
        setActiveTool,
        activeService,
        setActiveService,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </ThemeLanguageContext.Provider>
  );
}

export function usePortal() {
  const context = useContext(ThemeLanguageContext);
  if (!context) {
    throw new Error('usePortal must be used within a ThemeLanguageProvider');
  }
  return context;
}
