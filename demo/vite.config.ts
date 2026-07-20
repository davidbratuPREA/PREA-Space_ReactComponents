import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  // GitHub Pages serves the site under /<repo-name>/.
  // GITHUB_ACTIONS is set automatically in CI, so local dev stays at '/'.
  base: process.env.GITHUB_ACTIONS ? '/PREA-Space_ReactComponents/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      // Allow importing TabsMain directly from the parent folder
      '@prea': path.resolve(__dirname, '../TabsMain'),
    },
    // Deduplicate packages so the parent component folders
    // use the same copies installed in demo/node_modules
    dedupe: ['react', 'react-dom', 'antd', '@ant-design/icons', 'lucide-react'],
  },
  server: {
    fs: {
      // Allow Vite to serve files from the parent PREATabs folder
      allow: ['..'],
    },
  },
  build: {
    outDir: 'dist',
  },
});
