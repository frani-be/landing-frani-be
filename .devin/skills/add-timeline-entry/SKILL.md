---
name: add-timeline-entry
description: Agregar una entrada al timeline de trayectoria (timeline.json)
argument-hint: "<título> <categoría>"
triggers:
  - user
allowed-tools:
  - read
  - edit
  - grep
  - exec
---

Agregar una entrada al timeline de trayectoria en `public/data/timeline.json`.

1. Leer `public/data/timeline.json` y copiar la estructura de un item existente.
2. Pedir o confirmar con el usuario los campos que falten:
   - `id`: numérico, usar `max(id) + 1` de los existentes.
   - `title`: puesto o nombre de la formación/actividad.
   - `company` y `location`.
   - `startDate` / `endDate` en formato `YYYY-MM`. Usar `"actualidad"` como endDate si está vigente.
   - `category`: una de `laboral` (experiencia laboral), `academica` (formación), `docencia`, `voluntariados`.
   - `description`: soporta markdown básico del parser propio: líneas sueltas son párrafos, `- ` arma listas, `**texto**` es negrita.
3. Insertar el item en el array `timeline` (el orden del array no importa, el render ordena por `startDate` descendente).
4. La home muestra solo los 4 más recientes; `/trayectoria` muestra todo. No hay que tocar código.
5. Verificar con `npm run build` (Node 22: `export PATH="$HOME/.nvm/versions/node/v22.22.3/bin:$PATH"`) o, con dev server corriendo, hacer curl a `/` y `/trayectoria`.
