import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";
import alpine from "@astrojs/alpinejs";
import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";
import remarkGfm from "remark-gfm";
import remarkSmartypants from "remark-smartypants";
import UnoCSS from "unocss/astro";
import vercel from "@astrojs/vercel/serverless";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: "de",
    locales: ["en", "de"],
  },
  output: "server",
  site: "https://astro-blog-template.netlify.app",
  integrations: [
    mdx(),
    svelte(),
    alpine(),
    UnoCSS({
      injectReset: true, // or a path to the reset file
    }),
    react(),
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
