// Main entry point for Vite
import './scripts.ts';

// Import main CSS file (includes all modular styles)
import '../css/main.css';

// Import GSAP and ScrollMagic as ES modules
import gsap from 'gsap';
import ScrollMagic from 'scrollmagic';
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap';

// Scroll detection is now handled by React components
// See src/components/BackToTop.tsx and src/components/Header.tsx

// Initialize ScrollMagic with GSAP
ScrollMagicPluginGsap(ScrollMagic, gsap);

// Make libraries available globally for existing scripts
window.gsap = gsap;
window.ScrollMagic = ScrollMagic;

// Header initialization is now handled by React components
// See src/components/Header.tsx