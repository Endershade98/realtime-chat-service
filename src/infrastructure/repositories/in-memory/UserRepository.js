// src/infrastructure/repositories/in-memory/UserRepository.js

class UserRepository {
  constructor() {
    this.store = new Map();
  }

  save(user) {
    if (!user) throw new Error('User is required');
    if (!user.id) throw new Error('User must have id');

    const id = user.id.toString ? user.id.toString() : String(user.id);

    this.store.set(id, user);
    return user;
  }

  findById(userId) {
    const id = userId?.toString?.() ?? String(userId);
    return this.store.get(id) || null;
  }

  findAll() {
    return Array.from(this.store.values());
  }
}

module.exports = UserRepository;