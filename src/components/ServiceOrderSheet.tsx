'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { usePortal } from '@/context/ThemeLanguageContext';
import { 
  X, 
  CheckCircle2, 
  QrCode, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Zap, 
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';

export interface ShowcaseServiceItem {
  id: string;
  title: { en: string; kh: string };
  price: string;
  tag: { en: string; kh: string };
  image: string;
  actionUrl: string;
  isExternal?: boolean;
}

interface ServiceOrderSheetProps {
  item: ShowcaseServiceItem | null;
  onClose: () => void;
}

export default function ServiceOrderSheet({ item, onClose }: ServiceOrderSheetProps) {
  const { language } = usePortal();
  const [step, setStep] = useState<'package' | 'account' | 'payment' | 'success'>('package');
  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const [accountId, setAccountId] = useState('');
  const [serverId, setServerId] = useState('');
  const [copiedTx, setCopiedTx] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!item) return null;

  const packages = [
    { name: 'Starter Pack', diamonds: '86 Diamonds / Units', price: item.price, khr: '2,050 ៛' },
    { name: 'Popular Pack', diamonds: '257 Diamonds / Units', price: '$2.50', khr: '10,250 ៛' },
    { name: 'Pro Gamer Pack', diamonds: '706 Diamonds / Units', price: '$6.90', khr: '28,290 ៛' },
    { name: 'Elite Master Pack', diamonds: '2,195 Diamonds / Units', price: '$19.90', khr: '81,590 ៛' },
  ];

  const currentPack = packages[selectedPackIndex];

  const handleNextFromPackage = () => {
    setStep('account');
    setErrorMsg('');
  };

  const handleNextFromAccount = () => {
    if (!accountId.trim()) {
      setErrorMsg(language === 'kh' ? 'សូមវាយបញ្ចូល Game ID ឬ Telegram Username' : 'Please enter Game ID or Username');
      return;
    }
    setErrorMsg('');
    setStep('payment');
  };

  const handleConfirmPayment = () => {
    setStep('success');
  };

  const handleReset = () => {
    setStep('package');
    setAccountId('');
    setServerId('');
    onClose();
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText('KHQR-TX-98472-KHOEMSTORE-OK');
    setCopiedTx(true);
    setTimeout(() => setCopiedTx(false), 2000);
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-lg rounded-[28px] border border-white/20 dark:border-white/10 bg-[var(--card-solid)] text-[var(--text-primary)] shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Sheet Grabber Handle */}
          <div className="w-12 h-1.5 rounded-full bg-stone-300 dark:bg-stone-700 mx-auto my-2.5 sm:hidden shrink-0" />

          {/* Header */}
          <div className="p-5 border-b border-[var(--card-border)] flex items-center justify-between gap-3 bg-[var(--bg-page)]/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden relative border border-[var(--card-border)] shrink-0 bg-stone-900">
                <Image src={item.image} alt={item.title[language] || item.title.en} fill className="object-cover" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)] truncate max-w-[240px]">
                  {item.title[language] || item.title.en}
                </h3>
                <div className="text-[10px] font-mono text-emerald-500 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{item.tag[language] || item.tag.en}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close"
              className="w-8 h-8 rounded-full border border-[var(--card-border)] bg-[var(--card-solid)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Stepper Indicator */}
          <div className="px-6 pt-4 pb-2 flex items-center justify-between text-xs font-mono text-[var(--text-muted)] border-b border-[var(--card-border)]/50">
            <span className={step === 'package' ? 'text-amber-500 font-bold' : ''}>1. {language === 'kh' ? 'កញ្ចប់' : 'Package'}</span>
            <span>›</span>
            <span className={step === 'account' ? 'text-amber-500 font-bold' : ''}>2. {language === 'kh' ? 'គណនី' : 'Account'}</span>
            <span>›</span>
            <span className={step === 'payment' ? 'text-amber-500 font-bold' : ''}>3. {language === 'kh' ? 'ទូទាត់' : 'Payment'}</span>
            <span>›</span>
            <span className={step === 'success' ? 'text-emerald-500 font-bold' : ''}>4. {language === 'kh' ? 'ជោគជ័យ' : 'Success'}</span>
          </div>

          {/* Body Content by Step */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {/* STEP 1: SELECT PACKAGE */}
            {step === 'package' && (
              <div className="space-y-4">
                <div className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                  {language === 'kh' ? 'ជ្រើសរើសកញ្ចប់ទំនិញ / ពេជ្រ:' : 'Choose Package Tier:'}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {packages.map((pkg, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPackIndex(idx)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        selectedPackIndex === idx
                          ? 'border-amber-500 bg-amber-500/10 shadow-sm'
                          : 'border-[var(--card-border)] bg-[var(--card-solid)] hover:border-amber-500/40'
                      }`}
                    >
                      <div className="text-xs font-bold text-[var(--text-primary)]">{pkg.name}</div>
                      <div className="text-[11px] text-[var(--text-muted)] font-mono">{pkg.diamonds}</div>
                      <div className="text-sm font-black text-amber-500 font-mono mt-1">{pkg.price}</div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleNextFromPackage}
                  className="w-full mt-4 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-transform active:scale-98"
                >
                  <span>{language === 'kh' ? 'បន្តទៅកាន់ព័ត៌មានគណនី' : 'Continue to Account Details'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 2: USER DETAILS */}
            {step === 'account' && (
              <div className="space-y-4">
                <div className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                  {language === 'kh' ? 'បញ្ចូលព័ត៌មានគណនីទទួល:' : 'Enter Target Account ID:'}
                </div>
                <div>
                  <label className="text-xs text-[var(--text-secondary)] font-semibold block mb-1">
                    {language === 'kh' ? 'User ID / Player ID / Username' : 'User ID / Player ID / Telegram Username'}
                  </label>
                  <input
                    type="text"
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                    placeholder="123456789 or @username"
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-amber-500"
                  />
                  <span className="text-[10px] text-[var(--text-muted)] font-mono mt-1 block">
                    {language === 'kh' ? 'ឧទាហរណ៍: 87462819 ឬ @heangchhengkhoem' : 'Example: 87462819 or @username'}
                  </span>
                </div>

                <div>
                  <label className="text-xs text-[var(--text-secondary)] font-semibold block mb-1">
                    {language === 'kh' ? 'Zone / Server ID (បើមាន)' : 'Zone / Server ID (Optional)'}
                  </label>
                  <input
                    type="text"
                    value={serverId}
                    onChange={(e) => setServerId(e.target.value)}
                    placeholder="e.g. 2145"
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-amber-500"
                  />
                </div>

                {errorMsg && (
                  <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-semibold animate-in fade-in">
                    {errorMsg}
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      setStep('package');
                      setErrorMsg('');
                    }}
                    className="py-3 px-4 rounded-2xl border border-[var(--card-border)] text-xs font-bold hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextFromAccount}
                    className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-transform active:scale-98"
                  >
                    <span>{language === 'kh' ? 'ផ្ទៀងផ្ទាត់ & ស្កេនទូទាត់' : 'Review & Pay'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: REVIEW & KHQR PAYMENT */}
            {step === 'payment' && (
              <div className="space-y-4 text-center">
                <div className="p-3 rounded-2xl border border-[var(--card-border)] bg-[var(--bg-page)]/80 text-left text-xs font-mono space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Item:</span>
                    <span className="font-bold">{item.title[language] || item.title.en}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Package:</span>
                    <span className="font-bold">{currentPack.name} ({currentPack.diamonds})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Target ID:</span>
                    <span className="font-bold text-amber-500">{accountId} {serverId ? `(${serverId})` : ''}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-[var(--card-border)] text-sm">
                    <span className="font-bold">Total:</span>
                    <span className="font-black text-rose-500">{currentPack.price} ({currentPack.khr})</span>
                  </div>
                </div>

                {/* KHQR Code Display */}
                <div className="p-4 rounded-2xl border border-red-500/30 bg-red-500/5 max-w-[200px] mx-auto text-center shadow-inner">
                  <div className="text-[10px] font-mono font-bold text-red-500 tracking-wider mb-2 uppercase">
                    Bakong Universal KHQR
                  </div>
                  <div className="w-36 h-36 mx-auto bg-white p-2 rounded-xl shadow-md flex items-center justify-center">
                    <QrCode className="w-full h-full text-black" />
                  </div>
                  <div className="text-[10px] font-mono text-[var(--text-muted)] mt-2">
                    ABA • ACLEDA • Wing • 36+ Banks
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setStep('account')}
                    className="py-3 px-4 rounded-2xl border border-[var(--card-border)] text-xs font-bold hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleConfirmPayment}
                    className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-transform active:scale-98"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{language === 'kh' ? 'ផ្ទៀងផ្ទាត់ទូទាត់រួចរាល់ (Simulate)' : 'Simulate Instant KHQR Scan'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: SUCCESS CONFIRMATION */}
            {step === 'success' && (
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[var(--text-primary)]">
                    {language === 'kh' ? 'ការបញ្ចូលបានជោគជ័យ!' : 'Order Placed Successfully!'}
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    {language === 'kh' 
                      ? 'ទំនិញ ឬ ពេជ្រនឹងចូលទៅកាន់ Game ID របស់អ្នកក្នុងរយៈពេល ៦០ វិនាទី។' 
                      : 'Your units will be delivered to your account within 60 seconds.'}
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)] text-left text-xs font-mono">
                  <div className="text-[10px] text-[var(--text-muted)]">TX Hash:</div>
                  <div className="flex items-center justify-between text-amber-500 font-bold">
                    <span>KHQR-TX-98472-KHOEMSTORE-OK</span>
                    <button onClick={handleCopyHash} className="cursor-pointer text-[var(--text-muted)] hover:text-amber-500">
                      {copiedTx ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full py-3 rounded-2xl bg-[var(--card-solid)] border border-[var(--card-border)] hover:border-amber-500 text-xs font-bold text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  {language === 'kh' ? 'បិទ & ត្រឡប់ទៅមើលសេវាកម្ម' : 'Close & Back to Services'}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
