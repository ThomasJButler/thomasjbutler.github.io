import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { WebGLMatrixRain } from './WebGLMatrixRain';

interface MatrixLayoutProps {
  children: React.ReactNode;
  className?: string;
  enableRain?: boolean;
  variant?: 'default' | 'terminal' | 'cyberpunk' | 'ghost';
  intensity?: number; // 0.1 to 1.0 - controls rain opacity/speed
  adaptiveDimming?: boolean; // Auto-dim when content is visible
}

export const MatrixLayout: React.FC<MatrixLayoutProps> = ({
  children,
  className,
  enableRain = true,
  variant = 'default',
  intensity = 0.6,
  adaptiveDimming = true
}) => {
  // Map variant to visual properties for WebGL rain
  const getRainProps = () => {
    switch (variant) {
      case 'cyberpunk':
        return { glowIntensity: 3.0, fallSpeed: 1.5 };
      case 'terminal':
        return { glowIntensity: 2.5, fallSpeed: 1.2 };
      case 'ghost':
        return { glowIntensity: 1.5, fallSpeed: 0.8 };
      default:
        return { glowIntensity: 2.0, fallSpeed: 1.0 };
    }
  };

  const rainProps = getRainProps();

  return (
    <div className={cn('relative min-h-screen overflow-hidden', className)} data-theme={variant}>
      {/* High-Performance WebGL Matrix Rain */}
      {enableRain && (
        <WebGLMatrixRain
          intensity={intensity}
          adaptiveDimming={adaptiveDimming}
          particleSize={16}
          fallSpeed={rainProps.fallSpeed}
          glowIntensity={rainProps.glowIntensity}
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