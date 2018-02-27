const ping = require('./ping');
const login = require('./login');
const clearTable = require('./clearTable');
const insertQuestionsToDbAndGet = require('./insertQuestionsToDbAndGet');
const getUserResponses = require('./getUserResponses');
const getQuestionsFromDb = require('./getQuestionsFromDb');

module.exports = [].concat(
  ping,
  login,
  clearTable,
  insertQuestionsToDbAndGet,
  getUserResponses,
  getQuestionsFromDb,
);
