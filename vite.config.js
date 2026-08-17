import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const sourceRoot = fileURLToPath(new URL('./src', import.meta.url));
const appContextPath = fileURLToPath(new URL('./src/app-context.tsx', import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/context/app-context': appContextPath,
      '@': sourceRoot,
    },
  },
});
