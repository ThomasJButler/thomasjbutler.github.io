import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MatrixLayout } from '../components/matrix/MatrixLayout';

export const AboutPage: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState('INITIALIZING');
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // System boot sequence
    const bootSequence = async () => {
      setSystemStatus('LOADING');
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSystemStatus('ANALYZING NEURAL PATTERNS');
      await new Promise(resolve => setTimeout(resolve, 800));
      setSystemStatus('COMPILING SKILL MATRIX');
      await new Promise(resolve => setTimeout(resolve, 600));
      setSystemStatus('SYSTEM PROFILE LOADED');

      // Reveal sections progressively
      for (let i = 0; i < 5; i++) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setVisibleSections(prev => [...prev, i]);
      }
    };

    bootSequence();
  }, []);

  return (
    <MatrixLayout enableRain={true} intensity={0.2} adaptiveDimming={true}>
      <div className="min-h-screen py-8 px-4">
        {/* System Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-mono text-matrix-primary mb-4"
              style={{
                textShadow: '0 0 20px rgba(0, 255, 0, 0.8)',
                fontWeight: 'bold'
              }}>
            &#91; SYSTEM PROFILE &#93;
          </h1>
          <div className="text-lg text-green-300 font-mono mb-4">
            <span className="text-green-400">USER:</span> THOMAS_J_BUTLER.exe
          </div>
          <div className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-sm border border-green-500/30 px-4 py-2 rounded font-mono">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400">STATUS:</span>
            <span className="text-white">{systemStatus}</span>
          </div>
        </motion.div>

        {/* Neural Architecture Overview */}
        <AnimatePresence>
          {visibleSections.includes(0) && (
            <motion.section
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-12"
            >
              <div className="bg-black/70 backdrop-blur-lg border border-green-500/30 rounded-lg p-6 shadow-lg shadow-green-500/20">
                <h2 className="text-2xl font-mono text-green-400 mb-6 flex items-center gap-3">
                  <i className="fas fa-brain text-green-500"></i>
                  &#91; NEURAL ARCHITECTURE ANALYSIS &#93;
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass-effect p-4 rounded border border-green-500/20">
                    <div className="text-green-300 font-mono text-sm mb-2">&#91; CORE DRIVE &#93;</div>
                    <p className="text-gray-300 leading-relaxed">
                      Programming transcends profession—it's pure neural activation. The synthesis of logic and creativity,
                      transforming abstract concepts into digital reality through systematic problem-solving protocols.
                    </p>
                  </div>

                  <div className="glass-effect p-4 rounded border border-green-500/20">
                    <div className="text-green-300 font-mono text-sm mb-2">&#91; ORIGINS &#93;</div>
                    <p className="text-gray-300 leading-relaxed">
                      Early fascination with technological systems led to exploration of multiple programming paradigms.
                      Pattern recognition: programming = optimal channel for creative problem-solving expression.
                    </p>
                  </div>

                  <div className="glass-effect p-4 rounded border border-green-500/20">
                    <div className="text-green-300 font-mono text-sm mb-2">&#91; EVOLUTION &#93;</div>
                    <p className="text-gray-300 leading-relaxed">
                      Continuous skill enhancement across development domains. Current focus: pushing technological
                      boundaries through innovative solutions—web applications, AI models, mobile architectures.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
        {/* System Evolution Timeline */}
        <AnimatePresence>
          {visibleSections.includes(1) && (
            <motion.section
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <div className="bg-black/70 backdrop-blur-lg border border-green-500/30 rounded-lg p-6 shadow-lg shadow-green-500/20">
                <h2 className="text-2xl font-mono text-green-400 mb-6 flex items-center gap-3">
                  <i className="fas fa-timeline text-green-500"></i>
                  &#91; SYSTEM EVOLUTION TIMELINE &#93;
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative"
                  >
                    <div className="glass-effect p-6 rounded border border-green-500/20 hover:border-green-400/40 transition-all duration-300">
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                          <i className="fas fa-lightbulb text-green-400 text-xl"></i>
                        </div>
                      </div>
                      <h4 className="text-green-300 font-mono text-lg mb-3 text-center">&#91; INITIALIZATION &#93;</h4>
                      <p className="text-gray-300 text-sm leading-relaxed text-center">
                        Bootstrap sequence: HTML protocols, Python scripts. First system responses detected.
                        Joy.exe successfully executed during creation processes.
                      </p>
                      <div className="mt-4 text-center">
                        <div className="inline-block bg-green-500/10 border border-green-500/30 rounded px-2 py-1 text-xs font-mono text-green-400">
                          PHASE_01.sys
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="relative"
                  >
                    <div className="glass-effect p-6 rounded border border-green-500/20 hover:border-green-400/40 transition-all duration-300">
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                          <i className="fas fa-code text-green-400 text-xl"></i>
                        </div>
                      </div>
                      <h4 className="text-green-300 font-mono text-lg mb-3 text-center">&#91; EXPANSION &#93;</h4>
                      <p className="text-gray-300 text-sm leading-relaxed text-center">
                        Full-stack protocols integrated. React.js, Node.js modules installed.
                        System capabilities significantly enhanced. Multi-domain proficiency achieved.
                      </p>
                      <div className="mt-4 text-center">
                        <div className="inline-block bg-green-500/10 border border-green-500/30 rounded px-2 py-1 text-xs font-mono text-green-400">
                          PHASE_02.sys
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="relative"
                  >
                    <div className="glass-effect p-6 rounded border border-green-500/20 hover:border-green-400/40 transition-all duration-300">
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                          <i className="fas fa-robot text-green-400 text-xl"></i>
                        </div>
                      </div>
                      <h4 className="text-green-300 font-mono text-lg mb-3 text-center">&#91; AI_INTEGRATION &#93;</h4>
                      <p className="text-gray-300 text-sm leading-relaxed text-center">
                        Machine learning algorithms deployed. Neural network architectures mastered.
                        Advanced AI protocols now operational. Innovation.exe running continuously.
                      </p>
                      <div className="mt-4 text-center">
                        <div className="inline-block bg-green-500/10 border border-green-500/30 rounded px-2 py-1 text-xs font-mono text-green-400">
                          PHASE_03.sys
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Technical Capability Matrix */}
        <AnimatePresence>
          {visibleSections.includes(2) && (
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <div className="bg-black/70 backdrop-blur-lg border border-green-500/30 rounded-lg p-6 shadow-lg shadow-green-500/20">
                <h2 className="text-2xl font-mono text-green-400 mb-6 flex items-center gap-3">
                  <i className="fas fa-microchip text-green-500"></i>
                  &#91; TECHNICAL CAPABILITY MATRIX &#93;
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Frontend Systems */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="group"
                  >
                    <div className="glass-effect p-6 rounded border border-green-500/20 hover:border-green-400/50 transition-all duration-300 h-full">
                      <div className="text-center mb-4">
                        <div className="w-12 h-12 mx-auto bg-blue-500/20 rounded border border-blue-500/30 flex items-center justify-center mb-3">
                          <i className="fas fa-desktop text-blue-400 text-lg"></i>
                        </div>
                        <h3 className="text-blue-300 font-mono text-lg mb-4">&#91; FRONTEND_SYSTEMS &#93;</h3>
                      </div>

                      <div className="space-y-3">
                        {[
                          { name: 'React & Next.js', level: 95 },
                          { name: 'TypeScript', level: 90 },
                          { name: 'Modern CSS', level: 88 },
                          { name: 'Performance Opt', level: 85 },
                          { name: 'Responsive Design', level: 92 }
                        ].map((skill, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between text-sm font-mono">
                              <span className="text-gray-300">{skill.name}</span>
                              <span className="text-blue-400">{skill.level}%</span>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                                className="bg-gradient-to-r from-blue-500 to-blue-300 h-2 rounded-full"
                                style={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)' }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Backend Systems */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="group"
                  >
                    <div className="glass-effect p-6 rounded border border-green-500/20 hover:border-green-400/50 transition-all duration-300 h-full">
                      <div className="text-center mb-4">
                        <div className="w-12 h-12 mx-auto bg-orange-500/20 rounded border border-orange-500/30 flex items-center justify-center mb-3">
                          <i className="fas fa-server text-orange-400 text-lg"></i>
                        </div>
                        <h3 className="text-orange-300 font-mono text-lg mb-4">&#91; BACKEND_SYSTEMS &#93;</h3>
                      </div>

                      <div className="space-y-3">
                        {[
                          { name: 'Node.js & Express', level: 88 },
                          { name: 'Python & Django', level: 85 },
                          { name: 'RESTful APIs', level: 92 },
                          { name: 'Database Design', level: 80 },
                          { name: 'Microservices', level: 75 }
                        ].map((skill, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between text-sm font-mono">
                              <span className="text-gray-300">{skill.name}</span>
                              <span className="text-orange-400">{skill.level}%</span>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ delay: 0.9 + index * 0.1, duration: 0.8 }}
                                className="bg-gradient-to-r from-orange-500 to-orange-300 h-2 rounded-full"
                                style={{ boxShadow: '0 0 10px rgba(249, 115, 22, 0.5)' }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* AI/ML Systems */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 }}
                    className="group"
                  >
                    <div className="glass-effect p-6 rounded border border-green-500/20 hover:border-green-400/50 transition-all duration-300 h-full">
                      <div className="text-center mb-4">
                        <div className="w-12 h-12 mx-auto bg-purple-500/20 rounded border border-purple-500/30 flex items-center justify-center mb-3">
                          <i className="fas fa-brain text-purple-400 text-lg"></i>
                        </div>
                        <h3 className="text-purple-300 font-mono text-lg mb-4">&#91; AI_ML_SYSTEMS &#93;</h3>
                      </div>

                      <div className="space-y-3">
                        {[
                          { name: 'Natural Language', level: 90 },
                          { name: 'TensorFlow/PyTorch', level: 82 },
                          { name: 'Custom GPT Models', level: 88 },
                          { name: 'Computer Vision', level: 78 },
                          { name: 'Data Analysis', level: 85 }
                        ].map((skill, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between text-sm font-mono">
                              <span className="text-gray-300">{skill.name}</span>
                              <span className="text-purple-400">{skill.level}%</span>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ delay: 1.1 + index * 0.1, duration: 0.8 }}
                                className="bg-gradient-to-r from-purple-500 to-purple-300 h-2 rounded-full"
                                style={{ boxShadow: '0 0 10px rgba(168, 85, 247, 0.5)' }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Credential Database */}
        <AnimatePresence>
          {visibleSections.includes(3) && (
            <motion.section
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-12"
            >
              <div className="bg-black/70 backdrop-blur-lg border border-green-500/30 rounded-lg p-6 shadow-lg shadow-green-500/20">
                <h2 className="text-2xl font-mono text-green-400 mb-6 flex items-center gap-3">
                  <i className="fas fa-certificate text-green-500"></i>
                  &#91; CREDENTIAL DATABASE &#93;
                </h2>

                <div className="mb-6 p-4 bg-green-500/5 border border-green-500/20 rounded">
                  <p className="text-green-300 font-mono text-sm">
                    &#62; Continuous knowledge enhancement protocols active
                    <br />
                    &#62; Staying current with emerging technology paradigms
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  {/* Primary Qualifications */}
                  {[
                    {
                      title: "Estio Level 4 Software Developer",
                      subtitle: "APPRENTICESHIP_PROTOCOL",
                      date: "COMPLETED_2024",
                      status: "VERIFIED",
                      description: "Advanced software development training with real-world application protocols",
                      color: "green"
                    },
                    {
                      title: "City & Guilds Level 2 ICT",
                      subtitle: "SYSTEMS_SUPPORT_DIPLOMA",
                      date: "COMPLETED_2025",
                      status: "BLOCKCHAIN_VERIFIED",
                      description: "Comprehensive ICT systems support and maintenance protocols",
                      color: "blue",
                      hasVerification: true,
                      verifyLink: "https://digitalcredentials.cityandguilds.com/46a4d6de-63e8-4e80-9949-50e4ed5b91c4#acc.pzMH8SWw",
                      badgeUrl: "https://api.accredible.com/v1/frontend/credential_website_embed_image/badge/155335744"
                    },
                    {
                      title: "CodeCademy ML & LLM Bootcamp",
                      subtitle: "AI_MASTERY_PROTOCOL",
                      date: "INITIATED_2025",
                      status: "IN_PROGRESS",
                      description: "Advanced generative AI and machine learning architecture mastery",
                      color: "purple"
                    }
                  ].map((qual, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.2 }}
                      className="group"
                    >
                      <div className={`glass-effect p-6 rounded border border-${qual.color}-500/20 hover:border-${qual.color}-400/50 transition-all duration-300 h-full`}>
                        <div className="mb-4">
                          <div className={`inline-block px-3 py-1 bg-${qual.color}-500/20 border border-${qual.color}-500/30 rounded text-xs font-mono text-${qual.color}-400 mb-3`}>
                            {qual.status}
                          </div>
                          <h3 className={`text-${qual.color}-300 font-mono text-lg mb-2`}>{qual.title}</h3>
                          <div className="text-gray-400 font-mono text-sm mb-2">&#91; {qual.subtitle} &#93;</div>
                          <div className="text-gray-500 font-mono text-xs mb-3">&#62; {qual.date}</div>
                          <p className="text-gray-300 text-sm leading-relaxed mb-4">{qual.description}</p>
                        </div>

                        {qual.hasVerification && (
                          <div className="space-y-3">
                            <a
                              href={qual.verifyLink}
                              target="_blank"
                              rel="noopener"
                              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-mono text-sm"
                            >
                              <i className="fas fa-external-link-alt"></i>
                              VERIFY_CREDENTIAL.exe
                            </a>
                            <div className="border border-blue-500/30 rounded p-2 bg-blue-500/5">
                              <img
                                src={qual.badgeUrl}
                                alt="Verification Badge"
                                className="w-16 h-16 mx-auto opacity-80 hover:opacity-100 transition-opacity"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Additional Certifications */}
                <div className="bg-black/50 border border-green-500/20 rounded-lg p-6">
                  <h3 className="text-green-300 font-mono text-lg mb-4 flex items-center gap-2">
                    <i className="fas fa-list-check text-green-500"></i>
                    &#91; ADDITIONAL_CERTIFICATIONS &#93;
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {[
                      "AWS Qualified - Cloud Architecture & Serverless Computing",
                      "Azure Qualified - Cloud Infrastructure & DevOps",
                      "Cisco Qualified - Network Security & Data Analytics",
                      "HubSpot Qualified - CMS Development & Integration",
                      "CodeCademy Full Stack Engineer Certificate",
                      "Free Code Camp - Data Analysis With Python"
                    ].map((cert, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 + index * 0.1 }}
                        className="flex items-center gap-3 p-3 glass-effect rounded border border-green-500/20"
                      >
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-gray-300 font-mono text-sm">{cert}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="text-center">
                    <a
                      href="https://www.thomasjbutler.me/#education"
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/30 px-6 py-3 rounded font-mono text-green-400 hover:bg-green-500/20 hover:border-green-400/50 transition-all duration-300"
                    >
                      <i className="fas fa-database"></i>
                      <span>ACCESS_FULL_DATABASE.exe</span>
                      <i className="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Knowledge Archive Access */}
        <AnimatePresence>
          {visibleSections.includes(4) && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <div className="bg-black/70 backdrop-blur-lg border border-green-500/30 rounded-lg p-8 shadow-lg shadow-green-500/20">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                >
                  <h2 className="text-3xl font-mono text-green-400 mb-4 flex items-center justify-center gap-3">
                    <i className="fas fa-brain text-green-500"></i>
                    &#91; KNOWLEDGE ARCHIVE ACCESS &#93;
                  </h2>

                  <div className="mb-6 p-4 bg-green-500/5 border border-green-500/20 rounded">
                    <p className="text-green-300 font-mono text-sm">
                      &#62; Accessing thought repository: AI • Development • Human-Tech Interface
                      <br />
                      &#62; 20+ archived entries on making technology more human
                    </p>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/blog"
                      className="inline-flex items-center gap-4 bg-green-500/10 border border-green-500/30 px-8 py-4 rounded font-mono text-green-400 hover:bg-green-500/20 hover:border-green-400/50 transition-all duration-300 text-lg"
                      style={{
                        boxShadow: '0 0 20px rgba(0, 255, 0, 0.2)',
                        textShadow: '0 0 10px rgba(0, 255, 0, 0.5)'
                      }}
                    >
                      <i className="fas fa-book-open text-xl"></i>
                      <span>INITIALIZE_BLOG_ACCESS.exe</span>
                      <i className="fas fa-arrow-right text-xl"></i>
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-mono"
                  >
                    <div className="glass-effect p-3 rounded border border-green-500/20">
                      <div className="text-green-400 mb-1">&#91; AI_INSIGHTS &#93;</div>
                      <div className="text-gray-300">Neural network analysis</div>
                    </div>
                    <div className="glass-effect p-3 rounded border border-green-500/20">
                      <div className="text-green-400 mb-1">&#91; DEV_PHILOSOPHY &#93;</div>
                      <div className="text-gray-300">Code architecture thoughts</div>
                    </div>
                    <div className="glass-effect p-3 rounded border border-green-500/20">
                      <div className="text-green-400 mb-1">&#91; HUMAN_TECH &#93;</div>
                      <div className="text-gray-300">Digital empathy protocols</div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* System Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0 }}
          className="text-center mt-12 pt-8 border-t border-green-500/30"
        >
          <div className="font-mono text-green-400 text-sm">
            &#91; SYSTEM_PROFILE_END &#93; • USER: THOMAS_J_BUTLER.exe • STATUS: ACTIVE
          </div>
        </motion.div>
      </div>
    </MatrixLayout>
  );
};