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
    
    if (redirect && !hasNavigated.current) {
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
      
      const route = routeMap[redirect.toLowerCase()];
      if (route) {
        // Clear the hash and navigate to the route
        window.location.hash = '';
        navigate(route, { replace: true });
      }
    }
  }, [navigate, location.search]);

  return null;
};