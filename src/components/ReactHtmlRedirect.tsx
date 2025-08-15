import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const ReactHtmlRedirect: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasNavigated = useRef(false);

  useEffect(() => {
    // Only process redirect once
    if (hasNavigated.current) return;
    
    // Get redirect parameter from URL
    const searchParams = new URLSearchParams(location.search);
    const redirect = searchParams.get('redirect');
    
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
        // Navigate to the route and remove the query parameter
        navigate(route, { replace: true });
      }
    }
  }, [navigate, location.search]);

  return null;
};