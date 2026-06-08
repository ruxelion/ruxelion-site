import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: 'https://ruxelion.com',
  output: 'static',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: { prefixDefaultLocale: false },
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-US', fr: 'fr-FR' },
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  prefetch: true,
  adapter: cloudflare()
})