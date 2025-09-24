import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface Position {
  x: number;
  y: number;
}

interface SnakeSegment extends Position {}

interface Food extends Position {}

interface MatrixSnakeGameProps {
  onExit: () => void;
  onScore?: (score: number) => void;
}

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 }
};

export const MatrixSnakeGame: React.FC<MatrixSnakeGameProps> = ({ onExit, onScore }) => {
  const [snake, setSnake] = useState<SnakeSegment[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Food>({ x: 15, y: 15 });
  const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
  const [gameState, setGameState] = useState<'playing' | 'paused' | 'gameOver'>('paused');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [speed, setSpeed] = useState(150);
  const gameLoopRef = useRef<NodeJS.Timeout>();
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('matrix-snake-high-score');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  // Generate random food position
  const generateFood = useCallback((currentSnake: SnakeSegment[]): Food => {
    let newFood: Food;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
    } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  // Check collision with walls or self
  const checkCollision = useCallback((head: Position, snakeBody: SnakeSegment[]): boolean => {
    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true;
    }
    // Self collision
    return snakeBody.some(segment => segment.x === head.x && segment.y === head.y);
  }, []);

  // Game loop
  const gameLoop = useCallback(() => {
    setSnake(currentSnake => {
      const head = currentSnake[0];
      const newHead = {
        x: head.x + direction.x,
        y: head.y + direction.y
      };

      // Check collision
      if (checkCollision(newHead, currentSnake)) {
        setGameState('gameOver');
        return currentSnake;
      }

      const newSnake = [newHead, ...currentSnake];

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        const newScore = score + 10;
        setScore(newScore);
        onScore?.(newScore);

        // Update high score
        if (newScore > highScore) {
          setHighScore(newScore);
          localStorage.setItem('matrix-snake-high-score', newScore.toString());
        }

        // Increase speed slightly
        setSpeed(prevSpeed => Math.max(80, prevSpeed - 2));

        // Generate new food
        setFood(generateFood(newSnake));

        return newSnake;
      } else {
        // Remove tail if no food eaten
        newSnake.pop();
        return newSnake;
      }
    });
  }, [direction, food, score, highScore, checkCollision, generateFood, onScore]);

  // Start/stop game loop
  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = setInterval(gameLoop, speed);
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameState, gameLoop, speed]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      e.preventDefault();

      switch (e.key.toLowerCase()) {
        case 'arrowup':
        case 'w':
          if (direction !== DIRECTIONS.DOWN) setDirection(DIRECTIONS.UP);
          break;
        case 'arrowdown':
        case 's':
          if (direction !== DIRECTIONS.UP) setDirection(DIRECTIONS.DOWN);
          break;
        case 'arrowleft':
        case 'a':
          if (direction !== DIRECTIONS.RIGHT) setDirection(DIRECTIONS.LEFT);
          break;
        case 'arrowright':
        case 'd':
          if (direction !== DIRECTIONS.LEFT) setDirection(DIRECTIONS.RIGHT);
          break;
        case ' ':
          setGameState(prev => prev === 'playing' ? 'paused' : 'playing');
          break;
        case 'r':
          if (gameState === 'gameOver') {
            resetGame();
          }
          break;
        case 'escape':
          onExit();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameState, onExit]);

  // Reset game
  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood({ x: 15, y: 15 });
    setDirection(DIRECTIONS.RIGHT);
    setGameState('paused');
    setScore(0);
    setSpeed(150);
  };

  // Focus game area on mount
  useEffect(() => {
    if (gameAreaRef.current) {
      gameAreaRef.current.focus();
    }
  }, []);

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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        outline: 'none'
      }}
    >
      {/* Game Header */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h2 style={{
          fontSize: '24px',
          margin: '0 0 10px 0',
          textShadow: theme === 'matrix' ? '0 0 10px #00ff00' : 'none',
          animation: 'pulse 2s infinite'
        }}>
          🐍 MATRIX SNAKE
        </h2>
        <div style={{ fontSize: '14px', opacity: 0.8 }}>
          Score: {score} | High Score: {highScore} | Speed: {151 - speed}
        </div>
      </div>

      {/* Game Board */}
      <div style={{
        position: 'relative',
        width: `${GRID_SIZE * 20}px`,
        height: `${GRID_SIZE * 20}px`,
        border: `2px solid ${theme === 'matrix' ? '#00ff00' : '#ffffff'}`,
        background: theme === 'matrix' ? 'rgba(0, 50, 0, 0.1)' : 'rgba(255, 255, 255, 0.05)',
        boxShadow: theme === 'matrix' ? '0 0 20px rgba(0, 255, 0, 0.3)' : '0 0 20px rgba(255, 255, 255, 0.1)'
      }}>
        {/* Grid lines */}
        {Array.from({ length: GRID_SIZE + 1 }).map((_, i) => (
          <React.Fragment key={`grid-${i}`}>
            {/* Vertical lines */}
            <div style={{
              position: 'absolute',
              left: `${i * 20}px`,
              top: 0,
              width: '1px',
              height: '100%',
              background: theme === 'matrix' ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 255, 255, 0.05)'
            }} />
            {/* Horizontal lines */}
            <div style={{
              position: 'absolute',
              top: `${i * 20}px`,
              left: 0,
              height: '1px',
              width: '100%',
              background: theme === 'matrix' ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 255, 255, 0.05)'
            }} />
          </React.Fragment>
        ))}

        {/* Snake */}
        {snake.map((segment, index) => (
          <div
            key={`snake-${index}`}
            style={{
              position: 'absolute',
              left: `${segment.x * 20}px`,
              top: `${segment.y * 20}px`,
              width: '20px',
              height: '20px',
              background: index === 0
                ? (theme === 'matrix' ? '#00ff00' : '#ffffff') // Head
                : (theme === 'matrix' ? '#008800' : '#cccccc'), // Body
              border: `1px solid ${theme === 'matrix' ? '#00cc00' : '#999999'}`,
              boxSizing: 'border-box',
              boxShadow: theme === 'matrix' ? `0 0 ${index === 0 ? '10px' : '5px'} rgba(0, 255, 0, 0.5)` : 'none',
              animation: index === 0 ? 'pulse 1s infinite' : 'none'
            }}
          >
            {index === 0 && (
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px'
              }}>
                {direction === DIRECTIONS.UP ? '↑' :
                 direction === DIRECTIONS.DOWN ? '↓' :
                 direction === DIRECTIONS.LEFT ? '←' : '→'}
              </div>
            )}
          </div>
        ))}

        {/* Food */}
        <div
          style={{
            position: 'absolute',
            left: `${food.x * 20}px`,
            top: `${food.y * 20}px`,
            width: '20px',
            height: '20px',
            background: theme === 'matrix' ? '#ff0000' : '#ff6666',
            border: `1px solid ${theme === 'matrix' ? '#cc0000' : '#ff3333'}`,
            boxSizing: 'border-box',
            borderRadius: '50%',
            boxShadow: theme === 'matrix' ? '0 0 15px rgba(255, 0, 0, 0.7)' : 'none',
            animation: 'pulse 1.5s infinite'
          }}
        />
      </div>

      {/* Game Status */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        {gameState === 'paused' && (
          <div>
            <p style={{ margin: '10px 0', fontSize: '18px' }}>
              {score === 0 ? 'PRESS SPACE TO START' : 'GAME PAUSED'}
            </p>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>
              Use WASD or Arrow Keys to move | Space to pause | ESC to exit
            </div>
          </div>
        )}

        {gameState === 'gameOver' && (
          <div>
            <p style={{
              margin: '10px 0',
              fontSize: '20px',
              color: theme === 'matrix' ? '#ff0000' : '#ff6666',
              textShadow: theme === 'matrix' ? '0 0 10px #ff0000' : 'none'
            }}>
              GAME OVER
            </p>
            <p style={{ margin: '10px 0', fontSize: '16px' }}>
              Final Score: {score}
              {score === highScore && score > 0 && ' 🏆 NEW HIGH SCORE!'}
            </p>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>
              Press R to restart | ESC to exit
            </div>
          </div>
        )}

        {gameState === 'playing' && (
          <div style={{ fontSize: '12px', opacity: 0.8 }}>
            Space to pause | ESC to exit
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
        `}
      </style>
    </div>
  );
};