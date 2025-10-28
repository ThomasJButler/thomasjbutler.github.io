/**
 * @author Tom Butler
 * @date 2025-10-28
 * @description Retro CRT monitor effect wrapper with configurable scanlines,
 *              flicker animation, and screen curvature
 */

import React, { useEffect, useRef } from 'react';
import './CRTEffect.css';

interface CRTEffectProps {
  intensity?: 'subtle' | 'normal' | 'intense';
  scanlines?: boolean;
  flicker?: boolean;
  curve?: boolean;
  children?: React.ReactNode;
}

/**
 * CRT monitor visual effect container with customisable retro aesthetics
 * @param {Object} props
 * @param {string} [props.intensity='normal'] - Effect intensity level
 * @param {boolean} [props.scanlines=true] - Enable horizontal scanline overlay
 * @param {boolean} [props.flicker=true] - Enable random flicker animation
 * @param {boolean} [props.curve=false] - Apply screen curvature distortion
 * @param {React.ReactNode} [props.children] - Content to wrap with CRT effect
 * @return {JSX.Element}
 * @constructor
 */
export const CRTEffect: React.FC<CRTEffectProps> = ({
  intensity = 'normal',
  scanlines = true,
  flicker = true,
  curve = false,
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * @listens flicker - Initialises random flicker intervals when enabled
   */
  useEffect(() => {
    if (!containerRef.current) return;

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
