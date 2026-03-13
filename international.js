// ============================================
// VESCOM — International Page Scripts
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ========== MOBILE NAVIGATION ==========
    const mobileToggle = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');

    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            mainNav.classList.toggle('open');
        });

        mainNav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                mainNav.classList.remove('open');
            });
        });
    }

    // ========== HEADER SCROLL EFFECT ==========
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.style.background = 'rgba(13, 13, 13, 0.97)';
        } else {
            header.style.background = 'rgba(13, 13, 13, 0.85)';
        }
    });

    // ========== SMOOTH SCROLL — BACK TO TOP ==========
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ========== NEWSLETTER FORM ==========
    const form = document.getElementById('newsletterForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('.newsletter-input');
            if (input && input.value.trim()) {
                input.value = '';
                input.placeholder = 'THANK YOU!';
                setTimeout(() => {
                    input.placeholder = 'YOUR EMAIL';
                }, 2500);
            }
        });
    }

    // ========== SCROLL REVEAL ANIMATIONS ==========
    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Location cards stagger
    document.querySelectorAll('.location-card').forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(35px)';
        card.style.transition = `opacity 0.7s ease ${i * 0.12}s, transform 0.7s ease ${i * 0.12}s`;
        observer.observe(card);
    });

    // Perspective text & image
    document.querySelectorAll('.perspective-text, .perspective-image-wrap').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.8s ease ${i * 0.2}s, transform 0.8s ease ${i * 0.2}s`;
        observer.observe(el);
    });

    // Testimonial
    document.querySelectorAll('.intl-testimonial-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Revealed class
    const style = document.createElement('style');
    style.textContent = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

});
