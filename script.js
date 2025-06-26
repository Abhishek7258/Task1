      // Mobile Navigation Toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

        // Smooth Scrolling for Navigation Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Fade In Animation on Scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Skill Bar Animation
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBars = entry.target.querySelectorAll('.skill-progress');
                    skillBars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        setTimeout(() => {
                            bar.style.width = width + '%';
                        }, 500);
                    });
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.skill-category').forEach(category => {
            skillObserver.observe(category);
        });

        // Form Validation and Submission
        const contactForm = document.getElementById('contactForm');
        const inputs = {
            name: document.getElementById('name'),
            email: document.getElementById('email'),
            subject: document.getElementById('subject'),
            message: document.getElementById('message')
        };

        const errors = {
            name: document.getElementById('nameError'),
            email: document.getElementById('emailError'),
            subject: document.getElementById('subjectError'),
            message: document.getElementById('messageError')
        };

        const successMessage = document.getElementById('successMessage');

        // Real-time validation
        Object.keys(inputs).forEach(key => {
            inputs[key].addEventListener('input', () => {
                validateField(key);
            });

            inputs[key].addEventListener('blur', () => {
                validateField(key);
            });
        });

        function validateField(fieldName) {
            const field = inputs[fieldName];
            const error = errors[fieldName];
            let isValid = true;

            // Reset error state
            field.style.borderColor = '#e9ecef';
            error.style.display = 'none';

            // Validation rules
            if (!field.value.trim()) {
                showError(field, error, `Please enter your ${fieldName}`);
                isValid = false;
            } else if (fieldName === 'email' && !isValidEmail(field.value)) {
                showError(field, error, 'Please enter a valid email address');
                isValid = false;
            } else if (fieldName === 'name' && field.value.trim().length < 2) {
                showError(field, error, 'Name must be at least 2 characters long');
                isValid = false;
            } else if (fieldName === 'message' && field.value.trim().length < 10) {
                showError(field, error, 'Message must be at least 10 characters long');
                isValid = false;
            }

            return isValid;
        }

        function showError(field, errorElement, message) {
            field.style.borderColor = '#dc3545';
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // Form submission
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isFormValid = true;
            
            // Validate all fields
            Object.keys(inputs).forEach(key => {
                if (!validateField(key)) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('.submit-btn');
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';

                // Simulate API call delay
                setTimeout(() => {
                    // Reset form
                    contactForm.reset();
                    
                    // Show success message
                    successMessage.style.display = 'block';
                    
                    // Reset button
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 5000);
                    
                    // Store form data in localStorage (for demonstration)
                    const formData = {
                        name: inputs.name.value,
                        email: inputs.email.value,
                        subject: inputs.subject.value,
                        message: inputs.message.value,
                        timestamp: new Date().toISOString()
                    };
                    
                    // Get existing messages or create new array
                    const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
                    existingMessages.push(formData);
                    localStorage.setItem('contactMessages', JSON.stringify(existingMessages));
                    
                    console.log('Form submitted successfully:', formData);
                }, 2000);
            }
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        });

        // Initialize page
        document.addEventListener('DOMContentLoaded', () => {
            // Add loading animation
            document.body.style.opacity = '0';
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.5s ease';
                document.body.style.opacity = '1';
            }, 100);

            // Log welcome message
            console.log('🚀 Welcome to Alex Johnson\'s Portfolio!');
            console.log('💻 This portfolio demonstrates HTML, CSS, and JavaScript skills.');
            console.log('📧 Check the localStorage to see submitted contact forms!');
        });
    