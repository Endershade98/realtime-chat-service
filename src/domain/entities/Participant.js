// src/domain/entities/Participant.js

const UserId = require('../value-objects/UserId');

class Participant {
  constructor({ userId, role = 'member' }) {
    this.userId = userId;
    this.role = role;
  }

  isAdmin() {
    return this.role === 'admin';
  }
}

module.exports = Participant;