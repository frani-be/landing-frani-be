---
description: "Cómo agregar o editar contenido: proyectos, timeline y servicios. Aplicar al tocar public/data o páginas de detalle."
trigger: model_decision
---

# Modelo de contenido

## Proyectos (`public/data/projects.json`)

Campos por proyecto: `id` (slug de URL), `title`, `category`, `type`, `service` + `serviceLabel` (link al servicio), `description` (corta, cards), `fullDescription` (Markdown, página detalle), `image` (ruta `assets/images/...`, se reescribe a `/images/...`), `tags`, `links` (`demo`, `repo`, `caseStudy`), `featured` (aparece en home), `client`, `date`, `role`, `stack`.

- `proyectos/[id].astro` genera las páginas automáticamente desde el JSON (`getStaticPaths`), no hay que crear archivos.
- `fullDescription` soporta bloques `::: showcase ... :::` que se convierten en `.logo-showcase` (imagen + descripción en `*cursiva*`).
- Home muestra solo `featured: true` (ver script de `index.astro`).

## Timeline (`public/data/timeline.json`)

Items: `id`, `title`, `company`, `location`, `startDate`/`endDate` formato `YYYY-MM` (`endDate: "actualidad"` para vigente), `category` (una de `laboral`, `academica`, `docencia`, `voluntariados`), `description`.

- La descripción soporta markdown básico vía parser propio en los scripts de `index.astro` y `trayectoria.astro`: listas `- ` y negrita `**texto**`.
- Home muestra los 4 items más recientes; `/trayectoria` muestra todo con filtros por categoría.
- Los scripts de timeline están duplicados en `index.astro` y `trayectoria.astro`: un cambio de markup suele requerir editar ambos.

## Servicios (hardcodeados, no hay JSON)

Para agregar un servicio hay que tocar 3 lugares:

1. `src/pages/servicios/[slug].astro`: agregar `{ params: { slug } }` en `getStaticPaths` + entrada en el record `services` (`title`, `tagline`, `description`, `bullets`, `cta`).
2. `src/pages/servicios/index.astro`: agregar al array `principales` (con `slug` e `icon` SVG via helper `svgIcon`) o `secundarios`.
3. `src/pages/index.astro`: agregar la `.service-card` correspondiente en la sección Servicios.

## Contacto

El formulario envía a Formspree (`https://formspree.io/f/xkoaednq`) hardcodeado en `ContactSection.astro`. Email de contacto: `hola@frani.be`. Calendario: link de Google Calendar hardcodeado en varios lugares.
