// Complete Enhanced JavaScript for Mental Health Chatbot Website
// main.js - Pure Botpress Integration (No Demo Chat)

document.addEventListener('DOMContentLoaded', function() {
    console.log('🧠 MindBot Website Initialized with Botpress');
    
    // Initialize all functionality
    initMobileNavigation();
    initSmoothScrolling();
    initBotpressIntegration();
    initStatsCounter();
    initScrollAnimations();
    initNavbarScrollEffect();
    initFormEnhancements();
    initParticleAnimation();
    initThemeToggle();
    initAccessibilityFeatures();
    initServiceWorker();
    
    // Add loading animation
    showLoadingComplete();
});

// ===============================
// Mobile Navigation System
// ===============================
function initMobileNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar') || document.querySelector('.navbar');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && 
                !navbar?.contains(e.target) && 
                hamburger.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Close menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
    }
    
    // Navigation link active state
    updateActiveNavLink();
    window.addEventListener('scroll', debounce(updateActiveNavLink, 100));
}

function toggleMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar') || document.querySelector('.navbar');
    
    hamburger?.classList.toggle('active');
    navbar?.classList.toggle('active');
    
    // Update aria attributes for accessibility
    const isActive = hamburger?.classList.contains('active');
    hamburger?.setAttribute('aria-expanded', isActive);
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isActive ? 'hidden' : '';
}

function closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar') || document.querySelector('.navbar');
    
    hamburger?.classList.remove('active');
    navbar?.classList.remove('active');
    hamburger?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPosition = window.pageYOffset + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===============================
// Smooth Scrolling System
// ===============================
function initSmoothScrolling() {
    // Handle all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });
    
    // Handle back to top functionality
    createBackToTopButton();
}

function handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
        const offsetTop = targetElement.offsetTop - 100; // Account for navbar
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        closeMobileMenu();
        
        // Update URL without jumping
        history.pushState(null, null, `#${targetId}`);
    }
}

