// src/domain/repositories/UserRepository.js
class UserRepository {
  constructor() {
    this.users = new Map(); // key = userId.value
  }

  save(user) {
    this.users.set(user.id.toString(), user);
    return user;
  }

  findById(userId) {
    return this.users.get(userId.toString()) || null;
  }

  remove(userId) {
    return this.users.delete(userId.toString());
  }

  findAll() {
    return Array.from(this.users.values());
  }
}

module.exports = UserRepository;