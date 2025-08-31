# React Components Documentation

## Overview
This document catalogs all React components in the Thomas J Butler portfolio v3.5, showcasing the complete Matrix-themed component library built with TypeScript and React 19.

## Component Architecture

### Directory Structure
```
src/components/
├── Layout Components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Layout.tsx
├── Interactive Components/
│   ├── ContactForm.tsx
│   ├── BackToTop.tsx
│   └── CubeFace.tsx
├── Visual Effects/
│   ├── MatrixRain.tsx
│   ├── MatrixSpinner.tsx
│   └── GodModeDisplay.tsx
├── Blog Components/
│   ├── BlogCard.tsx
│   ├── BlogList.tsx
│   └── BlogReader.tsx
├── Data Display/
│   └── UpdatesFeed/
└── Utilities/
    ├── ErrorBoundary.tsx
    └── ReactHtmlRedirect.tsx
```

## Component Inventory

### Layout Components

#### Header.tsx
- **Location**: `/src/components/Header.tsx`
- **Styling**: `Header.module.css`
- **Props**: None
- **Description**: Main navigation header with Matrix theme and responsive design
- **Features**:
  - Hide-on-scroll behavior
  - Mobile-responsive hamburger menu
  - Matrix green aesthetic with glow effects
  - Smooth transitions with GPU acceleration
- **Usage**: 
  ```tsx
  import Header from '@/components/Header';
  <Header />
  ```

#### Footer.tsx
- **Location**: `/src/components/Footer.tsx`
- **Styling**: `Footer.module.css`
- **Props**: None
- **Description**: Site footer with social links, copyright, and Matrix styling
- **Features**:
  - Social media icons with hover effects
  - Copyright year auto-update
  - Back-to-top integration
  - Matrix scan line effects
- **Usage**:
  ```tsx
  import Footer from '@/components/Footer';
  <Footer />
  ```

#### Layout.tsx
- **Location**: `/src/components/Layout.tsx`
- **Styling**: `Layout.module.css`
- **Props**: 
  ```typescript
  interface LayoutProps {
    children: React.ReactNode;
    className?: string;
  }
  ```
- **Description**: Main layout wrapper providing consistent structure
- **Features**:
  - Header and footer integration
  - Matrix rain background
  - Scroll management
  - Performance optimizations
- **Usage**:
  ```tsx
  import Layout from '@/components/Layout';
  <Layout>
    <YourContent />
  </Layout>
  ```

### Interactive Components

#### ContactForm.tsx
- **Location**: `/src/components/ContactForm.tsx`
- **Styling**: `ContactForm.module.css`
- **Props**: None
- **Description**: Contact form with Formspree integration and Matrix styling
- **Features**:
  - Form validation with real-time feedback
  - Success/error states with animations
  - Matrix-themed input fields with glow effects
  - Honeypot spam protection
  - Loading states with Matrix spinner
- **State Management**:
  ```typescript
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  ```

#### BackToTop.tsx
- **Location**: `/src/components/BackToTop.tsx`
- **Props**: 
  ```typescript
  interface BackToTopProps {
    threshold?: number; // Default: 300px
    className?: string;
  }
  ```
- **Description**: Floating button to scroll back to top with Matrix terminal aesthetics
- **Features**:
  - Appears after scroll threshold
  - Smooth scroll animation
  - Blinking cursor effect
  - Glassmorphism with backdrop blur
  - Keyboard accessible (Tab + Enter)

#### CubeFace.tsx
- **Location**: `/src/components/CubeFace.tsx`
- **Props**:
  ```typescript
  interface CubeFaceProps {
    face: 'front' | 'back' | 'right' | 'left' | 'top' | 'bottom';
    project: {
      title: string;
      description: string;
      icon?: string;
      technologies: string[];
      liveUrl?: string;
      githubUrl?: string;
    };
  }
  ```
- **Description**: 3D cube face component for project showcase
- **Features**:
  - 3D transform positioning
  - Project information display
  - Interactive buttons with hover effects
  - Technology tags
  - Scan line animations

### Visual Effects Components

