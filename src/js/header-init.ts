/**
 * Header initialization for different pages
 * This file provides page-specific header configurations
 */

import { Header, defaultNavigation, specialNavItems, NavItem } from '../components/Header';

// Page-specific navigation configurations
const pageConfigs: Record<string, { title: string; subtitle?: string; navigation: NavItem[] }> = {
  index: {
    title: 'Thomas J Butler',
    subtitle: 'Full Stack Software Developer',
    navigation: [
      ...defaultNavigation.filter(item => item.label !== 'HOME'),
      {
        label: 'GALLERIES',
        href: '#galleries',
        tooltip: 'View Galleries',
        className: 'galleries-link',
        icon: 'fas fa-images'
      }
    ]
  },
  projects: {
    title: 'Thomas J Butler',
    subtitle: 'Full Stack Software Developer',
    navigation: defaultNavigation
  },
  about: {
    title: 'Thomas J Butler',
    subtitle: 'Full Stack Software Developer',
    navigation: defaultNavigation
  },
  default: {
    title: 'Thomas J Butler',
    subtitle: 'Full Stack Software Developer',
    navigation: defaultNavigation
  }
};

/**
 * Initialize header based on current page
 */
export function initializeHeader(): void {
  // Get current page from body class or filename
  const bodyClass = document.body.className;
  const currentFile = window.location.pathname.split('/').pop()?.replace('.html', '') || 'index';
  
  // Determine which config to use
  let configKey = 'default';
  if (bodyClass && pageConfigs[bodyClass]) {
    configKey = bodyClass;
  } else if (pageConfigs[currentFile]) {
    configKey = currentFile;
  }
  
  const config = pageConfigs[configKey];
  const header = new Header(config);
  header.init();
}

/**
 * Get header instance for a specific page
 */
export function getHeaderForPage(page: string): Header {
  const config = pageConfigs[page] || pageConfigs.default;
  return new Header(config);
}