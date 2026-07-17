import { useEffect, useRef } from 'react';
import { useFx } from '@/hooks/useFx';
import { cn } from '@/lib/utils';

interface LoopVideoProps {
  src: string;
  poster: string;
  className?: string;
}

/**
 * A short brand loop that plays itself, and stops when the visitor has asked for less motion.
 *
 * Playback is driven by an effect rather than the `autoplay` attribute, for two reasons that
 * are easy to get wrong:
 *
 * 1. `autoplay` is only consulted while the browser is selecting the resource. Rendering
 *    `autoPlay={motionOk}` and letting it flip true after mount therefore does nothing at
 *    all: by then the element has already passed the point where the flag is read. Calling
 *    play() is the only thing that reliably starts it.
 * 2. `motionOk` folds together localStorage and a media query, so the server has to guess it.
 *    Emitting the attribute conditionally would mean the server and the hydrating client
 *    render different markup, which is React error #418: the whole tree gets thrown away and
 *    the prerender is silently undone. With no conditional attribute, both sides render the
 *    identical element and the effect (client-only by definition) decides what it does.
 *
 * `poster` is what makes the reduced-motion path work: a video that never plays shows its
 * poster frame, so the still is the fallback rather than a black rectangle. WCAG 2.2.2 wants
 * the visitor to be able to stop it; toggling effects off pauses and rewinds it.
 *
 * aria-hidden because the caption underneath already says what this shows, and because
 * role="presentation" is prohibited on <video> (axe: aria-allowed-role). The clips carry no
 * audio track, which also keeps the captions rule from firing.
 */
export function LoopVideo({ src, poster, className }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const { motionOk } = useFx();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (motionOk) {
      // Muted playback is allowed without a gesture, but a rejected promise here is not
      // worth breaking the page over: the poster is already a correct resting state.
      el.play().catch(() => {});
    } else {
      el.pause();
      el.currentTime = 0;
    }
  }, [motionOk]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
      width={480}
      height={270}
      className={cn('h-auto w-full rounded-lg border border-border bg-black', className)}
    />
  );
}
