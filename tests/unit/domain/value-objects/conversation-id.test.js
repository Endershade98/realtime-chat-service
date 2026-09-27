// tests/unit/domain/value-objects/conversation-id.test.js

const ConversationId =
  require('../../../../src/domain/value-objects/ConversationId');

describe('ConversationId', () => {

  test('creates uuid automatically', () => {
    const id = new ConversationId();

    expect(id.value).toBeDefined();
  });

  test('accepts valid uuid', () => {
    const value =
      '550e8400-e29b-41d4-a716-446655440000';

    const id = new ConversationId(value);

    expect(id.value).toBe(value);
  });

  test('rejects invalid uuid', () => {
    expect(() => {
      new ConversationId('abc');
    }).toThrow();
  });

  test('equals same value', () => {
    const value =
      '550e8400-e29b-41d4-a716-446655440000';

    const a = new ConversationId(value);
    const b = new ConversationId(value);

    expect(a.equals(b)).toBe(true);
  });

  test('different ids are not equal', () => {
    const a = new ConversationId();
    const b = new ConversationId();

    expect(a.equals(b)).toBe(false);
  });

  test('toString returns value', () => {
    const id = new ConversationId();

    expect(id.toString()).toBe(id.value);
  });

});