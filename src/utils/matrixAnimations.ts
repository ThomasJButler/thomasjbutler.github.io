/**
 * @author Tom Butler
 * @date 2025-10-27
 * @description Matrix-themed animation effects using Anime.js.
 *              Provides cyberpunk-style visual effects including glitches, cascades,
 *              and terminal-inspired animations.
 */

import { animate, stagger, createTimeline } from 'animejs';

/**
 * Creates glitch text effect with random character substitution
 * @param {HTMLElement} element - Target element
 * @return {void}
 */
export const glitchText = (element: HTMLElement) => {
  const originalText = element.textContent || '';
  const chars = '01!@#$%^&*()_+-=[]{}|;:,.<>?';

  let iteration = 0;
  const interval = setInterval(() => {
    element.textContent = originalText
      .split('')
      .map((letter, index) => {
        if (index < iteration) {
          return originalText[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join('');

    if (iteration >= originalText.length) {
      clearInterval(interval);
    }

    iteration += 1 / 3;
  }, 30);
};

/**
 * Animates elements in cascading Matrix-style reveal
 * @param {HTMLElement[]} elements - Array of elements to animate
 * @param {number} [staggerDelay=50] - Delay between each element in milliseconds
 * @return {Object} Anime.js animation instance
 */
export const matrixCascade = (elements: HTMLElement[], staggerDelay: number = 50) => {
  return animate(elements as any, {
    translateY: [-50, 0],
    opacity: [0, 1],
    delay: stagger(staggerDelay),
    duration: 1000,
    easing: 'easeOutElastic(1, .5)',
  } as any);
};

/**
 * Creates digital corruption effect with hue rotation and skew
 * @param {HTMLElement} element - Target element
 * @return {Object} Anime.js timeline instance
 */
export const digitalCorruption = (element: HTMLElement) => {
  const timeline = createTimeline();

  timeline.add(element as any, {
    filter: [
      'hue-rotate(0deg) saturate(1)',
      'hue-rotate(90deg) saturate(2)',
      'hue-rotate(-90deg) saturate(3)',
      'hue-rotate(0deg) saturate(1)',
    ],
    duration: 500,
    easing: 'easeInOutQuad',
  } as any);

  return timeline;
};

/**
 * Simulates terminal typing effect character by character
 * @param {HTMLElement} element - Target element
 * @param {string} text - Text to type out
 * @param {number} [speed=50] - Typing speed in milliseconds per character
 * @return {Promise<void>} Resolves when typing completes
 */
export const typewriterEffect = (
  element: HTMLElement,
  text: string,
  speed: number = 50
): Promise<void> => {
  return new Promise((resolve) => {
    let i = 0;
    element.textContent = '';

    const type = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        resolve();
      }
    };

    type();
  });
};

/**
 * Creates falling binary digits effect for backgrounds
 * @param {HTMLElement} container - Container element for rain effect
 * @return {Function} Cleanup function to stop the animation
 */
export const binaryRain = (container: HTMLElement) => {
  const createDrop = () => {
    const drop = document.createElement('div');
    drop.style.position = 'absolute';
    drop.style.color = '#00FF00';
    drop.style.fontFamily = 'monospace';
    drop.style.fontSize = '14px';
    drop.style.left = `${Math.random() * 100}%`;
    drop.style.top = '-20px';
    drop.textContent = Math.random() > 0.5 ? '0' : '1';

    container.appendChild(drop);

    animate(drop, {
      top: '100%',
      opacity: [1, 0],
      duration: 3000 + Math.random() * 2000,
      easing: 'linear',
      complete: () => drop.remove(),
    });
  };

  const interval = setInterval(createDrop, 100);
  return () => clearInterval(interval);
};

/**
 * Creates pulsing phosphor glow effect on text
 * @param {HTMLElement} element - Target element
 * @return {Object} Anime.js animation instance
 */
export const phosphorPulse = (element: HTMLElement) => {
  return animate(element, {
    textShadow: [
      '0 0 10px rgba(0, 255, 0, 0.5)',
      '0 0 20px rgba(0, 255, 0, 1)',
      '0 0 10px rgba(0, 255, 0, 0.5)',
    ],
    duration: 2000,
    loop: true,
    easing: 'easeInOutSine',
  });
};

/**
 * Reveals text with staggered character animation in Matrix style
 * @param {HTMLElement} element - Target element containing text
 * @return {Object} Anime.js animation instance
 */
export const matrixReveal = (element: HTMLElement) => {
  const text = element.textContent || '';
  const chars = text.split('');

  element.innerHTML = '';
  chars.forEach((char) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.opacity = '0';
    element.appendChild(span);
  });

  return animate(Array.from(element.children) as any, {
    opacity: [0, 1],
    delay: stagger(20),
    duration: 500,
    easing: 'easeOutQuad',
  } as any);
};

/**
 * Displays animated system boot sequence with messages
 * @param {HTMLElement} container - Container element for boot sequence
 * @return {Promise<void>} Resolves when boot sequence completes
 */
export const systemBoot = async (container: HTMLElement) => {
  const messages = [
    'INITIALIZING SYSTEM...',
    'LOADING KERNEL MODULES...',
    'ESTABLISHING NEURAL LINK...',
    'SYNCING WITH THE MATRIX...',
    'SYSTEM READY',
  ];

  const messageEl = document.createElement('div');
  messageEl.style.position = 'fixed';
  messageEl.style.top = '50%';
  messageEl.style.left = '50%';
  messageEl.style.transform = 'translate(-50%, -50%)';
  messageEl.style.color = '#00FF00';
  messageEl.style.fontFamily = 'monospace';
  messageEl.style.fontSize = '1.5rem';
  messageEl.style.textShadow = '0 0 10px #00FF00';
  messageEl.style.zIndex = '10000';

  container.appendChild(messageEl);

  for (const message of messages) {
    await typewriterEffect(messageEl, message, 30);
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (message !== messages[messages.length - 1]) {
      await animate(messageEl, {
        opacity: [1, 0],
        duration: 200,
        easing: 'linear',
      }).finished;
      messageEl.textContent = '';
      await animate(messageEl, {
        opacity: [0, 1],
        duration: 200,
        easing: 'linear',
      }).finished;
    }
  }

  await animate(messageEl, {
    opacity: [1, 0],
    scale: [1, 1.5],
    duration: 1000,
    easing: 'easeOutQuad',
    complete: () => messageEl.remove(),
  }).finished;
};

/**
 * Animates SVG circuit trace path drawing effect
 * @param {HTMLElement} element - Container element for SVG
 * @return {Object} Anime.js animation instance
 */
export const circuitTrace = (element: HTMLElement) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.style.position = 'absolute';
  svg.style.top = '0';
  svg.style.left = '0';
  svg.style.width = '100%';
  svg.style.height = '100%';
  svg.style.pointerEvents = 'none';

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M0,50 L100,50 L100,100 L200,100');
  path.setAttribute('stroke', '#00FF00');
  path.setAttribute('stroke-width', '2');
  path.setAttribute('fill', 'none');
  path.style.strokeDasharray = '1000';
  path.style.strokeDashoffset = '1000';

  svg.appendChild(path);
  element.appendChild(svg);

  return animate(path as any, {
    strokeDashoffset: [1000, 0],
    duration: 2000,
    easing: 'linear',
    loop: true,
  } as any);
};

/**
 * Creates subtle quantum-style flicker effect with random delays
 * @param {HTMLElement} element - Target element
 * @return {Object} Anime.js animation instance
 */
export const quantumFlicker = (element: HTMLElement) => {
  return animate(element, {
    opacity: [1, 0.95, 1, 0.98, 1],
    translateX: [0, -1, 1, 0],
    filter: [
      'brightness(1) blur(0px)',
      'brightness(1.1) blur(0.5px)',
      'brightness(0.9) blur(0px)',
      'brightness(1) blur(0px)',
    ],
    duration: 200,
    loop: true,
    delay: () => Math.random() * 10000 + 5000,
  });
};
