const { spawnSync } = require('child_process');
const fs = require('fs');

const chalk = require('chalk');
const { Command } = require('commander');
const inquirer = require('inquirer');

const program = new Command();
const pkg = require('../package.json');

// 定义当前版本
program.version(`v${pkg.version}`);

program.description('build mp-weixin').action(async () => {
  const { version } = await inquirer.prompt([
    {
      type: 'input',
      name: 'version',
      message: `Please enter the version number. (previous: ${pkg.version}})：`,
      validate(v) {
        if (!checkVersion(v)) {
          console.log(
            chalk.red(
              ' Please enter the correct version number format (pure numbers). eg: 1.1.1'
            )
          );
          return false;
        }

        if (!compareVersion(v)) {
          console.log(
            chalk.yellow(
              ` Major or minor or patch version number is smaller than the previous. (previous: ${pkg.version})`
            )
          );
        }
        return true;
      }
    },
    {
      type: 'confirm',
      name: 'confirm version number',
      message: `Are you sure you want to use the current version number`,
      when({ version }) {
        return !compareVersion(version);
      }
    }
  ]);

  spawnSync(
    /^win/.test(process.platform) ? 'pnpm.cmd' : 'pnpm',
    ['node_modules/.bin/uni', 'build', '-p', 'mp-weixin'],
    {
      stdio: 'inherit'
    }
  );

  updateVersion(version);
});

program.parse(process.argv);

function checkVersion(version) {
  return /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(version);
}

function compareVersion(version) {
  version = /^(\d+)\.(\d+)\.(\d+)/.exec(version);
  const majorVersion = version[1];
  const minorVersion = version[2];
  const patchVersion = version[3];

  const prevVersion = /^(\d+)\.(\d+)\.(\d+)/.exec(pkg.version);
  const majorPrevVersion = prevVersion[1];
  const minorPrevVersion = prevVersion[2];
  const patchPrevVersion = prevVersion[3];

  return (
    majorVersion >= majorPrevVersion &&
    minorVersion >= minorPrevVersion &&
    patchVersion >= patchPrevVersion
  );
}

function updateVersion(version) {
  if (pkg.version !== version) {
    pkg.version = version;
    fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
  }
}
