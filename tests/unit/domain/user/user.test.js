// tests/unit/domain/user/user.test.js

const User = require('../../../../src/domain/entities/User');
const UserId = require('../../../../src/domain/value-objects/UserId');
const Timestamp = require('../../../../src/domain/value-objects/Timestamp');

describe('User', () => {

  test('creates valid user', () => {
    const user = new User({
      id: new UserId(),
      username: 'Mario',
      email: 'mario@test.com',
      createdAt: new Timestamp()
    });

    expect(user.username).toBe('Mario');
  });

  test('throws if username empty', () => {
    expect(() => new User({
      username: '',
      email: 'a@test.com'
    })).toThrow();
  });

});