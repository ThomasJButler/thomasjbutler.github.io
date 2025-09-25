import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { animate } from 'animejs';
import { initKeyboardNavigation } from './utils/keyboardNavigation';
import { performanceOptimizer } from './utils/performanceOptimizer';
import { ThemeProvider } from './contexts/ThemeContext';

// Layout (not lazy loaded as it's needed immediately)
import { Layout } from './components/Layout';

// Components (not lazy loaded as they're used frequently)
import { GodModeDisplay } from './components/GodModeDisplay';
import { MatrixSpinner } from './components/MatrixSpinner';
import { ReactHtmlRedirect } from './components/ReactHtmlRedirect';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const SkillsPage = lazy(() => import('./pages/SkillsPage').then(m => ({ default: m.SkillsPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const SitemapPage = lazy(() => import('./pages/SitemapPage').then(m => ({ default: m.SitemapPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const BlogReader = lazy(() => import('./components/BlogReader').then(m => ({ default: m.BlogReader })));

// Styles - Import order matters!
import './css/base/_reset.css';
import './css/base/_variables.css';
import './css/base/_typography.css';
import './css/themes.css'; // Theme system
import './css/main.css';
import './css/styles.css';
import './css/global.css';
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

  // Page loading fallback component
  const PageLoader = () => (
    <MatrixSpinner isLoading={true} size="large" text="Loading page..." />
  );

  return (
    <ThemeProvider>
      <Router basename="/ThomasJButler">
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
            <Route path="blog" element={
              <Suspense fallback={<PageLoader />}>
                <BlogPage />
              </Suspense>
            } />
            <Route path="blog/:slug" element={
              <Suspense fallback={<PageLoader />}>
                <BlogReader />
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
      <GodModeDisplay />
    </ThemeProvider>
  );
};