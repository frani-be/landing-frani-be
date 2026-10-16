/**
 * Set único de flechas/iconos minimalistas (estilo Lucide: stroke 2, caps redondos).
 * Usar ArrowIcon.astro en markup y svgIcon() en HTML generado por JS.
 */
export const ICON_PATHS = {
  upRight: 'M7 17 17 7M7 7h10v10',
  down: 'M12 5v14M6 13l6 6 6-6',
  left: 'M19 12H5M11 18l-6-6 6-6',
  right: 'M5 12h14M13 6l6 6-6 6',
  chevronRight: 'M9 6l6 6-6 6',
} as const;

export type IconName = keyof typeof ICON_PATHS;

export const svgIcon = (name: IconName, cls = '') =>
  `<svg class="icon-arrow ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${ICON_PATHS[name]}"/></svg>`;
