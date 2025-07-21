// Entry point for projects page
import './scripts.ts';
import { initializeHeader } from './header-init.ts';

// Import main CSS file (includes all modular styles)
import '../css/main.css';
// Project-specific styles
import '../css/projects-adjustments.css';
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
    const cards = document.querySelectorAll('.introduction-expertise-card');
    
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
    
    // Image Modal Functionality
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalClose = document.querySelector('.image-modal-close');
    
    // Add click event to all project images
    const projectImages = document.querySelectorAll('.introduction-expertise-icon');
    projectImages.forEach(imageContainer => {
        imageContainer.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                const projectCard = this.closest('.introduction-expertise-card');
                const projectTitle = projectCard.querySelector('h3').textContent;
                
                modal.classList.add('active');
                setTimeout(() => modal.classList.add('show'), 10);
                modalImage.src = img.src;
                modalImage.alt = img.alt;
                modalTitle.textContent = projectTitle;
                
                // Prevent body scroll when modal is open
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal functionality
    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.classList.remove('active');
            modalImage.src = '';
            modalTitle.textContent = '';
            document.body.style.overflow = '';
        }, 300);
    }
    
    // Close modal when clicking X
    modalClose.addEventListener('click', closeModal);
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});