const { v4: uuidv4 } = require('uuid');

class Participant {
  constructor({ userId, role }) {
    this.id = uuidv4();
    this.userId = userId;
    this.role = role || 'member'; // member, admin
    this.joinedAt = new Date();
  }
}

module.exports = Participant;