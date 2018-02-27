const Models = require('../../models');

function getCorrectAnswer(questionId) {
  const correctAnswerPromise = new Promise((resolve, reject) => {
    Models.questions.find({
      where: {
        questionId,
      },
    }).then((record) => {
      const { answer } = record.dataValues;
      console.log(answer);
      resolve(answer);
    });
  });
  return correctAnswerPromise;
}

function saveUserResponse(newResponseFromUserJson, previousResponses) {
  const {
    userName, questionId, optionNum,
  } = newResponseFromUserJson;

  console.log(userName, questionId, optionNum);

  const updatedResponses = { ...previousResponses };
  updatedResponses[questionId] = optionNum;

  const newData = {
    responses: updatedResponses,
  };

  const updatedPromise = new Promise((resolve, reject) => {
    Models.users.update(newData, {
      where: {
        userName,
      },
    }).then((resp) => {
      console.log(resp);
      resolve({ resp, msg: 'user response added to db' });
    });
  });

  return updatedPromise;
}

module.exports = [
  {
    method: 'POST',
    path: '/saveUserResponse',
    handler: (request, reply) => {
      const newResponseFromUser = request.payload;
      const { userName } = newResponseFromUser;
      Models.users.find({
        where: {
          userName,
        },
      }).then((record) => {
        if (record === null) {
          reply('user not logged in');
        } else {
          const previousResponses = record.dataValues.responses;
          const updatedPromise = saveUserResponse(newResponseFromUser, previousResponses);
          updatedPromise.then(resp => reply(resp));
        }
      });
    },
  },
];

