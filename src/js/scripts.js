/**
 * @fileoverview Main script file for portfolio website with Matrix rain effect and interactive elements
 * @requires DOM elements: matrixCanvas, vincent-gallery, form elements, navigation elements
 * @author Thomas J Butler
 * @version 1.0.0
 *
 * @description
 * This script handles multiple interactive features:
 * - Matrix rain effect animation on non-art pages
 * - Text glitch effects on headings
 * - Scroll reveal animations
 * - Form validation
 * - Responsive navigation menu
 * - Van Gogh infinity gallery with 3D hover effects
 * - Lazy loading images
 * - Smooth scrolling
 * - Parallax effects
 * - Notification system
 *
 * Key variables and components:
 * 
 * @property {boolean} isArtPage - Determines if current page is art gallery
 * @property {HTMLCanvasElement} canvas - Matrix rain canvas element
 * @property {CanvasRenderingContext2D} ctx - Canvas context for drawing
 * @property {boolean} matrixEnabled - Controls matrix animation
 * @property {boolean} isVincentGalleryOpen - Controls gallery visibility
 * @property {number} frameCount - Tracks animation frames
 * @property {number} fadeAmount - Controls matrix fade effect
 * 
 * Main functions:
 * @function drawMatrix() - Renders matrix rain animation
 * @function glitchEffect() - Applies text glitch animation to elements
 * @function reveal() - Handles scroll reveal animations
 * @function openVincentGallery() - Shows Van Gogh gallery
 * @function closeVincentGallery() - Hides Van Gogh gallery
 * @function showNotification() - Displays notification messages
 *
 * Event listeners:
 * - Window resize: Updates canvas dimensions
 * - Scroll: Controls matrix fade and menu
 * - Mouse/touch: Interactive matrix effects
 * - Click: Toggles features and handles navigation
 *
 * To modify:
 * 1. Adjust fontSize and fadeAmount for different matrix effects
 * 2. Modify glitchChars for different glitch characters
 * 3. Change animation timings in setInterval calls
 * 4. Update notification styling in CSS
 * 5. Modify gallery hover sensitivity in applyHoverEffect
 */
// Check if current page is the art gallery page by looking for 'art.html' in URL
const isArtPage = window.location.pathname.includes('art.html');

// Matrix Rain Effect Setup
// Note: This will be replaced with landing page example in future
const canvas = document.getElementById('matrixCanvas'); // Get canvas element
let ctx; // Canvas context for drawing
let matrixEnabled = !isArtPage; // Enable matrix effect except on art page
let isVincentGalleryOpen = isArtPage; // Track if Van Gogh gallery is open
let frameCount = 0; // Counter for animation frames

// Get drawing context if canvas exists
if (canvas) {
    ctx = canvas.getContext('2d');
} else {
    console.log('Matrix canvas not found. This might be the art page.');
}

// Function to make canvas fullscreen and handle window resizing
function resizeCanvas() {
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
const columns = canvas ? canvas.width / fontSize : 0; // Calculate number of columns based on canvas width

// Initialize arrays for drop positions and colors
const drops = [];
const colors = [];
for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -(canvas ? canvas.height : 0); // Random starting positions above canvas
    // Assign colors: mostly green with rare cyan or red
    colors[i] = Math.random() < 0.99 ? '#0F0' : (Math.random() < 0.1 ? '#00FFFF' : '#FF2800');
}

// Control fade effect variables
let fadeInterval;
let fadeAmount = 0;

// Function to gradually increase fade effect
function setFadeInterval() {
    clearInterval(fadeInterval);
    fadeInterval = setInterval(() => {
        if (fadeAmount < 0.05) fadeAmount += 0.001;
    }, 100);
}

setFadeInterval();

