import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { MatrixSnakeGame } from './MatrixSnakeGame';
import { MatrixCodeBreakerGame } from './MatrixCodeBreakerGame';

interface Game {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'Arcade' | 'Puzzle' | 'Action';
}

interface MatrixTerminalGamesProps {
  isOpen: boolean;
  onClose: () => void;
  initialGame?: string;
}

const GAMES: Game[] = [
  {
    id: 'snake',
    name: 'Matrix Snake',
    description: 'Classic snake game with Matrix styling. Eat the red data packets and grow your neural pathway.',
    icon: '🐍',
    difficulty: 'Easy',
    category: 'Arcade'
  },
  {
    id: 'codebreaker',
    name: 'Code Breaker',
    description: 'Decrypt Matrix code sequences. Memorize patterns and crack the system before time runs out.',
    icon: '🔓',
    difficulty: 'Medium',
    category: 'Puzzle'
  }
];

export const MatrixTerminalGames: React.FC<MatrixTerminalGamesProps> = ({
  isOpen,
  onClose,
  initialGame
}) => {
  const [currentView, setCurrentView] = useState<'menu' | 'game'>('menu');
  const [selectedGame, setSelectedGame] = useState<string | null>(initialGame || null);
  const [scores, setScores] = useState<{ [gameId: string]: number }>({});
  const [terminalText, setTerminalText] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // Load saved scores
  useEffect(() => {
    const savedScores: { [gameId: string]: number } = {};
    GAMES.forEach(game => {
      const score = localStorage.getItem(`matrix-terminal-${game.id}-score`);
      if (score) {
        savedScores[game.id] = parseInt(score);
      }
    });
    setScores(savedScores);
  }, []);

  // Terminal boot sequence
  useEffect(() => {
    if (isOpen && currentView === 'menu') {
      const bootSequence = [
        'MATRIX TERMINAL v3.5.0',
        'Initializing neural interface...',
        'Loading game modules...',
        'Security protocols: ACTIVE',
        'Access level: AUTHORIZED',
        '',
        'Welcome to the Matrix Arcade.',
        'Select a program to begin.'
      ];

      setTerminalText([]);
      bootSequence.forEach((line, index) => {
        setTimeout(() => {
          setTerminalText(prev => [...prev, line]);
        }, index * 200);
      });
    }
  }, [isOpen, currentView]);

  // Handle game selection
  const selectGame = (gameId: string) => {
    setSelectedGame(gameId);
    setCurrentView('game');
  };

  // Handle game exit
  const exitGame = () => {
    setCurrentView('menu');
    setSelectedGame(null);
  };

  // Handle score updates
  const handleScore = (gameId: string, score: number) => {
    setScores(prev => {
      const newScores = { ...prev, [gameId]: score };
      localStorage.setItem(`matrix-terminal-${gameId}-score`, score.toString());
      return newScores;
    });
  };

  // Handle escape key
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (currentView === 'game') {
          exitGame();
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [isOpen, currentView, onClose]);

  // Auto-select game if initialGame is provided
  useEffect(() => {
    if (initialGame && isOpen) {
      selectGame(initialGame);
    }
  }, [initialGame, isOpen]);

  if (!isOpen) return null;

  const renderGameMenu = () => (
    <div style={{
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'monospace'
    }}>
      {/* Terminal Header */}
      <div style={{
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: theme === 'matrix' ? '#00ff00' : '#ffffff',
          textShadow: theme === 'matrix' ? '0 0 10px #00ff00' : 'none',
          marginBottom: '10px'
        }}>
          [MATRIX_TERMINAL_GAMES]
        </div>
      </div>

      {/* Terminal Output */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.8)',
        border: `2px solid ${theme === 'matrix' ? '#00ff00' : '#ffffff'}`,
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '30px',
        minHeight: '150px',
        boxShadow: theme === 'matrix' ? '0 0 20px rgba(0, 255, 0, 0.3)' : 'none'
      }}>
        {terminalText.map((line, index) => (
          <div
            key={index}
            style={{
              color: theme === 'matrix' ? '#00ff00' : '#ffffff',
              fontSize: '14px',
              lineHeight: '1.4',
              marginBottom: '4px',
              opacity: 0,
              animation: `fadeIn 0.5s ease-out ${index * 0.1}s forwards`
            }}
          >
            {line || '\u00A0'}
          </div>
        ))}
      </div>

      {/* Game Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {GAMES.map((game) => (
          <motion.div
            key={game.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => selectGame(game.id)}
            style={{
              background: theme === 'matrix' ? 'rgba(0, 50, 0, 0.3)' : 'rgba(255, 255, 255, 0.05)',
              border: `2px solid ${theme === 'matrix' ? '#00ff00' : '#ffffff'}`,
              borderRadius: '8px',
              padding: '20px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: theme === 'matrix' ? '0 0 10px rgba(0, 255, 0, 0.2)' : 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = theme === 'matrix'
                ? '0 0 20px rgba(0, 255, 0, 0.5)'
                : '0 0 20px rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = theme === 'matrix'
                ? '0 0 10px rgba(0, 255, 0, 0.2)'
                : 'none';
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '15px'
            }}>
              <span style={{ fontSize: '24px', marginRight: '15px' }}>
                {game.icon}
              </span>
              <div>
                <h3 style={{
                  margin: '0 0 5px 0',
                  color: theme === 'matrix' ? '#00ff00' : '#ffffff',
                  fontSize: '18px'
                }}>
                  {game.name}
                </h3>
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  fontSize: '12px',
                  opacity: 0.8
                }}>
                  <span style={{
                    background: getDifficultyColor(game.difficulty),
                    padding: '2px 6px',
                    borderRadius: '3px',
                    color: '#000'
                  }}>
                    {game.difficulty}
                  </span>
                  <span style={{
                    background: getCategoryColor(game.category),
                    padding: '2px 6px',
                    borderRadius: '3px',
                    color: '#000'
                  }}>
                    {game.category}
                  </span>
                </div>
              </div>
            </div>

            <p style={{
              color: theme === 'matrix' ? '#ccffcc' : '#cccccc',
              fontSize: '14px',
              lineHeight: '1.4',
              margin: '0 0 15px 0'
            }}>
              {game.description}
            </p>

            {scores[game.id] && (
              <div style={{
                background: 'rgba(0, 0, 0, 0.3)',
                padding: '8px 12px',
                borderRadius: '4px',
                fontSize: '12px',
                color: theme === 'matrix' ? '#00ff00' : '#ffffff'
              }}>
                High Score: {scores[game.id]}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Instructions */}
      <div style={{
        textAlign: 'center',
        fontSize: '14px',
        opacity: 0.8,
        color: theme === 'matrix' ? '#00ff00' : '#ffffff'
      }}>
        <p>Click a game to launch | ESC to exit terminal</p>
        <p style={{ fontSize: '12px', marginTop: '10px' }}>
          Games will save your high scores automatically
        </p>
      </div>
    </div>
  );

  const renderCurrentGame = () => {
    if (!selectedGame) return null;

    switch (selectedGame) {
      case 'snake':
        return (
          <MatrixSnakeGame
            onExit={exitGame}
            onScore={(score) => handleScore('snake', score)}
          />
        );
      case 'codebreaker':
        return (
          <MatrixCodeBreakerGame
            onExit={exitGame}
            onScore={(score) => handleScore('codebreaker', score)}
          />
        );
      default:
        return null;
    }
  };

  // Helper functions
  function getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case 'Easy': return '#00ff00';
      case 'Medium': return '#ffff00';
      case 'Hard': return '#ff0000';
      default: return '#ffffff';
    }
  }

  function getCategoryColor(category: string): string {
    switch (category) {
      case 'Arcade': return '#ff6600';
      case 'Puzzle': return '#6600ff';
      case 'Action': return '#ff0066';
      default: return '#ffffff';
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(10px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          overflow: 'auto'
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget && currentView === 'menu') {
            onClose();
          }
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          style={{
            width: '100%',
            height: currentView === 'game' ? '100%' : 'auto',
            maxWidth: currentView === 'game' ? '100%' : '900px',
            background: theme === 'matrix' ? '#000000' : '#1a1a1a',
            color: theme === 'matrix' ? '#00ff00' : '#ffffff',
            borderRadius: currentView === 'game' ? '0' : '12px',
            border: `2px solid ${theme === 'matrix' ? '#00ff00' : '#ffffff'}`,
            boxShadow: theme === 'matrix'
              ? '0 0 30px rgba(0, 255, 0, 0.5)'
              : '0 0 30px rgba(255, 255, 255, 0.3)',
            overflow: 'hidden'
          }}
        >
          {currentView === 'menu' ? renderGameMenu() : renderCurrentGame()}
        </motion.div>

        <style>
          {`
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateX(-10px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
          `}
        </style>
      </motion.div>
    </AnimatePresence>
  );
};