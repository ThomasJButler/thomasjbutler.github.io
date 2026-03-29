import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';

const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const UpdatesPage = lazy(() => import('./pages/UpdatesPage').then(m => ({ default: m.UpdatesPage })));

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="size-8 animate-spin rounded-full border-2 border-matrix-700 border-t-matrix-500" />
    </div>
  );
}

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Suspense fallback={<PageLoader />}><HomePage /></Suspense>} />
          <Route path="about" element={<Suspense fallback={<PageLoader />}><AboutPage /></Suspense>} />
          <Route path="projects" element={<Suspense fallback={<PageLoader />}><ProjectsPage /></Suspense>} />
          <Route path="services" element={<Suspense fallback={<PageLoader />}><ServicesPage /></Suspense>} />
          <Route path="contact" element={<Suspense fallback={<PageLoader />}><ContactPage /></Suspense>} />
          <Route path="updates" element={<Suspense fallback={<PageLoader />}><UpdatesPage /></Suspense>} />

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
        </Route>
      </Routes>
    </Router>
  );
}
