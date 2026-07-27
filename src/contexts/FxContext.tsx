import { createContext, useCallback, useEffect, useState, type ReactNode } from 'react';

/**
 * Master switch for the cinematic layer: rain, custom cursor, boot intro, scanline
 * drift, decode sweeps.
 *
 * This exists for two reasons beyond taste:
 *
 *  - WCAG 2.2.2 (Pause, Stop, Hide) requires an in-page control for motion that
 *    starts automatically and runs for more than five seconds. The rain does.
 *    prefers-reduced-motion does not satisfy that success criterion on its own,
 *    because it is an OS setting rather than a control on the page.
 *  - It is the opt-out for the custom cursor. There is no media query for "the user
 *    has enlarged their system cursor", so an explicit switch is the only correct
 *    answer for anyone who needs their own pointer back.
 *
 * The OS preference still wins on first visit: if prefers-reduced-motion is set and
 * the user has never chosen, effects start off.
 */
const STORAGE_KEY = 'v5:fx';
const MORPH_KEY = 'v5:morph';

interface FxContextValue {
  fxEnabled: boolean;
  toggleFx: () => void;
  /**
   * The rain "morph": glyphs parting around the pointer, and click ripples.
   *
   * Separate from fxEnabled so it can be turned off on its own — it is the most
   * expensive part of the rain, and the only part that reacts to input.
   */
  morphEnabled: boolean;
  toggleMorph: () => void;
}

export const FxContext = createContext<FxContextValue | null>(null);

function getInitialFx(): boolean {
  if (typeof window === 'undefined') return false;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'on') return true;
  if (stored === 'off') return false;
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getInitialMorph(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(MORPH_KEY) !== 'off';
}

export function FxProvider({ children }: { children: ReactNode }) {
  const [fxEnabled, setFxEnabled] = useState<boolean>(getInitialFx);
  const [morphEnabled, setMorphEnabled] = useState<boolean>(getInitialMorph);

  useEffect(() => {
    document.documentElement.classList.toggle('fx-off', !fxEnabled);
  }, [fxEnabled]);

  const toggleFx = useCallback(() => {
    setFxEnabled((previous) => {
      const next = !previous;
      localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off');
      return next;
    });
  }, []);

  const toggleMorph = useCallback(() => {
    setMorphEnabled((previous) => {
      const next = !previous;
      localStorage.setItem(MORPH_KEY, next ? 'on' : 'off');
      return next;
    });
  }, []);

  return (
    <FxContext.Provider value={{ fxEnabled, toggleFx, morphEnabled, toggleMorph }}>
      {children}
    </FxContext.Provider>
  );
}
