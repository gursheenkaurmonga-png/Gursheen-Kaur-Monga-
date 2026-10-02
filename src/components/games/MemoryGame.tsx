import React, { useState, useEffect } from 'react';
import { RotateCcw, Trophy, Sparkles, Heart, Coffee, Mail, Camera, Cake, Plane, Flame } from 'lucide-react';
import { romanticAudio } from '../../utils/audio';
import { fireHeartConfetti, fireBurstAtElement } from '../../utils/confetti';

interface MemoryCard {
  id: number;
  pairKey: string;
  label: string;
  iconName: string;
  color: string;
}

const BASE_PAIRS: Omit<MemoryCard, 'id'>[] = [
  { pairKey: 'coffee', label: 'First Date Latte', iconName: 'Coffee', color: 'text-amber-700 bg-amber-50 border-amber-200' },
  { pairKey: 'letter', label: 'Sealed Love Letter', iconName: 'Mail', color: 'text-rose-600 bg-rose-50 border-rose-200' },
  { pairKey: 'camera', label: 'Polaroid Memory', iconName: 'Camera', color: 'text-sky-600 bg-sky-50 border-sky-200' },
  { pairKey: 'cake', label: '3-Year Cake', iconName: 'Cake', color: 'text-pink-600 bg-pink-50 border-pink-200' },
  { pairKey: 'plane', label: 'Sunset Getaway', iconName: 'Plane', color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
  { pairKey: 'heart', label: 'Forever Love', iconName: 'Heart', color: 'text-red-600 bg-red-50 border-red-200' },
];

export const MemoryGame: React.FC<{ boyfriendName: string }> = ({ boyfriendName }) => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedKeys, setMatchedKeys] = useState<Set<string>>(new Set());
  const [moves, setMoves] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isWon, setIsWon] = useState(false);

  // Initialize and shuffle deck
  const initializeGame = () => {
    const deck: MemoryCard[] = [];
    let idCounter = 1;

    BASE_PAIRS.forEach((item) => {
      // Create pair
      deck.push({ ...item, id: idCounter++ });
      deck.push({ ...item, id: idCounter++ });
    });

    // Fisher-Yates shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    setCards(deck);
    setFlippedIndices([]);
    setMatchedKeys(new Set());
    setMoves(0);
    setIsProcessing(false);
    setIsWon(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (index: number, e: React.MouseEvent) => {
    if (isProcessing) return;
    if (flippedIndices.includes(index)) return;
    if (matchedKeys.has(cards[index].pairKey)) return;
    if (flippedIndices.length >= 2) return;

    romanticAudio.playCardFlip();
    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      setIsProcessing(true);

      const [firstIdx, secondIdx] = newFlipped;
      const firstCard = cards[firstIdx];
      const secondCard = cards[secondIdx];

      if (firstCard.pairKey === secondCard.pairKey) {
        // MATCH!
        setTimeout(() => {
          romanticAudio.playMatchSuccess();
          fireBurstAtElement(e);
          const nextMatched = new Set(matchedKeys).add(firstCard.pairKey);
          setMatchedKeys(nextMatched);
          setFlippedIndices([]);
          setIsProcessing(false);

          if (nextMatched.size === BASE_PAIRS.length) {
            // GAME WON!
            setTimeout(() => {
              setIsWon(true);
              romanticAudio.playVictoryFanfare();
              fireHeartConfetti();
            }, 300);
          }
        }, 350);
      } else {
        // NO MATCH, FLIP BACK
        setTimeout(() => {
          setFlippedIndices([]);
          setIsProcessing(false);
        }, 900);
      }
    }
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Coffee':
        return <Coffee className="w-6 h-6" />;
      case 'Mail':
        return <Mail className="w-6 h-6" />;
      case 'Camera':
        return <Camera className="w-6 h-6" />;
      case 'Cake':
        return <Cake className="w-6 h-6" />;
      case 'Plane':
        return <Plane className="w-6 h-6" />;
      case 'Heart':
      default:
        return <Heart className="w-6 h-6 fill-current" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm max-w-2xl mx-auto">
      {/* Top HUD */}
      <div className="flex items-center justify-between border-b border-rose-100 pb-3 mb-6 text-xs text-stone-500 font-medium">
        <div className="flex items-center gap-3">
          <span>
            Moves: <strong className="text-stone-900 font-bold tabular-nums">{moves}</strong>
          </span>
          <span>·</span>
          <span>
            Matched: <strong className="text-rose-600 font-bold tabular-nums">{matchedKeys.size}</strong> / {BASE_PAIRS.length}
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            romanticAudio.playChime();
            initializeGame();
          }}
          className="flex items-center gap-1 text-stone-500 hover:text-rose-600 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Cards</span>
        </button>
      </div>

      {!isWon ? (
        /* Card Grid: 3x4 on mobile, 4x3 on desktop */
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
          {cards.map((card, index) => {
            const isFlipped = flippedIndices.includes(index) || matchedKeys.has(card.pairKey);
            const isMatched = matchedKeys.has(card.pairKey);

            return (
              <button
                key={card.id}
                type="button"
                onClick={(e) => handleCardClick(index, e)}
                disabled={isMatched || isProcessing}
                className={`aspect-square rounded-2xl border transition-all duration-300 relative flex flex-col items-center justify-center p-2 cursor-pointer select-none group ${
                  isFlipped
                    ? `${card.color} shadow-xs scale-100`
                    : 'bg-gradient-to-tr from-rose-50 to-pink-50 border-rose-200 hover:border-rose-400 hover:scale-105 shadow-2xs'
                }`}
                title={isFlipped ? card.label : 'Click to flip'}
              >
                {isFlipped ? (
                  <div className="flex flex-col items-center justify-center gap-1.5 animate-fadeIn">
                    {renderIcon(card.iconName)}
                    <span className="text-[10px] font-semibold tracking-tight text-center leading-tight">
                      {card.label}
                    </span>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-rose-300/80 group-hover:scale-110 group-hover:text-rose-400 transition-all fill-rose-100" />
                  </div>
                )}

                {isMatched && (
                  <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500" />
                )}
              </button>
            );
          })}
        </div>
      ) : (
        /* Victory Screen */
        <div className="text-center py-6 sm:py-8 space-y-5 animate-scaleUp">
          <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-sm animate-bounce">
            <Trophy className="w-8 h-8" />
          </div>

          <h3 className="font-serif-display text-2xl sm:text-3xl text-stone-900 font-bold">
            All Pairs Matched!
          </h3>

          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
            You matched all our memories in <strong>{moves} moves</strong>, {boyfriendName}!
          </p>

          <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100 text-xs sm:text-sm text-rose-900 font-medium max-w-sm mx-auto">
            🎉 Secret Reward Unlocked: <strong>10,000 Extra Kisses</strong> to be claimed tonight with no expiration date!
          </div>

          <div className="pt-2 flex justify-center">
            <button
              type="button"
              onClick={initializeGame}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-full text-xs font-semibold transition-all shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Shuffle & Play Again</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
