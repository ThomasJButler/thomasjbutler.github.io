/**
 * Main script file for portfolio website with Matrix rain effect and interactive elements
 * @author Thomas J Butler
 * @version 2.0.0 - TypeScript Migration
 */

import { animate, stagger, createTimeline, eases } from 'animejs';

// Create anime wrapper function that matches v3 API
const anime = (params: any) => {
  return animate(params.targets, params);
};

// Add utility methods
anime.stagger = stagger;
anime.timeline = () => createTimeline();
anime.easing = eases;

// Make anime available globally
(window as any).anime = anime;

// Type definitions

interface GlitchOptions {
  iterations?: number;
  duration?: number;
  chars?: string;
}

interface NotificationOptions {
  type?: 'success' | 'error' | 'info';
  duration?: number;
}

// Matrix Rain Effect Setup
const canvas = document.getElementById('matrixCanvas') as HTMLCanvasElement | null;
let ctx: CanvasRenderingContext2D | null = null;
const matrixEnabled = true;
let frameCount = 0;

// Get drawing context if canvas exists
if (canvas) {
  ctx = canvas.getContext('2d');
}

// Function to make canvas fullscreen and handle window resizing
function resizeCanvas(): void {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}

// Initialize canvas size
resizeCanvas();

// Event listener to handle window resizing
window.addEventListener('resize', resizeCanvas);

// Define characters for matrix rain - mix of binary and Japanese katakana
const katakana = '101010101アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン010010101';
const characters = katakana.split('');

// Set up matrix display parameters
const fontSize = 14;
const columns = canvas ? Math.floor(canvas.width / fontSize) : 0;

// Initialize arrays for drop positions and colors
const drops: number[] = [];
const colors: string[] = [];
for (let i = 0; i < columns; i++) {
  drops[i] = Math.random() * -(canvas ? canvas.height : 0);
  colors[i] = Math.random() < 0.99 ? '#0F0' : (Math.random() < 0.1 ? '#00FFFF' : '#FF2800');
}

// Control fade effect variables
let fadeInterval: number | undefined;
let fadeAmount = 0;

// Function to gradually increase fade effect
function setFadeInterval(): void {
  clearInterval(fadeInterval);
  fadeInterval = window.setInterval(() => {
    if (fadeAmount < 0.05) fadeAmount += 0.001;
  }, 100);
}

setFadeInterval();

