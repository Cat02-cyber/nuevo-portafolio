const cursor = document.getElementById('custom-cursor');
const textElements = document.querySelectorAll('.hero-text, .rainbow-text');

document.addEventListener('mousemove', (e) => {
    // Smooth movement using requestAnimationFrame or just direct update
    // For simplicity, direct update here, but we can animate for more "fluid" feel
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

textElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('text-active');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('text-active');
    });
});

const workMedia = document.querySelectorAll('.work-media');
workMedia.forEach(media => {
    media.addEventListener('mouseenter', () => {
        cursor.classList.add('work-active');
    });
    media.addEventListener('mouseleave', () => {
        cursor.classList.remove('work-active');
    });
});

// Handle cases where the mouse might start over a text element or leave the window
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
});
