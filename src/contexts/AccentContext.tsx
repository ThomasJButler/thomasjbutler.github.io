import { createContext, useCallback, useState, type ReactNode } from 'react';

/**
 * The red/blue pill accent override.
 *
 * Deliberately orthogonal to ThemeContext: theme swaps the whole token set via the
 * `.dark` class, whereas an accent only overrides --primary/--ring (as inline custom
 * properties on the Layout root) and tints the rain. Red pill = null = whatever the
 * active theme's green already is.
 */
export const ACCENT_GREEN = '#16a34a';
export const ACCENT_BLUE = '#2563eb';

const STORAGE_KEY = 'v5:accent';

interface AccentContextValue {
  /** null when no override is active (the default green). */
  accent: string | null;
  setAccent: (accent: string | null) => void;
}

export const AccentContext = createContext<AccentContextValue | null>(null);

function getInitialAccent(): string | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === ACCENT_BLUE ? ACCENT_BLUE : null;
}

export function AccentProvider({ children }: { children: ReactNode }) {
  const [accent, setAccentState] = useState<string | null>(getInitialAccent);

  const setAccent = useCallback((next: string | null) => {
    // The green pill is the theme's own primary, so it is stored as "no override"
    // rather than as a hex — that keeps light mode's darker green intact.
    const normalised = next === ACCENT_GREEN ? null : next;
    setAccentState(normalised);
    if (normalised) {
      localStorage.setItem(STORAGE_KEY, normalised);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return (
    <AccentContext.Provider value={{ accent, setAccent }}>{children}</AccentContext.Provider>
  );
}
