import { defineConfig, presetUno, transformerDirectives } from "unocss";

export default defineConfig({
  presets: [presetUno()],
  theme: {
    colors: {
      main: "var(--text-main)",
      primary: "var(--primary-color)",
      brand: "#0061a0",
    },
  },
});
