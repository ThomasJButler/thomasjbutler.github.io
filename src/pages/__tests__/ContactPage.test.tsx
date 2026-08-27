import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Providers } from '@/Providers';
import { ContactPage } from '../ContactPage';

/**
 * Rewritten from a Jest-era file that tested a ContactPage which never shipped:
 * it expected bespoke client-side validation copy ("Name is required"), a useSEO
 * hook, and a JSON request body. The real page relies on native HTML validation
 * and posts FormData to Formspree.
 */
function renderContactPage() {
  return render(
    <BrowserRouter>
      <Providers>
        <ContactPage />
      </Providers>
    </BrowserRouter>
  );
}

const FORMSPREE = 'https://formspree.io/f/xeoeenqv';

async function fillForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/name/i), 'John Doe');
  await user.type(screen.getByLabelText(/email/i), 'john@example.com');
  await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
  await user.type(screen.getByLabelText(/message/i), 'A test message, long enough to be real.');
}

describe('ContactPage', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders the heading and contact details', () => {
    renderContactPage();

    // "Get in Touch" became "Talk it through": one CTA vocabulary across the whole site.
    expect(screen.getByRole('heading', { level: 1, name: /talk it through/i })).toBeInTheDocument();
    expect(screen.getByText('Leeds, Yorkshire')).toBeInTheDocument();
    expect(screen.getByText('dev@thomasjbutler.me')).toBeInTheDocument();
  });

  it('renders every form field and the submit button', () => {
    renderContactPage();

    expect(screen.getByLabelText(/name/i)).toBeRequired();
    expect(screen.getByLabelText(/email/i)).toBeRequired();
    expect(screen.getByLabelText(/phone/i)).not.toBeRequired();
    expect(screen.getByLabelText(/subject/i)).toBeRequired();
    expect(screen.getByLabelText(/message/i)).toBeRequired();
    expect(screen.getByRole('button', { name: /send message/i })).toBeEnabled();
  });

  it('posts the form to Formspree and confirms on success', async () => {
    const user = userEvent.setup();
    renderContactPage();

    await fillForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => expect(fetch).toHaveBeenCalledOnce());

    const [url, init] = vi.mocked(fetch).mock.calls[0];
    expect(url).toBe(FORMSPREE);
    expect(init?.method).toBe('POST');
    expect(init?.body).toBeInstanceOf(FormData);
    expect((init?.body as FormData).get('email')).toBe('john@example.com');

    expect(await screen.findByText(/message sent/i)).toBeInTheDocument();
  });

  it('surfaces an error when the request fails', async () => {
    vi.mocked(fetch).mockResolvedValue({ ok: false } as Response);
    const user = userEvent.setup();
    renderContactPage();

    await fillForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('surfaces an error when the network throws', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('offline'));
    const user = userEvent.setup();
    renderContactPage();

    await fillForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
  });
});
