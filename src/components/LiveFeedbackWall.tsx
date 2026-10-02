'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { usePortal } from '@/context/ThemeLanguageContext';
import { initialFeedbackMessages } from '@/data/portalData';
import { FeedbackMessage } from '@/types';
import { 
  MessageSquareHeart, 
  Send, 
  Heart, 
  Flame, 
  Rocket, 
  Sparkles, 
  X, 
  Plus, 
  CheckCircle2,
  MessageSquarePlus 
} from 'lucide-react';

const STORAGE_KEY = 'heang_community_feedback_v2';

export default function LiveFeedbackWall() {
  const { language, t } = usePortal();

  const [messages, setMessages] = useState<FeedbackMessage[]>(initialFeedbackMessages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [messageText, setMessageText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch (e) {
      console.warn('Could not read feedback from storage:', e);
    }
  }, []);

  // Save to localStorage whenever messages change
  const saveMessages = (newMessages: FeedbackMessage[]) => {
    setMessages(newMessages);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMessages));
    } catch (e) {
      console.warn('Could not save feedback to storage:', e);
    }
  };

  const handlePostMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    setIsSubmitting(true);

    const colors = [
      'from-amber-500 to-orange-600',
      'from-cyan-500 to-blue-600',
      'from-pink-500 to-rose-600',
      'from-emerald-500 to-teal-600',
      'from-purple-500 to-indigo-600',
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newMsg: FeedbackMessage = {
      id: `msg-${Date.now()}`,
      author: authorName.trim() || (language === 'kh' ? 'អ្នកចូលទស្សនា (Guest)' : 'Guest Visitor'),
      role: authorRole.trim() || (language === 'kh' ? 'សហគមន៍ Tech' : 'Tech Community'),
      message: messageText.trim(),
      date: language === 'kh' ? 'ទើបតែផ្ញើ' : 'Just now',
      avatarColor: randomColor,
      reactions: {
        heart: 1,
        fire: 1,
        rocket: 1,
      },
    };

    setTimeout(() => {
      const updated = [newMsg, ...messages];
      saveMessages(updated);
      setMessageText('');
      setAuthorName('');
      setAuthorRole('');
      setIsSubmitting(false);
      setIsModalOpen(false);

      confetti({ particleCount: 50, spread: 80, origin: { y: 0.6 } });

      setToastMessage(language === 'kh' ? 'សាររបស់អ្នកត្រូវបានចុះផ្សាយជោគជ័យ!' : 'Your note was posted successfully!');
      setTimeout(() => setToastMessage(null), 4000);
    }, 250);
  };

  const handleReaction = (id: string, type: 'heart' | 'fire' | 'rocket') => {
    const updated = messages.map((m) => {
      if (m.id === id) {
        return {
          ...m,
          reactions: {
            ...m.reactions,
            [type]: m.reactions[type] + 1,
          },
        };
      }
      return m;
    });
    saveMessages(updated);
  };

  return (
    <section id="wall" className="py-14 px-4 max-w-6xl mx-auto w-full relative">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom duration-300">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <span className="section-tag inline-flex items-center gap-2 mb-2.5">
            <MessageSquareHeart className="w-3.5 h-3.5 text-amber-500" />
            <span>{t.wall?.badge || (language === 'kh' ? 'ប្រអប់សារ & មតិកែលម្អសហគមន៍' : 'COMMUNITY & GUESTBOOK')}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[var(--text-primary)]">
            {t.wall?.title || (language === 'kh' ? 'ប្រអប់សារ Feedback & Confession' : 'Live Community Feedback & Guestbook')}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1.5 max-w-2xl leading-relaxed">
            {t.wall?.subtitle || (language === 'kh' ? 'ផ្ញើសារសរសើរ មតិកែលម្អ ឬសំណួរផ្ទាល់ទៅកាន់ Heang Chhengkhoem។ សារត្រូវបានរក្សាទុកជាក់ស្តែង។' : 'Leave praise, suggestions, or greetings directly for Heang Chhengkhoem. Messages persist in real-time.')}
          </p>
        </div>

        {/* Right Controls: Message Counter & Modal Trigger Button */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-amber-500/25 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-mono font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>{messages.length} {language === 'kh' ? 'សារបានចុះផ្សាយ' : 'Messages'}</span>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[0_4px_16px_rgba(245,158,11,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'kh' ? 'សរសេរសារថ្មី' : 'Post a Note'}</span>
          </button>
        </div>
      </div>

      {/* Full-Width 3-Column Community Feedback Wall */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {messages.map((item) => {
          const initials = item.author.slice(0, 2).toUpperCase();
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="vision-glass p-5 sm:p-6 rounded-[2rem] border border-[var(--card-border)] hover:border-amber-500/40 transition-colors duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl group relative overflow-hidden"
            >
              <div>
                {/* Author Header */}
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${item.avatarColor} text-white flex items-center justify-center font-bold text-xs shadow-sm ring-2 ring-white/20 dark:ring-white/10 shrink-0`}>
                      {initials}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[var(--text-primary)] group-hover:text-amber-500 transition-colors">
                        {item.author}
                      </div>
                      <div className="text-[10px] text-[var(--text-muted)] font-medium">
                        {item.role}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 border border-[var(--card-border)]">
                    {item.date}
                  </span>
                </div>

                {/* Message Body */}
                <p className="text-xs sm:text-[13px] text-[var(--text-primary)]/90 leading-relaxed font-normal">
                  &ldquo;{item.message}&rdquo;
                </p>
              </div>

              {/* Reaction Buttons */}
              <div className="flex items-center gap-2 pt-3.5 mt-3.5 border-t border-[var(--card-border)]/70 text-xs">
                <button
                  onClick={() => handleReaction(item.id, 'heart')}
                  className="px-2.5 py-1 rounded-xl border border-[var(--card-border)] bg-[var(--card-solid)] hover:border-rose-500/50 hover:bg-rose-500/10 active:scale-90 flex items-center gap-1.5 text-[11px] text-[var(--text-secondary)] transition-all cursor-pointer shadow-2xs"
                  title="Love"
                >
                  <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                  <span className="font-mono font-semibold">{item.reactions.heart}</span>
                </button>

                <button
                  onClick={() => handleReaction(item.id, 'fire')}
                  className="px-2.5 py-1 rounded-xl border border-[var(--card-border)] bg-[var(--card-solid)] hover:border-amber-500/50 hover:bg-amber-500/10 active:scale-90 flex items-center gap-1.5 text-[11px] text-[var(--text-secondary)] transition-all cursor-pointer shadow-2xs"
                  title="Fire"
                >
                  <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span className="font-mono font-semibold">{item.reactions.fire}</span>
                </button>

                <button
                  onClick={() => handleReaction(item.id, 'rocket')}
                  className="px-2.5 py-1 rounded-xl border border-[var(--card-border)] bg-[var(--card-solid)] hover:border-cyan-500/50 hover:bg-cyan-500/10 active:scale-90 flex items-center gap-1.5 text-[11px] text-[var(--text-secondary)] transition-all cursor-pointer shadow-2xs"
                  title="Rocket"
                >
                  <Rocket className="w-3 h-3 text-cyan-500" />
                  <span className="font-mono font-semibold">{item.reactions.rocket}</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Sleek VisionOS Post a Note Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="w-full max-w-lg vision-glass p-6 sm:p-7 rounded-[2.5rem] border border-[var(--card-border)] bg-[var(--card-solid)] shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200 text-[var(--text-primary)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top ambient aura */}
            <div className="absolute -top-16 -right-16 w-44 h-44 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--card-border)] mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
                    {language === 'kh' ? 'សរសេរសារថ្មី (Post a Note)' : 'Write a Note or Review'}
                  </h3>
                  <p className="text-[11px] text-[var(--text-secondary)]">
                    {language === 'kh' ? 'សាររបស់អ្នកនឹងបង្ហាញលើផ្ទាំង Guestbook សាធារណៈ' : 'Your message will appear on the public guestbook wall'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full border border-[var(--card-border)] bg-[var(--bg-page)] text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handlePostMessage} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-[var(--text-secondary)] mb-1.5">
                  {language === 'kh' ? 'ឈ្មោះ ឬរហស្សនាមរបស់អ្នក:' : 'Your Name or Alias:'}
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder={language === 'kh' ? 'ឧ. សុខា Developer' : 'e.g. Alex Tech'}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)]/80 text-xs sm:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[var(--text-secondary)] mb-1.5">
                  {language === 'kh' ? 'តួនាទី ឬចំណងជើង:' : 'Role or Tagline:'}
                </label>
                <input
                  type="text"
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value)}
                  placeholder={language === 'kh' ? 'ឧ. Full-Stack Dev / MLBB Gamer' : 'e.g. Software Engineer / Gamer'}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)]/80 text-xs sm:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[var(--text-secondary)] mb-1.5">
                  {language === 'kh' ? 'ខ្លឹមសារសារ / មតិយោបល់:' : 'Your Message / Thoughts:'}
                </label>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  rows={4}
                  required
                  placeholder={language === 'kh' ? 'សរសេរការលើកទឹកចិត្ត ឬការផ្ដល់យោបល់...' : 'Leave a note of encouragement or feedback...'}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)]/80 text-xs sm:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[var(--card-border)] text-xs font-semibold text-[var(--text-secondary)] hover:bg-stone-500/10 transition-colors cursor-pointer"
                >
                  {language === 'kh' ? 'បោះបង់' : 'Cancel'}
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || !messageText.trim()}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[0_4px_16px_rgba(245,158,11,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? (language === 'kh' ? 'កំពុងផ្ញើ...' : 'Posting...') : (language === 'kh' ? 'ផ្ញើសារចូល Wall ភ្លាមៗ' : 'Publish Note')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
