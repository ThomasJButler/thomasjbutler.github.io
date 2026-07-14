import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/test/utils';
import { AppRoutes } from '@/App';

describe('repro: PageTransition scroll-to-top on re-render of first route', () => {
  beforeEach(() => {
    (window.scrollTo as unknown as ReturnType<typeof vi.fn>).mockClear();
  });

  it('does not scroll to top when the theme toggle re-renders Layout on the landing route', async () => {
    const user = userEvent.setup();
    renderWithProviders(<AppRoutes />, { route: '/' });

    // wait for the lazy home route to land
    await waitFor(() => expect(document.querySelector('main')?.textContent).toBeTruthy(), {
      timeout: 5000,
    });

    const spy = window.scrollTo as unknown as ReturnType<typeof vi.fn>;
    spy.mockClear();

    const toggle = await screen.findByRole('button', { name: /switch to (light|dark) mode/i });
    await user.click(toggle);

    // eslint-disable-next-line no-console
    console.log('scrollTo calls after theme toggle:', JSON.stringify(spy.mock.calls));
    expect(spy.mock.calls.filter((c) => c[0] && (c[0] as { top?: number }).top === 0)).toEqual([]);
  });
});
