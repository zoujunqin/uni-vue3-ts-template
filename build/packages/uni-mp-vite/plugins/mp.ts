import path from 'path';
import * as process from 'process';

import {
  addMiniProgramTemplateFile,
  findMiniProgramTemplateFiles,
  genNVueCssCode,
  normalizeMiniProgramFilename,
  normalizePath,
  parseManifestJsonOnce,
  removeExt,
  UniVitePlugin
} from '@dcloudio/uni-cli-shared';
import { UniMiniProgramPluginOptions } from '@dcloudio/uni-mp-vite';
import { getFilterFiles } from '@dcloudio/uni-mp-vite/dist/plugin/template';
import {
  isUniComponentUrl,
  isUniPageUrl,
  parseVirtualComponentPath,
  parseVirtualPagePath
} from '@dcloudio/uni-mp-vite/dist/plugins/entry';
import { getNVueCssPaths } from '@dcloudio/uni-mp-vite/dist/plugins/pagesJson';
import { createConfigResolved } from '@dcloudio/vite-plugin-uni/dist/configResolved';
import debug from 'debug';
import { EmittedFile, PreRenderedChunk } from 'rollup';
import { ResolvedConfig } from 'vite';

import {
  ASYNC_PACKAGE_NAME,
  MAIN_PACKAGE_NAME
} from '../../uni-cli-shared/const';
import {
  findReferRoots,
  updateImportersCache
} from '../../uni-cli-shared/importersCache';
import {
  getEasycomCustomDirs,
  toBuildPath,
  updateFilename
} from '../../uni-cli-shared/utils';

const prefix = '__change__';

