/**
 * Spotlight: glow radial que sigue al cursor dentro de cards interactivas.
 * Actualiza --mx / --my en el elemento; el CSS pinta el ::before con esas vars.
 */
const SPOTLIGHT_SELECTOR =
  '.service-card, .project-card, .pillar-card, .l-item';

export function initSpotlight() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.addEventListener('pointermove', (e) => {
    const target = e.target as Element | null;
    const el = target?.closest?.(SPOTLIGHT_SELECTOR) as HTMLElement | null;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  });
}
