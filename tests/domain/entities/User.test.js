const User = require('../../../src/domain/entities/User');

describe('User Entity', () => {

  test('should create a user with value objects', () => {
    const user = new User({
      username: 'Alice',
      email: 'alice@test.com'
    });

    expect(user.id).toBeDefined();
    expect(user.id.value).toBeDefined();
    expect(user.createdAt.value).toBeInstanceOf(Date);
  });

});