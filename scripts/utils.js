const os = require('os');
const path = require('path');

let staticServerPort = '5713';

const getHttpServerPost = () => staticServerPort;

const getHost = () => {
  const networkInterfaces = os.networkInterfaces();
  let ip = '127.0.0.1';
  for (const key in networkInterfaces) {
    networkInterfaces[key].forEach(function (details) {
      if (details.family === 'IPv4' && !details.internal) {
        ip = details.address;
      }
    });
  }
  return ip;
};

const getStaticServer = () => 'http://' + getHost() + ':' + getHttpServerPost();

const httpServerStart = async httpServer => {
  return new Promise((resolve, reject) => {
    const host = getHost();

    const onError = e => {
      if (e.code === 'EADDRINUSE') {
        // node中，端口被占用就抛这个错误code
        // 端口自增策略，即如何帮我们寻找下一页未被占用的可用端口
        httpServer.listen(++staticServerPort, host);
      } else {
        httpServer.removeListener('error', onError);
        reject(e);
      }
    };

    httpServer.on('error', onError);

    httpServer.listen(staticServerPort, host, () => {
      httpServer.removeListener('error', onError);
      resolve(staticServerPort);
    });
  });
};

const fileTypeMap = {
  css: 'text/css',
  gif: 'image/gif',
  html: 'text/html',
  ico: 'image/x-icon',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  js: 'text/javascript',
  json: 'application/json',
  pdf: 'application/pdf',
  png: 'image/png',
  svg: 'image/svg+xml',
  swf: 'application/x-shockwave-flash',
  tiff: 'image/tiff',
  txt: 'text/plain',
  wav: 'audio/x-wav',
  wma: 'audio/x-ms-wma',
  wmv: 'video/x-ms-wmv',
  xml: 'text/xml',
  woff: 'application/x-woff',
  woff2: 'application/x-woff2',
  tff: 'application/x-font-truetype',
  otf: 'application/x-font-opentype',
  eot: 'application/vnd.ms-fontobject'
};
const getFileType = filename => {
  return fileTypeMap[path.extname(filename).slice(1) || 'txt'];
};

module.exports = {
  getFileType,
  httpServerStart,
  getHttpServerPost,
  getStaticServer
};
