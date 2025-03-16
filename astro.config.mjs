// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { storyblok } from "@storyblok/astro";

import cloudflare from "@astrojs/cloudflare";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

import basicSsl from "@vitejs/plugin-basic-ssl";

import { loadEnv } from 'vite'

import { apiPlugin, storyblokInit } from '@storyblok/js';

const { storyblokApi } = storyblokInit({
  accessToken: 'wJsAtBar4zDNeUJfurrjmAtt',
  apiOptions: {
    // storyblok-js-client config object
    cache: { type: 'memory' },
  },
  use: [apiPlugin],
});

const env = loadEnv("", process.cwd(), 'STORYBLOK')

// https://astro.build/config

export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap(), react(), storyblok({

      accessToken: "wJsAtBar4zDNeUJfurrjmAtt",

      components: {

        page: 'storyblok/Page',
    
        feature: 'storyblok/Feature',
    
        grid: 'storyblok/Grid',
    
        teaser: 'storyblok/Teaser',
    
      },
      })
  ],

  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),

  vite: {
    plugins: [tailwindcss(), basicSsl()],
    server: {
      // @ts-ignore
      https: true,
    }
  }
});