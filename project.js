// ============================================
// VESCOM — Projects Page Scripts
// Dynamically loads projects from projects.json
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ========== DOM REFERENCES ==========
    const portfolioGrid = document.getElementById('portfolioGrid');
    const overlay = document.getElementById('projectOverlay');
    const overlayClose = document.getElementById('overlayClose');
    const overlayTitle = document.getElementById('overlayTitle');
    const overlayLocation = document.getElementById('overlayLocation');
    const overlayHeroImg = document.getElementById('overlayHeroImg');
    const overlayDesc = document.getElementById('overlayDesc');
    const overlayQuote = document.getElementById('overlayQuote');
    const overlayGallery = document.getElementById('overlayGallery');

    // Store loaded projects data for overlay use
    let projectsMap = {};


    // ========== FETCH & RENDER PROJECTS ==========
    fetch('projects.json')
        .then(res => res.json())
        .then(data => {
            const projects = data.products;

            // Build lookup map by index (for overlay)
            projects.forEach((project, index) => {
                projectsMap[index] = project;
            });

            // Render portfolio grid — order follows JSON array order
            projects.forEach((project, index) => {
                const item = document.createElement('div');
                item.className = 'portfolio-item';
                item.id = `portfolio-item-${index}`;
                item.dataset.index = index;

                item.innerHTML = `
                    <div class="portfolio-image">
                        <img src="${project.thumbnail}" alt="${project.name}" loading="lazy">
                        <div class="portfolio-overlay">
                            <span class="portfolio-category">${project.location.toUpperCase()}</span>
                            <h3 class="portfolio-name">${project.name}</h3>
                        </div>
                    </div>
                `;

                // Click to open overlay
                item.addEventListener('click', () => openProject(index));

                portfolioGrid.appendChild(item);
            });

            // Apply scroll reveal animations after rendering
            applyScrollAnimations();
        })
        .catch(err => {
            console.error('Failed to load projects:', err);
            portfolioGrid.innerHTML = '<p style="color: var(--text-secondary); text-align: center; grid-column: 1/-1;">Unable to load projects.</p>';
        });


    // ========== OVERLAY LOGIC ==========
    function openProject(index) {
        const project = projectsMap[index];
        if (!project) return;

        // Populate overlay
        overlayTitle.textContent = project.name;
        overlayLocation.textContent = project.location.toUpperCase();
        overlayHeroImg.src = project.thumbnail;
        overlayHeroImg.alt = project.name;

        // Description — show designer info
        overlayDesc.textContent = `Designed by ${project.designer}. Located at ${project.location}.`;

        // Quote
        overlayQuote.textContent = `"Crafted with precision and passion by ${project.designer}."`;

        // Build gallery — use all images (skip thumbnail if it's the first image)
        overlayGallery.innerHTML = '';
        const galleryImages = project.images.filter(img => img !== project.thumbnail);
        // If thumbnail was not in the images array, show all images
        const imagesToShow = galleryImages.length > 0 ? galleryImages : project.images;

        imagesToShow.forEach(imgSrc => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'overlay-gallery-item';
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = project.name + ' gallery';
            img.loading = 'lazy';
            galleryItem.appendChild(img);
            overlayGallery.appendChild(galleryItem);
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

    // Close button
    overlayClose.addEventListener('click', closeOverlay);

    // Close on backdrop click
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
    function applyScrollAnimations() {
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
            item.style.transition = `opacity 0.7s ease ${i * 0.05}s, transform 0.7s ease ${i * 0.05}s`;
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
        document.querySelectorAll('.section-header, .portfolio-header').forEach(hdr => {
            hdr.style.opacity = '0';
            hdr.style.transform = 'translateY(30px)';
            hdr.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
            observer.observe(hdr);
        });

        // Revealed class style
        if (!document.getElementById('revealedStyle')) {
            const style = document.createElement('style');
            style.id = 'revealedStyle';
            style.textContent = `
                .revealed {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

});
