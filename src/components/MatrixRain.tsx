import { useEffect, useRef, useState } from 'react';

interface Drop {
  y: number;
  speed: number;
  chars: string[];
  brightness: number;
  isBackground: boolean;
}

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const dropsRef = useRef<Drop[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const chars = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ01';
    const fontSize = 16;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDrops();
    };

    const initDrops = () => {
      // Reduced density: 70% of max columns
      const cols = Math.floor((canvas.width / fontSize) * 0.7);
      dropsRef.current = Array.from({ length: cols }, () => {
        const isBackground = Math.random() < 0.45;
        return {
          y: Math.random() * canvas.height * 2 - canvas.height,
          speed: isBackground ? Math.random() * 0.3 + 0.15 : Math.random() * 0.5 + 0.4,
          chars: Array.from({ length: Math.floor(canvas.height / fontSize) + 15 }, () =>
            chars[Math.floor(Math.random() * chars.length)]
          ),
          brightness: isBackground ? Math.random() * 0.25 + 0.1 : Math.random() * 0.4 + 0.35,
          isBackground,
        };
      });
    };

    resize();

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
      ctx.textAlign = 'center';

      for (let x = 0; x < dropsRef.current.length; x++) {
        const drop = dropsRef.current[x];
        drop.y += drop.speed;

        // Reset when off screen
        if (drop.y > canvas.height && Math.random() > 0.975) {
          drop.y = -drop.chars.length * fontSize - Math.random() * 300;
          drop.speed = drop.isBackground ? Math.random() * 0.3 + 0.15 : Math.random() * 0.5 + 0.4;
        }

        const len = drop.chars.length;
        for (let i = 0; i < len; i++) {
          const py = drop.y + i * fontSize;
          if (py < -fontSize || py > canvas.height + fontSize) continue;

          const fade = (1 - (i / len) * 0.85) * drop.brightness;

          if (i >= len - 2) {
            // Leading character: bright white-green
            ctx.fillStyle = `rgba(200, 255, 200, ${Math.min(fade * 1.5, 0.9)})`;
          } else {
            ctx.fillStyle = `rgba(0, 200, 0, ${fade * 0.7})`;
          }

          // Occasional character mutation
          if (Math.random() < 0.002) {
            drop.chars[i] = chars[Math.floor(Math.random() * chars.length)];
          }

          ctx.fillText(drop.chars[i], x * (fontSize / 0.7) + fontSize / 2, py);
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 transition-opacity duration-1000 dark:opacity-30 opacity-[0.05] max-sm:dark:opacity-20 max-sm:opacity-[0.03]"
    />
  );
}
