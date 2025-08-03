// ==========================================================================
// EPIC MATRIX PROJECTS ANIMATIONS WITH ANIME.JS
// ==========================================================================

// No need to import anime as it's loaded via CDN
// Matrix animations script loaded

// Check if anime is available
if (typeof anime === 'undefined') {
    // Anime.js is not loaded - loading from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js';
    script.onload = () => {
        // Anime.js loaded from fallback CDN
        initMatrixProjectAnimations();
    };
    document.head.appendChild(script);
}

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
    
    
    // Debug: Check if CSS is loaded
    const testElement = document.querySelector('#matrix-projects-showcase');
    if (testElement) {
        const styles = window.getComputedStyle(testElement);
        
        
        
        
    } else {
        
    }
    
    animationController.isInitialized = true;
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        animationController.mousePosition.x = e.clientX;
        animationController.mousePosition.y = e.clientY;
    });
    
    // Initialize all epic effects
    
    initializeParticles();
    
    initializeEnergyGrid();
    
    initializeScannerLine();
    
    // Debug: Check for cards
    const cards = document.querySelectorAll('.matrix-project-card');
    
    if (cards.length > 0) {
        const cardStyles = window.getComputedStyle(cards[0]);
        
        
    }
    
    // Epic entrance animations
    
    animatePageEntrance();
    
    // Setup interactions
    setupCardInteractions();
    setupTabFiltering();
    setupModalSystem();
    
    // Setup epic new effects
    setupKonamiCode();
    setupClickBurstEffects();
    setupElectricArcs();
    setupTypingEffects();
    setupPerformanceMonitor();
    
    
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
            
            // Add rainbow chromatic aberration effect
            const rgbShift = document.createElement('div');
            rgbShift.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                mix-blend-mode: screen;
                z-index: 20;
            `;
            card.appendChild(rgbShift);
            
            anime({
                targets: rgbShift,
                backgroundColor: [
                    'rgba(255, 0, 0, 0.1)',
                    'rgba(0, 255, 0, 0.1)',
                    'rgba(0, 0, 255, 0.1)',
                    'rgba(255, 0, 0, 0.1)'
                ],
                duration: 2000,
                loop: true,
                easing: 'linear'
            });
            
            card.dataset.rgbShift = rgbShift;
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
    
    
    
    // Ensure all cards are visible initially
    cards.forEach(card => {
        card.classList.remove('matrix-hidden');
        card.style.opacity = '1';
        card.style.transform = 'none';
    });
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.category;
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            
            
            // Filter cards with animation
            cards.forEach((card, index) => {
                const cardCategory = card.dataset.category;
                const shouldShow = category === 'all' || cardCategory === category;
                
                
                
                if (shouldShow) {
                    // Show card
                    if (card.classList.contains('matrix-hidden')) {
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
                    }
                } else {
                    // Hide card
                    if (!card.classList.contains('matrix-hidden')) {
                        // Disintegrate card
                        disintegrateCard(card, () => {
                            card.classList.add('matrix-hidden');
                        });
                    }
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

// ==========================================================================
// KONAMI CODE EASTER EGG
// ==========================================================================

function setupKonamiCode() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            if (konamiIndex === konamiCode.length) {
                activateMatrixOverdrive();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function activateMatrixOverdrive() {
    
    
    // Flash screen
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #00ff00;
        z-index: 100000;
        pointer-events: none;
    `;
    document.body.appendChild(flash);
    
    anime({
        targets: flash,
        opacity: [1, 0],
        duration: 500,
        easing: 'easeOutQuad',
        complete: () => flash.remove()
    });
    
    // Crazy card animations
    const cards = document.querySelectorAll('.matrix-project-card');
    cards.forEach((card, i) => {
        anime({
            targets: card,
            rotateZ: [0, 360],
            scale: [1, 1.2, 1],
            translateY: [0, -50, 0],
            duration: 2000,
            delay: i * 100,
            easing: 'easeInOutElastic'
        });
    });
    
    // Particle explosion
    for (let i = 0; i < 200; i++) {
        createMatrixParticle();
    }
    
    // Glitch all text
    document.querySelectorAll('h1, h2, h3, p').forEach(el => {
        glitchText(el);
    });
}

// ==========================================================================
// CLICK BURST EFFECTS
// ==========================================================================

function setupClickBurstEffects() {
    document.addEventListener('click', (e) => {
        createClickBurst(e.clientX, e.clientY);
        createShockwave(e.clientX, e.clientY);
    });
}

