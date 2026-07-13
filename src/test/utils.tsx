import type { ReactElement, ReactNode } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Providers } from '@/Providers';

interface Options extends Omit<RenderOptions, 'wrapper'> {
  /** Initial route for the MemoryRouter. */
  route?: string;
}

/**
 * Render inside the real provider stack plus a MemoryRouter.
 *
 * Use this instead of bare render() for anything that touches theme, motion, or
 * routing — which, given Layout mounts Header -> ThemeToggle, is almost everything.
 */
export function renderWithProviders(ui: ReactElement, { route = '/', ...options }: Options = {}) {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <MemoryRouter initialEntries={[route]}>
        <Providers>{children}</Providers>
      </MemoryRouter>
    );
  }
  return render(ui, { wrapper: Wrapper, ...options });
}

export * from '@testing-library/react';
