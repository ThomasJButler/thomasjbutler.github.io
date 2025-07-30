// Simple contact form handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success');
    
    if (!form) {
        console.warn('Contact form not found on page');
        return;
    }
    
    console.log('Contact form initialized successfully');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('Form submission started');
        
        // Get form data
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        
        // Basic validation
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        if (!name || name.trim().length < 2) {
            alert('Please enter your name');
            return;
        }
        
        if (!email || !email.includes('@')) {
            alert('Please enter a valid email');
            return;
        }
        
        if (!message || message.trim().length < 10) {
            alert('Please enter a message (at least 10 characters)');
            return;
        }
        
        // Disable button
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }
        
        try {
            console.log('Sending form to:', form.action);
            
            // Add timeout to prevent hanging
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
            
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                },
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            console.log('Response received:', response.status, response.statusText);
            
            // Check if response is ok first
            if (response.ok) {
                // Try to parse as JSON if possible
                const contentType = response.headers.get('content-type');
                let responseData;
                
                if (contentType && contentType.includes('application/json')) {
                    try {
                        responseData = await response.json();
                        console.log('Formspree response data:', responseData);
                        
                        // Check if Formspree actually accepted it
                        if (responseData.ok === false) {
                            console.error('Formspree rejected submission:', responseData);
                            throw new Error('Formspree rejected the submission');
                        }
                    } catch (jsonError) {
                        console.error('Failed to parse JSON response:', jsonError);
                        // Continue anyway - Formspree might return success without JSON
                    }
                } else {
                    console.warn('Non-JSON response from Formspree. Content-Type:', contentType);
                    // Try to read as text
                    const textResponse = await response.text();
                    console.log('Text response:', textResponse);
                }
                
                console.log('Form submission successful! Check your email.');
                
                // Hide form and show success
                form.style.display = 'none';
                if (successMessage) {
                    successMessage.style.display = 'block';
                } else {
                    alert('Thank you! Your message has been sent.\n\nNote: If you don\'t receive an email, check:\n1. Your spam folder\n2. Formspree dashboard\n3. That the form is activated');
                }
                
                // Reset form for next use
                form.reset();
            } else {
                // Try to get error details
                let errorMessage = 'Failed to send message';
                const contentType = response.headers.get('content-type');
                
                if (contentType && contentType.includes('application/json')) {
                    try {
                        const errorData = await response.json();
                        if (errorData.error) {
                            errorMessage = errorData.error;
                        } else if (errorData.errors) {
                            errorMessage = errorData.errors.join(', ');
                        }
                    } catch (jsonError) {
                        console.error('Failed to parse error response:', jsonError);
                    }
                }
                
                console.error('Form submission failed:', response.status, errorMessage);
                throw new Error(errorMessage);
            }
            
        } catch (error) {
            console.error('Contact form error:', error);
            
            let userMessage = 'Sorry, there was an error sending your message. ';
            
            if (error.name === 'AbortError') {
                userMessage += 'The request timed out. Please check your internet connection and try again.';
            } else if (error.message.includes('Failed to fetch')) {
                userMessage += 'Unable to connect to the server. Please check your internet connection.';
            } else if (error.message) {
                userMessage += error.message;
            }
            
            userMessage += '\n\nYou can also email directly to dev@thomasjbutler.me';
            
            alert(userMessage);
        } finally {
            // Re-enable button
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-envelope"></i> Send Message';
            }
        }
    });
});