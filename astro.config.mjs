import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import compressor from 'astro-compressor';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://jaber.dev',
  integrations: [
    react(),
    sitemap({
      changefreq: 'weekly',
      priority: 1.0,
      lastmod: new Date(),
    }),
    compressor({
      gzip: true,
      brotli: true,
    }),
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});
