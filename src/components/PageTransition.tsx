import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { glitchText, matrixCascade, digitalCorruption } from '../utils/matrixAnimations';
import './PageTransition.css';

interface PageTransitionProps {
  children: React.ReactNode;
  transitionType?: 'matrix' | 'glitch' | 'cascade' | 'corruption' | 'fade';
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  transitionType = 'matrix'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !overlayRef.current) return;

    const runTransition = async () => {
      switch (transitionType) {
        case 'matrix':
          await matrixTransition();
          break;
        case 'glitch':
          await glitchTransition();
          break;
        case 'cascade':
          await cascadeTransition();
          break;
        case 'corruption':
          await corruptionTransition();
          break;
        case 'fade':
        default:
          await fadeTransition();
      }
    };

    const matrixTransition = async () => {
      const overlay = overlayRef.current!;
      overlay.style.display = 'block';

      // Binary rain effect
      const chars = '01';
      let rain = '';
      for (let i = 0; i < 100; i++) {
        rain += chars[Math.floor(Math.random() * chars.length)];
      }
      overlay.innerHTML = `<div class="matrix-transition-text">${rain}</div>`;

      await animate(overlay, {
        opacity: [0, 1, 1, 0],
        duration: 800,
        easing: 'easeInOutQuad',
      }).finished;

      overlay.style.display = 'none';
    };

    const glitchTransition = async () => {
      const container = containerRef.current!;

      await animate(container, [
        { filter: 'hue-rotate(0deg) contrast(1)' },
        { filter: 'hue-rotate(90deg) contrast(2)', offset: 0.1 },
        { filter: 'hue-rotate(-90deg) contrast(3)', offset: 0.2 },
        { filter: 'hue-rotate(180deg) contrast(1.5)', offset: 0.3 },
        { filter: 'hue-rotate(0deg) contrast(1)', offset: 1 }
      ], {
        duration: 500,
        easing: 'easeInOutQuad',
      }).finished;
    };

    const cascadeTransition = async () => {
      const elements = containerRef.current!.querySelectorAll('*');
      if (elements.length > 0) {
        await matrixCascade(Array.from(elements) as HTMLElement[], 10);
      }
    };

    const corruptionTransition = async () => {
      await digitalCorruption(containerRef.current!);
    };

    const fadeTransition = async () => {
      await animate(containerRef.current!, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        easing: 'easeOutQuad',
      }).finished;
    };

    runTransition();
  }, [transitionType]);

  return (
    <div className="page-transition-wrapper" ref={containerRef}>
      <div className="page-transition-overlay" ref={overlayRef} />
      {children}
    </div>
  );
};