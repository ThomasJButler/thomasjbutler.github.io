/**
 * @author Tom Butler
 * @date 2025-10-28
 * @description Scroll-triggered animation hooks with intersection observer,
 *              staggered reveals, and parallax effects
 */

import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

interface ScrollAnimationOptions {
  threshold?: number;
  animationProps?: Record<string, unknown>;
  animationType?: 'fade' | 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'zoom' | 'flip' | 'custom';
  duration?: number;
  delay?: number;
}

// Predefined animation types matching AOS effects
const animationTypes = {
  fade: {
    opacity: [0, 1],
    duration: 1000,
    ease: 'outQuad'
  },
  fadeUp: {
    opacity: [0, 1],
    translateY: [50, 0],
    duration: 1000,
    ease: 'outCubic'
  },
  fadeDown: {
    opacity: [0, 1],
    translateY: [-50, 0],
    duration: 1000,
    ease: 'outCubic'
  },
  fadeLeft: {
    opacity: [0, 1],
    translateX: [50, 0],
    duration: 1000,
    ease: 'outCubic'
  },
  fadeRight: {
    opacity: [0, 1],
    translateX: [-50, 0],
    duration: 1000,
    ease: 'outCubic'
  },
  zoom: {
    opacity: [0, 1],
    scale: [0.5, 1],
    duration: 1000,
    ease: 'outElastic'
  },
  flip: {
    opacity: [0, 1],
    rotateY: [90, 0],
    duration: 1200,
    ease: 'outExpo'
  }
};

/**
 * Triggers animation when element scrolls into viewport
 * @param {ScrollAnimationOptions} [options={}] - Animation configuration
 * @return {React.RefObject<HTMLElement>}
 */
export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const elementRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  /**
   * @listens options.animationProps, options.threshold, options.animationType, options.duration, options.delay
   *          Sets up intersection observer for scroll-triggered animation
   */
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            
            let animationProps;
            if (options.animationType && options.animationType !== 'custom') {
              animationProps = { 
                ...animationTypes[options.animationType],
                duration: options.duration || animationTypes[options.animationType].duration,
                delay: options.delay || 0
              };
            } else {
              animationProps = options.animationProps || animationTypes.fadeUp;
            }
            
            animate(element, animationProps);
          }
        });
      },
      {
        threshold: options.threshold || 0.1
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options.animationProps, options.threshold, options.animationType, options.duration, options.delay]);

  return elementRef;
};

/**
 * Animates multiple child elements with staggered timing when container scrolls into view
 * @return {React.RefObject<HTMLElement>}
 */
export const useScrollReveal = () => {
  const containerRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  /**
   * @constructs Sets up intersection observer for staggered child element animations
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            
            const children = container.querySelectorAll('.reveal-item');
            if (children.length > 0) {
              animate(Array.from(children) as HTMLElement[], {
                opacity: [0, 1],
                translateY: [30, 0],
                delay: (el, i) => i * 100,
                duration: 800,
                ease: 'outQuad'
              });
            }
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  return containerRef;
};

/**
 * Creates parallax scrolling effect for element
 * @param {number} [speed=0.5] - Parallax movement speed multiplier
 * @return {React.RefObject<HTMLElement>}
 */
export const useParallax = (speed: number = 0.5) => {
  const elementRef = useRef<HTMLElement>(null);

  /**
   * @listens speed - Attaches scroll listener for parallax effect
   */
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrolled;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      if (scrolled + windowHeight > elementTop && scrolled < elementTop + elementHeight) {
        const yPos = -(scrolled - elementTop) * speed;
        element.style.transform = `translateY(${yPos}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return elementRef;
};
