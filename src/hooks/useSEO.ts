/**
 * @author Tom Butler
 * @date 2025-10-28
 * @description SEO management hook for updating meta tags, Open Graph properties,
 *              Twitter Card data, and structured data on page load
 */

import { useEffect } from 'react';

interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

/**
 * Manages SEO metadata and structured data for the current page
 * @param {SEOConfig} config - SEO configuration object with meta tags and structured data
 */
export const useSEO = (config: SEOConfig) => {
  /**
   * @listens config - Updates all SEO meta tags and structured data when configuration changes
   */
  useEffect(() => {
    const { 
      title, 
      description, 
      keywords, 
      ogTitle, 
      ogDescription, 
      ogImage, 
      ogUrl,
      twitterCard = 'summary_large_image',
      twitterTitle,
      twitterDescription,
      twitterImage,
      canonicalUrl,
      structuredData
    } = config;

    if (title) {
      document.title = title;
    }

    const updateMetaTag = (property: string, content: string, useProperty = false) => {
      const attribute = useProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${property}"]`) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      
      element.content = content;
    };

    if (description) {
      updateMetaTag('description', description);
    }

    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    if (ogTitle) {
      updateMetaTag('og:title', ogTitle, true);
    }

    if (ogDescription) {
      updateMetaTag('og:description', ogDescription, true);
    }

    if (ogImage) {
      updateMetaTag('og:image', ogImage, true);
    }

    if (ogUrl) {
      updateMetaTag('og:url', ogUrl, true);
    }

    updateMetaTag('og:type', 'website', true);

    updateMetaTag('twitter:card', twitterCard);

    if (twitterTitle) {
      updateMetaTag('twitter:title', twitterTitle);
    }

    if (twitterDescription) {
      updateMetaTag('twitter:description', twitterDescription);
    }

    if (twitterImage) {
      updateMetaTag('twitter:image', twitterImage);
    }

    if (canonicalUrl) {
      let canonicalElement = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      
      if (!canonicalElement) {
        canonicalElement = document.createElement('link');
        canonicalElement.rel = 'canonical';
        document.head.appendChild(canonicalElement);
      }
      
      canonicalElement.href = canonicalUrl;
    }

    if (structuredData) {
      let structuredDataElement = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      
      if (!structuredDataElement) {
        structuredDataElement = document.createElement('script');
        structuredDataElement.type = 'application/ld+json';
        document.head.appendChild(structuredDataElement);
      }
      
      structuredDataElement.textContent = JSON.stringify(structuredData);
    }

    return () => {
      document.title = 'Thomas J Butler - Full Stack Developer';
    };
  }, [config]);
};

export default useSEO;
