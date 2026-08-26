import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Providers } from '@/Providers';
import { Header } from '../layout/Header';

function renderHeader() {
  return render(
    <BrowserRouter>
      <Providers>
        <Header />
      </Providers>
    </BrowserRouter>
  );
}

describe('Header', () => {
  it('renders the site title', () => {
    renderHeader();
    expect(screen.getByRole('link', { name: /thomas_butler/i })).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    renderHeader();
    const nav = screen.getByRole('navigation', { name: /main navigation/i });

    for (const label of ['Home', 'Projects', 'About', 'Dev Journey', 'Contact']) {
      expect(within(nav).getByRole('link', { name: label })).toBeInTheDocument();
    }
  });

  it('renders the mobile menu button', () => {
    renderHeader();
    expect(screen.getByRole('button', { name: /toggle menu/i })).toBeInTheDocument();
  });

  it('offers an in-page control to reduce motion', () => {
    renderHeader();
    expect(screen.getByRole('button', { name: /motion/i })).toBeInTheDocument();
  });
});
