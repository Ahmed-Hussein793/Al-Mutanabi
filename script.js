document.addEventListener('DOMContentLoaded', function() {
    // ============= Mobile Menu =============
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');
    
    // Toggle menu on mobile button click
    mobileMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
    });
    
    // Close menu when any item is clicked
    navItems.forEach(item => {
            item.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('no-scroll');
            });
    });

    // ============= Image Slider =============
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('slider-dots');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    let currentSlide = 0;
    let slideInterval;
    let isHovering = false;

    // Create navigation dots
    function createDots() {
            slides.forEach((_, i) => {
                    const dot = document.createElement('div');
                    dot.classList.add('slider-dot');
                    dot.dataset.slide = i;
                    dot.addEventListener('click', goToSlide);
                    dotsContainer.appendChild(dot);
            });
    }

    // Go to a specific slide
    function goToSlide(e) {
            const slideIndex = typeof e === 'number' ? e : parseInt(this.dataset.slide);
            slides[currentSlide].classList.remove('active');
            dotsContainer.children[currentSlide].classList.remove('active');
            
            currentSlide = (slideIndex + slides.length) % slides.length;
            
            slides[currentSlide].classList.add('active');
            dotsContainer.children[currentSlide].classList.add('active');
    }

    // Next slide
    function nextSlide() {
            goToSlide(currentSlide + 1);
            resetInterval();
    }

    // Previous slide
    function prevSlide() {
            goToSlide(currentSlide - 1);
            resetInterval();
    }

    // Reset auto interval
    function resetInterval() {
            clearInterval(slideInterval);
            if (!isHovering) {
                    startSlideInterval();
            }
    }

    // Start auto play
    function startSlideInterval() {
            slideInterval = setInterval(nextSlide, 5000);
    }

    // Initialize slider
    function initSlider() {
            createDots();
            slides[0].classList.add('active');
            dotsContainer.children[0].classList.add('active');
            
            // Button events
            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);
            
            // Pause auto play on hover
            const slider = document.querySelector('.hero-slider');
            slider.addEventListener('mouseenter', () => {
                    isHovering = true;
                    clearInterval(slideInterval);
            });
            
            slider.addEventListener('mouseleave', () => {
                    isHovering = false;
                    startSlideInterval();
            });
            
            // Start auto play
            startSlideInterval();
            
            // Enable swipe navigation on mobile devices
            setupTouchEvents(slider);
    }

    // ============= Form Handling =============
    const admissionForm = document.getElementById('admission-form');
    if (admissionForm) {
            admissionForm.addEventListener('submit', async function(e) {
                    e.preventDefault();
                    
                    const submitBtn = this.querySelector('button[type="submit"]');
                    const btnText = submitBtn.querySelector('.btn-text');
                    const btnLoader = submitBtn.querySelector('.btn-loader');
                    const formResponse = document.getElementById('form-response');
                    
                    // Show loading state
                    submitBtn.disabled = true;
                    btnText.style.opacity = '0';
                    btnLoader.style.display = 'block';
                    
                    try {
                            // Here you can add actual form submission code
                            // e.g., using fetch or axios
                            await new Promise(resolve => setTimeout(resolve, 1500));
                            
                            // Show success message
                            showFormResponse('success', 'Your request has been sent successfully! We will contact you soon.');
                            
                            // Reset form
                            this.reset();
                    } catch (error) {
                            // Show error message
                            showFormResponse('error', 'An error occurred while submitting the form. Please try again.');
                    } finally {
                            // Reset button state
                            submitBtn.disabled = false;
                            btnText.style.opacity = '1';
                            btnLoader.style.display = 'none';
                    }
            });
    }

    // Show form message
    function showFormResponse(type, message) {
            const formResponse = document.getElementById('form-response');
            const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
            
            formResponse.innerHTML = `
                    <div class="${type}-message">
                            <i class="fas ${icon}"></i>
                            <p>${message}</p>
                    </div>
            `;
            formResponse.style.display = 'block';
            
            // Hide message after 5 seconds
            setTimeout(() => {
                    formResponse.style.display = 'none';
            }, 5000);
    }

    // ============= Smooth Scrolling =============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                            window.scrollTo({
                                    top: targetElement.offsetTop - 70,
                                    behavior: 'smooth'
                            });
                    }
            });
    });

    // ============= Reveal Elements on Scroll =============
    const animateOnScroll = () => {
            const sections = document.querySelectorAll('.section');
            const windowHeight = window.innerHeight;
            
            sections.forEach(section => {
                    const sectionTop = section.getBoundingClientRect().top;
                    const sectionVisible = 100;
                    
                    if (sectionTop < windowHeight - sectionVisible) {
                            section.classList.add('visible');
                    }
            });
    };

    // ============= Slider Touch Events =============
    function setupTouchEvents(slider) {
            let touchStartX = 0;
            let touchEndX = 0;
            
            slider.addEventListener('touchstart', e => {
                    touchStartX = e.changedTouches[0].screenX;
            }, {passive: true});
            
            slider.addEventListener('touchend', e => {
                    touchEndX = e.changedTouches[0].screenX;
                    handleSwipe();
            }, {passive: true});
            
            function handleSwipe() {
                    const threshold = 50;
                    if (touchEndX < touchStartX - threshold) {
                            nextSlide();
                    } else if (touchEndX > touchStartX + threshold) {
                            prevSlide();
                    }
            }
    }

    // ============= Initialize All Functions =============
    function init() {
            initSlider();
            animateOnScroll();
            
            // Recalculate on window resize
            window.addEventListener('resize', animateOnScroll);
            
            // Run on scroll
            window.addEventListener('scroll', animateOnScroll);
    }

    // Start
    init();
});
// Mobile slider alternative
if (window.innerWidth <= 1099) {
        const mobileCards = document.querySelectorAll('.mobile-hero-card');
        const dots = document.querySelectorAll('.mobile-hero-dot');
        let currentCard = 0;
        
        // Show only the first card initially
        mobileCards.forEach((card, index) => {
            card.style.display = index === 0 ? 'flex' : 'none';
        });
        
        // Change card on dot click
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showMobileCard(index);
            });
        });
        
        // Auto switch every 5 seconds
        setInterval(() => {
            currentCard = (currentCard + 1) % mobileCards.length;
            showMobileCard(currentCard);
        }, 5000);
        
        function showMobileCard(index) {
            mobileCards.forEach(card => {
                card.style.display = 'none';
            });
            
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            mobileCards[index].style.display = 'flex';
            dots[index].classList.add('active');
            currentCard = index;
        }
        
        // Enable swipe on touch screens
        let touchStartX = 0;
        let touchEndX = 0;
        
        const mobileHero = document.querySelector('.mobile-hero');
        
        mobileHero.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        mobileHero.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});
        
        function handleSwipe() {
            const threshold = 50;
            if (touchEndX < touchStartX - threshold) {
                // Swipe left - next
                currentCard = (currentCard + 1) % mobileCards.length;
            } else if (touchEndX > touchStartX + threshold) {
                // Swipe right - previous
                currentCard = (currentCard - 1 + mobileCards.length) % mobileCards.length;
            }
            showMobileCard(currentCard);
        }
    }