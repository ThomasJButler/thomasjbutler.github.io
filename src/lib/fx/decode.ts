/** Glyphs a character cycles through before it resolves. Shorter than the rain set. */
export const SCRAMBLE = [...'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱ01<>*+=:'];

export type CharState = 'pending' | 'scramble' | 'locked';

export interface DecodeTiming {
  /** Delay before the first character starts. */
  delay: number;
  /** Stagger between characters, left to right. */
  step: number;
  /** How long each character scrambles before locking. */
  window: number;
}

/**
 * Which phase character `i` is in at `elapsed` ms.
 * Pure and injectable, so the sweep can be tested without a clock.
 */
export function charStateAt(i: number, elapsed: number, timing: DecodeTiming): CharState {
  const start = timing.delay + i * timing.step;
  if (elapsed < start) return 'pending';
  if (elapsed < start + timing.window) return 'scramble';
  return 'locked';
}

/** When the last character has locked and the animation can stop. */
export function decodeDuration(length: number, timing: DecodeTiming): number {
  return timing.delay + Math.max(0, length - 1) * timing.step + timing.window;
}

export interface SplitText {
  /** Every character, including the spaces between words. */
  chars: string[];
  /** [start, end) index ranges, one per word. */
  words: [number, number][];
}

/**
 * Split into characters, grouped by word.
 *
 * Words are grouped so each can be wrapped in an inline-block, nowrap span —
 * otherwise a line can break in the middle of a word mid-scramble and the text
 * jumps around as it resolves. Array.from, not split(''), so a surrogate pair
 * (an emoji in future copy) survives as one character.
 */
export function splitText(text: string): SplitText {
  const chars = Array.from(text);
  const words: [number, number][] = [];

  let start: number | null = null;
  chars.forEach((char, i) => {
    if (char === ' ') {
      if (start !== null) {
        words.push([start, i]);
        start = null;
      }
    } else if (start === null) {
      start = i;
    }
  });
  if (start !== null) words.push([start, chars.length]);

  return { chars, words };
}

export function randomScrambleChar(): string {
  return SCRAMBLE[(Math.random() * SCRAMBLE.length) | 0];
}
