import {
  defineConfig,
  presetUno,
  presetTypography,
  transformerDirectives,
} from "unocss";

export default defineConfig({
  presets: [presetUno(), presetTypography()],
  transformers: [transformerDirectives()],
  theme: {
    colors: {
      main: "var(--text-main)",
      primary: "var(--primary-color)",
    },
  },
});
