import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

/**
 * Hook for animating cards with scroll, hover, and load effects
 * Converted from card-animations.js to React patterns
 */
export const useCardAnimations = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hoverAnimationsRef = useRef<Map<HTMLElement, any>>(new Map());

  useEffect(() => {
    // Initial card reveal animation
    const animateCardsOnLoad = () => {
      // Expertise cards animation
      const expertiseCards = document.querySelectorAll('.introduction-expertise-card');
      if (expertiseCards.length > 0) {
        animate(Array.from(expertiseCards) as HTMLElement[], {
          translateY: [30, 0],
          opacity: [0, 1],
          duration: 600,
          delay: stagger(100),
          easing: 'easeOutQuad'
        });
      }

      // Project cards animation
      const projectCards = document.querySelectorAll('.project-card, .matrix-project-card');
      if (projectCards.length > 0) {
        animate(Array.from(projectCards) as HTMLElement[], {
          translateY: [40, 0],
          opacity: [0, 1],
          duration: 800,
          delay: stagger(150),
          easing: 'easeOutQuad'
        });
      }
    };

    // Scroll-triggered animations
    const setupScrollAnimations = () => {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      };

      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');

            // Animate the card
            animate(entry.target as HTMLElement, {
              translateY: [20, 0],
              opacity: [0, 1],
              scale: [0.95, 1],
              duration: 500,
              easing: 'easeOutQuad'
            });

            // Animate child elements (tags)
            const tags = entry.target.querySelectorAll('.introduction-expertise-tags span, .project-tags span');
            if (tags.length > 0) {
              animate(Array.from(tags) as HTMLElement[], {
                translateX: [-10, 0],
                opacity: [0, 1],
                duration: 400,
                delay: stagger(50),
                easing: 'easeOutQuad'
              });
            }
          }
        });
      }, observerOptions);

      // Observe all cards
      const allCards = document.querySelectorAll(
        '.introduction-expertise-card, .project-card, .matrix-project-card'
      );
      allCards.forEach(card => {
        observerRef.current?.observe(card);
      });
    };

    // Hover animations
    const setupHoverAnimations = () => {
      const cards = document.querySelectorAll(
        '.introduction-expertise-card, .project-card, .matrix-project-card'
      );

      cards.forEach(card => {
        const cardElement = card as HTMLElement;

        const handleMouseEnter = () => {
          // Cancel any running animation
          const existingAnimation = hoverAnimationsRef.current.get(cardElement);
          if (existingAnimation) existingAnimation.pause();

          const hoverAnimation = animate(cardElement, {
            translateY: -8,
            scale: 1.02,
            duration: 300,
            easing: 'easeOutQuad'
          });

          hoverAnimationsRef.current.set(cardElement, hoverAnimation);

          // Glow effect
          animate(cardElement, {
            boxShadow: [
              '0 4px 15px rgba(0, 255, 0, 0.2)',
              '0 8px 25px rgba(0, 255, 0, 0.4)'
            ],
            duration: 300,
            easing: 'easeOutQuad'
          });
        };

        const handleMouseLeave = () => {
          // Cancel any running animation
          const existingAnimation = hoverAnimationsRef.current.get(cardElement);
          if (existingAnimation) existingAnimation.pause();

          const leaveAnimation = animate(cardElement, {
            translateY: 0,
            scale: 1,
            duration: 300,
            easing: 'easeOutQuad'
          });

          hoverAnimationsRef.current.set(cardElement, leaveAnimation);

          // Remove glow
          animate(cardElement, {
            boxShadow: '0 4px 15px rgba(0, 255, 0, 0.2)',
            duration: 300,
            easing: 'easeOutQuad'
          });
        };

        cardElement.addEventListener('mouseenter', handleMouseEnter);
        cardElement.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    // Performance optimization
    const optimizeCardPerformance = () => {
      const cards = document.querySelectorAll(
        '.introduction-expertise-card, .project-card, .matrix-project-card'
      );

      cards.forEach(card => {
        const cardElement = card as HTMLElement;
        cardElement.style.willChange = 'transform, opacity';

        // Remove will-change after animations complete
        setTimeout(() => {
          cardElement.style.willChange = 'auto';
        }, 2000);
      });
    };

    // Small delay to ensure DOM is ready
    const initTimeout = setTimeout(() => {
      animateCardsOnLoad();
      setupScrollAnimations();
      setupHoverAnimations();
      optimizeCardPerformance();
    }, 100);

    // Cleanup
    return () => {
      clearTimeout(initTimeout);
      
      // Disconnect observer
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      // Clean up hover animations
      hoverAnimationsRef.current.forEach(animation => {
        animation.pause();
      });
      hoverAnimationsRef.current.clear();

      // Note: Event listeners will be cleaned up when component unmounts
      // React handles DOM cleanup automatically
    };
  }, []);

  // Return a function to manually trigger animations if needed
  const triggerAnimations = () => {
    const cards = document.querySelectorAll(
        '.introduction-expertise-card, .project-card, .matrix-project-card'
    );
    
    if (cards.length > 0) {
      animate(cards as NodeListOf<HTMLElement>, {
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 600,
        delay: stagger(100),
        easing: 'easeOutQuad'
      });
    }
  };

  return { triggerAnimations };
};