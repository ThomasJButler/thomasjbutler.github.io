# Animation System Documentation

## Overview
The Thomas J Butler portfolio uses a sophisticated animation system combining anime.js v4, CSS transitions, and custom React hooks to create smooth, performant animations that enhance user experience while maintaining accessibility.

## Core Technologies

### Animation Libraries
- **Anime.js v4.0.2**: Primary animation engine for complex sequences
- **CSS Transitions**: Micro-interactions and hover effects
- **RequestAnimationFrame**: Performance-critical animations
- **Intersection Observer**: Scroll-triggered animations

## Animation Architecture

### Unified State Management
The portfolio uses a unified state system to prevent animation conflicts, especially crucial for the 3D rotating cube showcase.

```typescript
// Unified rotation state example from HomePage.tsx
const rotationState = useRef({
  idle: { x: -15, y: 0 },
  scroll: { x: 0, y: 0, translateY: 0 },
  user: { x: 0, y: 0 },
  entrance: { scale: 1, translateY: 0 },
  isIdle: true,
  isUserControlled: false,
  lastInteraction: Date.now()
});

// Single update function combines all states
const updateCubeTransform = () => {
  if (!cubeRef.current) return;
  
  const state = rotationState.current;
  let transform = '';
  
  if (state.isUserControlled) {
    // User control takes priority
    transform = `rotateX(${state.user.x}deg) rotateY(${state.user.y}deg)`;
  } else if (state.isIdle) {
    // Combine idle and scroll effects
    const totalX = state.idle.x + state.scroll.x;
    const totalY = state.idle.y + state.scroll.y;
    const translateY = state.scroll.translateY;
    transform = `translateY(${translateY}px) rotateX(${totalX}deg) rotateY(${totalY}deg)`;
  }
  
  cubeRef.current.style.transform = transform;
};
```

## Animation Timing Standards

### Duration Scale
```css
/* Standardized durations for consistency */
--duration-fast: 150ms;     /* Quick feedback */
--duration-base: 300ms;     /* Standard transitions */
--duration-slow: 500ms;     /* Deliberate movements */
--duration-slower: 1000ms;  /* Major transitions */

/* Special effect durations */
--duration-entrance: 600ms;  /* Page entrance */
--duration-reveal: 700ms;    /* Content reveals */
--duration-epic: 1200ms;     /* Showcase animations */
```

### Easing Functions
```css
/* Smooth, natural movement */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0.0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-elastic: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

## Animation Patterns

### 1. Entrance Animations
Staggered cascade effect for page load:

```typescript
// Elements fade in with upward movement
const animatePageEntrance = () => {
  const elements = document.querySelectorAll('.animate-entrance');
  
  elements.forEach((el, index) => {
    animate(el as HTMLElement, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      delay: index * 100, // Stagger by 100ms
      easing: 'easeOutQuad'
    });
  });
};
```

### 2. Scroll Reveal Animations
Content appears as user scrolls:

```typescript
const useScrollReveal = ({ threshold = 0.2, once = true }) => {
  const ref = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(entry.target as HTMLElement, {
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 700,
            easing: 'easeOutQuart'
          });
          
          if (once) {
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, [threshold, once]);
  
  return ref;
};
```

### 3. Hover Interactions
Smooth scale and lift effects:

```typescript
const handleMouseEnter = (e: MouseEvent) => {
  animate(e.currentTarget as HTMLElement, {
    scale: 1.05,
    translateY: -5,
    duration: 300,
    easing: 'easeOutQuad'
  });
};

