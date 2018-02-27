const Models = require('../../models');

module.exports = [
  {
    method: 'GET',
    path: '/getUserResponses/{userName}',
    handler: (request, reply) => {
      const { userName } = request.params;
      Models.users.find({
        where: {
          userName,
        },
      }).then((record) => {
        if (record === null) {
          reply('user does not exist');
        } else {
          const { responses } = record.dataValues;
          reply({ responses, msg: 'user details from Db' });
        }
      });
    },
  },
];

