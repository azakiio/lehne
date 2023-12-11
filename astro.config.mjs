import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";
import alpine from "@astrojs/alpinejs";
import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";
import remarkGfm from "remark-gfm";
import remarkSmartypants from "remark-smartypants";
import UnoCSS from "unocss/astro";

// https://astro.build/config
export default defineConfig({
  output: "server",
  site: "https://astro-blog-template.netlify.app",
  integrations: [
    mdx(),
    svelte(),
    alpine(),
    UnoCSS({
      injectReset: true, // or a path to the reset file
    }),
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
});
