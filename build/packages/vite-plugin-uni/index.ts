import uni from '@dcloudio/vite-plugin-uni';

import {
  rewirteUniEntryPlugin,
  rewriteUniMpPlugin,
  rewriteUniPagesJsonPlugin,
  rewriteViteCssPostPlugin
} from '../uni-mp-vite/index';
import { options } from '../uni-mp-weixin/src/compiler/options';

export default function vitePluginUni(...args) {
  const uniPlugins = uni.call(this, ...args);

  const platform = process.env.UNI_PLATFORM;

  if (platform === 'mp-weixin' && process.env.NODE_ENV === 'production') {
    uniPlugins.push(rewriteViteCssPostPlugin(options));

    const uniEntryPluginIndex = uniPlugins.findIndex(
      uniPlugin => uniPlugin.name === 'uni:virtual'
    );
    uniPlugins.splice(uniEntryPluginIndex, 1, rewirteUniEntryPlugin(options));

    const pagesJsonPluginIndex = uniPlugins.findIndex(
      uniPlugin => uniPlugin.name === 'uni:mp-pages-json'
    );
    uniPlugins.splice(
      pagesJsonPluginIndex,
      1,
      rewriteUniPagesJsonPlugin(options, uniPlugins[pagesJsonPluginIndex])
    );

    const uniMpPluginIndex = uniPlugins.findIndex(
      uniPlugin => uniPlugin.name === 'uni:mp'
    );
    uniPlugins.splice(
      uniMpPluginIndex,
      1,
      rewriteUniMpPlugin(options, uniPlugins[uniMpPluginIndex])
    );
  }

  return uniPlugins;
}