const handleMouseLeave = (e: MouseEvent) => {
  animate(e.currentTarget as HTMLElement, {
    scale: 1,
    translateY: 0,
    duration: 300,
    easing: 'easeOutQuad'
  });
};
```

### 4. Button Click Effects
Ripple and pulse animations:

```typescript
const handleClick = (e: MouseEvent) => {
  const btn = e.currentTarget as HTMLElement;
  
  // Pulse animation
  animate(btn, {
    scale: [1, 0.95, 1.05, 1],
    duration: 400,
    easing: 'easeOutElastic(1, .5)'
  });
  
  // Create ripple effect
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  btn.appendChild(ripple);
  
  animate(ripple, {
    scale: [0, 2],
    opacity: [1, 0],
    duration: 600,
    easing: 'easeOutQuad',
    complete: () => ripple.remove()
  });
};
```

### 5. 3D Rotations
Complex 3D transforms with smooth transitions:

```typescript
// Rotate cube to specific face
const rotateCube = (face: string) => {
  const rotations = {
    front: { x: 0, y: 0 },
    back: { x: 0, y: 180 },
    right: { x: 0, y: -90 },
    left: { x: 0, y: 90 },
    top: { x: -90, y: 0 },
    bottom: { x: 90, y: 0 }
  };
  
  const rotation = rotations[face];
  
  animate(cubeRef.current, {
    rotateX: rotation.x,
    rotateY: rotation.y,
    duration: 1000,
    easing: 'easeInOutQuart'
  });
};
```

## Custom Animation Hooks

### useMatrixAnimation
General-purpose animation hook:

```typescript
export const useMatrixAnimation = (
  ref: RefObject<HTMLElement>,
  options: AnimeParams
) => {
  useEffect(() => {
    if (!ref.current) return;
    
    const animation = animate(ref.current, {
      ...options,
      autoplay: false
    });
    
    // Play when element is visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animation.play();
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(ref.current);
    
    return () => {
      animation.pause();
      observer.disconnect();
    };
  }, [ref, options]);
};
```

### useScrollAnimation
Scroll-triggered animations with options:

```typescript
export const useScrollAnimation = ({
  threshold = 0.2,
  animationProps = {},
  once = true
}) => {
  const ref = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);
  
  useEffect(() => {
    const handleIntersection = ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting && (!once || !hasAnimated.current)) {
        animate(entry.target as HTMLElement, {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 600,
          easing: 'easeOutQuad',
          ...animationProps
        });
        hasAnimated.current = true;
      }
    };
    
    const observer = new IntersectionObserver(handleIntersection, {
      threshold
    });
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, [threshold, animationProps, once]);
  
  return ref;
};
```

### useCardAnimations
Specialized hook for card interactions:

```typescript
export const useCardAnimations = (cardRef: RefObject<HTMLElement>) => {
  const handleMouseEnter = useCallback(() => {
    if (!cardRef.current) return;
    
    animate(cardRef.current, {
      scale: 1.05,
      translateY: -10,
      duration: 300,
      easing: 'easeOutQuad'
    });
    
    // Add glow effect
    cardRef.current.style.boxShadow = '0 0 30px rgba(0, 255, 0, 0.5)';
  }, [cardRef]);
  
  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    
    animate(cardRef.current, {
      scale: 1,
      translateY: 0,
      duration: 300,
      easing: 'easeOutQuad'
    });
    
    cardRef.current.style.boxShadow = '';
  }, [cardRef]);
  
  const handleClick = useCallback(() => {
    if (!cardRef.current) return;
    
    animate(cardRef.current, {
      scale: [1, 0.95, 1.05, 1],
      duration: 400,
      easing: 'easeOutElastic(1, .5)'
    });
  }, [cardRef]);
  
  return { handleMouseEnter, handleMouseLeave, handleClick };
};
```

## Performance Optimization

### GPU Acceleration
Force hardware acceleration for smooth animations:

```css
.animated-element {
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}
```

### RequestAnimationFrame
Use RAF for smooth 60fps animations:

```typescript
let ticking = false;

const updateAnimation = () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      // Perform animation updates
      updateCubeTransform();
      ticking = false;
    });
    ticking = true;
  }
};

window.addEventListener('scroll', updateAnimation);
```

### Throttling
Limit expensive operations:

```typescript
const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

const throttledScroll = throttle(handleScroll, 16); // 60fps
```

## Accessibility

### Reduced Motion Support
Respect user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

React implementation:
```typescript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

const animationDuration = prefersReducedMotion ? 0 : 600;

animate(element, {
  opacity: [0, 1],
  duration: animationDuration
});
```

### Focus Animations
Ensure keyboard navigation is smooth:

```css
*:focus-visible {
  outline: 2px solid var(--matrix-cyan);
  outline-offset: 2px;
  transition: outline-offset 150ms ease;
}

*:focus-visible:active {
  outline-offset: 4px;
}
```

## Special Effects

### Matrix Rain
Canvas-based falling code effect:

```typescript
// Enhanced Matrix rain with variations
const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const columns = Math.floor(canvas.width / 14);
    
    const drops = Array(columns).fill(null).map(() => ({
      y: Math.random() * canvas.height,
      speed: Math.random() * 1.5 + 0.8,
      color: Math.random() < 0.85 ? '#0F0' : '#00FFFF',
      brightness: Math.random() * 0.5 + 0.5
    }));
    
    const draw = () => {
      // Fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw drops
      drops.forEach((drop, x) => {
        drop.y += drop.speed;
        
        if (drop.y > canvas.height && Math.random() > 0.97) {
          drop.y = 0;
          drop.speed = Math.random() * 1.5 + 0.8;
        }
        
        ctx.fillStyle = drop.color;
        ctx.fillText(
          String.fromCharCode(0x30A0 + Math.random() * 96),
          x * 14,
          drop.y
        );
      });
      
      requestAnimationFrame(draw);
    };
    
    draw();
  }, []);
  
  return <canvas ref={canvasRef} />;
};
```

### Glitch Effects
Random distortion animations:

```css
@keyframes glitch {
  0%, 100% {
    transform: translate(0);
    filter: hue-rotate(0deg);
  }
  20% {
    transform: translate(-2px, 2px);
    filter: hue-rotate(90deg);
  }
  40% {
    transform: translate(-2px, -2px);
    filter: hue-rotate(180deg);
  }
  60% {
    transform: translate(2px, 2px);
    filter: hue-rotate(270deg);
  }
  80% {
    transform: translate(2px, -2px);
    filter: hue-rotate(360deg);
  }
}

