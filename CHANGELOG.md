# Changelog

All notable changes to the Thomas J Butler Portfolio will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.1.0] - 2025-01-10

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

## [3.0.1] - Previous Version
- Design system creation
- Typography improvements
- Contact form & UX enhancements
- Animation framework setup with Anime.js v4