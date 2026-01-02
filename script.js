// ============================================
// UI Component Library - Main JavaScript
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeComponents();
    setupEventListeners();
    setupExamples();
    setupCustomization();
    
    // Set active nav link based on current page
    setActiveNavLink();
});

// ============================================
// Component Initialization
// ============================================

// ============================================
// Component Initialization
// ============================================

function initializeComponents() {
    // Initialize mobile menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        // Add click event listener for mobile menu button
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            mainNav.classList.toggle('active');
            
            // Change icon based on state
            const icon = this.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.className = 'fas fa-times';
                this.setAttribute('aria-expanded', 'true');
            } else {
                icon.className = 'fas fa-bars';
                this.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close mobile menu when clicking on a nav link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (mainNav.classList.contains('active') && 
                !event.target.closest('.main-nav') && 
                !event.target.closest('.mobile-menu-btn')) {
                mainNav.classList.remove('active');
                mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close on Escape key press
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                const mainNav = document.querySelector('.main-nav');
                const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                if (mainNav && mobileMenuBtn) {
                    mainNav.classList.remove('active');
                    mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                history.pushState(null, null, href);
            }
        });
    });
    
    // Add ripple effect to buttons
    setupRippleEffect();
    
    // Initialize tooltips if any
    setupTooltips();
}

// ============================================
// Event Listeners
// ============================================

function setupEventListeners() {
    // Form submission handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Find submit button and disable it
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Show success message
                    showNotification('Form submitted successfully!', 'success');
                }, 1500);
            }
        });
    });
    
    // Copy code blocks
    document.querySelectorAll('.code-block').forEach(block => {
        block.addEventListener('click', function() {
            const code = this.querySelector('code') || this;
            const text = code.textContent;
            
            navigator.clipboard.writeText(text).then(() => {
                // Show copied feedback
                const originalText = this.innerHTML;
                this.innerHTML = '<div class="text-center"><i class="fas fa-check"></i> Copied!</div>';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            });
        });
    });
}

// ============================================
// Examples Page Functionality
// ============================================

function setupExamples() {
    // Login form example
    const loginForm = document.getElementById('loginForm');
    const loginResult = document.getElementById('loginResult');
    
    if (loginForm && loginResult) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('#exampleEmail').value;
            const password = this.querySelector('#examplePassword').value;
            
            // Simple validation
            if (!email || !password) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Simulate API call
            loginResult.innerHTML = '<div class="alert alert-info"><i class="fas fa-spinner fa-spin"></i> Signing in...</div>';
            
            setTimeout(() => {
                if (email.includes('@') && password.length >= 6) {
                    loginResult.innerHTML = '<div class="alert alert-success"><i class="fas fa-check-circle"></i> Login successful! Redirecting...</div>';
                } else {
                    loginResult.innerHTML = '<div class="alert alert-danger"><i class="fas fa-times-circle"></i> Invalid email or password. Please try again.</div>';
                }
            }, 1500);
        });
    }
    
    // Notification buttons
    const notificationButtons = {
        showSuccess: document.getElementById('showSuccess'),
        showWarning: document.getElementById('showWarning'),
        showError: document.getElementById('showError'),
        showInfo: document.getElementById('showInfo')
    };
    
    if (notificationButtons.showSuccess) {
        notificationButtons.showSuccess.addEventListener('click', () => {
            showNotification('Operation completed successfully!', 'success');
        });
    }
    
    if (notificationButtons.showWarning) {
        notificationButtons.showWarning.addEventListener('click', () => {
            showNotification('Warning: Please check your input.', 'warning');
        });
    }
    
    if (notificationButtons.showError) {
        notificationButtons.showError.addEventListener('click', () => {
            showNotification('Error: Something went wrong. Please try again.', 'error');
        });
    }
    
    if (notificationButtons.showInfo) {
        notificationButtons.showInfo.addEventListener('click', () => {
            showNotification('Info: This is an informational message.', 'info');
        });
    }
}

// ============================================
// Customization Page Functionality
// ============================================

