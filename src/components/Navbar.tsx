import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, SlidersHorizontal, Heart, Menu, X } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface NavbarProps {
  boyfriendName: string;
  onOpenCustomize: () => void;
  floatingHeartsEnabled: boolean;
  onToggleHearts: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  boyfriendName,
  onOpenCustomize,
  floatingHeartsEnabled,
  onToggleHearts,
}) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    const unsubscribe = romanticAudio.subscribe((playing) => {
      setIsPlayingMusic(playing);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);

  const handleToggleMusic = () => {
    const newState = romanticAudio.toggleBackgroundMusic();
    setIsPlayingMusic(newState);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FFFDF9]/90 backdrop-blur-md border-b border-rose-100 shadow-xs'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#"
          className="font-serif-display text-xl sm:text-2xl font-semibold tracking-tight text-rose-950 flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span>{boyfriendName} & Me</span>
          <Heart className="w-4 h-4 text-rose-400 fill-rose-300 inline-block animate-pulse-soft" />
        </a>

        {/* Zone 2: Navigation Links (Clean text links, single-line) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-600">
          <a href="#counter" className="hover:text-rose-600 transition-colors">
            Our Time
          </a>
          <a href="#story" className="hover:text-rose-600 transition-colors">
            Our Story
          </a>
          <a href="#jar" className="hover:text-rose-600 transition-colors">
            Reasons Jar
          </a>
          <a href="#memories" className="hover:text-rose-600 transition-colors">
            Polaroids
          </a>
          <a href="#arcade" className="text-rose-600 font-semibold hover:text-rose-700 transition-colors flex items-center gap-1">
            <span>Games</span>
            <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.2 rounded-full font-bold">New</span>
          </a>
          <a href="#letter" className="hover:text-rose-600 transition-colors">
            Love Letter
          </a>
          <a href="#coupons" className="hover:text-rose-600 transition-colors">
            Coupons
          </a>
        </nav>

        {/* Zone 3: Actions (Music toggle + Customize modal trigger) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Music Toggle */}
          <button
            type="button"
            onClick={handleToggleMusic}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-all border ${
              isPlayingMusic
                ? 'bg-rose-50 text-rose-700 border-rose-200 shadow-xs'
                : 'bg-white/80 text-stone-600 border-stone-200 hover:border-rose-200 hover:bg-rose-50/50'
            }`}
            title={isPlayingMusic ? 'Mute soothing melody' : 'Play soothing romantic melody'}
          >
            {isPlayingMusic ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-rose-500 animate-bounce" />
                <span className="hidden sm:inline">Melody On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-stone-400" />
                <span className="hidden sm:inline">Music</span>
              </>
            )}
          </button>

          {/* Floating Hearts toggle */}
          <button
            type="button"
            onClick={onToggleHearts}
            className={`p-2 rounded-full transition-all border ${
              floatingHeartsEnabled
                ? 'bg-rose-50 text-rose-600 border-rose-200'
                : 'bg-white/80 text-stone-400 border-stone-200 hover:text-stone-700'
            }`}
            title={floatingHeartsEnabled ? 'Disable floating hearts' : 'Enable floating hearts'}
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>

          {/* Customize / Edit Button */}
          <button
            type="button"
            onClick={onOpenCustomize}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 active:scale-95 rounded-full transition-all shadow-xs"
            title="Edit texts, dates, photos & customize your gift"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">Edit Gift</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FFFDF9] border-b border-rose-100 px-6 py-4 space-y-3 shadow-md animate-fadeIn">
          <a
            href="#counter"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-medium text-stone-700 hover:text-rose-600"
          >
            Our Time Together
          </a>
          <a
            href="#story"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-medium text-stone-700 hover:text-rose-600"
          >
            Our Story & Milestones
          </a>
          <a
            href="#jar"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-medium text-stone-700 hover:text-rose-600"
          >
            Reasons Jar
          </a>
          <a
            href="#memories"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-medium text-stone-700 hover:text-rose-600"
          >
            Polaroids
          </a>
          <a
            href="#arcade"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-semibold text-rose-600 hover:text-rose-700"
          >
            Love Games Arcade 🎮
          </a>
          <a
            href="#letter"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-medium text-stone-700 hover:text-rose-600"
          >
            Sealed Love Letter
          </a>
          <a
            href="#coupons"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-medium text-stone-700 hover:text-rose-600"
          >
            Boyfriend's Day Coupons
          </a>
        </div>
      )}
    </header>
  );
};
