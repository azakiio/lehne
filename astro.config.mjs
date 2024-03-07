import alpine from "@astrojs/alpinejs";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";
import remarkGfm from "remark-gfm";
import remarkSmartypants from "remark-smartypants";
import UnoCSS from "unocss/astro";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: "de",
    locales: ["en", "de"],
  },
  output: "server",
  site: "https://lehne-ing.de",
  integrations: [
    mdx(),
    svelte(),
    alpine(),
    UnoCSS({
      injectReset: true, // or a path to the reset file
    }),
    react(),
    sitemap(),
  ],
  markdown: {
    shikiConfig: {
      theme: "nord",
    },
    remarkPlugins: [remarkGfm, remarkSmartypants],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: "_blank",
        },
      ],
    ],
  },
  adapter: vercel(),
});
