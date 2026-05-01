# Concepto de Portafolio: Pedro Jiménez

Este documento de concepto detalla la dirección visual, la estructura (wireframe) y las directrices de interacción para el portafolio personal de Pedro Jiménez, un estudiante de Diseño Digital y aspirante a Diseñador UX/UI. El estilo propuesto es moderno, minimalista, elegante e interactivo.

---

## 1. Descripción Visual General
El diseño general del portafolio transmite sofisticación y un profundo entendimiento de la usabilidad y la estética (características esenciales para un Diseñador UX/UI). Inspirado en portafolios de alto nivel (como *dousanmiao.com*, *ethanchng.com* y *lukaschulz.com*), el sitio abraza la filosofía de "menos es más".

Se utiliza un uso generoso del **espacio en blanco** (negative space) para permitir que los proyectos respiren y guiar la mirada del usuario de manera natural. No hay elementos visuales innecesarios; la estructura se basa en **tipografía en negrita, cuadrículas precisas y líneas finas**. Las sutiles animaciones proporcionan vida y dinamismo, asegurando que la experiencia nunca se sienta estática, sino inmersiva y altamente premium.

---

## 2. Guía de Estructura de Wireframe (Layout Guidance)
El sitio está estructurado en una experiencia fluida de una sola página (o pocas páginas), priorizando una metodología *Mobile-First*, lo que significa que la grilla es responsiva y se expande armónicamente para pantallas grandes.

### Navegación (Header)
*   **Posición:** Fija en la parte superior, reduciéndose sutilmente al hacer scroll (efecto glassmorphism opcional).
*   **Izquierda:** Logotipo minimalista (ej: "Pedro Jiménez" o "PJ." en tipografía audaz).
*   **Derecha:** Enlaces de navegación con mucha separación entre ellos: *"Proyectos Destacados", "Proceso", "Sobre Mí", "Contacto"*. Menú de hamburguesa en la versión móvil.

### Hero Section (Sección Principal)
*   **Espacio:** Ocupa el 100% del alto de la pantalla (100vh).
*   **Alineación:** Texto masivo centrado o alineado a la parte inferior izquierda, jugando con proporciones asimétricas.
*   **Contenido:**
    *   Título gigante: **"Pedro Jiménez"**
    *   Subtítulo / Introducción (tamaño mediano-grande, color secundario): *"Estudiante de Diseño Digital | Aspirante a Diseñador UX/UI"*
*   **Elemento UI:** Un pequeño indicador animado (ej: una flecha fina moviéndose hacia abajo o "Scroll para ver más") en el borde inferior.

### Proyectos Destacados (Featured Projects)
*   **Estructura:** Grilla de 1 columna para móviles o 2 columnas en diseño de mampostería (masonry/staggered) para escritorio.
*   **Tarjetas de Proyecto:** Contenedores sin bordes gruesos, solo las imágenes o mockups de alta resolución que llenan el espacio (Immersive Previews).
*   **Metadatos bajo la imagen:** Al lado o debajo de cada tarjeta se muestra el nombre del proyecto (ej: "Rediseño App Bancaria") y los roles desempeñados ("Investigación UX • UI Design").

### Proceso / Enfoque (Process / Approach)
*   **Estructura:** Línea de tiempo horizontal o vertical muy limpia.
*   **Contenido:** Los pasos de la metodología (1. Descubrimiento, 2. Ideación, 3. Diseño, 4. Pruebas), destacados por números gigantes y una breve línea descriptiva. Representa de forma contundente la forma en que resuelves los problemas.

### Sobre Mí (About Me)
*   **Estructura:** Diseño asimétrico de texto e imagen.
*   **Contenido:** Una biografía breve y directa (Short Bio), valores profesionales y un listado limpio de habilidades (texto estructurado en forma de tabla o viñetas minimalistas).
*   **Recurso visual:** Una foto profesional monocromática o una ilustración conceptual abstracta en 3D que refleje el aspecto digital.

