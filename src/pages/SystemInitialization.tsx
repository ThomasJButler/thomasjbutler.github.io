import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MatrixLayout,
  GlitchText,
  HologramCard,
  TerminalWindow,
  NeonButton,
  CyberGrid
} from '@/components/matrix';

interface SystemStatus {
  phase: number;
  loading: boolean;
  initialized: boolean;
  systems: { name: string; status: 'loading' | 'complete' | 'error'; delay: number }[];
}

const projects = [
  {
    title: "AiTomatic Suite",
    description: "Advanced AI model comparison and analysis platform with real-time testing capabilities.",
    image: "https://res.cloudinary.com/depqttzlt/image/upload/v1754529216/aicomparison_xoherd.png",
    tags: ["AI/ML", "Python", "React", "Analytics"],
    href: "https://ai-comparison-showcase.vercel.app/"
  },
  {
    title: "Matrix Arcade",
    description: "Cyberpunk gaming platform featuring interactive mini-games and neural network challenges.",
    image: "https://res.cloudinary.com/depqttzlt/image/upload/v1754214154/matrixarcade_xofygu.png",
    tags: ["React", "Python", "Game Dev", "Canvas"],
    href: "https://www.tomatic.tech/"
  },
  {
    title: "Commercial Portfolio",
    description: "Enterprise-grade portfolio platform with Notion CMS integration and dynamic content.",
    image: "https://res.cloudinary.com/depqttzlt/image/upload/v1754214153/commercialv20_rus9qz.png",
    tags: ["Next.js", "Notion API", "CMS"],
    href: "https://thomasjbutler.me"
  },
  {
    title: "Neural CSS Engine",
    description: "Advanced CSS animation showcase demonstrating next-generation web technologies.",
    image: "https://res.cloudinary.com/depqttzlt/image/upload/v1754214157/cssshowcase_q25veb.png",
    tags: ["CSS3", "Animation", "WebGL"],
    href: "https://thomasjbutler.github.io/css-showcase/"
  }
];

const systemInitCommands = [
  'initialize_matrix_protocol',
  'loading_neural_networks',
  'establishing_quantum_link',
  'synchronizing_data_streams',
  'activating_security_protocols',
  'system_ready'
];

const systemInitResponses = {
  'initialize_matrix_protocol': ['Initializing Matrix Protocol v3.0...', 'Neural pathways: ONLINE', 'Quantum encryption: ACTIVE'],
  'loading_neural_networks': ['Loading neural networks...', 'AI cores: 6/6 ACTIVE', 'Machine learning models: OPTIMIZED'],
  'establishing_quantum_link': ['Establishing quantum link...', 'Quantum entanglement: STABLE', 'Data transmission: ENCRYPTED'],
  'synchronizing_data_streams': ['Synchronizing data streams...', 'Real-time analytics: ENABLED', 'Cloud sync: COMPLETE'],
  'activating_security_protocols': ['Activating security protocols...', 'Firewall: MAXIMUM SECURITY', 'Intrusion detection: ACTIVE'],
  'system_ready': ['SYSTEM INITIALIZATION COMPLETE', 'Welcome to the Matrix, Neo...', 'All systems operational. Ready for human interface.']
};

