const fs = require('fs');
const path = require('path');

const nodeModulesPath = path.resolve('node_modules');

if (fs.existsSync(nodeModulesPath))
  fs.rmSync(nodeModulesPath, { recursive: true });

const cp = require('child_process');
cp.exec('pnpm install', (err, stdout) => {
  if (err) {
    console.error('error:', err);
    return;
  }
  console.log(stdout);
});
