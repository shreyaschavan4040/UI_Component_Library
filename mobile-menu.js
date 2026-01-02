// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;
    
    if (mobileMenuBtn && mainNav) {
        // Toggle menu when button is clicked
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Toggle active class on nav
            mainNav.classList.toggle('active');
            
            // Change icon
            const icon = this.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.className = 'fas fa-times';
                this.setAttribute('aria-expanded', 'true');
                body.style.overflow = 'hidden'; // Prevent scrolling
            } else {
                icon.className = 'fas fa-bars';
                this.setAttribute('aria-expanded', 'false');
                body.style.overflow = ''; // Restore scrolling
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                body.style.overflow = ''; // Restore scrolling
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (mainNav.classList.contains('active') && 
                !event.target.closest('.main-nav') && 
                !event.target.closest('.mobile-menu-btn')) {
                mainNav.classList.remove('active');
                mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                body.style.overflow = ''; // Restore scrolling
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                body.style.overflow = ''; // Restore scrolling
            }
        });
    }
});