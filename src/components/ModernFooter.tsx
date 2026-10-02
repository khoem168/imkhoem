'use client';

import React from 'react';
import { usePortal } from '@/context/ThemeLanguageContext';
import { portalTools, portalServices } from '@/data/portalData';
import { Send, QrCode } from 'lucide-react';

export default function ModernFooter() {
  const { language, t, setActiveTool } = usePortal();

  return (
    <footer className="mt-16 border-t border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text-secondary)] pt-12 pb-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Col 1: About & Payment Methods */}
        <div className="space-y-6">
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-3">
              {language === 'kh' ? 'អំពី HEANG CHHENGKHOEM' : 'ABOUT HEANG CHHENGKHOEM'}
            </h5>
            <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
              {language === 'kh'
                ? 'heangchhengkhoem គឺជាវេទិកាឌីជីថលទាំងអស់ក្នុងមួយនៅកម្ពុជា ដែលទទួលបានការទុកចិត្តតាំងពីឆ្នាំ 2024។ បញ្ចូលលុយហ្គេមជាង 400+ ក្នុងរយៈពេលប៉ុន្មាននាទី, ទិញ Telegram Star, Premium & Boost, បង្កើន TikTok និងប្រើឧបករណ៍ AI ឥតគិតថ្លៃជាង 20+ ដោយមិនបាច់ចុះឈ្មោះ។ ការផ្ញើជូនរហ័ស ជំនួយ 24/7 និងការទូទាត់ប្រកបដោយសុវត្ថិភាពតាម ABA KHQR - ស្កេនទូទាត់ជាមួយគ្រប់កម្មវិធីធនាគារ។'
                : "heangchhengkhoem is Cambodia's all-in-one digital platform, trusted since 2024. Top up 400+ games in minutes, buy Telegram Star, Premium & Boost, grow your TikTok, and use 20+ free AI tools with no sign-up required. Instant delivery, 24/7 support, and secure payment with ABA KHQR - scan to pay with any banking app."}
            </p>
          </div>

          {/* Payment Methods exactly matching screenshot 2 */}
          <div>
            <h6 className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2">
              {language === 'kh' ? 'វិធីសាស្ត្រទូទាត់ប្រាក់' : 'PAYMENT METHODS'}
            </h6>
            <div className="text-xs text-[var(--text-muted)] mb-2">
              {language === 'kh' ? 'យើងទទួលយក:' : 'We accept:'}
            </div>
            <div className="flex items-center gap-2">
              {/* ABA badge */}
              <div className="px-3 py-1.5 rounded-lg bg-[#005f87] text-white font-black text-xs font-mono tracking-wider shadow-sm">
                ABA
              </div>
              {/* KHQR badge */}
              <div className="px-3 py-1.5 rounded-lg bg-[#d92d20] text-white font-black text-xs font-mono tracking-wider shadow-sm">
                KHQR
              </div>
            </div>
          </div>
        </div>

        {/* Col 2: Services */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-3">
            {language === 'kh' ? 'គម្រោង & សេវាកម្ម' : 'PROJECTS & SERVICES'}
          </h5>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="#projects" className="hover:text-amber-500 transition-colors">
                {language === 'kh' ? 'គម្រោង KHOEMSTORE & KHOEM.IT' : 'KHOEMSTORE & KHOEM.IT'}
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-amber-500 transition-colors">
                Game Top Up (400+ Games)
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-amber-500 transition-colors">
                Telegram Stars & Boosts
              </a>
            </li>
            <li>
              <a href="#wall" className="hover:text-amber-500 transition-colors">
                {language === 'kh' ? 'ប្រអប់សារសហគមន៍' : 'Community Guestbook Wall'}
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Free Tools */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-3">
            {language === 'kh' ? 'ឧបករណ៍ឥតគិតថ្លៃ' : 'FREE TOOLS'}
          </h5>
          <ul className="space-y-1.5 text-xs">
            {portalTools.slice(0, 14).map((tool) => (
              <li key={tool.id}>
                <button
                  onClick={() => setActiveTool(tool)}
                  className="hover:text-amber-500 transition-colors text-left line-clamp-1"
                >
                  {tool.name[language]}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Support */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-3">
            {language === 'kh' ? 'ជំនួយ & ទំនាក់ទំនង' : 'SUPPORT'}
          </h5>
          <ul className="space-y-2 text-xs">
            <li>
              <a
                href="https://t.me/heangchhengkhoem"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-500 transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3 h-3 text-cyan-500" />
                <span>Contact Us</span>
              </a>
            </li>
            <li>
              <a
                href="https://t.me/heangchhengkhoem"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-500 transition-colors"
              >
                Channel Telegram
              </a>
            </li>
            <li>
              <a
                href="https://tiktok.com/@heangchhengkhoem"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-500 transition-colors"
              >
                TikTok
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com/heangchhengkhoem"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-500 transition-colors"
              >
                Facebook Page
              </a>
            </li>
            <li>
              <a
                href="https://youtube.com/@heangchhengkhoem"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-500 transition-colors"
              >
                Youtube
              </a>
            </li>
            <li>
              <a
                href="https://x.com/heangchhengkhoem"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-500 transition-colors"
              >
                X
              </a>
            </li>
            <li>
              <a href="#home" className="hover:text-amber-500 transition-colors">
                FAQ
              </a>
            </li>
            <li>
              <a href="#home" className="hover:text-amber-500 transition-colors">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#home" className="hover:text-amber-500 transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#home" className="hover:text-amber-500 transition-colors">
                History
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-[var(--card-border)] text-[11px] text-[var(--text-muted)] flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>© 2026 Heang Chhengkhoem. All rights reserved.</span>
        <span>Phnom Penh, Cambodia 🇰🇭</span>
      </div>
    </footer>
  );
}
