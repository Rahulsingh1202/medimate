// Enhanced JavaScript for Responsive Mental Health Chatbot Website
// main.js - Responsive Navigation + Botpress Integration

document.addEventListener('DOMContentLoaded', function() {
    console.log('🧠 MediMate Responsive Website Initialized');
    
    // Initialize all functionality
    initResponsiveNavigation();
    initSmoothScrolling();
    initBotpressIntegration();
    initStatsCounter();
    initScrollAnimations();
    initNavbarScrollEffect();
    initAccessibilityFeatures();
    
    // Add loading animation
    showLoadingComplete();
});

// ===============================
// Responsive Mobile Navigation System
// ===============================
function initResponsiveNavigation() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const navbar = document.getElementById('navbar');
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', toggleMobileMenu);
        
        // Close menu when clicking overlay
        if (menuOverlay) {
            menuOverlay.addEventListener('click', closeMobileMenu);
        }
        
        // Close menu when clicking on nav links
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // Close menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
        
        // Prevent menu from closing when clicking inside it
        mobileMenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        // ESC key to close mobile menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
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
    const mobileMenu = document.getElementById('mobileMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    
    hamburger?.classList.toggle('active');
    mobileMenu?.classList.toggle('active');
    menuOverlay?.classList.toggle('active');
    
    // Update aria attributes for accessibility
    const isActive = hamburger?.classList.contains('active');
    hamburger?.setAttribute('aria-expanded', isActive);
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isActive ? 'hidden' : '';
}

function closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    
    hamburger?.classList.remove('active');
    mobileMenu?.classList.remove('active');
    menuOverlay?.classList.remove('active');
    hamburger?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
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
        const offsetTop = targetElement.offsetTop - 80; // Account for navbar height
        
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
            return;
        }
        
        if (attempts < maxAttempts) {
            setTimeout(checkBotpress, 100);
        } else {
            console.warn('⚠️ Botpress loading timeout');
        }
    };
    
    checkBotpress();
}

function setupBotpressCustomization() {
    try {
        // Apply custom styling to Botpress
        addBotpressCustomCSS();
        
        console.log('🎨 Botpress customization applied');
        
    } catch (error) {
        console.error('Error customizing Botpress:', error);
    }
}

function addBotpressCustomCSS() {
    if (!document.querySelector('#botpress-custom-styles')) {
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
    // Style any remaining chat-related buttons
    const chatButtons = document.querySelectorAll('.chat-related-btn');
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
// Main Chat Function (Botpress Integration Only)
// ===============================
// Note: Botpress chat widget will be available automatically
// Users can access chat through the floating Botpress widget

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
        .section-header,
        .cta-content,
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
        }
        
        lastScrollTop = scrollTop;
    }, 10);
    
    window.addEventListener('scroll', handleScroll);
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
    const mobileMenu = document.querySelector('.mobile-menu.active');
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
window.showNotification = showNotification;
window.sendBotpressEvent = sendBotpressEvent;
window.sendBotpressPayload = sendBotpressPayload;
window.hideBotpressChat = hideBotpressChat;
window.showBotpressChat = showBotpressChat;

// Console welcome message
console.log(`
🧠 MediMate Responsive Website - Botpress Integration
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ Enhanced Mental Health Chatbot Platform
🎯 Responsive Navigation: Mobile & Desktop
🤖 Integration: Botpress Widget (Floating Chat)
📱 Built by: Utkarsh Singh & Md. Nasheet Khan
📧 Contact: utkarshsingh20250@gmail.com
📞 Phone: +91 7985897980
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Available Functions:
• sendBotpressEvent(type, payload) - Send Botpress event
• sendBotpressPayload(payload) - Send Botpress payload
• showBotpressChat() - Show Botpress widget
• hideBotpressChat() - Hide Botpress widget
• showNotification(message, type) - Show notification

Chat available via Botpress floating widget! 🚀
`);

// ===============================
// End of main.js - Responsive Navigation + Botpress
// ===============================

// ===============================
// Fat Interactive Walking Bot for MediMate
// Enhanced with mouse tracking and no flips
// Version: 2.0 - Fat Edition
// ===============================

