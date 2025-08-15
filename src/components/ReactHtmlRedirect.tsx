import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const ReactHtmlRedirect: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasNavigated = useRef(false);

  useEffect(() => {
    // Only process redirect once
    if (hasNavigated.current) return;
    
    // Check for hash-based redirect (e.g., #blog)
    const hash = window.location.hash.replace('#', '');
    
    // Also check for query parameter redirect
    const searchParams = new URLSearchParams(location.search);
    const redirect = searchParams.get('redirect') || hash;
    
    // Check if we're on react.html path and need to redirect
    const isReactHtml = window.location.pathname.includes('react.html');
    
    if ((redirect || isReactHtml) && !hasNavigated.current) {
      hasNavigated.current = true;
      
      // Map redirect values to routes
      const routeMap: Record<string, string> = {
        'blog': '/blog',
        'about': '/about',
        'skills': '/skills',
        'projects': '/projects',
        'services': '/services',
        'contact': '/contact'
      };
      
      const route = routeMap[redirect?.toLowerCase()] || '/';
      
      // Clear the hash and navigate to the route using React Router
      window.location.hash = '';
      
      // Use React Router's navigate function for SPA navigation
      navigate(route, { replace: true });
    }
  }, [navigate, location.search, location.pathname]);

  return null;
};