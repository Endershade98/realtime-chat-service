// tests/unit/domain/value-objects/UserId.test.js
const UserId = require('@domain/value-objects/UserId');

describe('UserId Value Object', () => {

  test('should generate a valid uuid if not provided', () => {
    const id = new UserId();

    expect(id.value).toBeDefined();
    expect(typeof id.value).toBe('string');
  });

  test('should accept valid uuid', () => {
    const id = new UserId();

    const id2 = new UserId(id.value);

    expect(id2.value).toBe(id.value);
  });

  test('should throw if invalid uuid', () => {
    expect(() => {
      new UserId('invalid-id');
    }).toThrow('Invalid UserId');
  });

  test('should be immutable', () => {
    const id = new UserId();

    expect(() => {
      id.value = 'hack';
    }).toThrow();
  });

});