'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { usePortal } from '@/context/ThemeLanguageContext';
import { featuredGames } from '@/data/portalData';
import { GameItem } from '@/types';
import { 
  Sparkles, 
  ArrowUpRight, 
  Zap, 
  Gamepad2, 
  ShieldCheck, 
  QrCode, 
  X, 
  CheckCircle2,
  Send,
  ExternalLink
} from 'lucide-react';

export default function FeaturedGamesShowcase() {
  const { language } = usePortal();
  const [activeGame, setActiveGame] = useState<GameItem | null>(null);
  const [playerId, setPlayerId] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [selectedPackIndex, setSelectedPackIndex] = useState(1);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const packs = [
    { name: 'Starter Pack', amount: '86 Diamonds / Pts', price: '$0.99' },
    { name: 'Popular Pack', amount: '257 Diamonds / Pts', price: '$2.80' },
    { name: 'Elite Value', amount: '706 Diamonds / Pts', price: '$7.50' },
    { name: 'Super Champion', amount: '1,412 Diamonds / Pts', price: '$14.90' },
  ];

  const handleOpenGame = (game: GameItem) => {
    setActiveGame(game);
    setPlayerId('');
    setZoneId('');
    setSelectedPackIndex(1);
    setOrderCompleted(false);
  };

  return (
    <section id="games" className="py-6 px-4 max-w-6xl mx-auto w-full">
      {/* Section Header */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="section-tag flex items-center gap-1.5">
            <Gamepad2 className="w-3.5 h-3.5 text-amber-500 inline" />
            {language === 'kh' ? 'ហ្គេមល្បីៗ KHOEMSTORE • បញ្ចូលលុយភ្លាមៗ' : 'POPULAR GAMES • KHOEMSTORE TOP-UP'}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            <Zap className="w-3 h-3" />
            <span>Official 24/7 API</span>
          </span>
        </div>

        <a
          href="https://www.khoemstore.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-500 transition-colors group"
        >
          <span>{language === 'kh' ? 'មើលហ្គេម 400+ លើ KhoemStore' : 'Explore 400+ Games on KhoemStore'}</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* Grid of Real Game Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
        {featuredGames.map((game, index) => (
          <div
            key={game.id}
            className="vision-glass overflow-hidden rounded-2xl group flex flex-col justify-between cursor-pointer border border-[var(--card-border)] hover:border-amber-500/50 hover:shadow-[0_8px_30px_rgba(255,107,26,0.15)] transition-all duration-300"
            onClick={() => handleOpenGame(game)}
          >
            {/* Top Artwork Area */}
            <div className="relative w-full aspect-[16/10] overflow-hidden bg-stone-900">
              <Image
                src={game.imageUrl}
                alt={game.name}
                fill
                priority={index < 4}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              {/* Dark gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Publisher & Badge */}
              <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                  {game.publisher}
                </span>
                {game.badge && (
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-full backdrop-blur-md shadow-sm ${
                    game.badge.includes('HOT') 
                      ? 'bg-rose-500 text-white'
                      : game.badge.includes('PRO')
                      ? 'bg-cyan-500 text-black'
                      : 'bg-amber-500 text-black'
                  }`}>
                    {game.badge}
                  </span>
                )}
              </div>

              {/* Price Pill at bottom of artwork */}
              <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white">
                <span className="text-[10px] font-mono font-semibold bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-md border border-white/10">
                  {game.priceStart}
                </span>
                <span className="text-[10px] font-mono opacity-80 flex items-center gap-1">
                  <Zap className="w-2.5 h-2.5 text-amber-400" />
                  <span>{game.currencyName}</span>
                </span>
              </div>
            </div>

            {/* Bottom Card Meta */}
            <div className="p-3 flex flex-col justify-between flex-1">
              <div>
                <h4 className="text-xs font-bold text-[var(--text-primary)] group-hover:text-amber-500 transition-colors line-clamp-1 leading-snug">
                  {language === 'kh' ? game.khName : game.name}
                </h4>
                <p className="text-[10px] text-[var(--text-muted)] mt-0.5">
                  {game.category} • 24/7 Instant Top-Up
                </p>
              </div>

              {/* Quick Action Buttons */}
              <div className="mt-3 pt-2.5 border-t border-[var(--card-border)] flex items-center justify-between gap-1.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenGame(game);
                  }}
                  className="flex-1 py-1.5 px-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[11px] transition-all text-center flex items-center justify-center gap-1 shadow-sm"
                >
                  <Zap className="w-3 h-3 fill-slate-950" />
                  <span>{language === 'kh' ? 'បញ្ចូលលុយ' : 'Top Up'}</span>
                </button>

                <a
                  href="https://www.khoemstore.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-xl border border-[var(--card-border)] hover:border-amber-500/40 text-[var(--text-secondary)] hover:text-amber-500 transition-colors"
                  title="Open in KhoemStore"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Top-Up & KHQR Payment Modal */}
      {activeGame && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveGame(null)}
        >
          <div
            className="animate-spring-window w-full max-w-lg bg-[var(--card-solid)] border border-white/20 dark:border-white/10 rounded-[2rem] p-6 shadow-2xl text-[var(--text-primary)] relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-[var(--card-border)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden relative shrink-0 border border-white/20">
                  <Image
                    src={activeGame.imageUrl}
                    alt={activeGame.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[var(--text-primary)]">
                    {language === 'kh' ? activeGame.khName : activeGame.name}
                  </h3>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    {activeGame.publisher} • Automated Server Delivery
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveGame(null)}
                className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!orderCompleted ? (
              <div className="mt-4 space-y-4">
                {/* ID Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                      {activeGame.uidLabel || 'Player ID'}
                    </label>
                    <input
                      type="text"
                      value={playerId}
                      onChange={(e) => setPlayerId(e.target.value)}
                      placeholder={activeGame.uidExample || 'e.g. 12345678'}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)] text-[var(--text-primary)] text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {activeGame.requiresServer && (
                    <div>
                      <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                        Zone / Server ID
                      </label>
                      <input
                        type="text"
                        value={zoneId}
                        onChange={(e) => setZoneId(e.target.value)}
                        placeholder="e.g. 2004"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)] text-[var(--text-primary)] text-xs focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  )}
                </div>

                {/* Package Options */}
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
                    {language === 'kh' ? 'ជ្រើសរើសកញ្ចប់ពេជ្រ / ពិន្ទុ' : 'Select Top-Up Package'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {packs.map((pack, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedPackIndex(idx)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          selectedPackIndex === idx
                            ? 'border-amber-500 bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 ring-2 ring-amber-500/30'
                            : 'border-[var(--card-border)] hover:border-stone-400 text-[var(--text-primary)]'
                        }`}
                      >
                        <div className="font-bold text-xs">{pack.name}</div>
                        <div className="text-[11px] text-[var(--text-muted)] mt-0.5">{pack.amount}</div>
                        <div className="font-mono font-black text-sm text-amber-500 mt-1">{pack.price}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Direct payment or KhoemStore button */}
                <div className="pt-3 border-t border-[var(--card-border)] space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (!playerId) {
                        alert(language === 'kh' ? 'សូមបញ្ចូល Player ID!' : 'Please enter your Player ID!');
                        return;
                      }
                      setOrderCompleted(true);
                    }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>{language === 'kh' ? `បន្តស្កេនទូទាត់ ABA KHQR (${packs[selectedPackIndex].price})` : `Scan ABA KHQR to Top Up (${packs[selectedPackIndex].price})`}</span>
                  </button>

                  <a
                    href="https://www.khoemstore.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl border border-[var(--card-border)] hover:border-amber-500/40 text-[var(--text-secondary)] hover:text-amber-500 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>{language === 'kh' ? 'បើកនៅលើ KHOEMSTORE ផ្លូវការ' : 'Open on Official KHOEMSTORE'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ) : (
              /* QR Code Payment View */
              <div className="mt-4 text-center py-3 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-semibold border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{language === 'kh' ? 'កូដ KHQR បានបង្កើតរួចរាល់' : 'KHQR Generated Successfully'}</span>
                </div>

                {/* QR Code Container */}
                <div className="mx-auto w-56 p-4 rounded-2xl bg-white text-slate-900 shadow-xl border border-stone-200">
                  <div className="bg-[#D92D20] text-white text-[11px] font-black py-1 rounded-md mb-2 font-mono tracking-wider">
                    BAKONG KHQR
                  </div>
                  <div className="aspect-square w-full bg-stone-100 flex items-center justify-center rounded-lg border border-stone-200 relative overflow-hidden">
                    <QrCode className="w-40 h-40 text-slate-900" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center p-1 border">
                        <span className="font-bold text-[10px] text-red-600">KH</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs font-mono font-bold text-slate-800">
                    {packs[selectedPackIndex].price} USD
                  </div>
                  <div className="text-[10px] text-stone-500 mt-0.5">
                    Heang Chhengkhoem • Official Shop
                  </div>
                </div>

                <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto">
                  {language === 'kh' 
                    ? `សូមបើកកម្មវិធីធនាគារណាមួយ (ABA, Wing, ACLEDA, Bakong) រួចស្កេនទូទាត់។ ប្រព័ន្ធនឹងបញ្ចូល ${packs[selectedPackIndex].amount} ទៅកាន់ ID: ${playerId} ក្នុងរយៈពេល ១-៣ នាទី។`
                    : `Scan with any Cambodian mobile banking app. Delivery of ${packs[selectedPackIndex].amount} to ID: ${playerId} will complete within 1-3 minutes.`
                  }
                </p>

                <div className="pt-2 flex items-center justify-center gap-2">
                  <a
                    href="https://t.me/heangchhengkhoem"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{language === 'kh' ? 'ផ្ញើស្លីបទៅកាន់ Telegram' : 'Send Receipt to Telegram'}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setActiveGame(null)}
                    className="px-4 py-2 rounded-xl border border-[var(--card-border)] hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-semibold"
                  >
                    {language === 'kh' ? 'រួចរាល់' : 'Done'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
