const Models = require('../../models');

function getTop5Users() {
  const top5UsersPromise = new Promise((resolve, reject) => {
    Models.users.findAll({
      order: [
        ['score', 'DESC'],
      ],
      limit: 5,
    }).then((top5Users) => {
      resolve(top5Users);
    });
  });
  return top5UsersPromise;
}

module.exports = [
  {
    method: 'GET',
    path: '/getTop5Users',
    handler: (request, reply) => {
      const top5UsersPromise = getTop5Users();
      top5UsersPromise.then((top5Users) => {
        reply(top5Users);
      });
    },
  },
];

