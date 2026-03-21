const UserId = require('../value-objects/UserId');
const Timestamp = require('../value-objects/Timestamp');
const { v4: uuidv4 } = require('uuid');

class Participant {
  constructor({ id, userId, role, joinedAt }) {
    this.id = id || uuidv4();

    this.userId = userId instanceof UserId
      ? userId
      : new UserId(userId);

    this.role = role || 'member';

    this.joinedAt = joinedAt instanceof Timestamp
      ? joinedAt
      : new Timestamp(joinedAt);
  }
}

module.exports = Participant;