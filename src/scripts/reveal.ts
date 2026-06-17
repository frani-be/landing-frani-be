/**
 * Scroll-reveal: fade + slide-up on [data-reveal] elements.
 * Uses IntersectionObserver + native Web Animations API (WAAPI).
 * Supports data-reveal-delay="150" (ms).
 */
export function initReveal(root: Document | ParentNode = document) {
  const els = Array.from(
    (root as Document).querySelectorAll<HTMLElement>('[data-reveal]')
  );
  if (!els.length) return;

  els.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const delay = Number(el.dataset.revealDelay ?? 0);
        el.animate(
          [
            { opacity: '0', transform: 'translateY(52px)' },
            { opacity: '1', transform: 'translateY(0)' },
          ],
          {
            duration: 1100,
            delay,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            fill: 'forwards',
          }
        );
        observer.unobserve(el);
      });
    },
    { threshold: 0.08 }
  );

  els.forEach(el => observer.observe(el));
}
