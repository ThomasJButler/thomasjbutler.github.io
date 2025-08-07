// Projects Horizontal Grid Functionality

// Wait for both DOM and all resources to load
window.addEventListener('load', function() {
    setTimeout(() => {
        // Initialize horizontal grid
        initializeHorizontalGrid();
        
        // Setup modal system
        setupProjectModals();
        
        // Setup category filters
        setupCategoryFilters();
        
        // Setup horizontal scrolling
        setupHorizontalScroll();
    }, 100); // Small delay to ensure everything is rendered
});

function initializeHorizontalGrid() {
    // Transform existing grid to horizontal layout
    const projectsGrid = document.querySelector('.github-projects-grid');
    if (!projectsGrid) {
        
        return;
    }
    
    // Add horizontal container wrapper
    const container = document.createElement('div');
    container.className = 'projects-horizontal-container';
    
    const horizontalGrid = document.createElement('div');
    horizontalGrid.className = 'projects-horizontal-grid';
    
    // Get all project cards
    const cards = projectsGrid.querySelectorAll('.project-card, .github-card');
    
    // Create horizontal cards
    cards.forEach((card, index) => {
        const newCard = card.cloneNode(true);
        newCard.classList.add('project-card-horizontal');
        
        // Remove old classes that might conflict
        newCard.classList.remove('github-card', 'project-card');
        
        // Assign size based on importance or randomly
        if (index === 0 || index === 3) {
            newCard.classList.add('size-featured');
        } else if (index % 3 === 0) {
            newCard.classList.add('size-large');
        } else if (index % 2 === 0) {
            newCard.classList.add('size-medium');
        } else {
            newCard.classList.add('size-small');
        }
        
        // Add data-category attribute for filtering
        const category = card.getAttribute('data-category');
        if (category) {
            newCard.setAttribute('data-category', category);
        }
        
        // Wrap images in container if needed
        const img = newCard.querySelector('img');
        if (img && !img.parentElement.classList.contains('project-image-container')) {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'project-image-container';
            img.parentElement.insertBefore(imgContainer, img);
            imgContainer.appendChild(img);
            img.classList.add('project-image-horizontal');
        }
        
        // Add click handler for modal
        newCard.addEventListener('click', () => openProjectModal(newCard));
        
        horizontalGrid.appendChild(newCard);
    });
    
    container.appendChild(horizontalGrid);
    
    // Add scroll indicators
    const leftIndicator = createScrollIndicator('left');
    const rightIndicator = createScrollIndicator('right');
    container.appendChild(leftIndicator);
    container.appendChild(rightIndicator);
    
    // Replace original grid
    projectsGrid.parentNode.replaceChild(container, projectsGrid);
}

function createScrollIndicator(direction) {
    const indicator = document.createElement('div');
    indicator.className = `scroll-indicator ${direction}`;
    indicator.innerHTML = direction === 'left' ? '←' : '→';
    
    indicator.addEventListener('click', () => {
        const container = document.querySelector('.projects-horizontal-container');
        const scrollAmount = 400;
        
        if (direction === 'left') {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    });
    
    return indicator;
}

function setupProjectModals() {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'project-modal-overlay';
    modalOverlay.innerHTML = `
        <div class="project-modal">
            <button class="modal-close">×</button>
            <div class="modal-content"></div>
        </div>
    `;
    
    document.body.appendChild(modalOverlay);
    
    // Close modal handlers
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay || e.target.classList.contains('modal-close')) {
            closeProjectModal();
        }
    });
    
    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectModal();
        }
    });
}

function openProjectModal(card) {
    const modal = document.querySelector('.project-modal-overlay');
    const modalContent = modal.querySelector('.modal-content');
    
    // Extract project data
    const title = card.querySelector('h3')?.textContent || 'Project';
    const description = card.querySelector('.project-description, .repo-description')?.textContent || '';
    const image = card.querySelector('img')?.src;
    const techStack = card.querySelectorAll('.tech-badge, .topic');
    const links = card.querySelectorAll('.project-link, .repo-link');
    
    // Build modal content
    let techStackHTML = '';
    if (techStack.length > 0) {
        techStackHTML = `
            <div class="modal-tech-stack">
                <h4>Technologies Used</h4>
                <div class="tech-tags">
                    ${Array.from(techStack).map(tech => `<span class="tech-tag">${tech.textContent}</span>`).join('')}
                </div>
            </div>
        `;
    }
    
    let linksHTML = '';
    if (links.length > 0) {
        linksHTML = `
            <div class="modal-links">
                ${Array.from(links).map(link => `
                    <a href="${link.href}" target="_blank" class="modal-link">
                        ${link.innerHTML}
                    </a>
                `).join('')}
            </div>
        `;
    }
    
    modalContent.innerHTML = `
        ${image ? `<img src="${image}" alt="${title}" class="modal-image">` : ''}
        <h2 class="modal-title">${title}</h2>
        <p class="modal-description">${description}</p>
        ${techStackHTML}
        ${linksHTML}
    `;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.querySelector('.project-modal-overlay');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function setupCategoryFilters() {
    const filterButtons = document.querySelectorAll('.tab-button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter cards
            const cards = document.querySelectorAll('.project-card-horizontal');
            cards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'flex';
                    card.style.opacity = '1';
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

function setupHorizontalScroll() {
    const container = document.querySelector('.projects-horizontal-container');
    if (!container) return;
    
    // Update scroll indicators visibility
    const updateScrollIndicators = () => {
        const leftIndicator = document.querySelector('.scroll-indicator.left');
        const rightIndicator = document.querySelector('.scroll-indicator.right');
        
        if (leftIndicator) {
            leftIndicator.style.opacity = container.scrollLeft > 0 ? '1' : '0.3';
        }
        
        if (rightIndicator) {
            const maxScroll = container.scrollWidth - container.clientWidth;
            rightIndicator.style.opacity = container.scrollLeft < maxScroll - 10 ? '1' : '0.3';
        }
    };
    
    container.addEventListener('scroll', updateScrollIndicators);
    updateScrollIndicators();
    
    // Mouse wheel horizontal scroll
    container.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            container.scrollLeft += e.deltaY;
        }
    });
}