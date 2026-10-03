'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Cpu, 
  Send, 
  Code2, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Activity,
  Terminal,
  Volume2,
  VolumeX
} from 'lucide-react';
import { usePortal } from '@/context/ThemeLanguageContext';

export default function SpatialProfile3D() {
  const { language } = usePortal();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Mouse tilt motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for ultra-smooth 60fps 3D feel
  const springConfig = { damping: 20, stiffness: 140, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-16, 16]), springConfig);

  // Specular sheen coordinates
  const sheenX = useSpring(useTransform(mouseX, [-0.5, 0.5], [15, 85]), springConfig);
  const sheenY = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, 85]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Play subtle spatial audio tone if unmuted
  const playSpatialTone = () => {
    if (isMuted || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.18); // A5
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      setTimeout(() => {
        try { osc.stop(); ctx.close(); } catch (e) {}
      }, 250);
    } catch (e) {}
  };

  const handleAvatarClick = () => {
    playSpatialTone();
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.45 },
      colors: ['#ff9500', '#0a84ff', '#10b981', '#bf5af2'],
    });
  };

  return (
    <div className="relative w-full max-w-xl mx-auto my-6 px-4 perspective-1200">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative mx-auto w-full max-w-[420px] aspect-[4/3.8] sm:aspect-[4/3.5] rounded-[32px] p-6 flex flex-col items-center justify-between border border-white/80 dark:border-white/15 bg-gradient-to-b from-white/80 via-white/50 to-white/70 dark:from-zinc-900/85 dark:via-zinc-950/70 dark:to-zinc-900/85 backdrop-blur-2xl shadow-[0_20px_50px_rgba(15,23,42,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.7)] transition-shadow duration-300 group cursor-pointer"
        onClick={handleAvatarClick}
      >
        {/* Dynamic Specular Sheen (follows mouse cursor in 3D) */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[32px] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 240px at ${sheenX.get()}% ${sheenY.get()}%, rgba(255, 255, 255, 0.45), transparent 70%)`,
          }}
        />

        {/* Top HUD: Spatial Diagnostic telemetry & sound toggle */}
        <div 
          style={{ transform: 'translateZ(30px)' }}
          className="w-full flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] select-none z-20"
        >
          <div className="flex items-center gap-1.5 bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded-full border border-black/5 dark:border-white/10 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-bold tracking-wider text-emerald-600 dark:text-emerald-400">
              SYS://ONLINE
            </span>
            <span>•</span>
            <span>60 FPS</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-[9px] uppercase tracking-widest text-amber-500 font-bold">
              Spatial 3D Node
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMuted(!isMuted);
              }}
              className="p-1 rounded-full hover:bg-stone-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer text-[var(--text-secondary)]"
              title={isMuted ? 'Unmute Spatial Audio' : 'Mute Spatial Audio'}
              aria-label="Toggle Spatial Audio"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-500" />}
            </button>
          </div>
        </div>

        {/* Center Stage: Concentric 3D Orbital Rings + Holographic Avatar Core */}
        <div 
          style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}
          className="relative my-auto flex items-center justify-center w-48 h-48 sm:w-52 sm:h-52"
        >
          {/* 3D Orbit Ring 1 (Amber / Gold Axis) */}
          <div 
            className="absolute inset-0 rounded-full border-[1.5px] border-amber-500/40 dark:border-amber-400/50 shadow-[0_0_15px_rgba(245,158,11,0.3)] animate-orbit-ring-1 pointer-events-none"
          >
            {/* Satellite Beacon on Ring 1 */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
          </div>

          {/* 3D Orbit Ring 2 (Cyan / Sky Axis) */}
          <div 
            className="absolute inset-1 rounded-full border border-sky-400/35 dark:border-sky-400/45 shadow-[0_0_18px_rgba(14,165,233,0.25)] animate-orbit-ring-2 pointer-events-none"
          >
            {/* Satellite Beacon on Ring 2 */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#0ea5e9]" />
          </div>

          {/* 3D Orbit Ring 3 (Purple / Futuristic Dashed Radar Axis) */}
          <div 
            className="absolute inset-3 rounded-full border border-dashed border-purple-400/30 dark:border-purple-400/40 animate-orbit-ring-3 pointer-events-none"
          />

          {/* Holographic Glowing Ambient Aura behind Avatar */}
          <div className="absolute w-36 h-36 rounded-full bg-gradient-to-tr from-amber-500/25 via-rose-500/20 to-sky-500/25 blur-2xl animate-spatial-pulse pointer-events-none" />

          {/* Core Avatar Squircle Container with 3D Elevation */}
          <div 
            style={{ transform: 'translateZ(55px)', transformStyle: 'preserve-3d' }}
            className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-[28px] overflow-hidden p-1 bg-gradient-to-b from-amber-400 via-rose-500 to-sky-500 shadow-[0_12px_32px_rgba(245,158,11,0.35)] ring-2 ring-white/60 dark:ring-white/20 group-hover:scale-105 transition-transform duration-300"
          >
            {/* Inner avatar frame */}
            <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-zinc-950">
              <Image
                src="/avatar.jpg"
                alt="Heang Chhengkhoem"
                fill
                priority
                sizes="128px"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Holographic Scanline Laser Beam */}
              <div className="pointer-events-none absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent animate-hologram-scan" />

              {/* Lens Specular Reflection */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30 opacity-70" />
            </div>
          </div>

          {/* 4 Floating 3D Technology Satellites in Spatial Z-Depth */}
          {/* Satellite 1: Top-Left (Next.js 16) */}
          <div 
            style={{ transformStyle: 'preserve-3d' }}
            className="absolute -top-3 -left-6 sm:-left-8 animate-satellite-1 z-30"
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-black/10 dark:border-white/15 bg-white/90 dark:bg-zinc-900/90 shadow-md backdrop-blur-xl text-[10px] font-bold text-[var(--text-primary)]">
              <Zap className="w-3 h-3 text-amber-500" />
              <span>Next.js 16</span>
            </div>
          </div>

          {/* Satellite 2: Top-Right (TypeScript) */}
          <div 
            style={{ transformStyle: 'preserve-3d' }}
            className="absolute -top-2 -right-6 sm:-right-8 animate-satellite-2 z-30"
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-black/10 dark:border-white/15 bg-white/90 dark:bg-zinc-900/90 shadow-md backdrop-blur-xl text-[10px] font-bold text-sky-500">
              <Code2 className="w-3 h-3 text-sky-500" />
              <span>TypeScript</span>
            </div>
          </div>

          {/* Satellite 3: Bottom-Left (Khmer AI) */}
          <div 
            style={{ transformStyle: 'preserve-3d' }}
            className="absolute -bottom-2 -left-6 sm:-left-8 animate-satellite-3 z-30"
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-black/10 dark:border-white/15 bg-white/90 dark:bg-zinc-900/90 shadow-md backdrop-blur-xl text-[10px] font-bold text-emerald-500">
              <Sparkles className="w-3 h-3 text-emerald-500" />
              <span>Khmer AI</span>
            </div>
          </div>

          {/* Satellite 4: Bottom-Right (Telegram Bots) */}
          <div 
            style={{ transformStyle: 'preserve-3d' }}
            className="absolute -bottom-3 -right-6 sm:-right-8 animate-satellite-4 z-30"
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-black/10 dark:border-white/15 bg-white/90 dark:bg-zinc-900/90 shadow-md backdrop-blur-xl text-[10px] font-bold text-purple-500">
              <Send className="w-3 h-3 text-purple-500" />
              <span>Telegram Bot</span>
            </div>
          </div>
        </div>

        {/* Bottom HUD: Creator Identity & Spatial Prompt */}
        <div 
          style={{ transform: 'translateZ(35px)' }}
          className="w-full text-center z-20 pt-2"
        >
          <div className="text-sm font-black tracking-tight text-[var(--text-primary)] flex items-center justify-center gap-1.5">
            <span>HEANG CHHENGKHOEM</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-amber-500/10 text-amber-500 border border-amber-500/20">
              v27.0
            </span>
          </div>

          <div className="text-[11px] text-[var(--text-muted)] font-mono flex items-center justify-center gap-1 mt-0.5">
            <span>Full-Stack Platform Architect</span>
            <span>•</span>
            <span className="text-amber-500 font-semibold">Touch / Move to Rotate 3D</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
