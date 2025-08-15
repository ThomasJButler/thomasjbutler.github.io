import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

interface ScrollAnimationOptions {
  threshold?: number;
  animationProps?: any;
}

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
            
            // Default animation or custom animation
            const animationProps = options.animationProps || {
              opacity: [0, 1],
              translateY: [50, 0],
              duration: 1000,
              ease: 'outQuad'
            };
            
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
  }, [options.animationProps, options.threshold]);

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
              animate(children, {
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