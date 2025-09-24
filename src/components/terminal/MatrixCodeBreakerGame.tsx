import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface CodePattern {
  sequence: string[];
  difficulty: number;
  timeLimit: number;
}

interface MatrixCodeBreakerGameProps {
  onExit: () => void;
  onScore?: (score: number) => void;
}

const MATRIX_SYMBOLS = ['ア', 'カ', 'サ', 'タ', 'ナ', 'ハ', 'マ', 'ヤ', 'ラ', 'ワ', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const DIFFICULTIES = {
  EASY: { length: 4, timeLimit: 15000, symbols: 8 },
  MEDIUM: { length: 6, timeLimit: 20000, symbols: 12 },
  HARD: { length: 8, timeLimit: 25000, symbols: 16 },
  EXPERT: { length: 10, timeLimit: 30000, symbols: 20 }
};

export const MatrixCodeBreakerGame: React.FC<MatrixCodeBreakerGameProps> = ({ onExit, onScore }) => {
  const [currentPattern, setCurrentPattern] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string[]>([]);
  const [availableSymbols, setAvailableSymbols] = useState<string[]>([]);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'success' | 'failed' | 'gameOver'>('menu');
  const [difficulty, setDifficulty] = useState<keyof typeof DIFFICULTIES>('EASY');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(0);
  const [hint, setHint] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // Load high score
  useEffect(() => {
    const savedHighScore = localStorage.getItem('matrix-codebreaker-high-score');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  // Generate random pattern
  const generatePattern = useCallback((difficultyLevel: keyof typeof DIFFICULTIES) => {
    const config = DIFFICULTIES[difficultyLevel];
    const symbols = MATRIX_SYMBOLS.slice(0, config.symbols);
    const pattern = [];

    for (let i = 0; i < config.length; i++) {
      pattern.push(symbols[Math.floor(Math.random() * symbols.length)]);
    }

    return pattern;
  }, []);

  // Start new level
  const startLevel = useCallback(() => {
    const pattern = generatePattern(difficulty);
    setCurrentPattern(pattern);
    setUserInput([]);
    setAvailableSymbols(MATRIX_SYMBOLS.slice(0, DIFFICULTIES[difficulty].symbols));
    setGameState('playing');
    setTimeLeft(DIFFICULTIES[difficulty].timeLimit);
    setHint(null);
  }, [difficulty, generatePattern]);

  // Timer countdown
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timeoutRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 100);
      }, 100);
    } else if (gameState === 'playing' && timeLeft <= 0) {
      handleFailure();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [gameState, timeLeft]);

  // Handle symbol selection
  const selectSymbol = (symbol: string) => {
    if (gameState !== 'playing' || userInput.length >= currentPattern.length) return;

    const newInput = [...userInput, symbol];
    setUserInput(newInput);

    // Check if pattern is complete
    if (newInput.length === currentPattern.length) {
      checkPattern(newInput);
    }
  };

  // Check if pattern matches
  const checkPattern = (input: string[]) => {
    const isCorrect = input.every((symbol, index) => symbol === currentPattern[index]);

    if (isCorrect) {
      handleSuccess();
    } else {
      handleFailure();
    }
  };

  // Handle successful pattern match
  const handleSuccess = () => {
    const timeBonus = Math.floor(timeLeft / 100);
    const difficultyMultiplier = Object.keys(DIFFICULTIES).indexOf(difficulty) + 1;
    const streakBonus = streak * 50;
    const levelScore = (100 * difficultyMultiplier) + timeBonus + streakBonus;

    const newScore = score + levelScore;
    const newStreak = streak + 1;

    setScore(newScore);
    setStreak(newStreak);
    setGameState('success');
    onScore?.(newScore);

    // Update high score
    if (newScore > highScore) {
      setHighScore(newScore);
      localStorage.setItem('matrix-codebreaker-high-score', newScore.toString());
    }

    // Advance level and increase difficulty
    setTimeout(() => {
      setLevel(prev => prev + 1);

      // Increase difficulty every 3 levels
      if (level % 3 === 0) {
        const difficulties = Object.keys(DIFFICULTIES) as (keyof typeof DIFFICULTIES)[];
        const currentIndex = difficulties.indexOf(difficulty);
        if (currentIndex < difficulties.length - 1) {
          setDifficulty(difficulties[currentIndex + 1]);
        }
      }

      startLevel();
    }, 2000);
  };

  // Handle pattern failure
  const handleFailure = () => {
    setStreak(0);
    setLives(prev => prev - 1);
    setGameState('failed');

    setTimeout(() => {
      if (lives - 1 <= 0) {
        setGameState('gameOver');
      } else {
        startLevel();
      }
    }, 2000);
  };

  // Use hint (reveals one position)
  const useHint = () => {
    if (hint !== null || userInput.length >= currentPattern.length) return;

    const nextPosition = userInput.length;
    setHint(nextPosition);

    // Auto-fill the hinted position after a delay
    setTimeout(() => {
      selectSymbol(currentPattern[nextPosition]);
      setHint(null);
    }, 1500);
  };

  // Reset game
  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setLives(3);
    setStreak(0);
    setDifficulty('EASY');
    setGameState('menu');
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState === 'playing') {
        const key = e.key.toLowerCase();

        // Number keys
        if (key >= '0' && key <= '9' && availableSymbols.includes(key)) {
          selectSymbol(key);
        }

        // Letter keys for symbols (mapped)
        const symbolMap: { [key: string]: string } = {
          'q': availableSymbols[0], 'w': availableSymbols[1], 'e': availableSymbols[2], 'r': availableSymbols[3],
          't': availableSymbols[4], 'y': availableSymbols[5], 'u': availableSymbols[6], 'i': availableSymbols[7],
          'o': availableSymbols[8], 'p': availableSymbols[9], 'a': availableSymbols[10], 's': availableSymbols[11],
          'd': availableSymbols[12], 'f': availableSymbols[13], 'g': availableSymbols[14], 'h': availableSymbols[15],
          'j': availableSymbols[16], 'k': availableSymbols[17], 'l': availableSymbols[18], 'z': availableSymbols[19]
        };

        if (symbolMap[key]) {
          selectSymbol(symbolMap[key]);
        }

        // Hint key
        if (key === ' ') {
          e.preventDefault();
          useHint();
        }

        // Backspace to remove last input
        if (key === 'backspace' && userInput.length > 0) {
          setUserInput(prev => prev.slice(0, -1));
        }
      }

      // Global keys
      if (key === 'escape') {
        onExit();
      }

      if (key === 'enter') {
        if (gameState === 'menu') {
          startLevel();
        } else if (gameState === 'gameOver') {
          resetGame();
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [gameState, availableSymbols, userInput, onExit]);

  // Focus game area
  useEffect(() => {
    if (gameAreaRef.current) {
      gameAreaRef.current.focus();
    }
  }, []);

  const renderMenu = () => (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{
        fontSize: '28px',
        margin: '0 0 20px 0',
        textShadow: theme === 'matrix' ? '0 0 15px #00ff00' : 'none',
        animation: 'matrixGlow 2s infinite'
      }}>
        🔓 MATRIX CODE BREAKER
      </h2>

      <div style={{ margin: '20px 0', fontSize: '16px' }}>
        <p>Decrypt the Matrix code sequences to advance!</p>
        <p style={{ fontSize: '14px', opacity: 0.8, margin: '10px 0' }}>
          Memorize the pattern and recreate it before time runs out.
        </p>
      </div>

      <div style={{ margin: '20px 0' }}>
        <h3>Difficulty: {difficulty}</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '10px 0' }}>
          {Object.keys(DIFFICULTIES).map((diff) => (
            <button
              key={diff}
              onClick={() => setDifficulty(diff as keyof typeof DIFFICULTIES)}
              style={{
                padding: '8px 16px',
                background: difficulty === diff ? 'rgba(0, 255, 0, 0.3)' : 'rgba(0, 0, 0, 0.3)',
                border: `1px solid ${theme === 'matrix' ? '#00ff00' : '#ffffff'}`,
                color: theme === 'matrix' ? '#00ff00' : '#ffffff',
                cursor: 'pointer',
                fontSize: '12px',
                fontFamily: 'monospace'
              }}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      <div style={{ fontSize: '14px', opacity: 0.8, margin: '20px 0' }}>
        <p>High Score: {highScore}</p>
        <p>Press ENTER to start | ESC to exit</p>
      </div>
    </div>
  );

  const renderGame = () => (
    <div style={{ textAlign: 'center' }}>
      {/* Game Stats */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
        fontSize: '14px'
      }}>
        <div>Level: {level}</div>
        <div>Score: {score}</div>
        <div>Lives: {'❤️'.repeat(lives)}</div>
        <div>Streak: {streak}</div>
        <div>Time: {Math.ceil(timeLeft / 1000)}s</div>
      </div>

      {/* Pattern Display */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ margin: '0 0 15px 0' }}>DECRYPT THIS SEQUENCE:</h3>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '20px'
        }}>
          {currentPattern.map((symbol, index) => (
            <div
              key={index}
              style={{
                width: '50px',
                height: '50px',
                border: `2px solid ${theme === 'matrix' ? '#00ff00' : '#ffffff'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                background: 'rgba(0, 0, 0, 0.3)',
                boxShadow: theme === 'matrix' ? '0 0 10px rgba(0, 255, 0, 0.3)' : 'none',
                animation: hint === index ? 'matrixPulse 0.5s infinite' : 'none'
              }}
            >
              {hint === index ? symbol : '?'}
            </div>
          ))}
        </div>
      </div>

      {/* User Input */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ margin: '0 0 15px 0' }}>YOUR INPUT:</h3>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '20px'
        }}>
          {Array.from({ length: currentPattern.length }).map((_, index) => (
            <div
              key={index}
              style={{
                width: '50px',
                height: '50px',
                border: `2px solid ${userInput[index] ? (theme === 'matrix' ? '#00ff00' : '#ffffff') : '#666'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                background: userInput[index] ? 'rgba(0, 255, 0, 0.1)' : 'rgba(0, 0, 0, 0.3)',
                boxShadow: userInput[index] ? (theme === 'matrix' ? '0 0 10px rgba(0, 255, 0, 0.5)' : 'none') : 'none'
              }}
            >
              {userInput[index] || ''}
            </div>
          ))}
        </div>
      </div>

      {/* Symbol Grid */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 15px 0' }}>SELECT SYMBOLS:</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '10px',
          maxWidth: '300px',
          margin: '0 auto'
        }}>
          {availableSymbols.map((symbol, index) => (
            <button
              key={symbol}
              onClick={() => selectSymbol(symbol)}
              style={{
                width: '50px',
                height: '50px',
                border: `1px solid ${theme === 'matrix' ? '#00ff00' : '#ffffff'}`,
                background: 'rgba(0, 0, 0, 0.3)',
                color: theme === 'matrix' ? '#00ff00' : '#ffffff',
                fontSize: '16px',
                cursor: 'pointer',
                fontFamily: 'monospace',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = theme === 'matrix' ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.boxShadow = theme === 'matrix' ? '0 0 10px rgba(0, 255, 0, 0.5)' : '0 0 10px rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.3)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {symbol}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div style={{ fontSize: '12px', opacity: 0.8 }}>
        <p>SPACE for hint | BACKSPACE to remove | ESC to exit</p>
        <p>Use keyboard: Q-P, A-L, Z for symbols | 0-9 for numbers</p>
      </div>
    </div>
  );

  const renderStatusScreen = () => (
    <div style={{ textAlign: 'center' }}>
      {gameState === 'success' && (
        <div>
          <h2 style={{
            fontSize: '24px',
            color: theme === 'matrix' ? '#00ff00' : '#00ff00',
            textShadow: '0 0 15px currentColor',
            animation: 'matrixPulse 1s infinite'
          }}>
            ✅ SEQUENCE DECRYPTED!
          </h2>
          <p style={{ fontSize: '18px', margin: '20px 0' }}>
            Level {level} Complete!
          </p>
          <p>Streak: {streak} | Next level starting...</p>
        </div>
      )}

      {gameState === 'failed' && (
        <div>
          <h2 style={{
            fontSize: '24px',
            color: '#ff0000',
            textShadow: '0 0 15px #ff0000',
            animation: 'matrixPulse 1s infinite'
          }}>
            ❌ DECRYPTION FAILED!
          </h2>
          <p style={{ fontSize: '18px', margin: '20px 0' }}>
            Lives remaining: {lives - 1}
          </p>
          <p>{lives - 1 > 0 ? 'Retrying...' : 'Game Over!'}</p>
        </div>
      )}

      {gameState === 'gameOver' && (
        <div>
          <h2 style={{
            fontSize: '28px',
            color: '#ff0000',
            textShadow: '0 0 15px #ff0000'
          }}>
            SYSTEM LOCKDOWN
          </h2>
          <p style={{ fontSize: '20px', margin: '20px 0' }}>
            Final Score: {score}
            {score === highScore && score > 0 && ' 🏆 NEW RECORD!'}
          </p>
          <p style={{ fontSize: '16px', margin: '10px 0' }}>
            Level Reached: {level} | Max Streak: {streak}
          </p>
          <p style={{ fontSize: '14px', opacity: 0.8 }}>
            Press ENTER to restart | ESC to exit
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div
      ref={gameAreaRef}
      tabIndex={0}
      style={{
        width: '100%',
        height: '100%',
        background: theme === 'matrix' ? '#000' : '#1a1a1a',
        color: theme === 'matrix' ? '#00ff00' : '#ffffff',
        fontFamily: 'monospace',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        outline: 'none',
        overflow: 'auto'
      }}
    >
      <div style={{ maxWidth: '600px', width: '100%' }}>
        {gameState === 'menu' && renderMenu()}
        {gameState === 'playing' && renderGame()}
        {(gameState === 'success' || gameState === 'failed' || gameState === 'gameOver') && renderStatusScreen()}
      </div>

      <style>
        {`
          @keyframes matrixGlow {
            0%, 100% {
              text-shadow: 0 0 15px ${theme === 'matrix' ? '#00ff00' : '#ffffff'};
            }
            50% {
              text-shadow: 0 0 25px ${theme === 'matrix' ? '#00ff00' : '#ffffff'}, 0 0 35px ${theme === 'matrix' ? '#00ff00' : '#ffffff'};
            }
          }

          @keyframes matrixPulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.8;
            }
          }
        `}
      </style>
    </div>
  );
};