// tests/unit/domain/value-objects/message-id.test.js

const MessageId =
  require('../../../../src/domain/value-objects/MessageId');

describe('MessageId', () => {

  test('creates uuid automatically', () => {
    const id = new MessageId();

    expect(id.value).toBeDefined();
  });

  test('accepts valid uuid', () => {
    const value =
      '550e8400-e29b-41d4-a716-446655440000';

    const id = new MessageId(value);

    expect(id.value).toBe(value);
  });

  test('rejects invalid uuid', () => {
    expect(() => {
      new MessageId('abc');
    }).toThrow();
  });

  test('equals same value', () => {
    const value =
      '550e8400-e29b-41d4-a716-446655440000';

    const a = new MessageId(value);
    const b = new MessageId(value);

    expect(a.equals(b)).toBe(true);
  });

  test('different ids are not equal', () => {
    const a = new MessageId();
    const b = new MessageId();

    expect(a.equals(b)).toBe(false);
  });

  test('toString returns value', () => {
    const id = new MessageId();

    expect(id.toString()).toBe(id.value);
  });

});