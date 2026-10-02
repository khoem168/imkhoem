'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { usePortal } from '@/context/ThemeLanguageContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  ArrowUpRight,
  ShoppingBag
} from 'lucide-react';
import ServiceOrderSheet, { ShowcaseServiceItem } from './ServiceOrderSheet';

const rawItems: ShowcaseServiceItem[] = [
  {
    id: 'khoemstore-topup',
    title: {
      en: 'KHOEMSTORE — Game Top-Up',
      kh: 'KHOEMSTORE — បញ្ចូលហ្គេម & ទំនិញឌីជីថល',
    },
    price: '$0.50',
    tag: { en: 'Flagship Platform', kh: 'គម្រោងហាងផ្លូវការ' },
    image: '/game_topup.jpg',
    actionUrl: 'https://www.khoemstore.com/',
    isExternal: true,
  },
  {
    id: 'telegram-service',
    title: {
      en: 'Telegram Stars & Premium',
      kh: 'Telegram Stars & Premium 3/6/12M',
    },
    price: '$1.20',
    tag: { en: 'Automated 24/7', kh: 'ស្វ័យប្រវត្ត ២៤/៧' },
    image: '/telegram_service.jpg',
    actionUrl: 'https://t.me/heangchhengkhoem',
    isExternal: true,
  },
  {
    id: 'mlbb-diamonds',
    title: {
      en: 'Mobile Legends KH ពេជ្រសុទ្ធ',
      kh: 'Mobile Legends KH ពេជ្រសុទ្ធ',
    },
    price: '$0.50',
    tag: { en: 'Instant 60s', kh: 'ចូលលឿន ៦០ វិ' },
    image: 'https://khmer-topup.com/static/uploads/games/mobile-legends-real.webp',
    actionUrl: 'https://www.khoemstore.com/',
    isExternal: true,
  },
  {
    id: 'freefire-diamonds',
    title: {
      en: 'Free Fire (ខ្មែរ) ពេជ្រសុទ្ធ',
      kh: 'Free Fire (ខ្មែរ) ពេជ្រសុទ្ធ',
    },
    price: '$0.50',
    tag: { en: 'Instant Topup', kh: 'ចូលក្នុង 1-5 នាទី' },
    image: 'https://khmer-topup.com/static/uploads/games/free-fire-real.webp',
    actionUrl: 'https://www.khoemstore.com/',
    isExternal: true,
  },
  {
    id: 'eafc-points',
    title: {
      en: 'EAFC Mobile FC Points',
      kh: 'EAFC Mobile FC Points កម្ពុជា',
    },
    price: '$0.90',
    tag: { en: 'Hot Deal', kh: 'តម្លៃពិសេស' },
    image: 'https://khmer-topup.com/static/uploads/games/eafc-mobile-cambodia-8be68c.webp',
    actionUrl: 'https://www.khoemstore.com/',
    isExternal: true,
  },
  {
    id: 'valorant-vp',
    title: {
      en: 'VALORANT Cambodia VP',
      kh: 'VALORANT Cambodia VP Points',
    },
    price: '$1.00',
    tag: { en: 'Riot Direct', kh: 'Riot Direct' },
    image: 'https://khmer-topup.com/static/uploads/games/valorant-cambodia-050cf6.webp',
    actionUrl: 'https://www.khoemstore.com/',
    isExternal: true,
  },
];

// Duplicate items for seamless infinite marquee loop
const infiniteShowcaseItems = [...rawItems, ...rawItems];

export default function ServicesShowcase() {
  const { language } = usePortal();
  const [isPaused, setIsPaused] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ShowcaseServiceItem | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const nudgeScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-8 px-4 max-w-6xl mx-auto w-full overflow-hidden">
      {/* Section Header with Glowing Indicator and Navigation Buttons */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 shadow-[0_0_8px_#ff0055]" />
          </span>
          <span className="section-tag m-0 text-xs sm:text-sm">
            {language === 'kh' ? 'គម្រោង & សេវាកម្មឌីជីថល' : 'DIGITAL SERVICES & TOP-UP'}
          </span>
          <span className="text-amber-500 font-bold hidden sm:inline text-xs">✨</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Creator Badge */}
          <span className="text-[10px] sm:text-[11px] font-mono text-amber-500 hidden md:flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 font-bold shadow-sm">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>KHOEMSTORE Ecosystem</span>
          </span>

          {/* Marquee Navigation Arrow Controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => nudgeScroll('left')}
              aria-label="Previous card"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-stone-100 dark:bg-zinc-800 border border-[var(--card-border)] hover:border-amber-500 text-[var(--text-secondary)] hover:text-amber-500 flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={() => nudgeScroll('right')}
              aria-label="Next card"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-stone-100 dark:bg-zinc-800 border border-[var(--card-border)] hover:border-amber-500 text-[var(--text-secondary)] hover:text-amber-500 flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Infinite Seamless Marquee Scroll */}
      <div 
        ref={scrollContainerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="relative overflow-x-auto scrollbar-none py-2 -mx-2 px-2"
      >
        <div 
          className="marquee-cards-track flex items-center gap-3.5 w-max"
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
        >
          {infiniteShowcaseItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              onClick={() => setSelectedItem(item)}
              className="group relative shrink-0 w-[270px] sm:w-[290px] h-[110px] sm:h-[115px] overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card-solid)]/95 dark:bg-zinc-900/90 p-3 flex items-center justify-between gap-3 shadow-sm hover:shadow-lg dark:hover:border-amber-500/50 hover:border-amber-500/60 active:scale-[0.98] transition-all duration-300 hover:-translate-y-1 cursor-pointer select-none"
            >
              {/* Left Column: Title, Price Pill, Single Action */}
              <div className="relative z-10 flex flex-col justify-between h-full min-w-0 pr-1 flex-1">
                <div>
                  <h3 className="font-bold text-xs sm:text-[13px] text-[var(--text-primary)] leading-snug truncate group-hover:text-amber-500 transition-colors">
                    {item.title[language] || item.title.en}
                  </h3>
                  
                  <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-extrabold text-[11px] font-mono">
                    {item.price}
                  </div>
                </div>

                <div className="mt-1">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 hover:bg-amber-500 text-amber-600 hover:text-white dark:text-amber-400 dark:hover:text-white border border-amber-500/25 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-all">
                    <span>{language === 'kh' ? 'កុម្ម៉ង់' : 'Order'}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* Right Column: Visual Artwork */}
              <div className="relative z-10 w-16 sm:w-18 h-16 sm:h-18 rounded-xl overflow-hidden shrink-0 border border-[var(--card-border)] dark:border-white/10 shadow-xs group-hover:scale-105 transition-transform duration-300 bg-stone-900">
                <Image
                  src={item.image}
                  alt={item.title[language] || item.title.en}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Focused Progressive Disclosure Order Sheet */}
      <ServiceOrderSheet
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
}
