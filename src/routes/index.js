const ping = require('./ping');
const login = require('./login');
const clearTable = require('./clearTable');
const insertQuestionsToDbAndGet = require('./insertQuestionsToDbAndGet');

module.exports = [].concat(
  ping,
  login,
  clearTable,
  insertQuestionsToDbAndGet,
);
