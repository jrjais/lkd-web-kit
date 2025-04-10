/// <reference types="vitest/config" />
import { dirname, join, resolve } from 'node:path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import { peerDependencies } from './package.json';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

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
        components: resolve(__dirname, 'src/components/index.ts'),
        consts: resolve(__dirname, 'src/consts/index.ts'),
        contexts: resolve(__dirname, 'src/contexts/index.ts'),
        form: resolve(__dirname, 'src/form/index.ts'),
        hocs: resolve(__dirname, 'src/hocs/index.ts'),
        hooks: resolve(__dirname, 'src/hooks/index.ts'),
        mantine: resolve(__dirname, 'src/mantine/index.ts'),
        utils: resolve(__dirname, 'src/utils/index.ts'),
        types: resolve(__dirname, 'src/types/index.ts'),
        // Add other entry points here if needed
      },
      fileName: (format, entryName) => `${entryName}.${format}.js`,
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
