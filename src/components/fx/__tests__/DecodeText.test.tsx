import { StrictMode } from 'react';
import { describe, test, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DecodeText } from '../DecodeText';
import { setReducedMotion } from '@/test/setup';

afterEach(() => vi.restoreAllMocks());

describe('DecodeText', () => {
  test('the real text is in the accessibility tree, the scramble glyphs are not', () => {
    const { container } = render(<DecodeText as="h1" text="Hey, I'm Tom" />);

    // The heading's accessible name must be the real text at every moment, never a
    // half-decoded string of katakana.
    expect(screen.getByRole('heading', { level: 1 })).toHaveAccessibleName("Hey, I'm Tom");

    // Every per-character span lives inside an aria-hidden subtree.
    const glyphs = container.querySelectorAll('.ch');
    expect(glyphs.length).toBeGreaterThan(0);
    glyphs.forEach((glyph) => {
      expect(glyph.closest('[aria-hidden="true"]')).not.toBeNull();
    });
  });

  test('words are kept whole so a line cannot break mid-scramble', () => {
    const { container } = render(<DecodeText text="private local AI" />);
    expect(container.querySelectorAll('.ch-word')).toHaveLength(3);
  });

  test('under reduced motion it renders the final text and never starts a frame loop', () => {
    const raf = vi.spyOn(window, 'requestAnimationFrame');

    const { container } = render(<DecodeText text="Hey" />);

    expect(container.querySelector('[aria-hidden="true"]')?.textContent).toBe('Hey');
    expect(raf).not.toHaveBeenCalled();
  });

  test('reduced motion still reports done, so callers are not left waiting', () => {
    const onDone = vi.fn();
    render(<DecodeText text="Hey" onDone={onDone} />);
    expect(onDone).toHaveBeenCalledOnce();
  });

  test('render is pure: StrictMode double-render produces identical DOM', () => {
    // The prototype picked its scramble glyphs during render, so a double render
    // produced different output every time. This is the regression test for that.
    setReducedMotion(false);

    const { container: a } = render(
      <StrictMode>
        <DecodeText text="Hey, I'm Tom" />
      </StrictMode>
    );
    const first = a.innerHTML;

    const { container: b } = render(
      <StrictMode>
        <DecodeText text="Hey, I'm Tom" />
      </StrictMode>
    );

    expect(b.innerHTML).toBe(first);
  });
});
