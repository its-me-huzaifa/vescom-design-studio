// ============================================
// VESCOM — Contact Page Scripts
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

    // ========== CONTACT FORM ==========
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            submitBtn.textContent = 'THANK YOU ✓';
            submitBtn.style.background = 'transparent';
            submitBtn.style.color = 'var(--gold)';
            submitBtn.style.borderColor = 'var(--gold)';
            submitBtn.disabled = true;

            setTimeout(() => {
                form.reset();
                submitBtn.textContent = 'SEND INQUIRY';
                submitBtn.style.background = '';
                submitBtn.style.color = '';
                submitBtn.style.borderColor = '';
                submitBtn.disabled = false;
            }, 3000);
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

    // Contact info & form
    document.querySelectorAll('.contact-info, .contact-form-wrap').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.8s ease ${i * 0.2}s, transform 0.8s ease ${i * 0.2}s`;
        observer.observe(el);
    });

    // Gallery items
    document.querySelectorAll('.gallery-strip-item').forEach((item, i) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(40px)';
        item.style.transition = `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`;
        observer.observe(item);
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
