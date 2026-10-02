import React, { useState } from 'react';
import { Heart, Mail, Sparkles, Lock, Unlock, Stamp } from 'lucide-react';
import { romanticAudio } from '../utils/audio';
import { fireHeartConfetti } from '../utils/confetti';

interface LoveLetterProps {
  title: string;
  subtitle: string;
  greeting: string;
  body: string[];
  closing: string;
  signature: string;
  boyfriendName: string;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({
  title,
  subtitle,
  greeting,
  body,
  closing,
  signature,
  boyfriendName,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    if (!isOpen) {
      romanticAudio.playSealBreak();
      fireHeartConfetti();
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <section id="letter" className="py-16 sm:py-24 px-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-widest font-semibold text-rose-500 mb-2 block flex items-center justify-center gap-1.5">
          <Mail className="w-3.5 h-3.5 text-rose-500" />
          <span>Strictly Confidential · For His Eyes Only</span>
        </span>
        <h2 className="font-serif-display text-3xl sm:text-4xl text-stone-900 font-semibold mb-3">
          {title}
        </h2>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Interactive Envelope Container */}
      <div className="flex flex-col items-center">
        {!isOpen ? (
          /* Sealed Envelope Graphic */
          <div
            onClick={handleOpenLetter}
            className="w-full max-w-lg cursor-pointer group select-none transition-transform duration-300 hover:scale-[1.02] active:scale-95"
            title="Click to break the wax seal and open letter"
          >
            <div className="bg-[#FFF4EB] border-2 border-[#E8D5C4] rounded-3xl p-8 sm:p-12 envelope-shadow relative overflow-hidden flex flex-col items-center text-center">
              {/* Envelope Flap Lines */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#FDE8D7] to-transparent pointer-events-none opacity-50" />
              
              <div className="w-full flex items-center justify-between text-xs text-stone-400 font-mono mb-8">
                <span>AIR MAIL · SPECIAL DELIVERY</span>
                <span className="flex items-center gap-1 text-rose-600 font-bold">
                  <Heart className="w-3.5 h-3.5 fill-rose-500" />
                  PRIORITY LOVE
                </span>
              </div>

              {/* Recipient Address */}
              <div className="my-6">
                <span className="text-xs text-stone-400 uppercase tracking-widest block mb-1">
                  Delivered with all my heart to:
                </span>
                <h3 className="font-handwritten text-4xl sm:text-5xl text-stone-800 font-bold">
                  {boyfriendName}
                </h3>
                <p className="text-xs text-stone-500 font-mono mt-1">
                  My Favorite Boy In The World
                </p>
              </div>

              {/* 3D Wax Seal with Heart */}
              <div className="relative my-4 group-hover:scale-110 transition-transform duration-300">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-rose-500 border-4 border-rose-800/80 shadow-lg flex items-center justify-center text-white relative">
                  <div className="w-14 h-14 rounded-full border-2 border-rose-300/40 flex items-center justify-center">
                    <Heart className="w-7 h-7 fill-white drop-shadow-xs" />
                  </div>
                  {/* Seal gloss glare */}
                  <div className="absolute top-2 left-4 w-4 h-4 bg-white/30 rounded-full blur-2xs" />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-rose-600 font-semibold text-xs animate-pulse">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tap the wax seal to break & read</span>
              </div>
            </div>
          </div>
        ) : (
          /* Unfolded Parchment Letter */
          <div className="w-full max-w-2xl bg-[#FFFDF9] border border-stone-200/90 rounded-3xl p-6 sm:p-12 shadow-xl relative animate-fadeIn">
            {/* Stamp in upper corner */}
            <div className="absolute top-6 right-6 border-2 border-dashed border-rose-300/80 rounded-lg p-2 flex flex-col items-center rotate-3 bg-rose-50/50">
              <Stamp className="w-4 h-4 text-rose-500 mb-0.5" />
              <span className="text-[9px] font-mono uppercase text-rose-700 font-bold">
                OCT 03 · 3 YRS
              </span>
            </div>

            {/* Greeting */}
            <div className="mb-6 pt-2">
              <h3 className="font-handwritten text-3xl sm:text-4xl text-rose-950 font-bold mb-1">
                {greeting}
              </h3>
              <div className="w-16 h-0.5 bg-rose-300 rounded-full" />
            </div>

            {/* Letter Paragraphs */}
            <div className="space-y-4 text-stone-700 leading-relaxed font-serif-display text-base sm:text-lg">
              {body.map((para, index) => (
                <p key={index} className="indent-4 sm:indent-6">
                  {para}
                </p>
              ))}
            </div>

            {/* Closing & Signature */}
            <div className="mt-8 pt-6 border-t border-rose-100 flex flex-col items-end">
              <p className="text-sm text-stone-500 font-medium mb-1">
                {closing}
              </p>
              <p className="font-handwritten text-3xl sm:text-4xl text-rose-600 font-bold">
                {signature}
              </p>
            </div>

            {/* Close/Reseal button */}
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={handleOpenLetter}
                className="px-5 py-2 text-xs font-semibold text-stone-500 hover:text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors"
              >
                Close & Reseal Envelope
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
