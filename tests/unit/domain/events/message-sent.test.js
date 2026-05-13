// tests/unit/domain/events/message-sent.test.js

const MessageSent = require('../../../../src/domain/events/MessageSent');

describe('MessageSent', () => {

  test('creates event correctly', () => {
    const event = new MessageSent({
      messageId: '1',
      conversationId: '2',
      senderId: '3',
      content: 'hello'
    });

    expect(event.getName()).toBe('MessageSent');
    expect(event.data.content).toBe('hello');
  });

});