function initWalkingBot() {
    // Create walking bot HTML structure
    const botHTML = `
        <div class="walking-bot" id="walkingBot">
            <div class="bot-body">
                <div class="bot-head">
                    <div class="bot-eyes">
                        <div class="eye"></div>
                        <div class="eye"></div>
                    </div>
                    <div class="bot-mouth"></div>
                </div>
                <div class="bot-arms">
                    <div class="arm arm-left"></div>
                    <div class="arm arm-right"></div>
                </div>
                <div class="bot-legs">
                    <div class="leg leg-left"></div>
                    <div class="leg leg-right"></div>
                </div>
            </div>
            <div class="speech-bubble" id="speechBubble">Hi! I'm Fat MediBot! 🤗</div>
        </div>
    `;

    // Add bot to page
    document.body.insertAdjacentHTML('beforeend', botHTML);

    // Add CSS styles
    addWalkingBotStyles();

    // Initialize bot behavior
    window.walkingBot = new WalkingBot();
}

function addWalkingBotStyles() {
    const styles = `
        <style id="walking-bot-styles">
        /* Fat Walking Bot Styles */
        .walking-bot {
            position: fixed;
            width: 100px;
            height: 90px;
            z-index: 998;
            cursor: pointer;
            transition: transform 0.1s ease;
            user-select: none;
            pointer-events: all;
        }

        .bot-body {
            position: relative;
            width: 100%;
            height: 100%;
            transform-origin: center bottom;
            animation: botBobFloat 3s ease-in-out infinite;
        }

        .bot-head {
            width: 70px;
            height: 60px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            border-radius: 60% 60% 50% 50%;
            position: absolute;
            top: 5px;
            left: 50%;
            transform: translateX(-50%);
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
            border: 3px solid #ffffff;
        }

        .bot-eyes {
            position: absolute;
            top: 18px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 12px;
        }

        .eye {
            width: 10px;
            height: 10px;
            background: #ffffff;
            border-radius: 50%;
            position: relative;
            animation: botBlink 4s infinite;
        }

        .eye::after {
            content: '';
            width: 5px;
            height: 5px;
            background: #333;
            border-radius: 50%;
            position: absolute;
            top: 2px;
            left: 2px;
            transition: all 0.2s ease;
        }

        .bot-mouth {
            position: absolute;
            top: 38px;
            left: 50%;
            transform: translateX(-50%);
            width: 16px;
            height: 8px;
            border: 2px solid #ffffff;
            border-top: none;
            border-radius: 0 0 16px 16px;
            animation: botSmile 5s infinite;
        }

        .bot-legs {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 15px;
        }

        .leg {
            width: 12px;
            height: 25px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            border-radius: 6px;
            border: 2px solid #ffffff;
            transform-origin: top center;
        }

        .leg-left {
            animation: botWalkLeft 0.8s infinite;
        }

        .leg-right {
            animation: botWalkRight 0.8s infinite;
        }

        .bot-arms {
            position: absolute;
            top: 40px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 50px;
        }

        .arm {
            width: 8px;
            height: 22px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            border-radius: 4px;
            border: 2px solid #ffffff;
            transform-origin: top center;
        }

        .arm-left {
            animation: botSwingLeft 0.8s infinite;
        }

        .arm-right {
            animation: botSwingRight 0.8s infinite;
        }

        .speech-bubble {
            position: absolute;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 15px;
            padding: 10px 14px;
            font-size: 13px;
            color: #333;
            white-space: nowrap;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            pointer-events: none;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            top: -50px;
            left: 50%;
            transform: translateX(-50%) translateY(-10px);
            z-index: 999;
            font-weight: 500;
        }

        .speech-bubble::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border: 8px solid transparent;
            border-top-color: rgba(255, 255, 255, 0.95);
        }

        .speech-bubble.show {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }

        .heart-effect {
            position: absolute;
            color: #ff6b9d;
            font-size: 18px;
            opacity: 0;
            pointer-events: none;
            animation: botHeartFloat 2s ease-out forwards;
            z-index: 997;
        }

        .sparkle {
            position: absolute;
            width: 6px;
            height: 6px;
            background: #ffd700;
            border-radius: 50%;
            opacity: 0;
            pointer-events: none;
            animation: botSparkleFloat 1.5s ease-out forwards;
            z-index: 997;
        }

        /* Eye following mouse */
        .walking-bot.following-mouse .eye::after {
            transition: all 0.1s ease;
        }

        /* Bot Animations */
        @keyframes botBobFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
        }

        @keyframes botWalkLeft {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(-15deg); }
        }

        @keyframes botWalkRight {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(15deg); }
        }

        @keyframes botSwingLeft {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(10deg); }
        }

        @keyframes botSwingRight {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(-10deg); }
        }

        @keyframes botBlink {
            0%, 90%, 100% { transform: scaleY(1); }
            95% { transform: scaleY(0.1); }
        }

        @keyframes botSmile {
            0%, 80%, 100% { transform: translateX(-50%) scaleX(1); }
            85%, 95% { transform: translateX(-50%) scaleX(1.2); }
        }

        @keyframes botHeartFloat {
            0% {
                opacity: 1;
                transform: translateY(0) scale(0.5);
            }
            50% {
                opacity: 0.8;
                transform: translateY(-20px) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-40px) scale(0.5);
            }
        }

        @keyframes botSparkleFloat {
            0% {
                opacity: 1;
                transform: translateY(0) scale(0);
            }
            50% {
                opacity: 1;
                transform: translateY(-15px) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-30px) scale(0);
            }
        }

        /* Walking states */
        .walking-bot.walking .leg-left,
        .walking-bot.walking .leg-right,
        .walking-bot.walking .arm-left,
        .walking-bot.walking .arm-right {
            animation-duration: 0.4s;
        }

        .walking-bot.idle .leg-left,
        .walking-bot.idle .leg-right,
        .walking-bot.idle .arm-left,
        .walking-bot.idle .arm-right {
            animation: none;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .walking-bot {
                width: 80px;
                height: 75px;
            }
            
            .bot-head {
                width: 55px;
                height: 48px;
            }
            
            .bot-eyes {
                top: 15px;
                gap: 10px;
            }
            
            .eye {
                width: 8px;
                height: 8px;
            }
            
            .eye::after {
                width: 4px;
                height: 4px;
            }
            
            .bot-mouth {
                top: 30px;
                width: 12px;
                height: 6px;
            }
            
            .leg {
                width: 10px;
                height: 20px;
            }
            
            .arm {
                width: 6px;
                height: 18px;
            }
            
            .bot-arms {
                top: 32px;
                gap: 38px;
            }
        }

        /* Fallback for CSS variables */
        :root {
            --primary-color: #667eea;
            --secondary-color: #764ba2;
        }
        </style>
    `;

    document.head.insertAdjacentHTML('beforeend', styles);
}

