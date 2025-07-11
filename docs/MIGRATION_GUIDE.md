# Migration Guide: Static HTML to React

## Overview

This guide documents the migration from a static HTML portfolio to a modern React application with TypeScript and Anime.js animations.

## Migration Steps

### 1. Project Setup

```bash
# Install React dependencies
npm install react@rc react-dom@rc react-router-dom@latest

# Install TypeScript
npm install -D typescript @types/react @types/react-dom

# Install Anime.js
npm install animejs@latest
```

### 2. File Structure Changes

**Before:**
```
├── index.html
├── about.html
├── src/
│   ├── css/
│   ├── js/
│   └── images/
```

**After:**
```
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── utils/
│   ├── styles/
│   ├── App.tsx
│   └── main.tsx
├── index-react.html
```

### 3. Component Migration

#### Converting HTML to React Components

**Before (HTML):**
```html
<header class="site-header">
  <h1>Thomas J Butler</h1>
  <nav>
    <a href="about.html">About</a>
  </nav>
</header>
```

**After (React):**
```tsx
export const Header = () => {
  return (
    <header className={styles.header}>
      <h1>Thomas J Butler</h1>
      <nav>
        <Link to="/about">About</Link>
      </nav>
    </header>
  );
};
```

### 4. Animation Migration

#### Converting jQuery/Vanilla JS to Anime.js

**Before:**
```javascript
// GSAP animation
gsap.to('.element', {
  duration: 1,
  opacity: 1,
  y: -20
});
```

**After:**
```typescript
// Anime.js with React Hook
useEffect(() => {
  anime({
    targets: elementRef.current,
    duration: 1000,
    opacity: [0, 1],
    translateY: [-20, 0],
    easing: 'easeOutElastic(1, .5)'
  });
}, []);
```

### 5. Routing Setup

**React Router Configuration:**
```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

<BrowserRouter>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
    {/* More routes */}
  </Routes>
</BrowserRouter>
```

### 6. State Management

**Local State with Hooks:**
```tsx
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [theme, setTheme] = useState('matrix');
```

### 7. CSS Migration

**CSS Modules:**
```css
/* Header.module.css */
.header {
  background: var(--matrix-dark);
  border-bottom: 2px solid var(--matrix-green);
}

.navLink {
  color: var(--matrix-green);
  transition: all var(--duration-base) ease;
}
```

### 8. Build Configuration

**Vite Configuration:**
```javascript
export default defineConfig({
  plugins: [react(), legacy()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index-react.html'),
        // Legacy pages
        legacy: resolve(__dirname, 'index.html'),
      }
    }
  }
});
```

## Common Gotchas

### 1. Anime.js v4 Imports
```typescript
// Wrong
import anime from 'animejs';

// Right - Create wrapper
import { animate, stagger } from 'animejs';
const anime = Object.assign(animate, { stagger });
```

### 2. React 19 Compatibility
- Use `@rc` versions for React packages
- Update event handlers to new syntax
- Use new hooks like `useId()`

### 3. TypeScript Strict Mode
- Enable strict mode in tsconfig.json
- Fix all type errors before deployment
- Use proper typing for all components

### 4. Performance Optimization
- Lazy load components
- Use React.memo for expensive components
- Implement code splitting

## Testing Migration

```bash
# Run tests
npm run test

# Check types
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview
```

## Rollback Strategy

If issues arise:
1. The original HTML files remain intact
2. Switch nginx/Apache config back to serve index.html
3. All legacy routes continue to work

## Deployment

1. Build the project: `npm run build`
2. Deploy dist folder to hosting
3. Configure server to serve index-react.html for React app
4. Keep legacy HTML files for backward compatibility

## Future Considerations

- Server-side rendering with Next.js
- Progressive Web App features
- Advanced state management (Redux/Zustand)
- API integration for dynamic content