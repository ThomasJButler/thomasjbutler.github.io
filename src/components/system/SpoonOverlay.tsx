import { useEffect } from 'react';
import { DecodeText } from '@/components/fx/DecodeText';
import { burstRain } from '@/lib/rain-bus';

/** The konami payoff. Dismisses itself after 3s, or on click. */
export function SpoonOverlay({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    burstRain();
    const timer = setTimeout(onDone, 3000);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDone();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
    };
  }, [onDone]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="There is no spoon"
      className="fx-spoon"
      onClick={onDone}
    >
      <h2 className="fx-spoon__title">
        <DecodeText text="THERE IS NO SPOON" step={70} window={340} />
      </h2>
      <p className="fx-spoon__sub">do not try and bend the spoon. that&apos;s impossible.</p>
    </div>
  );
}
