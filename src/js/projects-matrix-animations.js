// ==========================================================================
// EPIC MATRIX PROJECTS ANIMATIONS WITH ANIME.JS
// ==========================================================================

import anime from 'animejs';

console.log('🚀 EPIC Matrix animations script loaded!');

// Global animation controller
let animationController = {
    particles: [],
    activeAnimations: [],
    isInitialized: false,
    mousePosition: { x: 0, y: 0 }
};

// ==========================================================================
// INITIALIZATION
// ==========================================================================

export function initMatrixProjectAnimations() {
    if (animationController.isInitialized) return;
    
    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
}

function initialize() {
    console.log('🎬 Initializing EPIC Matrix animations...');
    
    // Debug: Check if CSS is loaded
    const testElement = document.querySelector('#matrix-projects-showcase');
    if (testElement) {
        const styles = window.getComputedStyle(testElement);
        console.log('🔍 CSS Debug - showcase element found');
        console.log('🔍 CSS Debug - background:', styles.background);
        console.log('🔍 CSS Debug - position:', styles.position);
        console.log('🔍 CSS Debug - minHeight:', styles.minHeight);
    } else {
        console.error('❌ #matrix-projects-showcase element not found!');
    }
    
    animationController.isInitialized = true;
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        animationController.mousePosition.x = e.clientX;
        animationController.mousePosition.y = e.clientY;
    });
    
    // Initialize all epic effects
    console.log('✨ Setting up particle system...');
    initializeParticles();
    console.log('⚡ Creating energy grid...');
    initializeEnergyGrid();
    console.log('📡 Activating scanner line...');
    initializeScannerLine();
    
    // Debug: Check for cards
    const cards = document.querySelectorAll('.matrix-project-card');
    console.log(`🔍 Found ${cards.length} project cards`);
    if (cards.length > 0) {
        const cardStyles = window.getComputedStyle(cards[0]);
        console.log('🔍 CSS Debug - card background:', cardStyles.background);
        console.log('🔍 CSS Debug - card border:', cardStyles.border);
    }
    
    // Epic entrance animations
    console.log('🎭 Starting epic entrance animations...');
    animatePageEntrance();
    
    // Setup interactions
    setupCardInteractions();
    setupTabFiltering();
    setupModalSystem();
    
    console.log('✅ All animations initialized!');
}

// ==========================================================================
// EPIC ENTRANCE ANIMATIONS
// ==========================================================================

