import React, { useState } from 'react';
import { LoveReason } from '../config';
import { Heart, Sparkles, Shuffle, RefreshCw, Layers, CheckCircle2 } from 'lucide-react';
import { romanticAudio } from '../utils/audio';
import { fireBurstAtElement } from '../utils/confetti';

interface ReasonsJarProps {
  title: string;
  subtitle: string;
  reasons: LoveReason[];
}

export const ReasonsJar: React.FC<ReasonsJarProps> = ({
  title,
  subtitle,
  reasons,
}) => {
  const [selectedReason, setSelectedReason] = useState<LoveReason | null>(reasons[0] || null);
  const [isShaking, setIsShaking] = useState(false);
  const [viewMode, setViewMode] = useState<'jar' | 'grid'>('jar');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'sweet' | 'romantic' | 'funny' | 'cozy'>('all');
  const [openedIds, setOpenedIds] = useState<Set<number>>(new Set([reasons[0]?.id || 1]));

  const filteredReasons = categoryFilter === 'all'
    ? reasons
    : reasons.filter((r) => r.category === categoryFilter);

  const drawRandomReason = (e?: React.MouseEvent) => {
    setIsShaking(true);
    romanticAudio.playPop();

    setTimeout(() => {
      setIsShaking(false);
      // Pick random from current filtered pool
      const pool = filteredReasons.length > 0 ? filteredReasons : reasons;
      const randomIndex = Math.floor(Math.random() * pool.length);
      const chosen = pool[randomIndex];
      setSelectedReason(chosen);
      setOpenedIds((prev) => new Set([...prev, chosen.id]));
      romanticAudio.playChime();
      fireBurstAtElement(e);
    }, 400);
  };

  const handleSelectSpecific = (reason: LoveReason) => {
    romanticAudio.playChime();
    setSelectedReason(reason);
    setOpenedIds((prev) => new Set([...prev, reason.id]));
    setViewMode('jar');
  };

  const getCategoryBadgeClass = (cat: string) => {
    switch (cat) {
      case 'romantic':
        return 'text-rose-600 bg-rose-50 border-rose-200';
      case 'funny':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'cozy':
        return 'text-violet-600 bg-violet-50 border-violet-200';
      case 'sweet':
      default:
        return 'text-pink-600 bg-pink-50 border-pink-200';
    }
  };

  return (
    <section id="jar" className="py-16 sm:py-24 px-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs uppercase tracking-widest font-semibold text-rose-500 mb-2 block">
          Little Digital Love Notes
        </span>
        <h2 className="font-serif-display text-3xl sm:text-4xl text-stone-900 font-semibold mb-3">
          {title}
        </h2>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          {subtitle}
        </p>

        {/* View Toggle & Category Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <div className="inline-flex p-1 bg-stone-100/80 rounded-xl border border-stone-200/60">
            <button
              type="button"
              onClick={() => setViewMode('jar')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                viewMode === 'jar'
                  ? 'bg-white text-rose-600 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Virtual Love Jar
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                viewMode === 'grid'
                  ? 'bg-white text-rose-600 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Browse All ({reasons.length})
            </button>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
          {(['all', 'sweet', 'romantic', 'funny', 'cozy'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-full capitalize font-medium transition-all ${
                categoryFilter === cat
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-rose-300'
              }`}
            >
              {cat === 'all' ? 'All Reasons' : cat}
            </button>
          ))}
        </div>
      </div>

      {viewMode === 'jar' ? (
        /* Virtual Jar & Active Note Display */
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-4xl mx-auto">
          {/* Left: Interactive 3D Jar Graphic (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div
              onClick={drawRandomReason}
              className={`relative cursor-pointer select-none group transition-transform ${
                isShaking ? 'animate-jarShake scale-95' : 'hover:scale-105 active:scale-95'
              }`}
              title="Click the jar to draw a love note!"
            >
              {/* Glass Jar Body */}
              <div className="w-52 h-64 sm:w-60 sm:h-72 bg-gradient-to-b from-white/60 via-rose-50/40 to-amber-50/50 backdrop-blur-md rounded-b-[48px] rounded-t-3xl border-4 border-white/80 shadow-xl relative overflow-hidden flex flex-col items-center justify-between p-4">
                {/* Cork Lid */}
                <div className="w-36 h-7 bg-gradient-to-b from-amber-700 to-amber-800 rounded-t-md border-b-2 border-amber-900 shadow-sm -mt-2 relative">
                  <div className="w-40 h-2 bg-amber-900/40 rounded-full mx-auto -mt-1" />
                </div>

                {/* Pink ribbon wrapped around jar neck */}
                <div className="w-full h-3 bg-rose-400 rounded-full my-1 shadow-xs flex items-center justify-center">
                  <Heart className="w-3.5 h-3.5 text-white fill-white" />
                </div>

                {/* Origami folded paper notes inside jar */}
                <div className="flex-1 w-full flex flex-wrap items-center justify-center gap-1.5 p-2 content-end">
                  {reasons.slice(0, 24).map((r, idx) => {
                    const colors = [
                      'bg-rose-200 border-rose-300 text-rose-800',
                      'bg-amber-200 border-amber-300 text-amber-800',
                      'bg-pink-200 border-pink-300 text-pink-800',
                      'bg-purple-200 border-purple-300 text-purple-800',
                    ];
                    const color = colors[idx % colors.length];
                    const rot = ((idx * 17) % 30) - 15;
                    return (
                      <span
                        key={r.id}
                        style={{ transform: `rotate(${rot}deg)` }}
                        className={`w-7 h-5 rounded-xs border text-[8px] flex items-center justify-center font-bold shadow-xs transition-transform group-hover:scale-110 ${color}`}
                      >
                        ❤
                      </span>
                    );
                  })}
                </div>

                {/* Jar Kraft Paper Label */}
                <div className="w-40 bg-[#FFF5EA] border border-amber-200/80 rounded-xl py-2 px-3 text-center shadow-xs -mb-1">
                  <span className="font-handwritten text-lg text-amber-900 font-bold block leading-tight">
                    Reasons I Love You
                  </span>
                  <span className="text-[10px] text-amber-700/80 uppercase tracking-widest font-semibold">
                    Tap to Pick
                  </span>
                </div>
              </div>
            </div>

            {/* Tap Button Hint */}
            <button
              type="button"
              onClick={drawRandomReason}
              className="mt-6 flex items-center gap-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white rounded-full text-xs font-semibold shadow-sm transition-all"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Pick Another Note</span>
            </button>
            <span className="text-[11px] text-stone-400 mt-2">
              Unlocked {openedIds.size} of {reasons.length} notes
            </span>
          </div>

          {/* Right: Unfolded Digital Love Note Display (7 cols) */}
          <div className="md:col-span-7">
            {selectedReason ? (
              <div className="bg-gradient-to-br from-white via-rose-50/30 to-amber-50/20 rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-md relative min-h-[260px] flex flex-col justify-between">
                {/* Vintage stamp / sticker */}
                <div className="flex items-center justify-between border-b border-rose-100/80 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider font-semibold text-rose-600">
                      Reason #{selectedReason.id}
                    </span>
                    <span aria-hidden="true" className="text-stone-300">·</span>
                    <span
                      className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border capitalize ${getCategoryBadgeClass(
                        selectedReason.category
                      )}`}
                    >
                      {selectedReason.category}
                    </span>
                  </div>
                  <Heart className="w-5 h-5 text-rose-400 fill-rose-300" />
                </div>

                {/* The Note Body */}
                <div className="my-auto py-4">
                  <p className="font-serif-display text-xl sm:text-2xl text-stone-800 leading-relaxed italic">
                    "{selectedReason.note}"
                  </p>
                </div>

                {/* Footer Controls */}
                <div className="pt-4 border-t border-rose-100/80 flex items-center justify-between text-xs text-stone-500">
                  <span className="font-handwritten text-lg text-rose-500 font-semibold">
                    Always & forever yours
                  </span>
                  <button
                    type="button"
                    onClick={(e) => drawRandomReason(e)}
                    className="flex items-center gap-1.5 text-rose-600 hover:text-rose-700 font-semibold"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Next Reason</span>
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        /* Grid Deck View of All Reasons */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReasons.map((reason) => {
            const isOpened = openedIds.has(reason.id);

            return (
              <div
                key={reason.id}
                onClick={() => handleSelectSpecific(reason)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer text-left relative ${
                  isOpened
                    ? 'bg-white border-rose-100 hover:border-rose-300 shadow-xs'
                    : 'bg-rose-50/40 border-dashed border-rose-200 hover:bg-rose-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-rose-600">
                    Reason #{reason.id}
                  </span>
                  {isOpened && (
                    <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Read
                    </span>
                  )}
                </div>
                <p className="text-sm text-stone-800 leading-relaxed font-serif-display line-clamp-3">
                  "{reason.note}"
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px]">
                  <span className="text-stone-400 capitalize">{reason.category}</span>
                  <span className="text-rose-500 font-medium">Open note →</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
