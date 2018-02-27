const Models = require('../../models');

module.exports = [
  {
    method: 'GET',
    path: '/showUsers',
    handler: (request, reply) => {
      Models.users.findAll().then(records => reply(records));
    },
  },
];

