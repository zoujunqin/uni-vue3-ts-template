import path from 'path';

import {
  addMiniProgramAppJson,
  addMiniProgramComponentJson,
  addMiniProgramPageJson,
  findUsingComponents,
  normalizePath
} from '@dcloudio/uni-cli-shared';
import {
  ComponentJson,
  PageWindowOptions
} from '@dcloudio/uni-cli-shared/dist/json/mp/types';
import { extend } from '@vue/shared';

import { ASYNC_PACKAGE_NAME } from './const';
import { getSubPackageRoots, updateFilename } from './utils';

// app.json
export let appJsonCache: Record<string, any> = {};
// 页面 json
export const jsonPagesCache = new Map<string, PageWindowOptions>();
// 组件 json
export const jsonComponentsCache = new Map<string, ComponentJson>();
const jsonFilesCache = new Map<string, string>();

export function _addMiniProgramComponentJson(
  filename: string,
  json: ComponentJson
) {
  addMiniProgramComponentJson(filename, json);
  jsonComponentsCache.set(filename, json);
}

export function _addMiniProgramAppJson(appJson: Record<string, any>) {
  addMiniProgramAppJson(appJson);
  appJsonCache = appJson;
}

export function _addMiniProgramPageJson(
  filename: string,
  json: PageWindowOptions
) {
  addMiniProgramPageJson(filename, json);
  jsonPagesCache.set(filename, json);
}

export function _findChangedJsonFiles(
  supportGlobalUsingComponents: boolean = true
) {
  const subPackageRoots = getSubPackageRoots();
  const changedJsonFiles = new Map<string, string>();
  function findChangedFile(filename: string, json: Record<string, any>) {
    const newJson = JSON.parse(JSON.stringify(json));
    if (!newJson.usingComponents) {
      newJson.usingComponents = {};
    }
    extend(newJson.usingComponents, findUsingComponents(filename));
    // 格式化为相对路径，这样作为分包也可以直接运行
    // app.json mp-baidu 在 win 不支持相对路径。所有平台改用绝对路径
    if (filename !== 'app') {
      let usingComponents = newJson.usingComponents as Record<string, string>;
      // 如果小程序不支持 global 的 usingComponents
      if (!supportGlobalUsingComponents) {
        // 从取全局的 usingComponents 并补充到子组件 usingComponents 中
        const globalUsingComponents = appJsonCache?.usingComponents || {};
        const globalComponents = findUsingComponents('app') || {};
        usingComponents = {
          ...globalUsingComponents,
          ...globalComponents,
          ...newJson.usingComponents
        };
      }

      const componentPlaceholder = {};

      Object.keys(usingComponents).forEach(name => {
        const componentFilename = usingComponents[name];
        if (componentFilename.startsWith('/')) {
          const newFilename = updateFilename(filename);
          const newComponentFilename = updateFilename(
            componentFilename.slice(1)
          );

          // FIXME: 更新路径且转为相对路径
          usingComponents[name] = normalizePath(
            path.relative(path.dirname(newFilename), newComponentFilename)
          );

          // FIXME: 添加 componentPlaceholder
          if (
            subPackageRoots.some(root => filename.startsWith(root)) &&
            newComponentFilename.indexOf(ASYNC_PACKAGE_NAME) !== -1
          ) {
            componentPlaceholder[name] = 'view';
          }
        }
      });
      newJson.usingComponents = usingComponents;
      newJson.componentPlaceholder = {
        ...componentPlaceholder,
        ...newJson.componentPlaceholder
      };
    } else {
      newJson.subPackages.unshift({
        root: ASYNC_PACKAGE_NAME,
        pages: []
      });
    }

    const newFilename = updateFilename(filename);
    const jsonStr = JSON.stringify(newJson, null, 2);
    if (jsonFilesCache.get(newFilename) !== jsonStr) {
      changedJsonFiles.set(newFilename, jsonStr);
      jsonFilesCache.set(newFilename, jsonStr);
    }
  }
  function findChangedFiles(jsonsCache: Map<string, any>) {
    for (const name of jsonsCache.keys()) {
      findChangedFile(name, jsonsCache.get(name));
    }
  }
  findChangedFile('app', appJsonCache);
  findChangedFiles(jsonPagesCache);
  findChangedFiles(jsonComponentsCache);
  return changedJsonFiles;
}
