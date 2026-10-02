'use client';

import React from 'react';
import DynamicIsland from '@/components/DynamicIsland';
import MobileDock from '@/components/MobileDock';
import HeroUniverse from '@/components/HeroUniverse';
import ServicesShowcase from '@/components/ServicesShowcase';
import FeaturedProjects from '@/components/FeaturedProjects';
import ToolGrid from '@/components/ToolGrid';
import OwnerConnect from '@/components/OwnerConnect';
import TelegramEcosystem from '@/components/TelegramEcosystem';
import ModernFooter from '@/components/ModernFooter';
import SpotlightSearch from '@/components/SpotlightSearch';
import InteractiveToolModal from '@/components/modals/InteractiveToolModal';
import AmbientBackground from '@/components/AmbientBackground';

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-200 selection:bg-amber-500 selection:text-white pb-20 lg:pb-0">
      {/* Ambient Aurora Background */}
      <AmbientBackground />

      {/* Top Specular Accent Bar */}
      <div className="top-cyber-bar" />

      {/* 1. Floating Glass Navbar (Desktop) & Mobile Header */}
      <DynamicIsland />

      {/* 2. Hero Section (Vision OS 27) */}
      <HeroUniverse />

      {/* 3. Services Strip / Marquee */}
      <ServicesShowcase />

      {/* 4. Featured Projects (Progressive Disclosure - 5 Flagship Systems) */}
      <FeaturedProjects />

      {/* 5. Featured Free Tools (8 Default + Category Chips + Progressive Disclosure) */}
      <ToolGrid />

      {/* 6. About / Connect (Short Profile + 6 Compact Channel Links) */}
      <OwnerConnect />

      {/* 7. Telegram Network & Community */}
      <TelegramEcosystem />

      {/* 8. Modern Footer */}
      <ModernFooter />

      {/* Mobile Primary Navigation Dock */}
      <MobileDock />

      {/* Interactive Tool Modal Sandbox */}
      <InteractiveToolModal />

      {/* Global Spotlight Search Overlay (Cmd+K) */}
      <SpotlightSearch />
    </main>
  );
}
