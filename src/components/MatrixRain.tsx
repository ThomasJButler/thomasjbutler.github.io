import { useEffect, useRef } from 'react';
import { RainEngine } from '@/lib/fx/rain-engine';
import { onBurst } from '@/lib/rain-bus';
import { rafThrottle } from '@/utils/throttle';
import { useTheme } from '@/hooks/useTheme';
import { useAccent } from '@/hooks/useAccent';
import { useFx } from '@/hooks/useFx';

/**
 * The Matrix rain.
 *
 * Thin wrapper: the drawing lives in RainEngine. The engine is created once and
 * repainted imperatively, so changing theme or accent re-tints the palette without
 * tearing down the canvas and losing every drop's position.
 *
 * Deliberately has no pointer listeners. It used to part around the cursor and
 * ripple on click; both are gone. They made every mouse move do work on the main
 * thread while the draw loop was already running, which is exactly when the page
 * needs to feel responsive.
 */
export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<RainEngine | null>(null);
  const { theme } = useTheme();
  const { accent } = useAccent();
  const { motionOk } = useFx();

  // Light mode has its own hand-tuned palette, so an accent tint is dark-only.
  const tint = theme === 'dark' ? accent : null;

  // Read by the setup effect without making it a dependency: a theme change should
  // re-tint the palette, not tear down the canvas and restart every drop.
  const paletteRef = useRef({ theme, tint });
  paletteRef.current = { theme, tint };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let engine: RainEngine;
    try {
      // Density is decided inside the engine, per resize, so dragging a window down to
      // phone width actually thins the rain instead of keeping the desktop count.
      engine = new RainEngine(canvas, paletteRef.current);
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

    // Dragging a window edge fires resize continuously, and each one rebuilds every
    // drop and re-measures every glyph. Coalesce to one per frame.
    const onResize = rafThrottle(() => engine.resize());
    const onVisibility = () => (document.hidden ? engine.stop() : engine.start());

    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);
    const unsubscribe = onBurst(() => engine.burst());

    return () => {
      unsubscribe();
      onResize.cancel();
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
