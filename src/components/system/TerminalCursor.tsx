import { useEffect, useRef } from 'react';
import { useFx } from '@/hooks/useFx';

/**
 * A caret block that tracks the pointer exactly, and a square ring that lags behind it.
 *
 * This replaces the native cursor (`cursor: none` on the body), which is the most
 * user-hostile thing in the design, so the gates matter more than the effect:
 *
 *  - fine pointer + hover only (never touch);
 *  - never under reduced motion, or when the user has switched effects off — there
 *    is no media query for "I enlarged my system cursor", so the in-page toggle is
 *    the only way those users get their pointer back;
 *  - never in forced-colors mode, where the custom cursor can render invisible and
 *    leave the user with no pointer at all;
 *  - the native I-beam is preserved over text fields (see .fx-cursor rules in app.css),
 *    because losing it destroys caret placement.
 *
 * If this effect ever unmounts, cleanup removes the class — otherwise a crash would
 * strand the user with no visible pointer.
 */
export function TerminalCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const { motionOk } = useFx();

  useEffect(() => {
    if (!motionOk) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(forced-colors: active)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const body = document.body;
    let x = 0;
    let y = 0;
    let ringX = 0;
    let ringY = 0;
    let raf = 0;
    let active = false;

    const activate = () => {
      if (active) return;
      active = true;
      body.classList.add('fx-cursor');
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    const onMove = (e: MouseEvent) => {
      activate();
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;

      const target = e.target as Element | null;
      const interactive = target?.closest('a, button, input, textarea, select, [role="button"]');
      ring.classList.toggle('is-hover', Boolean(interactive));
    };

    const onDown = () => ring.classList.add('is-down');
    const onUp = () => ring.classList.remove('is-down');

    // A keyboard user should never lose their pointer.
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') deactivate();
    };

    function deactivate() {
      active = false;
      body.classList.remove('fx-cursor');
      if (dot) dot.style.opacity = '0';
      if (ring) ring.style.opacity = '0';
    }

    const loop = () => {
      ringX += (x - ringX) * 0.16;
      ringY += (y - ringY) * 0.16;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('blur', deactivate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('blur', deactivate);
      body.classList.remove('fx-cursor');
    };
  }, [motionOk]);

  if (!motionOk) return null;

  return (
    <>
      <div ref={ringRef} className="fx-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="fx-cursor-dot" aria-hidden="true" />
    </>
  );
}
