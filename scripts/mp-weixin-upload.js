// 需要到小程序平台配置本地 ip 白名单
const chalk = require('chalk');
const ci = require('miniprogram-ci');

const pkg = require('../package.json');
const manifestJson = require('../src/manifest.json');

const project = new ci.Project({
  appid: manifestJson.appid,
  type: 'miniProgram',
  projectPath: 'dist/build/mp-weixin', // uniapp打包后的路径
  privateKeyPath: '../mp-weixin.private.key', // 微信公众平台密钥
  ignores: ['node_modules/**/*'] // 指定需要排除的规则
});

ci.upload({
  project, // 项目对象
  // TODO: 后续打包需要自动更新
  version: pkg.version, // 版本号
  desc: '', // 项目描述
  // 以下配置，根据自己的【微信开发者工具本地配置】
  setting: {
    minifyWXML: true, // boolean 压缩 WXML 代码
    minifyWXSS: true, // boolean 压缩 WXSS 代码
    minifyJS: true, // boolean 压缩 JS 代码
    minify: true, // boolean 压缩所有代码，对应小程序开发者工具的 "压缩代码"
    es6: false, // boolean 对应小程序开发者工具的 "es6 转 es5"
    es7: false, // boolean 对应小程序开发者工具的 "增强编译"
    codeProtect: false, // boolean 对应小程序开发者工具的 "代码保护"
    autoPrefixWXSS: false // boolean 对应小程序开发者工具的 "样式自动补全"
  },
  onProgressUpdate: console.log // 进度更新监听函数
})
  .then(() => {
    chalk.green('上传成功！');
  })
  .catch(error => {
    chalk.red('上传失败，原因：', error);
    process.exit(-1);
  });
