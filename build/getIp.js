const os = require('os');

const getIp = () => {
  const networkInterfaces = os.networkInterfaces();
  let ip;
  for (const dev in networkInterfaces) {
    networkInterfaces[dev].forEach(function (details) {
      if (details.family === 'IPv4' && !details.internal) ip = details.address;
    });
  }
  return ip || '127.0.0.1';
};

module.exports = { getIp };
