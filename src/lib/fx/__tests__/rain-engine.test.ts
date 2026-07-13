import { describe, test, expect } from 'vitest';
import { burstFactor, trailFade, GLYPHS, STREAM_MIN, STREAM_MAX } from '../rain-engine';
import {
  RAIN_DARK,
  RAIN_LIGHT,
  resolvePalette,
  tintedPalette,
  mixRgb,
  hexToRgb,
} from '../rain-palettes';

/**
 * These lock the rain's visual contract so the engine can be optimised without
 * anyone having to eyeball whether it still looks right.
 *
 * Pointer parting and click ripples were removed by request: they made every mouse
 * move do work on the main thread while the draw loop was running, and the page felt
 * laggy. Their tests went with them.
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
    expect(RAIN_LIGHT.trail).toBe('22,120,60');
  });

  test('an accent tints the trail and lifts the head towards white', () => {
    const blue = tintedPalette('#2563eb');
    expect(blue.trail).toBe('37,99,235');
    expect(blue.head).toBe(mixRgb(hexToRgb('#2563eb'), [255, 255, 255], 0.78));
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
