// src/domain/entities/User.js

const UserId = require('../value-objects/UserId');
const Timestamp = require('../value-objects/Timestamp');

class User {
  constructor({ id, username, email, createdAt }) {
    
    if (!username || username.trim() === "") {
      throw new Error("Username cannot be empty");
    }

    if (!email || email.trim() === "") {
      throw new Error("Email cannot be empty");
    }

    this.id = id instanceof UserId ? id : new UserId(id);
    this.username = username;
    this.email = email;

    this.createdAt = createdAt instanceof Timestamp
      ? createdAt
      : new Timestamp(createdAt);
  }

  equals(other) {
    return other instanceof User && this.id.equals(other.id);
  }
}

module.exports = User;