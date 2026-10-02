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
    </div>
  );
}
