// src/domain/events/MessageSent.js

const DomainEvent = require('./DomainEvent');

class MessageSent extends DomainEvent {
  constructor({ messageId, conversationId, senderId, content }) {
    super(`MESSAGE_SENT`, {
      messageId,
      conversationId,
      senderId,
      content
    });
  }
}

module.exports = MessageSent;