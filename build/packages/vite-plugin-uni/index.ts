import uni from '@dcloudio/vite-plugin-uni';

import {
  rewirteUniEntryPlugin,
  rewriteUniMpPlugin,
  rewriteUniPagesJsonPlugin,
  rewriteViteCssPostPlugin
} from '../uni-mp-vite/index';
import { options } from '../uni-mp-weixin/src/compiler/options';
import {
  uniEntryPluginName,
  uniMpPluginName,
  uniPagesJsonPluginName
} from '../uni-cli-shared/const';

export default function vitePluginUni(...args) {
  const uniPlugins = uni.call(this, ...args);

  const platform = process.env.UNI_PLATFORM;

  if (platform === 'mp-weixin' && process.env.NODE_ENV === 'production') {
    uniPlugins.push(rewriteViteCssPostPlugin(options));

    const uniEntryPluginIndex = uniPlugins.findIndex(
      uniPlugin => uniPlugin.name === uniEntryPluginName
    );
    uniPlugins.splice(uniEntryPluginIndex, 1, rewirteUniEntryPlugin(options));

    const pagesJsonPluginIndex = uniPlugins.findIndex(
      uniPlugin => uniPlugin.name === uniPagesJsonPluginName
    );
    uniPlugins.splice(
      pagesJsonPluginIndex,
      1,
      rewriteUniPagesJsonPlugin(options, uniPlugins[pagesJsonPluginIndex])
    );

    const uniMpPluginIndex = uniPlugins.findIndex(
      uniPlugin => uniPlugin.name === uniMpPluginName
    );
    uniPlugins.splice(
      uniMpPluginIndex,
      1,
      rewriteUniMpPlugin(options, uniPlugins[uniMpPluginIndex])
    );
  }

  return uniPlugins;
}
