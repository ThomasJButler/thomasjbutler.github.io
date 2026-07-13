import { Zap, ZapOff } from 'lucide-react';
import { useFx } from '@/hooks/useFx';
import { Button } from '@/components/ui/button';

/**
 * The in-page control WCAG 2.2.2 requires for the auto-playing rain, and the
 * escape hatch for the custom cursor.
 */
export function MotionToggle() {
  const { fxEnabled, toggleFx } = useFx();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleFx}
      aria-pressed={!fxEnabled}
      aria-label={fxEnabled ? 'Reduce motion and effects' : 'Enable motion and effects'}
      title={fxEnabled ? 'Reduce motion' : 'Enable motion'}
    >
      {fxEnabled ? <Zap className="size-4" /> : <ZapOff className="size-4" />}
    </Button>
  );
}
