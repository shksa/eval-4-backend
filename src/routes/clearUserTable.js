const Models = require('../../models');

module.exports = [
  {
    method: 'DELETE',
    path: '/clearUserTable',
    handler: (request, reply) => {
      Models.users.destroy({ truncate: true }).then(() => reply('cleared'));
    },
  },
];
