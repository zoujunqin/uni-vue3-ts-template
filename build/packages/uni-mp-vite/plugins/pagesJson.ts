import {
  defineUniPagesJsonPlugin,
  mergeMiniProgramAppJson,
  parseManifestJsonOnce,
  parseMiniProgramPagesJson
} from '@dcloudio/uni-cli-shared';
import type { UniMiniProgramPluginOptions } from '@dcloudio/uni-mp-vite/dist/plugin/index';
import debug from 'debug';
import { Plugin, ResolvedConfig } from 'vite';

import {
  _addMiniProgramAppJson,
  _addMiniProgramPageJson,
  _findChangedJsonFiles
} from '../../uni-cli-shared/jsonCache';
import { uniPagesJsonPluginName } from '../../uni-cli-shared/const';

const debugPagesJson = debug('uni:pages-json');

const nvueCssPathsCache = new Map<ResolvedConfig, string[]>();
export function getNVueCssPaths(config: ResolvedConfig) {
  return nvueCssPathsCache.get(config);
}

export function rewriteUniPagesJsonPlugin(
  options: UniMiniProgramPluginOptions,
  originPlugin: Plugin
): Plugin {
  const platform = process.env.UNI_PLATFORM;
  const inputDir = process.env.UNI_INPUT_DIR;
  return defineUniPagesJsonPlugin(opts => {
    let resolvedConfig: ResolvedConfig;
    // FIXME: 以下部分为源码, 有删减
    return {
      name: uniPagesJsonPluginName,
      enforce: 'pre',
      configResolved(config) {
        resolvedConfig = config;
      },
      transform(code, id) {
        const transformRes = originPlugin.transform?.call(this, code, id);

        if (!opts.filter(id)) {
          return null;
        }

        const manifestJson = parseManifestJsonOnce(inputDir);
        const { appJson, pageJsons, nvuePages } = parseMiniProgramPagesJson(
          code,
          platform,
          {
            debug: !!manifestJson.debug,
            darkmode: options.app.darkmode,
            networkTimeout: manifestJson.networkTimeout,
            subpackages: !!options.app.subpackages,
            ...options.json
          }
        );

        nvueCssPathsCache.set(
          resolvedConfig,
          nvuePages.map(pagePath => pagePath + options.style.extname)
        );

        mergeMiniProgramAppJson(appJson, manifestJson[platform]);

        if (options.json?.formatAppJson) {
          options.json.formatAppJson(appJson, manifestJson, pageJsons);
        }

        const { normalize } = options.app;
        // FIXME: 重写 addMiniProgrameAppJson 方法
        _addMiniProgramAppJson(normalize ? normalize(appJson) : appJson);

        Object.keys(pageJsons).forEach(name => {
          if (isNormalPage(name)) {
            _addMiniProgramPageJson(name, pageJsons[name]);
          }
        });
        return transformRes;
      },

      generateBundle() {
        // FIXME: 重写 findChangedJsonFiles 方法
        _findChangedJsonFiles(options.app.usingComponents).forEach(
          (value, key) => {
            debugPagesJson('json.changed', key);

            this.emitFile({
              type: 'asset',
              fileName: key + '.json',
              source: value
            });
          }
        );
      }
    };
  });
}

/**
 * 字节跳动小程序可以配置 ext:// 开头的插件页面模板，如 ext://microapp-trade-plugin/order-confirm
 * @param pagePath
 * @returns
 */
function isNormalPage(pagePath: string) {
  return !pagePath.startsWith('ext://');
}
