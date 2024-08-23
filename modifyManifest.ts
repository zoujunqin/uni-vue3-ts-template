// 读取 manifest.json ，修改后重新写入
import fs from 'fs';
import path from 'path';

import dotEnv from 'dotenv';
import minimist from 'minimist';

const manifestPath = './src/manifest.json';
let manifest = fs.readFileSync(manifestPath, { encoding: 'utf-8' });
function replaceManifest(path, value) {
  const arr = path.split('.');
  const len = arr.length;
  const lastItem = arr[len - 1];

  let i = 0;
  const manifestArr = manifest.split(/\n/);
  for (let index = 0; index < manifestArr.length; index++) {
    const item = manifestArr[index];
    if (new RegExp(`"${arr[i]}"`).test(item)) ++i;
    if (i === len) {
      const hasComma = /,/.test(item);
      manifestArr[index] = item.replace(
        new RegExp(`"${lastItem}"[\\s\\S]*:[\\s\\S]*`),
        `"${lastItem}": ${value}${hasComma ? ',' : ''}`
      );
      break;
    }
  }

  manifest = manifestArr.join('\n');
}

// 先构造出.env*文件的绝对路径
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const pathsDotenv = resolveApp('.env');

const modifyManifest = () => {
  const params = minimist(process.argv.slice(2));
  dotEnv.config({ path: `${pathsDotenv}.${params.mode}` }); // 加载.env.*
  replaceManifest('appid', `"${process.env.VITE_MP_WEIXIN_APP_ID}"`);
  replaceManifest('mp-weixin.appid', `"${process.env.VITE_MP_WEIXIN_APP_ID}"`);
  fs.writeFileSync(manifestPath, manifest, {
    flag: 'w'
  });
};

module.exports = { modifyManifest };
