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
        /* OEC开头的是微信小程序开发 + 体验环境的域名校验， OEQ开头的是微信小程序生产环境域名校验 */
        {
          src: ['./transith5/OecOFjpmum.txt', './transith5/OEQvf27uaM.txt'],
          dest: outDir
        }
      ],
      hook: 'writeBundle'
    })
  ]
};
