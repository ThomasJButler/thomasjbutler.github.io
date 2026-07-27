/**
 * Burst channel for the Matrix rain.
 *
 * The rain is a singleton mounted in Layout, and a burst is fire-and-forget with
 * no render dependency, so this stays out of React state deliberately: putting it
 * in context would re-render the tree to deliver a message nothing renders from.
 */
type BurstListener = () => void;

const listeners = new Set<BurstListener>();

export function onBurst(listener: BurstListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Speed every column up by 2.2x for 800ms, decaying linearly. */
export function burstRain(): void {
  listeners.forEach((listener) => listener());
}
