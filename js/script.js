// COWebs Template Store - Enhanced Animations JavaScript

// Simplified and optimized animations
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect with shrinking
    const header = document.getElementById('header');

    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('shadow-xl', 'shrunk');
            } else {
                header.classList.remove('shadow-xl', 'shrunk');
            }
        });
    }

    // Hamburger menu functionality
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Prevent immediate close by global click handler
            hamburger.classList.toggle('open');
            mobileNav.classList.toggle('open');

            // Prevent body scroll when mobile menu is open
            document.body.classList.toggle('overflow-hidden');
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('open');
                mobileNav.classList.remove('open');
                document.body.classList.remove('overflow-hidden');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !mobileNav.contains(event.target)) {
                hamburger.classList.remove('open');
                mobileNav.classList.remove('open');
                document.body.classList.remove('overflow-hidden');
            }
        });
    }
    
    // Enhanced animation on scroll with stagger effect
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Smooth scroll for anchor links
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
    
    // Add subtle mouse movement parallax to template cards
    const templateCards = document.querySelectorAll('.template-card');
    
    templateCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add subtle mouse movement parallax to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Performance optimization - throttle scroll events
    let ticking = false;
    
    function updateScrollEffects() {
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });

    // Template filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const templateCardsFilter = document.querySelectorAll('.template-card');

    if (filterButtons.length > 0 && templateCardsFilter.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button styling
                filterButtons.forEach(btn => {
                    btn.classList.remove('bg-gradient-to-r', 'from-primary-600', 'to-primary-700', 'text-white', 'shadow-xl');
                    btn.classList.add('bg-gray-100', 'text-gray-700', 'shadow-md');
                    btn.classList.remove('hover:shadow-2xl', 'transform', 'hover:-translate-y-1', 'hover:scale-105');
                });
                this.classList.remove('bg-gray-100', 'text-gray-700', 'shadow-md');
                this.classList.add('bg-gradient-to-r', 'from-primary-600', 'to-primary-700', 'text-white', 'shadow-xl', 'hover:shadow-2xl', 'transform', 'hover:-translate-y-1', 'hover:scale-105');
                
                // Filter templates
                templateCardsFilter.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Sticky CTA button visibility on scroll
    const stickyCTA = document.querySelector('.sticky-cta');
    if (stickyCTA) {
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop && scrollTop > 500) {
                // Scrolling down - show sticky CTA
                stickyCTA.style.transform = 'translateY(0)';
            } else if (scrollTop < lastScrollTop || scrollTop < 500) {
                // Scrolling up or near top - hide sticky CTA
                stickyCTA.style.transform = 'translateY(100%)';
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, { passive: true });
        
        // Initialize sticky CTA position
        stickyCTA.style.transition = 'transform 0.3s ease';
        stickyCTA.style.transform = 'translateY(100%)';
    }
    
    // Image preview carousel functionality (if images are added later)
    const imageCarousel = document.querySelector('.image-carousel');
    if (imageCarousel) {
        const images = imageCarousel.querySelectorAll('img');
        let currentIndex = 0;
        
        const showImage = (index) => {
            images.forEach((img, i) => {
                img.style.display = i === index ? 'block' : 'none';
            });
        };
        
        // Auto-rotate images every 5 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }, 5000);
        
        showImage(0);
    }
});

// Enhanced WhatsApp function
function openWhatsApp(message = '') {
    const phone = '+96181796383';
    const encodedMessage = encodeURIComponent(message || 'Hello! I\'m interested in your website templates.');
    
    // Show loading state for buttons
    const whatsappBtns = document.querySelectorAll('[onclick*="openWhatsApp"]');
    whatsappBtns.forEach(btn => {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fab fa-whatsapp fa-spin mr-2"></i>Opening WhatsApp...';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
        }, 2000);
    });
    
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
}

// Add some Easter eggs for developers
console.log('🚀 COWebs Template Store - Premium Website Templates!');
console.log('💻 Built with modern web technologies and lots of coffee ☕');

// Add keyboard shortcuts for power users
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        const contactLink = document.querySelector('a[href*="contact"]');
        if (contactLink) contactLink.click();
    }
});

