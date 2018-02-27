const Models = require('../../models');
const fetch = require('node-fetch');

const API1 = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allQuestions';
const API2 = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findAnswerById/';

function getQuestionsFromAwsAndGroupOptions() {
  const allQuestionsArrayPromise = new Promise((resolve, reject) => {
    fetch(API1)
      .then(res => res.json())
      .then((json) => {
        const allQuestionsArray = json.allQuestions.map((qObj) => {
          const keys = Object.keys(qObj);
          console.log(keys);
          const optionsObj = keys.reduce(
            (finalObj, key) => {
              if (key.startsWith('option')) {
                finalObj[key] = qObj[key];
              }
              return finalObj;
            },
            {},
          );
          const { question, questionId } = qObj;
          return ({
            options: optionsObj,
            question,
            questionId,
          });
        });
        resolve(allQuestionsArray);
      });
  });
  return allQuestionsArrayPromise;
}

function getAnswersFromAwsAndCombineWithQuestions(allQuestionsArrayPromise) {
  const allQuestionsAndAnswersPromise = new Promise((resolve, reject1) => {
    const allQuestionsWithAnswersArray = [];
    allQuestionsArrayPromise.then((allQuestionsArray) => {
      const promiseArray = allQuestionsArray.map((qObj) => {
        const { questionId } = qObj;
        const fetchAnswerAndCombinePromise = new Promise((resolve, reject2) => {
          fetch(API2 + questionId)
            .then(res => res.json())
            .then((json) => {
              allQuestionsWithAnswersArray.push({ ...qObj, ...json });
              resolve('done');
            });
        });
        return fetchAnswerAndCombinePromise;
      });
      Promise.all(promiseArray).then(() => {
        console.log(allQuestionsWithAnswersArray);
        resolve(allQuestionsWithAnswersArray);
      });
    });
  });
  return allQuestionsAndAnswersPromise;
}

function insertInDb(allQuestionsAndAnswersPromise) {
  const insertionPromise = new Promise((resolve, reject) => {
    allQuestionsAndAnswersPromise.then((allQuestionsAndAnswersArray) => {
      Models.questions.bulkCreate(allQuestionsAndAnswersArray).then((resp) => {
        resolve(resp);
      });
    });
  });
  return insertionPromise;
}

module.exports = [
  {
    method: 'GET',
    path: '/insertQuestionsToDbAndGet',
    handler: (request, reply) => {
      const allQuestionsArrayPromise = getQuestionsFromAwsAndGroupOptions();
      const allQuestionsAndAnswersPromise =
          getAnswersFromAwsAndCombineWithQuestions(allQuestionsArrayPromise);
      const insertionPromise = insertInDb(allQuestionsAndAnswersPromise);
      insertionPromise.then(records => reply({ records, msg: 'inserted' }));
    },
  },

];
