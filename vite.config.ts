/// <reference types="vitest/config" />

import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react-swc'
import preserveDirectives from 'rollup-preserve-directives'
import type { Plugin } from 'vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { dependencies, peerDependencies } from './package.json'

const __dirname = dirname(fileURLToPath(import.meta.url))
const srcRoot = resolve(__dirname, 'src').replaceAll('\\', '/')

const stripSrcPrefix = (): Plugin => ({
  name: 'strip-src-prefix',
  generateBundle(_, bundle) {
    for (const item of Object.values(bundle)) {
      if (item.fileName.startsWith('src/')) {
        item.fileName = item.fileName.slice('src/'.length)
      }
    }
  },
})

const externalPackages = [
  ...Object.keys(peerDependencies || {}),
  ...Object.keys(dependencies || {}),
]

const isExternal = (id: string): boolean => {
  return externalPackages.some(
    (packageName) => id === packageName || id.startsWith(`${packageName}/`),
  )
}

export default defineConfig({
  plugins: [
    react(),
    preserveDirectives(),
    stripSrcPrefix(),
    dts({ bundleTypes: true }), // Output .d.ts files
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
      external: isExternal,
      output: {
        // Preserva los módulos ESM para que funcione "use client"
        preserveModules: true,
        preserveModulesRoot: srcRoot,

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
      enabled: true,
    },
  },
})
