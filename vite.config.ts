import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true, // Enables Vitest global functions like describe, test, expect
    environment: 'jsdom', // Provides a browser-like environment for tests
  },
});
