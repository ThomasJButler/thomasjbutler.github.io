// Card animations using anime.js
import { animate, stagger } from 'animejs';

// Initialize card animations
export function initCardAnimations() {
    // Animate cards on page load
    animateCardsOnLoad();
    
    // Set up intersection observer for scroll animations
    setupScrollAnimations();
    
    // Add hover animations
    setupHoverAnimations();
}

// Initial card reveal animation
function animateCardsOnLoad() {
    // Expertise cards animation
    animate('.introduction-expertise-card', {
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 600,
        delay: stagger(100, {start: 200}),
        easing: 'easeOutQuad'
    });
    
    // Project cards animation
    animate('.project-card', {
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 800,
        delay: stagger(150, {start: 300}),
        easing: 'easeOutQuad'
    });
}

// Scroll-triggered animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                
                // Animate the card
                animate(entry.target, {
                    translateY: [20, 0],
                    opacity: [0, 1],
                    scale: [0.95, 1],
                    duration: 500,
                    easing: 'easeOutQuad'
                });
                
                // Animate child elements
                animate(entry.target.querySelectorAll('.introduction-expertise-tags span'), {
                    translateX: [-10, 0],
                    opacity: [0, 1],
                    duration: 400,
                    delay: stagger(50, {start: 300}),
                    easing: 'easeOutQuad'
                });
            }
        });
    }, observerOptions);
    
    // Observe all cards
    document.querySelectorAll('.introduction-expertise-card, .project-card').forEach(card => {
        observer.observe(card);
    });
}

// Hover animations
function setupHoverAnimations() {
    const cards = document.querySelectorAll('.introduction-expertise-card, .project-card');
    
    cards.forEach(card => {
        let hoverAnimation;
        
        card.addEventListener('mouseenter', () => {
            // Cancel any running animation
            if (hoverAnimation) hoverAnimation.pause();
            
            hoverAnimation = animate(card, {
                translateY: -8,
                scale: 1.02,
                duration: 300,
                easing: 'easeOutQuad'
            });
            
            // Glow effect
            animate(card, {
                boxShadow: ['0 4px 15px rgba(0, 255, 0, 0.2)', '0 8px 25px rgba(0, 255, 0, 0.4)'],
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            // Cancel any running animation
            if (hoverAnimation) hoverAnimation.pause();
            
            hoverAnimation = animate(card, {
                translateY: 0,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
            
            // Remove glow
            animate(card, {
                boxShadow: '0 4px 15px rgba(0, 255, 0, 0.2)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
}

// Performance optimization: Add will-change to cards
export function optimizeCardPerformance() {
    const cards = document.querySelectorAll('.introduction-expertise-card, .project-card');
    
    cards.forEach(card => {
        card.style.willChange = 'transform, opacity';
        
        // Remove will-change after animations complete
        setTimeout(() => {
            card.style.willChange = 'auto';
        }, 2000);
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCardAnimations);
} else {
    initCardAnimations();
}