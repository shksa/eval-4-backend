const ping = require('./ping');
const login = require('./login');
const clearTable = require('./clearTable');
const insertQuestionsToDbAndGet = require('./insertQuestionsToDbAndGet');
const getUserResponses = require('./getUserResponses');
const getQuestionsFromDb = require('./getQuestionsFromDb');
const saveUserResponse = require('./saveUserResponse');
const showUsers = require('./showUsers');
const calculateUserScoreAndGet = require('./calculateUserScoreAndGet');
const getTop5users = require('./getTop5Users');

module.exports = [].concat(
  ping,
  login,
  clearTable,
  insertQuestionsToDbAndGet,
  getUserResponses,
  getQuestionsFromDb,
  saveUserResponse,
  showUsers,
  calculateUserScoreAndGet,
  getTop5users,
);
