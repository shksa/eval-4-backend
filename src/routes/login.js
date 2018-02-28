const Models = require('../../models');

function login(userName) {
  const response = new Promise((resolve, reject) => {
    Models.users.find({
      where: {
        userName,
      },
    }).then((userDetails) => {
      if (userDetails === null) {
        Models.users.create({
          userName,
          score: 0,
        }).then((userDetails) => {
          const returnValue = { userDetails, msg: 'new user' };
          // console.log(returnValue);
          resolve(returnValue);
        });
      } else {
        const returnValue = { userDetails, msg: 'old user' };
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
      const JSONpayload = JSON.parse(request.payload);
      const userDetailsPromise = login(JSONpayload.userName);
      userDetailsPromise.then(userDetails => reply(userDetails));
    },
  },
];

