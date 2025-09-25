import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/xeoeenqv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Video Banner Section - EXACT match from HTML */}
      <div className="video-banner">
        <video 
          className="banner-video" 
          autoPlay 
          muted 
          loop 
          playsInline
          preload="metadata"
        >
          <source src="https://res.cloudinary.com/depqttzlt/video/upload/v1752558251/large_green_banner_dv0bkk.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <section id="contact-main">
        <div className="container contact-container">
          <div className="contact-grid">
            {/* Left side - Contact Information */}
            <div className="contact-info">
              <h2>Get in Touch</h2>
              
              <div className="info-section">
                <h3><i className="fas fa-map-marker-alt"></i> Location</h3>
                <a 
                  href="https://www.google.com/maps/place/York/@53.9585894,-1.1218767,13z" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="info-card block-link"
                  style={{ textDecoration: 'none' }}
                >
                  <i className="fas fa-external-link-alt small-icon" style={{ marginLeft: '0.5rem' }}></i>
                  <span className="info-content">York, UK</span>
                </a>
              </div>

              <div className="info-section">
                <h3><i className="fas fa-address-card"></i> Contact Details</h3>
                <div className="contact-cards">
                  <a href="tel:+447903352059" className="info-card">
                    <i className="fas fa-phone"></i>
                    <span className="info-content">+44 7903352059</span>
                  </a>
                  <a href="mailto:dev@thomasjbutler.me" className="info-card">
                    <i className="fas fa-envelope"></i>
                    <span className="info-content">dev@thomasjbutler.me</span>
                  </a>
                </div>
              </div>

              <div className="info-section">
                <h3><i className="fas fa-calendar-check"></i> Availability</h3>
                <ul className="availability-list">
                  <li><i className="fas fa-check-circle"></i> Resume is available upon request</li>
                  <li><i className="fas fa-check-circle"></i> Available for full time work</li>
                  <li><i className="fas fa-check-circle"></i> Available for freelance work</li>
                </ul>
              </div>

              <div className="info-section coffee-section">
                <h3><i className="fas fa-heart"></i> Support My Work</h3>
                <p className="support-text">If you find my work valuable, consider supporting me!</p>
                <a 
                  href="https://buymeacoffee.com/ojrwoqkgmv" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="coffee-button-premium"
                >
                  <i className="fas fa-coffee"></i>
                  <span>Buy Me a Coffee</span>
                  <span className="coffee-steam">
                    <span className="steam-particle"></span>
                    <span className="steam-particle"></span>
                    <span className="steam-particle"></span>
                  </span>
                </a>
              </div>
            </div>

            {/* Right side - Contact Form */}
            <div className="contact-form-section">
              <h2>Send a Message</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="form-input"
                    placeholder=" "
                  />
                  <label htmlFor="name">Name *</label>
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="form-input"
                    placeholder=" "
                  />
                  <label htmlFor="email">Email *</label>
                </div>

                <div className="form-group">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="form-input"
                    placeholder=" "
                  />
                  <label htmlFor="phone">Phone</label>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    required
                    className="form-input"
                    placeholder=" "
                  />
                  <label htmlFor="subject">Subject *</label>
                </div>

                <div className="form-group">
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                    className="form-input"
                    placeholder=" "
                  ></textarea>
                  <label htmlFor="message">Message *</label>
                </div>

                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Sending...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i> Send Message
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="form-success">
                    <i className="fas fa-check-circle"></i> Message sent successfully!
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="form-error">
                    <i className="fas fa-exclamation-circle"></i> Error sending message. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};