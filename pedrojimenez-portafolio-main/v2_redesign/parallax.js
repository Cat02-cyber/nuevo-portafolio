document.addEventListener('DOMContentLoaded', () => {
    const heroElements = document.querySelectorAll('.hero-container, .hero-text');
    const workItems = document.querySelectorAll('.work-card');

    let lastScrollY = window.scrollY;

    const updateParallax = () => {
        const scrollY = window.scrollY;
        const viewHeight = window.innerHeight;

        // Hero parallax & fade
        heroElements.forEach(el => {
            const speed = 0.15;
            const rect = el.getBoundingClientRect();

            // Transform
            el.style.transform = `translateY(${scrollY * speed}px)`;

            // Fade out as it leaves top
            const fadePoint = viewHeight * 0.4;
            let opacity = 1;
            if (rect.bottom < fadePoint) {
                opacity = Math.max(0, rect.bottom / fadePoint);
            }
            el.style.opacity = opacity;
        });

        // Work items parallax & fade
        workItems.forEach(item => {
            const rect = item.getBoundingClientRect();

            if (rect.top < viewHeight && rect.bottom > 0) {
                // Parallax transform
                const distance = (viewHeight - rect.top) / viewHeight;
                const offset = (1 - distance) * 20;
                item.style.transform = `translateY(${offset}px)`;

                // Fade in/out based on position in viewport
                // We want it fully visible in the middle 60% of the screen
                const centerOffset = Math.abs((rect.top + rect.height / 2) - viewHeight / 2);
                const maxDistance = viewHeight * 0.5;
                const threshold = viewHeight * 0.2; // Stay fully visible in the center 40%

                let opacity = 1;
                if (centerOffset > threshold) {
                    opacity = 1 - (centerOffset - threshold) / (maxDistance - threshold);
                }

                item.style.opacity = Math.max(0, Math.min(1, opacity));
            }
        });

        requestAnimationFrame(updateParallax);
    };

    requestAnimationFrame(updateParallax);
});
