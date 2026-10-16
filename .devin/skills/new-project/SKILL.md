---
name: new-project
description: Agregar un proyecto al portafolio (entrada en projects.json, página autogenerada)
argument-hint: "<id> <título del proyecto>"
triggers:
  - user
allowed-tools:
  - read
  - edit
  - grep
  - glob
  - exec
---

Agregar un proyecto nuevo al portafolio. Las páginas de detalle se generan automáticamente desde `public/data/projects.json` vía `getStaticPaths`, no hay que crear archivos de página.

1. Leer `public/data/projects.json` y copiar la estructura de una entrada existente.
2. Agregar la entrada nueva con: `id` (slug URL en kebab-case), `title`, `category`, `type`, `service` + `serviceLabel` (opcional, slugs válidos: `desarrollo-web`, `diseno-grafico`, `estrategia-ux`, `clases-particulares`), `description` (1-2 líneas para cards), `fullDescription` (Markdown, soporta `::: showcase` con imagen + `*descripción*` para `.logo-showcase`), `image` (ruta `assets/images/projects/...`), `tags`, `links` (`demo`, `repo`, `caseStudy`), `featured` (true solo si debe aparecer en home), `client`, `date`, `role`, `stack`.
3. Si hay imagen nueva, confirmar con el usuario que el archivo exista bajo `public/images/` (las rutas `assets/images/` se reescriben a `/images/`).
4. Correr `npm run build` (con Node 22: `export PATH="$HOME/.nvm/versions/node/v22.22.3/bin:$PATH"`) y verificar que se genera `/proyectos/<id>`.
