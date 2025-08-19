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

export const useSEO = (config: SEOConfig) => {
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

    // Update document title
    if (title) {
      document.title = title;
    }

    // Helper function to update or create meta tags
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

    // Update basic meta tags
    if (description) {
      updateMetaTag('description', description);
    }

    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    // Update Open Graph tags
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

    // Update Twitter Card tags
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

    // Update canonical URL
    if (canonicalUrl) {
      let canonicalElement = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      
      if (!canonicalElement) {
        canonicalElement = document.createElement('link');
        canonicalElement.rel = 'canonical';
        document.head.appendChild(canonicalElement);
      }
      
      canonicalElement.href = canonicalUrl;
    }

    // Add structured data
    if (structuredData) {
      let structuredDataElement = document.querySelector('script[type="application/ld+json"]');
      
      if (!structuredDataElement) {
        structuredDataElement = document.createElement('script');
        structuredDataElement.type = 'application/ld+json';
        document.head.appendChild(structuredDataElement);
      }
      
      structuredDataElement.textContent = JSON.stringify(structuredData);
    }

    // Cleanup function to reset on component unmount
    return () => {
      // Reset title to default
      document.title = 'Thomas J Butler - Full Stack Developer';
    };
  }, [config]);
};

export default useSEO;