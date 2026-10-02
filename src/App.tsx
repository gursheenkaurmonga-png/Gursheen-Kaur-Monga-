import React, { useState, useEffect } from 'react';
import { INITIAL_CONFIG, WebsiteConfig } from './config';
import { Navbar } from './components/Navbar';
import { FloatingHearts } from './components/FloatingHearts';
import { Hero } from './components/Hero';
import { LoveCounter } from './components/LoveCounter';
import { Timeline } from './components/Timeline';
import { ReasonsJar } from './components/ReasonsJar';
import { MemoryLane } from './components/MemoryLane';
import { CoupleArcade } from './components/games/CoupleArcade';
import { LoveLetter } from './components/LoveLetter';
import { CouponsSection } from './components/CouponsSection';
import { CustomizeModal } from './components/CustomizeModal';
import { Footer } from './components/Footer';
import { AudioToggle } from './components/AudioToggle';
import { romanticAudio } from './utils/audio';

export default function App() {
  const [partnerWelcomeBanner, setPartnerWelcomeBanner] = useState<string | null>(null);

  const [config, setConfig] = useState<WebsiteConfig>(() => {
    // 1. Check if URL has a shared gift payload
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const sharedGift = urlParams.get('gift');
      if (sharedGift) {
        const decodedJson = decodeURIComponent(escape(atob(sharedGift)));
        const parsed = JSON.parse(decodedJson);
        localStorage.setItem('anniversary_website_config', JSON.stringify(parsed));
        return { ...INITIAL_CONFIG, ...parsed };
      }
    } catch {
      // Fallback
    }

    // 2. Check localStorage
    try {
      const saved = localStorage.getItem('anniversary_website_config');
      if (saved) {
        return { ...INITIAL_CONFIG, ...JSON.parse(saved) };
      }
    } catch {
      // LocalStorage fallback
    }
    return INITIAL_CONFIG;
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('gift')) {
      setPartnerWelcomeBanner(`Welcome, ${config.boyfriendName}! Here is a surprise anniversary gift handcrafted with love for you 💖`);
    }
  }, [config.boyfriendName]);

  useEffect(() => {
    romanticAudio.setCustomAudioUrl(config.customSongUrl || null);
  }, [config.customSongUrl]);

  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [floatingHeartsEnabled, setFloatingHeartsEnabled] = useState(
    config.enableFloatingHearts ?? true
  );

  // Scroll to letter section when user clicks "Open Secret Letter" in Hero
  const handleScrollToLetter = () => {
    const el = document.getElementById('letter');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSaveConfig = (newConfig: WebsiteConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('anniversary_website_config', JSON.stringify(newConfig));
    } catch {
      // Ignore storage errors
    }
  };

  const handleResetConfig = () => {
    setConfig(INITIAL_CONFIG);
    try {
      localStorage.removeItem('anniversary_website_config');
    } catch {
      // Ignore
    }
    setIsCustomizeOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#2D2424] relative overflow-x-hidden selection:bg-rose-200 selection:text-rose-900">
      {/* Background Floating Hearts */}
      <FloatingHearts enabled={floatingHeartsEnabled} />

      {/* Top Bar Navigation */}
      <Navbar
        boyfriendName={config.boyfriendName}
        onOpenCustomize={() => setIsCustomizeOpen(true)}
        floatingHeartsEnabled={floatingHeartsEnabled}
        onToggleHearts={() => setFloatingHeartsEnabled(!floatingHeartsEnabled)}
      />

      {/* Partner Welcome Announcement Banner if opened via shared link */}
      {partnerWelcomeBanner && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 text-white text-xs sm:text-sm py-2 px-4 shadow-md flex items-center justify-between animate-fadeIn">
          <div className="max-w-4xl mx-auto flex items-center gap-2 font-medium text-center">
            <span>✨</span>
            <span>{partnerWelcomeBanner}</span>
          </div>
          <button
            type="button"
            onClick={() => setPartnerWelcomeBanner(null)}
            className="text-white/80 hover:text-white font-bold ml-2 text-sm"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main className="relative z-10">
        {/* 1. Hero Section */}
        <Hero
          headline={config.heroHeadline}
          subheadline={config.heroSubheadline}
          anniversaryYears={config.anniversaryYears}
          anniversaryDate={config.anniversaryDate}
          photoUrl={config.heroPhotoUrl}
          onOpenLetter={handleScrollToLetter}
        />

        {/* 2. Live Love Counter */}
        <LoveCounter
          anniversaryDate={config.anniversaryDate}
          title={config.loveCounterTitle}
          subtitle={config.loveCounterSubtitle}
        />

        {/* 3. Our Story / Timeline Section */}
        <Timeline
          title={config.timelineTitle}
          subtitle={config.timelineSubtitle}
          milestones={config.timeline}
          onOpenCustomize={() => setIsCustomizeOpen(true)}
        />

        {/* 4. "Why I Love You" Reasons Jar */}
        <ReasonsJar
          title={config.jarTitle}
          subtitle={config.jarSubtitle}
          reasons={config.reasons}
        />

        {/* 5. Polaroid Memory Lane Gallery */}
        <MemoryLane
          title={config.galleryTitle}
          subtitle={config.gallerySubtitle}
          polaroids={config.polaroids}
        />

        {/* 6. Romantic Games Arcade */}
        <CoupleArcade
          title={config.arcadeTitle}
          subtitle={config.arcadeSubtitle}
          triviaQuestions={config.triviaQuestions}
          wheelOptions={config.wheelOptions}
          boyfriendName={config.boyfriendName}
        />

        {/* 7. Secret Love Letter (Wax Seal) */}
        <LoveLetter
          title={config.letterTitle}
          subtitle={config.letterSubtitle}
          greeting={config.letterGreeting}
          body={config.letterBody}
          closing={config.letterClosing}
          signature={config.letterSignature}
          boyfriendName={config.boyfriendName}
        />

        {/* 7. Boyfriend's Day Love Coupons */}
        <CouponsSection
          title={config.couponsTitle}
          subtitle={config.couponsSubtitle}
          coupons={config.coupons}
          boyfriendName={config.boyfriendName}
        />
      </main>

      {/* Romantic Footer */}
      <Footer
        boyfriendName={config.boyfriendName}
        anniversaryYears={config.anniversaryYears}
      />

      {/* Floating Romantic Audio Player & Toggle */}
      <AudioToggle />

      {/* In-App Live Customizer & Quick Editor Modal */}
      <CustomizeModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
        onResetConfig={handleResetConfig}
      />
    </div>
  );
}
