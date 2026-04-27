// tests/domain/entities/Message.test.js
const Message = require('@domain/entities/Message');
const ConversationId = require('@domain/value-objects/ConversationId');
const UserId = require('@domain/value-objects/UserId');

describe('Message Entity', () => {

  test('should create valid message', () => {
    const message = new Message({
      conversationId: new ConversationId(),
      senderId: new UserId(),
      content: 'Hello world'
    });

    expect(message.content).toBe('Hello world');
    expect(message.type).toBe('text');
    expect(message.id).toBeDefined();
  });

  test('should mark message as delivered', () => {
    const message = new Message({
      conversationId: new ConversationId(),
      senderId: new UserId(),
      content: 'Hello'
    });

    message.markDelivered();

    expect(message.deliveredAt).not.toBeNull();
  });

  test('should mark message as read', () => {
    const message = new Message({
      conversationId: new ConversationId(),
      senderId: new UserId(),
      content: 'Hello'
    });

    message.markRead();

    expect(message.readAt).not.toBeNull();
  });

});