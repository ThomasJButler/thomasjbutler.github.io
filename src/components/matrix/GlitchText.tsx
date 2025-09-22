import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  children: string;
  className?: string;
  variant?: 'default' | 'terminal' | 'cyberpunk' | 'ghost';
  intensity?: 'low' | 'medium' | 'high';
  trigger?: 'hover' | 'auto' | 'focus';
  glitchChars?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  children,
  className,
  variant = 'default',
  intensity = 'medium',
  trigger = 'hover',
  glitchChars = '!@#$%^&*(){}[]|\\:";\'<>?,./'
}) => {
  const [glitched, setGlitched] = useState(false);
  const [glitchText, setGlitchText] = useState(children);

  const intensitySettings = {
    low: { iterations: 3, speed: 100, corruption: 0.1 },
    medium: { iterations: 6, speed: 80, corruption: 0.2 },
    high: { iterations: 12, speed: 50, corruption: 0.3 }
  };

  const settings = intensitySettings[intensity];

  const glitchEffect = () => {
    if (glitched) return;

    setGlitched(true);
    let iteration = 0;

    const glitchInterval = setInterval(() => {
      setGlitchText(
        children
          .split('')
          .map((char, index) => {
            if (Math.random() < settings.corruption) {
              return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            }
            return char;
          })
          .join('')
      );

      iteration++;

      if (iteration >= settings.iterations) {
        clearInterval(glitchInterval);
        setGlitchText(children);
        setTimeout(() => setGlitched(false), 200);
      }
    }, settings.speed);
  };

  useEffect(() => {
    if (trigger === 'auto') {
      const autoGlitch = setInterval(() => {
        if (Math.random() > 0.7) {
          glitchEffect();
        }
      }, 3000 + Math.random() * 2000);

      return () => clearInterval(autoGlitch);
    }
  }, [trigger]);

  const getVariantClasses = () => {
    switch (variant) {
      case 'cyberpunk':
        return 'text-pink-500 drop-shadow-[0_0_10px_rgba(255,0,255,0.8)]';
      case 'terminal':
        return 'text-orange-500 drop-shadow-[0_0_10px_rgba(255,165,0,0.8)]';
      case 'ghost':
        return 'text-blue-400 drop-shadow-[0_0_10px_rgba(100,149,237,0.8)]';
      default:
        return 'text-matrix-primary drop-shadow-[0_0_10px_rgba(0,255,0,0.8)]';
    }
  };

  const triggerProps = trigger === 'hover'
    ? { onMouseEnter: glitchEffect }
    : trigger === 'focus'
    ? { onFocus: glitchEffect }
    : {};

  return (
    <motion.span
      className={cn(
        'font-mono transition-all duration-200 cursor-pointer',
        getVariantClasses(),
        glitched && 'animate-pulse filter blur-[0.5px]',
        className
      )}
      {...triggerProps}
      animate={glitched ? {
        textShadow: [
          '2px 0 #ff0000, -2px 0 #00ffff',
          '0 2px #ff0000, 0 -2px #00ffff',
          '-2px 0 #ff0000, 2px 0 #00ffff',
          '0 0 #ff0000, 0 0 #00ffff'
        ]
      } : {}}
      transition={{ duration: 0.1, repeat: glitched ? Infinity : 0 }}
    >
      {glitchText}
    </motion.span>
  );
};