export const SystemInitialization: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    phase: 0,
    loading: true,
    initialized: false,
    systems: [
      { name: 'NEURAL_CORE', status: 'loading', delay: 1000 },
      { name: 'QUANTUM_LINK', status: 'loading', delay: 2000 },
      { name: 'AI_MATRIX', status: 'loading', delay: 3000 },
      { name: 'SECURITY_GRID', status: 'loading', delay: 4000 },
      { name: 'DATA_STREAMS', status: 'loading', delay: 5000 },
      { name: 'HUMAN_INTERFACE', status: 'loading', delay: 6000 }
    ]
  });

  const [currentTerminalPhase, setCurrentTerminalPhase] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [terminalActive, setTerminalActive] = useState(false);

  useEffect(() => {
    // Initialize system startup sequence
    const initializeSystem = async () => {
      // Phase 1: System startup
      setTimeout(() => setSystemStatus(prev => ({ ...prev, phase: 1 })), 500);

      // Phase 2: Loading systems
      systemStatus.systems.forEach((system, index) => {
        setTimeout(() => {
          setSystemStatus(prev => ({
            ...prev,
            systems: prev.systems.map((s, i) =>
              i === index ? { ...s, status: 'complete' } : s
            )
          }));
        }, system.delay);
      });

      // Phase 3: System ready
      setTimeout(() => {
        setSystemStatus(prev => ({
          ...prev,
          phase: 2,
          loading: false,
          initialized: true
        }));
        setShowContent(true);
      }, 7000);
    };

    initializeSystem();
  }, []);

  useEffect(() => {
    // Auto-progress terminal commands only when terminal is active
    if (terminalActive && systemStatus.initialized && currentTerminalPhase < systemInitCommands.length) {
      const timer = setTimeout(() => {
        setCurrentTerminalPhase(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentTerminalPhase, systemStatus.initialized, terminalActive]);

  const renderSystemStartup = () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <GlitchText
            variant="default"
            intensity="high"
            trigger="auto"
            className="text-6xl font-mono font-bold mb-8"
          >
            SYSTEM INITIALIZATION
          </GlitchText>
        </motion.div>

        <div className="space-y-4">
          {systemStatus.systems.map((system, index) => (
            <motion.div
              key={system.name}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-center justify-between bg-black/50 border border-matrix-primary/30 rounded p-4 min-w-[400px]"
            >
              <span className="font-mono text-matrix-primary">{system.name}</span>
              <div className="flex items-center gap-2">
                {system.status === 'loading' && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-matrix-primary border-t-transparent rounded-full"
                  />
                )}
                {system.status === 'complete' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-matrix-primary"
                  >
                    ✓
                  </motion.div>
                )}
                <span className={`font-mono text-sm ${
                  system.status === 'complete' ? 'text-matrix-primary' : 'text-gray-400'
                }`}>
                  {system.status === 'complete' ? 'ONLINE' : 'LOADING...'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {systemStatus.phase >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-center"
          >
            <GlitchText
              variant="default"
              intensity="medium"
              className="text-2xl font-mono text-matrix-primary mb-4"
            >
              WELCOME TO THE MATRIX
            </GlitchText>
            <p className="text-gray-300 font-mono">All systems operational. Initiating human interface...</p>
          </motion.div>
        )}
      </div>
    </div>
  );

  const renderMainInterface = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="space-y-16"
    >
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        <CyberGrid
          variant="default"
          nodeCount={30}
          interactive={true}
          className="absolute inset-0"
        >
          <div className="relative z-20 text-center space-y-8 max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <GlitchText
                variant="default"
                intensity="low"
                trigger="auto"
                className="text-7xl font-mono font-bold mb-4"
              >
                THOMAS J BUTLER
              </GlitchText>
              <h2 className="text-2xl text-matrix-primary font-mono mb-6">
                NEURAL ARCHITECT • AI INTEGRATION SPECIALIST • MATRIX DEVELOPER
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Bridging the gap between human creativity and artificial intelligence.
                Crafting digital experiences that transcend reality.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex gap-4 justify-center flex-wrap"
            >
              <NeonButton variant="default" glowIntensity="high" pulsing={true}>
                <Link to="/projects" className="flex items-center gap-2">
                  ACCESS PROJECTS
                  <span>→</span>
                </Link>
              </NeonButton>
              <NeonButton variant="cyberpunk" glowIntensity="medium">
                <Link to="/contact" className="flex items-center gap-2">
                  INITIATE CONTACT
                  <span>⚡</span>
                </Link>
              </NeonButton>
            </motion.div>
          </div>
        </CyberGrid>
      </section>

      {/* Terminal Command Center */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-mono text-center mb-12">
              <GlitchText variant="default">COMMAND CENTER</GlitchText>
            </h2>
            <TerminalWindow
              title="MATRIX_NEURAL_INTERFACE_v3.0"
              variant="default"
              height="h-96"
              autoType={true}
              commands={systemInitCommands.slice(0, currentTerminalPhase + 1)}
              responses={systemInitResponses}
              interactive={true}
              isActive={terminalActive}
              onActivate={() => setTerminalActive(true)}
              rateLimit={5} // Lower rate limit for demo
            />
          </motion.div>
        </div>
      </section>

      {/* Project Holocards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-mono text-center mb-16">
              <GlitchText variant="default">NEURAL PROJECTS</GlitchText>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <HologramCard
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    tags={project.tags}
                    href={project.href}
                    variant="default"
                    glowIntensity="medium"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Matrix */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-mono text-center mb-16">
              <GlitchText variant="default">SKILL MATRIX</GlitchText>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "AI Integration",
                  level: 95,
                  skills: ["ChatGPT", "Claude", "Neural Networks", "ML Models"],
                  variant: "default" as const
                },
                {
                  name: "Full-Stack Dev",
                  level: 92,
                  skills: ["React", "Node.js", "Python", "C#/.NET"],
                  variant: "cyberpunk" as const
                },
                {
                  name: "Cyberpunk UI",
                  level: 88,
                  skills: ["Matrix Design", "Neon Effects", "3D Graphics"],
                  variant: "terminal" as const
                }
              ].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.3 }}
                  className="bg-black/80 border border-matrix-primary/30 rounded-lg p-6 relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <h3 className="text-xl font-mono text-matrix-primary mb-4">{skill.name}</h3>
                    <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.3 + 0.5 }}
                        className="bg-matrix-primary h-2 rounded-full"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skill.skills.map((tech, i) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 bg-matrix-primary/20 text-matrix-primary rounded font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Scan lines */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-full h-px bg-matrix-primary"
                        style={{ top: `${i * 10}%` }}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GlitchText
              variant="default"
              intensity="medium"
              className="text-5xl font-mono mb-8"
            >
              READY TO JACK IN?
            </GlitchText>
            <p className="text-xl text-gray-300 mb-12 font-mono">
              The Matrix is calling. Are you ready to see how deep the rabbit hole goes?
            </p>
            <div className="flex gap-6 justify-center flex-wrap">
              <NeonButton variant="default" glowIntensity="ultra" pulsing={true} scanLines={true}>
                <Link to="/contact" className="flex items-center gap-2">
                  ENTER THE MATRIX
                  <span>⚡</span>
                </Link>
              </NeonButton>
              <NeonButton variant="cyberpunk" glowIntensity="high">
                <Link to="/blog" className="flex items-center gap-2">
                  READ THE CODE
                  <span>📖</span>
                </Link>
              </NeonButton>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );

  return (
    <MatrixLayout
      enableRain={true}
      variant="default"
      intensity={0.3} // Dimmed for better content readability
      adaptiveDimming={true}
      className="min-h-screen"
    >
      <AnimatePresence mode="wait">
        {!showContent ? (
          <motion.div
            key="startup"
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1 }}
          >
            {renderSystemStartup()}
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {renderMainInterface()}
          </motion.div>
        )}
      </AnimatePresence>
    </MatrixLayout>
  );
};