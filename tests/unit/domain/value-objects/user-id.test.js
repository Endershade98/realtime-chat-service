// tests/unit/domain/value-objects/user-id.test.js

const UserId = require('../../../../src/domain/value-objects/UserId');

describe('UserId', () => {

  test('creates valid uuid automatically', () => {
    const id = new UserId();

    expect(id.value).toBeDefined();
  });

  test('throws on invalid uuid', () => {
    expect(() => new UserId('abc')).toThrow();
  });

  test('equals works', () => {
    const value = '550e8400-e29b-41d4-a716-446655440000';

    const a = new UserId(value);
    const b = new UserId(value);

    expect(a.equals(b)).toBe(true);
  });

});