import { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';

const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const UpdatesPage = lazy(() => import('./pages/UpdatesPage').then(m => ({ default: m.UpdatesPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

/**
 * The route tree without a Router, so tests can mount it inside a MemoryRouter
 * without nesting two routers.
 *
 * Suspense lives in Layout's PageTransition rather than per-route: with
 * AnimatePresence mode="wait", a per-route fallback would replace the incoming
 * page mid-transition and the enter animation would never play.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="updates" element={<UpdatesPage />} />

        {/* Legacy redirects */}
        <Route path="react.html" element={<Navigate to="/" replace />} />
        <Route path="index.html" element={<Navigate to="/" replace />} />
        <Route path="about.html" element={<Navigate to="/about" replace />} />
        <Route path="skills.html" element={<Navigate to="/services" replace />} />
        <Route path="skills" element={<Navigate to="/services" replace />} />
        <Route path="projects.html" element={<Navigate to="/projects" replace />} />
        <Route path="services.html" element={<Navigate to="/services" replace />} />
        <Route path="contact.html" element={<Navigate to="/contact" replace />} />
        <Route path="sitemap.html" element={<Navigate to="/" replace />} />
        <Route path="sitemap" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
