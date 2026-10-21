/**
 * Spotlight: glow radial que sigue al cursor dentro de cards.
 * Actualiza --mx / --my en el elemento; el CSS pinta el ::before con esas vars.
 * Se propagan las vars a todos los ancestros que hagan match.
 */
const SPOTLIGHT_SELECTOR =
  '.service-card, .pillar-card, .l-item';

export function initSpotlight() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.addEventListener('pointermove', (e) => {
    const target = e.target as Element | null;
    let el = target?.closest?.(SPOTLIGHT_SELECTOR) as HTMLElement | null;
    while (el) {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      el.style.setProperty('--my', `${e.clientY - rect.top}px`);
      el = el.parentElement?.closest?.(SPOTLIGHT_SELECTOR) as HTMLElement | null;
    }
  });
}
