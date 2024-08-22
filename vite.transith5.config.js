import { readdirSync } from 'fs';
import path from 'path';

import vue from '@vitejs/plugin-vue';

const root = path.join(__dirname, '/transith5');

const getInput = () => {
  const dirs = readdirSync(root, { withFileTypes: true }).filter(dir =>
    dir.isDirectory()
  );
  return dirs.reduce((input, dir) => {
    input[dir.name] = path.join(root, dir.name, 'index.html');
    return input;
  }, {});
};

export default {
  build: {
    outDir: 'hro-webs/transith5/dist',
    rollupOptions: {
      input: getInput(),
      // 静态资源分类打包
      output: {
        chunkFileNames: 'transith5/js/[name]-[hash].js',
        entryFileNames: 'transith5/js/[name]-[hash].js',
        assetFileNames: 'transith5/[ext]/[name]-[hash].[ext]'
      }
    }
  },
  plugins: [vue()]
};
