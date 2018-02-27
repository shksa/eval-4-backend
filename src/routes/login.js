const Models = require('../../models');

function login(payload) {
  return payload.userName;
}


module.exports = [
  {
    method: 'POST',
    path: '/login',
    handler: (request, reply) => {
      const temp = login(request.payload);
      reply(temp);
    },
  },
];

