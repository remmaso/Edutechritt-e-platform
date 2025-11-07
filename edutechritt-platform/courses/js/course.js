// Course Page JavaScript
class CoursePage {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupCurriculumAccordion();
        this.setupInstructorModal();
        this.setupFAQ();
    }
    
    setupEventListeners() {
        // Enroll button
        const enrollBtn = document.getElementById('enroll-btn');
        if (enrollBtn) {
            enrollBtn.addEventListener('click', () => this.handleEnrollment());
        }
        
        // Add to cart button
        const addToCartBtn = document.getElementById('add-to-cart');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => this.handleAddToCart());
        }
        
        // Module tabs
        const moduleTabs = document.querySelectorAll('.module-tab');
        moduleTabs.forEach(tab => {
            tab.addEventListener('click', (e) => this.switchModule(e.target.dataset.module));
        });
        
        // Share buttons
        const shareButtons = document.querySelectorAll('.share-btn');
        shareButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleShare(e.target.dataset.platform));
        });
        
        // Certificate preview
        const certificateBtn = document.getElementById('preview-certificate');
        if (certificateBtn) {
            certificateBtn.addEventListener('click', () => this.showCertificatePreview());
        }
    }
    
    initializeAnimations() {
        // Scroll animations for course content
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
        
        const animatedElements = document.querySelectorAll('.course-section, .feature-card, .testimonial-card');
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    setupCurriculumAccordion() {
        const accordionItems = document.querySelectorAll('.accordion-item');
        
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            const icon = item.querySelector('.accordion-icon');
            
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all accordion items
                accordionItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-content').style.maxHeight = '0';
                    otherItem.querySelector('.accordion-icon').classList.remove('rotate-180');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + 'px';
                    icon.classList.add('rotate-180');
                }
            });
        });
    }
    
    setupInstructorModal() {
        const instructorBtns = document.querySelectorAll('.view-instructor-btn');
        const modal = document.getElementById('instructor-modal');
        const closeBtn = document.getElementById('close-instructor-modal');
        
        instructorBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const instructorId = e.target.dataset.instructorId;
                this.showInstructorModal(instructorId);
            });
        });
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.add('hidden');
            });
        }
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                }
            });
        }
    }
    
    setupFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                    otherItem.querySelector('.faq-icon').classList.remove('rotate-180');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    icon.classList.add('rotate-180');
                }
            });
        });
    }
    
    handleEnrollment() {
        // Check if user is logged in
        const currentUser = localStorage.getItem('currentUser');
        
        if (!currentUser) {
            this.showToast('Please login to enroll in this course', 'info');
            // Redirect to main page for login
            window.location.href = '../index.html#login';
            return;
        }
        
        // Simulate enrollment process
        const enrollBtn = document.getElementById('enroll-btn');
        const originalText = enrollBtn.textContent;
        
        enrollBtn.textContent = 'Processing...';
        enrollBtn.disabled = true;
        
        setTimeout(() => {
            enrollBtn.textContent = 'Enrolled Successfully ✓';
            enrollBtn.classList.remove('bg-indigo-600', 'hover:bg-indigo-700');
            enrollBtn.classList.add('bg-green-600');
            
            this.showToast('Successfully enrolled in the course!', 'success');
            
            // Update enrolled courses in localStorage
            const user = JSON.parse(currentUser);
            const enrolledCourses = user.enrolledCourses || [];
            enrolledCourses.push(window.location.pathname);
            user.enrolledCourses = enrolledCourses;
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                window.location.href = '../index.html#dashboard';
            }, 2000);
        }, 2000);
    }
    
    handleAddToCart() {
        // Similar to enrollment but adds to cart
        const addToCartBtn = document.getElementById('add-to-cart');
        const originalText = addToCartBtn.textContent;
        
        addToCartBtn.textContent = 'Adding to Cart...';
        addToCartBtn.disabled = true;
        
        setTimeout(() => {
            addToCartBtn.textContent = 'Added to Cart ✓';
            addToCartBtn.classList.remove('bg-orange-600', 'hover:bg-orange-700');
            addToCartBtn.classList.add('bg-green-600');
            
            this.showToast('Course added to cart!', 'success');
            
            // Update cart in localStorage
            let cart = JSON.parse(localStorage.getItem('cart') || '[]');
            cart.push(window.location.pathname);
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Reset button after 2 seconds
            setTimeout(() => {
                addToCartBtn.textContent = originalText;
                addToCartBtn.disabled = false;
                addToCartBtn.classList.remove('bg-green-600');
                addToCartBtn.classList.add('bg-orange-600', 'hover:bg-orange-700');
            }, 2000);
        }, 1500);
    }
    
    switchModule(moduleId) {
        // Hide all module content
        const allContents = document.querySelectorAll('.module-content');
        allContents.forEach(content => {
            content.classList.add('hidden');
        });
        
        // Remove active class from all tabs
        const allTabs = document.querySelectorAll('.module-tab');
        allTabs.forEach(tab => {
            tab.classList.remove('bg-indigo-600', 'text-white');
            tab.classList.add('bg-gray-200', 'text-gray-700');
        });
        
        // Show selected module content
        const selectedContent = document.getElementById(`module-${moduleId}`);
        if (selectedContent) {
            selectedContent.classList.remove('hidden');
        }
        
        // Add active class to selected tab
        const selectedTab = document.querySelector(`[data-module="${moduleId}"]`);
        if (selectedTab) {
            selectedTab.classList.remove('bg-gray-200', 'text-gray-700');
            selectedTab.classList.add('bg-indigo-600', 'text-white');
        }
    }
    
    handleShare(platform) {
        const url = window.location.href;
        const title = document.title;
        
        let shareUrl = '';
        
        switch(platform) {
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                break;
            case 'email':
                shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this course: ${url}`)}`;
                break;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
            this.showToast('Share window opened', 'success');
        }
    }
    
    showInstructorModal(instructorId) {
        // Show instructor details modal
        const modal = document.getElementById('instructor-modal');
        if (modal) {
            modal.classList.remove('hidden');
            // Load instructor details based on ID
            this.loadInstructorDetails(instructorId);
        }
    }
    
    loadInstructorDetails(instructorId) {
        // Load instructor details (in real app, this would be an API call)
        const instructorDetails = document.getElementById('instructor-details');
        if (instructorDetails) {
            // Static content for demo
            instructorDetails.innerHTML = `
                <div class="text-center">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80" 
                         alt="Instructor" class="w-32 h-32 rounded-full mx-auto mb-4">
                    <h3 class="text-2xl font-bold text-gray-800 mb-2">Dr. John Smith</h3>
                    <p class="text-gray-600 mb-4">Senior AI Research Scientist</p>
                    <p class="text-gray-700 mb-6">15+ years of experience in AI and machine learning with publications in top-tier conferences and industry experience at leading tech companies.</p>
                    <div class="flex justify-center space-x-4">
                        <span class="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">PhD in AI</span>
                        <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">50+ Publications</span>
                        <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Industry Expert</span>
                    </div>
                </div>
            `;
        }
    }
    
    showCertificatePreview() {
        // Show certificate preview modal
        const modal = document.getElementById('certificate-modal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }
    
    showToast(message, type = 'success') {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg transform transition-transform z-50`;
        
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
        
        toast.innerHTML = `
            <div class="flex items-center space-x-3">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.classList.remove('translate-y-full');
        }, 100);
        
        // Hide after 3 seconds
        setTimeout(() => {
            toast.classList.add('translate-y-full');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
}

// Initialize course page when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CoursePage();
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Initialize video player if present
    const videoPlayer = document.getElementById('course-video');
    if (videoPlayer) {
        videoPlayer.addEventListener('play', () => {
            console.log('Video started playing');
        });
    }
    
    console.log('Course page initialized successfully!');
});

// Add CSS for animations
const courseStyles = document.createElement('style');
courseStyles.textContent = `
    .course-section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .animate-fade-in-up {
        opacity: 1;
        transform: translateY(0);
    }
    
    .accordion-content {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-out;
    }
    
    .accordion-item.active .accordion-content {
        max-height: 500px;
    }
    
    .accordion-icon {
        transition: transform 0.3s ease;
    }
    
    .accordion-icon.rotate-180 {
        transform: rotate(180deg);
    }
    
    .faq-answer {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-out;
    }
    
    .faq-item.active .faq-answer {
        max-height: 300px;
    }
    
    .feature-card {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease-out;
    }
    
    .testimonial-card {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease-out;
    }
    
    @media (max-width: 768px) {
        .course-section {
            padding: 2rem 1rem;
        }
    }
`;
document.head.appendChild(courseStyles);