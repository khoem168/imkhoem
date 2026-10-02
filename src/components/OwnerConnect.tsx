'use client';

import React from 'react';
import Image from 'next/image';
import { usePortal } from '@/context/ThemeLanguageContext';
import { 
  Send, 
  Mail, 
  ArrowUpRight,
  Code2
} from 'lucide-react';

export default function OwnerConnect() {
  const { language } = usePortal();

  const socialLinks = [
    {
      name: 'Telegram',
      handle: '@heangchhengkhoem',
      href: 'https://t.me/heangchhengkhoem',
      icon: (
        <Send className="w-4 h-4 text-sky-500" />
      ),
      color: 'hover:border-sky-500/50 bg-sky-500/5',
    },
    {
      name: 'Facebook',
      handle: 'Heang Chhengkhoem',
      href: 'https://facebook.com/heangchhengkhoem',
      icon: (
        <svg className="w-4 h-4 fill-[#1877f2]" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      color: 'hover:border-blue-500/50 bg-blue-500/5',
    },
    {
      name: 'YouTube',
      handle: '@heangchhengkhoem',
      href: 'https://youtube.com/@heangchhengkhoem',
      icon: (
        <svg className="w-4 h-4 fill-[#ff0000]" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      color: 'hover:border-red-500/50 bg-red-500/5',
    },
    {
      name: 'GitHub',
      handle: 'heangchhengkhoem',
      href: 'https://github.com/heangchhengkhoem',
      icon: (
        <svg className="w-4 h-4 fill-stone-800 dark:fill-stone-200" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      color: 'hover:border-stone-500/50 bg-stone-500/5',
    },
    {
      name: 'TikTok',
      handle: '@heangchhengkhoem',
      href: 'https://tiktok.com/@heangchhengkhoem',
      icon: (
        <svg className="w-4 h-4 fill-stone-900 dark:fill-white" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      ),
      color: 'hover:border-pink-500/50 bg-pink-500/5',
    },
    {
      name: 'Email',
      handle: 'contact@khoem.me',
      href: 'mailto:contact@khoem.me',
      icon: (
        <Mail className="w-4 h-4 text-amber-500" />
      ),
      color: 'hover:border-amber-500/50 bg-amber-500/5',
    },
  ];

  return (
    <section id="connect" className="py-12 px-4 max-w-6xl mx-auto w-full relative">
      <div className="rounded-[28px] border border-[var(--card-border)] bg-[var(--card-solid)] p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          {/* Left Column: Short Profile Summary */}
          <div className="max-w-xl">
            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-amber-500/30 shrink-0 relative">
                <Image
                  src="/avatar.jpg"
                  alt="Heang Chhengkhoem"
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                  Heang Chhengkhoem
                </h3>
                <div className="text-xs text-[var(--text-muted)] font-mono">
                  Full-Stack Platform Architect • Phnom Penh, KH
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mt-2">
              {language === 'kh'
                ? 'ស្ថាបនិកប្រព័ន្ធ KHOEMSTORE និងអ្នកអភិវឌ្ឍន៍បណ្តាញ Telegram Bots ស្វ័យប្រវត្ត ព្រមទាំងឧបករណ៍ AI & Web Tools សម្រាប់ Creators នៅកម្ពុជា។'
                : 'Platform architect behind KHOEMSTORE, autonomous Telegram bot networks, and high-performance client-side web tools for Cambodian creators.'}
            </p>
          </div>

          {/* Right Column: 6 Compact Channel Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full lg:w-auto shrink-0">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.href.startsWith('mailto') ? '_self' : '_blank'}
                rel={link.href.startsWith('mailto') ? '' : 'noopener noreferrer'}
                className={`p-3 rounded-2xl border border-[var(--card-border)] ${link.color} transition-all flex items-center justify-between gap-2.5 group cursor-pointer shadow-xs hover:-translate-y-0.5 active:scale-95`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="shrink-0">{link.icon}</div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[var(--text-primary)] truncate">
                      {link.name}
                    </div>
                    <div className="text-[10px] text-[var(--text-muted)] font-mono truncate">
                      {link.handle}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
