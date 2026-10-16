---
name: dev
description: Levantar el dev server de Astro con la versión correcta de Node
triggers:
  - user
allowed-tools:
  - exec
---

Levantar el dev server del proyecto:

1. El Node del sistema es v20 y el proyecto requiere >=22.12. Usar siempre:
   `export PATH="$HOME/.nvm/versions/node/v22.22.3/bin:$PATH"`
2. Correr `npm run dev` en background desde la raíz del proyecto.
3. Esperar a que responda `http://localhost:4321` (curl) y reportar la URL.

Si el comando se cuelga sin output durante minutos, es probable que `node_modules` esté evictado en iCloud (los archivos tardan ~1.4s en leerse). Matar el proceso, correr `npm ci` y reintentar.
