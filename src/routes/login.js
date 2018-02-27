const Models = require('../../models');

function login(userName) {
  const response = new Promise((resolve, reject) => {
    Models.users.find({
      where: {
        userName,
      },
    }).then((resp) => {
      if (resp === null) {
        Models.users.create({
          userName,
          score: 0,
        }).then((userDetails) => {
          const returnValue = { userDetails, msg: 'new user' };
          // console.log(returnValue);
          resolve(returnValue);
        });
      } else {
        const returnValue = { resp, msg: 'old user' };
        resolve(returnValue);
      }
    });
  });
  return response;
}


module.exports = [
  {
    method: 'POST',
    path: '/login',
    handler: (request, reply) => {
      const userDetailsPromise = login(request.payload.userName);
      userDetailsPromise.then(userDetails => reply(userDetails));
    },
  },
];

