import { ASSETS_INLINE_LIMIT, UniVitePlugin } from '@dcloudio/uni-cli-shared';
import type { Plugin } from 'vite';

import initMiniProgramPlugin from '../../../uni-mp-vite';

import { options } from './options';

const uniMiniProgramWeixinPlugin: Plugin = {
  name: 'uni:mp-weixin',
  config() {
    return {
      define: {
        __VUE_CREATED_DEFERRED__: false
      },
      build: {
        // css 中不支持引用本地资源
        assetsInlineLimit: ASSETS_INLINE_LIMIT
      }
    };
  }
};

export default function (originPlugins: UniVitePlugin[]) {
  return [
    uniMiniProgramWeixinPlugin,
    ...initMiniProgramPlugin.call(this, options, originPlugins)
  ];
}
