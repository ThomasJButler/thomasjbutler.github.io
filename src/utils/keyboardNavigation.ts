/**
 * Keyboard navigation utilities for improved accessibility
 */

// Track keyboard navigation state
let isKeyboardNav = false;

/**
 * Initialize keyboard navigation detection
 */
export function initKeyboardNavigation(): void {
  // Detect keyboard usage
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (!isKeyboardNav) {
        isKeyboardNav = true;
        document.body.classList.add('keyboard-nav');
      }
    }
  });

  // Detect mouse usage
  document.addEventListener('mousedown', () => {
    if (isKeyboardNav) {
      isKeyboardNav = false;
      document.body.classList.remove('keyboard-nav');
    }
  });

  // Skip link removed - not needed for this site
  // addSkipLink();
  
  // Initialize focus trap utilities
  initFocusTrap();
  
  // Add keyboard shortcuts
  initKeyboardShortcuts();
}

/**
 * Add skip to content link for screen readers
 */
function addSkipLink(): void {
  const existingSkipLink = document.querySelector('.skip-to-content');
  if (existingSkipLink) return;

  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'skip-to-content';
  skipLink.textContent = 'Skip to main content';
  
  skipLink.addEventListener('click', (e) => {
    e.preventDefault();
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.tabIndex = -1;
      mainContent.focus();
      mainContent.removeAttribute('tabindex');
    }
  });

  document.body.insertBefore(skipLink, document.body.firstChild);
}

/**
 * Focus trap utility for modals and overlays
 */
export function trapFocus(element: HTMLElement): () => void {
  const focusableElements = element.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstFocusable = focusableElements[0] as HTMLElement;
  const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

  function handleTabKey(e: KeyboardEvent) {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable?.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable?.focus();
      }
    }
  }

  function handleEscapeKey(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      // Trigger close event
      element.dispatchEvent(new CustomEvent('close'));
    }
  }

  element.addEventListener('keydown', handleTabKey);
  element.addEventListener('keydown', handleEscapeKey);
  
  // Focus first element
  firstFocusable?.focus();

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleTabKey);
    element.removeEventListener('keydown', handleEscapeKey);
  };
}

/**
 * Initialize focus trap for modals
 */
function initFocusTrap(): void {
  // Auto trap focus for elements with data-trap-focus
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement && node.hasAttribute('data-trap-focus')) {
          trapFocus(node);
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

/**
 * Initialize keyboard shortcuts
 */
function initKeyboardShortcuts(): void {
  document.addEventListener('keydown', (e) => {
    // Skip if user is typing in an input
    if (e.target instanceof HTMLInputElement || 
        e.target instanceof HTMLTextAreaElement) {
      return;
    }

    // Keyboard shortcuts
    switch(e.key) {
      case '/':
        // Focus search if available
        e.preventDefault();
        const searchInput = document.querySelector<HTMLInputElement>('input[type="search"], input[name="search"]');
        searchInput?.focus();
        break;
        
      case 'g':
        if (e.ctrlKey || e.metaKey) {
          break; // Let browser handle Ctrl+G
        }
        // Go to shortcuts
        if (e.shiftKey) {
          switch(e.key) {
            case 'H':
              window.location.href = '/';
              break;
            case 'A':
              window.location.href = '/about';
              break;
            case 'P':
              window.location.href = '/projects';
              break;
            case 'C':
              window.location.href = '/contact';
              break;
          }
        }
        break;
        
      case '?':
        // Show keyboard shortcuts help
        if (e.shiftKey) {
          e.preventDefault();
          showKeyboardHelp();
        }
        break;
    }
  });
}

/**
 * Show keyboard shortcuts help
 */
function showKeyboardHelp(): void {
  const helpModal = document.createElement('div');
  helpModal.className = 'keyboard-help-modal';
  helpModal.setAttribute('role', 'dialog');
  helpModal.setAttribute('aria-label', 'Keyboard shortcuts');
  helpModal.setAttribute('data-trap-focus', 'true');
  
  helpModal.innerHTML = `
    <div class="keyboard-help-content">
      <h2>Keyboard Shortcuts</h2>
      <button class="close-button" aria-label="Close">&times;</button>
      <dl>
        <dt>/</dt>
        <dd>Focus search</dd>
        
        <dt>g then h</dt>
        <dd>Go to home</dd>
        
        <dt>g then a</dt>
        <dd>Go to about</dd>
        
        <dt>g then p</dt>
        <dd>Go to projects</dd>
        
        <dt>g then c</dt>
        <dd>Go to contact</dd>
        
        <dt>?</dt>
        <dd>Show this help</dd>
        
        <dt>Esc</dt>
        <dd>Close dialogs</dd>
      </dl>
    </div>
  `;

  const closeButton = helpModal.querySelector('.close-button');
  closeButton?.addEventListener('click', () => {
    helpModal.remove();
  });

  helpModal.addEventListener('close', () => {
    helpModal.remove();
  });

  document.body.appendChild(helpModal);
}

/**
 * Announce message to screen readers
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after announcement
  setTimeout(() => {
    announcement.remove();
  }, 1000);
}

/**
 * Get current keyboard navigation state
 */
export function isUsingKeyboard(): boolean {
  return isKeyboardNav;
}