import { onMount, onCleanup, createSignal, createEffect, type Component } from 'solid-js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { DinoBackground, DinoFooter } from './DinoGame';

gsap.registerPlugin(ScrollTrigger);

/* ── Time-based text (main.js logic) ── */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!%&';
const BANK: Record<string, string[]> = {
  madrugada: [
    'Es de madrugada.|Buena hora para curiosear.',
    'La madrugada tiene sus razones.|Bienvenido.',
    'Todos duermen. Tú no.|Yo tampoco.',
    'Insomnio o curiosidad.|Bienvenido.',
  ],
  manana: [
    'Buenos días.|Esto es lo que hago.',
    'Temprano y con ganas.|Me gusta.',
    'Buen momento|para descubrir algo nuevo.',
    'Café en mano.|Empecemos.',
  ],
  tarde: [
    'La tarde avanza.|¿Qué te trajo aquí?',
    'Buenas tardes.|Aquí empieza el recorrido.',
    'Justo a tiempo.|Bienvenido.',
    'La mitad del día ya pasó.|Que valga.',
  ],
  noche: [
    'Buenas noches.|Gracias por pasar.',
    'La noche|es buena hora para explorar.',
    'Ya es tarde.|O justo a tiempo.',
    'Noche de navegación.|Buena elección.',
  ],
};

function getSlot() {
  const h = new Date().getHours();
  if (h < 6) return 'madrugada';
  if (h < 13) return 'manana';
  if (h < 20) return 'tarde';
  return 'noche';
}

function pickPhrase() {
  const arr = BANK[getSlot()];
  const chosen = arr[Math.floor(Math.random() * arr.length)];
  const bar = chosen.indexOf('|');
  return {
    line1: bar > -1 ? chosen.slice(0, bar).trimEnd() : chosen,
    line2: bar > -1 ? chosen.slice(bar + 1).trimStart() : '',
  };
}



