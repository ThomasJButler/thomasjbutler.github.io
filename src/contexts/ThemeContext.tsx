import { createContext, useCallback, useEffect, useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';

type Theme = 'dark' | 'light';

/** Where the wipe starts from. Omitted (the command palette) means the middle. */
export interface WipeOrigin {
  x: number;
  y: number;
}

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme, origin?: WipeOrigin) => void;
  toggleTheme: (origin?: WipeOrigin) => void;
}

/**
 * Not in TypeScript's DOM lib in every version, and declaring it globally risks
 * clashing with a future one. A local cast keeps it to this file.
 */
type WithViewTransition = Document & {
  startViewTransition?: (callback: () => void) => unknown;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const stored = localStorage.getItem('theme') as Theme | null;
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  const applyTheme = useCallback((t: Theme) => {
    const root = document.documentElement;
    if (t === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);

  const setTheme = useCallback((t: Theme, origin?: WipeOrigin) => {
    const commit = () => {
      setThemeState(t);
      localStorage.setItem('theme', t);
      applyTheme(t);
    };

    const root = document.documentElement;
    const start = (document as WithViewTransition).startViewTransition;

    /*
     * Three ways to end up with the old instant switch, and all three are deliberate:
     * a browser without the API (Firefox today), an OS reduced-motion preference, and
     * the site's own effects toggle, which is the WCAG 2.2.2 control and has to govern
     * every animation on the page rather than just the rain.
     */
    const wipe =
      typeof start === 'function' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      !root.classList.contains('fx-off');

    if (!wipe) {
      commit();
      return;
    }

    const x = origin?.x ?? window.innerWidth / 2;
    const y = origin?.y ?? window.innerHeight / 2;
    // Reach the furthest corner, or the circle stops short and leaves a ring of the
    // old theme in the corner opposite the button.
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );
    root.style.setProperty('--vt-x', `${x}px`);
    root.style.setProperty('--vt-y', `${y}px`);
    root.style.setProperty('--vt-r', `${radius}px`);

    // flushSync, because the snapshot is taken when this callback returns. Without it
    // React commits afterwards and the toggle's own icon swaps a beat late.
    start.call(document, () => flushSync(commit));
  }, [applyTheme]);

  const toggleTheme = useCallback((origin?: WipeOrigin) => {
    setTheme(theme === 'dark' ? 'light' : 'dark', origin);
  }, [theme, setTheme]);

  // Apply on mount
  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
