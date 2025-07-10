// Main entry point for Vite
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

// Initialize ScrollMagic with GSAP
ScrollMagicPluginGsap(ScrollMagic, gsap);

// Make libraries available globally for existing scripts
window.gsap = gsap;
window.ScrollMagic = ScrollMagic;

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio site initialized with Vite');
    initializeHeader();
  });
} else {
  console.log('Portfolio site initialized with Vite');
  initializeHeader();
}