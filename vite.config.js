import uni from '@dcloudio/vite-plugin-uni';
import uniAxiosAdapter from '@uni-helper/axios-adapter/vite';
import { defineConfig } from 'vite';
import { UnifiedViteWeappTailwindcssPlugin as uvtw } from 'weapp-tailwindcss/vite';

import { getAlias } from './build/getAlias';
import { weAppTailwindcssDisabled } from './build/platform';
import { plugins as postcssPlugins } from './postcss.config';

const alias = getAlias();
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias,
    extensions: ['ts', 'js', 'vue', 'nvue', 'css', 'scss']
  },
  plugins: [
    uni(),
    uvtw({
      disabled: weAppTailwindcssDisabled
    }),
    uniAxiosAdapter()
  ],

  css: {
    postcss: {
      plugins: postcssPlugins
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "@/style/index.scss" as *;
        $http: "${alias['@http']}";
        `
      }
    }
  }
});
