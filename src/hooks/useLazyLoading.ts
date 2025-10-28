/**
 * @author Tom Butler
 * @date 2025-10-28
 * @description Collection of lazy loading hooks for images, content, and videos
 *              using intersection observer for performance optimisation
 */

import { useEffect, useRef, useState } from 'react';

interface LazyLoadingOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Intersection observer hook for detecting element visibility
 * @param {LazyLoadingOptions} [options={}] - Observer configuration options
 * @return {{ elementRef: React.RefObject, isVisible: boolean, hasBeenVisible: boolean }}
 */
export const useIntersectionObserver = (options: LazyLoadingOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  const {
    threshold = 0.1,
    rootMargin = '50px',
    triggerOnce = true
  } = options;

  /**
   * @listens threshold, rootMargin, triggerOnce, hasBeenVisible - Sets up intersection observer
   */
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (hasBeenVisible && triggerOnce) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setIsVisible(isIntersecting);
        
        if (isIntersecting && !hasBeenVisible) {
          setHasBeenVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, hasBeenVisible]);

  return { elementRef, isVisible, hasBeenVisible };
};

/**
 * Lazy loads images when they enter viewport
 * @param {string} src - Image source URL
 * @param {LazyLoadingOptions} [options={}] - Observer configuration options
 * @return {{ elementRef: React.RefObject, imageSrc: string, imageLoaded: boolean, imageError: boolean, isVisible: boolean }}
 */
export const useLazyImage = (src: string, options: LazyLoadingOptions = {}) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { elementRef, isVisible } = useIntersectionObserver(options);

  /**
   * @listens isVisible, src - Loads image when element becomes visible
   */
  useEffect(() => {
    if (!isVisible || !src) return;

    const img = new Image();
    
    img.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
      setImageError(false);
    };
    
    img.onerror = () => {
      setImageError(true);
      setImageLoaded(false);
    };
    
    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [isVisible, src]);

  return {
    elementRef,
    imageSrc,
    imageLoaded,
    imageError,
    isVisible
  };
};

/**
 * Lazy loads content when element enters viewport
 * @param {Function} loadContent - Async function that loads content
 * @param {LazyLoadingOptions} [options={}] - Observer configuration options
 * @return {{ elementRef: React.RefObject, content: T | null, loading: boolean, error: Error | null, isVisible: boolean }}
 */
export const useLazyContent = <T>(
  loadContent: () => Promise<T>,
  options: LazyLoadingOptions = {}
) => {
  const [content, setContent] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { elementRef, isVisible } = useIntersectionObserver(options);

  /**
   * @listens isVisible, content, loadContent - Loads content when visible
   */
  useEffect(() => {
    if (!isVisible || content !== null) return;

    setLoading(true);
    setError(null);

    loadContent()
      .then((loadedContent) => {
        setContent(loadedContent);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [isVisible, content, loadContent]);

  return {
    elementRef,
    content,
    loading,
    error,
    isVisible
  };
};

/**
 * Progressive image loading starting with low quality, upgrading to high quality
 * @param {string} lowQualitySrc - Low quality image source for initial load
 * @param {string} highQualitySrc - High quality image source for final render
 * @param {LazyLoadingOptions} [options={}] - Observer configuration options
 * @return {{ elementRef: React.RefObject, currentSrc: string, isHighQualityLoaded: boolean, isVisible: boolean }}
 */
export const useProgressiveImage = (
  lowQualitySrc: string,
  highQualitySrc: string,
  options: LazyLoadingOptions = {}
) => {
  const [currentSrc, setCurrentSrc] = useState(lowQualitySrc);
  const [isHighQualityLoaded, setIsHighQualityLoaded] = useState(false);
  const { elementRef, isVisible } = useIntersectionObserver(options);

  /**
   * @listens isVisible, lowQualitySrc, highQualitySrc - Progressively loads images
   */
  useEffect(() => {
    if (!isVisible) return;

    setCurrentSrc(lowQualitySrc);

    const highQualityImg = new Image();
    highQualityImg.onload = () => {
      setCurrentSrc(highQualitySrc);
      setIsHighQualityLoaded(true);
    };
    highQualityImg.src = highQualitySrc;

    return () => {
      highQualityImg.onload = null;
    };
  }, [isVisible, lowQualitySrc, highQualitySrc]);

  return {
    elementRef,
    currentSrc,
    isHighQualityLoaded,
    isVisible
  };
};

/**
 * Preloads multiple images for improved user experience
 * @param {string[]} imageSources - Array of image URLs to preload
 * @return {{ loadedImages: Set<string>, failedImages: Set<string>, isImageLoaded: Function, isImageFailed: Function }}
 */
export const useImagePreloader = (imageSources: string[]) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  /**
   * @listens imageSources - Preloads all images when sources array changes
   */
  useEffect(() => {
    if (imageSources.length === 0) return;

    const preloadImage = (src: string) => {
      return new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = () => reject(src);
        img.src = src;
      });
    };

    const preloadAll = async () => {
      const results = await Promise.allSettled(
        imageSources.map(preloadImage)
      );

      const loaded = new Set<string>();
      const failed = new Set<string>();

      results.forEach((result, index) => {
        const src = imageSources[index];
        if (result.status === 'fulfilled') {
          loaded.add(src);
        } else {
          failed.add(src);
        }
      });

      setLoadedImages(loaded);
      setFailedImages(failed);
    };

    preloadAll();
  }, [imageSources]);

  return {
    loadedImages,
    failedImages,
    isImageLoaded: (src: string) => loadedImages.has(src),
    isImageFailed: (src: string) => failedImages.has(src)
  };
};

/**
 * Lazy loads video when element enters viewport
 * @param {string} src - Video source URL
 * @param {LazyLoadingOptions} [options={}] - Observer configuration options
 * @return {{ elementRef: React.RefObject, videoRef: React.RefObject, videoSrc: string, isLoaded: boolean, isVisible: boolean }}
 */
export const useLazyVideo = (src: string, options: LazyLoadingOptions = {}) => {
  const [videoSrc, setVideoSrc] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { elementRef, isVisible } = useIntersectionObserver(options);

  /**
   * @listens isVisible, src - Loads video when element becomes visible
   */
  useEffect(() => {
    if (!isVisible || !src) return;

    setVideoSrc(src);
    
    const video = videoRef.current;
    if (video) {
      const handleLoad = () => setIsLoaded(true);
      video.addEventListener('loadeddata', handleLoad);
      
      return () => video.removeEventListener('loadeddata', handleLoad);
    }
  }, [isVisible, src]);

  return {
    elementRef,
    videoRef,
    videoSrc,
    isLoaded,
    isVisible
  };
};

export default useIntersectionObserver;
