import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useHydrated } from '@/hooks/useHydrated';
import { Button } from '@/components/ui/button';

/**
 * The theme comes from localStorage, so the prerender cannot know it and assumes dark.
 * Rendering the real icon during hydration would hand React a different <svg> than it
 * wrote and blow the whole tree away (see useHydrated). The theme *itself* is applied
 * before first paint by the inline script in index.html, so nothing flashes except,
 * briefly, this one icon.
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const hydrated = useHydrated();
  const dark = hydrated ? theme === 'dark' : true;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={(event) => {
        // The button's own centre rather than the pointer: a keyboard activation
        // reports clientX/clientY of 0, which would wipe from the top-left corner.
        const rect = event.currentTarget.getBoundingClientRect();
        toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }}
      aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}
      className="text-muted-foreground hover:text-primary"
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
}
