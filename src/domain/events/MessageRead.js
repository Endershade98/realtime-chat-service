// src/domain/events/MessageRead.js

const DomainEvent = require('./DomainEvent');

class MessageRead extends DomainEvent {
  constructor({ messageId, conversationId, readerId, readAt }) {
    super('MESSAGE_READ', {
      messageId,
      conversationId,
      readerId,
      readAt
    });
  }
}

module.exports = MessageRead;