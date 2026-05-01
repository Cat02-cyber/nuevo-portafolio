// Modern Framer-style reveal that works with pre-defined HTML or dynamic content
function revealWords() {
    const words = document.querySelectorAll('.word-reveal');
    const rainbows = document.querySelectorAll('.rainbow-text');

    // Reset animations
    words.forEach(word => {
        word.style.animation = 'none';
        word.offsetHeight; // trigger reflow
        word.style.animation = null;
    });

    rainbows.forEach(rb => rb.classList.remove('gradient-active'));

    // Apply staggered delays
    words.forEach((word, index) => {
        word.style.animationDelay = `${index * 60}ms`;
    });

    // Reveal gradient on rainbow-text after all hero words finish animating
    const totalWords = words.length;
    const lastWordDelay = (totalWords - 1) * 60;
    const wordAnimDuration = 600;
    const gradientRevealTime = lastWordDelay + wordAnimDuration + 100;

    setTimeout(() => {
        document.querySelectorAll('.rainbow-text').forEach(el => {
            el.classList.add('gradient-active');
        });
    }, gradientRevealTime);
}

// Export to window so language.js can call it
window.revealWords = revealWords;

document.addEventListener('DOMContentLoaded', () => {
    // We wait a tiny bit to ensure language.js has done its initial pass
    setTimeout(revealWords, 50);
});
