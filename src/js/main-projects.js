// Entry point for projects page
import './scripts.ts';
import { initializeHeader } from './header-init.ts';

// Import main CSS file (includes all modular styles)
import '../css/main.css';
// Project-specific styles - keeping for layout
import '../css/projects-adjustments.css';
// Epic Matrix project styles
import '../css/projects-matrix.css';

// Import GSAP and ScrollMagic as ES modules
import gsap from 'gsap';
import ScrollMagic from 'scrollmagic';
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap';

// Initialize ScrollMagic with GSAP
ScrollMagicPluginGsap(ScrollMagic, gsap);

// Make libraries available globally
window.gsap = gsap;
window.ScrollMagic = ScrollMagic;

// Import epic Matrix animations
import './projects-matrix-animations.js';

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize header
    initializeHeader();
    
    // The Matrix animations will auto-initialize from the imported module
    
});