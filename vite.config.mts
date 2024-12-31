import { defineConfig } from 'vite';
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  resolve: {
    alias: {
      '@wasm': '/build.em',
    },
  },
  plugins: [
    topLevelAwait()
  ]
});