const { getIp } = require('./getIp');

const ip = getIp();
const port = '5713';

module.exports = { ip, port };
