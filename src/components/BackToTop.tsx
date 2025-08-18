/**
 * BackToTop Component
 * Matrix-themed back-to-top button for React pages
 * Features smooth animations and accessibility support
 */

import React, { useState, useEffect } from 'react';
import { animate } from 'animejs';
import { useBackToTop } from '../hooks/useScrollDetection';

interface BackToTopProps {
  /** Scroll threshold to show button (default: 300) */
  threshold?: number;
  /** Custom CSS class name */
  className?: string;
  /** Show terminal-style animation text */
  showText?: boolean;
  /** Enable Matrix scan line animation */
  enableScanLine?: boolean;
}

export const BackToTop: React.FC<BackToTopProps> = ({
  threshold = 300,
  className = '',
  showText = true,
  enableScanLine = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { scrollToTop } = useBackToTop(threshold);

  // Handle scroll visibility
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const shouldShow = scrollY > threshold;
          
          if (shouldShow !== isVisible) {
            setIsVisible(shouldShow);
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    
    // Check initial state
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [threshold, isVisible]);

  // Handle button click with animation
  const handleClick = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    // Improved smooth scroll for all devices including iOS Safari
    const scrollToTopSmooth = () => {
      const c = document.documentElement.scrollTop || document.body.scrollTop;
      if (c > 0) {
        window.requestAnimationFrame(scrollToTopSmooth);
        window.scrollTo(0, c - c / 3);  // Much faster scroll speed
      } else {
        setIsAnimating(false);
      }
    };

    // Pulse animation before scroll
    animate('.back-to-top-react', {
      scale: [1, 1.1, 1],
      duration: 200,
      ease: 'outQuad',
      complete: () => {
        scrollToTopSmooth();
      }
    });

    // Track interaction for analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'back_to_top_click', {
        event_category: 'navigation',
        event_label: 'react_component'
      });
    }
  };

  // Handle keyboard interaction
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  // Don't render if not visible
  if (!isVisible) return null;

  return (
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
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
        transition: 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)',
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
      {/* Matrix scan line effect */}
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

      {/* Matrix glow effect */}
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

      {/* Button content */}
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

      {/* CSS-in-JS styles for animations */}
      <style dangerouslySetInnerHTML={{ __html: `
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
            bottom: 20px !important;
            right: 20px !important;
            width: 50px !important;
            height: 50px !important;
            font-size: 0.6rem !important;
          }
        }

        @media (max-width: 480px) {
          .back-to-top-react {
            bottom: 15px !important;
            right: 15px !important;
            width: 45px !important;
            height: 45px !important;
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
};