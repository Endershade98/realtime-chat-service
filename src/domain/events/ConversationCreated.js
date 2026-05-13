// src/domain/events/ConversationCreated.js
const DomainEvent = require('./DomainEvent');

class ConversationCreated extends DomainEvent {
  constructor({ conversationId, title }) {
    super('CONVERSATION_CREATED');
    this.data = { conversationId, title };
  }
}

module.exports = ConversationCreated;