function createClickBurst(x, y) {
    const particles = 15;
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #00ff00;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            box-shadow: 0 0 10px #00ff00;
        `;
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        document.body.appendChild(particle);
        
        const angle = (i / particles) * Math.PI * 2;
        const distance = anime.random(50, 200);
        
        anime({
            targets: particle,
            translateX: Math.cos(angle) * distance,
            translateY: Math.sin(angle) * distance,
            scale: [1, 0],
            opacity: [1, 0],
            duration: 1000,
            easing: 'easeOutExpo',
            complete: () => particle.remove()
        });
    }
}

function createShockwave(x, y) {
    const shockwave = document.createElement('div');
    shockwave.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #00ff00;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transform: translate(-50%, -50%);
    `;
    shockwave.style.left = x + 'px';
    shockwave.style.top = y + 'px';
    
    document.body.appendChild(shockwave);
    
    anime({
        targets: shockwave,
        scale: [1, 10],
        opacity: [1, 0],
        duration: 800,
        easing: 'easeOutQuad',
        complete: () => shockwave.remove()
    });
}

// ==========================================================================
// ELECTRIC ARCS
// ==========================================================================

function setupElectricArcs() {
    setInterval(() => {
        const cards = document.querySelectorAll('.matrix-project-card');
        if (cards.length < 2) return;
        
        const card1 = cards[anime.random(0, cards.length - 1)];
        const card2 = cards[anime.random(0, cards.length - 1)];
        
        if (card1 !== card2) {
            createElectricArc(card1, card2);
        }
    }, 3000);
}

function createElectricArc(elem1, elem2) {
    const rect1 = elem1.getBoundingClientRect();
    const rect2 = elem2.getBoundingClientRect();
    
    const x1 = rect1.left + rect1.width / 2;
    const y1 = rect1.top + rect1.height / 2;
    const x2 = rect2.left + rect2.width / 2;
    const y2 = rect2.top + rect2.height / 2;
    
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    
    const arc = document.createElement('div');
    arc.style.cssText = `
        position: fixed;
        width: ${distance}px;
        height: 2px;
        background: linear-gradient(90deg, transparent, #00ff00, transparent);
        pointer-events: none;
        z-index: 1000;
        transform-origin: 0 50%;
        box-shadow: 0 0 10px #00ff00;
    `;
    arc.style.left = x1 + 'px';
    arc.style.top = y1 + 'px';
    arc.style.transform = `rotate(${angle}deg)`;
    
    document.body.appendChild(arc);
    
    anime({
        targets: arc,
        opacity: [0, 1, 0],
        scaleX: [0, 1, 0],
        duration: 500,
        easing: 'easeInOutQuad',
        complete: () => arc.remove()
    });
}

// ==========================================================================
// TYPING EFFECTS
// ==========================================================================

function setupTypingEffects() {
    const descriptions = document.querySelectorAll('.matrix-project-description');
    
    descriptions.forEach((desc, index) => {
        const text = desc.textContent;
        desc.textContent = '';
        desc.style.minHeight = '3em'; // Prevent layout shift
        
        // Start typing after entrance animations
        setTimeout(() => {
            typeText(desc, text);
        }, 2000 + index * 200);
    });
}

function typeText(element, text) {
    let index = 0;
    
    const typeInterval = setInterval(() => {
        if (index < text.length) {
            element.textContent += text[index];
            index++;
        } else {
            clearInterval(typeInterval);
            // Add blinking cursor
            const cursor = document.createElement('span');
            cursor.textContent = '_';
            cursor.style.animation = 'blink 1s infinite';
            element.appendChild(cursor);
        }
    }, 30);
}

// ==========================================================================
// PERFORMANCE MONITOR
// ==========================================================================

function setupPerformanceMonitor() {
    let fps = 0;
    let lastTime = performance.now();
    let frames = 0;
    
    function updateFPS() {
        const currentTime = performance.now();
        frames++;
        
        if (currentTime >= lastTime + 1000) {
            fps = Math.round((frames * 1000) / (currentTime - lastTime));
            frames = 0;
            lastTime = currentTime;
            
            // Reduce effects if FPS drops below 30
            if (fps < 30) {
                console.warn(`⚠️ Low FPS detected: ${fps}`);
                // Reduce particle count or disable some effects
            }
        }
        
        requestAnimationFrame(updateFPS);
    }
    
    updateFPS();
}

// ==========================================================================
// HELPER FUNCTIONS
// ==========================================================================

function createMatrixParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 10px;
        height: 20px;
        color: #00ff00;
        font-family: monospace;
        pointer-events: none;
        z-index: 9999;
        text-shadow: 0 0 5px #00ff00;
    `;
    particle.textContent = String.fromCharCode(33 + Math.random() * 94);
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = -20 + 'px';
    
    document.body.appendChild(particle);
    
    anime({
        targets: particle,
        translateY: window.innerHeight + 20,
        opacity: [1, 0],
        duration: anime.random(2000, 4000),
        easing: 'linear',
        complete: () => particle.remove()
    });
}

// Add CSS for blinking cursor
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize on import with delay to ensure CSS loads
setTimeout(() => {
    if (typeof anime !== 'undefined') {
        initMatrixProjectAnimations();
    }
}, 100);