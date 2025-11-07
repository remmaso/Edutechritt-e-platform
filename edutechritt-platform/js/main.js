// Authentication and User Management
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.init();
    }
    
    init() {
        // Check if user is logged in
        this.checkAuthStatus();
        
        // Setup event listeners
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Login/Register buttons
        document.getElementById('login-btn')?.addEventListener('click', () => this.showLoginModal());
        document.getElementById('register-btn')?.addEventListener('click', () => this.showRegisterModal());
        document.getElementById('mobile-login-btn')?.addEventListener('click', () => this.showLoginModal());
        document.getElementById('mobile-register-btn')?.addEventListener('click', () => this.showRegisterModal());
        
        // Dashboard/Logout buttons
        document.getElementById('dashboard-btn')?.addEventListener('click', () => this.showDashboard());
        document.getElementById('logout-btn')?.addEventListener('click', () => this.logout());
        document.getElementById('mobile-dashboard-btn')?.addEventListener('click', () => this.showDashboard());
        document.getElementById('mobile-logout-btn')?.addEventListener('click', () => this.logout());
        
        // Modal close buttons
        document.getElementById('close-login')?.addEventListener('click', () => this.hideLoginModal());
        document.getElementById('close-register')?.addEventListener('click', () => this.hideRegisterModal());
        
        // Switch between login/register
        document.getElementById('switch-to-register')?.addEventListener('click', () => {
            this.hideLoginModal();
            this.showRegisterModal();
        });
        
        document.getElementById('switch-to-login')?.addEventListener('click', () => {
            this.hideRegisterModal();
            this.showLoginModal();
        });
        
        // Form submissions
        document.getElementById('login-form')?.addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('register-form')?.addEventListener('submit', (e) => this.handleRegister(e));
        
        // Password visibility toggles
        document.getElementById('toggle-login-password')?.addEventListener('click', () => this.togglePassword('login-password'));
        document.getElementById('toggle-register-password')?.addEventListener('click', () => this.togglePassword('register-password'));
        document.getElementById('toggle-register-confirm-password')?.addEventListener('click', () => this.togglePassword('register-confirm-password'));
        
        // Close modals on outside click
        document.getElementById('login-modal')?.addEventListener('click', (e) => {
            if (e.target.id === 'login-modal') this.hideLoginModal();
        });
        
        document.getElementById('register-modal')?.addEventListener('click', (e) => {
            if (e.target.id === 'register-modal') this.hideRegisterModal();
        });
    }
    
    showLoginModal() {
        document.getElementById('login-modal').classList.remove('hidden');
        document.getElementById('login-modal').classList.add('flex');
        document.body.style.overflow = 'hidden';
    }
    
    hideLoginModal() {
        document.getElementById('login-modal').classList.add('hidden');
        document.getElementById('login-modal').classList.remove('flex');
        document.body.style.overflow = 'auto';
        this.clearForm('login-form');
    }
    
    showRegisterModal() {
        document.getElementById('register-modal').classList.remove('hidden');
        document.getElementById('register-modal').classList.add('flex');
        document.body.style.overflow = 'hidden';
    }
    
    hideRegisterModal() {
        document.getElementById('register-modal').classList.add('hidden');
        document.getElementById('register-modal').classList.remove('flex');
        document.body.style.overflow = 'auto';
        this.clearForm('register-form');
    }
    
    togglePassword(fieldId) {
        const field = document.getElementById(fieldId);
        const icon = field.nextElementSibling.querySelector('i');
        
        if (field.type === 'password') {
            field.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            field.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }
    
    handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Validate form
        if (!this.validateLoginForm(email, password)) return;
        
        // Simulate login (in real app, this would be an API call)
        this.simulateLogin(email);
    }
    
    handleRegister(e) {
        e.preventDefault();
        
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        const agreeTerms = document.getElementById('agree-terms').checked;
        
        // Validate form
        if (!this.validateRegisterForm(name, email, password, confirmPassword, agreeTerms)) return;
        
        // Simulate registration (in real app, this would be an API call)
        this.simulateRegister(name, email);
    }
    
    validateLoginForm(email, password) {
        let isValid = true;
        
        // Email validation
        const emailError = document.getElementById('login-email-error');
        if (!this.isValidEmail(email)) {
            emailError.classList.remove('hidden');
            isValid = false;
        } else {
            emailError.classList.add('hidden');
        }
        
        // Password validation
        const passwordError = document.getElementById('login-password-error');
        if (!password) {
            passwordError.classList.remove('hidden');
            isValid = false;
        } else {
            passwordError.classList.add('hidden');
        }
        
        return isValid;
    }
    
    validateRegisterForm(name, email, password, confirmPassword, agreeTerms) {
        let isValid = true;
        
        // Name validation
        const nameError = document.getElementById('register-name-error');
        if (!name) {
            nameError.classList.remove('hidden');
            isValid = false;
        } else {
            nameError.classList.add('hidden');
        }
        
        // Email validation
        const emailError = document.getElementById('register-email-error');
        if (!this.isValidEmail(email)) {
            emailError.classList.remove('hidden');
            isValid = false;
        } else {
            emailError.classList.add('hidden');
        }
        
        // Password validation
        const passwordError = document.getElementById('register-password-error');
        if (password.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            passwordError.classList.remove('hidden');
            isValid = false;
        } else {
            passwordError.classList.add('hidden');
        }
        
        // Confirm password validation
        const confirmPasswordError = document.getElementById('register-confirm-password-error');
        if (password !== confirmPassword) {
            confirmPasswordError.classList.remove('hidden');
            isValid = false;
        } else {
            confirmPasswordError.classList.add('hidden');
        }
        
        // Terms validation
        if (!agreeTerms) {
            this.showToast('Please agree to the terms and conditions', 'error');
            isValid = false;
        }
        
        return isValid;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    simulateLogin(email) {
        // Simulate API call
        setTimeout(() => {
            this.currentUser = {
                email: email,
                name: email.split('@')[0],
                id: Date.now()
            };
            
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.updateUI();
            this.hideLoginModal();
            this.showToast('Login successful! Welcome back!', 'success');
        }, 1000);
    }
    
    simulateRegister(name, email) {
        // Simulate API call
        setTimeout(() => {
            this.currentUser = {
                email: email,
                name: name,
                id: Date.now()
            };
            
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.updateUI();
            this.hideRegisterModal();
            this.showToast('Account created successfully! Welcome to EduTechRitt AI!', 'success');
        }, 1000);
    }
    
    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.updateUI();
        this.hideDashboard();
        this.showToast('Logged out successfully', 'info');
    }
    
    checkAuthStatus() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateUI();
        }
    }
    
    updateUI() {
        const isLoggedIn = this.currentUser !== null;
        
        // Update navigation buttons
        const loginBtn = document.getElementById('login-btn');
        const registerBtn = document.getElementById('register-btn');
        const dashboardBtn = document.getElementById('dashboard-btn');
        const logoutBtn = document.getElementById('logout-btn');
        
        const mobileLoginBtn = document.getElementById('mobile-login-btn');
        const mobileRegisterBtn = document.getElementById('mobile-register-btn');
        const mobileDashboardBtn = document.getElementById('mobile-dashboard-btn');
        const mobileLogoutBtn = document.getElementById('mobile-logout-btn');
        
        if (isLoggedIn) {
            loginBtn?.classList.add('hidden');
            registerBtn?.classList.add('hidden');
            dashboardBtn?.classList.remove('hidden');
            logoutBtn?.classList.remove('hidden');
            
            mobileLoginBtn?.classList.add('hidden');
            mobileRegisterBtn?.classList.add('hidden');
            mobileDashboardBtn?.classList.remove('hidden');
            mobileLogoutBtn?.classList.remove('hidden');
        } else {
            loginBtn?.classList.remove('hidden');
            registerBtn?.classList.remove('hidden');
            dashboardBtn?.classList.add('hidden');
            logoutBtn?.classList.add('hidden');
            
            mobileLoginBtn?.classList.remove('hidden');
            mobileRegisterBtn?.classList.remove('hidden');
            mobileDashboardBtn?.classList.add('hidden');
            mobileLogoutBtn?.classList.add('hidden');
        }
    }
    
    showDashboard() {
        document.getElementById('dashboard').classList.remove('hidden');
        document.getElementById('home').classList.add('hidden');
        document.getElementById('courses').classList.add('hidden');
        document.getElementById('features').classList.add('hidden');
        document.getElementById('testimonials').classList.add('hidden');
        document.getElementById('contact').classList.add('hidden');
        
        // Update user name in dashboard
        if (this.currentUser) {
            document.getElementById('user-name').textContent = this.currentUser.name;
        }
        
        window.scrollTo(0, 0);
    }
    
    hideDashboard() {
        document.getElementById('dashboard').classList.add('hidden');
        document.getElementById('home').classList.remove('hidden');
        document.getElementById('courses').classList.remove('hidden');
        document.getElementById('features').classList.remove('hidden');
        document.getElementById('testimonials').classList.remove('hidden');
        document.getElementById('contact').classList.remove('hidden');
    }
    
    clearForm(formId) {
        document.getElementById(formId).reset();
        // Hide all error messages
        const errors = document.querySelectorAll(`#${formId} .text-red-500`);
        errors.forEach(error => error.classList.add('hidden'));
    }
    
    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toast-message');
        
        toastMessage.textContent = message;
        
        // Update toast color based on type
        toast.className = 'fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg transform transition-transform z-50';
        
        switch(type) {
            case 'success':
                toast.classList.add('bg-green-600', 'text-white');
                break;
            case 'error':
                toast.classList.add('bg-red-600', 'text-white');
                break;
            case 'info':
                toast.classList.add('bg-blue-600', 'text-white');
                break;
        }
        
        // Show toast
        toast.classList.remove('translate-y-full');
        
        // Hide after 3 seconds
        setTimeout(() => {
            toast.classList.add('translate-y-full');
        }, 3000);
    }
}

