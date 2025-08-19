import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

interface ScrollAnimationOptions {
  threshold?: number;
  animationProps?: any;
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

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const elementRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            
            // Get animation based on type or use custom
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

// Hook for animating multiple children with stagger
export const useScrollReveal = () => {
  const containerRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

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

// Parallax scroll effect hook
export const useParallax = (speed: number = 0.5) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrolled;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Check if element is in viewport
      if (scrolled + windowHeight > elementTop && scrolled < elementTop + elementHeight) {
        const yPos = -(scrolled - elementTop) * speed;
        element.style.transform = `translateY(${yPos}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return elementRef;
};