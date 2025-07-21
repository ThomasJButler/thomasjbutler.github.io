// Entry point for projects page
import './scripts.ts';
import { initializeHeader } from './header-init.ts';

// Import main CSS file (includes all modular styles)
import '../css/main.css';
// Legacy project-specific styles (to be refactored)
import '../css/projects-horizontal-grid.css';
import '../css/projects-tabs.css';

// Import GSAP and ScrollMagic as ES modules
import gsap from 'gsap';
import ScrollMagic from 'scrollmagic';
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap';

// Initialize ScrollMagic with GSAP
ScrollMagicPluginGsap(ScrollMagic, gsap);

// Make libraries available globally
window.gsap = gsap;
window.ScrollMagic = ScrollMagic;

// Import horizontal grid functionality
import './projects-horizontal.js';

console.log('Projects page initialized with Vite');

// GitHub Projects Tab Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize header
    initializeHeader();
    
    const tabs = document.querySelectorAll('.tab-button');
    const cards = document.querySelectorAll('.github-card');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Filter cards
            const category = tab.getAttribute('data-category');
            
            cards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
});