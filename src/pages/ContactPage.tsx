import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MatrixLayout } from '../components/matrix/MatrixLayout';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [connectionPhase, setConnectionPhase] = useState('INITIALIZING');
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const initializeConnection = async () => {
      setConnectionPhase('ESTABLISHING SECURE CHANNEL');
      await new Promise(resolve => setTimeout(resolve, 1000));
      setConnectionPhase('VERIFYING TRANSMISSION PROTOCOLS');
      await new Promise(resolve => setTimeout(resolve, 800));
      setConnectionPhase('CONNECTION INTERFACE READY');
      await new Promise(resolve => setTimeout(resolve, 600));
      setConnectionPhase('AWAITING USER INPUT');

      // Progressive section reveal
      const sections = ['contact-info', 'transmission-form'];
      for (const section of sections) {
        await new Promise(resolve => setTimeout(resolve, 400));
        setVisibleSections(prev => [...prev, section]);
      }
    };

    initializeConnection();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setConnectionPhase('TRANSMITTING DATA...');

    try {
      // Simulate Matrix-style transmission delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const response = await fetch('https://formspree.io/f/xeoeenqv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setConnectionPhase('TRANSMISSION SUCCESSFUL');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
        setConnectionPhase('TRANSMISSION FAILED - RETRY REQUIRED');
      }
    } catch (error) {
      setSubmitStatus('error');
      setConnectionPhase('CONNECTION ERROR - SYSTEM FAULT');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        if (submitStatus === 'success') {
          setConnectionPhase('AWAITING USER INPUT');
        }
      }, 3000);
    }
  };

  return (
    <MatrixLayout enableRain={true} intensity={0.2} adaptiveDimming={true}>
      <div className="min-h-screen py-8 px-4">
        {/* Connection Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-mono text-green-400 mb-4"
              style={{
                textShadow: '0 0 20px rgba(0, 255, 0, 0.8)',
                fontWeight: 'bold'
              }}>
            &#91; ESTABLISH CONNECTION &#93;
          </h1>
          <div className="text-lg text-green-300 font-mono mb-4">
            <span className="text-green-400">PROTOCOL:</span> SECURE_TRANSMISSION_v2.0
          </div>
          <div className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-sm border border-green-500/30 px-4 py-2 rounded font-mono">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400">STATUS:</span>
            <span className="text-white">{connectionPhase}</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Connection Terminal */}
          <AnimatePresence>
            {visibleSections.includes('contact-info') && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Location Node */}
                <div className="bg-black/70 backdrop-blur-lg border border-green-500/30 rounded-lg p-6 shadow-lg shadow-green-500/20">
                  <h3 className="text-green-400 font-mono text-lg mb-4 flex items-center gap-2">
                    <i className="fas fa-satellite text-green-500"></i>
                    &#91; LOCATION_NODE &#93;
                  </h3>
                  <motion.a
                    href="https://www.google.com/maps/place/York/@53.9585894,-1.1218767,13z"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 glass-effect rounded border border-green-500/20 hover:border-green-400/50 transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    style={{ textDecoration: 'none' }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-500/20 rounded border border-green-500/30 flex items-center justify-center">
                        <i className="fas fa-map-marker-alt text-green-400"></i>
                      </div>
                      <div>
                        <div className="text-green-300 font-mono">COORDINATES:</div>
                        <div className="text-white font-mono">York, UK</div>
                      </div>
                      <i className="fas fa-external-link-alt text-green-400 ml-auto opacity-50 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                  </motion.a>
                </div>

                {/* Communication Channels */}
                <div className="bg-black/70 backdrop-blur-lg border border-green-500/30 rounded-lg p-6 shadow-lg shadow-green-500/20">
                  <h3 className="text-green-400 font-mono text-lg mb-4 flex items-center gap-2">
                    <i className="fas fa-satellite-dish text-green-500"></i>
                    &#91; COMMUNICATION_CHANNELS &#93;
                  </h3>
                  <div className="space-y-4">
                    <motion.a
                      href="tel:+447903352059"
                      className="block p-4 glass-effect rounded border border-green-500/20 hover:border-green-400/50 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      style={{ textDecoration: 'none' }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500/20 rounded border border-blue-500/30 flex items-center justify-center">
                          <i className="fas fa-phone text-blue-400"></i>
                        </div>
                        <div>
                          <div className="text-blue-300 font-mono text-sm">VOICE_CHANNEL:</div>
                          <div className="text-white font-mono">+44 7903352059</div>
                        </div>
                      </div>
                    </motion.a>

                    <motion.a
                      href="mailto:dev@thomasjbutler.me"
                      className="block p-4 glass-effect rounded border border-green-500/20 hover:border-green-400/50 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      style={{ textDecoration: 'none' }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-500/20 rounded border border-purple-500/30 flex items-center justify-center">
                          <i className="fas fa-envelope text-purple-400"></i>
                        </div>
                        <div>
                          <div className="text-purple-300 font-mono text-sm">DATA_CHANNEL:</div>
                          <div className="text-white font-mono">dev@thomasjbutler.me</div>
                        </div>
                      </div>
                    </motion.a>
                  </div>
                </div>

                {/* System Status */}
                <div className="bg-black/70 backdrop-blur-lg border border-green-500/30 rounded-lg p-6 shadow-lg shadow-green-500/20">
                  <h3 className="text-green-400 font-mono text-lg mb-4 flex items-center gap-2">
                    <i className="fas fa-server text-green-500"></i>
                    &#91; SYSTEM_STATUS &#93;
                  </h3>
                  <div className="space-y-3">
                    {[
                      { label: 'RESUME_ACCESS', status: 'AVAILABLE_ON_REQUEST' },
                      { label: 'FULLTIME_MODE', status: 'READY_FOR_DEPLOYMENT' },
                      { label: 'FREELANCE_MODE', status: 'ACCEPTING_CONTRACTS' }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.2 }}
                        className="flex items-center gap-3 p-3 glass-effect rounded border border-green-500/20"
                      >
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <div className="flex-1">
                          <span className="text-gray-300 font-mono text-sm">{item.label}:</span>
                          <span className="text-green-400 font-mono text-sm ml-2">{item.status}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Support Module */}
                <div className="bg-black/70 backdrop-blur-lg border border-orange-500/30 rounded-lg p-6 shadow-lg shadow-orange-500/20">
                  <h3 className="text-orange-400 font-mono text-lg mb-4 flex items-center gap-2">
                    <i className="fas fa-coffee text-orange-500"></i>
                    &#91; SUPPORT_MODULE &#93;
                  </h3>
                  <div className="mb-4 p-3 bg-orange-500/5 border border-orange-500/20 rounded text-gray-300 font-mono text-sm">
                    &#62; If system performance meets expectations, consider energy donation
                  </div>
                  <motion.a
                    href="https://buymeacoffee.com/ojrwoqkgmv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-orange-500/10 border border-orange-500/30 rounded hover:bg-orange-500/20 hover:border-orange-400/50 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ textDecoration: 'none' }}
                  >
                    <div className="flex items-center justify-center gap-3 text-orange-400 font-mono">
                      <i className="fas fa-coffee text-xl"></i>
                      <span>ENERGY_DONATION.exe</span>
                      <div className="flex gap-1">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{
                              y: [0, -5, 0],
                              opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: i * 0.2
                            }}
                            className="w-1 h-2 bg-orange-400/60 rounded"
                          />
                        ))}
                      </div>
                    </div>
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Transmission Form */}
          <AnimatePresence>
            {visibleSections.includes('transmission-form') && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-black/70 backdrop-blur-lg border border-green-500/30 rounded-lg p-6 shadow-lg shadow-green-500/20"
              >
                <h2 className="text-green-400 font-mono text-2xl mb-6 flex items-center gap-3">
                  <i className="fas fa-satellite text-green-500"></i>
                  &#91; TRANSMISSION_INTERFACE &#93;
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Form Fields */}
                  {[
                    { id: 'name', label: 'SENDER_ID', type: 'text', required: true },
                    { id: 'email', label: 'RESPONSE_CHANNEL', type: 'email', required: true },
                    { id: 'phone', label: 'BACKUP_CHANNEL', type: 'tel', required: false },
                    { id: 'subject', label: 'MESSAGE_PROTOCOL', type: 'text', required: true }
                  ].map((field) => (
                    <div key={field.id} className="relative">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-green-400 font-mono text-sm">
                          &#91; {field.label} &#93;
                          {field.required && <span className="text-red-400">*</span>}
                        </span>
                        {focusedField === field.id && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                          />
                        )}
                      </div>
                      <input
                        type={field.type}
                        id={field.id}
                        value={formData[field.id as keyof typeof formData]}
                        onChange={(e) => setFormData({...formData, [field.id]: e.target.value})}
                        onFocus={() => setFocusedField(field.id)}
                        onBlur={() => setFocusedField(null)}
                        required={field.required}
                        className="w-full bg-black/50 border border-green-500/30 rounded px-4 py-3 text-white font-mono text-sm
                                  focus:border-green-400/70 focus:ring-2 focus:ring-green-400/20 focus:outline-none
                                  transition-all duration-300 placeholder-gray-500"
                        style={{
                          boxShadow: focusedField === field.id
                            ? '0 0 15px rgba(0, 255, 0, 0.3)'
                            : 'none'
                        }}
                      />
                    </div>
                  ))}

                  {/* Message Field */}
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-green-400 font-mono text-sm">
                        &#91; MESSAGE_PAYLOAD &#93;<span className="text-red-400">*</span>
                      </span>
                      {focusedField === 'message' && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                        />
                      )}
                    </div>
                    <textarea
                      id="message"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full bg-black/50 border border-green-500/30 rounded px-4 py-3 text-white font-mono text-sm
                                focus:border-green-400/70 focus:ring-2 focus:ring-green-400/20 focus:outline-none
                                transition-all duration-300 placeholder-gray-500 resize-none"
                      style={{
                        boxShadow: focusedField === 'message'
                          ? '0 0 15px rgba(0, 255, 0, 0.3)'
                          : 'none'
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-500/10 border border-green-500/30 rounded px-6 py-4 text-green-400 font-mono text-lg
                              hover:bg-green-500/20 hover:border-green-400/50 disabled:opacity-50 disabled:cursor-not-allowed
                              transition-all duration-300 flex items-center justify-center gap-3"
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    style={{
                      boxShadow: !isSubmitting ? '0 0 20px rgba(0, 255, 0, 0.2)' : 'none'
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <i className="fas fa-satellite-dish"></i>
                        </motion.div>
                        TRANSMITTING...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i>
                        INITIATE_TRANSMISSION.exe
                      </>
                    )}
                  </motion.button>

                  {/* Status Messages */}
                  <AnimatePresence>
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="p-4 bg-green-500/10 border border-green-500/30 rounded text-green-400 font-mono text-center"
                      >
                        <i className="fas fa-check-circle mr-2"></i>
                        TRANSMISSION SUCCESSFUL - MESSAGE DELIVERED
                      </motion.div>
                    )}

                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="p-4 bg-red-500/10 border border-red-500/30 rounded text-red-400 font-mono text-center"
                      >
                        <i className="fas fa-exclamation-triangle mr-2"></i>
                        TRANSMISSION FAILED - RETRY REQUIRED
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* System Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0 }}
          className="text-center mt-12 pt-8 border-t border-green-500/30"
        >
          <div className="font-mono text-green-400 text-sm">
            &#91; CONNECTION_INTERFACE_END &#93; • SECURE CHANNEL: ACTIVE • AWAITING TRANSMISSION
          </div>
        </motion.div>
      </div>
    </MatrixLayout>
  );
};