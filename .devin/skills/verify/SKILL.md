---
name: verify
description: Verificar que el sitio compila y reportar el estado de las páginas
triggers:
  - user
allowed-tools:
  - exec
---

Verificación del proyecto (no hay tests ni linter):

1. `export PATH="$HOME/.nvm/versions/node/v22.22.3/bin:$PATH"`
2. `npm run build` desde la raíz. Debe completar con `15 page(s) built` sin errores.
3. Si hay un dev server corriendo, hacer curl a las rutas clave y verificar HTTP 200:
   `/`, `/trayectoria`, `/servicios`, `/proyectos`, y una página de detalle de cada tipo.
4. Reportar: estado del build, warnings relevantes y rutas rotas si las hay.

Si el build se cuelga sin output, correr `npm ci` (archivos evictados en iCloud) y reintentar.
