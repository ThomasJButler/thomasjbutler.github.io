import { Zap, ZapOff } from 'lucide-react';
import { useFx } from '@/hooks/useFx';
import { useHydrated } from '@/hooks/useHydrated';
import { Button } from '@/components/ui/button';

/**
 * The in-page control WCAG 2.2.2 requires for the auto-playing rain.
 *
 * `fxEnabled` comes from localStorage and a media query, so the prerender has to guess at
 * it and guesses wrong for most people. Until hydration finishes this renders one fixed
 * state, matching what the server wrote, and then tells the truth. See useHydrated.
 */
export function MotionToggle() {
  const { fxEnabled, toggleFx } = useFx();
  const hydrated = useHydrated();
  const on = hydrated ? fxEnabled : true;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleFx}
      // A toggle button carries its state in aria-pressed and keeps a STABLE name. It used
      // to flip both at once: aria-pressed={!fxEnabled} (pressed when effects were OFF)
      // alongside a label that also inverted, which a screen reader announces as
      // contradictions like "Enable motion, pressed" while motion is disabled. Now
      // aria-pressed simply tracks whether effects are on, and the name never changes. The
      // visual tooltip stays actionable.
      aria-pressed={hydrated ? fxEnabled : undefined}
      aria-label="Motion and effects"
      title={on ? 'Reduce motion' : 'Enable motion'}
    >
      {on ? <Zap className="size-4" /> : <ZapOff className="size-4" />}
    </Button>
  );
}