#### MatrixRain.tsx
- **Location**: `/src/components/MatrixRain.tsx`
- **Props**:
  ```typescript
  interface MatrixRainProps {
    density?: number;  // Column density (default: calculated)
    speed?: number;    // Fall speed multiplier (default: 1)
  }
  ```
- **Description**: Canvas-based Matrix rain background effect
- **Features**:
  - Variable drop speeds for depth
  - Color variations (green, cyan, neon)
  - Mouse interaction for speed boost
  - Glitch effects per column
  - Responsive column count
  - Performance optimized with RAF
- **Performance**:
  - Uses `requestAnimationFrame` for 60fps
  - Canvas operations batched
  - Memory efficient with refs

#### MatrixSpinner.tsx
- **Location**: `/src/components/MatrixSpinner.tsx`
- **Styling**: `MatrixSpinner.module.css`
- **Props**:
  ```typescript
  interface MatrixSpinnerProps {
    size?: 'small' | 'medium' | 'large';
    text?: string;
    className?: string;
  }
  ```
- **Description**: Loading spinner with Matrix digital rain aesthetic
- **Features**:
  - Three size variants
  - Optional loading text
  - Rotating Matrix characters
  - Glow effects
  - GPU accelerated animations

#### GodModeDisplay.tsx
- **Location**: `/src/components/GodModeDisplay.tsx`
- **Styling**: `GodModeDisplay.module.css`
- **Props**: None
- **Description**: Easter egg component activated by Konami code
- **Features**:
  - System stats display
  - Matrix terminal interface
  - Glitch text effects
  - Performance metrics
  - Debug information
- **Activation**: ↑ ↑ ↓ ↓ ← → ← → B A

### Blog Components

#### BlogCard.tsx
- **Location**: `/src/components/BlogCard.tsx`
- **Props**:
  ```typescript
  interface BlogCardProps {
    title: string;
    excerpt: string;
    date: string;
    slug: string;
    tags: string[];
    readTime: number;
    featured?: boolean;
  }
  ```
- **Description**: Blog post preview card with Matrix styling
- **Features**:
  - Hover animations with scale and glow
  - Tag display with Matrix colors
  - Read time indicator
  - Featured post highlighting
  - Responsive layout

#### BlogList.tsx
- **Location**: `/src/components/BlogList.tsx`
- **Props**:
  ```typescript
  interface BlogListProps {
    posts: BlogPost[];
    layout?: 'grid' | 'list';
    showFeatured?: boolean;
    maxPosts?: number;
  }
  ```
- **Description**: Blog post grid/list display component
- **Features**:
  - Grid and list view modes
  - Featured post support
  - Pagination ready
  - Animated entrance effects
  - Responsive columns

#### BlogReader.tsx
- **Location**: `/src/components/BlogReader.tsx`
- **Props**:
  ```typescript
  interface BlogReaderProps {
    content: string;
    metadata: {
      title: string;
      author: string;
      date: string;
      readTime: number;
      tags: string[];
    };
  }
  ```
- **Description**: Full blog post reader with typography controls
- **Features**:
  - Markdown rendering
  - Typography controls (size, spacing)
  - Reading progress indicator
  - Table of contents generation
  - Code syntax highlighting
  - Share functionality

### Data Display Components

#### UpdatesFeed.tsx
- **Location**: `/src/components/UpdatesFeed/UpdatesFeed.tsx`
- **Styling**: `UpdatesFeed.module.css`
- **Props**:
  ```typescript
  interface UpdatesFeedProps {
    updates: Update[];
    maxItems?: number;
    showDate?: boolean;
    animate?: boolean;
  }
  ```
- **Description**: Latest updates feed with timeline layout
- **Features**:
  - Timeline visualization
  - Animated entrance effects
  - Date formatting
  - Category badges
  - Expandable items

### Utility Components

#### ErrorBoundary.tsx
- **Location**: `/src/components/ErrorBoundary.tsx`
- **Styling**: `ErrorBoundary.module.css`
- **Props**:
  ```typescript
  interface ErrorBoundaryProps {
    children: React.ReactNode;
    fallback?: React.ComponentType<{ error: Error }>;
  }
  ```
- **Description**: Error boundary for graceful error handling
- **Features**:
  - Catches React component errors
  - Matrix-themed error display
  - Error logging
  - Recovery options
  - Stack trace in development