.glitch {
  animation: glitch 0.3s ease-in-out infinite;
}
```

### Particle Systems
Dynamic particle generation:

```typescript
const createParticles = (x: number, y: number) => {
  const particles = [];
  
  for (let i = 0; i < 10; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    document.body.appendChild(particle);
    
    const angle = (Math.PI * 2 * i) / 10;
    const velocity = 50 + Math.random() * 50;
    
    animate(particle, {
      translateX: Math.cos(angle) * velocity,
      translateY: Math.sin(angle) * velocity,
      scale: [1, 0],
      opacity: [1, 0],
      duration: 600,
      easing: 'easeOutQuad',
      complete: () => particle.remove()
    });
  }
};
```

## Testing Animations

### Visual Regression Testing
```typescript
describe('Animation Tests', () => {
  it('should complete entrance animation', async () => {
    const element = screen.getByTestId('animated-element');
    
    // Check initial state
    expect(element).toHaveStyle({ opacity: '0' });
    
    // Wait for animation
    await waitFor(() => {
      expect(element).toHaveStyle({ opacity: '1' });
    }, { timeout: 1000 });
  });
});
```

### Performance Testing
```typescript
const measureAnimationPerformance = () => {
  const startTime = performance.now();
  let frames = 0;
  
  const countFrames = () => {
    frames++;
    if (performance.now() - startTime < 1000) {
      requestAnimationFrame(countFrames);
    } else {
      console.log(`FPS: ${frames}`);
    }
  };
  
  countFrames();
};
```

## Best Practices

### Do's ✅
1. **Use CSS for simple transitions** - Better performance
2. **Batch DOM operations** - Reduce reflows
3. **Use transform over position** - GPU acceleration
4. **Implement loading states** - User feedback
5. **Test on real devices** - Ensure smooth performance
6. **Respect user preferences** - Accessibility first
7. **Keep durations under 500ms** - Snappy feel
8. **Use easing functions** - Natural movement

### Don'ts ❌
1. **Animate width/height** - Causes reflows
2. **Use setInterval for animations** - Use RAF instead
3. **Forget cleanup** - Memory leaks
4. **Overuse animations** - Less is more
5. **Block user interaction** - Keep it responsive
6. **Ignore performance** - Monitor FPS
7. **Use inline styles for animations** - Use classes
8. **Animate during scroll** - Throttle first

## Animation Debugging

### Chrome DevTools
1. **Performance tab**: Record animations
2. **Rendering tab**: Show FPS meter
3. **Animations tab**: Inspect and modify
4. **Layers tab**: Check GPU acceleration

### Console Helpers
```typescript
// Log animation state
const debugAnimation = (animation: AnimeInstance) => {
  console.log({
    progress: animation.progress,
    currentTime: animation.currentTime,
    duration: animation.duration,
    remaining: animation.remaining,
    reversed: animation.reversed,
    paused: animation.paused
  });
};

// Monitor FPS
const fpsMonitor = () => {
  let lastTime = performance.now();
  let frames = 0;
  
  const loop = () => {
    const now = performance.now();
    frames++;
    
    if (now >= lastTime + 1000) {
      console.log(`FPS: ${frames}`);
      frames = 0;
      lastTime = now;
    }
    
    requestAnimationFrame(loop);
  };
  
  loop();
};
```

## Future Enhancements

### Planned Features
1. **WebGL Integration**: More complex 3D effects
2. **WAAPI Migration**: Native browser animations
3. **Spring Physics**: More natural movements
4. **Gesture Support**: Touch and swipe
5. **Motion Paths**: SVG-based animations
6. **Parallax Layers**: Depth effects
7. **Morph Animations**: Shape transitions
8. **Timeline Control**: Scrubbing animations

---

*Last Updated: August 2025*
*Animation System v3.5*