function animatePageEntrance() {
    // Matrix digital rain effect on cards
    const cards = document.querySelectorAll('.matrix-project-card');
    const tabs = document.querySelectorAll('.matrix-tab-button');
    
    // Create timeline for coordinated entrance
    const timeline = anime.timeline({
        easing: 'easeOutExpo'
    });
    
    // Title glitch in
    timeline.add({
        targets: '.section-title',
        opacity: [0, 1],
        translateY: [-50, 0],
        duration: 800,
        complete: () => {
            // Add glitch effect
            glitchText('.section-title');
        }
    });
    
    // Tabs materialize
    timeline.add({
        targets: tabs,
        opacity: [0, 1],
        translateY: [-20, 0],
        scale: [0.8, 1],
        delay: anime.stagger(50),
        duration: 600
    }, '-=400');
    
    // Cards epic entrance with rotation and perspective
    cards.forEach((card, index) => {
        // Random initial rotation
        const rotateX = anime.random(-180, 180);
        const rotateY = anime.random(-180, 180);
        const translateZ = anime.random(-500, -300);
        
        card.style.transform = `translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        timeline.add({
            targets: card,
            opacity: [0, 1],
            translateZ: [translateZ, 0],
            rotateX: [rotateX, 0],
            rotateY: [rotateY, 0],
            duration: 1200,
            delay: index * 100,
            begin: () => {
                // Create digital rain effect for this card
                createDigitalRain(card);
            }
        }, index === 0 ? '-=600' : `-=${1000 - index * 50}`);
    });
    
    // Trigger particle burst on complete
    timeline.add({
        duration: 1,
        complete: () => {
            particleBurst();
        }
    });
}

// ==========================================================================
// DIGITAL RAIN EFFECT
// ==========================================================================

function createDigitalRain(element) {
    const rect = element.getBoundingClientRect();
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const streams = 15;
    
    for (let i = 0; i < streams; i++) {
        const rain = document.createElement('div');
        rain.style.position = 'absolute';
        rain.style.left = `${rect.left + Math.random() * rect.width}px`;
        rain.style.top = `${rect.top - 20}px`;
        rain.style.color = 'var(--matrix-green)';
        rain.style.fontSize = '14px';
        rain.style.fontFamily = 'monospace';
        rain.style.pointerEvents = 'none';
        rain.style.zIndex = '1000';
        rain.style.textShadow = '0 0 5px var(--matrix-green)';
        
        // Random characters
        rain.textContent = characters[Math.floor(Math.random() * characters.length)];
        document.body.appendChild(rain);
        
        anime({
            targets: rain,
            translateY: rect.height + 40,
            opacity: [1, 0],
            duration: anime.random(800, 1500),
            easing: 'linear',
            complete: () => rain.remove()
        });
    }
}

// ==========================================================================
// GLITCH TEXT EFFECT
// ==========================================================================

function glitchText(selector) {
    const element = document.querySelector(selector);
    if (!element) return;
    
    const text = element.textContent;
    let glitchInterval;
    
    const glitch = () => {
        const glitched = text.split('').map(char => {
            return Math.random() > 0.9 ? 
                String.fromCharCode(33 + Math.random() * 94) : char;
        }).join('');
        
        element.textContent = glitched;
        
        setTimeout(() => {
            element.textContent = text;
        }, 50);
    };
    
    // Glitch a few times
    let count = 0;
    glitchInterval = setInterval(() => {
        glitch();
        count++;
        if (count > 5) clearInterval(glitchInterval);
    }, 100);
}

// ==========================================================================
// CARD INTERACTIONS
// ==========================================================================

function setupCardInteractions() {
    const cards = document.querySelectorAll('.matrix-project-card');
    
    cards.forEach(card => {
        let isHovered = false;
        let hoverAnimation;
        let glowAnimation;
        
        // Mouse enter - EPIC hover effect
        card.addEventListener('mouseenter', (e) => {
            isHovered = true;
            
            // 3D tilt effect
            const rect = card.getBoundingClientRect();
            
            const mouseMoveHandler = (e) => {
                if (!isHovered) return;
                
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;
                
                anime({
                    targets: card,
                    rotateX: rotateX,
                    rotateY: rotateY,
                    duration: 100,
                    easing: 'linear'
                });
            };
            
            document.addEventListener('mousemove', mouseMoveHandler);
            card.dataset.mouseMoveHandler = mouseMoveHandler;
            
            // Scale and glow
            hoverAnimation = anime({
                targets: card,
                scale: 1.05,
                translateZ: 50,
                duration: 300,
                easing: 'easeOutQuad'
            });
            
            // Holographic shimmer
            createHolographicEffect(card);
            
            // Energy pulse
            glowAnimation = anime({
                targets: card,
                boxShadow: [
                    '0 0 20px rgba(0, 255, 0, 0.3)',
                    '0 0 60px rgba(0, 255, 0, 0.6)',
                    '0 0 20px rgba(0, 255, 0, 0.3)'
                ],
                duration: 1000,
                loop: true,
                easing: 'easeInOutSine'
            });
            
            // Particle emission
            emitParticles(card);
        });
        
        // Mouse leave
        card.addEventListener('mouseleave', () => {
            isHovered = false;
            
            // Remove mouse move handler
            const handler = card.dataset.mouseMoveHandler;
            if (handler) document.removeEventListener('mousemove', handler);
            
            // Reset rotation
            anime({
                targets: card,
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                translateZ: 0,
                duration: 300,
                easing: 'easeOutQuad'
            });
            
            // Stop glow
            if (glowAnimation) glowAnimation.pause();
            
            anime({
                targets: card,
                boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)',
                duration: 300
            });
        });
        
        // Click for 360 rotation preview
        card.addEventListener('click', () => {
            anime({
                targets: card,
                rotateY: '+=360',
                duration: 800,
                easing: 'easeInOutQuad'
            });
        });
    });
}

// ==========================================================================
// HOLOGRAPHIC EFFECT
// ==========================================================================

function createHolographicEffect(element) {
    const shimmer = document.createElement('div');
    shimmer.style.position = 'absolute';
    shimmer.style.top = '0';
    shimmer.style.left = '-100%';
    shimmer.style.width = '100%';
    shimmer.style.height = '100%';
    shimmer.style.background = 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.3), transparent)';
    shimmer.style.pointerEvents = 'none';
    shimmer.style.zIndex = '10';
    
    element.style.position = 'relative';
    element.appendChild(shimmer);
    
    anime({
        targets: shimmer,
        left: '100%',
        duration: 800,
        easing: 'easeInOutQuad',
        complete: () => shimmer.remove()
    });
}

// ==========================================================================
// PARTICLE SYSTEM
// ==========================================================================

function initializeParticles() {
    const container = document.querySelector('.matrix-particles');
    if (!container) return;
    
    // Create floating ambient particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'matrix-particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        container.appendChild(particle);
        
        animationController.particles.push(particle);
        
        // Animate floating
        anime({
            targets: particle,
            translateX: () => anime.random(-100, 100),
            translateY: () => anime.random(-100, 100),
            opacity: [0, 0.6, 0],
            duration: () => anime.random(3000, 6000),
            loop: true,
            easing: 'easeInOutSine',
            delay: () => anime.random(0, 3000)
        });
    }
}

function emitParticles(element) {
    const rect = element.getBoundingClientRect();
    const particles = 20;
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'var(--matrix-green)';
        particle.style.borderRadius = '50%';
        particle.style.left = `${rect.left + rect.width / 2}px`;
        particle.style.top = `${rect.top + rect.height / 2}px`;
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        particle.style.boxShadow = '0 0 6px var(--matrix-green)';
        
        document.body.appendChild(particle);
        
        const angle = (i / particles) * Math.PI * 2;
        const distance = anime.random(50, 150);
        
        anime({
            targets: particle,
            translateX: Math.cos(angle) * distance,
            translateY: Math.sin(angle) * distance,
            opacity: [1, 0],
            scale: [1, 0],
            duration: 1000,
            easing: 'easeOutExpo',
            complete: () => particle.remove()
        });
    }
}

function particleBurst() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const particles = 100;
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.background = 'var(--matrix-green)';
        particle.style.borderRadius = '50%';
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '10000';
        particle.style.boxShadow = '0 0 10px var(--matrix-green)';
        
        document.body.appendChild(particle);
        
        const angle = (i / particles) * Math.PI * 2;
        const distance = anime.random(100, 500);
        
        anime({
            targets: particle,
            translateX: Math.cos(angle) * distance,
            translateY: Math.sin(angle) * distance,
            opacity: [1, 0],
            scale: [2, 0],
            duration: 2000,
            easing: 'easeOutExpo',
            delay: i * 5,
            complete: () => particle.remove()
        });
    }
}

// ==========================================================================
// SCANNER LINE
// ==========================================================================

function initializeScannerLine() {
    const scanner = document.querySelector('.matrix-scanner');
    if (!scanner) return;
    
    anime({
        targets: scanner,
        top: ['0%', '100%'],
        duration: 4000,
        loop: true,
        easing: 'linear'
    });
}

// ==========================================================================
// ENERGY GRID
// ==========================================================================

function initializeEnergyGrid() {
    const canvas = document.querySelector('.matrix-energy-grid');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Draw animated grid
    function drawGrid() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'rgba(0, 255, 0, 0.1)';
        ctx.lineWidth = 1;
        
        const gridSize = 50;
        const time = Date.now() * 0.001;
        
        // Vertical lines
        for (let x = 0; x < canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x + Math.sin(time + x * 0.01) * 5, 0);
            ctx.lineTo(x + Math.sin(time + x * 0.01) * 5, canvas.height);
            ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y + Math.cos(time + y * 0.01) * 5);
            ctx.lineTo(canvas.width, y + Math.cos(time + y * 0.01) * 5);
            ctx.stroke();
        }
        
        requestAnimationFrame(drawGrid);
    }
    
    drawGrid();
}

// ==========================================================================
// TAB FILTERING
// ==========================================================================

function setupTabFiltering() {
    const tabs = document.querySelectorAll('.matrix-tab-button');
    const cards = document.querySelectorAll('.matrix-project-card');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.category;
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Disintegration effect for non-matching cards
            cards.forEach((card, index) => {
                const cardCategory = card.dataset.category;
                const shouldShow = category === 'all' || cardCategory === category;
                
                if (shouldShow && card.classList.contains('matrix-hidden')) {
                    // Materialize card
                    card.classList.remove('matrix-hidden');
                    
                    anime({
                        targets: card,
                        opacity: [0, 1],
                        scale: [0, 1],
                        rotateY: [-180, 0],
                        duration: 600,
                        delay: index * 50,
                        easing: 'easeOutBack',
                        begin: () => {
                            createDigitalRain(card);
                        }
                    });
                } else if (!shouldShow && !card.classList.contains('matrix-hidden')) {
                    // Disintegrate card
                    disintegrateCard(card, () => {
                        card.classList.add('matrix-hidden');
                    });
                }
            });
        });
    });
}

function disintegrateCard(card, callback) {
    const rect = card.getBoundingClientRect();
    const particles = 30;
    
    // Create particle effect
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.background = 'var(--matrix-green)';
        particle.style.left = `${rect.left + Math.random() * rect.width}px`;
        particle.style.top = `${rect.top + Math.random() * rect.height}px`;
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        
        document.body.appendChild(particle);
        
        anime({
            targets: particle,
            translateX: anime.random(-200, 200),
            translateY: anime.random(-200, 200),
            scale: [1, 0],
            opacity: [1, 0],
            duration: 800,
            easing: 'easeOutExpo',
            delay: i * 10,
            complete: () => particle.remove()
        });
    }
    
    // Fade out card
    anime({
        targets: card,
        opacity: 0,
        scale: 0.8,
        rotateY: 180,
        duration: 400,
        easing: 'easeInQuad',
        complete: callback
    });
}

// ==========================================================================
// MODAL SYSTEM
// ==========================================================================

function setupModalSystem() {
    const modal = document.querySelector('.matrix-modal-overlay');
    const modalContent = document.querySelector('.matrix-modal');
    const closeBtn = document.querySelector('.matrix-modal-close');
    const cards = document.querySelectorAll('.matrix-project-card');
    
    if (!modal || !modalContent) return;
    
    // Click card to open modal
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            openPortalModal(card, modal, modalContent);
        });
    });
    
    // Close modal
    const closeModal = () => {
        anime({
            targets: modalContent,
            rotateX: [0, 90],
            scale: [1, 0],
            opacity: [1, 0],
            duration: 400,
            easing: 'easeInQuad',
            complete: () => {
                modal.classList.remove('active');
            }
        });
    };
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

function openPortalModal(card, modal, modalContent) {
    // Extract card data
    const title = card.querySelector('.matrix-project-title')?.textContent || '';
    const description = card.querySelector('.matrix-project-description')?.textContent || '';
    const image = card.querySelector('.matrix-project-icon img')?.src || '';
    const tags = Array.from(card.querySelectorAll('.matrix-project-tag')).map(tag => tag.textContent);
    const buttons = card.querySelector('.matrix-project-buttons')?.innerHTML || '';
    
    // Populate modal
    const content = document.querySelector('.matrix-modal-content');
    content.innerHTML = `
        ${image ? `<img src="${image}" alt="${title}" style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 2rem;">` : ''}
        <h2 style="color: var(--matrix-green); font-size: 2rem; margin-bottom: 1rem; text-shadow: var(--matrix-glow);">${title}</h2>
        <p style="color: rgba(255, 255, 255, 0.9); font-size: 1.1rem; line-height: 1.8; margin-bottom: 2rem;">${description}</p>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
            ${tags.map(tag => `<span style="background: rgba(0, 255, 0, 0.1); border: 1px solid var(--matrix-green); color: var(--matrix-green); padding: 0.5rem 1rem; border-radius: 20px;">${tag}</span>`).join('')}
        </div>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            ${buttons}
        </div>
    `;
    
    // Show modal with portal effect
    modal.classList.add('active');
    
    // Portal opening animation
    anime({
        targets: modalContent,
        rotateX: [90, 0],
        scale: [0, 1],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutBack',
        begin: () => {
            // Lightning effect
            createLightningEffect(modal);
        }
    });
}

function createLightningEffect(container) {
    const bolts = 5;
    
    for (let i = 0; i < bolts; i++) {
        const bolt = document.createElement('div');
        bolt.style.position = 'absolute';
        bolt.style.width = '2px';
        bolt.style.height = '100%';
        bolt.style.background = 'linear-gradient(to bottom, transparent, var(--matrix-green), transparent)';
        bolt.style.left = `${Math.random() * 100}%`;
        bolt.style.top = '0';
        bolt.style.opacity = '0';
        bolt.style.filter = 'blur(2px)';
        bolt.style.pointerEvents = 'none';
        
        container.appendChild(bolt);
        
        anime({
            targets: bolt,
            opacity: [0, 1, 0],
            scaleY: [0, 1, 0],
            duration: 300,
            delay: i * 50,
            easing: 'easeInOutQuad',
            complete: () => bolt.remove()
        });
    }
}

// Initialize on import with delay to ensure CSS loads
setTimeout(() => {
    initMatrixProjectAnimations();
}, 100);