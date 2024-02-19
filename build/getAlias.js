const { resolve } = require('path');

const { ip, port } = require('./httpServer');
const { isMpWeixin } = require('./platform');

const resolvePath = dir => {
  return resolve(__dirname, '..', dir);
};

const getAlias = () => {
  return {
    '@': resolvePath('src'),
    '@http': isMpWeixin
      ? process.env.NODE_ENV === 'development'
        ? `http://${ip}:${port}`
        : 'https://hxrl-hro-front-oss.oss-cn-hangzhou.aliyuncs.com/mp'
      : resolvePath('src/static@http')
  };
};

module.exports = { getAlias };
