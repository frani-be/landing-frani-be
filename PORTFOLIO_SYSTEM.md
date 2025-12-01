# Sistema de Portafolio - Documentación

## 📋 Resumen

Sistema completo de portafolio implementado con arquitectura escalable, siguiendo el mismo patrón del Timeline existente. Utiliza HTML, JavaScript Vanilla y Tailwind CSS.

## 🏗️ Arquitectura

### Estructura de Archivos

```
landing-frani-be/
├── assets/
│   ├── data/
│   │   └── projects.json          # Datos de proyectos
│   ├── scripts/
│   │   └── projects.js            # Lógica del portafolio
│   └── styles/
│       └── custom.css             # Estilos personalizados
├── index.html                      # Home con proyectos destacados
├── projects.html                   # Listado completo de proyectos
└── project-detail.html            # Página de detalle individual
```

## 📊 Estructura de Datos (JSON)

### Esquema del Proyecto

```json
{
  "id": "string",                   // ID único (slug-format)
  "title": "string",                // Título del proyecto
  "category": "string",             // Categoría del proyecto
  "description": "string",          // Descripción breve (para cards)
  "fullDescription": "string",      // Descripción completa (Markdown)
  "tags": ["string"],               // Array de tecnologías/metodologías
  "image": "string",                // URL de imagen
  "links": {
    "demo": "string",               // URL demo (opcional)
    "repo": "string",               // URL repositorio (opcional)
    "caseStudy": "string"           // URL case study (opcional)
  },
  "featured": boolean,              // true para mostrar en Home
  "client": "string",               // Nombre del cliente
  "date": "string",                 // Año o fecha
  "role": "string",                 // Rol en el proyecto
  "stack": "string"                 // Stack tecnológico resumido
}
```

### Categorías Disponibles

- `"Proyecto Laboral"`
- `"Proyecto Académico"`
- `"Freelance"`
- `"Personal"`
- `"Voluntariado"`

## 🎨 Componentes Implementados

### 1. Sección Proyectos Destacados (Home)

**Ubicación:** `index.html` - Sección `#proyectos`

**Características:**
- Muestra solo proyectos con `featured: true`
- Grid responsive (1 col móvil, 2 cols desktop)
- Efecto Ghost en el título
- Animación de entrada escalonada
- Botón "Ver todos los proyectos"

**Estilos Tailwind:**
- Contenedor: `py-20 bg-white`
- Grid: `grid grid-cols-1 md:grid-cols-2 gap-8`
- Cards: `bg-white rounded-xl shadow-sm hover:shadow-lg`

### 2. Página Listado Completo (projects.html)

**Características:**
- Muestra todos los proyectos del JSON
- Filtros por categoría funcionales
- Grid responsive (1/2/3 columnas)
- Hero section con efecto Ghost
- Mismo header y footer que index.html

**Filtros:**
- Todos
- Proyectos Laborales
- Voluntariados
- Proyectos Académicos
- Proyectos Personales

### 3. Página Detalle Individual (project-detail.html)

**Características:**
- Lee parámetro URL: `?id=proyecto-id`
- Hero con imagen de fondo
- Sidebar con metadata (Cliente, Fecha, Rol, Stack)
- Contenido principal con Markdown parseado
- Tags visuales
- Links a Demo/Repo/Case Study
- Estados: Loading, Error, Content
- SEO optimizado (meta tags dinámicos)

**Estructura:**
- Hero Section
- Project Image (aspect-video)
- Grid 2 columnas (contenido + sidebar)
- CTA Section
- Footer

## 🔧 Funcionalidades JavaScript

### Clase `ProjectsPortfolio`

**Métodos Principales:**

