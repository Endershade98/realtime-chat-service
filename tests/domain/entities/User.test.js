const User = require('../../../src/domain/entities/User');

describe('User Entity', () => {

  test('should create a user with valid data', () => {
    const user = new User({
      username: 'Alice',
      email: 'alice@test.com'
    });

    expect(user.id).toBeDefined();
    expect(user.username).toBe('Alice');
    expect(user.email).toBe('alice@test.com');
  });

});