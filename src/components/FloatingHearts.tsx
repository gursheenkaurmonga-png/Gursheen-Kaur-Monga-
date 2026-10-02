import React, { useMemo } from 'react';

interface HeartItem {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
}

export const FloatingHearts: React.FC<{ enabled?: boolean }> = ({ enabled = true }) => {
  const hearts: HeartItem[] = useMemo(() => {
    const colors = ['#f43f5e', '#fb7185', '#fda4af', '#f472b6', '#e879f9', '#fca5a5'];
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.floor(Math.random() * 96) + 2, // 2% to 98%
      size: Math.floor(Math.random() * 14) + 12, // 12px to 26px
      duration: Math.floor(Math.random() * 12) + 14, // 14s to 26s
      delay: Math.floor(Math.random() * 10),
      opacity: Math.random() * 0.4 + 0.15,
      color: colors[i % colors.length],
    }));
  }, []);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute select-none will-change-transform"
          style={{
            left: `${heart.left}%`,
            bottom: '-40px',
            fontSize: `${heart.size}px`,
            color: heart.color,
            opacity: heart.opacity,
            animation: `floatUpHeart ${heart.duration}s linear infinite`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          ❤
        </span>
      ))}
      <style>{`
        @keyframes floatUpHeart {
          0% {
            transform: translateY(0) scale(0.8) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          50% {
            transform: translateY(-50vh) scale(1.1) rotate(15deg);
            opacity: 0.6;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-105vh) scale(0.9) rotate(-15deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
