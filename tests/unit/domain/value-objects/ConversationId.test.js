// tests/unit/domain/value-objects/ConversationId.test.js
const ConversationId = require('@domain/value-objects/ConversationId');

describe('ConversationId Value Object', () => {

  test('should generate id if not provided', () => {
    const id = new ConversationId();

    expect(id.value).toBeDefined();
  });

  test('should accept valid id', () => {
    const id = new ConversationId();

    const id2 = new ConversationId(id.value);

    expect(id2.value).toBe(id.value);
  });

  test('should throw on invalid id', () => {
    expect(() => {
      new ConversationId('bad-id');
    }).toThrow('Invalid ConversationId');
  });

  test('should be immutable', () => {
    const id = new ConversationId();

    expect(() => {
      id.value = 'hack';
    }).toThrow();
  });

});