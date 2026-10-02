import confetti from 'canvas-confetti';

export function fireHeartConfetti() {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;

  const defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 9999,
    colors: ['#f43f5e', '#fb7185', '#fda4af', '#fecdd3', '#ffe4e6', '#f59e0b', '#fbbf24']
  };

  const interval: number = window.setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 40 * (timeLeft / duration);
    
    // Confetti from two sides
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);
}

export function fireBurstAtElement(event?: React.MouseEvent) {
  let x = 0.5;
  let y = 0.5;
  if (event) {
    x = event.clientX / window.innerWidth;
    y = event.clientY / window.innerHeight;
  }

  confetti({
    particleCount: 50,
    spread: 70,
    origin: { x, y },
    colors: ['#e11d48', '#fb7185', '#f472b6', '#fed7aa', '#fef08a'],
    disableForReducedMotion: true,
  });
}

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
