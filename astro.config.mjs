// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://theboshy.github.io',
  build: { inlineStylesheets: 'always' },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    plugins: [tailwindcss()],
    // GSAP is imported dynamically; pre-bundling it stops Vite from discovering it late and reloading in dev
    optimizeDeps: { include: ['gsap', 'gsap/MotionPathPlugin'] },
  },
});
