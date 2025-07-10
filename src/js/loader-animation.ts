/**
 * Enhanced Matrix-style loader animation using Anime.js
 */
import { animate, stagger, createTimeline, Timeline as AnimeTimeline } from 'animejs';

// Types
interface LoaderElements {
  loader: HTMLElement;
  terminal: HTMLElement;
  dots: NodeListOf<HTMLElement>;
  text: HTMLElement;
  progressBar: HTMLElement;
  matrixCodes: HTMLElement[];
}

// Cache loader elements
let elements: LoaderElements | null = null;
let timeline: AnimeTimeline | null = null;

/**
 * Initialize loader elements
 */
function initializeElements(): LoaderElements | null {
  const loader = document.querySelector('.page-loader') as HTMLElement;
  if (!loader) return null;

  const terminal = loader.querySelector('.loader-terminal') as HTMLElement;
  const dots = loader.querySelectorAll('.loader-dot') as NodeListOf<HTMLElement>;
  const text = loader.querySelector('.loader-text') as HTMLElement;
  const progressBar = loader.querySelector('.loader-progress-bar') as HTMLElement;
  const matrixCodes = Array.from(loader.querySelectorAll('.matrix-code')) as HTMLElement[];

  return { loader, terminal, dots, text, progressBar, matrixCodes };
}

/**
 * Create enhanced Matrix code rain
 */
export function createEnhancedMatrixRain(loader: HTMLElement): void {
  const characters = '01アイウエオカキクケコサシスセソタチツテト';
  const numberOfColumns = 20;
  
  // Clear existing codes
  loader.querySelectorAll('.matrix-code').forEach(el => el.remove());
  
  const codes: HTMLElement[] = [];
  
  for (let i = 0; i < numberOfColumns; i++) {
    const span = document.createElement('span');
    span.className = 'matrix-code';
    span.style.left = `${(i / numberOfColumns) * 100}%`;
    span.style.fontSize = `${14 + Math.random() * 10}px`;
    span.textContent = characters[Math.floor(Math.random() * characters.length)];
    span.style.opacity = '0';
    loader.appendChild(span);
    codes.push(span);
  }

  // Animate with stagger effect
  animate(codes, {
    translateY: ['-100vh', '100vh'],
    opacity: [
      { value: 0, duration: 300 },
      { value: 1, duration: 400 },
      { value: 1, duration: 1000 },
      { value: 0, duration: 300 }
    ],
    duration: 3000,
    delay: stagger(150, { start: 0 }),
    loop: true,
    easing: 'linear',
    onComplete: function() {
      // Change characters on loop
      codes.forEach(code => {
        code.textContent = characters[Math.floor(Math.random() * characters.length)];
      });
    }
  });
}

/**
 * Create the main loading animation timeline
 */
