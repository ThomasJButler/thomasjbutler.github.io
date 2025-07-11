# API Documentation

## Component API Reference

### Header Component

```typescript
interface HeaderProps {
  className?: string;
}
```

**Usage:**
```tsx
import { Header } from './components/Header';

<Header className="custom-header" />
```

### MatrixRain Component

```typescript
interface MatrixRainProps {
  className?: string;
  fontSize?: number;
  baseSpeed?: number;
  density?: number;
}
```

**Props:**
- `fontSize` (number): Size of Matrix characters (default: 16)
- `baseSpeed` (number): Base falling speed (default: 0.5)
- `density` (number): Character density (default: 0.995)

### Layout Component

```typescript
interface LayoutProps {
  children: React.ReactNode;
}
```

**Features:**
- Provides consistent page structure
- Handles page transitions
- Includes Header and Footer

## Custom Hooks

### useMatrixAnimation

```typescript
const useMatrixAnimation = (
  elementRef: RefObject<HTMLElement>,
  options?: MatrixAnimationOptions
): void
```

**Options:**
```typescript
interface MatrixAnimationOptions {
  duration?: number;
  delay?: number;
  easing?: string;
}
```

**Example:**
```typescript
const divRef = useRef<HTMLDivElement>(null);
useMatrixAnimation(divRef, {
  duration: 1000,
  delay: 200,
  easing: 'easeOutElastic'
});
```

## Animation Utilities

### Matrix Animations

```typescript
import { 
  fadeInUp, 
  glitchText, 
  matrixGlow,
  pulseEffect 
} from '@/utils/animations/matrixAnimations';
```

**fadeInUp(element: HTMLElement, options?: AnimationOptions)**
- Fades element in while moving up

**glitchText(element: HTMLElement, options?: AnimationOptions)**
- Creates glitch effect on text

**matrixGlow(element: HTMLElement, options?: AnimationOptions)**
- Adds Matrix-style glow effect

**pulseEffect(element: HTMLElement, options?: AnimationOptions)**
- Creates pulsing animation

## Page Components

All page components follow the same structure:

```typescript
export const PageName = () => {
  return (
    <div className="page-container">
      {/* Page content */}
    </div>
  );
};
```

Available pages:
- `HomePage`
- `AboutPage`
- `SkillsPage`
- `ProjectsPage`
- `ServicesPage`
- `ContactPage`

## Styling API

### CSS Variables

The design system exposes CSS custom properties:

```css
/* Colors */
--matrix-green: #00FF00;
--matrix-dark: rgba(0, 20, 0, 0.8);
--matrix-cyan: #00FFFF;

/* Spacing */
--space-xs: 0.25rem;
--space-sm: 0.5rem;
--space-md: 1rem;
--space-lg: 1.5rem;

/* Typography */
--font-primary: 'VT323', monospace;
--font-secondary: system-ui, -apple-system, sans-serif;

/* Animation */
--duration-fast: 150ms;
--duration-base: 300ms;
--duration-slow: 500ms;
```

### CSS Modules

Components use CSS Modules for styling:

```typescript
import styles from './Component.module.css';

<div className={styles.container}>
  <h1 className={styles.title}>Title</h1>
</div>
```

## GodMode API

### Activation

Press `Ctrl+Shift+G` to toggle GodMode display.

### Metrics Available

```typescript
interface GodModeMetrics {
  componentsCreated: number;
  animationsImplemented: number;
  performanceScore: number;
  codeQuality: number;
  testCoverage: number;
}
```