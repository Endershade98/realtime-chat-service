const Message = require('../../../src/domain/entities/Message');

describe('Message Entity', () => {

  test('should create a message', () => {
    const message = new Message({
      conversationId: 'chat1',
      senderId: 'user1',
      content: 'Hello'
    });

    expect(message.id).toBeDefined();
    expect(message.content).toBe('Hello');
    expect(message.type).toBe('text');
  });

  test('should mark message as delivered', () => {
    const message = new Message({
      conversationId: 'chat1',
      senderId: 'user1',
      content: 'Hello'
    });

    message.markDelivered();

    expect(message.deliveredAt).toBeInstanceOf(Date);
  });

  test('should mark message as read', () => {
    const message = new Message({
      conversationId: 'chat1',
      senderId: 'user1',
      content: 'Hello'
    });

    message.markRead();

    expect(message.readAt).toBeInstanceOf(Date);
  });

});