// src/domain/events/UserTyping.js
const DomainEvent = require('./DomainEvent');

class UserTyping extends DomainEvent {
  constructor({ conversationId, userId }) {
    super('UserTyping', { conversationId, userId });
  }
}

module.exports = UserTyping;