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
      entry: {
        components: resolve(dirname(''), join('src', 'components', 'index.ts')),
        consts: resolve(dirname(''), join('src', 'consts', 'index.ts')),
        contexts: resolve(dirname(''), join('src', 'contexts', 'index.ts')),
        form: resolve(dirname(''), join('src', 'form', 'index.ts')),
        hocs: resolve(dirname(''), join('src', 'hocs', 'index.ts')),
        hooks: resolve(dirname(''), join('src', 'hooks', 'index.ts')),
        mantine: resolve(dirname(''), join('src', 'mantine', 'index.ts')),
        utils: resolve(dirname(''), join('src', 'utils', 'index.ts')),
        types: resolve(dirname(''), join('src', 'types', 'index.ts')),
        // Add other entry points here if needed
      },
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