### Contacto (Contact Footer)
*   **Espacio:** Una sección hero de cierre que abarca gran parte de la pantalla final.
*   **Contenido:** Titular de cierre muy grande, por ejemplo: *"¿Trabajamos juntos?"* o *"Hablemos de diseño."*
*   **Enlaces:** Direcciones bien visibles:
    *   Email: `pedroly753@gmail.com`
    *   LinkedIn: [LinkedIn](https://www.linkedin.com/in/pedro-jos%C3%A9-jimenez-martinez-3b000a260/)
*   **Footer inferior:** Créditos simples ("Diseñado y desarrollado por Pedro Jiménez © 2026").

---

## 3. Directrices de Estilo e Interacción (Guidelines)

### Paleta de Colores y Mood
La paleta es sobria, confiando en los contrastes para atraer la atención.
*   **Fondo principal:** Blanco nube o gris excepcionalmente claro (`#FAFAFA` a `#FFFFFF`).
*   **Texto principal:** Negro suave / Gris grafito oscuro (`#111111` o `#1A1A1A`) para reducir la fatiga visual frente a pantallas brillantes.
*   **Color de Acento (Bold Hue):** Un color vibrante y único utilizado *exclusivamente* para interacciones táctiles, líneas finas, palabras clave o los estados *hover*. Ejemplos recomendados: un Azul Klein vibrante (`#002FA7`), o un Naranja Óxido moderno (`#D8563A`).
*   **UI Components:** Uso mínimo de paneles, aprovechando el fondo plano. Sutiles sombras desenfocadas (soft drop shadows con 5% de opacidad) solo si es estrictamente necesario para profundidad. Líneas finas divisorias (1px sólido gris claro `#E5E5E5`).

### Jerarquía Tipográfica sugerida
Se recomienda evitar las fuentes por defecto para darle un carácter más premium:
*   **Titulares (Headings - Nombres, Proyectos, Secciones):** Una tipografía audaz y geométrica.
    *   *Opciones:* **Outfit**, **Space Grotesk** o **Söhne** (Neo-grotescas).
    *   *Uso:* Peso Bold o Extrabold. Rastreo de letras (letter-spacing) ligeramente reducido (ej: `-2%`) para que las letras grandes se sientan ajustadas y de aspecto editorial.
*   **Párrafos y Etiquetas (Body y Labels):** Una tipografía extremadamente legible.
    *   *Opciones:* **Inter** o **Roboto**.
    *   *Uso:* Peso Regular (400) o Light (300). Altura de línea alta (ej: `1.6` o `150%`) para facilitar la lectura.

### Ideas de Interacción y Animación
Para inspirar esa sensación moderna y dinámica:
1.  **Cursor Personalizado:** El cursor estándar del mouse es reemplazado por un pequeño punto que, al pasar por un proyecto o enlace, se expande a un círculo transparente (*magnetic hover*).
2.  **Entrada Text-Reveal (Framer-style):** Las palabras clave en la sección Hero aparecen deslizándose hacia arriba o desvaneciéndose individualmente (staggered animation) al entrar por primera vez al sitio.
3.  **Animaciones al hacer Scroll (On-Scroll):**
    *   A medida que el usuario desciende, las secciones aparecen flotando suavemente desde abajo (*Fade Up*).
    *   Efecto de *parallax* sutil en las imágenes de "Proyectos Destacados", dándoles profundidad mientras se hace scroll sobre ellas.
4.  **Efectos Hover en Proyectos:** Al colocar el cursor sobre un proyecto en la cuadrícula, la cubierta realiza una micromecánica fluida reduciendo su brillo u opacidad general y aplicando un zoom interno imperceptible (*scale 1.05*) dentro de su contenedor (ease-out-expo).
5.  **Hover de Navegación:** Los enlaces de texto ("Sobre Mí", "Contacto") no tienen el típico subrayado estático, sino un subrayado animado que corre de izquierda a derecha en el color de acento.
