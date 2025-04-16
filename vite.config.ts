/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import preserveDirectives from 'rollup-preserve-directives';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { peerDependencies, devDependencies } from './package.json';

const __dirname = dirname(fileURLToPath(import.meta.url));

const external = [
  'next/link',
  'next/navigation',
  'react/jsx-runtime',
  ...Object.keys(peerDependencies || {}),
  ...Object.keys(devDependencies || {}),
];

export default defineConfig({
  plugins: [
    react(),
    preserveDirectives(),
    dts({ rollupTypes: true }), // Output .d.ts files
  ],
  resolve: {
    alias: {
      src: resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
    },
    sourcemap: true,
    rollupOptions: {
      external: external,
      output: [
        {
          format: 'es',
          entryFileNames: '[name].mjs',
          preserveModules: true,
        },
        {
          format: 'cjs',
          entryFileNames: '[name].cjs',
          preserveModules: true,
          interop: 'auto',
        },
      ],
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
