// Entry point for projects page
import './scripts.ts';

// Import CSS files
import '../css/global.css';
import '../css/styles.css';
import '../css/projects.css';
import '../css/github-projects.css';

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

// GitHub Projects Tab Functionality
document.addEventListener('DOMContentLoaded', () => {
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