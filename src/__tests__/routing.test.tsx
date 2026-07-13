import { render, screen, waitFor } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { Providers } from '@/Providers';
import { AppRoutes } from '../App';

/** Reports the resolved path so redirect assertions don't depend on rendered copy. */
function LocationProbe() {
  const location = useLocation();
  return <div data-testid="pathname">{location.pathname}</div>;
}

function renderAt(route: string) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Providers>
        <AppRoutes />
        <LocationProbe />
      </Providers>
    </MemoryRouter>
  );
}

const headingOf = async () =>
  (await screen.findByRole('heading', { level: 1 })).textContent ?? '';

describe('Routing', () => {
  test('renders the home page at /', async () => {
    renderAt('/');
    expect(await headingOf()).toMatch(/Tom/i);
  });

  test('renders the about page at /about', async () => {
    renderAt('/about');
    expect(await headingOf()).toMatch(/programming/i);
  });

  test('renders the dev journey at /updates', async () => {
    renderAt('/updates');
    expect(await headingOf()).toMatch(/dev journey/i);
  });

  test.each([
    ['/index.html', '/'],
    ['/about.html', '/about'],
    ['/skills.html', '/services'],
    ['/skills', '/services'],
    ['/projects.html', '/projects'],
    ['/services.html', '/services'],
    ['/contact.html', '/contact'],
    ['/sitemap', '/'],
  ])('redirects the legacy route %s to %s', async (from, to) => {
    renderAt(from);
    await waitFor(() => {
      expect(screen.getByTestId('pathname')).toHaveTextContent(to);
    });
  });

  test('shows the 404 page for an unknown route', async () => {
    // /blog was retired; anything unrouted must land on NotFound rather than
    // redirect-looping.
    renderAt('/blog');
    expect(await headingOf()).toMatch(/404|not found/i);
    expect(screen.queryByText(/redirecting/i)).toBeNull();
  });
});
