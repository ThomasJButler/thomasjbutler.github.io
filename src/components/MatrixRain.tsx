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
 * The pointer morph (parting around the cursor, click ripples) is back, but it is
 * gated — see morphOk below. It was once removed outright for making every mouse move
 * do work on the main thread while the draw loop was already running. It is affordable
 * now because the rain itself is ~4x cheaper and because the gate means the listeners
 * do not exist at all unless the morph can actually be seen.
 */
export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<RainEngine | null>(null);
  const { theme } = useTheme();
  const { accent } = useAccent();
  const { motionOk, morphEnabled } = useFx();

  // Light mode has its own hand-tuned palette, so an accent tint is dark-only.
  const tint = theme === 'dark' ? accent : null;

  /**
   * The morph only runs in the dark theme, with the rain on, on a real pointer.
   *
   * That is not just taste. It means the pointer maths — and the mousemove listener —
   * simply don't exist in light mode, on a phone, under reduced motion, or when the
   * user has switched it off. The gate IS the optimisation.
   */
  const morphOk =
    motionOk &&
    morphEnabled &&
    theme === 'dark' &&
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: fine)').matches;

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

  /**
   * The morph: parting and click ripples.
   *
   * Its own effect, so flipping it (or the theme) attaches and detaches the pointer
   * listeners without tearing the canvas down. When it is off there are no pointer
   * listeners on the page at all, and the draw loop skips every distance calculation —
   * which is the whole reason it is safe to have back.
   */
  useEffect(() => {
    const engine = engineRef.current;
    if (!engine || !morphOk) return;

    engine.setMorph(true);

    const onMove = (e: MouseEvent) => engine.setPointer(e.clientX, e.clientY);
    const onDown = (e: MouseEvent) => engine.addRipple(e.clientX, e.clientY);

    // `mouseout` bubbles, so a window listener sees the pointer cross out of *any*
    // element, not just out of the page. That matters because scrolling under a
    // stationary cursor re-runs hit-testing and fires mouseout/mouseover with no
    // following mousemove to re-arm the pointer: the morph would switch itself off
    // mid-scroll and stay off until the mouse was physically jiggled. relatedTarget
    // is null only when the pointer has genuinely left the window.
    const onLeave = (e: MouseEvent) => {
      if (e.relatedTarget === null) engine.clearPointer();
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseout', onLeave);
    window.addEventListener('mousedown', onDown);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
      window.removeEventListener('mousedown', onDown);
      engine.setMorph(false);
    };
  }, [morphOk, motionOk]);

  return <canvas ref={canvasRef} aria-hidden="true" className="fx-rain" />;
}
