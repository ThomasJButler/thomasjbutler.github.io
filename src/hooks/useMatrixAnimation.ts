import { useEffect, useRef, useCallback } from 'react';
import { animate } from 'animejs';
import { matrixAnimations } from '../utils/animations/matrixAnimations';

export const useMatrixAnimation = (containerRef?: React.RefObject<HTMLElement>, options?: any) => {
  const animationRef = useRef<any | null>(null);

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.pause();
        // anime.remove is not available in v4, pause is sufficient
      }
    };
  }, []);

  const animateIn = useCallback((element: HTMLElement, type: keyof typeof matrixAnimations = 'fadeInUp') => {
    if (animationRef.current) {
      animationRef.current.pause();
    }
    
    const animationFunction = matrixAnimations[type];
    if (typeof animationFunction === 'function') {
      animationRef.current = animationFunction(element);
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

// Hook for scroll-triggered animations
export const useScrollAnimation = (threshold = 0.1) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const hasAnimated = useRef(false);

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

// Hook for hover animations
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

// Hook for page transitions
export const usePageTransition = () => {
  const pageRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = pageRef.current;
    if (!element) return;

    // Animate in on mount
    matrixAnimations.pageTransition.in(element);

    return () => {
      // Animate out on unmount
      matrixAnimations.pageTransition.out(element);
    };
  }, []);

  return pageRef;
};