// src/domain/entities/Participant.js

const UserId = require('../value-objects/UserId');

class Participant {
  constructor({ id, userId, role = 'member' }) {
    this._id = id ?? null;

    this._userId =
      userId instanceof UserId ? userId : new UserId(userId);

    this._role = role;

    Object.freeze(this);
  }

  get id() {
    return this._id;
  }

  get userId() {
    return this._userId;
  }

  get role() {
    return this._role;
  }
}

module.exports = Participant;