import path from 'path';

import uniAxiosAdapter from '@uni-helper/axios-adapter/vite';
import defineOptions from 'unplugin-vue-define-options/vite';
import { defineConfig } from 'vite';
import { loadEnv } from 'vite';
import { UnifiedViteWeappTailwindcssPlugin as uvtw } from 'weapp-tailwindcss/vite';

import uni from './build/packages/vite-plugin-uni/index';
import { modifyManifest } from './modifyManifest';
import { plugins as postcssPlugins } from './postcss.config';
import { getStaticServer } from './scripts/utils';

function isMiniProgram() {
  return process.env.UNI_PLATFORM.includes('mp-');
}

function getAssetsResourcePath() {
  if (isMiniProgram()) {
    if (process.env.NODE_ENV === 'development') {
      return getStaticServer();
    } else {
      return loadEnv(process.env.NODE_ENV, process.cwd()).VITE_OSS_SERVER_URL;
    }
  } else {
    return path.resolve(__dirname, 'src/static@http');
  }
}

// https://vitejs.dev/config/
export default defineConfig(() => {
  /* #ifdef MP-WEIXIN */
  modifyManifest();
  /* #endif */
  return {
    mode: 'strict',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      },
      extensions: ['ts', 'js', 'vue', 'nvue', 'css', 'scss']
    },
    plugins: [
      uni(),
      uvtw({
        disabled: ['h5', 'app'].includes(process.env.UNI_PLATFORM)
      }),
      uniAxiosAdapter(),
      defineOptions()
    ],

    css: {
      postcss: {
        plugins: postcssPlugins
      },
      preprocessorOptions: {
        scss: {
          additionalData: `
        $http: "${getAssetsResourcePath()}";
        `
        }
      }
    }
  };
});
