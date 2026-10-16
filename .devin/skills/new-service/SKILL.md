---
name: new-service
description: Agregar un servicio nuevo (página de detalle + cards en índices)
argument-hint: "<slug> <título del servicio>"
triggers:
  - user
allowed-tools:
  - read
  - edit
  - grep
  - glob
  - exec
---

Agregar un servicio nuevo al sitio. El usuario provee slug y título; pedir el contenido faltante (tagline, descripción, bullets) o proponerlo siguiendo el tono existente (español chileno, tuteo estándar: "tienes", "escríbeme"; nunca voseo rioplatense).

Un servicio nuevo toca 3 archivos:

1. `src/pages/servicios/[slug].astro`
   - Agregar `{ params: { slug: '<slug>' } }` al array de `getStaticPaths`.
   - Agregar entrada al record `services` con: `title`, `tagline` (una línea de impacto), `description` (párrafo de "Cómo trabajo"), `bullets` (5-6 items de "¿Qué incluye?"), `cta` (texto del botón).

2. `src/pages/servicios/index.astro`
   - Agregar al array `principales` (servicio destacado con página propia): `{ slug, icon: svgIcon('<paths>'), title, short }`.
   - El icono es SVG stroke estilo Lucide: buscar paths apropiados, `viewBox="0 0 24 24"`, stroke-width 1.8 (el helper `svgIcon` ya lo envuelve).

3. `src/pages/index.astro`
   - Agregar una `.service-card` en la sección Servicios con el SVG inline (mismos paths que el icono del punto 2), título, `short` y link `/servicios/<slug>`.

Al terminar, correr `npm run build` (con Node 22: `export PATH="$HOME/.nvm/versions/node/v22.22.3/bin:$PATH"`) y verificar que la ruta `/servicios/<slug>` se genera.
