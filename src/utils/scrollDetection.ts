/**
 * Scroll Detection Utility
 * Handles scroll-based header visibility and back-to-top button behavior
 * Compatible with both React and vanilla HTML pages
 */

interface ScrollDetectionOptions {
  headerSelector: string;
  backToTopSelector?: string;
  showThreshold: number;
  hideThreshold: number;
  backToTopThreshold: number;
  throttleMs: number;
}

interface ScrollState {
  isScrollingDown: boolean;
  isHeaderHidden: boolean;
  isBackToTopVisible: boolean;
  lastScrollY: number;
}

class ScrollDetection {
  private options: ScrollDetectionOptions;
  private state: ScrollState;
  private headerElement: HTMLElement | null = null;
  private backToTopElement: HTMLElement | null = null;
  private throttleTimer: number | null = null;
  private isInitialized = false;

  constructor(options: Partial<ScrollDetectionOptions> = {}) {
    this.options = {
      headerSelector: 'header',
      backToTopSelector: '#back-to-top',
      showThreshold: 100,
      hideThreshold: 200,
      backToTopThreshold: 300,
      throttleMs: 16, // ~60fps
      ...options
    };

    this.state = {
      isScrollingDown: false,
      isHeaderHidden: false,
      isBackToTopVisible: false,
      lastScrollY: 0
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.handleBackToTopClick = this.handleBackToTopClick.bind(this);
    this.createBackToTopButton = this.createBackToTopButton.bind(this);
  }

  /**
   * Initialize scroll detection
   */
  public init(): void {
    if (this.isInitialized) return;

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupElements());
    } else {
      this.setupElements();
    }

    this.isInitialized = true;
  }

  /**
   * Setup DOM elements and event listeners
   */
  private setupElements(): void {
    // Find header element
    this.headerElement = document.querySelector(this.options.headerSelector);
    if (!this.headerElement) {
      console.warn(`ScrollDetection: Header element '${this.options.headerSelector}' not found`);
      return;
    }

    // Create or find back-to-top button
    this.backToTopElement = document.querySelector(this.options.backToTopSelector!);
    if (!this.backToTopElement) {
      this.createBackToTopButton();
    }

    // Set initial state
    this.state.lastScrollY = window.scrollY;

    // Add scroll event listener
    window.addEventListener('scroll', this.handleScroll, { passive: true });

    // Set initial classes
    this.updateHeaderVisibility();
    this.updateBackToTopVisibility();
  }

  /**
   * Create Matrix-themed back-to-top button
   */
  private createBackToTopButton(): void {
    const button = document.createElement('button');
    button.id = 'back-to-top';
    button.className = 'back-to-top-button';
    button.setAttribute('aria-label', 'Back to top');
    button.setAttribute('title', 'Back to top');
    button.innerHTML = `
      <span class="back-to-top-icon">
        <i class="fas fa-chevron-up"></i>
      </span>
      <span class="back-to-top-text">TOP</span>
    `;

    // Add click handler
    button.addEventListener('click', this.handleBackToTopClick);

    // Append to body
    document.body.appendChild(button);
    this.backToTopElement = button;
  }

  /**
   * Handle scroll events with throttling
   */
  private handleScroll(): void {
    if (this.throttleTimer) return;

    this.throttleTimer = window.requestAnimationFrame(() => {
      this.updateScrollState();
      this.updateHeaderVisibility();
      this.updateBackToTopVisibility();
      this.throttleTimer = null;
    });
  }

  /**
   * Update scroll state based on current position
   */
  private updateScrollState(): void {
    const currentScrollY = window.scrollY;
    const scrollDifference = currentScrollY - this.state.lastScrollY;

    // Determine scroll direction with hysteresis
    if (scrollDifference > this.options.hideThreshold / 10) {
      this.state.isScrollingDown = true;
    } else if (scrollDifference < -(this.options.showThreshold / 10)) {
      this.state.isScrollingDown = false;
    }

    this.state.lastScrollY = currentScrollY;
  }

  /**
   * Update header visibility based on scroll state
   */
  private updateHeaderVisibility(): void {
    if (!this.headerElement) return;

    const currentScrollY = window.scrollY;
    const shouldHideHeader = this.state.isScrollingDown && 
                           currentScrollY > this.options.hideThreshold;

    if (shouldHideHeader && !this.state.isHeaderHidden) {
      this.state.isHeaderHidden = true;
      this.headerElement.classList.add('header-hidden');
      this.headerElement.setAttribute('aria-hidden', 'true');
    } else if (!shouldHideHeader && this.state.isHeaderHidden) {
      this.state.isHeaderHidden = false;
      this.headerElement.classList.remove('header-hidden');
      this.headerElement.removeAttribute('aria-hidden');
    }

    // Add scrolled class for enhanced shadow effect
    if (currentScrollY > 50) {
      this.headerElement.classList.add('scrolled');
    } else {
      this.headerElement.classList.remove('scrolled');
    }
  }

  /**
   * Update back-to-top button visibility
   */
  private updateBackToTopVisibility(): void {
    if (!this.backToTopElement) return;

    const currentScrollY = window.scrollY;
    const shouldShowButton = currentScrollY > this.options.backToTopThreshold;

    if (shouldShowButton && !this.state.isBackToTopVisible) {
      this.state.isBackToTopVisible = true;
      this.backToTopElement.classList.add('visible');
      this.backToTopElement.removeAttribute('aria-hidden');
    } else if (!shouldShowButton && this.state.isBackToTopVisible) {
      this.state.isBackToTopVisible = false;
      this.backToTopElement.classList.remove('visible');
      this.backToTopElement.setAttribute('aria-hidden', 'true');
    }
  }

  /**
   * Handle back-to-top button click
   */
  private handleBackToTopClick(): void {
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Track interaction for analytics (if needed)
    if (typeof gtag !== 'undefined') {
      gtag('event', 'back_to_top_click', {
        event_category: 'navigation',
        event_label: 'scroll_utility'
      });
    }
  }

  /**
   * Destroy the scroll detection instance
   */
  public destroy(): void {
    if (!this.isInitialized) return;

    // Remove event listeners
    window.removeEventListener('scroll', this.handleScroll);
    
    if (this.backToTopElement && this.backToTopElement.id === 'back-to-top') {
      this.backToTopElement.removeEventListener('click', this.handleBackToTopClick);
    }

    // Cancel any pending animation frame
    if (this.throttleTimer) {
      window.cancelAnimationFrame(this.throttleTimer);
      this.throttleTimer = null;
    }

    // Reset state
    this.isInitialized = false;
    this.headerElement = null;
    this.backToTopElement = null;
  }

  /**
   * Update options at runtime
   */
  public updateOptions(newOptions: Partial<ScrollDetectionOptions>): void {
    this.options = { ...this.options, ...newOptions };
  }

  /**
   * Get current scroll state (useful for debugging)
   */
  public getState(): ScrollState {
    return { ...this.state };
  }

  /**
   * Force update visibility (useful for programmatic control)
   */
  public forceUpdate(): void {
    this.updateScrollState();
    this.updateHeaderVisibility();
    this.updateBackToTopVisibility();
  }
}

// Create and export a singleton instance
export const scrollDetection = new ScrollDetection();

// Export the class for custom instances
export { ScrollDetection };

// Auto-initialize on legacy pages (non-React)
if (typeof window !== 'undefined' && !window.location.pathname.includes('index-react')) {
  // Delay initialization to ensure all other scripts have loaded
  setTimeout(() => {
    scrollDetection.init();
  }, 100);
}