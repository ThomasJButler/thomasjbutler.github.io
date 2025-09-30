import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';

interface MatrixRainProps {
  theme?: 'matrix';
}

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

  useEffect(() => {
    // Add a 2-second delay before showing the matrix rain effect
    const delayTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    // Track mouse movement for interactive effects
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(delayTimer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();

    // Matrix characters - Japanese Katakana + binary for authentic look
    const matrixChars = '101010101ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ010010101';
    const binaryChars = '01';
    const fontSize = 16; // Increased from 14 for better visibility with Matrix Code NFI font
    const columns = Math.floor(canvas.width / fontSize) + 1; // Extra column for edge coverage

    // Initialize drops with layers and color system
    dropsRef.current = Array(columns).fill(null).map((_, index) => {
      const isBackground = Math.random() < 0.4;
      const isBinary = Math.random() < 0.2; // 20% binary streams
      const chars = isBinary ? binaryChars : matrixChars;

      return {
        y: Math.random() * canvas.height - canvas.height,
        speed: isBackground ? Math.random() * 0.5 + 0.3 : Math.random() * 1.5 + 0.8,
        chars: Array(Math.floor(canvas.height / fontSize) + 20).fill(null).map(() =>
          chars[Math.floor(Math.random() * chars.length)]
        ),
        color: Math.random() < 0.02 ? '#FF0000' : // 2% red glitch
               Math.random() < 0.17 ? '#FFD700' : // 15% gold/yellow (Matrix Oracle color)
               Math.random() < 0.22 ? '#FFEA00' : // 5% bright yellow
               Math.random() < 0.32 ? '#00FFFF' : // 10% cyan
               '#00FF00', // 66% green
        brightness: isBackground ? Math.random() * 0.3 + 0.2 : Math.random() * 0.5 + 0.5,
        glitchRate: Math.random() * 0.02,
        layer: isBackground ? 'background' : 'foreground',
        isGlitch: false
      };
    });

    // Initialize drop animation
    const animateDrop = (dropIndex: number) => {
      // Drops are animated in the draw loop, not with anime.js
      // This function is kept for compatibility
    };

    // Start animations for all drops
    dropsRef.current.forEach((_, index) => animateDrop(index));

    // Drawing function
    const draw = () => {
      // Balanced fade effect for better performance
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text properties with Share Tech Mono for matrix characters
      ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Draw and update characters with depth layers
      dropsRef.current.forEach((drop, x) => {
        // Update drop position
        drop.y += drop.speed;

        // Reset when drop goes off screen
        if (drop.y > canvas.height && Math.random() > 0.97) {
          const isBackground = drop.layer === 'background';
          const isBinary = Math.random() < 0.2;
          const chars = isBinary ? binaryChars : matrixChars;

          drop.y = -drop.chars.length * fontSize - Math.random() * 200;
          drop.speed = isBackground ? Math.random() * 0.5 + 0.3 : Math.random() * 1.5 + 0.8;
          drop.brightness = isBackground ? Math.random() * 0.3 + 0.2 : Math.random() * 0.5 + 0.5;
          drop.glitchRate = Math.random() * 0.02;
          drop.isGlitch = false;

          // Randomize characters on reset
          drop.chars = drop.chars.map(() =>
            chars[Math.floor(Math.random() * chars.length)]
          );

          // Apply color system with gold
          drop.color = Math.random() < 0.02 ? '#FF0000' : // Red glitch
                       Math.random() < 0.17 ? '#FFD700' : // Gold/yellow
                       Math.random() < 0.22 ? '#FFEA00' : // Bright yellow
                       Math.random() < 0.32 ? '#00FFFF' : // Cyan
                       '#00FF00'; // Green
        }
        
        drop.chars.forEach((char, i) => {
          let y = drop.y + i * fontSize;
          
          if (y > -fontSize && y < canvas.height + fontSize) {
            // Enhanced gradient with brightness variation
            const fadePosition = i / drop.chars.length;
            const opacity = (1 - fadePosition * 0.8) * (drop.brightness || 1);
            const color = drop.color || '#0F0';
            
            // Convert color to RGB values for all colors including gold
            const rgb = color === '#0F0' ? '0, 255, 0' :
                       color === '#00FF00' ? '0, 255, 0' :
                       color === '#00FFFF' ? '0, 255, 255' :
                       color === '#FFD700' ? '255, 215, 0' : // Gold
                       color === '#FFEA00' ? '255, 234, 0' : // Bright yellow
                       color === '#FF0000' ? '255, 0, 0' : // Red glitch
                       color === '#39FF14' ? '57, 255, 20' : '0, 255, 0';
            
            // Leading character - bright white with intense glow
            if (i === drop.chars.length - 1) {
              ctx.shadowBlur = 25;
              ctx.shadowColor = color;
              ctx.fillStyle = '#ffffff';
              ctx.font = `${fontSize * 1.2}px 'Share Tech Mono', monospace`;
            } 
            // Sub-leading characters with strong glow
            else if (i >= drop.chars.length - 3) {
              const glowIntensity = 15 - (drop.chars.length - 1 - i) * 4;
              ctx.shadowBlur = glowIntensity;
              ctx.shadowColor = color;
              ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 1.3})`;
            } 
            // Trail with decreasing intensity
            else if (i >= drop.chars.length - 10) {
              ctx.shadowBlur = 2;
              ctx.shadowColor = color;
              ctx.fillStyle = `rgba(${rgb}, ${opacity * 1.1})`;
            }
            // Fading tail
            else {
              ctx.shadowBlur = 0;
              ctx.fillStyle = `rgba(${rgb}, ${opacity * 0.7})`;
            }
            
            // Glitch effect - randomly change character
            if (Math.random() < (drop.glitchRate || 0.01)) {
              char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
              drop.chars[i] = char;
            }
            
            ctx.fillText(char, x * fontSize + fontSize / 2, y);
            
            // Reset font for next character
            if (i === drop.chars.length - 1) {
              ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;
            }
          }
        });
        
        // Gradually slow down sped-up drops
        if (drop.speed > 5) {
          drop.speed *= 0.98;
        }
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    // Handle resize
    const handleResize = () => {
      updateCanvasSize();
      const newColumns = Math.floor(canvas.width / fontSize);
      
      if (newColumns > dropsRef.current.length) {
        // Add new drops
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
        // Remove excess drops
        dropsRef.current = dropsRef.current.slice(0, newColumns);
      }
    };

    window.addEventListener('resize', handleResize);

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const x = Math.floor(e.clientX / fontSize);
      if (dropsRef.current[x]) {
        // Speed up nearby drops
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
      // Clean up animations - pause is sufficient in v4
    };
  }, [isVisible, theme]);

  if (!isVisible) return null;

  return (
    <canvas
      ref={canvasRef}
      className="matrix-rain"
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