function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: var(--shadow-medium);
    `;
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Show/hide on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    document.body.appendChild(backToTop);
}

// ===============================
// Botpress Integration System
// ===============================
function initBotpressIntegration() {
    console.log('🤖 Initializing Botpress integration...');
    
    // Wait for Botpress to load
    waitForBotpress();
    
    // Replace demo chat section with Botpress info
    replaceDemoChatWithBotpress();
    
    // Add Botpress event listeners
    addBotpressEventListeners();
    
    // Style chat buttons
    styleChatButtons();
}

function waitForBotpress() {
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds max wait
    
    const checkBotpress = () => {
        attempts++;
        
        if (window.botpressWebChat) {
            console.log('✅ Botpress WebChat loaded successfully');
            setupBotpressCustomization();
            updateBotpressStatus('ready');
            return;
        }
        
        if (attempts < maxAttempts) {
            setTimeout(checkBotpress, 100);
        } else {
            console.warn('⚠️ Botpress loading timeout');
            updateBotpressStatus('timeout');
        }
    };
    
    checkBotpress();
}

function setupBotpressCustomization() {
    try {
        // Customize Botpress appearance
        if (window.botpressWebChat.configure) {
            window.botpressWebChat.configure({
                composerPlaceholder: "Hi! I'm here to support your mental health journey. How are you feeling today? 💙",
                botName: "MindBot Assistant",
                botAvatarUrl: "", // Add your bot avatar URL if needed
                enableReset: true,
                enableTranscriptDownload: false,
                className: "mindbot-chat",
                containerWidth: "100%",
                layoutWidth: "100%",
                hideWidget: false,
                showCloseButton: true,
                showConversationButton: false,
                enableConversationDeletion: true,
                enableArrowNavigation: true,
                closeOnEscape: true,
                showPoweredBy: false
            });
        }
        
        // Apply custom styling to Botpress
        addBotpressCustomCSS();
        
        console.log('🎨 Botpress customization applied');
        
    } catch (error) {
        console.error('Error customizing Botpress:', error);
    }
}

function addBotpressCustomCSS() {
    const style = document.createElement('style');
    style.id = 'botpress-custom-styles';
    style.textContent = `
        /* Botpress Custom Styling */
        .bpw-layout {
            border-radius: 16px !important;
            box-shadow: 0 20px 60px rgba(0,0,0,0.2) !important;
            border: 1px solid var(--border-color) !important;
        }
        
        .bpw-header {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)) !important;
            color: white !important;
            border-radius: 16px 16px 0 0 !important;
        }
        
        .bpw-composer {
            border-radius: 0 0 16px 16px !important;
            border-top: 1px solid var(--border-color) !important;
        }
        
        .bpw-composer-inner {
            background: white !important;
            border-radius: 0 0 16px 16px !important;
        }
        
        .bpw-composer-inner textarea {
            border-radius: 12px !important;
            border: 2px solid var(--border-color) !important;
            font-family: var(--font-family) !important;
        }
        
        .bpw-composer-inner textarea:focus {
            border-color: var(--primary-color) !important;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
        }
        
        .bpw-send-button {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)) !important;
            border-radius: 50% !important;
            width: 36px !important;
            height: 36px !important;
        }
        
        .bpw-send-button:hover {
            transform: scale(1.1) !important;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3) !important;
        }
        
        .bpw-from-bot .bpw-message-bubble {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)) !important;
            color: white !important;
            border-radius: 18px 18px 18px 4px !important;
        }
        
        .bpw-from-user .bpw-message-bubble {
            background: var(--bg-secondary) !important;
            color: var(--text-primary) !important;
            border-radius: 18px 18px 4px 18px !important;
        }
        
        .bpw-typing-bubble {
            background: var(--bg-secondary) !important;
        }
        
        .bpw-chat-container {
            font-family: var(--font-family) !important;
        }
        
        /* Floating Button Customization */
        .bpw-widget-btn {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)) !important;
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3) !important;
            width: 60px !important;
            height: 60px !important;
            border-radius: 50% !important;
        }
        
        .bpw-widget-btn:hover {
            transform: scale(1.1) !important;
            box-shadow: 0 12px 25px rgba(102, 126, 234, 0.4) !important;
        }
        
        .bpw-widget-btn svg {
            width: 24px !important;
            height: 24px !important;
        }
        
        /* Mobile Responsive */
        @media (max-width: 768px) {
            .bpw-layout {
                border-radius: 0 !important;
                height: 100vh !important;
                width: 100vw !important;
            }
            
            .bpw-header {
                border-radius: 0 !important;
            }
            
            .bpw-composer-inner {
                border-radius: 0 !important;
            }
        }
    `;
    
    document.head.appendChild(style);
}

function replaceDemoChatWithBotpress() {
    const demoSection = document.querySelector('.demo-section');
    if (demoSection) {
        const chatContainer = demoSection.querySelector('.chat-container');
        if (chatContainer) {
            // Replace demo chat with Botpress integration info
            chatContainer.innerHTML = `
                <div class="botpress-integration">
                    <div class="botpress-header">
                        <div class="botpress-avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="botpress-info">
                            <h4>AI Mental Health Assistant</h4>
                            <span class="botpress-status" id="botpressStatus">
                                <i class="fas fa-circle"></i>
                                Initializing...
                            </span>
                        </div>
                    </div>
                    <div class="botpress-description">
                        <p>Our AI assistant is powered by advanced natural language processing and is specially trained for mental health support.</p>
                        <div class="botpress-features">
                            <div class="feature-item">
                                <i class="fas fa-brain"></i>
                                <span>AI-Powered Responses</span>
                            </div>
                            <div class="feature-item">
                                <i class="fas fa-heart"></i>
                                <span>Empathetic Support</span>
                            </div>
                            <div class="feature-item">
                                <i class="fas fa-shield-alt"></i>
                                <span>Confidential & Secure</span>
                            </div>
                            <div class="feature-item">
                                <i class="fas fa-clock"></i>
                                <span>Available 24/7</span>
                            </div>
                        </div>
                        <button class="start-chat-btn" onclick="startChat()">
                            <i class="fas fa-comments"></i>
                            Start AI Conversation
                        </button>
                        <p class="chat-note">
                            <i class="fas fa-info-circle"></i>
                            Click the button above or use the chat widget in the bottom right corner
                        </p>
                    </div>
                </div>
            `;
            
            // Add custom styling for the Botpress integration section
            addBotpressIntegrationCSS();
        }
    }
}

function addBotpressIntegrationCSS() {
    if (!document.querySelector('#botpress-integration-styles')) {
        const style = document.createElement('style');
        style.id = 'botpress-integration-styles';
        style.textContent = `
            .botpress-integration {
                background: white;
                border-radius: var(--border-radius);
                box-shadow: var(--shadow-medium);
                overflow: hidden;
                max-width: 400px;
                margin: 0 auto;
            }
            
            .botpress-header {
                background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                color: white;
                padding: 1.5rem;
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            
            .botpress-avatar {
                width: 50px;
                height: 50px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
            }
            
            .botpress-info h4 {
                margin: 0 0 0.5rem 0;
                font-weight: 600;
                font-size: 1.1rem;
            }
            
            .botpress-status {
                font-size: 0.9rem;
                opacity: 0.9;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .botpress-status i {
                font-size: 0.7rem;
                animation: pulse 2s infinite;
            }
            
            .botpress-description {
                padding: 1.5rem;
            }
            
            .botpress-description p {
                color: var(--text-secondary);
                margin-bottom: 1.5rem;
                line-height: 1.6;
            }
            
            .botpress-features {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
                margin-bottom: 2rem;
            }
            
            .feature-item {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.9rem;
                color: var(--text-primary);
            }
            
            .feature-item i {
                color: var(--primary-color);
                width: 16px;
            }
            
            .start-chat-btn {
                width: 100%;
                background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                color: white;
                border: none;
                padding: 1rem;
                border-radius: 12px;
                font-size: 1.1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                margin-bottom: 1rem;
            }
            
            .start-chat-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
            }
            
            .chat-note {
                text-align: center;
                font-size: 0.8rem;
                color: var(--text-secondary);
                margin: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
            }
            
            .chat-note i {
                color: var(--primary-color);
            }
            
            /* Status Colors */
            .status-initializing i { color: #ffa726; }
            .status-ready i { color: #4CAF50; }
            .status-error i { color: #f44336; }
        `;
        document.head.appendChild(style);
    }
}

function updateBotpressStatus(status) {
    const statusElement = document.getElementById('botpressStatus');
    if (statusElement) {
        statusElement.className = `botpress-status status-${status}`;
        
        switch (status) {
            case 'ready':
                statusElement.innerHTML = '<i class="fas fa-circle"></i> AI Assistant Ready';
                break;
            case 'error':
            case 'timeout':
                statusElement.innerHTML = '<i class="fas fa-circle"></i> Connection Issue';
                break;
            default:
                statusElement.innerHTML = '<i class="fas fa-circle"></i> Initializing...';
        }
    }
}

function addBotpressEventListeners() {
    // Listen for Botpress events if available
    if (window.botpressWebChat) {
        console.log('🎯 Botpress event listeners ready');
        
        // You can add custom event listeners here
        // Example: Listen for when chat is opened
        // window.botpressWebChat.onEvent(callback);
    }
}

function styleChatButtons() {
    // Style all chat-related buttons
    const chatButtons = document.querySelectorAll('[onclick*="startChat"], .start-chat-btn');
    chatButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
}

// ===============================
// Main Chat Function (Pure Botpress)
// ===============================
function startChat() {
   // Wait until DOM is fully loaded
   document.addEventListener("DOMContentLoaded", function () {
      const chatButton = document.querySelector(".bpReset.bpFabContainer");
      if (chatButton) {
         chatButton.click();
      } else {
         console.error("Chat button not found.");
      }
   });
}


// ===============================
// Statistics Counter Animation
// ===============================
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
                // Add special formatting
                if (target === 24) {
                    element.textContent = '24/7';
                } else if (target === 10000) {
                    element.textContent = '10K+';
                } else if (target === 95) {
                    element.textContent = '95%';
                }
                
                // Add completion animation
                element.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 200);
            }
        };
        
        updateCounter();
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                setTimeout(() => animateCounter(entry.target), 300);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        stat.style.transition = 'transform 0.3s ease';
        statsObserver.observe(stat);
    });
}

// ===============================
// Scroll-based Animations
// ===============================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Stagger animations for grid items
                if (entry.target.parentElement?.classList.contains('features-grid')) {
                    const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100;
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .feature-card, 
        .info-card, 
        .demo-content > *, 
        .cta-content,
        .section-header,
        .hero-content > *
    `);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
}

// ===============================
// Navbar Scroll Effects
// ===============================
function initNavbarScrollEffect() {
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    const handleScroll = throttle(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (navbar) {
            if (scrollTop > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar on scroll direction (mobile)
            if (window.innerWidth <= 768) {
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    navbar.style.transform = 'translateX(-100%)';
                } else {
                    navbar.style.transform = 'translateX(0)';
                }
            }
        }
        
        lastScrollTop = scrollTop;
    }, 10);
    
    window.addEventListener('scroll', handleScroll);
}

// ===============================
// Enhanced Form System
// ===============================
function initFormEnhancements() {
    const forms = document.querySelectorAll('form');
    const formControls = document.querySelectorAll('.form-control');
    
    // Enhanced form validation
    formControls.forEach(control => {
        // Focus effects
        control.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
            this.parentElement.style.transition = 'transform 0.3s ease';
            this.classList.add('focused');
        });
        
        control.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
            this.classList.remove('focused');
            validateField(this);
        });
        
        // Real-time validation
        control.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                validateField(this);
            }
            
            // Auto-resize textareas
            if (this.tagName === 'TEXTAREA') {
                this.style.height = 'auto';
                this.style.height = this.scrollHeight + 'px';
            }
        });
    });
    
    // Form submission handling
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmission);
    });
    
    // Special validation for email fields
    const emailFields = document.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateEmail(this);
        });
    });
}

