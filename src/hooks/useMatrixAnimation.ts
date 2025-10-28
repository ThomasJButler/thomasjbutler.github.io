/**
 * @author Tom Butler
 * @date 2025-10-28
 * @description Matrix-themed animation hooks including entrance/exit effects, glitch,
 *              typewriter, and scroll-triggered animations
 */

import { useEffect, useRef, useCallback } from 'react';
import { animate } from 'animejs';
import { matrixAnimations } from '../utils/animations/matrixAnimations';

/**
 * Provides Matrix-themed animation controls for elements
 * @param {React.RefObject<HTMLElement>} [_containerRef] - Optional container reference
 * @param {Record<string, unknown>} [_options] - Optional configuration
 * @return {{ animateIn: Function, animateOut: Function, glitch: Function, typewrite: Function, pulse: Function }}
 */
export const useMatrixAnimation = (_containerRef?: React.RefObject<HTMLElement>, _options?: Record<string, unknown>) => {
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);

  /**
   * @constructs Cleans up running animations on unmount
   */
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.pause();
      }
    };
  }, []);

  const animateIn = useCallback((element: HTMLElement, type: keyof typeof matrixAnimations = 'fadeInUp') => {
    if (animationRef.current) {
      animationRef.current.pause();
    }
    
    const animationFunction = matrixAnimations[type];
    if (typeof animationFunction === 'function') {
      const result = animationFunction(element);
      if (result) {
        animationRef.current = result;
      }
    }
  }, []);

  const animateOut = useCallback((element: HTMLElement) => {
    if (animationRef.current) {
      animationRef.current.pause();
    }
    
    animationRef.current = animate(element, {
      opacity: [1, 0],
      translateY: [0, -20],
      duration: 300,
      ease: 'inQuad'
    });
  }, []);

  const glitch = useCallback((element: HTMLElement) => {
    matrixAnimations.glitchText(element);
  }, []);

  const typewrite = useCallback((element: HTMLElement, text: string) => {
    matrixAnimations.typewriter(element, text);
  }, []);

  const pulse = useCallback((element: HTMLElement) => {
    matrixAnimations.pulse(element);
  }, []);

  return {
    animateIn,
    animateOut,
    glitch,
    typewrite,
    pulse
  };
};

/**
 * Triggers Matrix fade-in animation when element scrolls into viewport
 * @param {number} [threshold=0.1] - Intersection observer threshold
 * @return {React.RefObject<HTMLElement>}
 */
export const useScrollAnimation = (threshold = 0.1) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const hasAnimated = useRef(false);

  /**
   * @listens threshold - Sets up intersection observer for scroll animation
   */
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          matrixAnimations.fadeInUp(element);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return elementRef;
};

/**
 * Provides hover glow animation effects for elements
 * @return {React.RefObject<HTMLElement>}
 */
export const useHoverAnimation = () => {
  const elementRef = useRef<HTMLElement | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (elementRef.current) {
      matrixAnimations.hoverGlow.enter(elementRef.current);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (elementRef.current) {
      matrixAnimations.hoverGlow.leave(elementRef.current);
    }
  }, []);

  /**
   * @listens handleMouseEnter, handleMouseLeave - Attaches hover event listeners
   */
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseEnter, handleMouseLeave]);

  return elementRef;
};

/**
 * Manages page entrance and exit transition animations
 * @return {React.RefObject<HTMLElement>}
 */
export const usePageTransition = () => {
  const pageRef = useRef<HTMLElement | null>(null);

  /**
   * @constructs Triggers entrance animation on mount and exit on unmount
   */
  useEffect(() => {
    const element = pageRef.current;
    if (!element) return;

    matrixAnimations.pageTransition.in(element);

    return () => {
      matrixAnimations.pageTransition.out(element);
    };
  }, []);

  return pageRef;
};
