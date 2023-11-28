let err = false;

const nodeVersion = /^(\d+)\.(\d+)\.(\d+)/.exec(process.versions.node);
const majorNodeVersion = parseInt(nodeVersion[1]);
const minorNodeVersion = parseInt(nodeVersion[2]);
const patchNodeVersion = parseInt(nodeVersion[3]);

if (majorNodeVersion < 16 && minorNodeVersion < 14) {
  console.error(
    '\x1b[1;31m*** Please use node.js versions >=16.14.x.\x1b[0;0m'
  );
  err = true;
}

const cp = require('child_process');
const pnpmVersion = cp.execSync('pnpm -v', { encoding: 'utf8' }).trim();
const parsedPnpmVersion = /^(\d+)\.(\d+)\.(\d+)/.exec(pnpmVersion);
const majorPnpmVersion = parseInt(parsedPnpmVersion[1]);
const minorPnpmVersion = parseInt(parsedPnpmVersion[2]);
const patchPnpmVersion = parseInt(parsedPnpmVersion[3]);

if (majorPnpmVersion < 8) {
  console.error('\x1b[1;31m*** Please use pnpm >=8.x.\x1b[0;0m');
  err = true;
}

if (!/pnpm[\w-.]*\.c?js$/.test(process.env['npm_execpath'])) {
  console.error(
    '\x1b[1;31m*** Please use pnpm to install dependencies.\x1b[0;0m'
  );
  err = true;
}

if (err) process.exit(1);
