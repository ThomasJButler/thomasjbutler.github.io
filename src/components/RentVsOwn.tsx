import { RENT_VS_OWN } from '@/lib/content';
import { cn } from '@/lib/utils';

/**
 * The argument, made in colour.
 *
 * This replaces three green stat cards that said what you gain and never showed what you
 * are being saved *from*. "£0 per token" only lands on a reader who already agrees that
 * renting is a problem, and that is the reader who did not need convincing.
 *
 * Amber is the meter running; green is what you own. It is the only place the second hue
 * appears, which is what makes it mean something (see --meter in app.css). Put the two
 * columns side by side and the palette carries the argument before the words do.
 *
 * One component, rendered once. The same trio used to be written out four separate times
 * across Home, Services and the case study.
 */
function Column({
  label,
  points,
  tone,
}: {
  label: string;
  points: readonly { readonly value: string; readonly note: string }[];
  tone: 'meter' | 'own';
}) {
  const isMeter = tone === 'meter';
  return (
    <div
      className={cn(
        'rounded-xl border p-5',
        isMeter ? 'border-meter bg-meter-soft' : 'border-primary/25 bg-primary/[0.04]'
      )}
    >
      <p
        className={cn(
          'font-mono text-[10px] uppercase tracking-[0.18em]',
          isMeter ? 'text-meter' : 'text-primary'
        )}
      >
        {label}
      </p>

      <dl className="mt-4 space-y-4">
        {points.map((p) => (
          <div key={p.note}>
            <dt
              className={cn(
                'font-heading text-xl font-bold',
                isMeter ? 'glow-meter' : 'glow-text text-foreground'
              )}
            >
              {p.value}
            </dt>
            <dd className="mt-0.5 text-sm leading-snug text-muted-foreground">{p.note}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function RentVsOwn({ className }: { className?: string }) {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2', className)}>
      <Column label={RENT_VS_OWN.rent.label} points={RENT_VS_OWN.rent.points} tone="meter" />
      <Column label={RENT_VS_OWN.own.label} points={RENT_VS_OWN.own.points} tone="own" />
    </div>
  );
}
