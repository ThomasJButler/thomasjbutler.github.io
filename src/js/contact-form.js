/**
 * Contact Form Handler
 * Manages form submission, validation, and animations
 */

export class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.successMessage = document.getElementById('form-success');
        this.submitButton = this.form?.querySelector('button[type="submit"]');
        this.isSubmitting = false;
        this.init();
    }

    init() {
        if (!this.form) return;
        
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.addFieldAnimations();
        this.addValidation();
    }

    /**
     * Handle form submission
     */
    async handleSubmit(e) {
        e.preventDefault();
        
        // Prevent double submission
        if (this.isSubmitting) {
            return;
        }
        
        if (!this.validateForm()) {
            this.showValidationErrors();
            return;
        }

        // Set submitting flag and disable button
        this.isSubmitting = true;
        this.setLoadingState(true);

        try {
            const formData = new FormData(this.form);
            
            const response = await fetch(this.form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            // Check if response is JSON (Formspree returns JSON)
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Invalid response from server');
            }

            const responseData = await response.json();

            if (response.ok && responseData.ok) {
                this.showSuccess();
            } else {
                const errorMessage = responseData.error || responseData.errors?.join(', ') || 'Form submission failed';
                
                throw new Error(errorMessage);
            }
        } catch (error) {
            this.showError('Oops! There was a problem submitting your form. Please try again.');
            
        } finally {
            this.isSubmitting = false;
            this.setLoadingState(false);
        }
    }

    /**
     * Set loading state for submit button
     */
    setLoadingState(isLoading) {
        if (!this.submitButton) return;

        if (isLoading) {
            this.submitButton.disabled = true;
            this.submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            this.submitButton.classList.add('loading');
        } else {
            this.submitButton.disabled = false;
            this.submitButton.innerHTML = '<i class="fas fa-envelope"></i> Send Message';
            this.submitButton.classList.remove('loading');
        }
    }

    /**
     * Show success message with animation
     */
    showSuccess() {
        // Clear any existing errors first
        const errorElements = this.form.querySelectorAll('.field-error, .form-error-message');
        errorElements.forEach(el => el.remove());
        
        // Clear error classes
        const fields = this.form.querySelectorAll('.error');
        fields.forEach(field => field.classList.remove('error'));
        
        // Reset form
        this.form.reset();
        
        // Add fade out class to form
        this.form.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        this.form.style.opacity = '0';
        this.form.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            this.form.style.display = 'none';
            this.successMessage.style.display = 'block';
            this.successMessage.style.opacity = '0';
            this.successMessage.style.transform = 'translateY(20px)';
            this.successMessage.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            // Trigger reflow
            this.successMessage.offsetHeight;
            
            // Animate in
            this.successMessage.style.opacity = '1';
            this.successMessage.style.transform = 'translateY(0)';
            
            // Add glow effect
            this.successMessage.classList.add('form-glow');
        }, 300);
    }

    /**
     * Show error message
     */
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error-message';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
        
        errorDiv.style.opacity = '0';
        errorDiv.style.transform = 'translateY(10px)';
        errorDiv.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        this.form.insertBefore(errorDiv, this.submitButton);
        
        // Trigger reflow
        errorDiv.offsetHeight;
        
        // Animate in
        errorDiv.style.opacity = '1';
        errorDiv.style.transform = 'translateY(0)';

        // Remove after 5 seconds
        setTimeout(() => {
            errorDiv.style.opacity = '0';
            errorDiv.style.transform = 'translateY(-10px)';
            setTimeout(() => errorDiv.remove(), 300);
        }, 5000);
    }

    /**
     * Add field focus animations
     */
    addFieldAnimations() {
        const fields = this.form.querySelectorAll('input, textarea');
        
        // Add initial appearance
        fields.forEach((field, index) => {
            field.style.opacity = '0';
            field.style.transform = 'translateY(20px)';
            field.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                field.style.opacity = '1';
                field.style.transform = 'translateY(0)';
            }, 200 + (index * 80));
        });
        
        fields.forEach(field => {
            const label = field.closest('label');
            
            // Focus effects
            field.addEventListener('focus', () => {
                field.classList.add('field-focused');
                if (label) {
                    label.classList.add('label-focused');
                }
            });

            field.addEventListener('blur', () => {
                field.classList.remove('field-focused');
                if (label) {
                    label.classList.remove('label-focused');
                }
                if (!field.value) {
                    field.classList.remove('field-has-value');
                } else {
                    field.classList.add('field-has-value');
                }
            });
            
            // Add typing effect
            field.addEventListener('input', () => {
                field.classList.add('field-typing');
                setTimeout(() => {
                    field.classList.remove('field-typing');
                }, 200);
            });
        });
    }

    /**
     * Add real-time validation
     */
    addValidation() {
        const emailField = this.form.querySelector('input[type="email"]');
        const nameField = this.form.querySelector('input[name="name"]');
        const messageField = this.form.querySelector('textarea[name="message"]');

        // Email validation
        if (emailField) {
            emailField.addEventListener('blur', () => {
                // Skip validation if form is hidden (already submitted)
                if (this.form.style.display === 'none') return;
                
                if (!this.isValidEmail(emailField.value) && emailField.value) {
                    this.showFieldError(emailField, 'Please enter a valid email address');
                } else {
                    this.clearFieldError(emailField);
                }
            });
        }

        // Name validation
        if (nameField) {
            nameField.addEventListener('blur', () => {
                // Skip validation if form is hidden (already submitted)
                if (this.form.style.display === 'none') return;
                
                if (nameField.value && nameField.value.trim().length < 2) {
                    this.showFieldError(nameField, 'Please enter your name');
                } else {
                    this.clearFieldError(nameField);
                }
            });
        }

        // Message validation
        if (messageField) {
            messageField.addEventListener('blur', () => {
                // Skip validation if form is hidden (already submitted)
                if (this.form.style.display === 'none') return;
                
                if (messageField.value && messageField.value.trim().length < 10) {
                    this.showFieldError(messageField, 'Please enter a message (at least 10 characters)');
                } else {
                    this.clearFieldError(messageField);
                }
            });
        }
    }

    /**
     * Validate entire form
     */
    validateForm() {
        const emailField = this.form.querySelector('input[type="email"]');
        const nameField = this.form.querySelector('input[name="name"]');
        const messageField = this.form.querySelector('textarea[name="message"]');

        let isValid = true;

        if (!nameField.value || nameField.value.trim().length < 2) {
            this.showFieldError(nameField, 'Please enter your name');
            isValid = false;
        }

        if (!emailField.value || !this.isValidEmail(emailField.value)) {
            this.showFieldError(emailField, 'Valid email is required');
            isValid = false;
        }

        if (!messageField.value || messageField.value.trim().length < 10) {
            this.showFieldError(messageField, 'Please enter a message (at least 10 characters)');
            isValid = false;
        }

        return isValid;
    }

    /**
     * Show field-specific error
     */
    showFieldError(field, message) {
        const existingError = field.parentElement.querySelector('.field-error');
        if (existingError) existingError.remove();

        const errorSpan = document.createElement('span');
        errorSpan.className = 'field-error';
        errorSpan.textContent = message;
        errorSpan.style.opacity = '0';
        errorSpan.style.transform = 'translateY(5px)';
        errorSpan.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        
        field.parentElement.appendChild(errorSpan);
        field.classList.add('error');
        
        // Trigger reflow
        errorSpan.offsetHeight;
        
        // Animate in
        errorSpan.style.opacity = '1';
        errorSpan.style.transform = 'translateY(0)';
    }

    /**
     * Clear field error
     */
    clearFieldError(field) {
        const error = field.parentElement.querySelector('.field-error');
        if (error) {
            error.style.opacity = '0';
            setTimeout(() => error.remove(), 200);
        }
        field.classList.remove('error');
    }

    /**
     * Show validation errors with animation
     */
    showValidationErrors() {
        const firstError = this.form.querySelector('.error');
        if (firstError) {
            firstError.focus();
            
            // Shake animation
            this.form.classList.add('form-shake');
            setTimeout(() => {
                this.form.classList.remove('form-shake');
            }, 500);
        }
    }

    /**
     * Email validation helper
     */
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}

// Export video banner initialization function
export function initVideoBanner() {
    const videoBanner = document.querySelector('.video-banner');
    const bannerVideo = document.querySelector('.banner-video');
    
    if (videoBanner && bannerVideo) {
        // Add loaded class when video is ready
        bannerVideo.addEventListener('loadeddata', () => {
            videoBanner.classList.add('video-loaded');
            bannerVideo.classList.add('loaded');
        });
        
        // Fallback for cached videos
        if (bannerVideo.readyState >= 2) {
            videoBanner.classList.add('video-loaded');
            bannerVideo.classList.add('loaded');
        }
    }
}