export function createLoaderTimeline(): AnimeTimeline {
  elements = initializeElements();
  if (!elements) return createTimeline();

  // Create main timeline
  timeline = createTimeline({
    defaults: {
      easing: 'easeOutExpo'
    },
    onComplete: function() {
      // Reset for next use
      resetLoader();
    }
  });

  // Reset initial states
  resetLoader();
  
  // 1. Terminal entrance
  timeline.add({
    targets: elements.terminal,
    scale: [0.8, 1],
    opacity: [0, 1],
    duration: 600,
    easing: 'easeOutBack'
  });

  // 2. Animate border glow (separate animation, not in timeline)
  animate(elements.terminal, {
    boxShadow: [
      '0 0 20px rgba(0, 255, 0, 0.2)',
      '0 0 50px rgba(0, 255, 0, 0.5)',
      '0 0 30px rgba(0, 255, 0, 0.3)'
    ],
    duration: 2000,
    loop: true,
    alternate: true,
    easing: 'easeInOutSine'
  });

  // 3. Dots animation with elastic bounce
  timeline.add({
    targets: elements.dots,
    scale: [0, 1],
    opacity: [0, 1],
    duration: 400,
    delay: stagger(100),
    easing: 'easeOutElastic'
  }, 200); // Start 200ms after previous

  // 4. Dots pulsing (separate animation for continuous loop)
  animate(elements.dots, {
    scale: [1, 1.3, 1],
    duration: 800,
    delay: stagger(100, { from: 'center' }),
    loop: true,
    easing: 'easeInOutQuad'
  });

  // 5. Text typewriter effect
  const textContent = 'ACCESSING SYSTEM';
  elements.text.textContent = '';
  
  timeline.add({
    targets: elements.text,
    opacity: 1,
    duration: 100,
    onComplete: function() {
      // Typewriter effect
      let charIndex = 0;
      const typeInterval = setInterval(() => {
        if (charIndex < textContent.length) {
          elements!.text.textContent += textContent[charIndex];
          charIndex++;
        } else {
          clearInterval(typeInterval);
        }
      }, 50);
    }
  }, 0); // Start immediately with previous

  // 6. Progress bar animation
  timeline.add({
    targets: elements.progressBar,
    scaleX: [0, 1],
    duration: 2000,
    easing: 'easeInOutQuart'
  }, 0); // Start immediately

  // 7. Add glitch effect
  timeline.add({
    targets: elements.terminal,
    translateX: [-2, 2, -2, 0],
    duration: 300,
    easing: 'steps(4)'
  }, 1500); // Start after 1.5s

  return timeline;
}

/**
 * Show the loader with animations
 */
export function showAnimatedLoader(): void {
  const loader = document.querySelector('.page-loader') as HTMLElement;
  if (!loader) {
    console.error('Loader element not found');
    return;
  }

  console.log('Showing animated loader');
  
  // Show loader
  loader.style.display = 'flex';
  // Force opacity to 1 to ensure visibility
  setTimeout(() => {
    loader.classList.add('active');
    loader.style.opacity = '1';
  }, 10);
  
  // Create Matrix rain
  createEnhancedMatrixRain(loader);
  
  // Start main timeline
  const tl = createLoaderTimeline();
  tl.play();
}

/**
 * Hide the loader with fade out
 */
export function hideAnimatedLoader(): void {
  if (!elements) return;

  // Pause ongoing animations
  if (timeline) timeline.pause();

  animate(elements.loader, {
    opacity: 0,
    duration: 300,
    easing: 'easeOutQuad',
    onComplete: function() {
      elements!.loader.classList.remove('active');
      elements!.loader.style.display = 'none';
      resetLoader();
    }
  });
}

/**
 * Reset loader to initial state
 */
function resetLoader(): void {
  if (!elements) return;
  
  // Reset styles manually since anime.js v4 doesn't have a set method
  elements.terminal.style.transform = 'scale(0.8) translateX(0)';
  elements.terminal.style.opacity = '0';
  
  elements.dots.forEach(dot => {
    dot.style.transform = 'scale(0)';
    dot.style.opacity = '0';
  });
  
  elements.progressBar.style.transform = 'scaleX(0)';
  
  elements.text.textContent = '';
}

/**
 * Add interactive mouse effects
 */
export function addLoaderInteractivity(): void {
  const loader = document.querySelector('.page-loader') as HTMLElement;
  if (!loader) return;

  loader.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = loader.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Influence Matrix rain direction
    const codes = loader.querySelectorAll('.matrix-code');
    codes.forEach((code, index) => {
      const distanceFromMouse = Math.abs(parseFloat(code.style.left) - x);
      const influence = Math.max(0, 1 - distanceFromMouse / 50);
      
      // Set translateX directly
      (code as HTMLElement).style.transform = `translateX(${(x - 50) * influence * 0.2}px)`;
    });
  });
}

// Export functions for use in main scripts
export default {
  showAnimatedLoader,
  hideAnimatedLoader,
  addLoaderInteractivity
};