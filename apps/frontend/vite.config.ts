/// <reference types="vitest" />
import eslintPlugin from '@nabla/vite-plugin-eslint';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    mode !== 'test' && eslintPlugin(),
    checker({
      typescript: true,
    }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      __tests__: path.resolve(__dirname, 'src/__tests__'),
      __mocks__: path.resolve(__dirname, 'src/__mocks__'),
    },
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true,
  },
  build: {
    outDir: './dist',
  },
  // esbuild: {
  //   tsconfigRaw: require('./tsconfig.json'),
  // },
}));