function setupCustomization() {
    const customizationPage = document.querySelector('.customize-page');
    if (!customizationPage) return;
    
    // Get DOM elements
    const primaryColor = document.getElementById('primaryColor');
    const primaryColorText = document.getElementById('primaryColorText');
    const secondaryColor = document.getElementById('secondaryColor');
    const secondaryColorText = document.getElementById('secondaryColorText');
    const successColor = document.getElementById('successColor');
    const successColorText = document.getElementById('successColorText');
    const fontFamily = document.getElementById('fontFamily');
    const borderRadius = document.getElementById('borderRadius');
    const borderRadiusValue = document.getElementById('borderRadiusValue');
    const shadowIntensity = document.getElementById('shadowIntensity');
    const shadowIntensityValue = document.getElementById('shadowIntensityValue');
    const applyBtn = document.getElementById('applyCustomization');
    const resetBtn = document.getElementById('resetCustomization');
    const copyCssBtn = document.getElementById('copyCss');
    const cssOutput = document.getElementById('cssOutput');
    
    // Sync color inputs
    if (primaryColor && primaryColorText) {
        primaryColor.addEventListener('input', function() {
            primaryColorText.value = this.value;
            updatePreview();
        });
        
        primaryColorText.addEventListener('input', function() {
            primaryColor.value = this.value;
            updatePreview();
        });
    }
    
    if (secondaryColor && secondaryColorText) {
        secondaryColor.addEventListener('input', function() {
            secondaryColorText.value = this.value;
            updatePreview();
        });
        
        secondaryColorText.addEventListener('input', function() {
            secondaryColor.value = this.value;
            updatePreview();
        });
    }
    
    if (successColor && successColorText) {
        successColor.addEventListener('input', function() {
            successColorText.value = this.value;
            updatePreview();
        });
        
        successColorText.addEventListener('input', function() {
            successColor.value = this.value;
            updatePreview();
        });
    }
    
    // Update slider values
    if (borderRadius && borderRadiusValue) {
        borderRadius.addEventListener('input', function() {
            borderRadiusValue.textContent = `${this.value}px`;
            updatePreview();
        });
    }
    
    if (shadowIntensity && shadowIntensityValue) {
        shadowIntensity.addEventListener('input', function() {
            const value = parseInt(this.value);
            let intensityText = 'Light';
            
            if (value < 10) intensityText = 'Very Light';
            else if (value < 20) intensityText = 'Medium';
            else intensityText = 'Strong';
            
            shadowIntensityValue.textContent = intensityText;
            updatePreview();
        });
    }
    
    // Font family change
    if (fontFamily) {
        fontFamily.addEventListener('change', updatePreview);
    }
    
    // Apply customization
    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            applyCustomization();
            showNotification('Customization applied!', 'success');
        });
    }
    
    // Reset customization
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            resetCustomization();
            showNotification('Customization reset to default', 'info');
        });
    }
    
    // Copy CSS
    if (copyCssBtn && cssOutput) {
        copyCssBtn.addEventListener('click', function() {
            const cssText = cssOutput.textContent;
            navigator.clipboard.writeText(cssText).then(() => {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            });
        });
    }
    
    // Initial update
    updatePreview();
    updateCssOutput();
    
    // ============================================
    // Customization Functions
    // ============================================
    
    function updatePreview() {
        const root = document.documentElement;
        
        // Update CSS variables for preview
        if (primaryColor) {
            root.style.setProperty('--primary', primaryColor.value);
            root.style.setProperty('--primary-dark', darkenColor(primaryColor.value, 20));
        }
        
        if (secondaryColor) {
            root.style.setProperty('--secondary', secondaryColor.value);
        }
        
        if (successColor) {
            root.style.setProperty('--success', successColor.value);
        }
        
        if (fontFamily) {
            root.style.setProperty('--font-main', fontFamily.value);
        }
        
        if (borderRadius) {
            const radius = `${borderRadius.value}px`;
            root.style.setProperty('--radius-md', radius);
            root.style.setProperty('--radius-lg', `calc(${radius} * 1.5)`);
        }
        
        if (shadowIntensity) {
            const intensity = shadowIntensity.value / 100;
            root.style.setProperty('--shadow-md', `0 4px 8px rgba(0, 0, 0, ${0.1 + intensity * 0.1})`);
            root.style.setProperty('--shadow-lg', `0 8px 16px rgba(0, 0, 0, ${0.12 + intensity * 0.1})`);
        }
        
        updateCssOutput();
    }
    
    function updateCssOutput() {
        if (!cssOutput) return;
        
        const root = document.documentElement;
        const computedStyle = getComputedStyle(root);
        
        const css = `:root {
    --primary: ${computedStyle.getPropertyValue('--primary').trim()};
    --primary-dark: ${computedStyle.getPropertyValue('--primary-dark').trim()};
    --secondary: ${computedStyle.getPropertyValue('--secondary').trim()};
    --success: ${computedStyle.getPropertyValue('--success').trim()};
    --font-main: ${computedStyle.getPropertyValue('--font-main').trim()};
    --radius-md: ${computedStyle.getPropertyValue('--radius-md').trim()};
}`;
        
        cssOutput.textContent = css;
    }
    
    function applyCustomization() {
        // In a real application, this would save to localStorage or a backend
        showNotification('Customization saved!', 'success');
    }
    
    function resetCustomization() {
        // Reset to default values
        if (primaryColor) primaryColor.value = '#4361ee';
        if (primaryColorText) primaryColorText.value = '#4361ee';
        if (secondaryColor) secondaryColor.value = '#f72585';
        if (secondaryColorText) secondaryColorText.value = '#f72585';
        if (successColor) successColor.value = '#4cc9f0';
        if (successColorText) successColorText.value = '#4cc9f0';
        if (fontFamily) fontFamily.value = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        if (borderRadius) borderRadius.value = '8';
        if (borderRadiusValue) borderRadiusValue.textContent = '8px';
        if (shadowIntensity) shadowIntensity.value = '15';
        if (shadowIntensityValue) shadowIntensityValue.textContent = 'Medium';
        
        // Reset CSS variables
        const root = document.documentElement;
        root.style.removeProperty('--primary');
        root.style.removeProperty('--primary-dark');
        root.style.removeProperty('--secondary');
        root.style.removeProperty('--success');
        root.style.removeProperty('--font-main');
        root.style.removeProperty('--radius-md');
        root.style.removeProperty('--radius-lg');
        root.style.removeProperty('--shadow-md');
        root.style.removeProperty('--shadow-lg');
        
        updateCssOutput();
    }
}

