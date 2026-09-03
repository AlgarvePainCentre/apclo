import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'apc-preload-core-css',
      enforce: 'post',
      transformIndexHtml(html, ctx) {
        const bundle = (ctx as any)?.bundle as Record<string, any> | undefined;
        if (!bundle) return html;

        const cssFile = Object.keys(bundle).find((fileName) => fileName.endsWith('.css'));
        if (!cssFile) return html;

        const preloadTag = `<link rel="preload" as="style" href="/${cssFile}" crossorigin>`;
        if (html.includes(preloadTag)) return html;

        const insertionPoint = html.indexOf('</head>');
        if (insertionPoint === -1) return html;

        return `${html.slice(0, insertionPoint)}    ${preloadTag}\n${html.slice(insertionPoint)}`;
      },
    },
  ],
  build: {
    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Only split vendor libraries into stable, long-cached chunks.
          // Route folders are intentionally NOT chunked here: forcing them
          // into shared named chunks created a static import cycle
          // (treatments -> specialities -> treatments) reachable from the
          // entry, which hoisted those routes into the initial graph and
          // defeated the React.lazy per-route splitting. Letting Vite split
          // automatically per dynamic import keeps each route lazy.
          if (id.includes('node_modules')) {
            if (id.includes('gsap')) return 'gsap';
            if (id.includes('@reduxjs/toolkit') || id.includes('react-redux')) return 'state';
            if (id.includes('react-router-dom') || id.includes('react-dom') || id.includes('react')) return 'react';
          }
        },
      },
    },
  },
});
