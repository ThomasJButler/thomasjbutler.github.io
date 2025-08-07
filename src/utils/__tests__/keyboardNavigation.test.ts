import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { 
  initKeyboardNavigation, 
  trapFocus, 
  announceToScreenReader,
  isUsingKeyboard 
} from '../keyboardNavigation';

describe('keyboardNavigation', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    document.body.classList.remove('keyboard-nav');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('initKeyboardNavigation', () => {
    it('adds keyboard-nav class on Tab press', () => {
      initKeyboardNavigation();
      
      const event = new KeyboardEvent('keydown', { key: 'Tab' });
      document.dispatchEvent(event);
      
      expect(document.body.classList.contains('keyboard-nav')).toBe(true);
    });

    it('removes keyboard-nav class on mouse click', () => {
      initKeyboardNavigation();
      
      // First add keyboard-nav
      const tabEvent = new KeyboardEvent('keydown', { key: 'Tab' });
      document.dispatchEvent(tabEvent);
      expect(document.body.classList.contains('keyboard-nav')).toBe(true);
      
      // Then remove on mouse
      const mouseEvent = new MouseEvent('mousedown');
      document.dispatchEvent(mouseEvent);
      expect(document.body.classList.contains('keyboard-nav')).toBe(false);
    });

    it('adds skip link if not present', () => {
      initKeyboardNavigation();
      
      const skipLink = document.querySelector('.skip-to-content');
      expect(skipLink).toBeInTheDocument();
      expect(skipLink?.getAttribute('href')).toBe('#main-content');
    });

    it('does not duplicate skip link', () => {
      initKeyboardNavigation();
      initKeyboardNavigation(); // Call twice
      
      const skipLinks = document.querySelectorAll('.skip-to-content');
      expect(skipLinks).toHaveLength(1);
    });
  });

  describe('trapFocus', () => {
    it('traps focus within element', () => {
      const modal = document.createElement('div');
      modal.innerHTML = `
        <button class="first">First</button>
        <input type="text" />
        <button class="last">Last</button>
      `;
      document.body.appendChild(modal);

      const cleanup = trapFocus(modal);
      
      const firstButton = modal.querySelector('.first') as HTMLElement;
      const lastButton = modal.querySelector('.last') as HTMLElement;
      
      // Simulate Tab on last element
      lastButton.focus();
      const tabEvent = new KeyboardEvent('keydown', { 
        key: 'Tab', 
        shiftKey: false,
        bubbles: true 
      });
      modal.dispatchEvent(tabEvent);
      
      expect(cleanup).toBeInstanceOf(Function);
      cleanup();
    });

    it('dispatches close event on Escape', () => {
      const modal = document.createElement('div');
      modal.innerHTML = '<button>Close</button>';
      document.body.appendChild(modal);

      const closeHandler = vi.fn();
      modal.addEventListener('close', closeHandler);
      
      trapFocus(modal);
      
      const escapeEvent = new KeyboardEvent('keydown', { 
        key: 'Escape',
        bubbles: true 
      });
      modal.dispatchEvent(escapeEvent);
      
      expect(closeHandler).toHaveBeenCalled();
    });
  });

  describe('keyboard shortcuts', () => {
    beforeEach(() => {
      initKeyboardNavigation();
    });

    it('focuses search on / key', () => {
      const searchInput = document.createElement('input');
      searchInput.type = 'search';
      document.body.appendChild(searchInput);
      
      const focusSpy = vi.spyOn(searchInput, 'focus');
      
      const event = new KeyboardEvent('keydown', { key: '/' });
      document.dispatchEvent(event);
      
      expect(focusSpy).toHaveBeenCalled();
    });

    it('shows help modal on ? key', () => {
      const event = new KeyboardEvent('keydown', { key: '?', shiftKey: true });
      document.dispatchEvent(event);
      
      const helpModal = document.querySelector('.keyboard-help-modal');
      expect(helpModal).toBeInTheDocument();
      expect(helpModal?.getAttribute('role')).toBe('dialog');
    });

    it('ignores shortcuts when typing in input', () => {
      const input = document.createElement('input');
      document.body.appendChild(input);
      input.focus();
      
      const event = new KeyboardEvent('keydown', { 
        key: '/',
        target: input,
        bubbles: true 
      });
      input.dispatchEvent(event);
      
      // Should not prevent default since we're in an input
      expect(event.defaultPrevented).toBe(false);
    });
  });

  describe('announceToScreenReader', () => {
    it('creates and removes announcement element', async () => {
      announceToScreenReader('Test announcement');
      
      const announcement = document.querySelector('[role="status"]');
      expect(announcement).toBeInTheDocument();
      expect(announcement?.textContent).toBe('Test announcement');
      expect(announcement?.getAttribute('aria-live')).toBe('polite');
      
      // Wait for removal
      await new Promise(resolve => setTimeout(resolve, 1100));
      expect(document.querySelector('[role="status"]')).not.toBeInTheDocument();
    });

    it('uses assertive priority when specified', () => {
      announceToScreenReader('Urgent message', 'assertive');
      
      const announcement = document.querySelector('[role="status"]');
      expect(announcement?.getAttribute('aria-live')).toBe('assertive');
    });
  });

  describe('isUsingKeyboard', () => {
    it('returns correct keyboard navigation state', () => {
      initKeyboardNavigation();
      
      expect(isUsingKeyboard()).toBe(false);
      
      const tabEvent = new KeyboardEvent('keydown', { key: 'Tab' });
      document.dispatchEvent(tabEvent);
      expect(isUsingKeyboard()).toBe(true);
      
      const mouseEvent = new MouseEvent('mousedown');
      document.dispatchEvent(mouseEvent);
      expect(isUsingKeyboard()).toBe(false);
    });
  });
});