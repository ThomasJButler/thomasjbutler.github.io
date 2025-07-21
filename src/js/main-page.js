// Generic entry point for Vite pages
import './scripts.ts';
import { initializeHeader } from './header-init.ts';

// Import main CSS file (includes all modular styles)
import '../css/main.css';

// Note: Page-specific CSS is now imported in main.css
// Legacy dynamic imports kept for compatibility

// Import GSAP and ScrollMagic as ES modules
import gsap from 'gsap';
import ScrollMagic from 'scrollmagic';
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap';

// Import AOS if needed
import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize ScrollMagic with GSAP
ScrollMagicPluginGsap(ScrollMagic, gsap);

// Make libraries available globally for existing scripts
window.gsap = gsap;
window.ScrollMagic = ScrollMagic;
window.AOS = AOS;

// Initialize AOS
AOS.init();

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initializeHeader();
  });
} else {
  initializeHeader();
}