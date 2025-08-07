# React Components Documentation

## Overview
This document catalogs all React components in the Thomas J Butler portfolio v3.0.

## Component Inventory

### Layout Components

#### Header.tsx
- **Location**: `/src/components/Header.tsx`
- **Props**: None
- **Description**: Main navigation header with Matrix theme
- **Usage**: 
  ```tsx
  import Header from '@components/Header';
  <Header />
  ```

#### Footer.tsx
- **Location**: `/src/components/Footer.tsx`
- **Props**: None
- **Description**: Site footer with social links and copyright
- **Usage**:
  ```tsx
  import Footer from '@components/Footer';
  <Footer />
  ```

#### Layout.tsx
- **Location**: `/src/components/Layout.tsx`
- **Props**: 
  - `children: React.ReactNode`
- **Description**: Main layout wrapper with header and footer
- **Usage**:
  ```tsx
  import Layout from '@components/Layout';
  <Layout>
    <YourContent />
  </Layout>
  ```

### Interactive Components

#### ContactForm.tsx
- **Location**: `/src/components/ContactForm.tsx`
- **Props**: None
- **Description**: Contact form with Formspree integration
- **Features**:
  - Form validation
  - Success/error states
  - Matrix-themed styling

#### MatrixRain.tsx
- **Location**: `/src/components/MatrixRain.tsx`
- **Props**:
  - `density?: number` (default: 0.02)
  - `speed?: number` (default: 1)
- **Description**: Animated Matrix rain background effect
- **Performance**: Uses requestAnimationFrame for smooth animation

#### GodModeDisplay.tsx
- **Location**: `/src/components/GodModeDisplay.tsx`
- **Props**: None
- **Description**: Easter egg component for special features
- **Activation**: Konami code or specific key sequence

## Testing

All components have corresponding test files in the same directory:
- `Header.test.tsx`
- `Footer.test.tsx`
- etc.

Run tests with:
```bash
npm run test
```

## Styling

Components use CSS Modules for scoped styling:
- `Header.module.css`
- `Footer.module.css`
- etc.

## Future Components (v3.5)

Planned components for full React migration:
- ProjectCard
- SkillsGrid
- Timeline
- AnimatedHero
- NavigationMenu
- ThemeToggle