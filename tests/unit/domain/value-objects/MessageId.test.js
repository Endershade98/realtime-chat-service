// tests/unit/domain/value-objects/ConversationId.test.js
const MessageId = require('@domain/value-objects/MessageId');

describe('MessageId Value Object', () => {

  test('should generate id if not provided', () => {
    const id = new MessageId();

    expect(id.value).toBeDefined();
  });

  test('should accept valid id', () => {
    const id = new MessageId();

    const id2 = new MessageId(id.value);

    expect(id2.value).toBe(id.value);
  });

  test('should throw on invalid id', () => {
    expect(() => {
      new MessageId('invalid');
    }).toThrow('Invalid MessageId');
  });

  test('should be immutable', () => {
    const id = new MessageId();

    expect(() => {
      id.value = 'hack';
    }).toThrow();
  });

});