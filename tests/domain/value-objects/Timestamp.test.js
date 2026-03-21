const Timestamp = require('../../../src/domain/value-objects/Timestamp');

describe('Timestamp Value Object', () => {

  test('should create current timestamp', () => {
    const ts = new Timestamp();

    expect(ts.value).toBeInstanceOf(Date);
  });

  test('should create from valid date', () => {
    const ts = new Timestamp('2024-01-01');

    expect(ts.toDate()).toBeInstanceOf(Date);
  });

  test('should throw for invalid date', () => {
    expect(() => new Timestamp('invalid')).toThrow();
  });

});