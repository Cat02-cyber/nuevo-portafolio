document.addEventListener('DOMContentLoaded', () => {

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const endLoading = () => {
        document.documentElement.classList.remove('is-loading');
        const loaderEl = document.querySelector('.loader');
        if (loaderEl) loaderEl.setAttribute('aria-busy', 'false');
    };

    // 0. Toggle de Tema Claro/Oscuro
    const themeBtn = document.getElementById('theme-toggle');
    const iconSun = document.querySelector('.icon-sun');
    const iconMoon = document.querySelector('.icon-moon');

    // 0.1 Actualizar el año del Loader automáticamente
    const yearLoader = document.getElementById('year-loader');
    if (yearLoader) {
        const currentYear = new Date().getFullYear();
        yearLoader.textContent = `© ${currentYear}`;
    }

    // 0.2 Easter Egg del Título
    const originalTitle = document.title;
    window.addEventListener('blur', () => {
        document.title = 'Regresa, tengo más diseños 👀';
    });
    window.addEventListener('focus', () => {
        document.title = 'Made ya look :)';
        setTimeout(() => { document.title = originalTitle; }, 2000);
    });

    // Revisar preferencia o tema guardado
    let savedTheme = localStorage.getItem('theme') || 'light';

    // 0.5 Saludo dinámico en el h1 — frases por franja horaria
    const dynamicGreeting = document.getElementById('dynamic-greeting');
    if (dynamicGreeting) {
        const hour = new Date().getHours();
        const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

        /* Usa | para separar: antes = romana, después = itálica (misma frase, mismo sorteo por hora). */
        const phrases = {
            madrugada: [
                "Es de madrugada.|Buena hora para curiosear.",
                "La madrugada tiene sus razones.|Bienvenido.",
                "Todos duermen. Tú no.|Yo tampoco.",
                "A esta hora el mundo es tuyo.|Y este portafolio también.",
                "Insomnio o curiosidad.|Bienvenido de todas formas.",
                "Pocos llegan a esta hora.|Me alegra que hayas llegado."
            ],
            manana: [
                "Buenos días.|Esto es lo que hago.",
                "La mañana apenas empieza.|Bienvenido.",
                "Temprano y con ganas.|Me gusta.",
                "Buen momento|para descubrir algo nuevo.",
                "El día acaba de empezar.|Empecemos.",
                "Café en mano, espero.|Esto va a estar bien."
            ],
            tarde: [
                "La tarde avanza.|¿Qué te trajo hasta aquí?",
                "Buenas tardes.|Aquí empieza el recorrido.",
                "A esta hora|el café ya es opcional.",
                "La tarde es larga.|Hay tiempo para explorar.",
                "Justo a tiempo.|Bienvenido.",
                "La mitad del día ya pasó.|Que valga la pena."
            ],
            noche: [
                "Buenas noches.|Gracias por pasar.",
                "La noche|es buena hora para explorar.",
                "Ya es tarde.|O justo a tiempo.",
                "El día casi termina.|Bienvenido al último turno.",
                "Noche de navegación.|Buena elección.",
                "La noche tiene su propio ritmo.|Bienvenido."
            ]
        };

        let chosen;
        if (hour >= 0 && hour < 6) chosen = pick(phrases.madrugada);
        else if (hour >= 6 && hour < 13) chosen = pick(phrases.manana);
        else if (hour >= 13 && hour < 20) chosen = pick(phrases.tarde);
        else chosen = pick(phrases.noche);

        const escapeHtml = (s) => s
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');

        const formatHeroPhrase = (raw) => {
            const bar = raw.indexOf('|');
            if (bar === -1) return escapeHtml(raw);
            const left = raw.slice(0, bar).trimEnd();
            const right = raw.slice(bar + 1).trimStart();
            if (!left) return `<em>${escapeHtml(right)}</em>`;
            if (!right) return escapeHtml(left);
            return `${escapeHtml(left)} <em>${escapeHtml(right)}</em>`;
        };

        dynamicGreeting.innerHTML = formatHeroPhrase(chosen);
    }

    // Barra de progreso de lectura
    const scrollProgress = document.querySelector('.scroll-progress');
    const updateScrollProgress = () => {
        if (!scrollProgress) return;
        const doc = document.documentElement;
        const scrollTop = window.scrollY || doc.scrollTop;
        const height = doc.scrollHeight - doc.clientHeight;
        const p = height > 0 ? scrollTop / height : 0;
        scrollProgress.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`;
    };
    const bindScrollProgress = () => {
        if (!scrollProgress || prefersReducedMotion) return;
        window.addEventListener('scroll', updateScrollProgress, { passive: true });
        updateScrollProgress();
    };
    bindScrollProgress();

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            iconMoon.style.display = 'none';
            iconSun.style.display = 'block';
        } else {
            document.documentElement.removeAttribute('data-theme');
            iconSun.style.display = 'none';
            iconMoon.style.display = 'block';
        }
        localStorage.setItem('theme', theme);
    };

    applyTheme(savedTheme);

    themeBtn.addEventListener('click', () => {
        savedTheme = savedTheme === 'light' ? 'dark' : 'light';
        applyTheme(savedTheme);
    });

    // 1. Loader y animaciones de entrada
    const loader = document.querySelector('.loader');

    if (prefersReducedMotion) {
        if (loader) loader.classList.add('loaded');
        document.body.classList.add('ready');
        endLoading();
    } else {
        setTimeout(() => {
            if (loader) loader.classList.add('loaded');
            setTimeout(() => {
                document.body.classList.add('ready');
                endLoading();
            }, 320);
        }, 1200);
    }

    // 2. Smooth Scroll Inercial (Lenis)
    let lenis;
    if (typeof Lenis !== 'undefined' && !prefersReducedMotion) {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        lenis.on('scroll', updateScrollProgress);
    }

    // Header: compacto al scrollear + link activo por sección
    const navbar = document.querySelector('.navbar');
    const navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));

    const setNavbarState = () => {
        if (!navbar) return;
        navbar.classList.toggle('is-scrolled', (window.scrollY || 0) > 12);
    };

    if (lenis) {
        lenis.on('scroll', setNavbarState);
    } else {
        window.addEventListener('scroll', setNavbarState, { passive: true });
    }
    setNavbarState();

    const sectionIds = navLinks
        .map((a) => (a.getAttribute('href') || '').slice(1))
        .filter(Boolean);

    const sectionsForNav = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean);

    const setActiveLink = (id) => {
        navLinks.forEach((a) => {
            const target = (a.getAttribute('href') || '').slice(1);
            a.classList.toggle('is-active', target === id);
        });
    };

    if (sectionsForNav.length) {
        const navObserver = new IntersectionObserver((entries) => {
            const visible = entries
                .filter((e) => e.isIntersecting)
                .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];
            if (visible && visible.target && visible.target.id) setActiveLink(visible.target.id);
        }, {
            root: null,
            /* “centro de atención” parecido a scrollspy suave */
            rootMargin: '-45% 0px -45% 0px',
            threshold: [0.01, 0.1, 0.2, 0.35, 0.5]
        });

        sectionsForNav.forEach((s) => navObserver.observe(s));
    }

    // 3. Scroll Reveal para Secciones
    const sections = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
        root: null,
        /* Empieza el reveal un poco antes (scroll más “fluido”, estilo portafolio showcase). */
        rootMargin: '0px 0px -6% 0px',
        threshold: 0.08
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    if (prefersReducedMotion) {
        sections.forEach((section) => section.classList.add('is-visible'));
    }

    // 3.5. Efecto Parallax súper suave en Proyectos (Estilo Dousan)
    const parallaxImages = document.querySelectorAll('.parallax-img');

    // Si lenis está activo nos enlazamos a su animacion de scroll, si no, al evento nativo de window
    const updateParallax = () => {
        parallaxImages.forEach(img => {
            // El contendor padre
            const parent = img.parentElement;
            const parentRect = parent.getBoundingClientRect();

            // Calculamos cuánto ha entrado por la pantalla
            const scrollPos = window.innerHeight - parentRect.top;
            const scrollTotal = window.innerHeight + parentRect.height;

            // % de scroll entre 0 y 1
            let percent = scrollPos / scrollTotal;
            if (percent < 0) percent = 0;
            if (percent > 1) percent = 1;

            // Movemos la imagen de -15% a 0 para el efecto inmersivo
            // La imagen en css tiene height: 130%, por lo que tiene de sobra para moverse dentro del contenedor
            const yMovement = -15 + (percent * 15);

            img.style.transform = `translateY(${yMovement}%)`;
        });
    };

    if (lenis) {
        lenis.on('scroll', updateParallax);
    } else {
        window.addEventListener('scroll', updateParallax);
    }
    updateParallax(); // Initial call

    // 3.7 Efecto Blur/Fade del Hero al hacer Scroll (firma de dousanmiao)
    const heroContent = document.querySelector('.hero-content');
    const heroWireframe = document.querySelector('.hero-wireframe');
    const heroEl = document.querySelector('.hero');

    const updateHeroScroll = (scrollY) => {
        if (!heroContent || !heroEl) return;
        if (prefersReducedMotion) {
            heroContent.style.filter = '';
            heroContent.style.opacity = '';
            heroContent.style.transform = '';
            return;
        }
        const heroH = heroEl.offsetHeight;

        if (scrollY > heroH) {
            heroContent.style.opacity = '0';
            heroContent.style.filter = 'blur(18px)';
            heroContent.style.transform = 'translateY(-90px)';
            return;
        }

        // p: 0 → 1 cuando scroll llega al 45% de la altura del hero (efecto rápido)
        const p = Math.max(0, Math.min(1, scrollY / (heroH * 0.45)));

        heroContent.style.filter = `blur(${(p * 18).toFixed(2)}px)`;
        heroContent.style.opacity = Math.max(0, 1 - p * 1.3).toFixed(3);
        heroContent.style.transform = `translateY(${(p * -90).toFixed(1)}px)`;

        if (heroWireframe) {
            heroWireframe.style.transform =
                `translate(-50%, calc(-50% + ${(p * 50).toFixed(1)}px))`;
        }
    };

    // RAF loop — fuente de verdad universal (funciona con o sin Lenis)
    let lastScrollY = -1;
    const heroRAF = () => {
        const y = window.scrollY;
        if (y !== lastScrollY) {
            lastScrollY = y;
            updateHeroScroll(y);
        }
        requestAnimationFrame(heroRAF);
    };
    requestAnimationFrame(heroRAF);

    // 4. Lógica del Cursor Personalizado
    const cursor = document.querySelector('.custom-cursor');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (cursor && !isTouchDevice && !prefersReducedMotion) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let cursorX = mouseX;
        let cursorY = mouseY;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const renderCursor = () => {
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;

            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
            requestAnimationFrame(renderCursor);
        };
        requestAnimationFrame(renderCursor);

        // Hover en enlaces interactivos
        const interactiveElements = document.querySelectorAll('a, button, .project-card');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '60px';
                cursor.style.height = '60px';
                cursor.style.background = '#FFFFFF'; /* Círculo sólido blanco para inversión perfecta */
                cursor.style.border = 'none';
                cursor.style.mixBlendMode = 'difference'; /* Inversión contra el fondo para claridad total */
                cursor.style.boxShadow = 'none';
            });

            el.addEventListener('mouseleave', () => {
                cursor.style.width = '15px';
                cursor.style.height = '15px';
                cursor.style.background = 'var(--accent)';
                cursor.style.border = 'none';
                cursor.style.mixBlendMode = 'normal';
                cursor.style.boxShadow = 'none';
            });
        });
    } else {
        if (cursor) cursor.style.display = 'none';
        document.body.style.cursor = 'auto';
    }
});
