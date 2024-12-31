import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@wasm': '/build.em',
    },
  },
});