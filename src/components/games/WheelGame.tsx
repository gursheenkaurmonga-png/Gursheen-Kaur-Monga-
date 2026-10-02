import React, { useState, useRef } from 'react';
import { WheelOption } from '../../config';
import { Sparkles, Heart, RotateCcw, CheckCircle } from 'lucide-react';
import { romanticAudio } from '../../utils/audio';
import { fireHeartConfetti, fireBurstAtElement } from '../../utils/confetti';

interface WheelGameProps {
  options: WheelOption[];
  boyfriendName: string;
}

export const WheelGame: React.FC<WheelGameProps> = ({ options, boyfriendName }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedOutcome, setSelectedOutcome] = useState<WheelOption | null>(null);
  const audioIntervalRef = useRef<number | null>(null);

  const numSlices = options.length;
  const sliceAngle = 360 / numSlices;

  const handleSpin = () => {
    if (isSpinning) return;

    setSelectedOutcome(null);
    setIsSpinning(true);
    romanticAudio.playChime();

    // Random extra spins: between 5 and 9 full rotations (1800 - 3240 deg)
    const extraSpins = Math.floor(Math.random() * 5 + 5) * 360;
    // Pick random target slice
    const targetSliceIndex = Math.floor(Math.random() * numSlices);
    // Align target slice to top pointer (pointer is at 270 deg / top)
    const targetAngle = extraSpins + (360 - targetSliceIndex * sliceAngle - sliceAngle / 2);

    const totalRotation = rotation + targetAngle;
    setRotation(totalRotation);

    // Play ticking sounds during spin
    let tickCount = 0;
    audioIntervalRef.current = window.setInterval(() => {
      romanticAudio.playWheelTick();
      tickCount++;
      if (tickCount > 28) {
        if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      }
    }, 110);

    // Spin duration is 3.5 seconds
    setTimeout(() => {
      setIsSpinning(false);
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      const chosen = options[targetSliceIndex];
      setSelectedOutcome(chosen);
      romanticAudio.playVictoryFanfare();
      fireHeartConfetti();
    }, 3600);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm max-w-2xl mx-auto flex flex-col items-center">
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-widest font-semibold text-rose-500 mb-1 block">
          Spin For Date Nights & Cuddly Dares
        </span>
        <h4 className="font-serif-display text-xl sm:text-2xl text-stone-900 font-bold">
          The Date Night Fortune Wheel
        </h4>
        <p className="text-stone-500 text-xs sm:text-sm mt-1">
          Spin to pick tonight's activity or win a boyfriend privilege!
        </p>
      </div>

      {/* Wheel Graphic Container */}
      <div className="relative w-72 h-72 sm:w-84 sm:h-84 select-none mb-6">
        {/* Top Fixed Needle Pointer */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
          <div className="w-6 h-6 bg-rose-600 rounded-full border-2 border-white shadow-md flex items-center justify-center">
            <Heart className="w-3 h-3 text-white fill-white" />
          </div>
          <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[14px] border-t-rose-600 -mt-1 drop-shadow-xs" />
        </div>

        {/* Outer Wheel Rim */}
        <div className="w-full h-full rounded-full border-4 border-rose-300 p-1.5 shadow-lg bg-white relative">
          <div
            className="w-full h-full rounded-full overflow-hidden relative shadow-inner"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? 'transform 3.5s cubic-bezier(0.12, 0.8, 0.2, 1)' : 'none',
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {options.map((opt, i) => {
                const startAngle = (i * sliceAngle * Math.PI) / 180;
                const endAngle = ((i + 1) * sliceAngle * Math.PI) / 180;

                const x1 = 50 + 50 * Math.cos(startAngle);
                const y1 = 50 + 50 * Math.sin(startAngle);
                const x2 = 50 + 50 * Math.cos(endAngle);
                const y2 = 50 + 50 * Math.sin(endAngle);

                const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;
                const textAngle = i * sliceAngle + sliceAngle / 2;

                return (
                  <g key={opt.id}>
                    <path
                      d={pathData}
                      fill={opt.color}
                      stroke="#ffffff"
                      strokeWidth="0.75"
                    />
                    {/* Text Label on slice */}
                    <text
                      x="78"
                      y="51.5"
                      fill="#ffffff"
                      fontSize="3.2"
                      fontWeight="bold"
                      textAnchor="end"
                      transform={`rotate(${textAngle}, 50, 50)`}
                      className="select-none tracking-tight drop-shadow-2xs"
                    >
                      {opt.text.length > 20 ? opt.text.substring(0, 18) + '…' : opt.text}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Center Golden Heart Hub */}
            <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 border-2 border-white shadow-md flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5 fill-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Spin Button */}
      <button
        type="button"
        disabled={isSpinning}
        onClick={handleSpin}
        className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 shadow-md ${
          isSpinning
            ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
            : 'bg-rose-500 hover:bg-rose-600 active:scale-95 text-white shadow-rose-200 hover:shadow-lg'
        }`}
      >
        {isSpinning ? 'Spinning Love Wheel...' : 'SPIN THE WHEEL 🎡'}
      </button>

      {/* Outcome Reveal Box */}
      {selectedOutcome && !isSpinning && (
        <div className="mt-6 w-full max-w-md bg-gradient-to-r from-rose-50 via-pink-50 to-amber-50 border border-rose-200 rounded-2xl p-5 text-center animate-scaleUp shadow-xs">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold text-rose-600 mb-1">
            <CheckCircle className="w-4 h-4" />
            <span>Tonight's Date Night Outcome</span>
          </div>

          <h5 className="font-serif-display text-xl sm:text-2xl font-bold text-stone-900 mb-2">
            {selectedOutcome.text}
          </h5>

          <p className="text-xs text-stone-600 mb-4">
            Officially awarded to {boyfriendName}! Valid to be redeemed anytime this week.
          </p>

          <button
            type="button"
            onClick={handleSpin}
            className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-800 font-semibold underline underline-offset-2"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Spin Again</span>
          </button>
        </div>
      )}
    </div>
  );
};
