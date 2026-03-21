const UserId = require('../../../src/domain/value-objects/UserId');

describe('UserId Value Object', () => {

  test('should create a valid UserId', () => {
    const id = new UserId();

    expect(id.value).toBeDefined();
  });

  test('should throw error for invalid id', () => {
    expect(() => new UserId('invalid')).toThrow();
  });

});