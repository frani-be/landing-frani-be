// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://frani.be',
  integrations: [sitemap({
    i18n: {
      defaultLocale: 'es',
      locales: { es: 'es-CL', en: 'en' },
    },
  })],
  vite: {
    plugins: [tailwindcss()]
  }
});