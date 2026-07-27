/** The house ease — every v5 transition uses it. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * CSS `steps(n, jump-none)` as an easing function.
 *
 * framer-motion doesn't export a steps easing, but `Transition.ease` accepts any
 * (t: number) => number, so we can reproduce the stutter the glitch-out relies on
 * without pulling in a dependency.
 */
export function steps(count: number) {
  return (t: number): number => Math.min(1, Math.floor(t * count) / (count - 1 || 1));
}

/** The page glitch-out stutters over 2 steps. */
export const STEPS_2 = steps(2);