function validateField(field) {
    const isValid = field.checkValidity() && field.value.trim() !== '';
    const isRequired = field.hasAttribute('required');
    const isEmpty = field.value.trim() === '';
    
    // Remove existing validation classes
    field.classList.remove('valid', 'invalid');
    
    if (isValid) {
        field.classList.add('valid');
        field.style.borderColor = 'var(--success-color)';
        field.style.boxShadow = '0 0 0 4px rgba(76, 175, 80, 0.1)';
    } else if (isEmpty && isRequired) {
        field.classList.add('invalid');
        field.style.borderColor = 'var(--error-color)';
        field.style.boxShadow = '0 0 0 4px rgba(244, 67, 54, 0.1)';
    } else {
        field.style.borderColor = 'var(--border-color)';
        field.style.boxShadow = 'none';
    }
    
    return isValid;
}

function validateEmail(emailField) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(emailField.value);
    
    if (emailField.value && !isValid) {
        emailField.classList.add('invalid');
        emailField.style.borderColor = 'var(--error-color)';
        emailField.style.boxShadow = '0 0 0 4px rgba(244, 67, 54, 0.1)';
    } else if (isValid) {
        emailField.classList.remove('invalid');
        emailField.classList.add('valid');
        emailField.style.borderColor = 'var(--success-color)';
        emailField.style.boxShadow = '0 0 0 4px rgba(76, 175, 80, 0.1)';
    }
    
    return isValid;
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const formControls = form.querySelectorAll('.form-control');
    let isFormValid = true;
    
    // Validate all fields
    formControls.forEach(field => {
        if (!validateField(field)) {
            isFormValid = false;
        }
    });
    
    if (isFormValid) {
        // Handle contact form submission
        if (form.id === 'contactForm') {
            handleContactFormSubmission(form);
        }
    } else {
        // Show error message
        showNotification('Please correct the errors and try again.', 'error');
    }
}

function handleContactFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Create email content
    const emailSubject = `🧠 MindBot Contact: ${data.subject} - ${data.firstName} ${data.lastName}`;
    const emailBody = `
Hello Rahul Singh,

You have received a new message through your Mental Health ChatBot website contact form.

📋 CONTACT DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Name: ${data.firstName} ${data.lastName}
📧 Email: ${data.email}
📞 Phone: ${data.phone || 'Not provided'}
🏷️ Subject: ${data.subject}

💬 MESSAGE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 Sent: ${new Date().toLocaleString()}
🌐 Source: MindBot Website Contact Form
🎯 Priority: ${data.subject.includes('Crisis') ? 'HIGH - URGENT' : 'Normal'}

Best regards,
${data.firstName} ${data.lastName}
    `.trim();
    
    // Create mailto link
    const mailtoLink = `mailto:rahulsingh12022002@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Show success message with animation
    const successMessage = document.getElementById('successMessage');
    const submitBtn = form.querySelector('.submit-btn');
    
    // Change button state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Show success message after delay
    setTimeout(() => {
        if (successMessage) {
            successMessage.style.display = 'block';
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        
        // Reset button
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, var(--success-color), #45a049)';
        
        // Open email client
        setTimeout(() => {
            window.location.href = mailtoLink;
        }, 500);
        
    }, 1000);
    
    // Reset form after delay
    setTimeout(() => {
        form.reset();
        if (successMessage) {
            successMessage.style.display = 'none';
        }
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        submitBtn.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
        submitBtn.disabled = false;
        
        // Reset all field styles
        form.querySelectorAll('.form-control').forEach(field => {
            field.style.borderColor = 'var(--border-color)';
            field.style.boxShadow = 'none';
            field.classList.remove('valid', 'invalid');
        });
    }, 5000);
}

// ===============================
// Particle Animation System
// ===============================
function initParticleAnimation() {
    createFloatingParticles();
}

function createFloatingParticles() {
    const particleContainer = document.querySelector('.animated-bg');
    if (!particleContainer) return;
    
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        const size = Math.random() * 4 + 2;
        const animationDuration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(102, 126, 234, 0.2);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: floatParticle ${animationDuration}s ease-in-out infinite;
            animation-delay: ${delay}s;
            pointer-events: none;
        `;
        
        particleContainer.appendChild(particle);
    }
    
    // Add particle animation keyframes
    if (!document.querySelector('#particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes floatParticle {
                0%, 100% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: 0.2;
                }
                25% {
                    transform: translate(20px, -30px) rotate(90deg);
                    opacity: 0.5;
                }
                50% {
                    transform: translate(-15px, -60px) rotate(180deg);
                    opacity: 0.8;
                }
                75% {
                    transform: translate(-35px, -30px) rotate(270deg);
                    opacity: 0.5;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===============================
// Theme Toggle System
// ===============================
function initThemeToggle() {
    const themeToggle = createThemeToggle();
    document.body.appendChild(themeToggle);
    
    // Load saved theme
    const savedTheme = localStorage.getItem('mindbot-theme') || 'light';
    applyTheme(savedTheme);
}

function createThemeToggle() {
    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.innerHTML = '<i class="fas fa-moon"></i>';
    toggle.setAttribute('aria-label', 'Toggle dark mode');
    toggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 80px;
        width: 50px;
        height: 50px;
        background: rgba(255, 255, 255, 0.9);
        border: 1px solid var(--border-color);
        border-radius: 50%;
        cursor: pointer;
        z-index: 1001;
        transition: all 0.3s ease;
        box-shadow: var(--shadow-medium);
        backdrop-filter: blur(10px);
    `;
    
    toggle.addEventListener('click', toggleTheme);
    
    return toggle;
}

function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    applyTheme(newTheme);
    localStorage.setItem('mindbot-theme', newTheme);
}

function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    const toggle = document.querySelector('.theme-toggle');
    
    if (theme === 'dark') {
        toggle.innerHTML = '<i class="fas fa-sun"></i>';
        document.documentElement.style.setProperty('--bg-primary', '#1a1a1a');
        document.documentElement.style.setProperty('--bg-secondary', '#2d2d2d');
        document.documentElement.style.setProperty('--text-primary', '#ffffff');
        document.documentElement.style.setProperty('--text-secondary', '#cccccc');
        document.documentElement.style.setProperty('--border-color', '#404040');
    } else {
        toggle.innerHTML = '<i class="fas fa-moon"></i>';
        document.documentElement.style.setProperty('--bg-primary', '#ffffff');
        document.documentElement.style.setProperty('--bg-secondary', '#f8f9fa');
        document.documentElement.style.setProperty('--text-primary', '#2c3e50');
        document.documentElement.style.setProperty('--text-secondary', '#7f8c8d');
        document.documentElement.style.setProperty('--border-color', '#e9ecef');
    }
}

// ===============================
// Accessibility Features
// ===============================
function initAccessibilityFeatures() {
    addKeyboardNavigation();
    addFocusManagement();
    addScreenReaderSupport();
    addReducedMotionSupport();
}

function addKeyboardNavigation() {
    // ESC key functionality
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
            
            // Close Botpress chat if open
            if (window.botpressWebChat) {
                try {
                    window.botpressWebChat.sendEvent({ type: 'hide' });
                } catch (error) {
                    console.log('Botpress hide failed:', error);
                }
            }
        }
        
        // Tab trap for mobile menu
        if (e.key === 'Tab') {
            handleTabTrap(e);
        }
    });
}

function addFocusManagement() {
    // Focus outline for keyboard users
    const style = document.createElement('style');
    style.textContent = `
        .keyboard-user *:focus {
            outline: 2px solid var(--primary-color) !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(style);
    
    // Detect keyboard usage
    document.addEventListener('keydown', () => {
        document.body.classList.add('keyboard-user');
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-user');
    });
}

function addScreenReaderSupport() {
    // Add ARIA labels where missing
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label')) {
            const text = button.textContent.trim();
            if (text) {
                button.setAttribute('aria-label', text);
            }
        }
    });
    
    // Add live regions for dynamic content
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.style.cssText = `
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
    `;
    document.body.appendChild(liveRegion);
    
    window.announceToScreenReader = (message) => {
        liveRegion.textContent = message;
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 1000);
    };
}

