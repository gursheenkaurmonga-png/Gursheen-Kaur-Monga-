import React, { useState } from 'react';
import { TriviaQuestion, WheelOption } from '../../config';
import { TriviaGame } from './TriviaGame';
import { MemoryGame } from './MemoryGame';
import { WheelGame } from './WheelGame';
import { Gamepad2, HelpCircle, Layers, Disc3 } from 'lucide-react';
import { romanticAudio } from '../../utils/audio';

interface CoupleArcadeProps {
  title: string;
  subtitle: string;
  triviaQuestions: TriviaQuestion[];
  wheelOptions: WheelOption[];
  boyfriendName: string;
}

export const CoupleArcade: React.FC<CoupleArcadeProps> = ({
  title,
  subtitle,
  triviaQuestions,
  wheelOptions,
  boyfriendName,
}) => {
  const [activeGame, setActiveGame] = useState<'trivia' | 'memory' | 'wheel'>('trivia');

  const handleTabChange = (tab: 'trivia' | 'memory' | 'wheel') => {
    romanticAudio.playChime();
    setActiveGame(tab);
  };

  return (
    <section id="arcade" className="py-16 sm:py-24 px-4 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs uppercase tracking-widest font-semibold text-rose-500 mb-2 block flex items-center justify-center gap-1.5">
          <Gamepad2 className="w-4 h-4 text-rose-500" />
          <span>Interactive Fun For The Two Of Us</span>
        </span>
        <h2 className="font-serif-display text-3xl sm:text-4xl text-stone-900 font-semibold mb-3">
          {title}
        </h2>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          {subtitle}
        </p>

        {/* Game Selector Segmented Control */}
        <div className="inline-flex p-1.5 bg-stone-100/90 rounded-2xl border border-stone-200/80 mt-6 shadow-xs max-w-full overflow-x-auto">
          <button
            type="button"
            onClick={() => handleTabChange('trivia')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeGame === 'trivia'
                ? 'bg-white text-rose-600 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Couple's Trivia Quiz</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('memory')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeGame === 'memory'
                ? 'bg-white text-rose-600 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Memory Card Match</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('wheel')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeGame === 'wheel'
                ? 'bg-white text-rose-600 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Disc3 className="w-3.5 h-3.5" />
            <span>Date Night Spin Wheel</span>
          </button>
        </div>
      </div>

      {/* Active Game Display */}
      <div className="animate-fadeIn">
        {activeGame === 'trivia' && (
          <TriviaGame
            questions={triviaQuestions}
            boyfriendName={boyfriendName}
          />
        )}

        {activeGame === 'memory' && (
          <MemoryGame
            boyfriendName={boyfriendName}
          />
        )}

        {activeGame === 'wheel' && (
          <WheelGame
            options={wheelOptions}
            boyfriendName={boyfriendName}
          />
        )}
      </div>
    </section>
  );
};