/* ── App ── */
const App: Component = () => {
  const [darkMode, setDarkMode] = createSignal(true);
  const [currentTime, setCurrentTime] = createSignal('');
  const [showBackToTop, setShowBackToTop] = createSignal(false);

  /* Cursor */
  const [cursorX, setCursorX] = createSignal(-200);
  const [cursorY, setCursorY] = createSignal(-200);
  const [cursorExpanded, setCursorExpanded] = createSignal(false);
  const [cursorLabel, setCursorLabel] = createSignal('');

  let loaderRef!: HTMLDivElement;
  let navRef!: HTMLElement;
  let heroTextRef!: HTMLDivElement;
  let heroLine1Ref!: HTMLSpanElement;
  let heroLine2Ref: HTMLElement | null = null;
  let lenis: Lenis | null = null;
  let cursorFrame: number;
  let cx = -200, cy = -200, mx = -200, my = -200;

  const phrase = pickPhrase();

  /* ── Theme ── */
  const toggleTheme = () => {
    const next = !darkMode();
    setDarkMode(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
  };

  /* ── Cursor loop ── */
  const onMouseMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
  const renderCursor = () => {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    setCursorX(cx); setCursorY(cy);
    cursorFrame = requestAnimationFrame(renderCursor);
  };

  /* ── Scroll reveals ── */
  const initReveal = () => {
    document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        onEnter: () => el.classList.add('visible'),
      });
    });
  };

  /* ── Tab easter egg ── */
  const originalTitle = 'Pedro Jiménez — Diseñador Digital';
  const onBlur = () => { document.title = 'Regresa, tengo más diseños 👀'; };
  const onFocus = () => {
    document.title = 'Made ya look :)';
    setTimeout(() => { document.title = originalTitle; }, 2000);
  };

  let timeInterval: ReturnType<typeof setInterval>;

  onMount(() => {
    document.documentElement.setAttribute('data-theme', 'dark');

    document.addEventListener('mousemove', onMouseMove);
    cursorFrame = requestAnimationFrame(renderCursor);
    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', onFocus);

    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        timeZone: 'America/Bogota',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      setCurrentTime(`SMR, COL ${timeString}`);
    };
    updateTime();
    timeInterval = setInterval(updateTime, 10000);

    /* Cursor expand on interactive elements */
    const addHover = () => {
      document.querySelectorAll<HTMLElement>('a, button').forEach((el) => {
        el.addEventListener('mouseenter', () => { setCursorExpanded(true); setCursorLabel(''); });
        el.addEventListener('mouseleave', () => { setCursorExpanded(false); setCursorLabel(''); });
      });
      /* Project cards: show "Ver →" in cursor */
      document.querySelectorAll<HTMLElement>('.work-card').forEach((el) => {
        el.addEventListener('mouseenter', () => { setCursorExpanded(true); setCursorLabel('Ver →'); });
        el.addEventListener('mouseleave', () => { setCursorExpanded(false); setCursorLabel(''); });
      });
    };

    /* Lenis */
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenis.on('scroll', (e: any) => {
      setShowBackToTop(e.scroll > 600);
    });
    const raf = (time: number) => {
      lenis!.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    /* Hero parallax fade on scroll */
    lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      if (!heroTextRef) return;
      const heroH = (heroTextRef.closest('section') as HTMLElement)?.offsetHeight || window.innerHeight;
      const p = Math.max(0, Math.min(1, scroll / (heroH * 0.55)));
      heroTextRef.style.opacity = String(Math.max(0, 1 - p * 1.5).toFixed(3));
      heroTextRef.style.transform = `translateY(${(p * -50).toFixed(1)}px)`;
    });

    /* Loader out → start everything */
    setTimeout(() => {
      gsap.to(loaderRef, {
        opacity: 0,
        y: -6,
        duration: 0.65,
        ease: 'power3.inOut',
        onComplete: () => {
          loaderRef.style.display = 'none';
          gsap.to(navRef, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', delay: 0.05 });

          /* Hero text */
          if (heroTextRef) { heroTextRef.style.opacity = '1'; }
          if (heroLine1Ref) {
            heroLine1Ref.style.opacity = '1';
            heroLine1Ref.textContent = phrase.line1;
          }
          if (heroLine2Ref && phrase.line2) {
            heroLine2Ref.style.opacity = '1';
            heroLine2Ref.textContent = phrase.line2;
          }
          initReveal();
          addHover();
        },
      });
    }, 1250);
  });

  onCleanup(() => {
    document.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('blur', onBlur);
    window.removeEventListener('focus', onFocus);
    cancelAnimationFrame(cursorFrame);
    clearInterval(timeInterval);
    lenis?.destroy();
    ScrollTrigger.killAll();
  });

  return (
    <>
      {/* Custom cursor */}
      <div
        class="cursor"
        classList={{ expanded: cursorExpanded(), labeled: cursorLabel() !== '' }}
        style={{ left: `${cursorX()}px`, top: `${cursorY()}px` }}
        aria-hidden="true"
      >
        {cursorLabel() && <span class="cursor-text">{cursorLabel()}</span>}
      </div>

      {/* Loader */}
      <div class="loader" ref={loaderRef!} aria-busy="true" aria-live="polite">
        <div class="loader-bar" />
        <span class="loader-label">Pedro Jiménez © {new Date().getFullYear()}</span>
      </div>

      <DinoBackground isDarkMode={darkMode()} />

      {/* ─── NAVBAR ─── */}
      <header
        class="navbar"
        ref={navRef!}
        id="navbar"
        style={{ opacity: '0', transform: 'translateY(-8px)' }}
      >
        <div class="nav-left" style={{ display: 'flex', 'align-items': 'center', gap: '1.5rem' }}>
          <a href="#hero" class="nav-name" id="logo-link" style={{ display: 'flex', 'align-items': 'center', gap: '0.35rem' }}>
            Pedro <span class="font-serif italic lowercase tracking-wide" style={{ "font-size": "1.15em" }}>Jiménez</span>
          </a>
          <div class="nav-status">
            <span class="blink-dot"></span>
            Disponible
          </div>
          <Show when={currentTime()}>
            <div class="nav-status clock-status">
              {currentTime()}
            </div>
          </Show>
        </div>
        <div class="nav-right" style={{ display: 'flex', 'align-items': 'center', gap: '1rem' }}>
          <a href="mailto:pedroly753@gmail.com" class="nav-cta font-mono" id="nav-contact-link">
            ESCRÍBEME ➝
          </a>
          <button
            class="theme-toggle"
            id="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Cambiar modo"
          >
            {darkMode() ? '☀' : '☾'}
          </button>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section class="hero" id="hero">

        <div
          class="hero-text-wrap"
          ref={heroTextRef!}
          style={{ opacity: '0' }}
        >
          <p class="hero-eyebrow-name">Pedro Jiménez</p>

          <h1 class="hero-headline">
            <span
              class="hero-line-bold"
              ref={heroLine1Ref!}
              style={{ opacity: '0' }}
            >&nbsp;</span>
            {phrase.line2 && (
              <em
                class="hero-line-italic"
                ref={(el) => { heroLine2Ref = el; }}
                style={{ opacity: '0' }}
              >&nbsp;</em>
            )}
          </h1>
        </div>
      </section>

      {/* ─── PURE WHITESPACE DIVIDER ─── */}
      <div class="spacer-divider" style={{ height: '8vh', width: '100%' }} aria-hidden="true"></div>

      {/* ─── WORK ─── */}
      <section class="section" id="trabajo">
        <div class="section-header reveal">
          <div>
            <span class="section-eyebrow">/ Trabajos Seleccionados</span>
            <h2 class="section-title">Proyectos</h2>
          </div>
          <span class="section-count">01 proyecto</span>
        </div>

        <div class="work-grid">
          {/* Quester */}
          <a
            href="https://imgur.com/a/eiB8Aiu"
            target="_blank"
            rel="noopener noreferrer"
            class="work-card reveal"
            id="project-quester"
          >
            <div class="work-card-media">
              <video
                class="work-card-video"
                muted
                loop
                autoplay
                playsinline
                src="https://i.imgur.com/VuRwVQD.mp4"
                poster="https://i.imgur.com/VuRwVQDh.jpg"
              />
            </div>
            <div class="work-card-info">
              <span class="work-card-date">Nov 27 '24</span>
              <div class="work-card-name-row">
                <h3 class="work-card-name">Quester</h3>
              </div>
              <p class="work-card-desc">
                Plataforma de diseño colaborativo para equipos distribuidos — flujo completo desde discovery hasta handoff.
              </p>
            </div>
          </a>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section class="section" id="sobre-mi">
        <div class="about-grid">
          {/* LEFT — sticky title + links */}
          <div class="about-left reveal">
            <span class="section-eyebrow">/ Sobre Mí</span>
            <h2 class="about-title">
              Creando<br /><em>con propósito</em>
            </h2>
          </div>

          {/* RIGHT — scrollable content */}
          <div class="about-right">
            {/* Bio */}
            <div class="content-row reveal">
              <p class="about-bio">
                Pedro Jiménez es lo que podrías llamar un{' '}
                <strong>diseñador con criterio</strong>. Enfocado en resolver
                problemas más que en decorar pantallas — el buen diseño debe
                sentirse casi invisible, como si siempre hubiera estado ahí.
                Desde <strong>Santa Marta, Colombia</strong>.
              </p>
            </div>

            <div class="about-divider reveal" />

            {/* Herramientas */}
            <div class="content-row reveal">
              <span class="about-block-label">Herramientas</span>
              <ul class="skill-list">
                <li>Figma</li>
                <li>FigJam</li>
                <li>Adobe Photoshop</li>
                <li>Adobe Illustrator</li>
                <li>Maze</li>
              </ul>
            </div>

            <div class="about-divider reveal" />

            {/* Habilidades */}
            <div class="content-row reveal">
              <span class="about-block-label">Habilidades</span>
              <ul class="skill-list">
                <li>Wireframing</li>
                <li>Prototipado</li>
                <li>User Research</li>
                <li>Diseño Responsivo</li>
              </ul>
            </div>

            <div class="about-divider reveal" />

            {/* Experiencia */}
            <div class="content-row reveal">
              <span class="about-block-label">Experiencia</span>
              <div class="experience-item" style="padding-top: 0.35rem">
                <div class="experience-header">
                  <div>
                    <p class="experience-role">Diseñador UX</p>
                    <p class="experience-company">SmartP</p>
                  </div>
                  <span class="experience-date">Julio 2025</span>
                </div>
                <ul class="experience-bullets">
                  <li>Creé arquitecturas de información y flujos de usuario, optimizando la navegación y la jerarquía visual del producto.</li>
                  <li>Diseñé componentes y pantallas de alta fidelidad en Figma, manteniendo la consistencia visual y facilitando la entrega de activos al equipo de desarrollo.</li>
                </ul>
              </div>
            </div>

            <div class="about-divider reveal" />

            {/* Descargar CV */}
            <div class="content-row reveal">
              <a
                href="/CV_Pedro_Jimenez.pdf"
                target="_blank"
                rel="noopener noreferrer"
                class="download-btn"
                id="download-cv-btn"
              >
                <span>Descargar CV</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section class="contact section" id="contacto">
        <div class="contact-content">
          <span class="section-eyebrow reveal">/ ¿Tienes un proyecto?</span>
          <h2 class="contact-title reveal">
            ¿Trabajamos <em>juntos?</em>
          </h2>
          <a href="mailto:pedroly753@gmail.com" class="contact-email reveal" id="contact-email-link">
            <span>pedroly753@gmail.com</span>
            <span class="contact-email-arrow">→</span>
          </a>
          <div class="contact-links reveal">
            <a href="https://www.behance.net/zoypedroalv" target="_blank" rel="noopener noreferrer" class="contact-link" id="contact-behance">
              <sup>01</sup> Behance ↗
            </a>
            <a href="https://www.linkedin.com/in/pedro-jos%C3%A9-jimenez-martinez-3b000a260/" target="_blank" rel="noopener noreferrer" class="contact-link" id="contact-linkedin">
              <sup>02</sup> LinkedIn ↗
            </a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <DinoFooter />
      <footer class="footer">
        <div class="footer-left">
          <p>Hecho con curiosidad por Pedro Jiménez © {new Date().getFullYear()}</p>
          <p style="font-size: 0.55rem; opacity: 0.4; margin-top: 0.25rem; letter-spacing: 0.02em;">
            Los activos visuales (sprites) son propiedad de Google (Chrome Dino Game).
          </p>
        </div>
        <span class="footer-right">Diseñador Digital — Santa Marta, Colombia</span>
      </footer>

      {/* ─── BACK TO TOP ─── */}
      <button 
        class="back-to-top" 
        classList={{ visible: showBackToTop() }}
        onClick={() => lenis?.scrollTo(0)}
        aria-label="Volver arriba"
      >
        <span class="font-mono" style={{ "font-size": "1.2rem" }}>↑</span>
      </button>
    </>
  );
};

export default App;
