import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import anime from './utils/anime';

// Layout
import { Layout } from './components/Layout';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { SkillsPage } from './pages/SkillsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';

// Components
import { GodModeDisplay } from './components/GodModeDisplay';

// Styles
import './css/base/_reset.css';
import './css/base/_typography.css';
import './css/base/_variables.css';
import './css/global.css';

export const App: React.FC = () => {
  useEffect(() => {
    // Initial app load animation
    anime({
      targets: '#root',
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutQuad',
      complete: () => {
        // Trigger Matrix rain effect after app loads
        const event = new CustomEvent('appLoaded');
        window.dispatchEvent(event);
      }
    });
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="skills" element={<SkillsPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="contact" element={<ContactPage />} />
            
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