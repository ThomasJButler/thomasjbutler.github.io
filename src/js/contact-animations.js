/**
 * Professional Contact Page Animations
 * Following design system guidelines - clean, smooth, no glitchy effects
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        return; // Skip animations for accessibility
    }

    // Professional Fade In Sequence for Headers
    anime({
        targets: '.contact-info h2, .contact-form-wrapper h2',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        easing: 'cubicBezier(0.4, 0, 0.2, 1)',
        delay: 200
    });

    // Smooth Section Reveal
    anime({
        targets: '.info-section',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        easing: 'cubicBezier(0.4, 0, 0.2, 1)',
        delay: anime.stagger(100, {start: 400})
    });

    // Elegant Availability List Animation
    anime({
        targets: '.availability-list li',
        opacity: [0, 1],
        translateX: [-20, 0],
        duration: 500,
        easing: 'cubicBezier(0.4, 0, 0.2, 1)',
        delay: anime.stagger(80, {start: 600})
    });

    // Form Elements Fade In
    anime({
        targets: '.form-group',
        opacity: [0, 1],
        translateY: [15, 0],
        duration: 500,
        easing: 'cubicBezier(0.4, 0, 0.2, 1)',
        delay: anime.stagger(60, {start: 500})
    });

    // Button Entrance Animation
    anime({
        targets: '.btn-submit-modern, .coffee-button',
        opacity: [0, 1],
        scale: [0.95, 1],
        duration: 600,
        easing: 'cubicBezier(0.68, -0.55, 0.265, 1.55)', // Subtle spring
        delay: 800
    });

    // Professional Hover Effects
    setupHoverAnimations();
    
    // Form Input Focus Animations
    setupFormAnimations();
});

/**
 * Setup hover animations for interactive elements
 */
function setupHoverAnimations() {
    // Coffee Button Hover
    const coffeeButton = document.querySelector('.coffee-button');
    if (coffeeButton) {
        coffeeButton.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                duration: 300,
                easing: 'cubicBezier(0.4, 0, 0.2, 1)'
            });
        });
        
        coffeeButton.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 300,
                easing: 'cubicBezier(0.4, 0, 0.2, 1)'
            });
        });
    }

    // Submit Button Hover
    const submitButton = document.querySelector('.btn-submit-modern');
    if (submitButton) {
        submitButton.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.02,
                duration: 300,
                easing: 'cubicBezier(0.4, 0, 0.2, 1)'
            });
        });
        
        submitButton.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 300,
                easing: 'cubicBezier(0.4, 0, 0.2, 1)'
            });
        });
    }

    // Availability List Item Hover
    const availabilityItems = document.querySelectorAll('.availability-list li');
    availabilityItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            anime({
                targets: this.querySelector('i'),
                scale: [1, 1.2],
                duration: 300,
                easing: 'cubicBezier(0.4, 0, 0.2, 1)'
            });
        });
        
        item.addEventListener('mouseleave', function() {
            anime({
                targets: this.querySelector('i'),
                scale: 1,
                duration: 300,
                easing: 'cubicBezier(0.4, 0, 0.2, 1)'
            });
        });
    });
}

/**
 * Setup form input animations
 */
function setupFormAnimations() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        // Focus animation
        input.addEventListener('focus', function() {
            const parent = this.closest('.form-group');
            
            anime({
                targets: parent,
                scale: [1, 1.01],
                duration: 300,
                easing: 'cubicBezier(0.4, 0, 0.2, 1)'
            });

            // Animate the label
            const label = parent.querySelector('label');
            if (label && !this.value) {
                anime({
                    targets: label,
                    translateY: [-10, -25],
                    scale: [1, 0.85],
                    duration: 300,
                    easing: 'cubicBezier(0.4, 0, 0.2, 1)'
                });
            }
        });
        
        // Blur animation
        input.addEventListener('blur', function() {
            const parent = this.closest('.form-group');
            
            anime({
                targets: parent,
                scale: 1,
                duration: 300,
                easing: 'cubicBezier(0.4, 0, 0.2, 1)'
            });

            // Reset label if input is empty
            const label = parent.querySelector('label');
            if (label && !this.value) {
                anime({
                    targets: label,
                    translateY: 0,
                    scale: 1,
                    duration: 300,
                    easing: 'cubicBezier(0.4, 0, 0.2, 1)'
                });
            }
        });
    });
}

/**
 * Professional text reveal animation for headers
 * Can be triggered on scroll or page load
 */
function revealText(selector) {
    const text = document.querySelector(selector);
    if (!text) return;
    
    // Split text into spans for each character
    text.innerHTML = text.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    
    anime({
        targets: `${selector} .letter`,
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 50,
        easing: 'cubicBezier(0.4, 0, 0.2, 1)',
        delay: anime.stagger(30)
    });
}

// Optional: Trigger text reveal on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            anime({
                targets: entry.target,
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 800,
                easing: 'cubicBezier(0.4, 0, 0.2, 1)'
            });
        }
    });
}, observerOptions);

// Observe elements that should animate on scroll
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});