// tests/unit/domain/entities/User.test.js
const User = require('@domain/entities/User');
const UserId = require('@domain/value-objects/UserId');

describe('User Entity', () => {

  test('should create valid user', () => {
    const user = new User({
      username: 'john',
      email: 'john@test.com'
    });

    expect(user.username).toBe('john');
    expect(user.email).toBe('john@test.com');
    expect(user.id).toBeDefined();
  });

  test('should accept provided id', () => {
    const id = new UserId();

    const user = new User({
      id,
      username: 'john',
      email: 'john@test.com'
    });

    expect(user.id).toBe(id);
  });

  test('should set createdAt automatically or from input', () => {
    const user = new User({
      username: 'john',
      email: 'john@test.com'
    });

    expect(user.createdAt).toBeDefined();
  });

});