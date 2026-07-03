import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  integrations: [preact()],
  output: 'static',
  // slug-first 名前空間: ツールを runlocally.app/recover-zip/ 配下に「物理配置」する
  // （src/pages/recover-zip/ + public/recover-zip/）。base は使わない（base は URL に
  // prefix を付けるが dist を入れ子化せず、ルート配信の Pages と不整合になるため）。
  // バンドルアセットも /recover-zip/_assets/ に隔離し hub/他ツールと無衝突にする。
  build: {
    inlineStylesheets: 'auto',
    assets: 'recover-zip/_assets',
  },
  vite: {
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['preact', 'preact/hooks'],
            'zip': ['@zip.js/zip.js']
          }
        }
      }
    }
  },
  compressHTML: true,
  scopedStyleStrategy: 'class'
});
