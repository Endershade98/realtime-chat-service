const Message = require('../../../src/domain/entities/Message');

describe('Message Entity', () => {

  test('should create a message', () => {
    const message = new Message({
      conversationId: undefined,
      senderId: undefined,
      content: 'Hello'
    });

    expect(message.id.value).toBeDefined();
    expect(message.content).toBe('Hello');
  });

  test('should mark message as delivered', () => {
    const message = new Message({
      conversationId: undefined,
      senderId: undefined,
      content: 'Hello'
    });

    message.markDelivered();

    expect(message.deliveredAt.value).toBeInstanceOf(Date);
  });

  test('should mark message as read', () => {
    const message = new Message({
      conversationId: undefined,
      senderId: undefined,
      content: 'Hello'
    });

    message.markRead();

    expect(message.readAt.value).toBeInstanceOf(Date);
  });

});