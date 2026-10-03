// src/domain/events/MessageDelivered.js

const DomainEvent = require('./DomainEvent');

class MessageDelivered extends DomainEvent {
  constructor({ messageId, conversationId, recipientId, deliveredAt }) {
    super('MESSAGE_DELIVERED', {
      messageId,
      conversationId,
      recipientId,
      deliveredAt
    });
  }
}

module.exports = MessageDelivered;