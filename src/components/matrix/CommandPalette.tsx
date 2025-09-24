import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useParticleSettings } from '../../hooks/useParticleSettings';

interface Command {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  action: () => void;
  keywords?: string[];
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminalGames?: (gameId?: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onOpenTerminalGames }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filteredCommands, setFilteredCommands] = useState<Command[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { presets: particlePresets, settings: particleSettings } = useParticleSettings();

  const commands: Command[] = [
    // Navigation Commands
    {
      id: 'nav-home',
      title: 'Navigate to Home',
      description: 'Access the main neural interface',
      icon: 'fas fa-home',
      category: 'Navigation',
      action: () => navigate('/'),
      keywords: ['home', 'main', 'index', 'start']
    },
    {
      id: 'nav-about',
      title: 'System Profile',
      description: 'View neural architecture analysis',
      icon: 'fas fa-user-alt',
      category: 'Navigation',
      action: () => navigate('/about'),
      keywords: ['about', 'profile', 'neural', 'bio']
    },
    {
      id: 'nav-skills',
      title: 'Capability Matrix',
      description: 'Analyze technical proficiency data',
      icon: 'fas fa-microchip',
      category: 'Navigation',
      action: () => navigate('/skills'),
      keywords: ['skills', 'capabilities', 'tech', 'matrix']
    },
    {
      id: 'nav-projects',
      title: 'Project Showcase',
      description: 'Browse development archives',
      icon: 'fas fa-folder-open',
      category: 'Navigation',
      action: () => navigate('/projects'),
      keywords: ['projects', 'work', 'showcase', 'portfolio']
    },
    {
      id: 'nav-contact',
      title: 'Establish Connection',
      description: 'Initialize communication protocols',
      icon: 'fas fa-satellite',
      category: 'Navigation',
      action: () => navigate('/contact'),
      keywords: ['contact', 'connect', 'message', 'communication']
    },
    {
      id: 'nav-blog',
      title: 'Knowledge Archive',
      description: 'Access thought repository',
      icon: 'fas fa-brain',
      category: 'Navigation',
      action: () => navigate('/blog'),
      keywords: ['blog', 'articles', 'thoughts', 'archive']
    },

    // System Commands
    {
      id: 'reload-page',
      title: 'Reload Interface',
      description: 'Refresh current system interface',
      icon: 'fas fa-sync-alt',
      category: 'System',
      action: () => window.location.reload(),
      keywords: ['reload', 'refresh', 'restart']
    },
    {
      id: 'toggle-fullscreen',
      title: 'Toggle Fullscreen',
      description: 'Enter/exit immersive mode',
      icon: 'fas fa-expand',
      category: 'System',
      action: () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      },
      keywords: ['fullscreen', 'immersive', 'expand']
    },
    {
      id: 'copy-url',
      title: 'Copy Current URL',
      description: 'Copy location to clipboard',
      icon: 'fas fa-link',
      category: 'System',
      action: () => navigator.clipboard.writeText(window.location.href),
      keywords: ['copy', 'url', 'link', 'clipboard']
    },

    // External Links
    {
      id: 'github-profile',
      title: 'GitHub Repository',
      description: 'Access source code archives',
      icon: 'fab fa-github',
      category: 'External',
      action: () => window.open('https://github.com/ThomasJButler', '_blank'),
      keywords: ['github', 'code', 'repository', 'source']
    },
    {
      id: 'linkedin-profile',
      title: 'LinkedIn Network',
      description: 'Professional connection node',
      icon: 'fab fa-linkedin',
      category: 'External',
      action: () => window.open('https://linkedin.com/in/thomas-j-butler', '_blank'),
      keywords: ['linkedin', 'professional', 'network']
    },
    {
      id: 'email-contact',
      title: 'Direct Email',
      description: 'Initialize email transmission',
      icon: 'fas fa-envelope',
      category: 'External',
      action: () => window.open('mailto:dev@thomasjbutler.me', '_blank'),
      keywords: ['email', 'contact', 'mail']
    },

    // Matrix Commands
    {
      id: 'matrix-rain',
      title: 'Toggle Matrix Rain',
      description: 'Control background data flow',
      icon: 'fas fa-code',
      category: 'Matrix',
      action: () => {
        // This would require global state management
        console.log('Matrix rain toggled');
      },
      keywords: ['matrix', 'rain', 'background', 'effect']
    },
    {
      id: 'particles-toggle',
      title: `${particleSettings.enabled ? 'Disable' : 'Enable'} Particles`,
      description: 'Toggle cursor particle effects',
      icon: 'fas fa-sparkles',
      category: 'Matrix',
      action: () => {
        if (particleSettings.enabled) {
          particlePresets.off();
        } else {
          particlePresets.normal();
        }
      },
      keywords: ['particles', 'cursor', 'effects', 'toggle']
    },
    {
      id: 'particles-subtle',
      title: 'Subtle Particles',
      description: 'Low-intensity particle effects',
      icon: 'fas fa-adjust',
      category: 'Matrix',
      action: () => particlePresets.subtle(),
      keywords: ['particles', 'subtle', 'low', 'minimal']
    },
    {
      id: 'particles-normal',
      title: 'Normal Particles',
      description: 'Standard particle effects',
      icon: 'fas fa-circle',
      category: 'Matrix',
      action: () => particlePresets.normal(),
      keywords: ['particles', 'normal', 'standard', 'default']
    },
    {
      id: 'particles-intense',
      title: 'Intense Particles',
      description: 'High-intensity particle effects',
      icon: 'fas fa-fire',
      category: 'Matrix',
      action: () => particlePresets.intense(),
      keywords: ['particles', 'intense', 'high', 'maximum']
    },
    {
      id: 'particles-matrix',
      title: 'Matrix Particles',
      description: 'Optimized Matrix-style effects',
      icon: 'fas fa-atom',
      category: 'Matrix',
      action: () => particlePresets.matrix(),
      keywords: ['particles', 'matrix', 'optimized', 'style']
    },

    // Terminal Games
    {
      id: 'terminal-games',
      title: 'Terminal Games',
      description: 'Access Matrix arcade - hidden games collection',
      icon: 'fas fa-gamepad',
      category: 'Games',
      action: () => {
        onClose();
        onOpenTerminalGames?.();
      },
      keywords: ['games', 'arcade', 'terminal', 'play', 'matrix']
    },
    {
      id: 'game-snake',
      title: 'Matrix Snake',
      description: 'Classic snake with neural pathway theme',
      icon: '🐍',
      category: 'Games',
      action: () => {
        onClose();
        onOpenTerminalGames?.('snake');
      },
      keywords: ['snake', 'game', 'classic', 'arcade']
    },
    {
      id: 'game-codebreaker',
      title: 'Code Breaker',
      description: 'Decrypt Matrix sequences and crack the system',
      icon: '🔓',
      category: 'Games',
      action: () => {
        onClose();
        onOpenTerminalGames?.('codebreaker');
      },
      keywords: ['codebreaker', 'hack', 'decrypt', 'puzzle', 'code']
    },
    {
      id: 'terminal-access',
      title: 'Access Terminal',
      description: 'Activate secure terminal interface',
      icon: 'fas fa-terminal',
      category: 'Matrix',
      action: () => {
        // Scroll to terminal or navigate to page with terminal
        const terminal = document.querySelector('.terminal-window');
        if (terminal) {
          terminal.scrollIntoView({ behavior: 'smooth' });
        }
      },
      keywords: ['terminal', 'console', 'command']
    }
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const filtered = query
      ? commands.filter(command =>
          command.title.toLowerCase().includes(query.toLowerCase()) ||
          command.description.toLowerCase().includes(query.toLowerCase()) ||
          command.keywords?.some(keyword =>
            keyword.toLowerCase().includes(query.toLowerCase())
          )
        )
      : commands;

    setFilteredCommands(filtered);
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev =>
            prev < filteredCommands.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev =>
            prev > 0 ? prev - 1 : filteredCommands.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
            onClose();
          }
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  const categories = [...new Set(filteredCommands.map(cmd => cmd.category))];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4"
        style={{ backdropFilter: 'blur(8px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="w-full max-w-2xl bg-black/95 border border-green-500/30 rounded-lg shadow-2xl overflow-hidden"
          style={{
            boxShadow: '0 0 50px rgba(0, 255, 0, 0.3), inset 0 0 20px rgba(0, 255, 0, 0.1)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="border-b border-green-500/30 p-4">
            <div className="flex items-center gap-3 mb-3">
              <i className="fas fa-terminal text-green-400 text-lg"></i>
              <h2 className="text-green-400 font-mono text-lg">
                &#91; COMMAND_PALETTE &#93;
              </h2>
              <div className="ml-auto flex items-center gap-2 text-xs font-mono text-gray-400">
                <span>ESC</span>
                <span className="text-gray-600">to close</span>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400"></i>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="w-full bg-black/50 border border-green-500/30 rounded pl-10 pr-4 py-3 text-white font-mono text-sm
                          focus:border-green-400/70 focus:ring-2 focus:ring-green-400/20 focus:outline-none
                          transition-all duration-300 placeholder-gray-500"
                style={{
                  boxShadow: '0 0 10px rgba(0, 255, 0, 0.2)'
                }}
              />
            </div>
          </div>

          {/* Commands List */}
          <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-green-500">
            {filteredCommands.length === 0 ? (
              <div className="p-8 text-center">
                <i className="fas fa-search text-gray-600 text-2xl mb-3"></i>
                <p className="text-gray-400 font-mono">No commands found</p>
                <p className="text-gray-600 font-mono text-sm mt-1">
                  Try a different search term
                </p>
              </div>
            ) : (
              <div className="p-2">
                {categories.map((category) => {
                  const categoryCommands = filteredCommands.filter(
                    (cmd) => cmd.category === category
                  );

                  return (
                    <div key={category} className="mb-4 last:mb-0">
                      <div className="px-3 py-2 text-xs font-mono text-gray-400 uppercase tracking-wider">
                        &#91; {category} &#93;
                      </div>
                      {categoryCommands.map((command, index) => {
                        const globalIndex = filteredCommands.indexOf(command);
                        const isSelected = globalIndex === selectedIndex;

                        return (
                          <motion.div
                            key={command.id}
                            className={`
                              mx-1 px-3 py-3 rounded cursor-pointer transition-all duration-200
                              ${isSelected
                                ? 'bg-green-500/20 border border-green-400/50'
                                : 'hover:bg-green-500/10 border border-transparent'
                              }
                            `}
                            onClick={() => {
                              command.action();
                              onClose();
                            }}
                            style={{
                              boxShadow: isSelected
                                ? '0 0 15px rgba(0, 255, 0, 0.2)'
                                : 'none'
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`
                                w-8 h-8 rounded flex items-center justify-center
                                ${isSelected
                                  ? 'bg-green-500/30 border border-green-400/50'
                                  : 'bg-green-500/10 border border-green-500/30'
                                }
                              `}>
                                <i className={`${command.icon} text-green-400 text-sm`}></i>
                              </div>
                              <div className="flex-1">
                                <div className="text-white font-mono text-sm">
                                  {command.title}
                                </div>
                                <div className="text-gray-400 font-mono text-xs mt-1">
                                  {command.description}
                                </div>
                              </div>
                              {isSelected && (
                                <div className="text-green-400 font-mono text-xs">
                                  <i className="fas fa-arrow-right"></i>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-green-500/30 p-3">
            <div className="flex items-center justify-between text-xs font-mono text-gray-400">
              <div className="flex items-center gap-4">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span>ESC close</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>{filteredCommands.length} commands</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};