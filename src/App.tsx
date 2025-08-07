import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { animate } from 'animejs';
import { initKeyboardNavigation } from './utils/keyboardNavigation';

// Layout (not lazy loaded as it's needed immediately)
import { Layout } from './components/Layout';

// Components (not lazy loaded as they're used frequently)
import { GodModeDisplay } from './components/GodModeDisplay';
import { MatrixSpinner } from './components/MatrixSpinner';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const SkillsPage = lazy(() => import('./pages/SkillsPage').then(module => ({ default: module.SkillsPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then(module => ({ default: module.ProjectsPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(module => ({ default: module.ServicesPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));

// Styles
import './css/base/_reset.css';
import './css/base/_typography.css';
import './css/base/_variables.css';
import './css/global.css';

export const App: React.FC = () => {
  useEffect(() => {
    // Initialize keyboard navigation
    initKeyboardNavigation();
    
    // Initial app load animation
    const root = document.getElementById('root');
    if (root) {
      animate(root, {
        opacity: [0, 1],
        duration: 1000,
        ease: 'outQuad',
        complete: () => {
          // Trigger Matrix rain effect after app loads
          const event = new CustomEvent('appLoaded');
          window.dispatchEvent(event);
        }
      });
    }
  }, []);

  // Page loading fallback component
  const PageLoader = () => (
    <MatrixSpinner isLoading={true} size="large" text="Loading page..." />
  );

  return (
    <>
      <Router basename="/ThomasJButler">
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
            
            {/* Legacy HTML file redirects */}
            <Route path="index.html" element={<Navigate to="/" replace />} />
            <Route path="about.html" element={<Navigate to="/about" replace />} />
            <Route path="skills.html" element={<Navigate to="/skills" replace />} />
            <Route path="projects.html" element={<Navigate to="/projects" replace />} />
            <Route path="services.html" element={<Navigate to="/services" replace />} />
            <Route path="contact.html" element={<Navigate to="/contact" replace />} />
          </Route>
        </Routes>
      </Router>
      <GodModeDisplay />
    </>
  );
};