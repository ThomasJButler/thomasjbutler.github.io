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

    // The visible layer is the glyph spans; the sizers are visibility:hidden and only hold
    // the slot open. Both carry the character, so read the glyphs specifically.
    const visible = [...container.querySelectorAll('.ch__glyph')].map((el) => el.textContent).join('');
    expect(visible).toBe('Hey');
    expect(raf).not.toHaveBeenCalled();
  });

  test('reduced motion renders the SAME shape the server writes: sizer plus glyph', () => {
    /*
     * The regression test for a bug that silently destroyed the entire prerender.
     *
     * DecodeText used to render a flat <span class="ch ch--locked"> under reduced motion and
     * a sizer/glyph pair otherwise. The server cannot know the preference: framer-motion's
     * useReducedMotion returns null during a Node prerender, so the build always wrote the
     * animated shape. A visitor with `prefers-reduced-motion: reduce` hydrated a structurally
     * different tree, React gave up (#418) and rebuilt the whole root from scratch, throwing
     * away the prerendered page it had just painted. It still *looked* fine, which is what
     * made it dangerous, and it punished precisely the people who had asked for a calmer,
     * cheaper page.
     *
     * Reduced motion is ON by default in this suite (see src/test/setup.ts), so this asserts
     * the reduced path directly. It cannot be written as a "both preferences agree" test:
     * framer-motion snapshots the media query once per process, so flipping it inside a
     * single test proves nothing at all.
     */
    const { container } = render(<DecodeText text="Hey" />);

    expect(container.querySelectorAll('.ch__sizer')).toHaveLength(3);
    expect(container.querySelectorAll('.ch__glyph')).toHaveLength(3);
    expect(container.querySelector('.ch--locked')).toBeNull();
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
