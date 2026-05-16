// src/infrastructure/repositories/postgres/PostgresUserRepository.js

const User = require('../../../domain/entities/User');
const UserId = require('../../../domain/value-objects/UserId');

class PostgresUserRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async save(user) {
    const created = await this.prisma.user.create({
      data: {
        id: user.id.value,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
    });

    return new User({
      id: new UserId(created.id),
      username: created.username,
      email: created.email,
      createdAt: created.createdAt,
    });
  }

  async findById(userId) {
    const id = userId.value ?? userId;

    const found = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!found) return null;

    return new User({
      id: new UserId(found.id),
      username: found.username,
      email: found.email,
      createdAt: found.createdAt,
    });
  }
}

module.exports = PostgresUserRepository;