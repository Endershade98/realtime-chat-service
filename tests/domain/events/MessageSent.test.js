// tests/domain/events/MessageSent.test.js
const MessageSent = require('../../../src/domain/events/MessageSent');

describe('MessageSent Event', () => {
  test('should create a MessageSent event with correct payload', () => {
    const payload = {
      messageId: 'msg-123',
      conversationId: 'conv-123',
      senderId: 'user-123',
      content: 'Hello world!'
    };

    const event = new MessageSent(payload);

    expect(event.eventName).toBe('MessageSent');
    expect(event.occurredAt).toBeInstanceOf(Date);
    expect(event.payload).toEqual(payload);
  });
});