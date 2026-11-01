import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { fumadocsMdx } from 'fumadocs-mdx/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [fumadocsMdx(), tailwindcss(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  // Prerendering fetches every page from a temporary preview server. Bind it
  // to IPv4 loopback explicitly: where `localhost` resolves to ::1 first
  // (Hostinger), the requests otherwise miss the server (ECONNREFUSED ::1).
  preview: {
    host: '127.0.0.1',
  },
});
