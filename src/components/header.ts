/**
 * Header Component for Thomas J Butler Portfolio
 * Provides consistent navigation across all pages
 */

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  icon?: string;
  tooltip?: string;
  className?: string;
}

export interface HeaderConfig {
  title: string;
  subtitle?: string;
  navigation: NavItem[];
}

export class Header {
  private config: HeaderConfig;
  private element: HTMLElement | null = null;
  private lastScrollTop = 0;
  private isMenuOpen = false;

  constructor(config: HeaderConfig) {
    this.config = config;
  }

  /**
   * Initialize the header component
   */
  init(): void {
    const headerRoot = document.getElementById('header-root');
    if (!headerRoot) {
      // Header root element not found - using existing header
      return;
    }

    this.element = this.createHeader();
    headerRoot.appendChild(this.element);
    
    this.attachEventListeners();
    this.setActiveNavItem();
  }

  /**
   * Create the header HTML structure
   */
  private createHeader(): HTMLElement {
    const header = document.createElement('header');
    header.innerHTML = `
      <div class="container">
        <div class="header-title">
          <h1>${this.config.title}</h1>
          ${this.config.subtitle ? `<h3>${this.config.subtitle}</h3>` : ''}
        </div>
        <nav>
          <button class="menu-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul>
            ${this.config.navigation.map(item => this.createNavItem(item)).join('')}
          </ul>
        </nav>
      </div>
    `;
    
    return header;
  }

  /**
   * Create individual navigation item
   */
  private createNavItem(item: NavItem): string {
    const external = item.external ? ' target="_blank" rel="noopener"' : '';
    const tooltip = item.tooltip ? ` data-tooltip="${item.tooltip}"` : '';
    const className = item.className ? ` class="${item.className}"` : '';
    const icon = item.icon ? `<i class="${item.icon}"></i>` : '';
    
    return `
      <li${className}${tooltip}>
        <a href="${item.href}"${external} data-text="${item.label}">
          ${item.label} |
          ${icon}
        </a>
      </li>
    `;
  }

  /**
   * Attach event listeners for header functionality
   */
  private attachEventListeners(): void {
    if (!this.element) return;

    // Menu toggle
    const menuToggle = this.element.querySelector('.menu-toggle') as HTMLButtonElement;
    const nav = this.element.querySelector('nav ul') as HTMLElement;
    
    if (menuToggle && nav) {
      menuToggle.addEventListener('click', () => {
        this.isMenuOpen = !this.isMenuOpen;
        menuToggle.classList.toggle('active');
        nav.classList.toggle('show');
        menuToggle.setAttribute('aria-expanded', this.isMenuOpen.toString());
        
        // Animate menu
        if (this.isMenuOpen) {
          nav.style.display = 'flex';
          setTimeout(() => {
            nav.style.opacity = '1';
            nav.style.transform = 'translateY(0) scale(1)';
          }, 10);
        } else {
          nav.style.opacity = '0';
          nav.style.transform = 'translateY(-10px) scale(0.95)';
          setTimeout(() => {
            if (!this.isMenuOpen) {
              nav.style.display = 'none';
            }
          }, 300);
        }
      });
    }

    // Scroll behavior with debouncing
    let scrollTimeout: number;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
      
      scrollTimeout = window.requestAnimationFrame(() => {
        this.handleScroll();
      });
    });

    // Close menu on escape
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMenu();
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e: MouseEvent) => {
      if (this.isMenuOpen && menuToggle && nav) {
        const target = e.target as HTMLElement;
        if (!menuToggle.contains(target) && !nav.contains(target)) {
          this.closeMenu();
        }
      }
    });
  }

  /**
   * Handle scroll events for header hide/show
   */
  private handleScroll(): void {
    if (!this.element) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Hide header on scroll down, show on scroll up
    if (scrollTop > this.lastScrollTop && scrollTop > 100) {
      this.element.style.transform = 'translateY(-100%)';
    } else {
      this.element.style.transform = 'translateY(0)';
    }
    
    // Add shadow on scroll
    if (scrollTop > 50) {
      this.element.classList.add('scrolled');
    } else {
      this.element.classList.remove('scrolled');
    }
    
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  /**
   * Close the mobile menu
   */
  private closeMenu(): void {
    if (!this.element) return;
    
    const menuToggle = this.element.querySelector('.menu-toggle') as HTMLButtonElement;
    const nav = this.element.querySelector('nav ul') as HTMLElement;
    
    if (menuToggle && nav) {
      this.isMenuOpen = false;
      menuToggle.classList.remove('active');
      nav.classList.remove('show');
      menuToggle.setAttribute('aria-expanded', 'false');
      nav.style.opacity = '0';
      nav.style.transform = 'translateY(-10px) scale(0.95)';
      setTimeout(() => {
        if (!this.isMenuOpen) {
          nav.style.display = 'none';
        }
      }, 300);
    }
  }

  /**
   * Set active state for current page navigation item
   */
  private setActiveNavItem(): void {
    if (!this.element) return;
    
    const currentPath = window.location.pathname;
    const navLinks = this.element.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href) {
        // Handle both exact matches and index.html as home
        const isActive = (currentPath.endsWith(href) || 
                         (href === 'index.html' && currentPath === '/') ||
                         (currentPath.endsWith('/') && href === 'index.html'));
        
        if (isActive) {
          link.classList.add('active');
          link.parentElement?.classList.add('active');
        }
      }
    });
  }

  /**
   * Update header configuration dynamically
   */
  updateConfig(config: Partial<HeaderConfig>): void {
    this.config = { ...this.config, ...config };
    if (this.element) {
      const headerRoot = this.element.parentElement;
      this.element.remove();
      this.element = this.createHeader();
      if (headerRoot) {
        headerRoot.appendChild(this.element);
      }
      this.attachEventListeners();
      this.setActiveNavItem();
    }
  }
}

// Default navigation configuration
export const defaultNavigation: NavItem[] = [
  { label: 'HOME', href: 'index.html' },
  { label: 'ABOUT', href: 'about.html', tooltip: 'Learn About Me' },
  { label: 'SKILLS', href: 'skills.html', tooltip: 'Check My Skills' },
  { label: 'PROJECTS', href: 'projects.html', tooltip: 'View My Projects' },
  { label: 'SERVICES', href: 'services.html', tooltip: 'Explore My Services' },
  { label: 'CONTACT', href: 'contact.html', tooltip: 'Get in Touch' }
];

// Special navigation items for specific pages
export const specialNavItems: NavItem[] = [
  { 
    label: 'GALLERIES', 
    href: '#galleries', 
    tooltip: 'View Galleries',
    className: 'galleries-link',
    icon: 'fas fa-images'
  },
  {
    label: 'APPS',
    href: 'https://aitomatic.co.uk/',
    external: true,
    tooltip: 'View My Apps'
  },
  {
    label: 'GAMES',
    href: 'https://the-matrix-arcade.vercel.app/',
    external: true,
    tooltip: 'Play My Games'
  },
  {
    label: 'ART GALLERY',
    href: 'art.html',
    tooltip: 'View Art Gallery'
  },
  {
    label: 'CUSTOM GPTS',
    href: 'https://gpt.builders/ThomasJButler',
    external: true,
    tooltip: 'View Custom GPTs'
  },
  {
    label: 'Version Time Travel',
    href: 'versionhistory.html',
    external: true,
    tooltip: 'View Version History',
    className: 'version-timetravel',
    icon: 'fas fa-rocket'
  }
];