import React from 'react';
import { Heart, Sparkles, ArrowUp } from 'lucide-react';
import { romanticAudio } from '../utils/audio';
import { fireHeartConfetti } from '../utils/confetti';

interface FooterProps {
  boyfriendName: string;
  anniversaryYears: number;
}

export const Footer: React.FC<FooterProps> = ({
  boyfriendName,
  anniversaryYears,
}) => {
  const scrollToTop = () => {
    romanticAudio.playChime();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCelebrate = () => {
    romanticAudio.playChime();
    fireHeartConfetti();
  };

  return (
    <footer className="pt-16 pb-12 px-4 border-t border-rose-100 bg-[#FFFDF9] relative">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <button
          type="button"
          onClick={handleCelebrate}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-200 shadow-2xs transition-all active:scale-95 group"
        >
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500 group-hover:scale-125 transition-transform" />
          <span>I Love You Preetiii, Happy 3 Years!</span>
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
        </button>

        <p className="font-serif-display text-xl sm:text-2xl text-stone-800 italic">
          "Whatever our souls are made of, yours and mine are the same."
        </p>

        <div className="flex items-center justify-center gap-2 text-xs text-stone-500">
          <span>Celebrating {anniversaryYears} Years of Pure Love</span>
          <span aria-hidden="true" className="text-rose-300">·</span>
          <span>Happy Boyfriend's Day, {boyfriendName}</span>
        </div>

        <div className="pt-4 flex justify-center">
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-700 transition-colors p-2"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
