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

