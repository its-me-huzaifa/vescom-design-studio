// ============================================
// VESCOM — Projects Page Scripts
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ========== PROJECT DATA ==========
    const projectsData = {
        1: {
            title: 'The Glass Pinnacle',
            location: 'NEW YORK',
            heroImage: 'media/project-1/image.png',
            description: 'Exemplary design meets unparalleled craftsmanship. This project defines the pinnacle of modern luxury, merging sustainable materials with timeless aesthetics. Every surface, every angle was meticulously considered to create an environment that breathes sophistication.',
            quote: '"VESCOM transformed our vision into a breathtaking reality that transcends trends."',
            gallery: [
                'media/project-1/image.png',
                'media/project-2/image.png',
                'media/project-3/image.png',
                'media/project-4/image.png'
            ]
        },
        2: {
            title: 'Valley of Light',
            location: 'MONTANA',
            heroImage: 'media/project-2/image.png',
            description: 'A sanctuary nestled within nature\'s grandeur. This retreat seamlessly blends organic architecture with the surrounding landscape, creating spaces where interior comfort meets the raw beauty of the wilderness. Natural light guides every room.',
            quote: '"An extraordinary fusion of nature and design — a true masterpiece of modern living."',
            gallery: [
                'media/project-2/image.png',
                'media/project-5/image.png',
                'media/project-6/image.png',
                'media/project-1/image.png'
            ]
        },
        3: {
            title: 'Cascading Serenity',
            location: 'ICELAND',
            heroImage: 'media/project-3/image.png',
            description: 'Inspired by the raw power and quiet grace of Iceland\'s waterfalls, this hospitality project channels nature\'s energy into every detail. The interiors echo the rhythm of cascading water through fluid forms and reflective surfaces.',
            quote: '"A space that captures the essence of nature\'s most awe-inspiring moments."',
            gallery: [
                'media/project-3/image.png',
                'media/project-4/image.png',
                'media/project-1/image.png',
                'media/project-5/image.png'
            ]
        },
        4: {
            title: 'Stone Cathedral',
            location: 'ARIZONA',
            heroImage: 'media/project-4/image.png',
            description: 'Carved from the essence of the desert landscape, this residential masterpiece draws its palette from sun-scorched stone and ancient geological formations. Raw textures and earth tones ground the space in authenticity while luxury finishes elevate every experience.',
            quote: '"VESCOM created not just a home, but a monument to the beauty of the natural world."',
            gallery: [
                'media/project-4/image.png',
                'media/project-6/image.png',
                'media/project-2/image.png',
                'media/project-3/image.png'
            ]
        },
        5: {
            title: 'Mirror Lake',
            location: 'NORWAY',
            heroImage: 'media/project-5/image.png',
            description: 'Stillness and reflection define this lakeside retreat. The design philosophy centers on minimalism — allowing the serene landscape to become the primary artwork. Floor-to-ceiling glass dissolves the boundary between shelter and the pristine Nordic surroundings.',
            quote: '"A meditative space that brings absolute peace — design at its most thoughtful."',
            gallery: [
                'media/project-5/image.png',
                'media/project-3/image.png',
                'media/project-6/image.png',
                'media/project-2/image.png'
            ]
        },
        6: {
            title: 'Solitary Shores',
            location: 'PORTUGAL',
            heroImage: 'media/project-6/image.png',
            description: 'Perched on the Atlantic coast, this design celebrates solitude and contemplation. Weathered materials and maritime references create an interior narrative of voyages and discovery. Every room frames the endless horizon as a living canvas.',
            quote: '"Beyond expectations — a sanctuary that resonates with elegance and the spirit of the sea."',
            gallery: [
                'media/project-6/image.png',
                'media/project-1/image.png',
                'media/project-4/image.png',
                'media/project-5/image.png'
            ]
        }
    };


    // ========== OVERLAY LOGIC ==========
    const overlay = document.getElementById('projectOverlay');
    const overlayClose = document.getElementById('overlayClose');
    const overlayTitle = document.getElementById('overlayTitle');
    const overlayLocation = document.getElementById('overlayLocation');
    const overlayHeroImg = document.getElementById('overlayHeroImg');
    const overlayDesc = document.getElementById('overlayDesc');
    const overlayQuote = document.getElementById('overlayQuote');
    const overlayGallery = document.getElementById('overlayGallery');

    function openProject(projectId) {
        const data = projectsData[projectId];
        if (!data) return;

        // Populate overlay
        overlayTitle.textContent = data.title;
        overlayLocation.textContent = data.location;
        overlayHeroImg.src = data.heroImage;
        overlayHeroImg.alt = data.title;
        overlayDesc.textContent = data.description;
        overlayQuote.textContent = data.quote;

        // Build gallery
        overlayGallery.innerHTML = '';
        data.gallery.forEach(imgSrc => {
            const item = document.createElement('div');
            item.className = 'overlay-gallery-item';
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = data.title + ' gallery';
            img.loading = 'lazy';
            item.appendChild(img);
            overlayGallery.appendChild(item);
        });

        // Scroll wrapper to top
        const scrollWrapper = overlay.querySelector('.overlay-scroll-wrapper');
        if (scrollWrapper) scrollWrapper.scrollTop = 0;

        // Show overlay
        overlay.classList.add('active');
        document.body.classList.add('overlay-open');
    }

    function closeOverlay() {
        overlay.classList.remove('active');
        document.body.classList.remove('overlay-open');
    }

    // Attach click to each portfolio item
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('click', () => {
            const id = item.id.replace('portfolio-item-', '');
            openProject(id);
        });
    });

    // Close button
    overlayClose.addEventListener('click', closeOverlay);

    // Close on backdrop click (outside inner content)
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target.classList.contains('overlay-scroll-wrapper')) {
            closeOverlay();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeOverlay();
        }
    });


    // ========== MOBILE NAVIGATION ==========
    const mobileToggle = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');

    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            mainNav.classList.toggle('open');
        });

        const navLinks = mainNav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                mainNav.classList.remove('open');
            });
        });
    }


    // ========== HEADER SCROLL EFFECT ==========
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 80) {
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

    // Portfolio items stagger
    document.querySelectorAll('.portfolio-item').forEach((item, i) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(40px)';
        item.style.transition = `opacity 0.7s ease ${i * 0.1}s, transform 0.7s ease ${i * 0.1}s`;
        observer.observe(item);
    });

    // Awards content
    document.querySelectorAll('.awards-text, .awards-image').forEach((item, i) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.8s ease ${i * 0.2}s, transform 0.8s ease ${i * 0.2}s`;
        observer.observe(item);
    });

    // Section headers
    document.querySelectorAll('.section-header, .portfolio-header').forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(30px)';
        header.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        observer.observe(header);
    });

    // Revealed class style
    const style = document.createElement('style');
    style.textContent = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

});
