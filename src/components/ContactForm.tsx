import React, { useState, useRef, useEffect } from 'react';
import { animate } from 'animejs';
import styles from './ContactForm.module.css';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);
  const inputRefs = useRef<(HTMLInputElement | HTMLTextAreaElement | null)[]>([]);

  useEffect(() => {
    // Simple fade in on mount
    if (formRef.current) {
      animate(formRef.current, {
        opacity: [0, 1],
        duration: 400,
        ease: 'outQuad'
      });
    }
  }, []);

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Simple border color change on focus
    animate(e.target, {
      borderColor: '#00FF00',
      boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)',
      duration: 200,
      ease: 'outQuad'
    });
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Revert border color on blur
    animate(e.target, {
      borderColor: 'rgba(0, 255, 0, 0.3)',
      boxShadow: '0 0 0 rgba(0, 255, 0, 0)',
      duration: 200,
      ease: 'outQuad'
    });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Simple success state, no animation
      
      // Reset success state after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
      
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className={styles.contactFormWrapper}>
      <h2 className={styles.formTitle}>Contact Me</h2>
      <p className={styles.formSubtitle}>
        My resume is available upon request. Please mention in your message if you'd like to receive a copy.
      </p>
      
      <form ref={formRef} onSubmit={handleSubmit} className={styles.contactForm} noValidate>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>NAME:</label>
          <input
            ref={el => {inputRefs.current[0] = el;}}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            className={styles.input}
            disabled={isSubmitting}
            required
            aria-required="true"
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <span id="name-error" className={`${styles.error} error-message`} role="alert">
              {errors.name}
            </span>
          )}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>EMAIL:</label>
          <input
            ref={el => {inputRefs.current[1] = el;}}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            className={styles.input}
            disabled={isSubmitting}
            required
            aria-required="true"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <span id="email-error" className={`${styles.error} error-message`} role="alert">
              {errors.email}
            </span>
          )}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.label}>MESSAGE:</label>
          <textarea
            ref={el => {inputRefs.current[2] = el;}}
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            className={styles.textarea}
            rows={6}
            disabled={isSubmitting}
            required
            aria-required="true"
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <span id="message-error" className={`${styles.error} error-message`} role="alert">
              {errors.message}
            </span>
          )}
        </div>
        
        <button
          type="submit"
          className={`${styles.submitButton} submit-button`}
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          aria-live="polite"
        >
          {isSubmitting ? (
            <>
              <span className={styles.loadingDots}>
                <span>.</span><span>.</span><span>.</span>
              </span>
            </>
          ) : (
            'SEND MESSAGE'
          )}
        </button>
        
        {submitSuccess && (
          <div className={styles.successMessage} role="status" aria-live="polite">
            <i className="fas fa-check-circle" aria-hidden="true"></i>
            Message sent successfully! I'll get back to you soon.
          </div>
        )}
      </form>
    </div>
  );
};