// ============================================
// Utility Functions
// ============================================

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function setupRippleEffect() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            // Style ripple
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            // Add ripple to button
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function setupTooltips() {
    // Simple tooltip implementation
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.cssText = `
                position: fixed;
                background: var(--dark);
                color: var(--white);
                padding: 4px 8px;
                border-radius: var(--radius-sm);
                font-size: 0.875rem;
                z-index: 10000;
                pointer-events: none;
                top: ${rect.top - 30}px;
                left: ${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px;
            `;
            
            this._tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.remove();
                this._tooltip = null;
            }
        });
    });
}

function showNotification(message, type = 'info') {
    // Create notification container if it doesn't exist
    let container = document.getElementById('notificationContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notificationContainer';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
            max-width: 400px;
        `;
        document.body.appendChild(container);
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `alert alert-${type}`;
    
    // Set icon based on type
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'warning') icon = 'exclamation-triangle';
    if (type === 'error') icon = 'times-circle';
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
        <button class="notification-close" style="margin-left: auto; background: none; border: none; cursor: pointer;">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    notification.style.cssText = `
        animation: slideIn 0.3s ease;
        box-shadow: var(--shadow-md);
    `;
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    container.appendChild(notification);
    
    // Add animation styles if not present
    if (!document.querySelector('#notification-animations')) {
        const style = document.createElement('style');
        style.id = 'notification-animations';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function darkenColor(color, percent) {
    // Simple color darkening function
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    
    return `#${(
        0x1000000 +
        (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)
    ).toString(16).slice(1)}`;
}

// ============================================
// Export for module usage (if needed)
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeComponents,
        showNotification,
        setupRippleEffect
    };
}