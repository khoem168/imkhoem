'use client';

import React from 'react';
import { usePortal } from '@/context/ThemeLanguageContext';
import { ToolItem } from '@/types';
import { 
  Download, 
  Volume2, 
  Lightbulb, 
  Sparkles, 
  CheckSquare, 
  FileText, 
  Layers, 
  Music, 
  Compass, 
  Smile, 
  Eraser, 
  MessageSquareHeart, 
  Coins, 
  HelpCircle, 
  QrCode, 
  Gamepad2, 
  Dices, 
  Zap,
  Brain,
  Award,
  Languages,
  Monitor,
  Keyboard,
  BatteryCharging,
  Server,
  Terminal,
  Cpu
} from 'lucide-react';

interface ToolCardProps {
  tool: ToolItem;
  onOpen: (tool: ToolItem) => void;
}

export default function ToolCard({ tool, onOpen }: ToolCardProps) {
  const { language } = usePortal();

  // Clean, Elegant Apple VisionOS Squircle App Icons
  const renderAppIcon = (id: string) => {
    const iconClass = "w-6 h-6 text-white drop-shadow-sm";

    switch (id) {
      // QR Code
      case 'qr-scan-make':
        return (
          <div className="icon-3d-tile w-12 h-12 bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-md">
            <QrCode className={iconClass} />
          </div>
        );

      // Currency
      case 'exchange-rate':
      case 'money-calculator':
        return (
          <div className="icon-3d-tile w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md">
            <Coins className={iconClass} />
          </div>
        );

      // AI Chat
      case 'ai-chat':
        return (
          <div className="icon-3d-tile w-12 h-12 bg-gradient-to-br from-purple-500 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-md">
            <Sparkles className={iconClass} />
          </div>
        );

      // Text Style
      case 'text-style-generator':
        return (
          <div className="icon-3d-tile w-12 h-12 bg-gradient-to-br from-slate-900 to-stone-800 flex items-center justify-center shadow-md border border-amber-400/30">
            <span className="text-amber-400 font-black text-xl font-serif">T</span>
          </div>
        );

      // Random Picker
      case 'random-picker':
        return (
          <div className="icon-3d-tile w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-md">
            <Dices className={iconClass} />
          </div>
        );

      // Game ID
      case 'game-id-checker':
        return (
          <div className="icon-3d-tile w-12 h-12 bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center shadow-md">
            <Gamepad2 className={iconClass} />
          </div>
        );

      // Roblox
      case 'my-roblox':
        return (
          <div className="icon-3d-tile w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center shadow-md border border-blue-400/30">
            <span className="text-white font-black text-base font-mono">R</span>
          </div>
        );

      // Text to Voice
      case 'text-to-voice':
        return (
          <div className="icon-3d-tile w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
            <Volume2 className={iconClass} />
          </div>
        );

      // AI Math
      case 'ai-math':
        return (
          <div className="icon-3d-tile w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md">
            <Lightbulb className={iconClass} />
          </div>
        );

      // AI Exam
      case 'ai-exam':
        return (
          <div className="icon-3d-tile w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-md">
            <CheckSquare className={iconClass} />
          </div>
        );

      // Image Enhancer
      case 'image-enhancer':
        return (
          <div className="icon-3d-tile w-12 h-12 bg-gradient-to-br from-fuchsia-500 to-pink-600 flex items-center justify-center shadow-md">
            <Sparkles className={iconClass} />
          </div>
        );

      // Image to Text OCR
      case 'image-to-text':
        return (
          <div className="icon-3d-tile w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-md">
            <FileText className={iconClass} />
          </div>
        );

      // Photo to PDF
      case 'photo-to-pdf':
        return (
          <div className="icon-3d-tile w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-700 flex items-center justify-center shadow-md">
            <Layers className={iconClass} />
          </div>
        );

      // Audio Editor
      case 'audio-editor':
        return (
          <div className="icon-3d-tile w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-800 flex items-center justify-center shadow-md">
            <Music className={iconClass} />
          </div>
        );

      // Zodiac
      case 'zodiac-sign':
        return (
          <div className="icon-3d-tile w-12 h-12 bg-gradient-to-br from-indigo-700 to-purple-900 flex items-center justify-center shadow-md">
            <Compass className={iconClass} />
          </div>
        );

      // MBTI
      case 'mbti-personality':
        return (
          <div className="icon-3d-tile w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-md">
            <Brain className={iconClass} />
          </div>
        );

      // BG Remover
      case 'bg-remover':
        return (
          <div className="icon-3d-tile w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-md">
            <Eraser className={iconClass} />
          </div>
        );

      // Confession Wall
      case 'confession-wall':
        return (
          <div className="icon-3d-tile w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-md">
            <MessageSquareHeart className={iconClass} />
          </div>
        );

      // Quiz Hub
      case 'quiz-hub':
        return (
          <div className="icon-3d-tile w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-md">
            <Award className={iconClass} />
          </div>
        );

      // Translator
      case 'translator-pro':
        return (
          <div className="icon-3d-tile w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-600 flex items-center justify-center shadow-md">
            <Languages className={iconClass} />
          </div>
        );

      // Link Downloader
      case 'link-download':
        return (
          <div className="icon-3d-tile w-12 h-12 bg-gradient-to-br from-sky-600 to-indigo-700 flex items-center justify-center shadow-md">
            <Download className={iconClass} />
          </div>
        );

      // --- KHOEM.IT HARDWARE & DIAGNOSTIC SUITE ICONS ---
      // 1. KHOEM.IT Suite Hub
      case 'khoemit-suite':
        return (
          <div className="icon-3d-tile w-12 h-12 bg-gradient-to-br from-cyan-950 via-slate-900 to-sky-900 flex items-center justify-center shadow-md border border-cyan-400/40">
            <Terminal className="w-6 h-6 text-cyan-400 drop-shadow-sm" />
          </div>
        );

      // 2. CPU Benchmark
      case 'cpu-benchmark':
        return (
          <div className="icon-3d-tile w-12 h-12 bg-gradient-to-br from-orange-500 via-rose-600 to-red-600 flex items-center justify-center shadow-md">
            <Cpu className={iconClass} />
          </div>
        );

      // 3. GPU Benchmark
      case 'gpu-benchmark':
        return (
          <div className="icon-3d-tile w-12 h-12 bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-md">
            <Zap className={iconClass} />
          </div>
        );

      // 4. RAM Benchmark
      case 'ram-benchmark':
        return (
          <div className="icon-3d-tile w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-md">
            <Layers className={iconClass} />
          </div>
        );

      // 5. Display Tester
      case 'display-tester':
        return (
          <div className="icon-3d-tile w-12 h-12 bg-gradient-to-br from-blue-500 via-indigo-600 to-sky-400 flex items-center justify-center shadow-md">
            <Monitor className={iconClass} />
          </div>
        );

      // 6. Keyboard Tester
      case 'keyboard-tester':
        return (
          <div className="icon-3d-tile w-12 h-12 bg-gradient-to-br from-slate-800 via-indigo-900 to-purple-800 flex items-center justify-center shadow-md border border-purple-400/30">
            <Keyboard className={iconClass} />
          </div>
        );

      // 7. Battery Health
      case 'battery-health':
        return (
          <div className="icon-3d-tile w-12 h-12 bg-gradient-to-br from-emerald-500 to-lime-600 flex items-center justify-center shadow-md">
            <BatteryCharging className={iconClass} />
          </div>
        );

      // 8. Audio Tester
      case 'audio-tester':
        return (
          <div className="icon-3d-tile w-12 h-12 bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 flex items-center justify-center shadow-md">
            <Volume2 className={iconClass} />
          </div>
        );

      // 9. Storage & System Info
      case 'device-storage-info':
        return (
          <div className="icon-3d-tile w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center shadow-md">
            <Server className={iconClass} />
          </div>
        );

      // Fallback
      default:
        return (
          <div className="icon-3d-tile w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md">
            <Zap className={iconClass} />
          </div>
        );
    }
  };

  return (
    <div
      onClick={() => onOpen(tool)}
      className="vision-glass p-3.5 flex flex-col items-center justify-between text-center cursor-pointer group min-h-[140px] select-none hover:border-amber-500/50 transition-all duration-200"
    >
      {/* Clean 3D Squircle Icon with Specular Sheen */}
      <div className="my-auto pt-1">
        {renderAppIcon(tool.id)}
      </div>

      {/* Clean Title & Category Badge */}
      <div className="w-full mt-2">
        <div className="text-[11px] sm:text-xs font-semibold text-[var(--text-primary)] group-hover:text-amber-500 transition-colors line-clamp-2 leading-snug min-h-[2.4em] flex items-center justify-center">
          {tool.name[language]}
        </div>
        <div className="text-[9px] text-[var(--text-muted)] font-mono uppercase tracking-wider mt-1 px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800/80 inline-block border border-[var(--card-border)]">
          {tool.category}
        </div>
      </div>
    </div>
  );
}
