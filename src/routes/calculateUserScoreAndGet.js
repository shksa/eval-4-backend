const Models = require('../../models');

function IsCorrectAnswer(questionId, selectedOption) {
  console.log(questionId, selectedOption);
  const correctAnswerPromise = new Promise((resolve, reject) => {
    Models.questions.find({
      where: {
        questionId,
      },
    }).then((record) => {
      const { answer, options } = record.dataValues;
      console.log(answer, options);
      if (answer === options[selectedOption]) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
  return correctAnswerPromise;
}

function calculateScore(userName) {
  const scorePromise = new Promise((resolve, reject) => {
    Models.users.find({
      where: {
        userName,
      },
    }).then((user) => {
      const { responses } = user.dataValues;
      const qIdsAndSelectedOptionsArray = Object.entries(responses);
      const decisionPromiseArray = [];
      qIdsAndSelectedOptionsArray.forEach((qIdAndSelectedOption) => {
        const [qId, selectedOption] = qIdAndSelectedOption;
        const decisionPromise = IsCorrectAnswer(Number(qId), selectedOption);
        decisionPromiseArray.push(decisionPromise);
      });
      let score = 0;
      Promise.all(decisionPromiseArray).then((decisionArray) => {
        score = decisionArray.reduce((accumulator, boolean) => {
          if (boolean) {
            accumulator += 1;
          }
          return accumulator;
        }, 0);
        console.log(score);
        resolve(score);
      });
    });
  });
  return scorePromise;
}

function saveScoreInDb(score, userName) {
  const newData = {
    score,
  };
  const updatedPromise = new Promise((resolve, reject) => {
    Models.users.update(newData, {
      where: {
        userName,
      },
    }).then((resp) => {
      console.log(score);
      resolve({ score, msg: 'user score updated' });
    });
  });

  return updatedPromise;
}


module.exports = [
  {
    method: 'GET',
    path: '/calculateUserScoreAndGet/{userName}',
    handler: (request, reply) => {
      const { userName } = request.params;
      const scorePromise = calculateScore(userName);
      scorePromise.then((score) => {
        const scoreUpdatedPromise = saveScoreInDb(score, userName);
        scoreUpdatedPromise.then(resp => reply(resp));
      });
    },
  },
];

