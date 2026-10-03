// tests/unit/domain/user/user.test.js

const User =
  require('../../../../src/domain/entities/User');

const UserId =
  require('../../../../src/domain/value-objects/UserId');

const Timestamp =
  require('../../../../src/domain/value-objects/Timestamp');

describe('User', () => {

  test('creates valid user', () => {
    const user = new User({
      id: new UserId(),
      username: 'Mario',
      email: 'mario@test.com',
      createdAt: new Timestamp()
    });

    expect(user.id).toBeInstanceOf(UserId);
    expect(user.username).toBe('Mario');
    expect(user.email).toBe('mario@test.com');
    expect(user.createdAt).toBeInstanceOf(Timestamp);
  });

  test('generates id when omitted', () => {
    const user = new User({
      username: 'Mario',
      email: 'mario@test.com'
    });

    expect(user.id).toBeInstanceOf(UserId);
  });

  test('generates timestamp when omitted', () => {
    const user = new User({
      username: 'Mario',
      email: 'mario@test.com'
    });

    expect(user.createdAt).toBeInstanceOf(Timestamp);
  });

  test('trims username', () => {
    const user = new User({
      username: '  Mario  ',
      email: 'mario@test.com'
    });

    expect(user.username).toBe('Mario');
  });

  test('trims email', () => {
    const user = new User({
      username: 'Mario',
      email: '  mario@test.com  '
    });

    expect(user.email).toBe('mario@test.com');
  });

  test('throws if username is missing', () => {
    expect(() => new User({
      email: 'mario@test.com'
    })).toThrow('Username is required');
  });

  test('throws if username is empty', () => {
    expect(() => new User({
      username: '   ',
      email: 'mario@test.com'
    })).toThrow('Username is required');
  });

  test('throws if email is missing', () => {
    expect(() => new User({
      username: 'Mario'
    })).toThrow('Email is required');
  });

  test('throws if email is empty', () => {
    expect(() => new User({
      username: 'Mario',
      email: '   '
    })).toThrow('Email is required');
  });

  test('changes username', () => {
    const user = new User({
      username: 'Mario',
      email: 'mario@test.com'
    });

    user.changeUsername('Luigi');

    expect(user.username).toBe('Luigi');
  });

  test('trims changed username', () => {
    const user = new User({
      username: 'Mario',
      email: 'mario@test.com'
    });

    user.changeUsername('  Luigi  ');

    expect(user.username).toBe('Luigi');
  });

  test('rejects invalid changed username', () => {
    const user = new User({
      username: 'Mario',
      email: 'mario@test.com'
    });

    expect(() => {
      user.changeUsername('   ');
    }).toThrow('Invalid username');
  });

  test('equals users with the same id', () => {
    const id = new UserId();

    const first = new User({
      id,
      username: 'Mario',
      email: 'mario@test.com'
    });

    const second = new User({
      id: new UserId(id.value),
      username: 'Different',
      email: 'different@test.com'
    });

    expect(first.equals(second)).toBe(true);
  });

  test('does not equal users with different ids', () => {
    const first = new User({
      username: 'Mario',
      email: 'mario@test.com'
    });

    const second = new User({
      username: 'Luigi',
      email: 'luigi@test.com'
    });

    expect(first.equals(second)).toBe(false);
  });

});