// Enhanced Carousel functionality
class Carousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.carousel-item');
        this.dots = document.querySelectorAll('.carousel-dot');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.autoplayInterval = null;
        this.autoplayDelay = 5000; // 5 seconds
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) return;
        
        // Show first slide
        this.showSlide(0);
        
        // Start autoplay
        this.startAutoplay();
        
        // Add event listeners
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
        
        // Dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Pause autoplay on hover
        const carousel = document.getElementById('carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => this.stopAutoplay());
            carousel.addEventListener('mouseleave', () => this.startAutoplay());
            
            // Touch/swipe support for mobile
            this.addTouchSupport(carousel);
        }
        
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
    }
    
    showSlide(index) {
        // Hide all slides
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.dots.forEach(dot => {
            dot.classList.remove('bg-indigo-600', 'w-8');
            dot.classList.add('bg-gray-300', 'w-3');
        });
        
        // Show current slide
        this.slides[index].classList.add('active');
        if (this.dots[index]) {
            this.dots[index].classList.remove('bg-gray-300', 'w-3');
            this.dots[index].classList.add('bg-indigo-600', 'w-8');
        }
        
        this.currentSlide = index;
        
        // Add animation to slide content
        const activeSlide = this.slides[index];
        const slideContent = activeSlide.querySelector('.grid');
        if (slideContent) {
            slideContent.classList.add('animate-fade-in-up');
            setTimeout(() => {
                slideContent.classList.remove('animate-fade-in-up');
            }, 600);
        }
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(nextIndex);
        this.resetAutoplay();
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prevIndex);
        this.resetAutoplay();
    }
    
    goToSlide(index) {
        this.showSlide(index);
        this.resetAutoplay();
    }
    
    startAutoplay() {
        this.stopAutoplay(); // Clear any existing interval
        if (this.slides.length > 1) {
            this.autoplayInterval = setInterval(() => this.nextSlide(), this.autoplayDelay);
        }
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
    
    resetAutoplay() {
        this.stopAutoplay();
        this.startAutoplay();
    }
    
    addTouchSupport(carousel) {
        let startX = 0;
        let endX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        });
    }
    
    handleSwipe(startX, endX) {
        const threshold = 50; // Minimum swipe distance
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.nextSlide(); // Swipe left, go to next
            } else {
                this.prevSlide(); // Swipe right, go to previous
            }
        }
    }
}

