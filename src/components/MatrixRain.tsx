import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';

export const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const dropsRef = useRef<Array<{ y: number; speed: number; chars: string[] }>>([]);

  useEffect(() => {
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

    // Matrix characters
    const matrixChars = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Initialize drops
    dropsRef.current = Array(columns).fill(null).map(() => ({
      y: Math.random() * -100,
      speed: Math.random() * 3 + 2,
      chars: Array(Math.floor(canvas.height / fontSize) + 10).fill(null).map(() => 
        matrixChars[Math.floor(Math.random() * matrixChars.length)]
      )
    }));

    // Initialize drop animation
    const animateDrop = (dropIndex: number) => {
      // Drops are animated in the draw loop, not with anime.js
      // This function is kept for compatibility
    };

    // Start animations for all drops
    dropsRef.current.forEach((_, index) => animateDrop(index));

    // Drawing function
    const draw = () => {
      // Fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text properties
      ctx.fillStyle = '#00ff00';
      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = 'center';

      // Draw and update characters
      dropsRef.current.forEach((drop, x) => {
        // Update drop position
        drop.y += drop.speed;
        
        // Reset when drop goes off screen
        if (drop.y > canvas.height) {
          drop.y = -drop.chars.length * fontSize;
          drop.speed = Math.random() * 3 + 2;
          // Randomize characters on reset
          drop.chars = drop.chars.map(() => 
            matrixChars[Math.floor(Math.random() * matrixChars.length)]
          );
        }
        
        drop.chars.forEach((char, i) => {
          const y = drop.y + i * fontSize;
          
          if (y > 0 && y < canvas.height) {
            // Gradient effect - brighter at the bottom
            const opacity = 1 - (i / drop.chars.length);
            ctx.fillStyle = `rgba(0, 255, 0, ${opacity})`;
            
            // Highlight recent characters
            if (i === drop.chars.length - 1) {
              ctx.shadowBlur = 8;
              ctx.shadowColor = '#00ff00';
              ctx.fillStyle = '#ffffff';
            } else {
              ctx.shadowBlur = 0;
            }
            
            ctx.fillText(char, x * fontSize + fontSize / 2, y);
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
          speed: Math.random() * 3 + 2,
          chars: Array(Math.floor(canvas.height / fontSize) + 10).fill(null).map(() => 
            matrixChars[Math.floor(Math.random() * matrixChars.length)]
          )
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
  }, []);

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
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
};