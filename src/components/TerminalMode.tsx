import React, { useState, useRef, useEffect, useCallback } from 'react';
import { animate } from 'animejs';
import './TerminalMode.css';

interface Command {
  input: string;
  output: string | React.ReactNode;
  timestamp: Date;
}

export const TerminalMode: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [commands, setCommands] = useState<Command[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Terminal commands
  const commandMap: Record<string, () => string | React.ReactNode> = {
    help: () => `
Available commands:
  help          - Show this help message
  about         - Learn about Thomas J Butler
  skills        - Display technical skills
  projects      - List portfolio projects
  contact       - Get contact information
  matrix        - Enter the Matrix
  neo           - Activate Neo mode
  clear         - Clear terminal
  date          - Show current date/time
  whoami        - Display user information
  ls            - List available pages
  cd [page]     - Navigate to page
  hack          - Initiate hacking sequence
  exit          - Exit terminal mode
    `.trim(),

    about: () => 'Thomas J Butler - Full Stack Developer from Liverpool, UK. Specializing in AI integration and modern web technologies.',

    skills: () => 'JavaScript/TypeScript • React • Node.js • Python • AI/ML • Cloud Architecture • DevOps',

    projects: () => `
Recent Projects:
  • AI-Powered Code Assistant
  • Real-time Collaboration Platform
  • Blockchain Supply Chain System
  • Quantum Computing Simulator
    `.trim(),

    contact: () => 'Email: contact@thomasjbutler.com | GitHub: @ThomasJButler',

    matrix: () => {
      document.body.classList.add('matrix-mode-active');
      return <span className="terminal-success">Wake up, Neo...</span>;
    },

    neo: () => {
      document.body.setAttribute('data-theme', 'neo');
      return <span className="terminal-gold">The One has been activated.</span>;
    },

    clear: () => {
      setCommands([]);
      return '';
    },

    date: () => new Date().toString(),

    whoami: () => 'guest@thomasjbutler.com',

    ls: () => 'home  about  skills  projects  services  contact  blog',

    cd: () => 'Usage: cd [page] - Navigate to specified page',

    hack: () => {
      startHackingSequence();
      return <span className="terminal-warning">INITIATING HACK SEQUENCE...</span>;
    },

    exit: () => {
      setIsActive(false);
      return 'Goodbye...';
    }
  };

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  // Keyboard shortcut activation (Ctrl+`)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        setIsActive(!isActive);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);

  // Focus input when terminal opens
  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  const handleCommand = useCallback((input: string) => {
    const trimmedInput = input.trim().toLowerCase();
    const [cmd, ...args] = trimmedInput.split(' ');

    let output: string | React.ReactNode = 'Command not found. Type "help" for available commands.';

    if (commandMap[cmd]) {
      if (cmd === 'cd' && args[0]) {
        // Navigate to page
        const page = args[0];
        const validPages = ['home', 'about', 'skills', 'projects', 'services', 'contact', 'blog'];
        if (validPages.includes(page)) {
          window.location.href = page === 'home' ? '/' : `/${page}`;
          output = `Navigating to ${page}...`;
        } else {
          output = `Invalid page: ${page}`;
        }
      } else if (cmd === 'clear') {
        commandMap[cmd]();
        return;
      } else {
        output = commandMap[cmd]();
      }
    }

    setCommands(prev => [...prev, {
      input,
      output,
      timestamp: new Date()
    }]);
    setCurrentInput('');
  }, []);

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) {
      handleCommand(currentInput);
    }
  };

  const startHackingSequence = () => {
    const chars = '01';
    const duration = 3000;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed > duration) {
        clearInterval(interval);
        setCommands(prev => [...prev, {
          input: '',
          output: <span className="terminal-success">ACCESS GRANTED - System compromised successfully.</span>,
          timestamp: new Date()
        }]);
        return;
      }

      const randomLine = Array(Math.floor(Math.random() * 50) + 20)
        .fill(0)
        .map(() => chars[Math.floor(Math.random() * chars.length)])
        .join('');

      setCommands(prev => [...prev, {
        input: '',
        output: <span className="terminal-binary">{randomLine}</span>,
        timestamp: new Date()
      }]);
    }, 50);
  };

  if (!isActive) {
    return (
      <button
        className="terminal-trigger"
        onClick={() => setIsActive(true)}
        title="Open Terminal (Ctrl+`)"
      >
        &gt;_
      </button>
    );
  }

  return (
    <div className="terminal-container">
      <div className="terminal-header">
        <span className="terminal-title">MATRIX TERMINAL v1.0</span>
        <button className="terminal-close" onClick={() => setIsActive(false)}>×</button>
      </div>
      <div className="terminal-body" ref={terminalRef}>
        <div className="terminal-welcome">
          Welcome to the Matrix Terminal. Type 'help' for available commands.
        </div>
        {commands.map((cmd, index) => (
          <div key={index} className="terminal-line">
            {cmd.input && (
              <div className="terminal-input-line">
                <span className="terminal-prompt">guest@matrix:~$</span> {cmd.input}
              </div>
            )}
            <div className="terminal-output">{cmd.output}</div>
          </div>
        ))}
        <form onSubmit={handleInputSubmit} className="terminal-input-form">
          <span className="terminal-prompt">guest@matrix:~$</span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            autoFocus
          />
          <span className={`terminal-cursor ${showCursor ? 'visible' : ''}`}>_</span>
        </form>
      </div>
    </div>
  );
};