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
