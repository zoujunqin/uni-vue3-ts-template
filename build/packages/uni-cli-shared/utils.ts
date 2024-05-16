import * as fs from 'fs';
import path from 'path';
import process from 'process';

import {
  findJsonFile,
  normalizeMiniProgramFilename,
  normalizePath,
  parseJson,
  removeExt
} from '@dcloudio/uni-cli-shared';

import { ASYNC_PACKAGE_NAME, MAIN_PACKAGE_NAME } from './const';
import { findReferRoots } from './importersCache';

export function hasLeadingSlash(str: string) {
  return str.indexOf('/') === 0;
}

export function addLeadingSlash(str: string) {
  return hasLeadingSlash(str) ? str : '/' + str;
}

export function getAbsolutePath(from, to) {
  return normalizePath(path.resolve(process.env.UNI_INPUT_DIR, from, to));
}

export function getSubPackageRoots() {
  const appJsonCache = findJsonFile('app');
  return appJsonCache.subPackages.map(item => item.root);
}

/* 判断组件被子包引用的情况, 生成新的 filename */
export function updateFilename(filename) {
  let newFilename = filename;
  const referRoots = findReferRoots(filename);

  // 非主包引用且在代码在主包需要打包到异步分包, 本身就在分包的不需要打包
  if (
    !referRoots.includes(MAIN_PACKAGE_NAME) &&
    !referRoots.some(root => filename.startsWith(root)) &&
    !filename.startsWith(ASYNC_PACKAGE_NAME)
  ) {
    newFilename = ASYNC_PACKAGE_NAME + addLeadingSlash(filename);
  }

  return newFilename;
}

export function getEasycomCustomDirs() {
  const pagesJsonStr = fs.readFileSync(
    path.resolve(process.env.UNI_INPUT_DIR, 'pages.json'),
    'utf8'
  );

  const pkgJsonStr = fs.readFileSync(
    path.resolve(process.env.VITE_ROOT_DIR, 'package.json'),
    'utf8'
  );
  const pckJson = parseJson(pkgJsonStr);
  const dependencies = [
    ...Object.keys(pckJson.dependencies),
    ...Object.keys(pckJson.devDependencies)
  ];

  const dirs = Object.values(parseJson(pagesJsonStr).easycom.custom).map(
    dir => {
      dir = dir.split('/');
      dir = normalizePath(dir.slice(0, -2).join('/'));

      if (dependencies.find(pkgName => new RegExp('^' + pkgName).test(dir))) {
        dir = normalizePath(
          path.resolve(process.env.UNI_INPUT_DIR, '../node_modules', dir)
        );
      }

      if (dir.startsWith('@')) {
        dir = normalizePath(dir.replace('@/', process.env.UNI_INPUT_DIR + '/'));
      }

      return toBuildPath(dir);
    }
  );
  return Array.from(
    new Set([
      ...dirs,
      toBuildPath(
        normalizePath(path.resolve(process.env.UNI_INPUT_DIR, './components'))
      ),
      toBuildPath(
        normalizePath(path.resolve(process.env.UNI_INPUT_DIR, './uni_modules'))
      )
    ])
  );
}

export function toBuildPath(id) {
  let newId = normalizePath(id)
    .replace(normalizePath(process.env.UNI_INPUT_DIR), '')
    .replace(normalizePath(path.resolve(process.env.UNI_INPUT_DIR, '../')), '');
  newId = removeExt(normalizeMiniProgramFilename(newId)).replace(/^\//, '');

  return newId;
}

export function getKebabCase(str) {
  let temp = str.replace(/[A-Z]/g, function (i) {
    return '-' + i.toLowerCase();
  });
  if (temp.slice(0, 1) === '-') {
    temp = temp.slice(1); //如果首字母是大写，执行replace时会多一个_，需要去掉
  }
  return temp;
}
