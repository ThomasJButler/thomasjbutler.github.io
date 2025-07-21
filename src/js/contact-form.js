/**
 * Contact Form Handler
 * Manages form submission, validation, and animations
 */

// Anime.js is loaded globally via script tag

export class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.successMessage = document.getElementById('form-success');
        this.submitButton = this.form?.querySelector('button[type="submit"]');
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
        
        if (!this.validateForm()) {
            this.showValidationErrors();
            return;
        }

        // Disable submit button and show loading state
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

            if (response.ok) {
                this.showSuccess();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            this.showError('Oops! There was a problem submitting your form. Please try again.');
            console.error('Form submission error:', error);
        } finally {
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
        // Animate form out
        anime({
            targets: this.form,
            opacity: [1, 0],
            translateY: [0, -20],
            duration: 300,
            easing: 'easeOutQuad',
            complete: () => {
                this.form.style.display = 'none';
                this.successMessage.style.display = 'block';
                
                // Animate success message in
                anime({
                    targets: this.successMessage,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    scale: [0.9, 1],
                    duration: 600,
                    easing: 'easeOutQuad'
                });

                // Add glow effect
                anime({
                    targets: this.successMessage,
                    boxShadow: ['0 0 0 rgba(0, 255, 0, 0)', '0 0 30px rgba(0, 255, 0, 0.5)', '0 0 0 rgba(0, 255, 0, 0)'],
                    duration: 1500,
                    easing: 'easeInOutQuad'
                });
            }
        });
    }

    /**
     * Show error message
     */
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error-message';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
        
        this.form.insertBefore(errorDiv, this.submitButton);
        
        // Animate error message
        anime({
            targets: errorDiv,
            opacity: [0, 1],
            translateY: [10, 0],
            duration: 300,
            easing: 'easeOutQuad'
        });

        // Remove after 5 seconds
        setTimeout(() => {
            anime({
                targets: errorDiv,
                opacity: [1, 0],
                translateY: [0, -10],
                duration: 300,
                easing: 'easeOutQuad',
                complete: () => errorDiv.remove()
            });
        }, 5000);
    }

    /**
     * Add field focus animations
     */
    addFieldAnimations() {
        const fields = this.form.querySelectorAll('input, textarea');
        
        fields.forEach(field => {
            const label = field.closest('label');
            
            field.addEventListener('focus', () => {
                if (label) {
                    anime({
                        targets: label,
                        color: '#00FF00',
                        duration: 200
                    });
                }
                
                anime({
                    targets: field,
                    borderColor: '#00FF00',
                    boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)',
                    duration: 200
                });
            });

            field.addEventListener('blur', () => {
                if (label) {
                    anime({
                        targets: label,
                        color: '#00FF00',
                        duration: 200
                    });
                }
                
                if (!field.value) {
                    anime({
                        targets: field,
                        borderColor: 'rgba(0, 255, 0, 0.3)',
                        boxShadow: '0 0 0 transparent',
                        duration: 200
                    });
                }
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
                if (nameField.value.length < 2 && nameField.value) {
                    this.showFieldError(nameField, 'Name must be at least 2 characters');
                } else {
                    this.clearFieldError(nameField);
                }
            });
        }

        // Message validation
        if (messageField) {
            messageField.addEventListener('blur', () => {
                if (messageField.value.length < 10 && messageField.value) {
                    this.showFieldError(messageField, 'Message must be at least 10 characters');
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

        if (!nameField.value || nameField.value.length < 2) {
            this.showFieldError(nameField, 'Name is required (minimum 2 characters)');
            isValid = false;
        }

        if (!emailField.value || !this.isValidEmail(emailField.value)) {
            this.showFieldError(emailField, 'Valid email is required');
            isValid = false;
        }

        if (!messageField.value || messageField.value.length < 10) {
            this.showFieldError(messageField, 'Message is required (minimum 10 characters)');
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
        field.parentElement.appendChild(errorSpan);

        field.classList.add('error');
        
        anime({
            targets: errorSpan,
            opacity: [0, 1],
            translateY: [5, 0],
            duration: 200
        });
    }

    /**
     * Clear field error
     */
    clearFieldError(field) {
        const error = field.parentElement.querySelector('.field-error');
        if (error) {
            anime({
                targets: error,
                opacity: [1, 0],
                duration: 200,
                complete: () => error.remove()
            });
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
            anime({
                targets: this.form,
                translateX: [0, -10, 10, -10, 10, 0],
                duration: 500,
                easing: 'easeInOutQuad'
            });
        }
    }

    /**
     * Email validation helper
     */
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});