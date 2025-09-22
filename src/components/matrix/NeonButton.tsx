import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button, ButtonProps } from '@/components/ui/button';

interface NeonButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'default' | 'terminal' | 'cyberpunk' | 'ghost';
  glowIntensity?: 'low' | 'medium' | 'high' | 'ultra';
  pulsing?: boolean;
  rippleEffect?: boolean;
  scanLines?: boolean;
}

export const NeonButton: React.FC<NeonButtonProps> = ({
  children,
  className,
  variant = 'default',
  glowIntensity = 'medium',
  pulsing = true,
  rippleEffect = true,
  scanLines = false,
  disabled,
  ...props
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const getVariantStyles = () => {
    const glowMap = {
      low: { blur: '5px', spread: '2px', opacity: '0.4' },
      medium: { blur: '10px', spread: '4px', opacity: '0.6' },
      high: { blur: '20px', spread: '8px', opacity: '0.8' },
      ultra: { blur: '30px', spread: '12px', opacity: '1' }
    };

    const glow = glowMap[glowIntensity];

    switch (variant) {
      case 'cyberpunk':
        return {
          primary: 'rgb(255, 0, 255)',
          secondary: 'rgb(255, 20, 147)',
          bg: 'bg-gradient-to-r from-pink-600 to-purple-600',
          border: 'border-pink-500',
          text: 'text-white',
          shadow: `0 0 ${glow.blur} ${glow.spread} rgba(255, 0, 255, ${glow.opacity})`,
          hoverShadow: `0 0 ${glow.blur} ${glow.spread} rgba(255, 0, 255, 1)`
        };
      case 'terminal':
        return {
          primary: 'rgb(255, 165, 0)',
          secondary: 'rgb(255, 140, 0)',
          bg: 'bg-gradient-to-r from-orange-600 to-amber-600',
          border: 'border-orange-500',
          text: 'text-black',
          shadow: `0 0 ${glow.blur} ${glow.spread} rgba(255, 165, 0, ${glow.opacity})`,
          hoverShadow: `0 0 ${glow.blur} ${glow.spread} rgba(255, 165, 0, 1)`
        };
      case 'ghost':
        return {
          primary: 'rgb(100, 149, 237)',
          secondary: 'rgb(135, 206, 250)',
          bg: 'bg-gradient-to-r from-blue-600 to-indigo-600',
          border: 'border-blue-500',
          text: 'text-white',
          shadow: `0 0 ${glow.blur} ${glow.spread} rgba(100, 149, 237, ${glow.opacity})`,
          hoverShadow: `0 0 ${glow.blur} ${glow.spread} rgba(100, 149, 237, 1)`
        };
      default:
        return {
          primary: 'rgb(0, 255, 0)',
          secondary: 'rgb(50, 255, 50)',
          bg: 'bg-gradient-to-r from-green-600 to-emerald-600',
          border: 'border-matrix-primary',
          text: 'text-black',
          shadow: `0 0 ${glow.blur} ${glow.spread} rgba(0, 255, 0, ${glow.opacity})`,
          hoverShadow: `0 0 ${glow.blur} ${glow.spread} rgba(0, 255, 0, 1)`
        };
    }
  };

  const styles = getVariantStyles();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (rippleEffect && !disabled) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newRipple = { id: Date.now(), x, y };

      setRipples(prev => [...prev, newRipple]);
      setIsClicked(true);

      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
        setIsClicked(false);
      }, 600);
    }

    if (props.onClick) {
      props.onClick(e);
    }
  };

  const MotionButton = motion(Button);

  return (
    <MotionButton
      {...props}
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        'relative overflow-hidden font-mono font-bold uppercase tracking-wider',
        'border-2 transition-all duration-300',
        'transform active:scale-95',
        styles.bg,
        styles.border,
        styles.text,
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      style={{
        boxShadow: disabled ? 'none' : styles.shadow
      }}
      whileHover={!disabled ? {
        scale: 1.05,
        boxShadow: styles.hoverShadow
      } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      animate={pulsing && !disabled ? {
        boxShadow: [styles.shadow, styles.hoverShadow, styles.shadow]
      } : {}}
      transition={{
        boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        scale: { type: "spring", stiffness: 400, damping: 17 }
      }}
    >
      {/* Scan lines effect */}
      {scanLines && !disabled && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-px bg-white/20"
              style={{ top: `${i * 10}%` }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "linear"
              }}
            />
          ))}
        </div>
      )}

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x - 25,
            top: ripple.y - 25,
            width: 50,
            height: 50,
            backgroundColor: 'rgba(255, 255, 255, 0.3)'
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}

      {/* Inner glow */}
      <div
        className="absolute inset-0 rounded-md opacity-30 pointer-events-none"
        style={{
          background: `linear-gradient(45deg, ${styles.primary}, ${styles.secondary})`
        }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>

      {/* Corner brackets */}
      <div className="absolute top-1 left-1 w-2 h-2 border-l border-t border-white/50" />
      <div className="absolute top-1 right-1 w-2 h-2 border-r border-t border-white/50" />
      <div className="absolute bottom-1 left-1 w-2 h-2 border-l border-b border-white/50" />
      <div className="absolute bottom-1 right-1 w-2 h-2 border-r border-b border-white/50" />
    </MotionButton>
  );
};