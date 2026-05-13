// src/domain/events/UserConnected.js

const DomainEvent = require('./DomainEvent');

class UserConnected extends DomainEvent {
  constructor({ userId, socketId }) {
    super('USER_CONNECTED', {
      userId,
      socketId
    });
  }
}

module.exports = UserConnected;