class WalkingBot {
    constructor() {
        this.bot = document.getElementById('walkingBot');
        this.speechBubble = document.getElementById('speechBubble');
        this.isWalking = true;
        this.currentX = window.innerWidth / 2;
        this.currentY = window.innerHeight / 2;
        this.targetX = this.currentX;
        this.targetY = this.currentY;
        this.speed = 1.2;
        this.mouseX = 0;
        this.mouseY = 0;
        this.messages = [
            
            "Hi there! 👋",
            "Need mental health support? 💙",
            "I'm here to help! 🤗",
            "How are you feeling today? 😊",
            "You're not alone! 💪",
            "Take care of yourself! 🌟",
            "Mental health matters! 🧠",
            "You're amazing! ✨",
            "Stay positive! 🌈",
            "I believe in you! 💖",
            "Try our AI chat! 🤖",
            "Welcome to MediMate! 🏥",
            "Your wellbeing is important! 💝",
            "I'm watching you! 👀",
            "Following your mouse! 🖱️",
            "I love interactions! 💕",
            "Click me for surprises! 🎉",
            "I'm your fat friend! 🤗",
            "Mental health is important! 🧠",
            "Need someone to talk to? 💬"
        ];
        
        this.init();
    }

    init() {
        // Set initial position
        this.currentX = Math.max(120, Math.min(window.innerWidth - 120, this.currentX));
        this.currentY = Math.max(120, Math.min(window.innerHeight - 120, this.currentY));
        this.bot.style.left = this.currentX + 'px';
        this.bot.style.top = this.currentY + 'px';
        
        // Add click event
        this.bot.addEventListener('click', (e) => {
            e.stopPropagation();
            this.onBotClick();
        });
        
        // Add touch support for mobile
        this.bot.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.onBotClick();
        });
        
        // Enhanced mouse following behavior
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.updateEyesDirection(e.clientX, e.clientY);
            
            // More aggressive mouse following - 15% chance
            if (Math.random() < 0.15) {
                this.followMouse(e.clientX, e.clientY);
            }
        });
        
        // Mouse enter/leave events for interactive behavior
        document.addEventListener('mouseenter', () => {
            this.bot.classList.add('following-mouse');
            if (Math.random() < 0.4) {
                this.showMessage("I see your mouse! 👀");
            }
        });
        
        // Click anywhere to make bot come to that location
        document.addEventListener('click', (e) => {
            if (e.target !== this.bot && !this.bot.contains(e.target)) {
                if (Math.random() < 0.6) { // 60% chance to follow clicks
                    this.setTarget(e.clientX, e.clientY);
                    this.showMessage("Coming your way! 🏃‍♂️");
                }
            }
        });
        
        // Touch follow for mobile
        document.addEventListener('touchstart', (e) => {
            if (e.target !== this.bot && !this.bot.contains(e.target)) {
                if (Math.random() < 0.5) { // 50% chance to follow touch
                    const touch = e.touches[0];
                    this.setTarget(touch.clientX, touch.clientY);
                    this.showMessage("Following your touch! 👆");
                }
            }
        });
        
        // Start walking animation
        this.startWalking();
        
        // Reduced random movement - bot prefers following mouse
        this.randomMovementInterval = setInterval(() => {
            // Only random movement if mouse hasn't moved recently
            if (Math.random() < 0.3) {
                this.randomMovement();
            }
        }, 6000 + Math.random() * 4000);
        
        // Random messages every 8-15 seconds
        this.randomMessageInterval = setInterval(() => {
            this.randomMessage();
        }, 8000 + Math.random() * 7000);
        
        // Window resize handler
        window.addEventListener('resize', () => this.handleResize());
        
        // Show welcome message after 2 seconds
        setTimeout(() => {
            this.showMessage("I'm your fat friend MediBot! 🤗");
        }, 2000);
    }

    updateEyesDirection(mouseX, mouseY) {
        const botRect = this.bot.getBoundingClientRect();
        const botCenterX = botRect.left + botRect.width / 2;
        const botCenterY = botRect.top + botRect.height / 3; // Eyes are in upper third
        
        // Calculate angle to mouse
        const deltaX = mouseX - botCenterX;
        const deltaY = mouseY - botCenterY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // Limit eye movement
        const maxMovement = 2;
        let eyeX = 0;
        let eyeY = 0;
        
        if (distance > 0) {
            eyeX = Math.max(-maxMovement, Math.min(maxMovement, (deltaX / distance) * maxMovement));
            eyeY = Math.max(-maxMovement, Math.min(maxMovement, (deltaY / distance) * maxMovement));
        }
        
        // Apply eye movement to both eyes
        const eyeElements = this.bot.querySelectorAll('.eye');
        eyeElements.forEach(eye => {
            const pupil = eye.querySelector('::after');
            eye.style.setProperty('--eye-offset-x', eyeX + 'px');
            eye.style.setProperty('--eye-offset-y', eyeY + 'px');
            
            // Direct manipulation for better browser support
            const afterElement = window.getComputedStyle(eye, '::after');
            if (afterElement) {
                eye.setAttribute('data-eye-x', eyeX);
                eye.setAttribute('data-eye-y', eyeY);
            }
        });
    }

    followMouse(mouseX, mouseY) {
        // Calculate distance to mouse
        const distance = Math.sqrt(
            Math.pow(mouseX - this.currentX, 2) + 
            Math.pow(mouseY - this.currentY, 2)
        );
        
        // Only follow if mouse is reasonably close and not too close
        if (distance > 150 && distance < 400) {
            this.setTarget(mouseX, mouseY);
        }
    }

    setTarget(x, y) {
        // Keep bot within screen bounds with bigger margin for fat bot
        const margin = 120;
        this.targetX = Math.max(margin, Math.min(window.innerWidth - margin, x));
        this.targetY = Math.max(margin, Math.min(window.innerHeight - margin, y));
    }

    startWalking() {
        this.bot.classList.add('walking');
        this.bot.classList.remove('idle');
        this.walkingInterval = setInterval(() => {
            this.updatePosition();
        }, 16); // ~60fps
    }

    stopWalking() {
        this.bot.classList.remove('walking');
        this.bot.classList.add('idle');
        clearInterval(this.walkingInterval);
    }

    updatePosition() {
        if (!this.isWalking) return;

        const dx = this.targetX - this.currentX;
        const dy = this.targetY - this.currentY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 10) {
            // Move towards target
            const moveX = (dx / distance) * this.speed;
            const moveY = (dy / distance) * this.speed;
            
            this.currentX += moveX;
            this.currentY += moveY;
            
            // No flip behavior - bot always faces forward
        } else {
            // Reached target, set new random target after a longer delay
            setTimeout(() => {
                if (Math.random() < 0.4) { // Less random movement
                    this.randomMovement();
                }
            }, 4000 + Math.random() * 6000);
        }

        // Update bot position
        this.bot.style.left = this.currentX + 'px';
        this.bot.style.top = this.currentY + 'px';
    }

    randomMovement() {
        const margin = 120;
        const maxWidth = window.innerWidth - 2 * margin;
        const maxHeight = window.innerHeight - 2 * margin;
        
        if (maxWidth > 0 && maxHeight > 0) {
            const newX = margin + Math.random() * maxWidth;
            const newY = margin + Math.random() * maxHeight;
            this.setTarget(newX, newY);
        }
    }

    onBotClick() {
        this.showHappiness();
        this.showRandomMessage();
        this.createHeartEffect();
        this.createSparkleEffect();
        
        // Enhanced bounce effect for fat bot
        this.bot.style.transform = 'scale(1.3)';
        setTimeout(() => {
            this.bot.style.transform = 'scale(1)';
        }, 300);
        
        // Sometimes trigger Botpress chat
        if (Math.random() < 0.4) { // 40% chance
            setTimeout(() => {
                if (window.botpressWebChat) {
                    try {
                        window.botpressWebChat.sendEvent({ type: 'show' });
                        this.showMessage("Let's chat about your mental health! 💬");
                    } catch (error) {
                        console.log('Botpress show failed:', error);
                    }
                }
            }, 1000);
        }
    }

    showRandomMessage() {
        const message = this.messages[Math.floor(Math.random() * this.messages.length)];
        this.showMessage(message);
    }

    showMessage(text = "Hi! I'm Fat MediBot! 🤗") {
        this.speechBubble.textContent = text;
        this.speechBubble.classList.add('show');
        
        setTimeout(() => {
            this.speechBubble.classList.remove('show');
        }, 3500);
    }

    createHeartEffect() {
        for (let i = 0; i < 4; i++) { // More hearts for fat bot
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'heart-effect';
                heart.textContent = '💖';
                heart.style.left = (this.currentX + Math.random() * 60 - 30) + 'px';
                heart.style.top = (this.currentY + Math.random() * 60 - 30) + 'px';
                heart.style.zIndex = '997';
                document.body.appendChild(heart);
                
                setTimeout(() => heart.remove(), 2000);
            }, i * 200);
        }
    }

    createSparkleEffect() {
        for (let i = 0; i < 8; i++) { // More sparkles for fat bot
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.style.left = (this.currentX + Math.random() * 80 - 40) + 'px';
                sparkle.style.top = (this.currentY + Math.random() * 80 - 40) + 'px';
                sparkle.style.zIndex = '997';
                document.body.appendChild(sparkle);
                
                setTimeout(() => sparkle.remove(), 1500);
            }, i * 100);
        }
    }

    showHappiness() {
        this.bot.style.filter = 'brightness(1.4) saturate(1.3) drop-shadow(0 0 15px rgba(102, 126, 234, 0.8))';
        setTimeout(() => {
            this.bot.style.filter = '';
        }, 1200);
    }

    toggleWalking() {
        this.isWalking = !this.isWalking;
        if (this.isWalking) {
            this.startWalking();
            this.showMessage("I'm walking again! 🚶‍♂️");
        } else {
            this.stopWalking();
            this.showMessage("Taking a fat break! 😴");
        }
    }

    teleportToRandomPosition() {
        const margin = 120;
        const maxWidth = window.innerWidth - 2 * margin;
        const maxHeight = window.innerHeight - 2 * margin;
        
        if (maxWidth > 0 && maxHeight > 0) {
            this.currentX = margin + Math.random() * maxWidth;
            this.currentY = margin + Math.random() * maxHeight;
            this.bot.style.left = this.currentX + 'px';
            this.bot.style.top = this.currentY + 'px';
            
            // Enhanced sparkle effect on teleport
            this.createSparkleEffect();
            this.showMessage("Fat teleport successful! ✨");
        }
    }

    handleResize() {
        // Adjust position if out of bounds
        const margin = 120;
        if (this.currentX > window.innerWidth - margin) {
            this.currentX = window.innerWidth - margin;
        }
        if (this.currentY > window.innerHeight - margin) {
            this.currentY = window.innerHeight - margin;
        }
        if (this.currentX < margin) {
            this.currentX = margin;
        }
        if (this.currentY < margin) {
            this.currentY = margin;
        }
        
        this.bot.style.left = this.currentX + 'px';
        this.bot.style.top = this.currentY + 'px';
    }

    randomMessage() {
        if (Math.random() < 0.25) { // 25% chance
            this.showRandomMessage();
        }
    }

    destroy() {
        // Cleanup function
        clearInterval(this.walkingInterval);
        clearInterval(this.randomMovementInterval);
        clearInterval(this.randomMessageInterval);
        this.bot.remove();
        document.getElementById('walking-bot-styles')?.remove();
    }
}

