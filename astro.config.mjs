import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://feature-tour.netlify.app',
  integrations: [
    preact(),
    sitemap({
      canonicalURL: 'https://feature-tour.netlify.app'
    }),
    react()
  ],
});
