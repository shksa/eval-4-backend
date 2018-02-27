const server = require('../src/server');
const Models = require('../models');

describe('ping test for server', () => {
  test('pinging the server for a pong response', (done) => {
    const options = {
      method: 'GET',
      url: '/ping',
    };
    server.inject(options, (response) => {
      expect(response.result).toBe('pong');
      done();
    });
  });
});

describe('testing login route', () => {
  beforeAll((done) => {
    Models.users.destroy({ truncate: true }).then(() => done());
  });
  test('new user should login', (done) => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: { userName: 'sreekar' },
    };
    server.inject(options, (response) => {
      expect(response.result.msg).toBe('new user');
      done();
    });
  });
  test('old user should logged in', (done) => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: { userName: 'sreekar' },
    };
    server.inject(options, (response) => {
      expect(response.result.msg).toBe('old user');
      done();
    });
  });
});

describe('testing insertQuestionsToDbAndGet route', () => {
  beforeAll((done) => {
    Models.questions.destroy({ truncate: true }).then(() => done());
  });
  test('should insert to db by fetching from api1 and api2', (done) => {
    const options = {
      method: 'GET',
      url: '/insertQuestionsToDbAndGet',
    };
    server.inject(options, (response) => {
      expect(response.result.msg).toBe('inserted');
      expect(response.result.records.length).toBe(12);
      done();
    });
  });
});

describe('testing getQuestionsFromDb route', () => {
  test('should fetch from db', (done) => {
    const options = {
      method: 'GET',
      url: '/getQuestionsFromDb',
    };
    server.inject(options, (response) => {
      expect(response.result.msg).toBe('allQuestionsFromDb');
      expect(response.result.records.length).toBe(12);
      done();
    });
  });
});

describe('testing saveUserResponses route', () => {
  beforeAll((done) => {
    Models.users.destroy({ truncate: true }).then(() => {
      Models.users.bulkCreate([
        {
          userName: 'sreekar',
          score: 0,
        },
        {
          userName: 'vishal',
          score: 0,
        },
        {
          userName: 'aakash',
          score: 0,
        },
      ]).then(() => done());
    });
  });
  test('should save in db for valid user', (done) => {
    const options = {
      method: 'POST',
      url: '/saveUserResponse',
      payload: {
        userName: 'sreekar',
        questionId: 12,
        optionNum: 3,
      },
    };
    server.inject(options, (response) => {
      // console.log(response);
      expect(response.result.msg).toBe('user response added to db');
      Models.users.find({
        where: {
          userName: 'sreekar',
        },
      }).then((user) => {
        console.log(user.dataValues.responses);
        expect(user.dataValues.responses).toEqual({ 12: 3 });
        done();
      });
    });
  });
  test('should not save in db for invalid user', (done) => {
    const options = {
      method: 'POST',
      url: '/saveUserResponse',
      payload: {
        userName: 'kiran',
        questionId: 12,
        optionNum: 3,
      },
    };
    server.inject(options, (response) => {
      // console.log(response);
      expect(response.result).toBe('user not logged in');
      Models.users.find({
        where: {
          userName: 'kiran',
        },
      }).then((user) => {
        console.log(user);
        expect(user).toBe(null);
        done();
      });
    });
  });
});

