import { animate, stagger } from 'animejs';

export const matrixAnimations = {
  // Fade in with upward movement
  fadeInUp: (target: string | HTMLElement, delay = 0) => {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return null;
    return animate(element, {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
      delay,
      ease: 'outExpo'
    });
  },

  // Matrix-style glitch effect
  glitchText: (target: string | HTMLElement) => {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return null;
    return animate(element, {
      keyframes: [
        { translateX: -2, color: '#ff0000', duration: 50 },
        { translateX: 2, color: '#00ffff', duration: 50 },
        { translateX: -1, color: '#ff00ff', duration: 50 },
        { translateX: 0, color: '#00ff00', duration: 50 }
      ],
      loop: 3
    });
  },

  // Typewriter effect
  typewriter: (target: string | HTMLElement, text: string) => {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;

    element.textContent = '';
    const letters = text.split('');
    
    letters.forEach((letter, i) => {
      setTimeout(() => {
        element.textContent += letter;
        animate(element, {
          opacity: [0.5, 1],
          duration: 50,
          ease: 'linear'
        });
      }, i * 50);
    });
  },

  // Matrix rain reveal
  matrixReveal: (target: string | HTMLElement) => {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return null;
    return animate(element, {
      opacity: [0, 1],
      scale: [0.9, 1],
      rotateX: [45, 0],
      duration: 1200,
      ease: 'outExpo'
    });
  },

  // Stagger animation for lists
  staggerIn: (target: string | HTMLElement | HTMLElement[], staggerDelay = 100) => {
    const elements = typeof target === 'string' 
      ? document.querySelectorAll(target) 
      : Array.isArray(target) 
        ? target 
        : [target];
    if (!elements.length) return null;
    return animate(elements as NodeListOf<HTMLElement> | HTMLElement[], {
      opacity: [0, 1],
      translateX: [-50, 0],
      delay: stagger(staggerDelay),
      duration: 800,
      ease: 'outQuad'
    });
  },

  // Pulse effect
  pulse: (target: string | HTMLElement) => {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return null;
    return animate(element, {
      scale: [1, 1.05, 1],
      boxShadow: [
        '0 0 0 rgba(0, 255, 0, 0)',
        '0 0 20px rgba(0, 255, 0, 0.8)',
        '0 0 0 rgba(0, 255, 0, 0)'
      ],
      duration: 1000,
      ease: 'inOutQuad'
    });
  },

  // Page transition
  pageTransition: {
    in: (target: string | HTMLElement) => {
      const element = typeof target === 'string' ? document.querySelector(target) : target;
      if (!element) return null;
      return animate(element, {
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 600,
        ease: 'outQuad'
      });
    },
    out: (target: string | HTMLElement) => {
      const element = typeof target === 'string' ? document.querySelector(target) : target;
      if (!element) return null;
      return animate(element, {
        opacity: [1, 0],
        translateY: [0, -50],
        duration: 400,
        ease: 'inQuad'
      });
    }
  },

  // Matrix code rain effect for backgrounds
  codeRain: (container: HTMLElement) => {
    const chars = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789Z';
    const columns = Math.floor(container.offsetWidth / 20);
    
    for (let i = 0; i < columns; i++) {
      const span = document.createElement('span');
      span.style.position = 'absolute';
      span.style.left = `${i * 20}px`;
      span.style.top = `${Math.random() * -100}px`;
      span.style.color = '#00ff00';
      span.style.fontFamily = 'monospace';
      span.style.fontSize = '16px';
      span.textContent = chars[Math.floor(Math.random() * chars.length)];
      container.appendChild(span);

      animate(span, {
        translateY: container.offsetHeight + 100,
        opacity: [1, 0],
        duration: Math.random() * 5000 + 3000,
        delay: Math.random() * 5000,
        ease: 'linear',
        loop: true,
        update: () => {
          if (Math.random() > 0.98) {
            span.textContent = chars[Math.floor(Math.random() * chars.length)];
          }
        }
      });
    }
  },

  // Hover effects
  hoverGlow: {
    enter: (target: HTMLElement) => animate(target, {
      scale: 1.05,
      boxShadow: '0 0 30px rgba(0, 255, 0, 0.8)',
      duration: 300,
      ease: 'outQuad'
    }),
    leave: (target: HTMLElement) => animate(target, {
      scale: 1,
      boxShadow: '0 0 0 rgba(0, 255, 0, 0)',
      duration: 300,
      ease: 'outQuad'
    })
  }
};

// Animation presets for consistent timing
export const animationPresets = {
  fast: { duration: 300, ease: 'outQuad' },
  normal: { duration: 600, ease: 'outExpo' },
  slow: { duration: 1200, ease: 'inOutQuad' },
  
  glitch: {
    keyframes: [
      { translateX: -2, color: '#ff0000' },
      { translateX: 2, color: '#00ff00' },
      { translateX: 0, color: '#00ff00' }
    ],
    duration: 200,
    loop: 3
  },
  
  typewriter: {
    opacity: [0, 1],
    translateX: [-10, 0],
    delay: stagger(50)
  },
  
  matrixRain: {
    translateY: [-100, '100vh'],
    opacity: [1, 0],
    duration: function() { return Math.random() * 5000 + 3000; },
    delay: stagger(100, { from: 'center' }),
    loop: true
  }
};