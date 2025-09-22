import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'success';
  content: string;
  timestamp?: Date;
}

interface TerminalWindowProps {
  title?: string;
  className?: string;
  variant?: 'default' | 'terminal' | 'cyberpunk' | 'ghost';
  autoType?: boolean;
  commands?: string[];
  responses?: { [key: string]: string | string[] };
  height?: string;
  interactive?: boolean;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  title = 'MATRIX_TERMINAL_v3.0',
  className,
  variant = 'default',
  autoType = false,
  commands = [],
  responses = {},
  height = 'h-96',
  interactive = true
}) => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentCommand, setCurrentCommand] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getVariantStyles = () => {
    switch (variant) {
      case 'cyberpunk':
        return {
          primary: 'text-pink-400',
          secondary: 'text-pink-200',
          border: 'border-pink-500/30',
          bg: 'bg-purple-950/20',
          glow: 'shadow-pink-500/20'
        };
      case 'terminal':
        return {
          primary: 'text-orange-400',
          secondary: 'text-orange-200',
          border: 'border-orange-500/30',
          bg: 'bg-orange-950/20',
          glow: 'shadow-orange-500/20'
        };
      case 'ghost':
        return {
          primary: 'text-blue-400',
          secondary: 'text-blue-200',
          border: 'border-blue-500/30',
          bg: 'bg-blue-950/20',
          glow: 'shadow-blue-500/20'
        };
      default:
        return {
          primary: 'text-matrix-primary',
          secondary: 'text-green-200',
          border: 'border-matrix-primary/30',
          bg: 'bg-matrix-dark/20',
          glow: 'shadow-matrix-primary/20'
        };
    }
  };

  const styles = getVariantStyles();

  // Default responses
  const defaultResponses = {
    'help': [
      'Available commands:',
      '  help     - Show this help message',
      '  clear    - Clear terminal',
      '  whoami   - Display user information',
      '  status   - System status',
      '  matrix   - Enter the Matrix',
      '  hack     - Initiate hacking sequence',
      '  exit     - Close terminal'
    ],
    'whoami': ['thomas@matrix:~$ Thomas J Butler', 'Role: Full-Stack Developer', 'Location: Liverpool, UK'],
    'status': ['System Status: ONLINE', 'Security Level: MAXIMUM', 'Matrix Connection: ESTABLISHED'],
    'matrix': ['Wake up, Neo...', 'The Matrix has you...', 'Follow the white rabbit.'],
    'hack': [
      'Initiating hack sequence...',
      'Bypassing firewall... [████████████] 100%',
      'Accessing mainframe... [████████████] 100%',
      'SYSTEM COMPROMISED ✓'
    ],
    'clear': ['CLEAR_COMMAND'],
    'exit': ['Connection terminated.']
  };

  const allResponses = { ...defaultResponses, ...responses };

  useEffect(() => {
    if (autoType && commands.length > 0 && currentCommand < commands.length) {
      const timer = setTimeout(() => {
        typeCommand(commands[currentCommand]);
        setCurrentCommand(prev => prev + 1);
      }, 2000 + currentCommand * 1000);

      return () => clearTimeout(timer);
    }
  }, [currentCommand, autoType, commands]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const typeCommand = async (command: string) => {
    setIsTyping(true);

    // Add input line
    const inputLine: TerminalLine = {
      type: 'input',
      content: command,
      timestamp: new Date()
    };

    setLines(prev => [...prev, inputLine]);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Process command
    processCommand(command);
    setIsTyping(false);
  };

  const processCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();

    if (cmd === 'clear') {
      setLines([]);
      return;
    }

    const response = allResponses[cmd] || [`Command not found: ${command}`, 'Type "help" for available commands.'];

    if (Array.isArray(response)) {
      response.forEach((line, index) => {
        setTimeout(() => {
          setLines(prev => [...prev, {
            type: cmd === 'hack' || cmd === 'matrix' ? 'success' : 'output',
            content: line,
            timestamp: new Date()
          }]);
        }, index * 200);
      });
    } else {
      setLines(prev => [...prev, {
        type: 'output',
        content: response,
        timestamp: new Date()
      }]);
    }
  };

  const handleInputSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentInput.trim()) {
      typeCommand(currentInput.trim());
      setCurrentInput('');
    }
  };

  const getLineColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'error':
        return 'text-red-400';
      case 'success':
        return styles.primary;
      case 'input':
        return styles.secondary;
      default:
        return 'text-gray-300';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'bg-black/90 backdrop-blur-sm border rounded-lg overflow-hidden',
        'shadow-2xl',
        styles.border,
        styles.glow,
        className
      )}
    >
      {/* Terminal Header */}
      <div className={cn('px-4 py-2 border-b flex items-center gap-2', styles.border, styles.bg)}>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className={cn('font-mono text-sm ml-4', styles.primary)}>{title}</span>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className={cn('p-4 font-mono text-sm overflow-y-auto scrollbar-thin', height)}
      >
        <AnimatePresence>
          {lines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn('mb-1', getLineColor(line.type))}
            >
              {line.type === 'input' && (
                <span className={styles.primary}>thomas@matrix:~$ </span>
              )}
              {line.content}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Current input line */}
        {interactive && (
          <div className="flex items-center">
            <span className={cn('mr-2', styles.primary)}>thomas@matrix:~$ </span>
            <input
              ref={inputRef}
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleInputSubmit}
              className="bg-transparent outline-none flex-1 text-gray-300"
              disabled={isTyping}
              placeholder={isTyping ? 'Processing...' : 'Type a command...'}
            />
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className={cn('ml-1', styles.primary)}
            >
              █
            </motion.span>
          </div>
        )}
      </div>
    </motion.div>
  );
};