// Mobile menu functionality
class MobileMenu {
    constructor() {
        this.menuBtn = document.getElementById('mobile-menu-btn');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        if (this.menuBtn) {
            this.menuBtn.addEventListener('click', () => this.toggleMenu());
            
            // Close menu when clicking on links
            const menuLinks = this.mobileMenu?.querySelectorAll('a');
            menuLinks?.forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });
        }
    }
    
    toggleMenu() {
        this.isOpen = !this.isOpen;
        this.mobileMenu?.classList.toggle('hidden');
        
        // Animate hamburger menu
        const icon = this.menuBtn?.querySelector('i');
        if (icon) {
            if (this.isOpen) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    }
    
    closeMenu() {
        this.isOpen = false;
        this.mobileMenu?.classList.add('hidden');
        const icon = this.menuBtn?.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
}

// Smooth scrolling for navigation links
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#dashboard') return; // Skip dashboard link
                
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Enhanced Button interactions
class ButtonInteractions {
    constructor() {
        this.init();
    }
    
    init() {
        // Add ripple effect to buttons
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => this.createRipple(e));
        });
        
        // Add hover effects to cards
        const cards = document.querySelectorAll('.hover-lift, .border-gray-200');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-2px)';
                card.style.transition = 'all 0.3s ease';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }
    
    createRipple(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        // Add ripple styles if not already present
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                button {
                    position: relative;
                    overflow: hidden;
                }
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.5);
                    transform: scale(0);
                    animation: ripple-animation 0.6s ease-out;
                    pointer-events: none;
                }
                @keyframes ripple-animation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Course Enrollment System
