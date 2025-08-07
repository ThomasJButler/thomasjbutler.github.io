# Changelog

All notable changes to the Thomas J Butler Portfolio will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Planned
- Complete Vite setup and build optimization
- TypeScript migration for remaining JavaScript files
- Component architecture implementation
- CI/CD pipeline enhancements
- WebGL Matrix rain effect
- Service worker for offline capability

## [3.0.1] - 2025-08-07

### Added
- **Hide-on-Scroll Header**: Smart header navigation that elegantly hides when scrolling down and smoothly reappears when scrolling up
  - Performance-optimized with 60fps throttled scroll detection
  - Mobile-optimized with faster animation timing (0.2s vs 0.3s desktop)
  - Maintains accessibility with keyboard navigation support
  
- **Back-to-Top Button**: Matrix-themed floating button with authentic terminal aesthetics
  - Glassmorphism effects with backdrop blur
  - Scan line animations and blinking cursor effect
  - Appears after 300px scroll threshold
  - Full ARIA labels and keyboard accessibility
  
- **Scroll Detection System**: Comprehensive scroll handling utilities
  - `ScrollDetection` class for vanilla JavaScript compatibility
  - `useScrollDetection` React hook for component integration
  - RequestAnimationFrame optimization for smooth 60fps performance
  - Respects user's prefers-reduced-motion settings
  
- **Google Maps Integration**: Interactive map link for York location on contact page
- **.NET React Calendar Project**: New showcase project featuring .NET backend with React frontend
  - Live deployment on Vercel
  - Full-stack calendar application with event management

### Changed
- **Latest Updates Section**: Enhanced rotating cube showcase
  - Added Commercial Portfolio v2.0
  - Added Portfolio v3.0 React Migration
  - Added AI Model Comparison Tool
  - Added CSS Showcase
  - Replaced React Documentation with .NET React Calendar
  
- **Project Gallery**: Updated with current project screenshots
  - Replaced placeholder images with actual screenshots
  - Updated Cloudinary-hosted images for better performance
  
- **Contact Form**: Refined layout and styling
  - More compact input fields on desktop
  - Optimized scroll performance
  - Enhanced mobile responsiveness

### Fixed
- **Project Link Consistency**: Synchronized all project URLs between index.html and projects.html
  - AI Model Comparison Tool now uses correct Vercel deployment
  - Commercial Portfolio GitHub link points to react repository
  - Added missing live demo links
  
- **Canonical URLs**: Corrected self-referencing canonical links on all HTML pages
- **HTML Validation**: Removed invalid h3 tags from header structure
- **Tag Hover States**: Fixed visibility with white text on green background
- **Rotating Cube**: Fixed image height and button hover visibility issues
- **Mobile Navigation**: Improved dropdown layout and footer container responsiveness
- **Contact Form Width**: Fixed expansion issue on desktop viewports

### Enhanced
- **Scroll Experience**: 
  - Smooth hide/show transitions with hardware acceleration
  - Different timing for mobile (0.2s) vs desktop (0.3s)
  - Prevents layout shift with proper transform usage
  
- **Matrix Theme Consistency**:
  - Added `--matrix-green-bright` color variable for hover states
  - Enhanced scan line effects across components
  - Maintained terminal aesthetic throughout new features
  
- **Documentation**:
  - Added comprehensive scroll features documentation
  - Created test suite for scroll functionality validation
  - Updated component documentation with new features

### Infrastructure
- **Testing**: Added `test-scroll-features.html` for cross-platform validation
- **CSS Architecture**: New modular components for scroll behaviors
  - `_back-to-top.css` for button styling
  - `_scroll-behavior.css` for header transitions

## [3.0.0] - 2025-07-20

### Added
- **React Migration**: Converted static HTML site to React with TypeScript
  - Implemented React Router for single-page application navigation
  - Created modular component architecture
  - Added TypeScript support throughout the application
  
- **Anime.js Integration**: Enhanced animations across all components
  - Custom animation hooks (`useMatrixAnimation`, `useScrollAnimation`, `useHoverAnimation`)
  - Smooth page transitions and element reveals
  - Interactive hover effects with Matrix theme
  
- **Component Library**:
  - `Header` - Responsive navigation with mobile menu
  - `Footer` - Enhanced social links and tech stack display
  - `Layout` - Shared layout wrapper with animated transitions
  - `MatrixRain` - React-based Matrix rain background effect
  - `HomePage` - Fully migrated home page with all sections

