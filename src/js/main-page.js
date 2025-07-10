// Generic entry point for Vite pages
import './scripts.ts';
import { initializeHeader } from './header-init.ts';

// Import CSS files
import '../css/global.css';
import '../css/styles.css';
import '../css/header.css';

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
    console.log('Page initialized with Vite');
    initializeHeader();
  });
} else {
  console.log('Page initialized with Vite');
  initializeHeader();
}