const translations = {
    es: {
        "nav-home": "Inicio",
        "nav-about": "Sobre mi",
        "nav-contact": "Contacto",
        "hero-1": "Haciendo",
        "hero-2": "que",
        "hero-3": "la",
        "hero-tech": "tecnología",
        "hero-4": "sea",
        "hero-5": "más",
        "hero-human": "humana",
        "hero-6": "un",
        "hero-7": "píxel",
        "hero-8": "a",
        "hero-9": "la",
        "hero-10": "vez.",
        "lang-name": "EN"
    },
    en: {
        "nav-home": "Home",
        "nav-about": "About me",
        "nav-contact": "Contact",
        "hero-1": "Making",
        "hero-2": "",
        "hero-3": "",
        "hero-tech": "technology",
        "hero-4": "feel",
        "hero-5": "more",
        "hero-human": "human",
        "hero-6": "one",
        "hero-7": "pixel",
        "hero-8": "at",
        "hero-9": "a",
        "hero-10": "time.",
        "lang-name": "ES"
    }
};

let currentLang = localStorage.getItem('language') || 'es';
const langToggle = document.getElementById('lang-toggle');

function updateLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key] !== undefined) {
            // Special handling for rainbow text data-text attribute
            if (el.classList.contains('rainbow-text')) {
                el.setAttribute('data-text', translations[lang][key]);
            }
            el.textContent = translations[lang][key];

            // Hide element if translation is empty
            if (translations[lang][key] === "") {
                el.parentElement.style.display = 'none';
            } else {
                el.parentElement.style.display = 'inline-block';
            }
        }
    });

    langToggle.textContent = translations[lang]["lang-name"];
    document.documentElement.lang = lang;
}

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    localStorage.setItem('language', currentLang);
    updateLanguage(currentLang);

    // Optional: Re-trigger text reveal animation
    if (window.revealWords) {
        window.revealWords();
    }
});

// Initial call
document.addEventListener('DOMContentLoaded', () => {
    updateLanguage(currentLang);
});
