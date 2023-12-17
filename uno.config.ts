import { defineConfig, presetUno, presetTypography } from "unocss";

export default defineConfig({
  presets: [presetUno(), presetTypography()],
  theme: {
    colors: {
      main: "var(--text-main)",
      primary: "var(--primary-color)",
    },
  },
});
