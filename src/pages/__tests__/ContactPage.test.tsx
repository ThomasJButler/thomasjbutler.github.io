import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { ContactPage } from '../ContactPage';

// Mock the useSEO hook
jest.mock('@hooks/useSEO', () => ({
  useSEO: jest.fn()
}));

// Mock fetch for form submission
global.fetch = jest.fn();

const renderContactPage = () => {
  return render(
    <BrowserRouter>
      <ContactPage />
    </BrowserRouter>
  );
};

describe('ContactPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true })
    });
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderContactPage();
      expect(screen.getByText('Get in Touch')).toBeInTheDocument();
    });

    it('renders the contact form with all required fields', () => {
      renderContactPage();
      
      expect(screen.getByLabelText(/name \*/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email \*/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/subject \*/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message \*/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    });

    it('renders contact information sections', () => {
      renderContactPage();
      
      expect(screen.getByText('York, UK')).toBeInTheDocument();
      expect(screen.getByText('+44 7903352059')).toBeInTheDocument();
      expect(screen.getByText('dev@thomasjbutler.me')).toBeInTheDocument();
    });

    it('renders video banner', () => {
      renderContactPage();
      
      const video = screen.getByRole('presentation');
      expect(video).toBeInTheDocument();
      expect(video).toHaveAttribute('autoPlay');
      expect(video).toHaveAttribute('muted');
      expect(video).toHaveAttribute('loop');
    });
  });

  describe('Form Validation', () => {
    it('shows validation errors for empty required fields', async () => {
      const user = userEvent.setup();
      renderContactPage();
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument();
        expect(screen.getByText('Email is required')).toBeInTheDocument();
        expect(screen.getByText('Subject is required')).toBeInTheDocument();
        expect(screen.getByText('Message is required')).toBeInTheDocument();
      });
    });

    it('validates email format', async () => {
      const user = userEvent.setup();
      renderContactPage();
      
      const emailInput = screen.getByLabelText(/email \*/i);
      await user.type(emailInput, 'invalid-email');
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      });
    });

    it('validates minimum length for fields', async () => {
      const user = userEvent.setup();
      renderContactPage();
      
      await user.type(screen.getByLabelText(/name \*/i), 'A');
      await user.type(screen.getByLabelText(/subject \*/i), 'Hi');
      await user.type(screen.getByLabelText(/message \*/i), 'Short');
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument();
        expect(screen.getByText('Subject must be at least 3 characters')).toBeInTheDocument();
        expect(screen.getByText('Message must be at least 10 characters')).toBeInTheDocument();
      });
    });

    it('clears validation errors when user starts typing', async () => {
      const user = userEvent.setup();
      renderContactPage();
      
      const nameInput = screen.getByLabelText(/name \*/i);
      const submitButton = screen.getByRole('button', { name: /send message/i });
      
      // Trigger validation error
      await user.click(submitButton);
      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument();
      });
      
      // Start typing to clear error
      await user.type(nameInput, 'John');
      await waitFor(() => {
        expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    it('submits form with valid data', async () => {
      const user = userEvent.setup();
      renderContactPage();
      
      // Fill in all required fields
      await user.type(screen.getByLabelText(/name \*/i), 'John Doe');
      await user.type(screen.getByLabelText(/email \*/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject \*/i), 'Test Subject');
      await user.type(screen.getByLabelText(/message \*/i), 'This is a test message that is long enough.');
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('https://formspree.io/f/xeoeenqv', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: 'John Doe',
            email: 'john@example.com',
            phone: '',
            subject: 'Test Subject',
            message: 'This is a test message that is long enough.'
          })
        });
      });
    });

    it('shows loading state during submission', async () => {
      const user = userEvent.setup();
      
      // Mock a delayed response
      (global.fetch as jest.Mock).mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve({ ok: true }), 100))
      );
      
      renderContactPage();
      
      // Fill in required fields
      await user.type(screen.getByLabelText(/name \*/i), 'John Doe');
      await user.type(screen.getByLabelText(/email \*/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject \*/i), 'Test Subject');
      await user.type(screen.getByLabelText(/message \*/i), 'This is a test message that is long enough.');
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);
      
      // Check loading state
      expect(screen.getByText('Sending message...')).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
      
      // Wait for submission to complete
      await waitFor(() => {
        expect(screen.queryByText('Sending message...')).not.toBeInTheDocument();
      });
    });

    it('shows success message on successful submission', async () => {
      const user = userEvent.setup();
      renderContactPage();
      
      // Fill in required fields
      await user.type(screen.getByLabelText(/name \*/i), 'John Doe');
      await user.type(screen.getByLabelText(/email \*/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject \*/i), 'Test Subject');
      await user.type(screen.getByLabelText(/message \*/i), 'This is a test message that is long enough.');
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Message sent successfully! I\'ll get back to you soon.')).toBeInTheDocument();
      });
    });

    it('shows error message on failed submission', async () => {
      const user = userEvent.setup();
      
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500
      });
      
      renderContactPage();
      
      // Fill in required fields
      await user.type(screen.getByLabelText(/name \*/i), 'John Doe');
      await user.type(screen.getByLabelText(/email \*/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject \*/i), 'Test Subject');
      await user.type(screen.getByLabelText(/message \*/i), 'This is a test message that is long enough.');
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Error sending message. Please try again.')).toBeInTheDocument();
      });
    });

    it('handles network errors gracefully', async () => {
      const user = userEvent.setup();
      
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));
      
      renderContactPage();
      
      // Fill in required fields
      await user.type(screen.getByLabelText(/name \*/i), 'John Doe');
      await user.type(screen.getByLabelText(/email \*/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject \*/i), 'Test Subject');
      await user.type(screen.getByLabelText(/message \*/i), 'This is a test message that is long enough.');
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Network error. Please check your connection and try again.')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper form labels and ARIA attributes', () => {
      renderContactPage();
      
      const nameInput = screen.getByLabelText(/name \*/i);
      const emailInput = screen.getByLabelText(/email \*/i);
      const subjectInput = screen.getByLabelText(/subject \*/i);
      const messageInput = screen.getByLabelText(/message \*/i);
      
      expect(nameInput).toHaveAttribute('required');
      expect(emailInput).toHaveAttribute('required');
      expect(subjectInput).toHaveAttribute('required');
      expect(messageInput).toHaveAttribute('required');
      
      expect(nameInput).toHaveAttribute('autoComplete', 'name');
      expect(emailInput).toHaveAttribute('autoComplete', 'email');
    });

    it('shows proper ARIA states for validation errors', async () => {
      const user = userEvent.setup();
      renderContactPage();
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        const nameInput = screen.getByLabelText(/name \*/i);
        expect(nameInput).toHaveAttribute('aria-invalid', 'true');
        expect(nameInput).toHaveAttribute('aria-describedby');
      });
    });

    it('has proper role attributes for alerts', async () => {
      const user = userEvent.setup();
      renderContactPage();
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        const errorMessage = screen.getByText('Name is required');
        expect(errorMessage).toHaveAttribute('role', 'alert');
      });
    });
  });

  describe('SEO', () => {
    it('calls useSEO hook with correct configuration', () => {
      const { useSEO } = require('@hooks/useSEO');
      renderContactPage();
      
      expect(useSEO).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Contact Thomas J Butler - Get In Touch',
          description: expect.stringContaining('Contact Thomas J Butler'),
          keywords: expect.stringContaining('contact')
        })
      );
    });
  });
});