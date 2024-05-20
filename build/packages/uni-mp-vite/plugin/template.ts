import path from 'path';
import * as process from 'process';

import {
  addMiniProgramTemplateFile,
  findMiniProgramTemplateFiles,
  normalizeMiniProgramFilename,
  removeExt
} from '@dcloudio/uni-cli-shared';
import { UniMiniProgramPluginOptions } from '@dcloudio/uni-mp-vite';
import debug from 'debug';
import { EmittedFile } from 'rollup';

import { updateFilename } from '../../uni-cli-shared/utils';

const prefix = '__change__';

// FIXME: 重写了原来的 emitFile 方法, 只是添加了 source 前缀, 其余未变
const debugTemplate = debug('uni:mp-template');
export const emitTemplateFile: (
  emittedFile: EmittedFile
) => string = emittedFile => {
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
export function _getTemplateFiles(
  template: UniMiniProgramPluginOptions['template']
) {
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