- **CSS Architecture**:
  - Modular CSS structure with CSS Modules
  - Design system alignment with comprehensive variables
  - Matrix-themed utility classes
  - Responsive typography with clamp() functions

### Changed
- **Build System**: Fully configured for React development with Vite
- **Import Structure**: Updated anime.js imports to use namespace import (`import * as anime`)
- **CSS Variables**: Aligned with design_system.md specifications
  - Updated color palette to use Matrix theme colors
  - Implemented proper spacing scale
  - Added animation timing functions and durations
  
### Fixed
- Character encoding issues in page components
- Build errors with anime.js v4 imports
- Header height consistency for better visual balance
- TypeScript configuration for React JSX support

### Enhanced
- **Footer Styling**:
  - Added Matrix scanline effects
  - Enhanced social link hover animations with pulse effects
  - Improved tech badge styling with gradients
  - Added section header underlines with glow effects

### Infrastructure
- **CI/CD Pipeline**:
  - GitHub Actions workflow for automated deployment
  - Test runner configuration with Vitest
  - Automated linting and type checking on push
  - GitHub Pages deployment automation

### Documentation
- Comprehensive API documentation for all components
- Migration guide from static HTML to React
- Updated README with React portfolio information

## [2.9.1] - 2025-07-08

### Added
- **Design System** (`design_system.md`):
  - Comprehensive color palette with CSS custom properties
  - Typography scale based on VT323 and system fonts
  - 4px-based spacing system for consistency
  - Component patterns for buttons, cards, and forms
  - Animation guidelines with timing functions
  - Responsive breakpoint definitions

### Changed
- **Typography Improvements**:
  - Enhanced paragraph readability (line-height: 1.8, letter-spacing: 0.02em)
  - Implemented responsive font sizing using clamp()
  - Added maximum reading width (65ch) for better content consumption
  - Improved text rendering with anti-aliasing

### Enhanced
- **Contact Form & UX**:
  - Modernized contact form with glassmorphism effects
  - Enhanced mobile usability with larger touch targets (min 44px)
  - Improved form field focus states with smooth transitions
  - Redesigned address section with Font Awesome icons
  - Fixed CSS selector issues and removed duplicate styles

### Fixed
- CSS selector specificity issues in contact form
- Duplicate style declarations across components
- Mobile touch target sizes below accessibility standards

## [2.8.5] - 2025-07-05

### Added
- **Projects Section Overhaul**:
  - Dynamic GitHub repository integration
  - Tab-based filtering (Featured, AI Projects, Web Development)
  - Real-time repository statistics
  - Language detection with color coding
  - Topic badges for better categorization

- **Performance Optimizations**:
  - Implemented lazy loading for images
  - Code splitting for route-based chunks
  - Optimized Matrix rain effect for mobile devices
  - Reduced animation complexity on low-end devices

- **Accessibility Improvements**:
  - ARIA labels throughout navigation
  - Keyboard navigation support
  - Screen reader optimizations
  - Focus visible indicators on all interactive elements

### Changed
- Migrated from GSAP to Anime.js for animations
- Updated build system to Vite from webpack
- Restructured project architecture for better maintainability
- Improved mobile navigation with slide-out menu

### Fixed
- Matrix rain performance issues on Safari
- Mobile menu z-index conflicts
- Form validation edge cases
- Cross-browser animation inconsistencies

## [2.8.4] - 2025-07-03

### Added
- **API Integration Layer**:
  - GitHub API integration for project data
  - Rate limiting and caching mechanisms
  - Error handling and retry logic

- **Build Optimizations**:
  - Terser minification configuration
  - Legacy browser support with @vitejs/plugin-legacy
  - Optimized chunk splitting strategy

### Changed
- Updated Node.js dependencies to latest versions
- Improved environment variable handling
- Enhanced security headers configuration

### Fixed
- Build warnings for large chunks
- Dependency vulnerabilities (npm audit fixes)
- TypeScript strict mode violations

## [2.9.0] - 2025-07-01

### Added
- Initial Vite configuration
- TypeScript support groundwork
- Modern build pipeline setup
- ESLint and Prettier configuration

### Changed
- Project structure reorganization
- Updated package.json scripts
- Modernized development workflow

### Deprecated
- Webpack configuration (moving to Vite)
- jQuery dependencies (moving to vanilla JS/React)
- Legacy browser polyfills