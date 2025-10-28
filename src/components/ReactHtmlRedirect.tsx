/**
 * @author Tom Butler
 * @date 2025-10-28
 * @description Redirect handler for transitioning from static HTML pages to React routes
 *              using hash fragments and query parameters
 */

import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Silent redirect component for HTML to React route transitions
 * @return {null}
 * @constructor
 */
export const ReactHtmlRedirect: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasNavigated = useRef(false);

  /**
   * @constructs Processes redirect from hash or query parameters on initial mount
   *             Prevents duplicate navigation with ref guard
   */
  useEffect(() => {
    if (hasNavigated.current) return;
    
    const hash = window.location.hash.replace('#', '');
    
    const searchParams = new URLSearchParams(location.search);
    const redirect = searchParams.get('redirect') || hash;
    
    const isReactHtml = window.location.pathname.includes('react.html');
    
    if ((redirect || isReactHtml) && !hasNavigated.current) {
      hasNavigated.current = true;
      
      let route = '/';
      
      if (redirect) {
        if (redirect.startsWith('/')) {
          route = redirect;
        } else {
          const routeMap: Record<string, string> = {
            'blog': '/blog',
            'about': '/about',
            'skills': '/skills',
            'projects': '/projects',
            'services': '/services',
            'contact': '/contact'
          };
          
          route = routeMap[redirect.toLowerCase()] || '/';
        }
      }
      
      window.location.hash = '';
      
      navigate(route, { replace: true });
      return;
    }
  }, [navigate, location.search, location.pathname]);

  return null;
};