function addReducedMotionSupport() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        document.body.classList.add('reduced-motion');
        
        const style = document.createElement('style');
        style.textContent = `
            .reduced-motion * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
}

function handleTabTrap(e) {
    const mobileMenu = document.querySelector('.navbar.active');
    if (!mobileMenu) return;
    
    const focusableElements = mobileMenu.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
    }
}

// ===============================
// Service Worker & PWA Features
// ===============================
function initServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            // Register service worker when ready
            // navigator.serviceWorker.register('/sw.js')
            //     .then(registration => console.log('SW registered'))
            //     .catch(error => console.log('SW registration failed'));
        });
    }
}

// ===============================
// Utility Functions
// ===============================
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    }
}

function showLoadingComplete() {
    // Remove any loading screens
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }
    
    // Announce to screen readers
    if (window.announceToScreenReader) {
        window.announceToScreenReader('Page loaded successfully');
    }
}

// ===============================
// Notification System
// ===============================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    const colors = {
        success: 'var(--success-color)',
        error: 'var(--error-color)',
        warning: 'var(--warning-color)',
        info: 'var(--primary-color)'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-heavy);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Add animation styles if not present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .notification-close {
                background: none;
                border: none;
                color: inherit;
                cursor: pointer;
                padding: 0.25rem;
                border-radius: 4px;
                transition: background 0.3s ease;
            }
            .notification-close:hover {
                background: rgba(255, 255, 255, 0.2);
            }
        `;
        document.head.appendChild(style);
    }
}

