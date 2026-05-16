// src/infrastructure/repositories/PostgresUserRepository.js

const User = require('../../domain/entities/User');
const UserId = require('../../domain/value-objects/UserId');

class PostgresUserRepository {
  constructor(prisma) {
    if (!prisma) {
      throw new Error('Prisma client is required');
    }
    this.prisma = prisma;
  }

  async save(user) {
    const created = await this.prisma.user.create({
      data: {
        id: user.id.value,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt || new Date(),
      },
    });

    return new User({
      id: new UserId(created.id),
      username: created.username,
      email: created.email,
    });
  }

  async findById(userId) {
    const found = await this.prisma.user.findUnique({
      where: { id: userId.value },
    });

    if (!found) return null;

    return new User({
      id: new UserId(found.id),
      username: found.username,
      email: found.email,
    });
  }

  async findAll() {
    const users = await this.prisma.user.findMany();

    return users.map(
      (u) =>
        new User({
          id: new UserId(u.id),
          username: u.username,
          email: u.email,
        })
    );
  }

  async update(user) {
    const updated = await this.prisma.user.update({
      where: { id: user.id.value },
      data: {
        username: user.username,
        email: user.email,
      },
    });

    return new User({
      id: new UserId(updated.id),
      username: updated.username,
      email: updated.email,
    });
  }

  async delete(userId) {
    await this.prisma.user.delete({
      where: { id: userId.value },
    });
  }
}

module.exports = PostgresUserRepository;