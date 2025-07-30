// Simple contact form handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success');
    
    if (!form) {
        return;
    }
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
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
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Hide form and show success
                form.style.display = 'none';
                if (successMessage) {
                    successMessage.style.display = 'block';
                } else {
                    alert('Thank you! Your message has been sent.');
                }
                
                // Reset form for next use
                form.reset();
            } else {
                throw new Error('Failed to send');
            }
            
        } catch (error) {
            alert('Sorry, there was an error sending your message. Please try again.');
        } finally {
            // Re-enable button
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-envelope"></i> Send Message';
            }
        }
    });
});