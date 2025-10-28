/**
 * @author Tom Butler
 * @date 2025-10-28
 * @description Matrix-themed loading spinner with progress bar support and
 *              animated character rotation effects
 */

import React, { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import styles from './MatrixSpinner.module.css';

interface MatrixSpinnerProps {
  isLoading?: boolean;
  size?: 'small' | 'normal' | 'large';
  showProgress?: boolean;
  progress?: number;
  text?: string;
}

/**
 * Animated loading spinner with Matrix character effects
 * @param {Object} props
 * @param {boolean} [props.isLoading=false] - Controls spinner visibility
 * @param {string} [props.size='normal'] - Spinner size variant
 * @param {boolean} [props.showProgress=false] - Display progress bar
 * @param {number} [props.progress=0] - Progress percentage (0-100)
 * @param {string} [props.text='Loading'] - Loading text label
 * @return {JSX.Element | null}
 * @constructor
 */
export const MatrixSpinner: React.FC<MatrixSpinnerProps> = ({ 
  isLoading = false,
  size = 'normal',
  showProgress = false,
  progress = 0,
  text = 'Loading'
}) => {
  const spinnerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);

  /**
   * @listens isLoading - Initialises character animations when spinner becomes visible
   */
  useEffect(() => {
    if (!isLoading || !spinnerRef.current) return;

    const charElements = charsRef.current.filter(Boolean);
    if (charElements.length > 0) {
      const animation = animate(charElements, {
        opacity: [0.2, 1, 0.2],
        scale: [0.8, 1.2, 0.8],
        translateY: [0, -5, 0],
        duration: 1500,
        delay: stagger(100),
        loop: true,
        ease: 'inOutQuad'
      });

      const innerContainer = spinnerRef.current.querySelector(`.${styles.spinnerInner}`);
      if (innerContainer) {
        animate(innerContainer as HTMLElement, {
          rotate: [0, 360],
          duration: 8000,
          loop: true,
          ease: 'linear'
        });
      }

      return () => {
        animation.pause();
      };
    }
  }, [isLoading]);

  /**
   * @listens progress, showProgress - Updates progress bar animation on value changes
   */
  useEffect(() => {
    if (showProgress && progressBarRef.current) {
      animate(progressBarRef.current, {
        scaleX: progress / 100,
        duration: 300,
        ease: 'outQuad'
      });
    }
  }, [progress, showProgress]);

  if (!isLoading) return null;

  const matrixChars = '01アイウエオカキクケコ'.split('');

  return (
    <>
      <div className={`${styles.matrixSpinnerOverlay} ${styles.active}`} />
      <div 
        ref={spinnerRef}
        className={`${styles.matrixSpinner} ${styles.active} ${styles[size]}`}
        aria-busy="true"
        aria-label={text}
      >
        <div className={styles.spinnerInner}>
          {matrixChars.slice(0, 8).map((char, index) => (
            <span
              key={index}
              ref={el => { if (el) charsRef.current[index] = el; }}
              className={styles.spinnerChar}
              style={{
                ['--char-index' as any]: index
              }}
            >
              {char}
            </span>
          ))}
        </div>

        {showProgress && (
          <div className={styles.matrixSpinnerProgress}>
            <div 
              ref={progressBarRef}
              className={styles.matrixSpinnerProgressBar}
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>
        )}

        {text && (
          <div className={styles.matrixSpinnerText}>
            {text}
          </div>
        )}

        <span className={styles.matrixSpinnerSrOnly}>
          {text} - {showProgress ? `${progress}% complete` : 'Please wait'}
        </span>
      </div>
    </>
  );
};

/**
 * Custom hook for managing Matrix spinner state and controls
 * @return {{
 *   isLoading: boolean,
 *   progress: number,
 *   showSpinner: Function,
 *   hideSpinner: Function,
 *   updateProgress: Function,
 *   SpinnerComponent: Function
 * }}
 */
export const useMatrixSpinner = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const showSpinner = (_text?: string) => {
    setIsLoading(true);
    setProgress(0);
  };

  const hideSpinner = () => {
    setIsLoading(false);
    setProgress(0);
  };

  const updateProgress = (value: number) => {
    setProgress(Math.min(100, Math.max(0, value)));
  };

  return {
    isLoading,
    progress,
    showSpinner,
    hideSpinner,
    updateProgress,
    SpinnerComponent: (props: Partial<MatrixSpinnerProps>) => (
      <MatrixSpinner {...props} isLoading={isLoading} progress={progress} />
    )
  };
};
