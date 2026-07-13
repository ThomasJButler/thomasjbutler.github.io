import { useEffect, useRef } from 'react';
import { RainEngine } from '@/lib/fx/rain-engine';
import { onBurst } from '@/lib/rain-bus';
import { useTheme } from '@/hooks/useTheme';
import { useAccent } from '@/hooks/useAccent';
import { useFx } from '@/hooks/useFx';

/**
 * Cursor-reactive Matrix rain.
 *
 * Thin wrapper: all the drawing lives in RainEngine. The engine is created once and
 * repainted imperatively, so changing theme or accent re-tints the palette without
 * tearing down the canvas and losing every drop's position.
 */
export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<RainEngine | null>(null);
  const { theme } = useTheme();
  const { accent } = useAccent();
  const { motionOk } = useFx();

  // Light mode has its own hard-coded palette, so an accent tint is dark-only.
  const tint = theme === 'dark' ? accent : null;

  // Read by the setup effect without making it a dependency: a theme change should
  // re-tint the palette, not tear down the canvas and restart every drop.
  const paletteRef = useRef({ theme, tint });
  paletteRef.current = { theme, tint };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Fewer columns where the CPU is likely weaker. At the opacity the rain runs on
    // small screens this is imperceptible, and pointer-parting is a mouse feature
    // anyway.
    const coarse = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;

    let engine: RainEngine;
    try {
      engine = new RainEngine(canvas, {
        ...paletteRef.current,
        density: coarse ? 0.6 : 0.95,
      });
    } catch {
      return; // no 2d context (jsdom, or a very old browser): render nothing
    }
    engineRef.current = engine;

    if (!motionOk) {
      // Presence without movement: one dim frame, no loop, no listeners.
      engine.drawStaticFrame();
      return () => {
        engine.destroy();
        engineRef.current = null;
      };
    }

    engine.start();

    const onMove = (e: MouseEvent) => engine.setPointer(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) engine.setPointer(t.clientX, t.clientY);
    };
    const onLeave = () => engine.clearPointer();
    const onDown = (e: MouseEvent) => engine.addRipple(e.clientX, e.clientY);
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) engine.addRipple(t.clientX, t.clientY);
    };
    const onResize = () => engine.resize();
    const onVisibility = () => (document.hidden ? engine.stop() : engine.start());

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('mouseout', onLeave);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);

    const unsubscribe = onBurst(() => engine.burst());

    return () => {
      unsubscribe();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('mouseout', onLeave);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      engine.destroy();
      engineRef.current = null;
    };
  }, [motionOk]);

  // Re-tint in place rather than rebuilding the engine.
  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;
    engine.setPalette(theme, tint);
    if (!motionOk) engine.drawStaticFrame();
  }, [theme, tint, motionOk]);

  return <canvas ref={canvasRef} aria-hidden="true" className="fx-rain" />;
}
