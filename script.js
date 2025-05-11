document.addEventListener('DOMContentLoaded', function() {
  // ============= القائمة المتنقلة =============
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-links li a');
  
  // تفعيل/إلغاء القائمة عند النقر على زر الهاتف
  mobileMenu.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
  });
  
  // إغلاق القائمة عند النقر على أي عنصر
  navItems.forEach(item => {
      item.addEventListener('click', () => {
          mobileMenu.classList.remove('active');
          navLinks.classList.remove('active');
          document.body.classList.remove('no-scroll');
      });
  });

  // ============= سلايدر الصور =============
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.getElementById('slider-dots');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  let currentSlide = 0;
  let slideInterval;
  let isHovering = false;

  // إنشاء نقاط التوجيه
  function createDots() {
      slides.forEach((_, i) => {
          const dot = document.createElement('div');
          dot.classList.add('slider-dot');
          dot.dataset.slide = i;
          dot.addEventListener('click', goToSlide);
          dotsContainer.appendChild(dot);
      });
  }

  // الانتقال لشريحة محددة
  function goToSlide(e) {
      const slideIndex = typeof e === 'number' ? e : parseInt(this.dataset.slide);
      slides[currentSlide].classList.remove('active');
      dotsContainer.children[currentSlide].classList.remove('active');
      
      currentSlide = (slideIndex + slides.length) % slides.length;
      
      slides[currentSlide].classList.add('active');
      dotsContainer.children[currentSlide].classList.add('active');
  }

  // الشريحة التالية
  function nextSlide() {
      goToSlide(currentSlide + 1);
      resetInterval();
  }

  // الشريحة السابقة
  function prevSlide() {
      goToSlide(currentSlide - 1);
      resetInterval();
  }

  // إعادة تعيين المؤقت التلقائي
  function resetInterval() {
      clearInterval(slideInterval);
      if (!isHovering) {
          startSlideInterval();
      }
  }

  // بدء التشغيل التلقائي
  function startSlideInterval() {
      slideInterval = setInterval(nextSlide, 5000);
  }

  // تهيئة السلايدر
  function initSlider() {
      createDots();
      slides[0].classList.add('active');
      dotsContainer.children[0].classList.add('active');
      
      // أحداث الأزرار
      nextBtn.addEventListener('click', nextSlide);
      prevBtn.addEventListener('click', prevSlide);
      
      // إيقاف التمرير عند التواجد فوق السلايدر
      const slider = document.querySelector('.hero-slider');
      slider.addEventListener('mouseenter', () => {
          isHovering = true;
          clearInterval(slideInterval);
      });
      
      slider.addEventListener('mouseleave', () => {
          isHovering = false;
          startSlideInterval();
      });
      
      // بدء التشغيل التلقائي
      startSlideInterval();
      
      // إمكانية التنقل بالسحب على الأجهزة المحمولة
      setupTouchEvents(slider);
  }

  // ============= إدارة النماذج =============
  const admissionForm = document.getElementById('admission-form');
  if (admissionForm) {
      admissionForm.addEventListener('submit', async function(e) {
          e.preventDefault();
          
          const submitBtn = this.querySelector('button[type="submit"]');
          const btnText = submitBtn.querySelector('.btn-text');
          const btnLoader = submitBtn.querySelector('.btn-loader');
          const formResponse = document.getElementById('form-response');
          
          // عرض حالة التحميل
          submitBtn.disabled = true;
          btnText.style.opacity = '0';
          btnLoader.style.display = 'block';
          
          try {
              // هنا يمكنك إضافة كود إرسال النموذج الفعلي
              // مثل استخدام fetch أو axios
              await new Promise(resolve => setTimeout(resolve, 1500));
              
              // عرض رسالة النجاح
              showFormResponse('success', 'تم إرسال طلبك بنجاح! سنتواصل معك قريباً.');
              
              // إعادة تعيين النموذج
              this.reset();
          } catch (error) {
              // عرض رسالة الخطأ
              showFormResponse('error', 'حدث خطأ أثناء إرسال النموذج. يرجى المحاولة مرة أخرى.');
          } finally {
              // إعادة تعيين حالة الزر
              submitBtn.disabled = false;
              btnText.style.opacity = '1';
              btnLoader.style.display = 'none';
          }
      });
  }

  // عرض رسالة النموذج
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
      
      // إخفاء الرسالة بعد 5 ثواني
      setTimeout(() => {
          formResponse.style.display = 'none';
      }, 5000);
  }

  // ============= التمرير السلس =============
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

  // ============= ظهور العناصر عند التمرير =============
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

  // ============= أحداث اللمس للسلايدر =============
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

  // ============= تهيئة جميع الوظائف =============
  function init() {
      initSlider();
      animateOnScroll();
      
      // إعادة حساب عند تغيير حجم النافذة
      window.addEventListener('resize', animateOnScroll);
      
      // تشغيل عند التمرير
      window.addEventListener('scroll', animateOnScroll);
  }

  // بدء التشغيل
  init();
});
// بديل السلايدر للهواتف
if (window.innerWidth <= 1099) {
    const mobileCards = document.querySelectorAll('.mobile-hero-card');
    const dots = document.querySelectorAll('.mobile-hero-dot');
    let currentCard = 0;
    
    // عرض البطاقة الأولى فقط في البداية
    mobileCards.forEach((card, index) => {
      card.style.display = index === 0 ? 'flex' : 'none';
    });
    
    // تغيير البطاقة عند النقر على النقاط
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showMobileCard(index);
      });
    });
    
    // التبديل التلقائي كل 5 ثواني
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
    
    // إمكانية السحب على الشاشات التي تعمل باللمس
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
        // سحب لليسار - التالي
        currentCard = (currentCard + 1) % mobileCards.length;
      } else if (touchEndX > touchStartX + threshold) {
        // سحب لليمين - السابق
        currentCard = (currentCard - 1 + mobileCards.length) % mobileCards.length;
      }
      showMobileCard(currentCard);
    }
  }