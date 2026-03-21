const UserId = require('../value-objects/UserId');
const Timestamp = require('../value-objects/Timestamp');

class User {
  constructor({ id, username, email, createdAt }) {
    this.id = id instanceof UserId ? id : new UserId(id);
    this.username = username;
    this.email = email;
    this.createdAt = createdAt instanceof Timestamp 
      ? createdAt 
      : new Timestamp(createdAt);
      
    Object.freeze(this); // Ensure immutability
  }
}

module.exports = User;