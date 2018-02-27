const ping = require('./ping');
const login = require('./login');
const clearUserTable = require('./clearUserTable');

module.exports = [].concat(
  ping,
  login,
  clearUserTable,
);
