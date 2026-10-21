import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

// DEMO build: swap the Microsoft library for a local shim and use relative paths for GitHub Pages.
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: { '@azure/msal-react': fileURLToPath(new URL('./src/msalShim.jsx', import.meta.url)) },
  },
});
