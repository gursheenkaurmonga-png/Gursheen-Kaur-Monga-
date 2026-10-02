import React, { useState } from 'react';
import { TimelineMilestone } from '../config';
import { Heart, Sparkles, MapPin, Calendar, ZoomIn, X } from 'lucide-react';
import { romanticAudio } from '../utils/audio';
import { cleanImageUrl } from '../utils/urlHelper';

interface TimelineProps {
  title: string;
  subtitle: string;
  milestones: TimelineMilestone[];
  onOpenCustomize?: () => void;
}

export const Timeline: React.FC<TimelineProps> = ({
  title,
  subtitle,
  milestones,
  onOpenCustomize,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const handleImageClick = (url: string) => {
    romanticAudio.playChime();
    setSelectedPhoto(url);
  };

  return (
    <section id="story" className="py-16 sm:py-24 px-4 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-widest font-semibold text-rose-500 mb-2 block">
          3 Years In The Making
        </span>
        <h2 className="font-serif-display text-3xl sm:text-4xl text-stone-900 font-semibold mb-3">
          {title}
        </h2>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          {subtitle}
        </p>
        {onOpenCustomize && (
          <button
            type="button"
            onClick={onOpenCustomize}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/80 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
          >
            <span>✏️ Edit Chapter Photos & Stories</span>
          </button>
        )}
      </div>

      {/* Vertical Interactive Timeline */}
      <div className="relative">
        {/* Central timeline line */}
        <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-rose-200 via-rose-300 to-rose-100 sm:-translate-x-1/2" />

        <div className="space-y-12 sm:space-y-20">
          {milestones.map((milestone, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={milestone.id}
                className="relative flex flex-col sm:flex-row items-start sm:items-center group"
              >
                {/* Node icon on timeline */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white border-2 border-rose-400 flex items-center justify-center text-rose-500 z-10 shadow-sm group-hover:scale-110 group-hover:border-rose-500 transition-all duration-300">
                  <Heart className="w-4 h-4 fill-rose-100 group-hover:fill-rose-400 group-hover:text-rose-500 transition-colors" />
                </div>

                {/* Content Card Layout (Alternates left/right on desktop) */}
                <div
                  className={`pl-12 sm:pl-0 w-full sm:w-[calc(50%-2rem)] ${
                    isEven ? 'sm:mr-auto sm:text-right' : 'sm:ml-auto sm:text-left'
                  }`}
                >
                  <div className="bg-white rounded-3xl p-5 sm:p-7 border border-rose-100/90 shadow-sm hover:shadow-md transition-all duration-300 group-hover:-translate-y-0.5">
                    {/* Unboxed Metadata Header */}
                    <div
                      className={`flex items-center gap-2 text-xs font-medium text-rose-600 mb-2 ${
                        isEven ? 'sm:justify-end' : 'sm:justify-start'
                      }`}
                    >
                      <span className="font-semibold">{milestone.yearLabel}</span>
                      <span aria-hidden="true" className="text-rose-300">·</span>
                      <span className="text-stone-500">{milestone.date}</span>
                    </div>

                    <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-stone-900 mb-2">
                      {milestone.title}
                    </h3>

                    {/* Milestone Photo Preview */}
                    <div className="my-4 overflow-hidden rounded-2xl relative aspect-[16/10] bg-rose-50 cursor-pointer group/img">
                      <img
                        src={cleanImageUrl(milestone.photoUrl)}
                        alt={milestone.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                        onClick={() => handleImageClick(cleanImageUrl(milestone.photoUrl))}
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = 'none';
                        }}
                      />
                      <div
                        onClick={() => handleImageClick(milestone.photoUrl)}
                        className="absolute inset-0 bg-stone-900/15 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white gap-1.5 text-xs font-medium"
                      >
                        <ZoomIn className="w-4 h-4" />
                        <span>Enlarge Memory</span>
                      </div>
                    </div>

                    <p className="text-stone-600 text-sm leading-relaxed mb-4">
                      {milestone.description}
                    </p>

                    {/* Clean unboxed tag */}
                    <div
                      className={`text-xs text-stone-400 font-medium flex items-center gap-1.5 ${
                        isEven ? 'sm:justify-end' : 'sm:justify-start'
                      }`}
                    >
                      <Sparkles className="w-3 h-3 text-rose-400" />
                      <span>{milestone.tag}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Future Milestone Card */}
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center">
            <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-rose-500 border-2 border-white flex items-center justify-center text-white z-10 shadow-sm animate-pulse-soft">
              <Sparkles className="w-4 h-4" />
            </div>

            <div className="pl-12 sm:pl-0 w-full sm:w-[calc(50%-2rem)] sm:mx-auto">
              <div className="bg-gradient-to-r from-rose-50 via-amber-50 to-pink-50 rounded-3xl p-6 border border-rose-200 text-center shadow-xs">
                <span className="text-xs uppercase tracking-widest font-semibold text-rose-600 block mb-1">
                  Tomorrow & Forever
                </span>
                <h4 className="font-serif-display text-xl font-bold text-stone-900 mb-2">
                  To Year 4 & A Lifetime Together
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                  Every page we turn gets sweeter. Thank you for the best 3 years of my life, Preetiii. The best chapters are yet to come!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Photo Zoom */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-3xl max-h-[85vh] bg-white rounded-3xl p-3 sm:p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white flex items-center justify-center transition-colors"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedPhoto}
              alt="Milestone memory"
              className="w-full max-h-[75vh] object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};
