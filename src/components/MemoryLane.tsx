import React, { useState } from 'react';
import { PolaroidPhoto } from '../config';
import { Heart, Sparkles, ZoomIn, X, Camera } from 'lucide-react';
import { romanticAudio } from '../utils/audio';
import { cleanImageUrl } from '../utils/urlHelper';

interface MemoryLaneProps {
  title: string;
  subtitle: string;
  polaroids: PolaroidPhoto[];
}

export const MemoryLane: React.FC<MemoryLaneProps> = ({
  title,
  subtitle,
  polaroids,
}) => {
  const [activePhoto, setActivePhoto] = useState<PolaroidPhoto | null>(null);

  const handlePolaroidClick = (photo: PolaroidPhoto) => {
    romanticAudio.playChime();
    setActivePhoto(photo);
  };

  return (
    <section id="memories" className="py-16 sm:py-24 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-widest font-semibold text-rose-500 mb-2 block flex items-center justify-center gap-1.5">
          <Camera className="w-3.5 h-3.5 text-rose-500" />
          <span>Snapshots Through The Years</span>
        </span>
        <h2 className="font-serif-display text-3xl sm:text-4xl text-stone-900 font-semibold mb-3">
          {title}
        </h2>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Polaroid Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-8">
        {polaroids.map((item) => (
          <div
            key={item.id}
            onClick={() => handlePolaroidClick(item)}
            style={{
              transform: `rotate(${item.rotateDeg}deg)`,
            }}
            className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:z-20 hover:rotate-0"
          >
            {/* Polaroid Paper Frame */}
            <div className="bg-white p-3.5 pb-6 rounded-md polaroid-shadow border border-stone-200/80 relative flex flex-col items-center">
              {/* Decorative Washi Tape on top */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 rounded-2xs opacity-80 rotate-[-2deg] shadow-2xs pointer-events-none"
                style={{ backgroundColor: item.tapeColor || '#fbcfe8' }}
              />

              {/* Square Image container */}
              <div className="w-full aspect-square overflow-hidden bg-rose-50 rounded-2xs relative">
                <img
                  src={cleanImageUrl(item.photoUrl)}
                  alt={item.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.innerHTML = `
                        <div class="w-full h-full flex flex-col items-center justify-center bg-rose-50 text-rose-400 p-4 text-center">
                          <span class="text-3xl mb-1">📸</span>
                          <span class="text-xs font-semibold text-rose-800">Preetiii & Me</span>
                        </div>
                      `;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs gap-1 font-medium">
                  <ZoomIn className="w-4 h-4" />
                  <span>View</span>
                </div>
              </div>

              {/* Handwritten Caption */}
              <div className="w-full pt-4 px-1 text-center">
                <p className="font-handwritten text-xl sm:text-2xl text-stone-800 font-semibold leading-tight line-clamp-2">
                  {item.caption}
                </p>
                <span className="text-[11px] text-stone-400 font-mono mt-1 block">
                  {item.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Polaroid Lightbox View */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="bg-white p-4 sm:p-6 pb-8 rounded-lg max-w-lg w-full polaroid-shadow relative animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center shadow-md hover:bg-stone-700 transition-colors"
              aria-label="Close photo"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Washi tape */}
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 rounded-2xs opacity-90 rotate-[-1deg] shadow-xs pointer-events-none"
              style={{ backgroundColor: activePhoto.tapeColor || '#fbcfe8' }}
            />

            {/* Image */}
            <div className="w-full aspect-square overflow-hidden bg-rose-50 rounded-2xs mb-5">
              <img
                src={cleanImageUrl(activePhoto.photoUrl)}
                alt={activePhoto.caption}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Caption */}
            <div className="text-center px-4">
              <p className="font-handwritten text-2xl sm:text-3xl text-stone-800 font-bold leading-relaxed mb-2">
                "{activePhoto.caption}"
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-stone-400 font-mono">
                <span>{activePhoto.date}</span>
                <span>·</span>
                <span className="flex items-center gap-1 text-rose-500">
                  <Heart className="w-3 h-3 fill-rose-500" />
                  Our Memory
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
