import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MatrixLayout } from '../components/matrix/MatrixLayout';

interface Skill {
  title: string;
  icon: string;
  description: string;
  proficiency: number;
  category: string;
  years: number;
  projects: number;
  specialization?: string;
}

export const SkillsPage: React.FC = () => {
  const [scanningPhase, setScanningPhase] = useState('INITIALIZING');
  const [visibleCategories, setVisibleCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const scanRef = useRef<HTMLDivElement>(null);

  const skillsMatrix: Skill[] = [
    // Frontend Domain
    {
      title: "React & Next.js",
      icon: "fab fa-react",
      description: "Advanced component architectures, state management, and server-side rendering protocols",
      proficiency: 95,
      category: "frontend",
      years: 4,
      projects: 25,
      specialization: "Component Architecture"
    },
    {
      title: "TypeScript",
      icon: "fas fa-code",
      description: "Type-safe development with advanced generics and interface design patterns",
      proficiency: 90,
      category: "frontend",
      years: 3,
      projects: 20,
      specialization: "Type Safety"
    },
    {
      title: "CSS3 & Modern Styling",
      icon: "fab fa-css3-alt",
      description: "Advanced animations, grid systems, and responsive design with Tailwind/SASS",
      proficiency: 88,
      category: "frontend",
      years: 5,
      projects: 30,
      specialization: "Visual Design"
    },
    {
      title: "HTML5 Semantic Web",
      icon: "fab fa-html5",
      description: "Semantic markup, accessibility standards, and progressive web app development",
      proficiency: 92,
      category: "frontend",
      years: 5,
      projects: 35,
      specialization: "Web Standards"
    },

    // Backend Domain
    {
      title: "Node.js & Express",
      icon: "fab fa-node-js",
      description: "Scalable server architectures, microservices, and API gateway implementations",
      proficiency: 88,
      category: "backend",
      years: 3,
      projects: 18,
      specialization: "API Development"
    },
    {
      title: "Python & Django",
      icon: "fab fa-python",
      description: "Data processing pipelines, web frameworks, and machine learning integration",
      proficiency: 85,
      category: "backend",
      years: 4,
      projects: 22,
      specialization: "Data Processing"
    },
    {
      title: "C# & .NET",
      icon: "fab fa-microsoft",
      description: "Enterprise applications, desktop systems, and cloud-native development",
      proficiency: 80,
      category: "backend",
      years: 2,
      projects: 12,
      specialization: "Enterprise Systems"
    },
    {
      title: "Database Systems",
      icon: "fas fa-database",
      description: "SQL optimization, NoSQL architectures, and distributed database design",
      proficiency: 82,
      category: "backend",
      years: 3,
      projects: 15,
      specialization: "Data Architecture"
    },

    // AI/ML Domain
    {
      title: "Machine Learning",
      icon: "fas fa-brain",
      description: "Neural networks, deep learning, and custom model development with TensorFlow/PyTorch",
      proficiency: 88,
      category: "ai",
      years: 2,
      projects: 14,
      specialization: "Neural Networks"
    },
    {
      title: "Natural Language Processing",
      icon: "fas fa-comments",
      description: "Text analysis, sentiment processing, and conversational AI implementations",
      proficiency: 90,
      category: "ai",
      years: 2,
      projects: 16,
      specialization: "Language Models"
    },
    {
      title: "AI Asset Generation",
      icon: "fas fa-palette",
      description: "Creative AI tools, image generation, and automated content creation systems",
      proficiency: 85,
      category: "ai",
      years: 1,
      projects: 8,
      specialization: "Creative AI"
    },

    // DevOps Domain
    {
      title: "Git & Version Control",
      icon: "fab fa-git-alt",
      description: "Advanced branching strategies, collaborative workflows, and repository management",
      proficiency: 93,
      category: "devops",
      years: 5,
      projects: 40,
      specialization: "Code Management"
    },
    {
      title: "Cloud Architecture",
      icon: "fas fa-cloud",
      description: "AWS/Azure deployments, serverless computing, and infrastructure as code",
      proficiency: 78,
      category: "devops",
      years: 2,
      projects: 10,
      specialization: "Cloud Systems"
    },
    {
      title: "Network Engineering",
      icon: "fas fa-network-wired",
      description: "Protocol analysis, security implementations, and system configuration",
      proficiency: 75,
      category: "devops",
      years: 3,
      projects: 12,
      specialization: "Network Security"
    }
  ];

  const categories = [
    { id: 'all', label: 'ALL_SYSTEMS', color: 'green' },
    { id: 'frontend', label: 'FRONTEND_MATRIX', color: 'blue' },
    { id: 'backend', label: 'BACKEND_CORE', color: 'orange' },
    { id: 'ai', label: 'AI_NEURAL_NET', color: 'purple' },
    { id: 'devops', label: 'DEVOPS_INFRA', color: 'cyan' }
  ];

  useEffect(() => {
    const initializeMatrix = async () => {
      setScanningPhase('SCANNING CAPABILITY MATRIX');
      await new Promise(resolve => setTimeout(resolve, 1000));
      setScanningPhase('ANALYZING SKILL PATTERNS');
      await new Promise(resolve => setTimeout(resolve, 800));
      setScanningPhase('COMPILING PROFICIENCY DATA');
      await new Promise(resolve => setTimeout(resolve, 600));
      setScanningPhase('MATRIX LOADED - ALL SYSTEMS OPERATIONAL');

      // Progressive category reveal
      for (const category of categories) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setVisibleCategories(prev => [...prev, category.id]);
      }
    };

    initializeMatrix();
  }, []);

  const filteredSkills = selectedCategory === 'all'
    ? skillsMatrix
    : skillsMatrix.filter(skill => skill.category === selectedCategory);

  const getSkillColor = (category: string) => {
    const categoryConfig = categories.find(cat => cat.id === category);
    return categoryConfig?.color || 'green';
  };

  return (
    <MatrixLayout enableRain={true} intensity={0.15} adaptiveDimming={true}>
      <div className="min-h-screen py-8 px-4">
        {/* Matrix Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-mono text-green-400 mb-4"
              style={{
                textShadow: '0 0 20px rgba(0, 255, 0, 0.8)',
                fontWeight: 'bold'
              }}>
            &#91; CAPABILITY MATRIX &#93;
          </h1>
          <div className="text-lg text-green-300 font-mono mb-4">
            <span className="text-green-400">SYSTEM:</span> SKILL_ANALYSIS_v3.0
          </div>
          <div className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-sm border border-green-500/30 px-4 py-2 rounded font-mono">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400">STATUS:</span>
            <span className="text-white">{scanningPhase}</span>
          </div>
        </motion.div>

        {/* Category Matrix Selector */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <div className="bg-black/70 backdrop-blur-lg border border-green-500/30 rounded-lg p-4 shadow-lg shadow-green-500/20">
            <h3 className="text-green-400 font-mono mb-4 flex items-center gap-2">
              <i className="fas fa-filter"></i>
              &#91; MATRIX_FILTER &#93;
            </h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <AnimatePresence key={category.id}>
                  {visibleCategories.includes(category.id) && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded font-mono text-sm border transition-all duration-300 ${
                        selectedCategory === category.id
                          ? `bg-${category.color}-500/20 border-${category.color}-400/50 text-${category.color}-300`
                          : 'bg-black/50 border-gray-600/50 text-gray-400 hover:border-green-500/50'
                      }`}
                      style={{
                        boxShadow: selectedCategory === category.id
                          ? `0 0 15px rgba(0, 255, 0, 0.3)`
                          : 'none'
                      }}
                    >
                      {category.label}
                    </motion.button>
                  )}
                </AnimatePresence>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Skills Holographic Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="wait">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={`${selectedCategory}-${skill.title}`}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredSkill(skill.title)}
                onMouseLeave={() => setHoveredSkill(null)}
                className="group cursor-pointer"
              >
                <div className={`
                  glass-effect p-6 rounded-lg border transition-all duration-300 h-full
                  ${hoveredSkill === skill.title
                    ? `border-${getSkillColor(skill.category)}-400/70 shadow-lg`
                    : `border-${getSkillColor(skill.category)}-500/30 hover:border-${getSkillColor(skill.category)}-400/50`
                  }
                `}
                style={{
                  boxShadow: hoveredSkill === skill.title
                    ? `0 0 30px rgba(0, 255, 0, 0.3), inset 0 0 20px rgba(0, 255, 0, 0.05)`
                    : '0 4px 20px rgba(0, 0, 0, 0.3)'
                }}
                >
                  {/* Skill Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`
                      w-16 h-16 rounded-lg border flex items-center justify-center transition-all duration-300
                      bg-${getSkillColor(skill.category)}-500/10 border-${getSkillColor(skill.category)}-500/30
                      ${hoveredSkill === skill.title ? 'scale-110' : ''}
                    `}>
                      <i className={`${skill.icon} text-2xl text-${getSkillColor(skill.category)}-400`}
                         style={{
                           filter: hoveredSkill === skill.title
                             ? `drop-shadow(0 0 10px rgba(0, 255, 0, 0.8))`
                             : 'none'
                         }}
                      ></i>
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-mono text-lg text-${getSkillColor(skill.category)}-300 mb-1`}>
                        {skill.title}
                      </h3>
                      <div className="text-gray-400 font-mono text-xs">
                        &#91; {skill.specialization} &#93;
                      </div>
                    </div>
                  </div>

                  {/* Proficiency Matrix */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 font-mono text-sm">PROFICIENCY</span>
                      <span className={`font-mono text-sm font-bold text-${getSkillColor(skill.category)}-400`}>
                        {skill.proficiency}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.proficiency}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 1, ease: "easeInOut" }}
                        className={`h-full bg-gradient-to-r from-${getSkillColor(skill.category)}-500 to-${getSkillColor(skill.category)}-300 relative`}
                        style={{
                          boxShadow: `0 0 10px rgba(0, 255, 0, 0.5)`
                        }}
                      >
                        {/* Animated glow effect */}
                        <motion.div
                          animate={{
                            x: [-10, skill.proficiency * 3, -10],
                            opacity: [0.3, 0.8, 0.3]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          className="absolute inset-y-0 w-4 bg-white/20 blur-sm"
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* Experience Data */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className={`text-2xl font-mono font-bold text-${getSkillColor(skill.category)}-400`}>
                        {skill.years}
                      </div>
                      <div className="text-gray-400 font-mono text-xs">YEARS</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-mono font-bold text-${getSkillColor(skill.category)}-400`}>
                        {skill.projects}
                      </div>
                      <div className="text-gray-400 font-mono text-xs">PROJECTS</div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm leading-relaxed font-mono">
                    {skill.description}
                  </p>

                  {/* Holographic Effect Overlay */}
                  <motion.div
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    style={{
                      background: hoveredSkill === skill.title
                        ? `linear-gradient(45deg, transparent 30%, rgba(0, 255, 0, 0.05) 50%, transparent 70%)`
                        : 'transparent',
                      transition: 'all 0.3s ease'
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Matrix Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-12 text-center"
        >
          <div className="bg-black/70 backdrop-blur-lg border border-green-500/30 rounded-lg p-6 shadow-lg shadow-green-500/20">
            <h3 className="text-green-400 font-mono text-xl mb-6 flex items-center justify-center gap-2">
              <i className="fas fa-chart-line"></i>
              &#91; MATRIX ANALYTICS &#93;
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-3xl font-mono font-bold text-green-400 mb-2">
                  {skillsMatrix.length}
                </div>
                <div className="text-gray-300 font-mono text-sm">TOTAL SKILLS</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-3xl font-mono font-bold text-blue-400 mb-2">
                  {Math.round(skillsMatrix.reduce((acc, skill) => acc + skill.proficiency, 0) / skillsMatrix.length)}%
                </div>
                <div className="text-gray-300 font-mono text-sm">AVG PROFICIENCY</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-3xl font-mono font-bold text-purple-400 mb-2">
                  {skillsMatrix.reduce((acc, skill) => acc + skill.years, 0)}
                </div>
                <div className="text-gray-300 font-mono text-sm">TOTAL YEARS</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-3xl font-mono font-bold text-orange-400 mb-2">
                  {skillsMatrix.reduce((acc, skill) => acc + skill.projects, 0)}
                </div>
                <div className="text-gray-300 font-mono text-sm">TOTAL PROJECTS</div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* System Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0 }}
          className="text-center mt-12 pt-8 border-t border-green-500/30"
        >
          <div className="font-mono text-green-400 text-sm">
            &#91; CAPABILITY_MATRIX_END &#93; • ANALYSIS: COMPLETE • PROFICIENCY: VERIFIED
          </div>
        </motion.div>
      </div>
    </MatrixLayout>
  );
};