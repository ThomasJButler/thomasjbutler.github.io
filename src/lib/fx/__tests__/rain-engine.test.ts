import { describe, test, expect } from 'vitest';
import {
  burstFactor,
  trailFade,
  partOffset,
  rippleBoost,
  GLYPHS,
  STREAM_MIN,
  STREAM_MAX,
  RADIUS,
  PART,
} from '../rain-engine';
import {
  RAIN_DARK,
  RAIN_LIGHT,
  resolvePalette,
  tintedPalette,
  mixRgb,
  hexToRgb,
} from '../rain-palettes';

/**
 * These lock the rain's visual contract so the engine can be optimised without anyone
 * having to eyeball whether it still looks right.
 *
 * The parting and ripple maths is the original signed-off version, restored verbatim.
 * It was cut once for performance and has now come back behind a gate — these tests
 * are what prove it came back unchanged.
 */

describe('burst', () => {
  test('adds 2.2x at the moment it fires', () => {
    expect(burstFactor(1000, 1000)).toBeCloseTo(2.2, 5);
  });

  test('decays linearly to zero over 800ms', () => {
    expect(burstFactor(1400, 1000)).toBeCloseTo(1.1, 5); // halfway
    expect(burstFactor(1800, 1000)).toBe(0);
    expect(burstFactor(2000, 1000)).toBe(0);
  });

  test('is inert before it has ever fired', () => {
    expect(burstFactor(0, -1e9)).toBe(0);
  });
});

describe('trail fade', () => {
  test('the head is the brightest glyph in the stream', () => {
    expect(trailFade(0, 30, 1)).toBeGreaterThan(trailFade(15, 30, 1));
    expect(trailFade(15, 30, 1)).toBeGreaterThan(trailFade(29, 30, 1));
  });

  test('it never fades to nothing, so the tail stays visible', () => {
    expect(trailFade(29, 30, 1)).toBeGreaterThan(0);
  });

  test('it scales with the drop brightness', () => {
    expect(trailFade(5, 30, 0.5)).toBeCloseTo(trailFade(5, 30, 1) * 0.5, 5);
  });
});

describe('pointer parting', () => {
  test('glyphs outside the radius are untouched', () => {
    expect(partOffset(50, RADIUS)).toBe(0);
    expect(partOffset(50, RADIUS + 1)).toBe(0);
  });

  test('displacement is sign(dx) * (1 - d/R)^2 * 26', () => {
    // Halfway in: (1 - 60/120)^2 = 0.25 -> 0.25 * 26 = 6.5
    expect(partOffset(60, 60)).toBeCloseTo(6.5, 5);
    // Mirrored on the other side of the pointer.
    expect(partOffset(-60, 60)).toBeCloseTo(-6.5, 5);
  });

  test('displacement peaks at PART right under the pointer', () => {
    expect(partOffset(1, 0)).toBeCloseTo(PART, 5);
  });

  test('falls off quadratically, not linearly', () => {
    // Quadratic: the value at half the radius is a quarter of the peak, not half.
    expect(partOffset(60, 60)).toBeCloseTo(partOffset(1, 0) / 4, 5);
  });
});

describe('click ripples', () => {
  test('the ring expands at 540 px/s', () => {
    // At 0.5s the ring sits at 270px, so a glyph exactly there is at peak boost.
    expect(rippleBoost(270, 0.5)).toBeCloseTo((1 - 0 / 50) * (1 - 0.5 / 1.15), 5);
  });

  test('glyphs outside the 50px band get nothing', () => {
    expect(rippleBoost(270 + 50, 0.5)).toBe(0);
    expect(rippleBoost(270 - 51, 0.5)).toBe(0);
  });

  test('boost decays over the 1.15s life', () => {
    const early = rippleBoost(540 * 0.2, 0.2);
    const late = rippleBoost(540 * 1.0, 1.0);
    expect(early).toBeGreaterThan(late);
    expect(rippleBoost(540 * 1.15, 1.15)).toBeCloseTo(0, 5);
  });

  test('never returns a negative boost past end of life', () => {
    expect(rippleBoost(540 * 2, 2)).toBe(0);
  });
});

describe('stream length', () => {
  test('is bounded, which is what keeps the frame cost bounded', () => {
    // A viewport-height trail is ~70 glyphs per column at 1080p; that is the
    // difference between ~9,000 and ~3,000 fillText calls per frame.
    expect(STREAM_MIN).toBeGreaterThan(0);
    expect(STREAM_MAX).toBeLessThanOrEqual(40);
    expect(STREAM_MAX).toBeGreaterThan(STREAM_MIN);
  });
});

describe('palettes', () => {
  test('dark and light match the handoff', () => {
    expect(RAIN_DARK.trail).toBe('0,210,90');
    expect(RAIN_DARK.head).toBe('200,255,205');
    expect(RAIN_DARK.spark).toBe('90,255,170');
    expect(RAIN_LIGHT.trail).toBe('22,120,60');
  });

  test('an accent tints the trail and lifts head and spark towards white', () => {
    const blue = tintedPalette('#2563eb');
    expect(blue.trail).toBe('37,99,235');
    expect(blue.head).toBe(mixRgb(hexToRgb('#2563eb'), [255, 255, 255], 0.78));
    expect(blue.spark).toBe(mixRgb(hexToRgb('#2563eb'), [255, 255, 255], 0.35));
  });

  test('light mode ignores the accent, because its palette is hand-tuned', () => {
    expect(resolvePalette('light', '#2563eb')).toEqual(RAIN_LIGHT);
    expect(resolvePalette('dark', null)).toEqual(RAIN_DARK);
  });
});

describe('glyphs', () => {
  test('the digit 6 is absent, as specified', () => {
    expect(GLYPHS).toContain('5');
    expect(GLYPHS).toContain('7');
    expect(GLYPHS).not.toContain('6');
  });
});
