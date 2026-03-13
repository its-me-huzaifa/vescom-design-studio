// ============================================
// VESCOM — About Page Scripts
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

    // Hero text & image
    document.querySelectorAll('.about-hero-text, .about-hero-image-wrap').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.8s ease ${i * 0.2}s, transform 0.8s ease ${i * 0.2}s`;
        observer.observe(el);
    });

    // Mission & Vision cards
    document.querySelectorAll('.mv-card').forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(35px)';
        card.style.transition = `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`;
        observer.observe(card);
    });

    // Value cards
    document.querySelectorAll('.value-card').forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = `opacity 0.7s ease ${i * 0.12}s, transform 0.7s ease ${i * 0.12}s`;
        observer.observe(card);
    });

    // Team members
    document.querySelectorAll('.team-member').forEach((member, i) => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(40px)';
        member.style.transition = `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`;
        observer.observe(member);
    });

    // Section headers
    document.querySelectorAll('.section-header').forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(30px)';
        header.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        observer.observe(header);
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
