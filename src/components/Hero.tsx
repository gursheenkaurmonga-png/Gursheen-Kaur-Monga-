import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, ChevronDown, Calendar, ArrowRight, Volume2, Play, Pause } from 'lucide-react';
import { fireHeartConfetti } from '../utils/confetti';
import { romanticAudio } from '../utils/audio';
import { cleanImageUrl } from '../utils/urlHelper';

interface HeroProps {
  headline: string;
  subheadline: string;
  anniversaryYears: number;
  anniversaryDate: string;
  photoUrl: string;
  onOpenLetter: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  headline,
  subheadline,
  anniversaryYears,
  anniversaryDate,
  photoUrl,
  onOpenLetter,
}) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(romanticAudio.getIsPlaying());

  useEffect(() => {
    const unsubscribe = romanticAudio.subscribe((playing) => {
      setIsPlayingMusic(playing);
    });
    return () => unsubscribe();
  }, []);

  const handleHeroClick = () => {
    romanticAudio.playChime();
    fireHeartConfetti();
  };

  const handleToggleMusic = () => {
    romanticAudio.toggleBackgroundMusic();
  };

  // Format date nicely e.g. "October 3, 2023"
  const formattedDate = new Date(anniversaryDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Greeting Prose & Actions (7 cols) */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          {/* Metadata line without pill enclosure */}
          <div className="flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm text-rose-700/80 font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-rose-500" />
              <span>Together since {formattedDate}</span>
            </span>
            <span aria-hidden="true" className="text-rose-300">·</span>
            <span>{anniversaryYears} Golden Years</span>
            <span aria-hidden="true" className="text-rose-300">·</span>
            <span>Forever To Go</span>
          </div>

          <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-stone-900 font-bold tracking-tight leading-[1.15] text-balance">
            {headline}
          </h1>

          <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
            {subheadline}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
            <button
              type="button"
              onClick={handleHeroClick}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-semibold rounded-full shadow-md shadow-rose-200 transition-all text-sm group"
            >
              <Heart className="w-4 h-4 fill-white group-hover:scale-125 transition-transform" />
              <span>Celebrate 3 Years</span>
              <Sparkles className="w-4 h-4" />
            </button>

            {/* Background Music Quick Play/Pause button */}
            <button
              type="button"
              onClick={handleToggleMusic}
              className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-full font-medium text-sm transition-all shadow-xs active:scale-95 border ${
                isPlayingMusic
                  ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                  : 'bg-white text-stone-700 border-stone-200/90 hover:border-rose-300 hover:bg-rose-50/40'
              }`}
              title={isPlayingMusic ? 'Click to pause music' : 'Click to play romantic music'}
            >
              {isPlayingMusic ? (
                <>
                  <Pause className="w-4 h-4 fill-rose-600 text-rose-600" />
                  <span>Pause Music</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-stone-700 text-stone-700" />
                  <span>Play Music ♫</span>
                </>
              )}
            </button>

            <a
              href="#story"
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-white hover:bg-rose-50/60 active:scale-95 text-stone-700 hover:text-rose-900 font-medium rounded-full border border-stone-200/80 hover:border-rose-200 transition-all text-sm shadow-xs"
            >
              <span>Our Timeline</span>
              <ArrowRight className="w-4 h-4 text-stone-400" />
            </a>

            <button
              type="button"
              onClick={onOpenLetter}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-rose-600 hover:text-rose-700 underline underline-offset-4 py-2 px-2"
            >
              <span>Open Secret Letter 💌</span>
            </button>
          </div>
        </div>

        {/* Right Column: Romantic Framed Couple Photo (5 cols) */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md">
            {/* Soft decorative backdrop glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-rose-200/50 via-amber-100/40 to-pink-100/60 rounded-3xl blur-2xl -z-10" />

            {/* Framed Image Card with cute washi-tape accent */}
            <div className="bg-white p-3 sm:p-4 rounded-3xl border border-rose-100/80 shadow-xl transition-transform hover:scale-[1.02] duration-300">
              {/* Cute washi tape on top */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 rounded-xs opacity-85 rotate-[-1deg] shadow-xs pointer-events-none"
                style={{ backgroundColor: '#fed7aa' }}
              />

              <div className="overflow-hidden rounded-2xl aspect-[4/3] bg-rose-50 relative group">
                <img
                  src={cleanImageUrl(photoUrl)}
                  alt="Us celebrating our love"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    // Resilient fallback container if needed
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.innerHTML = `
                        <div class="w-full h-full flex flex-col items-center justify-center bg-rose-50 text-rose-400 p-6 text-center">
                          <span class="text-4xl mb-2">💑</span>
                          <span class="font-serif-display font-medium text-rose-800">Preetiii & Me</span>
                          <span class="text-xs text-rose-500 mt-1">3 Years of Endless Love</span>
                        </div>
                      `;
                    }
                  }}
                />
              </div>

              {/* Photo Caption Footer */}
              <div className="pt-3 pb-1 px-2 flex items-center justify-between">
                <div>
                  <p className="font-handwritten text-xl text-stone-800 font-semibold leading-tight">
                    "You will forever be my always."
                  </p>
                  <p className="text-[11px] text-stone-400 font-medium">
                    Oct 3, 2023 · Day 1 to Infinity
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
                  <Heart className="w-4 h-4 fill-rose-400 text-rose-400 animate-pulse-soft" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Down arrow scroll hint */}
      <div className="flex justify-center mt-12 sm:mt-16">
        <a
          href="#counter"
          aria-label="Scroll to timer section"
          className="text-stone-400 hover:text-rose-500 transition-colors animate-bounce p-2"
        >
          <ChevronDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};