// Utility functions for external control
function createWalkingBot() {
    if (!document.getElementById('walkingBot')) {
        initWalkingBot();
    }
}

function removeWalkingBot() {
    if (window.walkingBot) {
        window.walkingBot.destroy();
        window.walkingBot = null;
    }
}

function toggleBotWalking() {
    if (window.walkingBot) {
        window.walkingBot.toggleWalking();
    }
}

function makeBotHappy() {
    if (window.walkingBot) {
        window.walkingBot.onBotClick();
    }
}

function teleportBot() {
    if (window.walkingBot) {
        window.walkingBot.teleportToRandomPosition();
    }
}

function sendBotMessage(message) {
    if (window.walkingBot) {
        window.walkingBot.showMessage(message);
    }
}

// Auto-initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWalkingBot);
} else {
    initWalkingBot();
}

// Export functions
window.createWalkingBot = createWalkingBot;
window.removeWalkingBot = removeWalkingBot;
window.toggleBotWalking = toggleBotWalking;
window.makeBotHappy = makeBotHappy;
window.teleportBot = teleportBot;
window.sendBotMessage = sendBotMessage;

console.log(`
🤖 Fat MediBot Walking Animation Loaded!
═══════════════════════════════════════
✨ Enhanced fat & interactive design
🖱️ Advanced mouse pointer tracking
👀 Eyes follow your cursor in real-time
🎯 60% chance to follow clicks
📱 Mobile-friendly touch support
🎮 Control functions available:
   • toggleBotWalking() - Start/stop walking
   • makeBotHappy() - Trigger happiness effects
   • teleportBot() - Random teleportation
   • sendBotMessage("text") - Custom messages
   • removeWalkingBot() - Remove completely

Fat Bot Features:
• 100x90px size (was 80x80px)
• Eyes track mouse movement
• No unnecessary flipping
• Enhanced interactive behaviors
• 4 hearts & 8 sparkles on click
• Botpress integration (40% chance)
`);

// ===============================
// End of Fat Walking Bot
// ===============================
