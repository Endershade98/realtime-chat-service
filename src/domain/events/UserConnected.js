// src/domain/events/UserConnected.js
const DomainEvent = require('./DomainEvent');

class UserConnected extends DomainEvent {
  constructor({ userId, username }) {
    super('UserConnected', { userId, username });
  }
}

module.exports = UserConnected;