import { resolve } from 'path';

import uniAxiosAdapter from '@uni-helper/axios-adapter/vite';
import { defineConfig } from 'vite';
import { loadEnv } from 'vite';
import { UnifiedViteWeappTailwindcssPlugin as uvtw } from 'weapp-tailwindcss/vite';

import uni from './build/packages/vite-plugin-uni/index';
import { modifyManifest } from './modifyManifest';
import { plugins as postcssPlugins } from './postcss.config';
import { getStaticServer } from './scripts/utils';
function resolvePath(dir) {
  return resolve(__dirname, '..', dir);
}

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
    return 'static@http';
  }
}

// https://vitejs.dev/config/
export default defineConfig(() => {
  modifyManifest();
  return {
    mode: 'strict',
    resolve: {
      alias: {
        '@': resolvePath('../../src')
      },
      extensions: ['ts', 'js', 'vue', 'nvue', 'css', 'scss']
    },
    define: {
      __ASSETS_RESOURCE_PATH__: JSON.stringify(getAssetsResourcePath())
    },
    plugins: [
      uni(),
      uvtw({
        disabled: ['h5', 'app'].includes(process.env.UNI_PLATFORM)
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
        $http: "${getAssetsResourcePath()}";
        `
        }
      }
    }
  };
});
