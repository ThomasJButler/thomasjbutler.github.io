import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PageTransition } from '@/components/layout/PageTransition';

/**
 * The page must not scroll itself to the top while you are reading it.
 *
 * `hasEntered` is a module-scoped flag, so it stays true once any PageTransition in the
 * process has mounted. That is exactly the state a real second visit is in, and it is the
 * state these tests care about.
 */
function Harness() {
  const [n, setN] = useState(0);
  return (
    <div>
      <button onClick={() => setN((v) => v + 1)}>re-render parent</button>
      <PageTransition key="/">
        <p>count {n}</p>
      </PageTransition>
    </div>
  );
}

describe('PageTransition', () => {
  beforeEach(() => {
    vi.mocked(window.scrollTo).mockClear();
  });

  it('does not scroll to the top when the parent re-renders around it', async () => {
    const user = userEvent.setup();
    render(<Harness />);

    // Whatever happened on mount is not what this is about; a visitor has now scrolled.
    vi.mocked(window.scrollTo).mockClear();

    await user.click(screen.getByRole('button', { name: /re-render parent/i }));
    expect(await screen.findByText('count 1')).toBeInTheDocument();

    // The route did not change. Nothing may move the viewport.
    //
    // Before the fix this failed: `isFirst` was recomputed as `!hasEntered` on every render,
    // the mount effect flipped the module flag without re-rendering, and so the next render
    // of the same instance changed the layout effect's dependency array and fired scrollTo.
    // In the shipped app that meant toggling the theme, opening the palette, or simply
    // waiting 22 seconds for the white-rabbit timer threw the reader back to the top.
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it('still scrolls to the top when a new page mounts', () => {
    // A route change remounts PageTransition with a new key, and by then `hasEntered` is
    // true, so this instance is not the first page of the visit.
    render(
      <PageTransition key="/about">
        <p>about</p>
      </PageTransition>
    );

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'instant' });
  });

});
