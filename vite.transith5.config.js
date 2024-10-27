import { readdirSync } from 'fs';
import path from 'path';

import vue from '@vitejs/plugin-vue';
import copy from 'rollup-plugin-copy';

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

const outDir = './hro-webs/transith5/dist';

export default {
  build: {
    outDir,
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
  plugins: [
    vue(),
    copy({
      targets: [
        /* 小程序中接入 h5, 需要在 h5 域名下添加校验文件 */
        {
          src: ['./transith5/**.txt'],
          dest: outDir
        }
      ],
      hook: 'writeBundle'
    })
  ]
};
