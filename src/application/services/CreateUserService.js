// src/application/services/CreateUserService.js
const User = require('../../domain/entities/User');
const UserId = require('../../domain/value-objects/UserId');

class CreateUserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ username, email }) {
    const user = new User({ id: new UserId(), username, email, createdAt: new Date() });
    return this.userRepository.create(user);
  }
}

module.exports = CreateUserService;