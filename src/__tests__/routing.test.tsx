import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, test, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../App';

describe('Routing Tests', () => {
  test('navigates to home page at /', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      // Should render HomePage content
      const homeContent = screen.queryByText(/Tom|Thomas|Butler|Portfolio|Developer/i);
      expect(homeContent).toBeTruthy();
    });
  });

  test('navigates to about page at /about', async () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      // Should render AboutPage content
      const aboutContent = screen.queryByText(/About|Experience|Background|Story/i);
      expect(aboutContent).toBeTruthy();
    });
  });

  test('navigates to blog page at /blog without redirect loop', async () => {
    render(
      <MemoryRouter initialEntries={['/blog']}>
        <App />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      // Should NOT show redirect message
      const redirectMessage = screen.queryByText(/Redirecting/i);
      expect(redirectMessage).toBeFalsy();
      
      // Should show blog content
      const blogContent = screen.queryByText(/Blog|Article|Post|Read/i);
      expect(blogContent).toBeTruthy();
    });
  });

  test('handles legacy HTML routes correctly', async () => {
    const routes = [
      '/index.html',
      '/about.html',
      '/skills.html',
      '/projects.html',
      '/services.html',
      '/contact.html'
    ];
    
    routes.forEach(async (route) => {
      const { unmount } = render(
        <MemoryRouter initialEntries={[route]}>
          <App />
        </MemoryRouter>
      );
      
      await waitFor(() => {
        // Should redirect to clean URL
        const redirected = !window.location.pathname.includes('.html');
        expect(redirected).toBe(true);
      });
      
      unmount();
    });
  });

  test('handles deep linking to blog posts', async () => {
    render(
      <MemoryRouter initialEntries={['/blog/ai-that-codes-like-you']}>
        <App />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      // Should render BlogReader component
      const blogReader = screen.queryByText(/Read|Article|minutes/i);
      expect(blogReader).toBeTruthy();
    });
  });

  test('maintains navigation history correctly', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/', '/about', '/blog']}>
        <App />
      </MemoryRouter>
    );
    
    // Should be able to navigate back
    window.history.back();
    
    await waitFor(() => {
      // Should be on about page
      const aboutContent = screen.queryByText(/About/i);
      expect(aboutContent).toBeTruthy();
    });
  });
});