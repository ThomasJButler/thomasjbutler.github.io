import { render, screen, waitFor } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Providers } from '@/Providers';
import { AppRoutes } from '../App';
import { Layout } from '../components/layout/Layout';

expect.extend(toHaveNoViolations);

/**
 * Render the whole shell, not a bare page.
 *
 * Landmark rules (landmark-one-main, page-has-heading-one) are about the document,
 * so a page fragment rendered on its own can never satisfy them — testing one would
 * either fail forever or force the rules off, which defeats the point.
 */
async function renderApp(route: string) {
  const result = render(
    <MemoryRouter initialEntries={[route]}>
      <Providers>
        <AppRoutes />
      </Providers>
    </MemoryRouter>
  );
  // Pages are lazy; wait for the route to resolve.
  await waitFor(() => expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument());
  return result;
}

describe('Accessibility Tests (WCAG AAA)', () => {
  test('HomePage meets WCAG standards', async () => {
    const { container } = await renderApp('/');

    const results = await axe(container, {
      rules: {
        'color-contrast-enhanced': { enabled: true },
        'heading-order': { enabled: true },
        'landmark-one-main': { enabled: true },
        'page-has-heading-one': { enabled: true },
      },
    });

    expect(results).toHaveNoViolations();
  });

  test('Layout has skip links for keyboard navigation', () => {
    const { container } = render(
      <MemoryRouter>
        <Providers>
          <Layout />
        </Providers>
      </MemoryRouter>
    );

    const skipLink = container.querySelector('[href="#main"], [href="#content"], .skip-link');
    expect(skipLink).toBeTruthy();
  });

  test('the skip link targets a focusable main landmark', () => {
    const { container } = render(
      <MemoryRouter>
        <Providers>
          <Layout />
        </Providers>
      </MemoryRouter>
    );

    const skipLink = container.querySelector<HTMLAnchorElement>('.skip-link');
    const target = container.querySelector<HTMLElement>('#main-content');

    expect(skipLink?.getAttribute('href')).toBe('#main-content');
    expect(target).toBeTruthy();
    // Without tabIndex, Chrome and Safari scroll to the target but never move focus,
    // so the skip link looks correct and does nothing.
    expect(target?.getAttribute('tabindex')).toBe('-1');
  });

  test('Color contrast meets enhanced standards', () => {
    // Matrix green on near-black, the core palette pairing.
    const contrast = (l1: number, l2: number) => (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    const green = 0.7152 * 1.0; // #00ff00 relative luminance
    const black = 0;
    expect(contrast(green, black)).toBeGreaterThan(7);
  });
});

/*
 * Not tested here: minimum touch-target size (WCAG 2.5.5) and visible focus
 * indicators. Both need real layout and real paint — jsdom returns 0x0 from
 * getBoundingClientRect and '' from getComputedStyle().outline, so an assertion
 * here would pass unconditionally and prove nothing. They are covered in
 * e2e/a11y.spec.ts against a real browser.
 */
