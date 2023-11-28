const { spawn } = require('child_process');
const chalk = require('chalk');
const { ip, port } = require('../http-server');

const cmd = /^win/.test(process.platform) ? 'pnpm.cmd' : 'pnpm';

const assetsServerController = new AbortController();
const { signal: assetsServerSignal } = assetsServerController;
spawn(cmd, ['node_modules/.bin/http-server', './src/static', `-p=${port}`], {
  signal: assetsServerSignal
});
console.log(
  chalk.green('[http-server] ') +
    chalk.yellow(`assetsServer available on ${ip}`)
);

const uniController = new AbortController();
const { signal: uniSignal } = uniController;
spawn(cmd, ['node_modules/.bin/uni', '-p', 'mp-weixin'], {
  signal: uniSignal,
  stdio: 'inherit'
});

process.on('exit', () => {
  assetsServerController.abort();
  uniController.abort();
});
