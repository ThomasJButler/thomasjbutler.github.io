/**
 * @author Tom Butler
 * @date 2025-10-28
 * @description Skeleton loading placeholders with multiple variants and
 *              preset components for common loading states
 */

import React from 'react';
import styles from './SkeletonLoader.module.css';

interface SkeletonLoaderProps {
  variant?: 'text' | 'rect' | 'circle' | 'card';
  width?: string;
  height?: string;
  className?: string;
  count?: number;
}

/**
 * Configurable skeleton loading placeholder
 * @param {Object} props
 * @param {string} [props.variant='rect'] - Skeleton shape type
 * @param {string} [props.width='100%'] - Width CSS value
 * @param {string} [props.height='20px'] - Height CSS value
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {number} [props.count=1] - Number of skeleton elements to render
 * @return {JSX.Element}
 * @constructor
 */
export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'rect',
  width = '100%',
  height = '20px',
  className = '',
  count = 1
}) => {
  const renderSkeleton = (index: number) => {
    const baseClasses = `${styles.skeleton} ${styles[variant]} ${className}`;

    return (
      <div
        key={index}
        className={baseClasses}
        style={{
          width,
          height: variant === 'text' ? '1em' : height
        }}
        aria-hidden="true"
      />
    );
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => renderSkeleton(index))}
    </>
  );
};

/**
 * Preset skeleton for blog card loading state
 * @return {JSX.Element}
 * @constructor
 */
export const BlogCardSkeleton: React.FC = () => (
  <div className={styles.blogCardSkeleton}>
    <SkeletonLoader variant="rect" height="200px" />
    <div className={styles.blogCardContent}>
      <SkeletonLoader variant="text" width="60%" height="24px" />
      <SkeletonLoader variant="text" width="90%" count={3} />
      <div className={styles.blogCardMeta}>
        <SkeletonLoader variant="text" width="100px" />
        <SkeletonLoader variant="text" width="120px" />
      </div>
    </div>
  </div>
);

/**
 * Preset skeleton for gallery card loading state
 * @return {JSX.Element}
 * @constructor
 */
export const GalleryCardSkeleton: React.FC = () => (
  <div className={styles.galleryCardSkeleton}>
    <SkeletonLoader variant="circle" width="60px" height="60px" />
    <SkeletonLoader variant="text" width="70%" height="24px" />
    <SkeletonLoader variant="text" width="90%" count={2} />
    <SkeletonLoader variant="rect" width="150px" height="40px" />
  </div>
);

/**
 * Preset skeleton for image loading placeholder
 * @param {Object} props
 * @param {string} [props.aspectRatio='16/9'] - Image aspect ratio
 * @return {JSX.Element}
 * @constructor
 */
export const ImageSkeleton: React.FC<{ aspectRatio?: string }> = ({
  aspectRatio = '16/9'
}) => (
  <div
    className={styles.imageSkeleton}
    style={{ aspectRatio }}
  >
    <SkeletonLoader variant="rect" height="100%" />
  </div>
);
