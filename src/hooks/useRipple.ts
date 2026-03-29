import { useCallback, useRef, type MouseEvent } from 'react';

export function useRipple() {
  const containerRef = useRef<HTMLElement>(null);

  const createRipple = useCallback((e: MouseEvent<HTMLElement>) => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      border-radius: 50%;
      background: currentColor;
      opacity: 0.15;
      transform: scale(0);
      animation: ripple-expand 500ms ease-out forwards;
      pointer-events: none;
    `;

    el.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  }, []);

  return { containerRef, createRipple };
}
