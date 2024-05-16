const os = require('os');

const staticServerPort = '5713';

const getLocalIp = () => {
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

const getStaticServer = () => {
  return `http://${getLocalIp()}:${staticServerPort}`;
};

module.exports = { staticServerPort, getStaticServer };