#### ReactHtmlRedirect.tsx
- **Location**: `/src/components/ReactHtmlRedirect.tsx`
- **Props**:
  ```typescript
  interface ReactHtmlRedirectProps {
    to: string;
    delay?: number; // milliseconds
  }
  ```
- **Description**: Utility component for redirecting between static and React pages
- **Features**:
  - Automatic redirection
  - Loading state
  - Fallback link
  - SEO friendly

## Custom Hooks

### useScrollDetection
```typescript
const { isScrollingDown, scrollY, isVisible } = useScrollDetection({
  threshold: 300,
  throttleMs: 16
});
```

### useMatrixAnimation
```typescript
const animationRef = useMatrixAnimation(elementRef, {
  duration: 600,
  delay: 100,
  easing: 'easeOutQuad'
});
```

### useScrollReveal
```typescript
const ref = useScrollReveal({
  threshold: 0.2,
  once: true,
  animation: 'fadeInUp'
});
```

### useCardAnimations
```typescript
const { 
  handleMouseEnter, 
  handleMouseLeave, 
  handleClick 
} = useCardAnimations(cardRef);
```

## CSS Modules Pattern

All components use CSS Modules for scoped styling:

```typescript
import styles from './Component.module.css';

<div className={styles.container}>
  <h1 className={styles.title}>Content</h1>
</div>
```

## Testing

### Test Structure
```
src/components/__tests__/
├── Header.test.tsx
├── Footer.test.tsx
├── ContactForm.test.tsx
├── MatrixSpinner.test.tsx
└── ErrorBoundary.test.tsx
```

### Running Tests
```bash
npm run test          # Run all tests
npm run test:ui       # Run with UI
npm run test:coverage # Generate coverage report
```

### Test Example
```typescript
import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  it('renders navigation links', () => {
    render(<Header />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });
});
```

## Performance Considerations

### Optimization Strategies
1. **Lazy Loading**: Heavy components loaded on demand
2. **Memoization**: Using `React.memo` for pure components
3. **Code Splitting**: Route-based splitting with React.lazy
4. **Virtual Scrolling**: For long lists (blog posts)
5. **Image Optimization**: WebP with fallbacks, lazy loading

### Bundle Size
- Total component bundle: ~45KB gzipped
- Largest component: MatrixRain (8KB)
- CSS Modules: ~15KB total

## Accessibility Features

### ARIA Support
- Proper ARIA labels on all interactive elements
- Role attributes for semantic meaning
- Live regions for dynamic content

### Keyboard Navigation
- All components keyboard accessible
- Focus management in modals
- Skip links in layout

### Screen Reader Support
- Semantic HTML structure
- Alternative text for visual elements
- Status announcements

## Future Components (Planned)

### v3.6 Components
- `ThemeToggle` - Dark/Light/Matrix theme switcher
- `ProjectGallery` - Enhanced project showcase
- `SkillsMatrix` - Interactive skills display
- `Timeline` - Career timeline visualization
- `CodeEditor` - Live code demonstration
- `ParticleField` - WebGL particle effects

### v4.0 Components
- `VoiceNav` - Voice-controlled navigation
- `AR/VRViewer` - 3D project previews
- `AIAssistant` - Interactive portfolio guide
- `LiveChat` - Real-time visitor chat
- `Analytics Dashboard` - Portfolio metrics

## Component Development Guidelines

### Creating New Components
1. Use TypeScript for type safety
2. Implement CSS Modules for styling
3. Include comprehensive props interface
4. Add JSDoc comments
5. Create unit tests
6. Document in this file

### Code Standards
```typescript
// Component template
import React from 'react';
import styles from './ComponentName.module.css';

interface ComponentNameProps {
  // Props interface
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  // Props destructuring
}) => {
  // Component logic
  
  return (
    <div className={styles.container}>
      {/* Component JSX */}
    </div>
  );
};

export default ComponentName;
```

## Resources

### Documentation
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [Anime.js](https://animejs.com)

### Design System
- See `/docs/design_system.md` for visual specifications
- Matrix theme colors and effects
- Animation timings and easings

---

*Last Updated: August 2025 - v3.5*
*Component Count: 15 active, 10 planned*