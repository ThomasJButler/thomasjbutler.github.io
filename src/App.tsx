import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { initKeyboardNavigation } from './utils/keyboardNavigation';
import { performanceOptimizer } from './utils/performanceOptimizer';
import { ThemeProvider } from './contexts/ThemeContext';

// Layout (not lazy loaded as it's needed immediately)
import { Layout } from './components/Layout';

// Components (not lazy loaded as they're used frequently)
import { ReactHtmlRedirect } from './components/ReactHtmlRedirect';
import { BackToTop } from './components/BackToTop';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const SkillsPage = lazy(() => import('./pages/SkillsPage').then(m => ({ default: m.SkillsPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const SitemapPage = lazy(() => import('./pages/SitemapPage').then(m => ({ default: m.SitemapPage })));
// Blog pages - temporarily hidden for deployment
// const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
// const BlogReader = lazy(() => import('./components/BlogReader').then(m => ({ default: m.BlogReader })));
const UpdatesPage = lazy(() => import('./pages/UpdatesPage').then(m => ({ default: m.default })));

// Styles - Optimized import order
import './css/themes.css'; // Theme system
import './css/main.css'; // Main CSS with all organized imports
import './css/matrix-effects.css'; // Matrix visual effects and animations
import './css/blog.css';

export const App: React.FC = () => {
  useEffect(() => {
    // Initialize performance optimization
    const settings = performanceOptimizer.getSettings();
    console.log('App initialized with performance settings:', settings);
    
    // Add loaded class to body to show content (prevent FOUC hiding)
    document.body.classList.add('loaded');
    
    // Initialize keyboard navigation
    initKeyboardNavigation();
    
    // Quick fade-in without heavy animation
    const root = document.getElementById('root');
    if (root) {
      root.style.opacity = '0';
      requestAnimationFrame(() => {
        root.style.transition = 'opacity 0.3s ease-out';
        root.style.opacity = '1';
        
        // Trigger Matrix rain effect after app loads
        setTimeout(() => {
          const event = new CustomEvent('appLoaded');
          window.dispatchEvent(event);
        }, 300);
      });
    }
  }, []);

  // Page loading fallback component - minimal/silent for professional feel
  const PageLoader = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(2px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid rgba(0, 255, 0, 0.2)',
        borderTop: '3px solid var(--matrix-green, #00ff00)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );

  return (
    <ThemeProvider>
      {/* Global components outside Router to avoid context issues */}
      <BackToTop threshold={300} showText={true} enableScanLine={true} />
      <Router>
        <ReactHtmlRedirect />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={
              <Suspense fallback={<PageLoader />}>
                <HomePage />
              </Suspense>
            } />
            <Route path="about" element={
              <Suspense fallback={<PageLoader />}>
                <AboutPage />
              </Suspense>
            } />
            <Route path="skills" element={
              <Suspense fallback={<PageLoader />}>
                <SkillsPage />
              </Suspense>
            } />
            <Route path="projects" element={
              <Suspense fallback={<PageLoader />}>
                <ProjectsPage />
              </Suspense>
            } />
            <Route path="services" element={
              <Suspense fallback={<PageLoader />}>
                <ServicesPage />
              </Suspense>
            } />
            <Route path="contact" element={
              <Suspense fallback={<PageLoader />}>
                <ContactPage />
              </Suspense>
            } />
            <Route path="sitemap" element={
              <Suspense fallback={<PageLoader />}>
                <SitemapPage />
              </Suspense>
            } />
            {/* Blog routes - temporarily hidden for deployment */}
            {/* <Route path="blog" element={
              <Suspense fallback={<PageLoader />}>
                <BlogPage />
              </Suspense>
            } />
            <Route path="blog/:slug" element={
              <Suspense fallback={<PageLoader />}>
                <BlogReader />
              </Suspense>
            } /> */}
            <Route path="updates" element={
              <Suspense fallback={<PageLoader />}>
                <UpdatesPage />
              </Suspense>
            } />

            {/* Legacy HTML file redirects */}
            <Route path="index.html" element={<Navigate to="/" replace />} />
            <Route path="about.html" element={<Navigate to="/about" replace />} />
            <Route path="skills.html" element={<Navigate to="/skills" replace />} />
            <Route path="projects.html" element={<Navigate to="/projects" replace />} />
            <Route path="services.html" element={<Navigate to="/services" replace />} />
            <Route path="contact.html" element={<Navigate to="/contact" replace />} />
            <Route path="sitemap.html" element={<Navigate to="/sitemap" replace />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};
