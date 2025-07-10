# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2025-01-10

### Added
- **Modern Build System**
  - Vite build system for lightning-fast development
  - Hot Module Replacement (HMR) for instant updates
  - Multi-page application support
  - Legacy browser support with @vitejs/plugin-legacy
  - Optimized production builds with code splitting

- **TypeScript Integration**
  - Full TypeScript support with strict mode
  - Type definitions for all libraries (GSAP, ScrollMagic, AOS)
  - ESLint and Prettier configurations
  - Type-safe DOM manipulations
  - Comprehensive interfaces for Matrix rain and animations

- **CI/CD Pipeline**
  - GitHub Actions workflow for automated testing
  - Multi-node version testing (Node 18.x, 20.x)
  - Lighthouse CI integration for performance monitoring
  - Automated deployment to GitHub Pages
  - Build artifacts preservation

- **Developer Experience**
  - npm scripts for development, building, and testing
  - Code linting and formatting tools
  - Type checking integrated into build process
  - Source maps for debugging

### Changed
- **ES Module Migration**
  - All HTML pages converted to use ES modules
  - CDN dependencies replaced with npm packages
  - Created modular entry points for each page
  - Improved code organization and tree-shaking

- **CSS Improvements**
  - Modern CSS custom properties system
  - Fluid typography with clamp() functions
  - Responsive spacing scale
  - Fixed section visibility issues
  - Enhanced Matrix theme variables

- **Project Structure**
  - Separated galleries into standalone directories
    - Big Bang Gallery → bigbang-gallery/
    - Version TimeTravel → version-timetravel/
  - Updated navigation to point to new gallery URLs
  - Cleaned up deprecated files

### Fixed
- Section opacity issues preventing content visibility
- CSS contrast problems with Matrix theme
- Build process for production deployment
- Module loading conflicts

### Removed
- Direct CDN script tags (replaced with npm modules)
- Deprecated CSS files (version1.css, version2.css, etc.)
- Old CV-related files
- Art.html (replaced with gallery system)
- Duplicate JavaScript files

## [2.8.5] - 2024-12-20
### Changed
- Updated .gitignore
- Removed Interactive CV feature

## [2.8.0] - 2024-12-15
### Added
- Projects grid layout
- Improved mobile layout with increased width

### Changed
- Enhanced responsive design for better mobile experience
- Updated project showcase presentation

## Previous Versions
For changes prior to v2.8.0, please refer to the git history.