```javascript
// Inicialización
async init()
async loadProjectsData()
detectPageAndRender()

// Renderizado
renderFeaturedProjects()      // Home: proyectos destacados
renderAllProjects(category)   // Listing: todos los proyectos
renderProjectDetail()         // Detail: proyecto individual

// Utilidades
createProjectCard(project)    // Genera HTML de card
parseMarkdown(text)           // Convierte Markdown a HTML
showProjectLinks(projectId)   // Muestra links del proyecto
animateCards()                // Animación de entrada
setupCategoryFilters()        // Configura filtros
```

### Detección Automática de Página

El sistema detecta automáticamente en qué página está y ejecuta la lógica correspondiente:

- `index.html` → `renderFeaturedProjects()`
- `projects.html` → `renderAllProjects()` + filtros
- `project-detail.html` → `renderProjectDetail()`

## 🎯 Características Destacadas

### 1. Arquitectura Escalable
- Datos centralizados en JSON
- Fácil agregar/editar proyectos
- Sin duplicación de código

### 2. Markdown Support
El sistema parsea Markdown básico en `fullDescription`:
- Headers: `#`, `##`, `###`
- Bold: `**texto**` o `__texto__`
- Listas: `- item`

### 3. Animaciones
- Entrada escalonada de cards
- Hover effects suaves
- Transiciones fluidas

### 4. Responsive Design
- Mobile-first approach
- Breakpoints: móvil, tablet, desktop
- Grid adaptativo

### 5. SEO Optimizado
- Meta tags dinámicos en detail page
- Open Graph tags
- Twitter Card tags

## 📝 Cómo Agregar un Nuevo Proyecto

1. Abre `assets/data/projects.json`
2. Agrega un nuevo objeto al array `projects`:

```json
{
  "id": "mi-nuevo-proyecto",
  "title": "Mi Nuevo Proyecto",
  "category": "Proyecto Laboral",
  "description": "Descripción breve del proyecto",
  "fullDescription": "## Descripción completa\n\nTexto con **markdown**.\n\n- Item 1\n- Item 2",
  "tags": ["React", "TypeScript", "Tailwind"],
  "image": "https://url-de-imagen.jpg",
  "links": {
    "demo": "https://demo.com",
    "repo": "https://github.com/usuario/repo",
    "caseStudy": ""
  },
  "featured": true,
  "client": "Cliente XYZ",
  "date": "2024",
  "role": "Full Stack Developer",
  "stack": "React, Node.js, PostgreSQL"
}
```

3. Guarda el archivo
4. El proyecto aparecerá automáticamente en el sitio

## 🎨 Paleta de Colores

```css
--custom-purple: #b55aff
--custom-purple-dark: #8b2db3
--custom-light-purple: #e8d4f9
--custom-dark-gray: #565656
--custom-black: #2f2f2f
--custom-light-grey: #f1f1f1
```

## 🔗 URLs del Sistema

- **Home:** `index.html#proyectos`
- **Listado:** `projects.html`
- **Detalle:** `project-detail.html?id=proyecto-id`

## ✅ Checklist de Implementación

- [x] Estructura de datos JSON
- [x] Sección destacados en Home
- [x] Página listado completo
- [x] Página detalle individual
- [x] Lógica JavaScript completa
- [x] Filtros por categoría
- [x] Animaciones y transiciones
- [x] Responsive design
- [x] Markdown parsing
- [x] SEO optimization
- [x] Estados de carga y error

## 🚀 Próximos Pasos (Opcional)

- [ ] Agregar búsqueda por texto
- [ ] Implementar paginación
- [ ] Agregar lightbox para imágenes
- [ ] Sistema de tags clickeables
- [ ] Proyectos relacionados
- [ ] Compartir en redes sociales
- [ ] Analytics tracking

## 📚 Recursos

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Markdown Guide](https://www.markdownguide.org/)
- [Unsplash](https://unsplash.com/) - Imágenes placeholder

---

**Desarrollado por:** Francisca Beatriz Medina Concha  
**Fecha:** Diciembre 2025  
**Stack:** HTML5, JavaScript ES6+, Tailwind CSS
