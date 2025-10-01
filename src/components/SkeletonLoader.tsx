import React from 'react';
import styles from './SkeletonLoader.module.css';

interface SkeletonLoaderProps {
  variant?: 'text' | 'rect' | 'circle' | 'card';
  width?: string;
  height?: string;
  className?: string;
  count?: number;
}

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

// Preset skeleton for blog cards
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

// Preset skeleton for gallery cards
export const GalleryCardSkeleton: React.FC = () => (
  <div className={styles.galleryCardSkeleton}>
    <SkeletonLoader variant="circle" width="60px" height="60px" />
    <SkeletonLoader variant="text" width="70%" height="24px" />
    <SkeletonLoader variant="text" width="90%" count={2} />
    <SkeletonLoader variant="rect" width="150px" height="40px" />
  </div>
);

// Preset skeleton for image placeholders
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