// Main matrix drawing function
function drawMatrix() {
    if (!canvas || !matrixEnabled || isVincentGalleryOpen) return;

    // Create fade effect by drawing semi-transparent black rectangle
    ctx.fillStyle = `rgba(0, 0, 0, ${fadeAmount})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw each column of the matrix
    for (let i = 0; i < drops.length; i++) {
        // Randomly select character
        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillStyle = colors[i];
        ctx.font = `${fontSize}px monospace`;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Update drop positions every 3 frames
        if (frameCount % 3 === 0) {
            // Reset drops that reach bottom with small chance
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
                // Small chance to change color
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

// Animation loop function
function animate() {
    if (canvas) {
        drawMatrix();
        requestAnimationFrame(animate);
    }
}

// Start animation if not on art page
if (!isArtPage) {
    animate();
}

// Scroll event handler to control matrix fade
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    let st = window.pageYOffset || document.documentElement.scrollTop;
    // Increase fade when scrolling down, decrease when scrolling up
    if (st > lastScrollTop) {
        fadeAmount = Math.min(fadeAmount + 0.01, 0.05);
    } else {
        fadeAmount = Math.max(fadeAmount - 0.01, 0);
    }
    lastScrollTop = st <= 0 ? 0 : st;
    setFadeInterval();
});

// Interactive effects for matrix
if (canvas) {
    // Mouse interaction - drops follow cursor
    canvas.addEventListener('mousemove', (e) => {
        const x = Math.floor(e.clientX / fontSize);
        const y = Math.floor(e.clientY / fontSize);
        drops[x] = y;
    });

    // Touch interaction for mobile devices
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const x = Math.floor(touch.clientX / fontSize);
        const y = Math.floor(touch.clientY / fontSize);
        drops[x] = y;
    }, { passive: false });

    // Toggle matrix effect on click
    canvas.addEventListener('click', () => {
        matrixEnabled = !matrixEnabled;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Handle special setup for art page
    if (isArtPage) {
        const vincentGallery = document.querySelector('.vincent-gallery');
        if (vincentGallery) {
            vincentGallery.style.display = 'grid'; // Show the gallery grid
        }
        if (canvas) {
            canvas.style.display = 'none'; // Hide matrix canvas on art page
        }
    }

    // Add glitch and hover effects to all heading elements
    document.querySelectorAll('h1, h2, h3').forEach(heading => {
        // Add smooth transition for hover effect
        heading.style.transition = 'transform 0.3s ease-in-out';
        
        // Apply glitch effect on mouseover if not in cooldown
        heading.addEventListener('mouseover', () => {
            if (heading.dataset.cooldown !== 'true') {
                glitchEffect(heading);
                heading.dataset.cooldown = 'true';
            }
        });

        // Scale up heading on mouse enter
        heading.addEventListener('mouseenter', () => {
            heading.style.transform = 'scale(1.05)';
        });

        // Reset heading scale on mouse leave
        heading.addEventListener('mouseleave', () => {
            heading.style.transform = 'scale(1)';
        });
    });


    // Reveal elements when scrolling into view
    function reveal() {
        const reveals = document.querySelectorAll(".reveal");
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150; // Threshold for visibility
            
            // Add/remove 'active' class based on visibility
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add("active");
            } else {
                element.classList.remove("active");
            }
        });
    }

    // Add scroll event listener for reveal effect
    window.addEventListener("scroll", reveal);

    // Enable smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form validation handling
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Basic form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                form.submit();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Parallax scrolling effect for header background
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            const scrollPosition = window.scrollY;
            header.style.backgroundPositionY = -scrollPosition * 0.5 + 'px';
        }
    });

    // Interactive project grid items
    const projectItems = document.querySelectorAll('#projects .grid-item');
    projectItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    });

    // // Typewriter effect function
    function typeWriter(element, text, speed) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Apply typewriter effect to introduction text
    const introText = document.querySelector('#introduction p');
    if (introText) {
        const text = introText.innerHTML;
        introText.innerHTML = '';
        typeWriter(introText, text, 50);
    }

    // Add reveal class to all sections for animation
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal');
    });

    // Initialize reveal effect
    reveal();

    // Mobile navigation menu handling
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');
    const introduction = document.querySelector('#introduction');

    if (menuToggle && navUl) {
        // Toggle menu on button click
        menuToggle.addEventListener('click', function() {
            navUl.classList.toggle('show');
            menuToggle.classList.toggle('active');
            
            // Adjust introduction padding based on menu state
            introduction.style.paddingTop = navUl.classList.contains('show') ? '333px' : '30px';
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navUl.contains(e.target) && !menuToggle.contains(e.target)) {
                navUl.classList.remove('show');
                menuToggle.classList.remove('active');
                introduction.style.paddingTop = '30px';
            }
        });

        // Close menu on scroll
        window.addEventListener('scroll', function() {
            if (navUl.classList.contains('show')) {
                navUl.classList.remove('show');
                menuToggle.classList.remove('active');
                introduction.style.paddingTop = '30px';
            }
        });
    }

    // Lazy loading implementation for images
    const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }

    // Van Gogh Gallery functionality
    const vincentItems = document.querySelectorAll('.vincent-item');
    const vincentGallery = document.querySelector('.vincent-gallery');
    const openGalleryButton = document.querySelector('#open-vincent-gallery');
    const closeGalleryButton = document.querySelector('#close-vincent-gallery');

    // Gallery open/close functions
    function openVincentGallery() {
        isVincentGalleryOpen = true;
        matrixEnabled = false;
        if (canvas) canvas.style.display = 'none';
        if (vincentGallery) vincentGallery.style.display = 'grid';
    }

    function closeVincentGallery() {
        isVincentGalleryOpen = false;
        matrixEnabled = true;
        if (canvas) canvas.style.display = 'block';
        if (vincentGallery) vincentGallery.style.display = 'none';
    }

    // 3D hover effect for gallery items
    function applyHoverEffect(event) {
        if (!vincentGallery) return;
        const galleryRect = vincentGallery.getBoundingClientRect();
        const mouseX = (event.clientX - galleryRect.left) / galleryRect.width;
        const mouseY = (event.clientY - galleryRect.top) / galleryRect.height;

        vincentItems.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            const itemCenterX = (itemRect.left + itemRect.right) / 2 - galleryRect.left;
            const itemCenterY = (itemRect.top + itemRect.bottom) / 2 - galleryRect.top;

            const deltaX = mouseX * galleryRect.width - itemCenterX;
            const deltaY = mouseY * galleryRect.height - itemCenterY;

            const angleX = (deltaY / galleryRect.height) * 30;
            const angleY = (deltaX / galleryRect.width) * -30;

            item.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
    }

    // Reset gallery items to initial position
    function resetHoverEffect() {
        vincentItems.forEach(item => {
            item.style.transform = 'rotateX(0) rotateY(0)';
        });
    }

    // Add gallery event listeners
    if (openGalleryButton) {
        openGalleryButton.addEventListener('click', openVincentGallery);
    }
    if (closeGalleryButton) {
        closeGalleryButton.addEventListener('click', closeVincentGallery);
    }
    if (vincentGallery) {
        vincentGallery.addEventListener('mousemove', applyHoverEffect);
        vincentGallery.addEventListener('mouseleave', resetHoverEffect);
    }

    // Project Stack Functionality
    const projectCards = document.querySelectorAll('.project-card');
    let lastClickedCard = null;

    projectCards.forEach((card, index) => {
        // Add stacking order
        card.style.zIndex = 1000 - index;
        
        card.addEventListener('click', function(e) {
            // Prevent clicking links from toggling card
            if (e.target.closest('a')) return;
            
            // Close previously opened card
            if (lastClickedCard && lastClickedCard !== this) {
                lastClickedCard.classList.remove('active');
            }
            
            this.classList.toggle('active');
            lastClickedCard = this;

            // Matrix effect on card activation
            const chars = '101010101アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン010010101';
            const matrixEffect = document.createElement('div');
            matrixEffect.className = 'matrix-activation';
            this.appendChild(matrixEffect);
            
            // Clean up effect
            setTimeout(() => matrixEffect.remove(), 1000);

            // Scroll into view if needed
            if (this.classList.contains('active')) {
                this.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });

        // Add hover sound effect
        card.addEventListener('mouseenter', () => {
            playMatrixSound('hover');
        });
    });

    // Matrix sound effects
    function playMatrixSound(type) {
        const audio = new Audio();
        audio.volume = 0.1;
        switch(type) {
            case 'hover':
                audio.src = 'path/to/hover.mp3'; // Add your sound file
                break;
            case 'activate':
                audio.src = 'path/to/activate.mp3';
                break;
        }
        audio.play().catch(() => {}); // Ignore autoplay restrictions
    }

    // Handle escape key to close cards
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lastClickedCard) {
            lastClickedCard.classList.remove('active');
            lastClickedCard = null;
        }
    });
});

// Project Stack Enhancements
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        const header = card.querySelector('.project-header');
        
        // Only trigger on header click
        header.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Close other cards
            projectCards.forEach(otherCard => {
                if (otherCard !== card && otherCard.classList.contains('active')) {
                    otherCard.classList.remove('active');
                }
            });
            
            // Toggle current card
            card.classList.toggle('active');
            
            // Scroll into view with offset
            if (card.classList.contains('active')) {
                const offset = 100;
                const cardPosition = card.getBoundingClientRect().top;
                const offsetPosition = cardPosition + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
        
        // Add hover effect
        header.addEventListener('mouseenter', () => {
            if (!card.classList.contains('active')) {
                card.style.transform = 'translateX(1rem)';
            }
        });
        
        header.addEventListener('mouseleave', () => {
            if (!card.classList.contains('active')) {
                card.style.transform = 'none';
            }
        });
    });
    
    // Close active card on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            projectCards.forEach(card => {
                card.classList.remove('active');
            });
        }
    });
});

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    notification.offsetHeight; // Force reflow
    
    // Show notification
    notification.classList.add('show');
    
    // Remove notification after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

