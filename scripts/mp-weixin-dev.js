const { spawn } = require('child_process');

const chalk = require('chalk');
const minimist = require('minimist');

const { staticServerPort, getStaticServer } = require('./utils.js');

const cmd = /^win/.test(process.platform) ? 'pnpm.cmd' : 'pnpm';
const params = minimist(process.argv.slice(2));

const assetsServerController = new AbortController();
const { signal: assetsServerSignal } = assetsServerController;
spawn(
  cmd,
  [
    'node_modules/.bin/http-server',
    './src/static@http',
    `-p=${staticServerPort}`
  ],
  {
    signal: assetsServerSignal
  }
);
console.log(
  chalk.green('[http-server] ') +
    chalk.yellow(`static server available on ${getStaticServer()}`)
);

const uniController = new AbortController();
const { signal: uniSignal } = uniController;
spawn(
  cmd,
  [
    'node_modules/.bin/uni',
    '-p',
    'mp-weixin',
    '--mode',
    params.mode || 'development'
  ],
  {
    signal: uniSignal,
    stdio: 'inherit'
  }
);

process.on('exit', () => {
  assetsServerController.abort();
  uniController.abort();
});
