const isMpWeixin = process.env.UNI_PLATFORM === 'mp-weixin';
const isH5 = process.env.UNI_PLATFORM === 'h5';
const isApp = process.env.UNI_PLATFORM === 'app';
const weAppTailwindcssDisabled = isH5 || isApp;

module.exports = {
  isMpWeixin,
  isH5,
  isApp,
  weAppTailwindcssDisabled
};
