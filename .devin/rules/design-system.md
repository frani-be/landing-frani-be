---
description: "Sistema de diseño: tokens, componentes de estilo, iconos y animaciones. Aplicar al editar CSS o componentes visuales."
trigger: model_decision
---

# Design system

Todo el sistema vive en `src/styles/global.css` (tokens `@theme` + clases custom). No crear un segundo sistema; reusar lo existente.

## Tokens (`@theme`)

- Colores: `custom-purple` `#b55aff` (marca), `custom-purple-dark` `#8b2db3`, `custom-purple-deep` `#6d1a96`, `custom-light-purple` `#eedffc`, `custom-light-grey` `#f7f5fa`, `custom-dark-gray` `#5c5766`, `custom-black` `#241d2e`.
- Categorías timeline: `laboral` `#2555a3`, `academica` `#9f2eba`, `docencia` `#7d1fc7`, `voluntariados` `#bd2c97`.
- Tipografía: `font-titles` = Space Grotesk (peso 600 en headings), `font-primary` = DM Sans (body, `font-light` en body).
- Escala espaciado: `--space-1` a `--space-20` (0.5rem a 10rem).

## Clases utilitarias propias

- Layout: `.container-wide` (1380px) / `.container-mid` (1000px) / `.container-narrow` (700px); `.section-block` (secciones grandes) / `.section-block-sm` (internas).
- Botones: `.btn` base pill (`border-radius: 999px`, font-titles 600) + `.btn-primary` (gradiente púrpura con sombra), `.btn-secondary` (outline en claro), `.btn-outline-white` y `.btn-white` (sobre púrpura), `.btn-tertiary` (link).
- Títulos: `<SectionTitle title ghost dark>` ghost = texto gigante con `-webkit-text-stroke` detrás del título.
- Heroes internos: `<PageHero>` con `.page-hero` (gradiente púrpura de 3 capas + ghost).
- Cards: `.service-card` + `.service-card-icon` (banda con gradiente lavanda), `.project-card`, `.timeline-content`, `.icon-tile` (+`.icon-tile-lg`).
- Contacto: `.contact-section` (fondo), `.contact-input` (glass), `.contact-icon-pill`.

## Iconos

- NO usar emojis en la UI. Iconos = SVG stroke inline estilo Lucide: `viewBox="0 0 24 24"`, `stroke-width="1.8"`, `stroke-linecap/linejoin="round"`.
- En `.service-card-icon`, `.icon-tile`, `.btn` y `#links-modal-body` el CSS ya aplica `fill:none; stroke:currentColor`; el resto de SVGs hereda `fill: currentColor` global.
- Redes sociales: sprite `/images/icons.svg` con `<use href="/images/icons.svg#id">`.

## Animación

- Scroll-reveal: `data-reveal` (+`data-reveal-delay` en ms) + `import { initReveal } from '../scripts/reveal'` en cada página.
- La regla global `svg { height: 0.95em; fill: currentColor }` pisa atributos `fill` de presentación: los iconos stroke necesitan cobertura CSS o `fill="none"` a nivel path.
