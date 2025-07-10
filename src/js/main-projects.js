// Entry point for projects page
import './scripts.ts';

// Import CSS files
import '../css/global.css';
import '../css/styles.css';
import '../css/projects.css';

// Import GSAP and ScrollMagic as ES modules
import gsap from 'gsap';
import ScrollMagic from 'scrollmagic';
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap';

// Initialize ScrollMagic with GSAP
ScrollMagicPluginGsap(ScrollMagic, gsap);

// Make libraries available globally
window.gsap = gsap;
window.ScrollMagic = ScrollMagic;

console.log('Projects page initialized with Vite');