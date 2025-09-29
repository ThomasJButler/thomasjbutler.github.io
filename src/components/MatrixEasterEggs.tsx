import React, { useEffect, useState, useCallback } from 'react';
import { animate } from 'animejs';
import './MatrixEasterEggs.css';

export const MatrixEasterEggs: React.FC = () => {
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [showPillChoice, setShowPillChoice] = useState(false);
  const [showWhiteRabbit, setShowWhiteRabbit] = useState(false);
  const [easterEggActive, setEasterEggActive] = useState('');

  // Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
                      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
                      'b', 'a'];

  // Konami code detection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (konamiCode[konamiProgress] === key || konamiCode[konamiProgress] === e.key) {
        setKonamiProgress(prev => prev + 1);

        if (konamiProgress + 1 === konamiCode.length) {
          activateKonamiMode();
          setKonamiProgress(0);
        }
      } else {
        setKonamiProgress(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiProgress]);

  // Matrix code sequence detection (type "matrix" anywhere)
  useEffect(() => {
    let sequence = '';
    const handleKeyPress = (e: KeyboardEvent) => {
      sequence += e.key.toLowerCase();

      if (sequence.includes('matrix')) {
        sequence = '';
        activateMatrixMode();
      }

      if (sequence.includes('redpill')) {
        sequence = '';
        setShowPillChoice(true);
      }

      if (sequence.includes('whiterabbit')) {
        sequence = '';
        followWhiteRabbit();
      }

      // Clear sequence if it gets too long
      if (sequence.length > 20) {
        sequence = sequence.slice(-10);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, []);

  const activateKonamiMode = () => {
    setEasterEggActive('konami');
    document.body.classList.add('konami-activated');

    // Create cascading matrix rain effect
    const message = document.createElement('div');
    message.className = 'konami-message';
    message.innerHTML = 'GOD MODE ACTIVATED';
    document.body.appendChild(message);

    animate(message, {
      opacity: [0, 1, 1, 0],
      scale: [0.5, 1.2, 1, 3],
      rotate: [0, 0, 0, 720],
      duration: 3000,
      easing: 'easeInOutQuad',
      complete: () => {
        message.remove();
        document.body.classList.remove('konami-activated');
      }
    });

    // Activate special features
    localStorage.setItem('godMode', 'true');
  };

  const activateMatrixMode = () => {
    setEasterEggActive('matrix');
    document.body.classList.add('ultra-matrix-mode');

    // Enhanced matrix rain
    const existingRain = document.querySelector('.matrix-rain');
    if (existingRain) {
      existingRain.classList.add('matrix-rain-intense');
    }

    // Show hidden message
    const message = document.createElement('div');
    message.className = 'matrix-message';
    message.innerHTML = 'THE MATRIX HAS YOU...';
    document.body.appendChild(message);

    setTimeout(() => {
      message.innerHTML = 'FOLLOW THE WHITE RABBIT';
      setTimeout(() => {
        message.remove();
        document.body.classList.remove('ultra-matrix-mode');
      }, 3000);
    }, 2000);
  };

  const followWhiteRabbit = () => {
    setShowWhiteRabbit(true);
    const rabbit = document.createElement('div');
    rabbit.className = 'white-rabbit';
    rabbit.innerHTML = '🐇';
    document.body.appendChild(rabbit);

    // Rabbit hops across screen
    animate(rabbit, [
      { translateX: -50, translateY: window.innerHeight - 100 },
      { translateX: window.innerWidth / 4, translateY: window.innerHeight - 200 },
      { translateX: window.innerWidth / 2, translateY: window.innerHeight - 100 },
      { translateX: (window.innerWidth * 3) / 4, translateY: window.innerHeight - 200 },
      { translateX: window.innerWidth + 50, translateY: window.innerHeight - 100 }
    ], {
      duration: 4000,
      easing: 'easeInOutQuad',
      complete: () => {
        rabbit.remove();
        setShowWhiteRabbit(false);
        // Navigate to a secret page or reveal hidden content
        revealSecret();
      }
    });
  };

  const revealSecret = () => {
    const secret = document.createElement('div');
    secret.className = 'matrix-secret';
    secret.innerHTML = `
      <div class="secret-content">
        <h2>SYSTEM BREACH DETECTED</h2>
        <p>You've discovered the hidden layer of reality.</p>
        <p>The architect will see you now...</p>
      </div>
    `;
    document.body.appendChild(secret);

    animate(secret, {
      opacity: [0, 1],
      duration: 1000,
      complete: () => {
        setTimeout(() => {
          animate(secret, {
            opacity: [1, 0],
            duration: 1000,
            complete: () => secret.remove()
          });
        }, 5000);
      }
    });
  };

  const handlePillChoice = (choice: 'red' | 'blue') => {
    setShowPillChoice(false);

    if (choice === 'red') {
      // Red pill - show the truth
      document.body.setAttribute('data-theme', 'matrix');
      document.body.classList.add('red-pill-taken');

      // Glitch effect
      const glitch = document.createElement('div');
      glitch.className = 'reality-glitch';
      document.body.appendChild(glitch);

      animate(glitch, {
        opacity: [0, 1, 0],
        scaleY: [0, 1, 0],
        duration: 2000,
        complete: () => {
          glitch.remove();
          // Show the real matrix code
          document.querySelectorAll('*').forEach(el => {
            if (Math.random() > 0.95) {
              el.classList.add('matrix-reveal');
            }
          });
        }
      });
    } else {
      // Blue pill - stay in wonderland
      document.body.classList.add('blue-pill-taken');
      const message = document.createElement('div');
      message.className = 'blue-pill-message';
      message.innerHTML = 'The story ends. You wake up in your bed and believe whatever you want to believe.';
      document.body.appendChild(message);

      setTimeout(() => {
        animate(message, {
          opacity: [1, 0],
          duration: 2000,
          complete: () => message.remove()
        });
      }, 3000);
    }
  };

  return (
    <>
      {/* Pill Choice Modal */}
      {showPillChoice && (
        <div className="pill-choice-modal">
          <div className="pill-choice-content">
            <h2>This is your last chance.</h2>
            <p>After this, there is no turning back.</p>
            <div className="pill-options">
              <button
                className="pill-button red-pill"
                onClick={() => handlePillChoice('red')}
              >
                <span className="pill-icon">💊</span>
                <span>Red Pill</span>
                <span className="pill-description">Stay in Wonderland</span>
              </button>
              <button
                className="pill-button blue-pill"
                onClick={() => handlePillChoice('blue')}
              >
                <span className="pill-icon">💊</span>
                <span>Blue Pill</span>
                <span className="pill-description">Wake up in your bed</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden trigger zones */}
      <div
        className="hidden-trigger-zone zone-top-left"
        onDoubleClick={() => setShowPillChoice(true)}
      />
      <div
        className="hidden-trigger-zone zone-bottom-right"
        onDoubleClick={() => followWhiteRabbit()}
      />

      {/* Konami progress indicator (subtle) */}
      {konamiProgress > 0 && konamiProgress < konamiCode.length && (
        <div className="konami-progress">
          {Array(konamiCode.length).fill(0).map((_, i) => (
            <span
              key={i}
              className={`konami-dot ${i < konamiProgress ? 'active' : ''}`}
            />
          ))}
        </div>
      )}
    </>
  );
};