class CourseEnrollment {
    constructor(authManager) {
        this.authManager = authManager;
        this.init();
    }
    
    init() {
        // Add enrollment buttons to carousel courses
        this.addEnrollmentButtons();
        
        // Setup course enrollment handlers
        this.setupEnrollmentHandlers();
    }
    
    addEnrollmentButtons() {
        const enrollButtons = document.querySelectorAll('button');
        enrollButtons.forEach(button => {
            if (button.textContent.includes('Enroll Now')) {
                button.addEventListener('click', (e) => this.handleEnrollment(e));
            }
        });
    }
    
    setupEnrollmentHandlers() {
        // Dashboard enroll buttons
        const dashboardEnrollButtons = document.querySelectorAll('#dashboard button');
        dashboardEnrollButtons.forEach(button => {
            if (button.textContent.includes('Enroll Now')) {
                button.addEventListener('click', (e) => this.handleEnrollment(e));
            }
        });
    }
    
    handleEnrollment(e) {
        e.preventDefault();
        
        if (!this.authManager.currentUser) {
            this.authManager.showToast('Please login to enroll in courses', 'info');
            this.authManager.showLoginModal();
            return;
        }
        
        // Simulate course enrollment
        const button = e.target;
        const originalText = button.textContent;
        
        button.textContent = 'Enrolling...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = 'Enrolled ✓';
            button.classList.remove('bg-indigo-600', 'hover:bg-indigo-700');
            button.classList.add('bg-green-600');
            this.authManager.showToast('Successfully enrolled in course!', 'success');
            
            // Reset button after 2 seconds
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.classList.remove('bg-green-600');
                button.classList.add('bg-indigo-600', 'hover:bg-indigo-700');
            }, 2000);
        }, 1500);
    }
}

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const authManager = new AuthManager();
    const carousel = new Carousel();
    const mobileMenu = new MobileMenu();
    const smoothScroll = new SmoothScroll();
    const buttonInteractions = new ButtonInteractions();
    const courseEnrollment = new CourseEnrollment(authManager);
    
    // Add loading animation
    document.body.classList.add('loaded');
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animatedElements = document.querySelectorAll('.hover-lift, .bg-white.p-8');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Log initialization
    console.log('EduTechRitt AI Enhanced Platform initialized successfully!');
});

// Add loading styles
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease-in;
    }
    body.loaded {
        opacity: 1;
    }
    
    .carousel-dot {
        transition: all 0.3s ease;
    }
    
    @media (max-width: 768px) {
        #dashboard {
            padding-top: 80px;
        }
    }
`;
document.head.appendChild(loadingStyles);