// ===============================
// Botpress Specific Functions
// ===============================

// Function to send custom events to Botpress
function sendBotpressEvent(eventType, payload = {}) {
    if (window.botpressWebChat) {
        try {
            window.botpressWebChat.sendEvent({
                type: eventType,
                ...payload
            });
            console.log(`Sent Botpress event: ${eventType}`, payload);
        } catch (error) {
            console.error('Error sending Botpress event:', error);
        }
    } else {
        console.warn('Botpress not available for event:', eventType);
    }
}

// Function to send custom payload to Botpress
function sendBotpressPayload(payload) {
    if (window.botpressWebChat) {
        try {
            window.botpressWebChat.sendPayload(payload);
            console.log('Sent Botpress payload:', payload);
        } catch (error) {
            console.error('Error sending Botpress payload:', error);
        }
    } else {
        console.warn('Botpress not available for payload');
    }
}

// Function to hide Botpress chat
function hideBotpressChat() {
    if (window.botpressWebChat) {
        try {
            window.botpressWebChat.sendEvent({ type: 'hide' });
        } catch (error) {
            console.error('Error hiding Botpress chat:', error);
        }
    }
}

// Function to show Botpress chat
function showBotpressChat() {
    if (window.botpressWebChat) {
        try {
            window.botpressWebChat.sendEvent({ type: 'show' });
        } catch (error) {
            console.error('Error showing Botpress chat:', error);
        }
    }
}

