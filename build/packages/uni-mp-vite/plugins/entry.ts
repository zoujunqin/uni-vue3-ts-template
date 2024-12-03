import fs from 'fs';
import path from 'path';

import {
  normalizeMiniProgramFilename,
  normalizePath,
  parseManifestJsonOnce,
  removeExt
} from '@dcloudio/uni-cli-shared';
import type { ComponentJson } from '@dcloudio/uni-cli-shared/dist/json/mp/types';
import type { UniMiniProgramPluginOptions } from '@dcloudio/uni-mp-vite/dist/plugin/index';
import {
  isUniComponentUrl,
  isUniPageUrl,
  parseVirtualComponentPath,
  parseVirtualPagePath
} from '@dcloudio/uni-mp-vite/dist/plugins/entry';
import { Plugin } from 'vite';

import { _addMiniProgramComponentJson } from '../../uni-cli-shared/jsonCache';
import { uniEntryPluginName } from '../../uni-cli-shared/const';

const styleIsolationRE =
  /export\s+default\s+[\s\S]*?styleIsolation\s*:\s*['|"](isolated|apply-shared|shared)['|"]/;

function parseComponentStyleIsolation(file: string) {
  const content = fs.readFileSync(file, 'utf-8');
  const matches = content.match(styleIsolationRE);
  if (matches) {
    return matches[1];
  }
}

export function rewriteUniEntryPlugin({
  global
}: UniMiniProgramPluginOptions): Plugin {
  const inputDir = process.env.UNI_INPUT_DIR;
  const manifestJson = parseManifestJsonOnce(inputDir);
  const platformOptions = manifestJson[process.env.UNI_PLATFORM] || {};
  return {
    name: uniEntryPluginName,
    enforce: 'pre',
    resolveId(id) {
      if (isUniPageUrl(id) || isUniComponentUrl(id)) {
        return id;
      }
    },
    load(id) {
      if (isUniPageUrl(id)) {
        const filepath = normalizePath(
          path.resolve(inputDir, parseVirtualPagePath(id))
        );
        this.addWatchFile(filepath);
        return {
          code: `import MiniProgramPage from '${filepath}'
${global}.createPage(MiniProgramPage)`
        };
      } else if (isUniComponentUrl(id)) {
        const filepath = normalizePath(
          path.resolve(inputDir, parseVirtualComponentPath(id))
        );
        this.addWatchFile(filepath);

        const json: ComponentJson = {
          component: true,
          styleIsolation: undefined
        };

        if (process.env.UNI_PLATFORM === 'mp-alipay') {
          json.styleIsolation =
            parseComponentStyleIsolation(filepath) ||
            platformOptions.styleIsolation ||
            'apply-shared';
        }
        // 微信小程序json文件中的styleIsolation优先级比options中的高，为了兼容旧版本，不能设置默认值，并且只有在manifest.json中配置styleIsolation才会静态分析组件的styleIsolation
        if (process.env.UNI_PLATFORM === 'mp-weixin') {
          if (platformOptions.styleIsolation) {
            json.styleIsolation =
              parseComponentStyleIsolation(filepath) ||
              platformOptions.styleIsolation;
          }
        }

        // FIXME: 重写这一处的方法, 其他都是原封不动的源码
        _addMiniProgramComponentJson(
          removeExt(normalizeMiniProgramFilename(filepath, inputDir)),
          json
        );
        return {
          code: `import Component from '${filepath}'
${global}.createComponent(Component)`
        };
      }
    }
  };
}
