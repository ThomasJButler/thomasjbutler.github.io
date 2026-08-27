import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { Providers } from '@/Providers';
import { App } from '../App';

/**
 * Smoke test for the real app: BrowserRouter and all.
 *
 * Deliberately does NOT mock React.lazy. The previous version did, which fought
 * vi.mock hoisting and reached into React internals; findBy* lets Suspense resolve
 * on its own.
 */
describe('App', () => {
  test('mounts and renders the home page inside the shell', async () => {
    render(
      <Providers>
        <App />
      </Providers>
    );

    // A greeting again: the argument ("AI you own") went with the shelved offer.
    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent(/hey, i'm tom/i);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  test('mounts without a React error or warning', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <Providers>
        <App />
      </Providers>
    );
    await screen.findByRole('heading', { level: 1 });

    expect(errorSpy).not.toHaveBeenCalled();
    // Restore only this spy: vi.restoreAllMocks() would also reset the global
    // matchMedia mock installed in test/setup.ts.
    errorSpy.mockRestore();
  });
});
