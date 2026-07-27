import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderWithProviders } from '@/test/utils';
import { MatrixRain } from '@/components/MatrixRain';
import { RainEngine } from '@/lib/fx/rain-engine';
import { setReducedMotion } from '@/test/setup';

/**
 * The morph gate, and the one bug it hid.
 *
 * `mouseout` bubbles. A window listener therefore fires whenever the pointer crosses out
 * of *any* element, not just out of the page, and scrolling under a stationary cursor
 * re-runs hit-testing and dispatches mouseout/mouseover with **no** following mousemove
 * to re-arm the pointer. The morph used to switch itself off mid-scroll and stay off
 * until the mouse was physically moved: the flagship effect, dead during the single most
 * common interaction on the site.
 */
describe('MatrixRain morph', () => {
  let clearPointer: ReturnType<typeof vi.spyOn>;
  let setPointer: ReturnType<typeof vi.spyOn>;

  /** Opens the gate: dark theme, fx on, motion allowed, and a real (fine) pointer. */
  function openTheGate() {
    setReducedMotion(false);
    localStorage.setItem('theme', 'dark');
    vi.spyOn(window, 'matchMedia').mockImplementation(
      (query: string) =>
        ({
          matches: query.includes('pointer: fine'),
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        }) as unknown as MediaQueryList
    );
  }

  beforeEach(() => {
    clearPointer = vi.spyOn(RainEngine.prototype, 'clearPointer');
    setPointer = vi.spyOn(RainEngine.prototype, 'setPointer');
  });

  afterEach(() => {
    clearPointer.mockRestore();
    setPointer.mockRestore();
    localStorage.clear();
  });

  it('tracks the pointer while the gate is open', () => {
    openTheGate();
    renderWithProviders(<MatrixRain />);

    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 120, clientY: 80 }));

    expect(setPointer).toHaveBeenCalledWith(120, 80);
  });

  it('does not drop the pointer when it merely crosses between elements', () => {
    openTheGate();
    renderWithProviders(<MatrixRain />);

    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 120, clientY: 80 }));
    clearPointer.mockClear();

    // What a scroll under a stationary cursor actually looks like: the pointer leaves one
    // element for another, so relatedTarget is a node, and no mousemove follows.
    window.dispatchEvent(
      new MouseEvent('mouseout', { relatedTarget: document.createElement('div') })
    );

    expect(clearPointer).not.toHaveBeenCalled();
  });

  it('drops the pointer when it genuinely leaves the window', () => {
    openTheGate();
    renderWithProviders(<MatrixRain />);

    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 120, clientY: 80 }));
    clearPointer.mockClear();

    // Leaving the window is the one case with a null relatedTarget.
    window.dispatchEvent(new MouseEvent('mouseout', { relatedTarget: null }));

    expect(clearPointer).toHaveBeenCalled();
  });

  it('attaches no pointer listeners at all when the gate is shut', () => {
    // Light theme shuts the gate; the listeners should never be attached, which is the
    // whole reason the morph is affordable.
    setReducedMotion(false);
    localStorage.setItem('theme', 'light');
    renderWithProviders(<MatrixRain />);

    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 120, clientY: 80 }));

    expect(setPointer).not.toHaveBeenCalled();
  });
});
