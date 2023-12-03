import uni from '@dcloudio/vite-plugin-uni';
import { defineConfig } from 'vite';
import { UnifiedViteWeappTailwindcssPlugin as uvtw } from 'weapp-tailwindcss/vite';
import uniAxiosAdapter from '@uni-helper/axios-adapter/vite';
import { plugins as postcssPlugins } from './postcss.config';
import { weAppTailwindcssDisabled } from './build/platform';
import { getAlias } from './build/getAlias';
import { ip, port } from './build/httpServer';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: getAlias(),
    extensions: ['js', 'ts', 'vue', 'nvue', 'css', 'scss']
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
        $http: 'http://${ip}:${port}';
        `
      }
    }
  }
});
