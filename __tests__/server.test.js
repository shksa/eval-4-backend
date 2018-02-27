const server = require('../src/server');

describe('ping test for server', () => {
  test('pinging the server for a pong response', () => {
    const options = {
      method: 'GET',
      url: '/ping',
    };
    server.inject(options, (response) => {
      expect(response.result).toBe('pong');
    });
  });
});

describe('tests for login route', () => {
  test('testing the payload', () => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: { userName: 'sreekar' },
    };
    server.inject(options, (response) => {
      expect(response.result).toBe('sreekar');
    });
  });
});
