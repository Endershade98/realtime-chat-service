// src/domain/entities/Participant.js

const UserId = require('../value-objects/UserId');
const ValidationError = require('../errors/ValidationError');

class Participant {
  constructor({
    userId,
    role = 'member'
  }) {

    if (!userId) {
      throw new ValidationError('userId is required');
    }

    this._userId =
      userId instanceof UserId
        ? userId
        : new UserId(userId);

    this._role = role;
  }

  get userId() {
    return this._userId;
  }

  get role() {
    return this._role;
  }

  isAdmin() {
    return this._role === 'admin';
  }
}

module.exports = Participant;