const { v4: uuidv4 } = require('uuid');

class User {
  constructor({ id, username, email }) {
    this.id = id || uuidv4();
    this.username = username;
    this.email = email;
    this.createdAt = new Date();
  }
}

module.exports = User;