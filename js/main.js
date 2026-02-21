/* ============================================
   Efe Temizlik - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // Navbar Scroll Effect
    // ============================================
    var navbar = document.getElementById('navbar');
    var backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
    });

    // ============================================
    // Mobile Navigation Toggle
    // ============================================
    var navToggle = document.getElementById('navToggle');
    var navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    var navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ============================================
    // Active Nav Link on Scroll
    // ============================================
    function updateActiveNavLink() {
        var sections = document.querySelectorAll('section[id]');
        var scrollPos = window.scrollY + 100;

        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ============================================
    // Back to Top
    // ============================================
    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============================================
    // Counter Animation
    // ============================================
    var counters = document.querySelectorAll('.stat-number');
    var countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        counters.forEach(function (counter) {
            var target = parseInt(counter.getAttribute('data-target'));
            var duration = 2000;
            var startTime = null;

            function updateCounter(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = Math.min((timestamp - startTime) / duration, 1);
                var easeProgress = 1 - Math.pow(1 - progress, 3);
                counter.textContent = Math.floor(easeProgress * target);

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            }

            requestAnimationFrame(updateCounter);
        });

        countersAnimated = true;
    }

    // Trigger counter animation when hero section is visible
    var heroObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    var heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        heroObserver.observe(heroStats);
    }

    // ============================================
    // Scroll Reveal Animations
    // ============================================
    var revealElements = document.querySelectorAll(
        '.service-card, .about-feature, .pricing-card, .gallery-item, .faq-item, .contact-item'
    );

    revealElements.forEach(function (el) {
        el.classList.add('reveal');
    });

    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(function (el) {
        revealObserver.observe(el);
    });

    // ============================================
    // Gallery Filter
    // ============================================
    var filterBtns = document.querySelectorAll('.filter-btn');
    var galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var filter = this.getAttribute('data-filter');

            filterBtns.forEach(function (b) { b.classList.remove('active'); });
            this.classList.add('active');

            galleryItems.forEach(function (item) {
                var category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.display = '';
                } else {
                    item.classList.add('hidden');
                    item.style.display = 'none';
                }
            });
        });
    });

    // ============================================
    // Testimonials Slider
    // ============================================
    var track = document.getElementById('testimonialTrack');
    var cards = track ? track.querySelectorAll('.testimonial-card') : [];
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');
    var dotsContainer = document.getElementById('testimonialDots');
    var currentSlide = 0;

    // Create dots
    if (dotsContainer && cards.length > 0) {
        cards.forEach(function (_, index) {
            var dot = document.createElement('div');
            dot.classList.add('testimonial-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', function () {
                goToSlide(index);
            });
            dotsContainer.appendChild(dot);
        });
    }

    function goToSlide(index) {
        if (!track || cards.length === 0) return;
        currentSlide = index;
        track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';

        var dots = dotsContainer.querySelectorAll('.testimonial-dot');
        dots.forEach(function (dot, i) {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            currentSlide = currentSlide > 0 ? currentSlide - 1 : cards.length - 1;
            goToSlide(currentSlide);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            currentSlide = currentSlide < cards.length - 1 ? currentSlide + 1 : 0;
            goToSlide(currentSlide);
        });
    }

    // Auto-slide every 5 seconds
    function startAutoSlide() {
        return setInterval(function () {
            if (cards.length > 0) {
                currentSlide = currentSlide < cards.length - 1 ? currentSlide + 1 : 0;
                goToSlide(currentSlide);
            }
        }, 5000);
    }

    var autoSlideTimer = startAutoSlide();

    // Pause auto-slide on hover
    var sliderEl = document.querySelector('.testimonials-slider');
    if (sliderEl) {
        sliderEl.addEventListener('mouseenter', function () {
            clearInterval(autoSlideTimer);
        });
        sliderEl.addEventListener('mouseleave', function () {
            autoSlideTimer = startAutoSlide();
        });
    }

    // Cleanup on page unload
    window.addEventListener('beforeunload', function () {
        clearInterval(autoSlideTimer);
    });

    // ============================================
    // FAQ Accordion
    // ============================================
    var faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function (item) {
        var question = item.querySelector('.faq-question');
        question.addEventListener('click', function () {
            var isActive = item.classList.contains('active');

            // Close all FAQ items
            faqItems.forEach(function (faq) {
                faq.classList.remove('active');
            });

            // Open clicked item if it was closed
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ============================================
    // Contact Form Validation & Submission
    // ============================================
    var contactForm = document.getElementById('contactForm');
    var formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var name = document.getElementById('name').value.trim();
            var phone = document.getElementById('phone').value.trim();
            var service = document.getElementById('service').value;
            var message = document.getElementById('message').value.trim();

            // Validation
            if (!name || name.length < 2) {
                showFormMessage('Lütfen geçerli bir ad soyad giriniz.', 'error');
                return;
            }

            if (!phone || phone.length < 10) {
                showFormMessage('Lütfen geçerli bir telefon numarası giriniz.', 'error');
                return;
            }

            if (!service) {
                showFormMessage('Lütfen bir hizmet türü seçiniz.', 'error');
                return;
            }

            if (!message || message.length < 10) {
                showFormMessage('Lütfen en az 10 karakter uzunluğunda bir mesaj giriniz.', 'error');
                return;
            }

            // Show loading state
            var btnText = contactForm.querySelector('.btn-text');
            var btnLoading = contactForm.querySelector('.btn-loading');
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';

            // Simulate form submission
            setTimeout(function () {
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                showFormMessage('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', 'success');
                contactForm.reset();
            }, 1500);
        });
    }

    function showFormMessage(msg, type) {
        if (!formMessage) return;
        formMessage.textContent = msg;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';

        setTimeout(function () {
            formMessage.style.display = 'none';
        }, 5000);
    }

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var targetId = this.getAttribute('href');
            var target = document.querySelector(targetId);
            if (target) {
                var offset = navbar.offsetHeight;
                var targetPos = target.offsetTop - offset;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        });
    });

});
