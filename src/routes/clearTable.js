const Models = require('../../models');

module.exports = [
  {
    method: 'DELETE',
    path: '/clearUserTable',
    handler: (request, reply) => {
      Models.users.destroy({ truncate: true }).then(() => reply('cleared'));
    },
  },
  {
    method: 'DELETE',
    path: '/clearQuestionsTable',
    handler: (request, reply) => {
      Models.questions.destroy({ truncate: true }).then(() => reply('cleared'));
    },
  },
];
