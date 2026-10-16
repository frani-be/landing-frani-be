---
description: "Contexto general del proyecto landing-frani-be-astro"
trigger: always_on
---

# Contexto del proyecto

Landing / portafolio personal de Francisca Beatriz Medina Concha (frani.be), Strategic UX Designer & Front-End Engineer.

## Stack

- Astro 6 con output estático (SSG).
- Tailwind CSS v4 via `@tailwindcss/vite` (los tokens viven en `@theme` dentro de `src/styles/global.css`, no hay `tailwind.config`).
- Sin framework JS de UI: la interactividad es `<script>` inline con TypeScript + Web Animations API.
- `marked` para renderizar `fullDescription` de proyectos (Markdown).

## Estructura

- `src/pages/` rutas: `index`, `trayectoria`, `servicios` (index + `[slug]`), `proyectos` (index + `[id]`).
- `src/components/` `BaseLayout` (nav + sección contacto + footer, en TODAS las páginas), `PageHero`, `SectionTitle`, `SocialLinks`, `ContactSection`, `CtaSection`, `LinksModal`, `Breadcrumb`.
- `src/scripts/` `reveal.ts` (scroll-reveal WAAPI), `projects.ts` (cards + modal de links).
- `public/data/projects.json` y `public/data/timeline.json` contenido dinámico.
- `public/images/` fotos, `icons.svg` (sprite: logo, rrss).

## Entorno (importante)

- Node `>=22.12` requerido. El Node por defecto del sistema es v20. Antes de correr npm:
  `export PATH="$HOME/.nvm/versions/node/v22.22.3/bin:$PATH"`
- `~/Documents` está sincronizado con iCloud. Si `node_modules` queda evictado, el build se cuelga leyendo archivos (~1.4s por archivo). Fix: `npm ci` (reinstala desde cache, local y rápido).

## Verificación

- `npm run build` debe completar sin errores (15 páginas estáticas).
- No hay tests ni linter configurados.

## Deploy

- GitHub Pages vía `.github/workflows/deploy.yml` (push a `main` o `workflow_dispatch`, acción oficial `withastro/action`, Node 22).
- Dominio custom `frani.be` vía `public/CNAME` y `site` en `astro.config.mjs`.
- En el repo de GitHub: Settings → Pages → Source = "GitHub Actions".

## Convenciones de contenido

- UI en español chileno con tuteo estándar: "Escríbeme", "Cuéntame", "Tienes", "Puedes".
- NO usar voseo rioplatense: evitar "Tenés", "Podés", "Escribime", "Contame", "Agendá", "por vos". La dueña es chilena.
- Regla global: no usar el caracter "—" (guion largo) en copy ni comentarios.
