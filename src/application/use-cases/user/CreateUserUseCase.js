// src/application/use-cases/user/CreateUserUseCase.js

const User = require('../../../domain/entities/User');
const UserId = require('../../../domain/value-objects/UserId');
const Timestamp = require('../../../domain/value-objects/Timestamp');

class CreateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ username, email }) {
    const user = new User({
      id: new UserId(),
      username,
      email,
      createdAt: new Timestamp()
    });

    return await this.userRepository.save(user);
  }
}

module.exports = CreateUserUseCase;