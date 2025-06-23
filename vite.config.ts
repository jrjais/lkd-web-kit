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
    lib: {
      // Punto de entrada principal de la biblioteca
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'lkd-web-kit',
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'js' : 'cjs'}`,
      // Formatos de salida
      formats: ['es', 'cjs'],
    },
    // sourcemap: true,
    rollupOptions: {
      external: external,
      output: {
        // Preserva los módulos ESM para que funcione "use client"
        preserveModules: true,
        preserveModulesRoot: 'src',

        // Configura exports globales para las dependencias externas
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
    // Importante: Este ajuste asegura compatibilidad con Next.js
    target: 'esnext',

    // No minificar para mejor compatibilidad
    minify: false,

    // Asegura que los módulos se mantengan separados
    cssCodeSplit: true,

    // Directorio de salida
    outDir: 'dist',

    // No genera un archivo de tipos de construcción
    emptyOutDir: true,
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