// ===============================
// Error Handling & Analytics
// ===============================
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    
    // Send to analytics if available
    if (window.gtag) {
        gtag('event', 'exception', {
            description: e.error?.message || 'Unknown error',
            fatal: false
        });
    }
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// ===============================
// Performance Monitoring
// ===============================
function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                    console.log(`Page load time: ${loadTime}ms`);
                    
                    // Send to analytics if available
                    if (window.gtag && loadTime > 0) {
                        gtag('event', 'timing_complete', {
                            name: 'load',
                            value: Math.round(loadTime)
                        });
                    }
                }
            }, 0);
        });
    }
}

measurePerformance();

// ===============================
// Progress Bar for Loading
// ===============================
function addProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        z-index: 10001;
        transition: width 0.3s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 90) progress = 90;
        progressBar.style.width = progress + '%';
    }, 100);
    
    window.addEventListener('load', () => {
        clearInterval(interval);
        progressBar.style.width = '100%';
        setTimeout(() => {
            progressBar.style.opacity = '0';
            setTimeout(() => progressBar.remove(), 300);
        }, 200);
    });
}

// Initialize progress bar
addProgressBar();

// ===============================
// Export Functions for Global Use
// ===============================
window.startChat = startChat;
window.showNotification = showNotification;
window.toggleTheme = toggleTheme;
window.sendBotpressEvent = sendBotpressEvent;
window.sendBotpressPayload = sendBotpressPayload;
window.hideBotpressChat = hideBotpressChat;
window.showBotpressChat = showBotpressChat;

// ===============================
// Initialize Botpress Detection
// ===============================
function initBotpressDetection() {
    let attempts = 0;
    const maxAttempts = 100; // 10 seconds max wait
    
    const checkBotpress = () => {
        attempts++;
        
        if (window.botpressWebChat) {
            console.log('✅ Botpress WebChat detected and ready');
            setupBotpressCustomization();
            updateBotpressStatus('ready');
            
            // Enable all chat functionality
            document.querySelectorAll('[onclick*="startChat"]').forEach(button => {
                button.style.opacity = '1';
                button.style.pointerEvents = 'auto';
                button.title = 'Click to start AI conversation';
            });
            
            return;
        }
        
        if (attempts < maxAttempts) {
            setTimeout(checkBotpress, 100);
        } else {
            console.warn('⚠️ Botpress loading timeout - using fallback mode');
            updateBotpressStatus('timeout');
            
            // Update buttons to show fallback mode
            document.querySelectorAll('[onclick*="startChat"]').forEach(button => {
                button.title = 'Chat temporarily unavailable - click to try again';
            });
        }
    };
    
    // Start checking immediately
    checkBotpress();
}

// Start Botpress detection
initBotpressDetection();

// Console welcome message
console.log(`
🧠 MindBot Website - Pure Botpress Integration
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ Enhanced Mental Health Chatbot Platform
🤖 Integration: Pure Botpress (No Demo Chat)
🎯 Built by: Rahul Singh & Mayank Dubey
📧 Contact: rahulsingh12022002@gmail.com
📱 Phone: +91 6390864564
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Available Functions:
• startChat() - Open Botpress AI chat
• sendBotpressEvent(type, payload) - Send Botpress event
• sendBotpressPayload(payload) - Send Botpress payload
• showBotpressChat() - Show Botpress widget
• hideBotpressChat() - Hide Botpress widget
• showNotification(message, type) - Show notification
• toggleTheme() - Switch light/dark mode

Your Botpress chatbot is the primary AI interface! 🚀
`);

// ===============================
// End of main.js - Pure Botpress Integration
// ===============================