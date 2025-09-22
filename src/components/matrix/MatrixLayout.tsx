import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MatrixLayoutProps {
  children: React.ReactNode;
  className?: string;
  enableRain?: boolean;
  variant?: 'default' | 'terminal' | 'cyberpunk' | 'ghost';
}

export const MatrixLayout: React.FC<MatrixLayoutProps> = ({
  children,
  className,
  enableRain = true,
  variant = 'default'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!enableRain || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Matrix rain implementation
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters
    const chars = '田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑'.split('');

    // Matrix rain variables
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    // Colors based on variant
    const getMatrixColor = (alpha: number = 1) => {
      switch (variant) {
        case 'cyberpunk':
          return `rgba(255, 0, 255, ${alpha})`;
        case 'terminal':
          return `rgba(255, 165, 0, ${alpha})`;
        case 'ghost':
          return `rgba(100, 149, 237, ${alpha})`;
        default:
          return `rgba(0, 255, 0, ${alpha})`;
      }
    };

    const draw = () => {
      // Create fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = getMatrixColor(1);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Add glow effect
        ctx.shadowColor = getMatrixColor(0.8);
        ctx.shadowBlur = 10;
        ctx.fillText(text, x, y);
        ctx.shadowBlur = 0;

        // Reset drop to top randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [enableRain, variant]);

  return (
    <div className={cn('relative min-h-screen overflow-hidden', className)} data-theme={variant}>
      {/* Matrix Rain Canvas */}
      {enableRain && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-0"
          style={{ zIndex: -1 }}
        />
      )}

      {/* Scan Lines Effect */}
      <div className="fixed inset-0 pointer-events-none z-0 scan-lines-matrix opacity-30" />

      {/* Content Layer */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>

      {/* Vignette Effect */}
      <div
        className="fixed inset-0 pointer-events-none z-5"
        style={{
          background: `radial-gradient(circle at center, transparent 0%, transparent 70%, rgba(0,0,0,0.3) 100%)`
        }}
      />
    </div>
  );
};