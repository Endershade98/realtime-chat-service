// src/domain/entities/User.js

const UserId = require('../value-objects/UserId');
const Timestamp = require('../value-objects/Timestamp');

class User {
  constructor({ id, username, email, createdAt }) {
    if (!username?.trim()) throw new Error("Username required");
    if (!email?.trim()) throw new Error("Email required");

    this.id = id;
    this.username = username;
    this.email = email;
    this.createdAt = createdAt;
  }

  changeUsername(newUsername) {
    if (!newUsername?.trim()) {
      throw new Error("Invalid username");
    }
    this.username = newUsername;
  }

  equals(other) {
    return other?.id?.equals?.(this.id);
  }
}

module.exports = User;