// Main matrix drawing function
function drawMatrix(): void {
  if (!canvas || !ctx || !matrixEnabled) return;

  // Create fade effect by drawing semi-transparent black rectangle
  ctx.fillStyle = `rgba(0, 0, 0, ${fadeAmount})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw each column of the matrix
  for (let i = 0; i < drops.length; i++) {
    const text = characters[Math.floor(Math.random() * characters.length)];
    ctx.fillStyle = colors[i];
    ctx.font = `${fontSize}px monospace`;
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    // Update drop positions every 3 frames
    if (frameCount % 3 === 0) {
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
        if (Math.random() < 0.05) {
          colors[i] = Math.random() < 0.5 ? '#00FFFF' : '#FF2800';
        } else {
          colors[i] = '#0F0';
        }
      }
      drops[i]++;
    }
  }

  frameCount++;
}

// FPS limiter for better performance
let lastFrameTime = 0;
const targetFPS = 30; // Limit to 30 FPS for better performance
const frameInterval = 1000 / targetFPS;

// Animation loop function with FPS limiting
function animateMatrix(currentTime: number = 0): void {
  if (!canvas) return;
  
  const deltaTime = currentTime - lastFrameTime;
  
  if (deltaTime >= frameInterval) {
    drawMatrix();
    lastFrameTime = currentTime - (deltaTime % frameInterval);
  }
  
  requestAnimationFrame(animateMatrix);
}

// Start animation
requestAnimationFrame(animateMatrix);

// Scroll event handler with parallax
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Parallax effect for Matrix canvas
  if (canvas) {
    const parallaxSpeed = 0.5;
    canvas.style.transform = `translateY(${scrollTop * parallaxSpeed}px)`;
  }
  
  // Control matrix fade based on scroll
  if (scrollTop > 100) {
    fadeAmount = Math.min(0.8, 0.05 + (scrollTop / 1000));
  } else {
    setFadeInterval();
  }
});

// Mobile menu toggle handled by header component

// Glitch effect for headings
function glitchEffect(element: HTMLElement, options: GlitchOptions = {}): void {
  const {
    duration = 50,
    chars = '!@#$%^&*()_+-=[]{}|;:,.<>?'
  } = options;
  
  const originalText = element.textContent || '';
  let iteration = 0;
  
  const interval = window.setInterval(() => {
    element.textContent = originalText
      .split('')
      .map((char, index) => {
        if (index < iteration) return originalText[index];
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join('');
    
    if (iteration >= originalText.length) {
      clearInterval(interval);
    }
    
    iteration++;
  }, duration);
}

// Glitch effect removed for more professional appearance
// Headings now have clean hover states defined in CSS

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function(this: HTMLAnchorElement, e: Event) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId && targetId !== '#') {
      const target = document.querySelector(targetId) as HTMLElement | null;
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Form validation
const contactForm = document.getElementById('contact-form') as HTMLFormElement | null;
if (contactForm) {
  contactForm.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    
    if (!email || !message) {
      showNotification('Please fill in all fields', { type: 'error' });
      return;
    }
    
    if (!validateEmail(email)) {
      showNotification('Please enter a valid email address', { type: 'error' });
      return;
    }
    
    // Simulate form submission
    showNotification('Message sent successfully!', { type: 'success' });
    contactForm.reset();
  });
}

// Email validation helper
function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Notification system
function showNotification(message: string, options: NotificationOptions = {}): void {
  const { type = 'info', duration = 3000 } = options;
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Trigger animation
  setTimeout(() => notification.classList.add('show'), 10);
  
  // Remove notification
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, duration);
}

// Interactive matrix effect on mouse/touch
if (canvas) {
  let mouseX = 0;
  let mouseY = 0;
  
  function handleInteraction(e: MouseEvent | TouchEvent): void {
    
    if (e instanceof MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    } else if (e.touches.length > 0) {
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY;
    }
    
    // Create ripple effect in matrix
    const column = Math.floor(mouseX / fontSize);
    const radius = 5;
    
    for (let i = Math.max(0, column - radius); i < Math.min(drops.length, column + radius); i++) {
      drops[i] = Math.floor(mouseY / fontSize);
      colors[i] = '#FFFFFF';
    }
  }
  
  canvas.addEventListener('mousemove', handleInteraction);
  canvas.addEventListener('touchmove', handleInteraction);
  
  canvas.addEventListener('mouseleave', () => {
  });
  
  canvas.addEventListener('touchend', () => {
  });
}

// Lazy loading for images
const lazyImages = document.querySelectorAll('img[data-src]') as NodeListOf<HTMLImageElement>;
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target as HTMLImageElement;
      img.src = img.dataset.src || '';
      img.removeAttribute('data-src');
      imageObserver.unobserve(img);
    }
  });
});

lazyImages.forEach((img) => imageObserver.observe(img));

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.reveal') as NodeListOf<HTMLElement>;
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach((el) => revealObserver.observe(el));

// Also handle sections that need to be revealed
const sections = document.querySelectorAll('section') as NodeListOf<HTMLElement>;
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // Don't unobserve so sections can animate when scrolling back
    } else {
      // Optional: remove active class when out of view
      // entry.target.classList.remove('active');
    }
  });
}, { threshold: 0.1 });

sections.forEach((section) => {
  // Add observer for all sections
  sectionObserver.observe(section);
  // Immediately activate sections that are already in view on load
  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    section.classList.add('active');
  }
});

// Mouse tracking for interactive effects
document.addEventListener('mousemove', (e: MouseEvent) => {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    if (x >= 0 && x <= 100 && y >= 0 && y <= 100) {
      section.style.setProperty('--mouse-x', `${x}%`);
      section.style.setProperty('--mouse-y', `${y}%`);
    }
  });
});

// Add keyboard navigation
document.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    // Close any open modals or reset states
    const nav = document.querySelector('nav ul') as HTMLElement | null;
    const menuToggle = document.querySelector('.menu-toggle') as HTMLElement | null;
    if (nav && menuToggle) {
      nav.classList.remove('show');
      menuToggle.classList.remove('active');
      nav.style.opacity = '0';
      nav.style.transform = 'translateY(-10px) scale(0.95)';
      setTimeout(() => {
        if (!nav.classList.contains('show')) {
          nav.style.display = 'none';
        }
      }, 300);
    }
  }
  
  // Test loader with 'L' key
  if (e.key === 'l' || e.key === 'L') {
    showPageLoader();
    setTimeout(() => {
      hidePageLoader();
    }, 3000);
  }
});

// Page loader functionality simplified - removed complex animations
function showPageLoader(): void {
  const loader = document.querySelector('.page-loader');
  if (loader) {
    loader.classList.add('active');
  }
}

function hidePageLoader(): void {
  const loader = document.querySelector('.page-loader');
  if (loader) {
    loader.classList.remove('active');
  }
}

// Intercept navigation links
document.querySelectorAll('a[href$=".html"]').forEach(link => {
  link.addEventListener('click', function(this: HTMLAnchorElement, e: Event) {
    const href = this.getAttribute('href');
    
    // Skip external links and hash links
    if (!href || href.startsWith('http') || href.startsWith('#')) return;
    
    e.preventDefault();
    showPageLoader();
    
    // Set flag for next page
    sessionStorage.setItem('navigating', 'true');
    
    // Navigate after showing loader
    setTimeout(() => {
      window.location.href = href;
    }, 300); // Reduced delay for better UX
  });
});

// Fix FOUC - show loader immediately on page load
document.addEventListener('DOMContentLoaded', () => {
  // Show loader immediately if coming from another page
  const isNavigating = sessionStorage.getItem('navigating') === 'true';
  if (isNavigating) {
    showPageLoader();
    sessionStorage.removeItem('navigating');
    
    // Hide loader after full animation duration
    setTimeout(() => {
      document.body.classList.add('loaded');
      hidePageLoader();
    }, 500); // Reduced for faster page loads
  } else {
    // Normal page load - just mark as loaded
    setTimeout(() => {
      document.body.classList.add('loaded');
    }, 100);
  }
});

// Ensure body is marked as loaded even if DOMContentLoaded already fired
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  const isNavigating = sessionStorage.getItem('navigating') === 'true';
  if (!isNavigating) {
    setTimeout(() => {
      document.body.classList.add('loaded');
    }, 100);
  }
}

// ============================================
// ANIME.JS INTERACTIVE FEATURES
// ============================================

// Initialize Anime.js animations when DOM is ready
function initAnimeAnimations(): void {
  // Staggered fade-in for project cards
  const projectCards = document.querySelectorAll('.project-card');
  if (projectCards.length > 0) {
    anime({
      targets: projectCards,
      opacity: [0, 1],
      translateY: [30, 0],
      scale: [0.95, 1],
      delay: anime.stagger(100, {start: 200}),
      duration: 800,
      easing: 'easeOutQuad'
    });
  }

  // Smooth number counter animation for stats
  const counters = document.querySelectorAll('.count');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target') || counter.textContent || '0');
    anime({
      targets: counter,
      textContent: [0, target],
      round: 1,
      duration: 2000,
      easing: 'easeInOutExpo'
    });
  });

  // Subtle button hover effect - removed particle animation
  document.querySelectorAll('.cta-button, .neo-matrix-btn, .matrix-btn').forEach(button => {
    button.addEventListener('mouseenter', () => {
      anime({
        targets: button,
        scale: 1.05,
        duration: 200,
        easing: 'easeOutQuad'
      });
    });
    
    button.addEventListener('mouseleave', () => {
      anime({
        targets: button,
        scale: 1,
        duration: 200,
        easing: 'easeOutQuad'
      });
    });
  });

  // Simple fade-in for headers - more professional
  const headers = document.querySelectorAll('h1, h2:not(.introduction-h2)');
  headers.forEach((header) => {
    anime({
      targets: header,
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 600,
      easing: 'easeOutQuad'
    });
  });

  // Smooth scroll indicator animation
  const scrollIndicators = document.querySelectorAll('.scroll-down');
  if (scrollIndicators.length > 0) {
    anime({
      targets: scrollIndicators,
      translateY: [0, 10],
      opacity: [1, 0.7],
      direction: 'alternate',
      loop: true,
      duration: 1500,
      easing: 'easeInOutSine'
    });
  }

  // Gallery item hover effect - simplified
  const galleryItems = document.querySelectorAll('.gallery-item, .introduction-img img');
  galleryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      anime({
        targets: item,
        scale: 1.02,
        duration: 300,
        easing: 'easeOutQuad'
      });
    });

    item.addEventListener('mouseleave', () => {
      anime({
        targets: item,
        scale: 1,
        duration: 300,
        easing: 'easeOutQuad'
      });
    });
  });
}

// Particle effect function removed for cleaner, more professional look

// Section reveal on scroll with anime
function initScrollReveal(): void {
  const sections = document.querySelectorAll('section:not(#introduction)');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('anime-revealed')) {
        entry.target.classList.add('anime-revealed');
        
        // Animate section content
        const content = entry.target.querySelectorAll('p, li, .card, .tech-item');
        anime({
          targets: content,
          opacity: [0, 1],
          translateY: [20, 0],
          delay: anime.stagger(50),
          duration: 600,
          easing: 'easeOutQuad'
        });
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => observer.observe(section));
}

// Initialize all anime animations when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initAnimeAnimations();
    initScrollReveal();
  });
} else {
  initAnimeAnimations();
  initScrollReveal();
}

// Export for use in other modules
export {
  drawMatrix,
  glitchEffect,
  showNotification,
  validateEmail,
  matrixEnabled,
  showPageLoader,
  hidePageLoader
};