export function rewriteUniMpPlugin(
  options: UniMiniProgramPluginOptions,
  originPlugin: UniVitePlugin
) {
  let resolvedConfig: ResolvedConfig;

  const pluginOptions = {
    ...originPlugin,
    resolvedConfig(config) {
      resolvedConfig = config;
      return (createConfigResolved(options) as Function)(config);
    }
  };

  const { template, style } = options;
  let nvueCssEmitted = false;

  pluginOptions.uni.compilerOptions.miniProgram.emitFile = emitTemplateFile;

  // FIXME: 该方法大部分为源码, 未改变
  function generateBundle() {
    // wxs
    if (template.filter) {
      const extname = template.filter.extname;
      const filterFiles = getFilterFiles(resolvedConfig, this.getModuleInfo);
      console.log(filterFiles);
      Object.keys(filterFiles).forEach(filename => {
        const { code } = filterFiles[filename];
        this.emitFile({
          type: 'asset',
          fileName: filename + extname,
          source: code
        });
      });
    }

    // FIXME: 调用重写的 getTemplateFiles 方法
    const templateFiles = _getTemplateFiles(template);
    Object.keys(templateFiles).forEach(filename => {
      this.emitFile({
        type: 'asset',
        fileName: filename + template.extname,
        source: templateFiles[filename]
      });
    });

    if (!nvueCssEmitted) {
      const nvueCssPaths = getNVueCssPaths(resolvedConfig);
      if (nvueCssPaths && nvueCssPaths.length) {
        nvueCssEmitted = true;
        this.emitFile({
          type: 'asset',
          fileName: 'nvue' + style.extname,
          source: genNVueCssCode(
            parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
          )
        });
      }
    }
  }
  pluginOptions.generateBundle = generateBundle;

  const originConfig = pluginOptions.config;
  pluginOptions.config = function () {
    const config =
      typeof originConfig === 'function'
        ? originConfig.call(this)
        : originConfig;

    // FIXME: 重写源码
    function createChunkFileNames(
      inputDir: string
    ): (chunkInfo: PreRenderedChunk) => string {
      let easycomDirs;
      return function chunkFileNames(chunk) {
        easycomDirs ||= getEasycomCustomDirs();

        if (chunk.name === 'common/vendor') {
          return '[name].js';
        }

        let name = chunk.moduleIds[chunk.moduleIds.length - 1];

        if (isUniPageUrl(name)) {
          name = path.resolve(
            process.env.UNI_INPUT_DIR,
            parseVirtualPagePath(name)
          );
          return (
            removeExt(normalizeMiniProgramFilename(name, inputDir)) + '.js'
          );
        }

        const isUniComponent = isUniComponentUrl(name);
        if (isUniComponent) {
          name = removeExt(
            normalizeMiniProgramFilename(
              path.resolve(
                process.env.UNI_INPUT_DIR,
                parseVirtualComponentPath(name)
              )
            )
          );
        }
        name = toBuildPath(name);

        let prefix = '';
        if (easycomDirs.some(dir => name.startsWith(dir))) {
          const subRoots = findReferRoots(name);

          prefix = !subRoots.includes(MAIN_PACKAGE_NAME)
            ? `${ASYNC_PACKAGE_NAME}/`
            : '';
        }

        if (isUniComponent || (!isUniComponent && prefix)) {
          return prefix + normalizeMiniProgramFilename(name, inputDir) + '.js';
        } else {
          return '[name].js';
        }
      };
    }
    config.build.rollupOptions.output.chunkFileNames = createChunkFileNames(
      process.env.UNI_INPUT_DIR
    );

    // FIXME: 该方法在原有的代码上添加了收集依赖代码, 其余逻辑未变
    const originManualChunks = config.build.rollupOptions.output.manualChunks;
    config.build.rollupOptions.output.manualChunks = function (
      id,
      { getModuleInfo }
    ) {
      const normalizedId = normalizePath(id);
      const filename = normalizedId.split('?')[0];

      // 收集依赖
      if (filename.endsWith('.vue')) {
        const { importedIds, dynamicallyImportedIds } = getModuleInfo(id);
        const ids = [...importedIds, ...dynamicallyImportedIds].filter(
          id => !id.startsWith(normalizedId)
        );

        for (const importedId of ids) {
          let newImportedId = isUniComponentUrl(importedId)
            ? parseVirtualComponentPath(importedId)
            : importedId;
          newImportedId = toBuildPath(newImportedId);

          let newFilename = isUniComponentUrl(filename)
            ? parseVirtualComponentPath(filename)
            : filename;
          newFilename = toBuildPath(newFilename);

          updateImportersCache(newImportedId, newFilename);
        }
      }

      return originManualChunks.call(this, id, { getModuleInfo });
    };

    return config;
  };

  return pluginOptions;
}

// FIXME: 重写了原来的 emitFile 方法, 只是添加了 source 前缀, 其余未变
const debugTemplate = debug('uni:mp-template');
const emitTemplateFile: (emittedFile: EmittedFile) => string = emittedFile => {
  if (emittedFile.type === 'asset') {
    const filename = emittedFile.fileName!;
    addMiniProgramTemplateFile(
      removeExt(
        normalizeMiniProgramFilename(
          path.relative(process.env.UNI_INPUT_DIR, filename)
        )
      ),
      // FIXME: 改变的文件添加前缀用于后续判断是否更新
      `${prefix}${emittedFile.source!.toString()}`
    );
    debugTemplate(filename);
    return filename;
  }
  return '';
};

// 储存 filename 和 updateFilename 的名称映射
const filenameMap = {};
// FIXME: 重写 getTemplateFiles 方法
function _getTemplateFiles(template: UniMiniProgramPluginOptions['template']) {
  const files = findMiniProgramTemplateFiles(template.filter?.generate);
  const newFiles = {};

  for (const filename in files) {
    const code = files[filename];
    const newFilename = updateFilename(filename);

    if (newFilename !== filenameMap[filename] || code.startsWith(prefix)) {
      const newCode = code.replace(prefix, '');
      newFiles[newFilename] = newCode;
      addMiniProgramTemplateFile(filename, newCode);

      filenameMap[filename] = newFilename;
    }
  }

  return newFiles;
}
