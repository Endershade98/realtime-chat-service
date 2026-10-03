// src/domain/entities/User.js

const UserId = require('../value-objects/UserId');
const Timestamp = require('../value-objects/Timestamp');
const ValidationError = require('../errors/ValidationError');

class User {
  constructor({
    id,
    username,
    email,
    createdAt
  } = {}) {

    if (!username || typeof username !== 'string' || !username.trim()) {
      throw new ValidationError('Username is required');
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      throw new ValidationError('Email is required');
    }

    this._id =
      id instanceof UserId
        ? id
        : new UserId(id);

    this._username = username.trim();
    this._email = email.trim();

    this._createdAt =
      createdAt instanceof Timestamp
        ? createdAt
        : new Timestamp(createdAt);
  }

  get id() {
    return this._id;
  }

  get username() {
    return this._username;
  }

  get email() {
    return this._email;
  }

  get createdAt() {
    return this._createdAt;
  }

  changeUsername(newUsername) {
    if (
      !newUsername ||
      typeof newUsername !== 'string' ||
      !newUsername.trim()
    ) {
      throw new ValidationError('Invalid username');
    }

    this._username = newUsername.trim();
  }

  equals(other) {
    return (
      other instanceof User &&
      this._id.equals(other.id)
    );
  }
}

module.exports = User;