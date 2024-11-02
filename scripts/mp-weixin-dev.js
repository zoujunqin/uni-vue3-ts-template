const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');

const chalk = require('chalk');
const minimist = require('minimist');

const { getFileType, httpServerStart, getStaticServer } = require('./utils.js');

// 不要使用子进程启动 http-server, 因为子进程无法检测端口占用
const publicDir = './src/static@http';
const httpServer = http.createServer();

httpServer.on('request', (request, response) => {
  const { pathname } = url.parse(request.url);
  const filename = pathname.substr(1);

  fs.readFile(path.resolve(publicDir, filename), (error, data) => {
    if (error) {
      response.end();
    } else {
      response.writeHead(200, {
        'Content-Type': getFileType(filename)
      });
      response.write(data);
      response.end();
    }
  });
});

httpServerStart(httpServer).then(() => {
  const content = `export const httpStaticServer = '${getStaticServer()}';`;
  fs.writeFileSync('./src/httpStaticServer.js', content);
  console.log(
    chalk.green('[http-server] ') +
      chalk.yellow(`static server available on ${getStaticServer()}`)
  );
});

const cmd = /^win/.test(process.platform) ? 'pnpm.cmd' : 'pnpm';
const params = minimist(process.argv.slice(2));
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
  uniController.abort();
});
