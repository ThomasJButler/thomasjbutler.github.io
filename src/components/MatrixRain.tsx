/**
 * @author Tom Butler
 * @date 2025-10-28
 * @description Canvas-based Matrix rain animation with performance optimisation,
 *              interactive mouse effects, and layered character streams
 */

import React, { useEffect, useRef } from 'react';

interface MatrixRainProps {
  theme?: 'matrix';
}

/**
 * Matrix-style falling character animation with authentic visual effects
 * @param {Object} props
 * @param {string} [props.theme='matrix'] - Theme identifier
 * @return {JSX.Element | null}
 * @constructor
 */
export const MatrixRain: React.FC<MatrixRainProps> = ({ theme = 'matrix' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const dropsRef = useRef<Array<{
    y: number;
    speed: number;
    chars: string[];
    color?: string;
    brightness?: number;
    glitchRate?: number;
    layer?: 'foreground' | 'background';
    isGlitch?: boolean;
  }>>([]);
  const [isVisible, setIsVisible] = React.useState(false);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  /**
   * @constructs Delays animation start by 2 seconds for page load performance
   *             Initialises mouse tracking for interactive effects
   */
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(delayTimer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  /**
   * @listens isVisible - Initialises canvas animation when visibility toggles
   *          Implements performance optimisations for mobile devices
   */
  useEffect(() => {
    if (!isVisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();

    const matrixChars = '101010101ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ010010101';
    const binaryChars = '01';
    const fontSize = 18;

    // 40% fewer columns on mobile devices for performance
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const performanceMultiplier = isMobile ? 0.6 : 1;
    const columns = Math.floor((canvas.width / fontSize) * performanceMultiplier) + 1;

    dropsRef.current = Array(columns).fill(null).map(() => {
      const isBackground = Math.random() < 0.4;
      const isBinary = Math.random() < 0.2; // 20% binary streams
      const chars = isBinary ? binaryChars : matrixChars;

      return {
        y: Math.random() * canvas.height - canvas.height,
        speed: isBackground ? Math.random() * 0.3 + 0.2 : Math.random() * 0.6 + 0.6,
        chars: Array(Math.floor(canvas.height / fontSize) + 20).fill(null).map(() =>
          chars[Math.floor(Math.random() * chars.length)]
        ),
        color: Math.random() < 0.01 ? '#FF0000' :
               Math.random() < 0.02 ? '#FFD700' :
               Math.random() < 0.03 ? '#FFEA00' :
               Math.random() < 0.05 ? '#00FFFF' :
               '#00FF00',
        brightness: isBackground ? Math.random() * 0.3 + 0.2 : Math.random() * 0.5 + 0.5,
        glitchRate: Math.random() * 0.02,
        layer: isBackground ? 'background' : 'foreground',
        isGlitch: false
      };
    });

    const animateDrop = (_dropIndex: number) => {
      // Placeholder for compatibility - drops animate in draw loop
    };

    dropsRef.current.forEach((_, index) => animateDrop(index));

    const draw = () => {
      ctx.fillStyle = isMobile ? 'rgba(0, 0, 0, 0.08)' : 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      dropsRef.current.forEach((drop, x) => {
        drop.y += drop.speed;

        if (drop.y > canvas.height && Math.random() > 0.97) {
          const isBackground = drop.layer === 'background';
          const isBinary = Math.random() < 0.2;
          const chars = isBinary ? binaryChars : matrixChars;

          drop.y = -drop.chars.length * fontSize - Math.random() * 200;
          drop.speed = isBackground ? Math.random() * 0.3 + 0.2 : Math.random() * 0.6 + 0.6;
          drop.brightness = isBackground ? Math.random() * 0.3 + 0.2 : Math.random() * 0.5 + 0.5;
          drop.glitchRate = Math.random() * 0.02;
          drop.isGlitch = false;

          // Randomize characters on reset
          drop.chars = drop.chars.map(() =>
            chars[Math.floor(Math.random() * chars.length)]
          );

          drop.color = Math.random() < 0.01 ? '#FF0000' :
                       Math.random() < 0.02 ? '#FFD700' :
                       Math.random() < 0.03 ? '#FFEA00' :
                       Math.random() < 0.05 ? '#00FFFF' :
                       '#00FF00';
        }
        
        drop.chars.forEach((char, i) => {
          const y = drop.y + i * fontSize;
          
          if (y > -fontSize && y < canvas.height + fontSize) {
            const fadePosition = i / drop.chars.length;
            const opacity = (1 - fadePosition * 0.8) * (drop.brightness || 1);
            const color = drop.color || '#0F0';
            
            const rgb = color === '#0F0' ? '0, 255, 0' :
                       color === '#00FF00' ? '0, 255, 0' :
                       color === '#00FFFF' ? '0, 255, 255' :
                       color === '#FFD700' ? '255, 215, 0' :
                       color === '#FFEA00' ? '255, 234, 0' :
                       color === '#FF0000' ? '255, 0, 0' :
                       color === '#39FF14' ? '57, 255, 20' : '0, 255, 0';
            
            if (i === drop.chars.length - 1) {
              ctx.shadowBlur = 25;
              ctx.shadowColor = color;
              ctx.fillStyle = '#ffffff';
              ctx.font = `${fontSize * 1.2}px 'Share Tech Mono', monospace`;
            } else if (i >= drop.chars.length - 3) {
              const glowIntensity = 15 - (drop.chars.length - 1 - i) * 4;
              ctx.shadowBlur = glowIntensity;
              ctx.shadowColor = color;
              ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 1.3})`;
            } else if (i >= drop.chars.length - 10) {
              ctx.shadowBlur = 2;
              ctx.shadowColor = color;
              ctx.fillStyle = `rgba(${rgb}, ${opacity * 1.1})`;
            } else {
              ctx.shadowBlur = 0;
              ctx.fillStyle = `rgba(${rgb}, ${opacity * 0.7})`;
            }
            
            if (Math.random() < (drop.glitchRate || 0.01)) {
              char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
              drop.chars[i] = char;
            }
            
            ctx.fillText(char, x * fontSize + fontSize / 2, y);
            
            if (i === drop.chars.length - 1) {
              ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;
            }
          }
        });
        
        if (drop.speed > 5) {
          drop.speed *= 0.98;
        }
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      updateCanvasSize();
      const newColumns = Math.floor(canvas.width / fontSize);
      
      if (newColumns > dropsRef.current.length) {
        const newDrops = Array(newColumns - dropsRef.current.length).fill(null).map(() => ({
          y: Math.random() * -100,
          speed: Math.random() * 1.5 + 0.8,
          chars: Array(Math.floor(canvas.height / fontSize) + 20).fill(null).map(() => 
            matrixChars[Math.floor(Math.random() * matrixChars.length)]
          ),
          color: Math.random() < 0.85 ? '#0F0' : (Math.random() < 0.5 ? '#00FFFF' : '#39FF14'),
          brightness: Math.random() * 0.5 + 0.5,
          glitchRate: Math.random() * 0.02
        }));
        dropsRef.current = [...dropsRef.current, ...newDrops];
        newDrops.forEach((_, index) => animateDrop(dropsRef.current.length - newDrops.length + index));
      } else if (newColumns < dropsRef.current.length) {
        dropsRef.current = dropsRef.current.slice(0, newColumns);
      }
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const x = Math.floor(e.clientX / fontSize);
      if (dropsRef.current[x]) {
        const radius = 3;
        for (let i = x - radius; i <= x + radius; i++) {
          if (dropsRef.current[i]) {
            dropsRef.current[i].speed = 8;
          }
        }
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isVisible, theme]);

  if (!isVisible) return null;

  return (
    <canvas
      ref={canvasRef}
      className="matrix-rain"
      role="presentation"
      aria-hidden="true"
      aria-label="Decorative Matrix code rain animation background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        background: 'transparent',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 1s ease-in-out'
      }}
    />
  );
};
