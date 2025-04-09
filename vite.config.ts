/// <reference types="vitest/config" />
import { join, resolve, dirname } from 'node:path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import { peerDependencies } from './package.json';

console.log(['react/jsx-runtime', ...Object.keys(peerDependencies)]);
export default defineConfig({
  plugins: [
    react(),
    dts({ rollupTypes: true }), // Output .d.ts files
  ],
  optimizeDeps: {
    exclude: ['react/jsx-runtime', ...Object.keys(peerDependencies)],
  },
  build: {
    target: 'esnext',
    minify: false,
    lib: {
      entry: resolve(dirname(''), join('src', 'index.ts')),
      fileName: 'index',
      cssFileName: 'style',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // Exclude peer dependencies from the bundle to reduce bundle size
      external: ['react/jsx-runtime', ...Object.keys(peerDependencies)],
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      all: false,
      enabled: true,
    },
  },
});
