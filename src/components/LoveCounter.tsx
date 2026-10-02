import React, { useState, useEffect } from 'react';
import { Heart, Clock, Sparkles } from 'lucide-react';
import { fireHeartConfetti } from '../utils/confetti';
import { romanticAudio } from '../utils/audio';

interface LoveCounterProps {
  anniversaryDate: string; // "YYYY-MM-DD" e.g. "2023-10-03"
  title: string;
  subtitle: string;
}

interface TimePassed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  totalHours: number;
  estimatedHeartbeats: number;
}

export const LoveCounter: React.FC<LoveCounterProps> = ({
  anniversaryDate,
  title,
  subtitle,
}) => {
  const [timePassed, setTimePassed] = useState<TimePassed>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0,
    totalHours: 0,
    estimatedHeartbeats: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(anniversaryDate).getTime();
      const now = Date.now();
      const difference = Math.max(0, now - start);

      const totalSeconds = Math.floor(difference / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      const totalDays = Math.floor(totalHours / 24);

      const days = totalDays;
      const hours = totalHours % 24;
      const minutes = totalMinutes % 60;
      const seconds = totalSeconds % 60;

      // Approximate heartbeats: ~75 beats per minute
      const estimatedHeartbeats = totalMinutes * 75;

      setTimePassed({
        days,
        hours,
        minutes,
        seconds,
        totalDays,
        totalHours,
        estimatedHeartbeats,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [anniversaryDate]);

  const handleCelebrate = () => {
    romanticAudio.playChime();
    fireHeartConfetti();
  };

  return (
    <section id="counter" className="py-12 sm:py-16 px-4 max-w-5xl mx-auto">
      <div className="bg-gradient-to-b from-rose-50/60 via-amber-50/30 to-white border border-rose-100/80 rounded-3xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
        {/* Subtle decorative background watermarks */}
        <div className="absolute top-2 right-4 text-rose-200/40 pointer-events-none select-none">
          <Heart className="w-24 h-24 stroke-1 fill-rose-100/40" />
        </div>

        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs uppercase tracking-widest font-semibold text-rose-500 mb-2 block">
            Every Single Second
          </span>
          <h2 className="font-serif-display text-2xl sm:text-4xl text-stone-900 font-semibold mb-3">
            {title}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-8 max-w-3xl mx-auto">
          {/* Days */}
          <div className="bg-white/95 rounded-2xl p-4 sm:p-6 text-center border border-rose-100 shadow-xs hover:border-rose-200 transition-colors">
            <span className="font-serif-display text-3xl sm:text-5xl font-bold text-rose-900 tabular-nums block">
              {timePassed.days.toLocaleString()}
            </span>
            <span className="text-xs sm:text-sm font-medium text-stone-500 uppercase tracking-wider mt-1 block">
              Days
            </span>
          </div>

          {/* Hours */}
          <div className="bg-white/95 rounded-2xl p-4 sm:p-6 text-center border border-rose-100 shadow-xs hover:border-rose-200 transition-colors">
            <span className="font-serif-display text-3xl sm:text-5xl font-bold text-rose-900 tabular-nums block">
              {String(timePassed.hours).padStart(2, '0')}
            </span>
            <span className="text-xs sm:text-sm font-medium text-stone-500 uppercase tracking-wider mt-1 block">
              Hours
            </span>
          </div>

          {/* Minutes */}
          <div className="bg-white/95 rounded-2xl p-4 sm:p-6 text-center border border-rose-100 shadow-xs hover:border-rose-200 transition-colors">
            <span className="font-serif-display text-3xl sm:text-5xl font-bold text-rose-900 tabular-nums block">
              {String(timePassed.minutes).padStart(2, '0')}
            </span>
            <span className="text-xs sm:text-sm font-medium text-stone-500 uppercase tracking-wider mt-1 block">
              Minutes
            </span>
          </div>

          {/* Seconds */}
          <div className="bg-white/95 rounded-2xl p-4 sm:p-6 text-center border border-rose-100 shadow-xs hover:border-rose-200 transition-colors">
            <span className="font-serif-display text-3xl sm:text-5xl font-bold text-rose-600 tabular-nums block animate-pulse">
              {String(timePassed.seconds).padStart(2, '0')}
            </span>
            <span className="text-xs sm:text-sm font-medium text-stone-500 uppercase tracking-wider mt-1 block">
              Seconds
            </span>
          </div>
        </div>

        {/* Romantic Quantitative Proof Points & Adjacency */}
        <div className="pt-6 border-t border-rose-100/80 flex flex-wrap items-center justify-around gap-4 text-xs sm:text-sm text-stone-600">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0" />
            <span>
              <strong className="text-rose-900 font-semibold tabular-nums">
                ~{(timePassed.estimatedHeartbeats / 1_000_000).toFixed(2)}M+
              </strong>{' '}
              heartbeats for you
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              <strong className="text-stone-900 font-semibold tabular-nums">
                {timePassed.totalHours.toLocaleString()}
              </strong>{' '}
              hours of pure love
            </span>
          </div>

          <button
            type="button"
            onClick={handleCelebrate}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-full font-medium transition-transform active:scale-95 text-xs shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Send Love Sparkles</span>
          </button>
        </div>
      </div>
    </section>
  );
};
