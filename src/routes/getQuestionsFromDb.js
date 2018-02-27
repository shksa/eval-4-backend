const Models = require('../../models');

module.exports = [
  {
    method: 'GET',
    path: '/getQuestionsFromDb',
    handler: (request, reply) => {
      Models.questions.findAll().then((records) => {
        reply({ records, msg: 'allQuestionsFromDb' });
      });
    },
  },
];

