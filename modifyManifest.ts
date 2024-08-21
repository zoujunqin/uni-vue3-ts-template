// 读取 manifest.json ，修改后重新写入
import fs from 'fs';

const manifestPath = './src/manifest.json';
let Manifest = fs.readFileSync(manifestPath, { encoding: 'utf-8' });
function replaceManifest(path, value) {
  const arr = path.split('.');
  const len = arr.length;
  const lastItem = arr[len - 1];

  let i = 0;
  const ManifestArr = Manifest.split(/\n/);
  for (let index = 0; index < ManifestArr.length; index++) {
    const item = ManifestArr[index];
    if (new RegExp(`"${arr[i]}"`).test(item)) ++i;
    if (i === len) {
      const hasComma = /,/.test(item);
      ManifestArr[index] = item.replace(
        new RegExp(`"${lastItem}"[\\s\\S]*:[\\s\\S]*`),
        `"${lastItem}": ${value}${hasComma ? ',' : ''}`
      );
      break;
    }
  }

  Manifest = ManifestArr.join('\n');
}

export const modifyManifest = (environment = 'development') => {
  const BASE_MAP = Object.freeze({
    development: 'wxebb784f88f01fd50',
    production: 'wx9e91fc9f2476e8b3',
    staging: 'wxebb784f88f01fd50',
    test: 'wxebb784f88f01fd50'
  });
  replaceManifest('appid', `"${BASE_MAP[environment]}"`);
  replaceManifest('mp-weixin.appid', `"${BASE_MAP[environment]}"`);
  fs.writeFileSync(manifestPath, Manifest, {
    flag: 'w'
  });
};
