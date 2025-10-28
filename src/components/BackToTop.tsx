/**
 * @author Tom Butler
 * @date 2025-10-28
 * @description Matrix-themed back-to-top button using React Portal to bypass
 *              transform context issues with position: fixed positioning
 */

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { animate } from 'animejs';
import { useBackToTop } from '../hooks/useScrollDetection';

interface BackToTopProps {
  threshold?: number;
  className?: string;
  showText?: boolean;
  enableScanLine?: boolean;
}

/**
 * Animated back-to-top button with Matrix theming and accessibility support
 * @param {Object} props
 * @param {number} [props.threshold=300] - Scroll distance before button appears
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {boolean} [props.showText=true] - Display "TOP" label with terminal cursor
 * @param {boolean} [props.enableScanLine=true] - Enable animated scan line effect
 * @return {JSX.Element}
 * @constructor
 */
export const BackToTop: React.FC<BackToTopProps> = ({
  threshold = 300,
  className = '',
  showText = true,
  enableScanLine = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  useBackToTop(threshold);

  /**
   * @constructs Initialises scroll listener with RAF throttling for performance
   *             Uses cross-browser compatible scroll detection for Safari support
   */
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.pageYOffset ||
                         document.documentElement.scrollTop ||
                         document.body.scrollTop ||
                         window.scrollY ||
                         0;
          const shouldShow = scrollY > threshold;

          setIsVisible(shouldShow);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });

    const initialScroll = window.pageYOffset ||
                         document.documentElement.scrollTop ||
                         document.body.scrollTop ||
                         window.scrollY ||
                         0;
    const initialShow = initialScroll > threshold;
    setIsVisible(initialShow);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [threshold]);

  const handleClick = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    animate('.back-to-top-react', {
      scale: [1, 1.1, 1],
      duration: 150,
      ease: 'outQuad',
      complete: () => {
        window.scrollTo(0, 0);
        setIsAnimating(false);
      }
    });

    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'back_to_top_click', {
        event_category: 'navigation',
        event_label: 'react_component'
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  // Portal ensures position: fixed works correctly outside transform contexts
  // Visibility controlled via opacity/visibility rather than display or transform
  const button = (
    <button
      className={`back-to-top-react ${className}`}
      onClick={handleClick}
      onTouchEnd={handleClick}
      onKeyDown={handleKeyDown}
      aria-label="Scroll back to top"
      title="Back to top"
      disabled={isAnimating}
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 9999,
        width: '60px',
        height: '60px',
        background: 'linear-gradient(135deg, rgba(0, 255, 0, 0.1) 0%, rgba(0, 255, 0, 0.05) 100%)',
        border: '2px solid var(--matrix-green)',
        borderRadius: '50%',
        color: 'var(--matrix-green)',
        cursor: isAnimating ? 'wait' : 'pointer',
        touchAction: 'manipulation',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-primary)',
        fontSize: '0.7rem',
        fontWeight: 400,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden',
        transition: 'opacity 0.4s cubic-bezier(0.4, 0.0, 0.2, 1), visibility 0.4s',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: `
          0 0 20px rgba(0, 255, 0, 0.3),
          inset 0 0 20px rgba(0, 255, 0, 0.1)
        `,
        ...(isAnimating && {
          cursor: 'wait',
          opacity: 0.7
        })
      }}
    >
      {enableScanLine && (
        <span
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent 0%, var(--matrix-green) 50%, transparent 100%)',
            animation: 'matrixScan 2s infinite linear',
            opacity: 0.6
          }}
        />
      )}

      <span
        style={{
          position: 'absolute',
          top: '-2px',
          left: '-2px',
          right: '-2px',
          bottom: '-2px',
          background: 'linear-gradient(45deg, var(--matrix-green), transparent, var(--matrix-green))',
          borderRadius: '50%',
          opacity: 0,
          filter: 'blur(8px)',
          transition: 'opacity 0.3s ease',
          zIndex: -1
        }}
        className="glow-effect"
      />

      <span
        style={{
          fontSize: '1.2rem',
          marginBottom: '2px',
          animation: isVisible ? 'matrixPulse 2s infinite ease-in-out' : 'none'
        }}
      >
        <i className="fas fa-chevron-up"></i>
      </span>
      
      {showText && (
        <span
          style={{
            fontSize: '0.6rem',
            lineHeight: 1,
            opacity: 0.9,
            position: 'relative'
          }}
        >
          TOP
          {isVisible && (
            <span
              style={{
                marginLeft: '2px',
                animation: 'terminalBlink 1s infinite'
              }}
            >
              _
            </span>
          )}
        </span>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .back-to-top-react {
          position: fixed !important;
          top: auto !important;
        }

        @keyframes matrixScan {
          0% { 
            transform: translateX(-100%) rotate(0deg); 
            opacity: 0;
          }
          50% { 
            opacity: 1;
          }
          100% { 
            transform: translateX(100%) rotate(0deg); 
            opacity: 0;
          }
        }

        @keyframes matrixPulse {
          0%, 100% { 
            transform: translateY(0);
            opacity: 1;
          }
          50% { 
            transform: translateY(-2px);
            opacity: 0.8;
          }
        }

        @keyframes terminalBlink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.3; }
        }

        .back-to-top-react:hover {
          background: linear-gradient(135deg, rgba(0, 255, 0, 0.2) 0%, rgba(0, 255, 0, 0.1) 100%) !important;
          border-color: var(--matrix-green-bright) !important;
          color: var(--matrix-green-bright) !important;
          box-shadow: 
            0 0 30px rgba(0, 255, 0, 0.5),
            inset 0 0 30px rgba(0, 255, 0, 0.15) !important;
          transform: translateY(-2px) scale(1.05) !important;
        }

        .back-to-top-react:hover .glow-effect {
          opacity: 0.3 !important;
        }

        .back-to-top-react:active {
          transform: translateY(0) scale(0.95) !important;
          box-shadow: 
            0 0 15px rgba(0, 255, 0, 0.4),
            inset 0 0 15px rgba(0, 255, 0, 0.2) !important;
        }

        .back-to-top-react:focus {
          outline: none;
          border-color: var(--matrix-green-bright);
          box-shadow: 
            0 0 25px rgba(0, 255, 0, 0.4),
            inset 0 0 25px rgba(0, 255, 0, 0.1),
            0 0 0 3px rgba(0, 255, 0, 0.2) !important;
        }

        @media (max-width: 768px) {
          .back-to-top-react {
            /* Inline styles already handle sizing, no need for !important */
            font-size: 0.6rem;
          }
        }

        @media (max-width: 480px) {
          .back-to-top-react {
            /* Inline styles already handle sizing */
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .back-to-top-react {
            transition: opacity 0.2s ease, visibility 0.2s ease !important;
          }
          
          .back-to-top-react span {
            animation: none !important;
          }

          .back-to-top-react:hover {
            transform: none !important;
          }

          .back-to-top-react:active {
            transform: scale(0.98) !important;
          }
        }

        @media (prefers-contrast: high) {
          .back-to-top-react {
            background: #000 !important;
            border-color: #00FF00 !important;
            color: #00FF00 !important;
            box-shadow: 0 0 10px #00FF00 !important;
          }

          .back-to-top-react:hover {
            background: #001100 !important;
            border-color: #00FF00 !important;
          }

          .back-to-top-react:focus {
            box-shadow: 0 0 0 3px #00FF00 !important;
          }
        }
      `}} />
    </button>
  );

  // Render button as direct child of body using portal
  return ReactDOM.createPortal(button, document.body);
};
