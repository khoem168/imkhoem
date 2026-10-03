'use client';

import React from 'react';

export default function AmbientBackground() {
  return (
    <div className="ambient-bg-canvas" aria-hidden="true">
      {/* Floating Ambient Glowing Light Orbs */}
      <div className="ambient-orb ambient-orb-1" />
      <div className="ambient-orb ambient-orb-2" />
      <div className="ambient-orb ambient-orb-3" />

      {/* Futuristic Geometric Dot Matrix Grid */}
      <div className="ambient-grid-overlay" />

      {/* Subtle Floating 3D Cyber Particle Beacons */}
      <div className="absolute top-[18%] left-[12%] w-1.5 h-1.5 rounded-full bg-amber-400/50 blur-[1px] animate-pulse" />
      <div className="absolute top-[42%] right-[16%] w-2 h-2 rounded-full bg-sky-400/50 blur-[1px] animate-pulse [animation-delay:1.5s]" />
      <div className="absolute top-[68%] left-[22%] w-1.5 h-1.5 rounded-full bg-emerald-400/40 blur-[1px] animate-pulse [animation-delay:3s]" />
      <div className="absolute top-[82%] right-[28%] w-2 h-2 rounded-full bg-purple-400/45 blur-[1px] animate-pulse [animation-delay:2s]" />
    </div>
  );
}
