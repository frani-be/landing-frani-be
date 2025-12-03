---
trigger: always_on
---

# CODING STANDARDS

## HTML & Structure

- Use Semantic HTML elements (`<header>`, `<section>`, `<article>`, `<footer>`).
- Accessibility (a11y) is a priority: Always include `aria-labels`, `alt` tags, and ensure keyboard navigation.
- Project Structure:
  - Keep content data in `data/*.json` (e.g., `projects.json`).
  - Keep logic in `js/*.js`.
  - Keep styles in Tailwind classes.

## CSS (Tailwind)

- Use Tailwind utility classes for styling. Avoid custom CSS in `<style>` blocks unless absolutely necessary for complex animations.
- Design System:
  - Primary Color: Purple/Violet (Maintain the brand identity).
  - Layout: Mobile-first approach using Grid and Flexbox.

## JavaScript

- Use modern ES6+ syntax (arrow functions, async/await, fetch).
- Modular Code: Functions should be small and single-purpose (e.g., `renderProjects()`, `loadData()`).
- Data Binding: When rendering from JSON, ensure handling of missing fields (e.g., checking if `project.links.demo` exists before rendering the button).