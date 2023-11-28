const { resolve } = require('path');
const { ip, port } = require('./http-server');
const { isMpWeixin } = require('./platform');

const resolvePath = dir => {
  return resolve(__dirname, '..', dir);
};

const getAlias = () => {
  return {
    '@': resolvePath('src'),
    '@@static': isMpWeixin
      ? process.env.NODE_ENV === 'development'
        ? `http://${ip}:${port}`
        : ''
      : resolvePath('src/static')
  };
};

module.exports = { getAlias };
