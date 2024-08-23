// 需要到小程序平台配置本地 ip 白名单

const fs = require('fs');

const chalk = require('chalk');
const { Command } = require('commander');
const dayjs = require('dayjs');
const inquirer = require('inquirer');
const minimist = require('minimist');
const ci = require('miniprogram-ci');

const pkg = require('../package.json');
const uploadLog = require('../upload-log.json');
const params = minimist(process.argv.slice(2));
function upload(desc) {
  const project = new ci.Project({
    appid: import.meta.env.VITE_MP_WEIXIN_APP_ID,
    type: 'miniProgram',
    projectPath: 'dist/build/mp-weixin', // uniapp打包后的路径
    privateKeyPath:
      params.mode === 'production'
        ? 'mp-weixin-formal.private.key'
        : 'mp-weixin.private.key', // 微信公众平台密钥
    ignores: ['node_modules/**/*'] // 指定需要排除的规则
  });

  ci.upload({
    project, // 项目对象
    version: pkg.version || uploadLog[0].version, // 版本号
    desc: desc || uploadLog[0].description, // 项目描述
    // 以下配置，根据自己的【微信开发者工具本地配置】
    setting: {
      minifyJS: true
      // es6: true
      // es7: false,
      // codeProtect: true,
      // autoPrefixWXSS: true
    },
    onProgressUpdate: console.log // 进度更新监听函数
  })
    .then(() => {
      console.log(chalk.green('upload successfully'));
      updateUploadLog(desc);
    })
    .catch(error => {
      console.log(chalk.red('upload failed. ', error));
      process.exit(-1);
    });
}

const program = new Command();
program.description('upload mp-weixin').action(async () => {
  const { description } = await inquirer.prompt([
    {
      type: 'input',
      name: 'description',
      message: `Please enter a description of the version. ：`
    }
  ]);

  upload(description);
});
program.parse(process.argv);

function updateUploadLog(description) {
  uploadLog.unshift({
    version: pkg.version,
    createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    description
  });
  fs.writeFileSync('upload-log.json', JSON.stringify(uploadLog, null, 2));
}
