import React, { useEffect, useRef } from 'react';
import './CRTEffect.css';

interface CRTEffectProps {
  intensity?: 'subtle' | 'normal' | 'intense';
  scanlines?: boolean;
  flicker?: boolean;
  curve?: boolean;
  children?: React.ReactNode;
}

export const CRTEffect: React.FC<CRTEffectProps> = ({
  intensity = 'normal',
  scanlines = true,
  flicker = true,
  curve = false,
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Add random flicker effect
    if (flicker) {
      const flickerInterval = setInterval(() => {
        if (Math.random() > 0.99) {
          containerRef.current?.classList.add('crt-flicker');
          setTimeout(() => {
            containerRef.current?.classList.remove('crt-flicker');
          }, 50);
        }
      }, 100);

      return () => clearInterval(flickerInterval);
    }
  }, [flicker]);

  const classNames = [
    'crt-container',
    `crt-${intensity}`,
    scanlines && 'crt-scanlines',
    curve && 'crt-curve',
    flicker && 'crt-flicker-enabled'
  ].filter(Boolean).join(' ');

  return (
    <div ref={containerRef} className={classNames}>
      {scanlines && <div className="crt-scanline-overlay" />}
      <div className="crt-phosphor-layer" />
      {curve && <div className="crt-curve-overlay" />}
      <div className="crt-content">
        {children}
      </div>
    </div>
  );
};