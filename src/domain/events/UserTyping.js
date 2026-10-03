// src/domain/events/UserTyping.js

const DomainEvent = require('./DomainEvent');


class UserTyping extends DomainEvent {
  constructor({ userId, conversationId, isTyping }) {
    super('USER_TYPING', {
      userId,
      conversationId,
      isTyping
    });
  }
}

module.exports = UserTyping;