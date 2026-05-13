// tests/unit/domain/message/message.test.js

const Message = require('../../../../src/domain/entities/Message');
const MessageId = require('../../../../src/domain/value-objects/MessageId');
const ConversationId = require('../../../../src/domain/value-objects/ConversationId');
const UserId = require('../../../../src/domain/value-objects/UserId');
const Timestamp = require('../../../../src/domain/value-objects/Timestamp');

describe('Message', () => {

  test('creates valid message', () => {
    const message = new Message({
      id: new MessageId(),
      conversationId: new ConversationId(),
      senderId: new UserId(),
      content: 'Hello',
      createdAt: new Timestamp()
    });

    expect(message.content).toBe('Hello');
  });

  test('throws on empty content', () => {
    expect(() => new Message({
      content: ''
    })).toThrow();
  });

  test('mark delivered', () => {
    const msg = new Message({
      id: new MessageId(),
      conversationId: new ConversationId(),
      senderId: new UserId(),
      content: 'ciao',
      createdAt: new Timestamp()
    });

    msg.markDelivered();

    expect(msg.status).toBe('delivered');
  });

});